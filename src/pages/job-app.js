import defaults from '101/defaults'
import React, { Component } from 'react'

import JobAppForm from '../components/job-app-form.js'
import hz from '../horizon.js'

const parseForm = function (form) {
  return Array.prototype.reduce.call(form.elements, function (json, el) {
    if (!el.name) { return json }
    json[el.name] = el.value
    return json
  }, {})
}

class JobAppPage extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }
  handleSubmit (evt) {
    evt.preventDefault()
    const self = this
    const form = evt.target
    const formData = new window.FormData(form)
    const formJSON = parseForm(evt.target)
    // send upload request
    const xhr = new window.XMLHttpRequest()
    xhr.open('POST', '/-/api/applications', true)
    xhr.onload = () => {
      try {
        // save data to horizon
        if (xhr.status === 200) {
          const resJSON = JSON.parse(xhr.responseText)
          defaults(formJSON, {
            resumeFilename: resJSON.resume, // resume filename
            createdAt: new Date()
          })
          const subscription = hz('applications').insert(formJSON).subscribe({
            next: () => {
              subscription.unsubscribe()
              onSuccess()
            },
            error: onError
          })
        } else {
          console.error(xhr)
          throw new Error('error status code: ' + xhr.status)
        }
      } catch (err) {
        onError(err)
      }
      function onSuccess () {
        self.setState({
          disabled: false,
          success: true
        })
      }
      function onError (err) {
        console.error(err)
        console.error(err.stack)
        self.setState({
          disabled: false
        })
        window.alert('Uh oh! The server errored and was unable to save your application.')
      }
    }
    xhr.send(formData)
  }
  render () {
    return (
      <div className='container' style={{maxWidth: '760px'}}>
        <div className='row'>
          <div className='span12 text-center'>
            <h1>Application for Employment</h1>
            <h5>
              University Inn &amp; Conference Center<br />
              1310 Tiger Blvd.<br />
              Clemson, SC 29631
            </h5>
            <br />
            <br />
          </div>
        </div>
        <div className='row' style={{ display: this.state.success ? '' : 'none' }}>
          <div className='span12'>
            {this.renderSuccess()}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className='row' style={{ display: this.state.success ? 'none' : '' }}>
          <div className='span12'>
            <p>
            The following information is requested in order to help us make possible placement within the
            company. All portions of this application pertaining to you must be completed. We appreciate the time you
            spend in filling in this application form. The Company, in accordance with State and Federal Laws, does
            not discriminate on the basis of age, race, religion, color, sex, national origin, marital status, physical or
            mental disability, or arrest record.
            </p>
          </div>
          <br />
          <br />
        </div>
        <div className='row' style={{ display: this.state.success ? 'none' : '' }}>
          <div className='span12'>
            <JobAppForm disabled={this.state.disabled} onSubmit={this.handleSubmit} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    )
  }
  renderSuccess () {
    return <div className='text-center'>
      <h4>Application Submitted!</h4>
      <p>Thank you for your interest in working at University Inn.<br />We have received your application and will be in touch!</p>
    </div>
  }
}

export default JobAppPage
