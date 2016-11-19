import React, { Component } from 'react'
import { subscribe } from 'horizon-react'

import Debug from 'debug'
import ItemList from 'react-items-list'

const debug = Debug('AdminJobsAvailable')

const mapDataToProps = {
  positions: (hz) => hz('positions')
}

class AdminJobsAvailable extends Component {
  constructor (props) {
    super(props)
    this.hz = props.horizon
    this.state = this.getState(props)
    // bind handlers
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.onErr = this.onErr.bind(this)
  }
  componentWillReceiveProps (props) {
    this.setState(this.getState(props))
  }
  getState (props) {
    console.log(props)
    return {
      positions: props.positions
        .map((pos) => pos.title)
        .sort()
    }
  }
  onErr (err) {
    this.setState(this.getState(this.props))
    window.alert(err.message)
  }
  handleAdd (title) {
    if (this.props.positions.some((p) => p.title === title)) {
      this.setState(this.getState(this.props))
      return
    }
    this.hz('positions').insert({
      title: title
    }).subscribe({
      err: this.onErr
    })
  }
  handleRemove (index) {
    console.log(arguments)
    this.hz('positions').remove(this.props.positions[index].id).subscribe({
      err: this.onErr
    })
  }
  handleUpdate (index, title) {
    this.hz('positions').update({
      id: this.props.positions[index].id,
      title: title
    }).subscribe({
      err: this.onErr
    })
  }
  render () {
    console.log(this.props, this.state)
    return <div>
      <h3>Job Positions</h3>
      <ItemList
        items={this.state.positions}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onRemove={this.handleRemove}
      />
    </div>
  }
}

export default subscribe({
  mapDataToProps
})(AdminJobsAvailable)
