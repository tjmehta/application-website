import React, { Component } from 'react'

import Debug from 'debug'

import FormGroup from './form-group.js'
import EmployerFormGroups from './employer-form-groups.js'

const debug = Debug('job-app:WorkHistoryFieldset')

class WorkHistoryFieldset extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (input) {
    const newState = {}
    newState[input.name] = input.value
    this.setState(newState)
  }
  render () {
    debug('render', this.state)
    return <fieldset>
      <legend>Work History</legend>
      <FormGroup onChange={this.handleChange} disabled={this.props.disabled} admin={this.props.admin} fields={[
        {
          label: {
            width: 5,
            text: 'Do you have a resumé?'
          },
          input: {
            type: 'select',
            width: 2,
            options: [
              {value: 'Yes', label: 'Yes'},
              {value: 'No', label: 'No'}
            ],
            name: 'hasResume',
            placeholder: 'Select'
          },
          clear: true
        }, {
          label: {
            width: 5,
            text: 'Do have any work experience?'
          },
          input: {
            type: 'select',
            width: 2,
            options: [
              {value: 'Yes', label: 'Yes'},
              {value: 'No', label: 'No'}
            ],
            name: 'hasExperience',
            isVisible (valueMap) {
              var isVisible = valueMap['hasResume'] === 'No'
              debug('hasExperience.isVisible', isVisible, valueMap)
              return isVisible
            },
            placeholder: 'Select'
          }
        }]
      } />
      {
        this.state.hasResume === 'Yes'
          ? this.props.admin
            ? this.renderResumeLink()
            : this.renderResumeUpload()
          : this.state.hasResume === 'No' && this.state.hasExperience === 'Yes'
            ? this.renderWorkHistory()
            : null
      }
    </fieldset>
  }
  renderResumeUpload () {
    return <div className='form-group'>
      <label className='col-sm-5 control-label' htmlFor='resume'>Upload your resume:</label>
      <div className='col-sm-5'>
        <input disabled={this.props.disabled} required className='form-control' type='file' name='resume' />
      </div>
    </div>
  }
  renderResumeLink () {
    return this.props.bootstrapData && this.props.bootstrapData.resume
      ? <div className='form-group'>
        <label className='col-sm-5 control-label' htmlFor='resume'>Resume</label>
        <div className='col-sm-5'>
          <a href={this.props.admin.bootstrapData.resume.split('uploads').pop()}>Resume Link</a>
        </div>
      </div>
      : null
  }
  renderWorkHistory () {
    return [
      <EmployerFormGroups disabled={this.props.disabled} admin={this.props.admin} key='Current/Last Employer' name='currentEmployer' />,
      <br key='foobar1' />,
      <br key='foobar2' />,
      <EmployerFormGroups required={false} disabled={this.props.disabled} admin={this.props.admin} key='Previous Employer 1' name='previousEmployer1' />,
      <br key='foobar3' />,
      <br key='foobar4' />,
      <EmployerFormGroups required={false} disabled={this.props.disabled} admin={this.props.admin} key='Previous Employer 2' name='previousEmployer1' />
    ]
  }
}

export default WorkHistoryFieldset
