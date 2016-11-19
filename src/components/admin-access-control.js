import find from '101/find'
import React, { Component } from 'react'
import { subscribe } from 'horizon-react'

import Debug from 'debug'
import ItemList from 'react-items-list'

const MANAGER_GROUP = 'managers'

const debug = Debug('AdminAccessControl')

// simple subscription to the collection "applications"
const mapDataToProps = {
  users: (hz) => hz('users')
}

class AdminAccessControl extends Component {
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
      users: props.users
        .filter((user) => ~user.groups.indexOf(MANAGER_GROUP))
        .map((user) => user.email)
        .sort()
    }
  }
  onErr (err) {
    this.setState(this.getState(this.props))
    window.alert(err.message)
  }
  handleAdd (email) {
    const user = find(this.props.users, (user) => (user.email && user.email.toLowerCase()) === email.toLowerCase())
    if (!user) {
      this.onErr({ message: 'user with email not found' })
      return
    }
    if (~user.groups.push(MANAGER_GROUP)) {
      this.setState(this.getState(this.props))
      return
    }
    this.hz('users').update({
      id: user.id,
      groups: user.groups.push(MANAGER_GROUP)
    }).subscribe({
      error: this.onErr
    })
  }
  handleRemove (index) {
    const user = this.state.users[index]
    if (!~user.groups.push(MANAGER_GROUP)) {
      this.setState(this.getState(this.props))
      return
    }
    this.hz('users').update({
      id: user.id,
      groups: user.groups.filter((group) => group !== MANAGER_GROUP)
    }).subscribe({
      error: this.onErr
    })
  }
  handleUpdate (index, email) {
    // this.handleRemove(index)
    // this.handleAdd(email)
  }
  render () {
    return <div>
      <h3>Admin Access Control</h3>
      <ItemList
        items={this.state.users}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onRemove={this.handleRemove}
      />
    </div>
  }
}

export default subscribe({
  mapDataToProps
})(AdminAccessControl)
