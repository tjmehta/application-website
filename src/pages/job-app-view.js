import React, { Component } from 'react'
import { subscribe } from 'horizon-react'

import JobAppForm from '../components/job-app-form.js'

// simple subscription to the collection "applications"
const mapDataToProps = {
  apps: (hz, props) => {
    return hz('applications').find({ id: window.location.href.split('/').pop().split('?').shift() })
  }
}

class JobAppViewPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentWillReceiveProps (props) {
    if (props.apps && props.apps[0]) {
      window.bootstrapData = props.apps[0]
      this.setState({
        loading: false
      })
    } else {
      this.setState({
        loading: false,
        notFound: true
      })
    }
  }
  render () {
    return <div className='container' style={{maxWidth: '760px'}}>
      {
        this.state.loading
          ? this.renderLoader()
          : this.state.notFound
            ? this.renderNotFound()
            : this.renderApp()
      }
    </div>
  }
  renderLoader () {
    return <div className='text-center'>Loading..</div>
  }
  renderNotFound () {
    return <div className='text-center'>Application Not Found. Check URL</div>
  }
  renderApp () {
    return [
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
      </div>,
      <div className='row' style={{ display: this.state.success ? 'none' : '' }}>
        <div className='span12'>
          <JobAppForm disabled noButton />
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>
    ]
  }
}

export default subscribe({
  mapDataToProps
})(JobAppViewPage)
