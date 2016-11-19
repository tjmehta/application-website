import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'

import Debug from 'debug'
import put from '101/put'
import { subscribe } from 'horizon-react'
import React, { Component } from 'react'
import {AgGridReact} from 'ag-grid-react'

import AdminJobsAvailable from '../components/admin-jobs-available'
import AdminAccessControl from '../components/admin-access-control'

import '../date-format.js'

const debug = Debug('AdminPage')

// simple subscription to the collection "applications"
const mapDataToProps = {
  applications: (hz) => hz('applications'),
  users: (hz) => hz.currentUser()
}

class AdminPage extends Component {
  constructor (props) {
    super(props)
    this.columnDefs = [
      {
        columnGroupShow: 'Applicant',
        pinned: 'left',
        headerName: 'Full Name',
        field: 'fullname',
        // width: 275
      },
      {
        columnGroupShow: 'Applicant',
        pinned: 'left',
        headerName: 'Phone',
        field: 'homePhone',
        width: 100
      },
      {
        headerName: 'Position(s)',
        field: 'position',
        // width: 275
      },
      {
        headerName: 'Start Date',
        field: 'startDate',
        width: 100
      },
      {
        headerName: 'Has Experience',
        field: 'hasExperience',
        width: 150
      },
      {
        headerName: 'Education',
        field: 'educationLevel',
        // width: 275
      },
      {
        pinned: 'right',
        headerName: 'Created At',
        field: 'createdAt',
      }
    ]
    this.state = {
      apps: this.getApps(props)
    }
  }
  getApps (props) {
    return props.applications.map(function (app) {
      debug(app)
      return put(app, {
        fullname: [
          app.fname,
          app.mname.slice(0, 1),
          app.lname,
          app.nickname ? `(${app.nickname})` : null
        ].filter(Boolean).join(' '),
        createdAt: app.createdAt,
        hasExperience: app.hasExperience || app.hasResume
      })
    })
  }
  componentWillReceiveProps (props) {
    this.setState({
      apps: this.getApps(props)
    })
  }
  handleRowSelected (row) {
    window.location.href = '/admin/' + row.node.data.id
  }
  render () {
    const user = this.props.users && this.props.users[0]
    const email = user && user.info && user.info.email.toLowerCase()
    return <div className='container' style={{maxWidth: '1200px'}}>
      <h1>Admin Page</h1>
      <h3>Job Applications</h3>
      <div className='ag-fresh' style={{height: '500px'}}>
        <AgGridReact
          // listen for events with React callbacks
          onRowSelected={this.handleRowSelected.bind(this)}
          // onCellClicked={this.onCellClicked.bind(this)}

          // binding to properties within React State or Props
          // showToolPanel
          // quickFilterText

          // column definitions and row data are immutable, the grid
          // will update when these lists change
          columnDefs={this.columnDefs}
          rowData={this.state.apps}

          // or provide props the old way with no binding
          rowSelection='multiple'
          enableSorting='true'
          enableFilter='true'
          rowHeight='22'
        />
      </div>
      <AdminJobsAvailable />
      {
        email === 'tejesh.mehta@gmail.com' || email === 'hiten@univinnclemson.com'
          ? <AdminAccessControl />
          : null
      }
    </div>
  }
}

export default subscribe({
  mapDataToProps
})(AdminPage)
