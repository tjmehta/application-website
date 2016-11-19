import exists from '101/exists'
import React, { Component } from 'react'
import i from 'i'

import AddressFormGroup from './address-form-group.js'
import FormGroup from './form-group.js'

const inflect = i()

class EmployerFormGroups extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      required: exists(this.props.required) ? this.props.required : true
    }
  }
  componentWillReceiveProps () {
    return true
  }
  handleChange (input) {
    if (!exists(this.props.required)) return
    this.setState({
      required: Boolean(input.value)
    })
  }
  render () {
    const props = this.props
    const camel = inflect.camelize(this.props.name.replace(/ /g, '_'), false)
    return <div>
      <FormGroup
        onChange={this.handleChange}
        disabled={this.props.disabled}
        admin={this.props.admin}
        fields={[
          {
            label: {
              width: 3,
              text: `${this.props.name}:`
            },
            input: {
              required: this.state.required,
              type: 'text',
              width: 4,
              name: `${camel}`
            }
          }
        ]}
      />
      {
        this.state.required
          ? [
            <AddressFormGroup
              disabled={this.props.disabled}
              admin={this.props.admin}
              name={this.props.name} />,
            <FormGroup
              disabled={this.props.disabled}
              admin={this.props.admin}
              fields={[
                {
                  title: 'Job Information',
                  label: {
                    width: 3,
                    text: 'Job Title:'
                  },
                  input: {
                    type: 'text',
                    width: 8,
                    name: `${camel}.jobTitle`
                  },
                  clear: true
                },
                {
                  label: {
                    width: 3,
                    text: 'Start Date:'
                  },
                  input: {
                    type: 'date',
                    showYearDropdown: true,
                    width: 3,
                    name: `${camel}.startDate`
                  }
                },
                {
                  label: {
                    width: 2,
                    text: 'End Date:'
                  },
                  input: {
                    type: 'date',
                    showYearDropdown: true,
                    width: 3,
                    name: `${camel}.endDate`
                  },
                  clear: true
                },
                {
                  label: {
                    width: 3,
                    text: 'Hourly Rate/Salary:'
                  },
                  input: {
                    type: 'text',
                    width: 5,
                    name: `${camel}.salary`
                  },
                  clear: true
                },
                {
                  label: {
                    width: 3,
                    text: 'Work performed:'
                  },
                  input: {
                    type: 'textarea',
                    width: 8,
                    name: `${camel}.workPerformed`
                  }
                },
                {
                  label: {
                    width: 3,
                    text: 'Reason for Leaving:'
                  },
                  input: {
                    type: 'text',
                    isVisible (valueMap) {
                      return ~props.name.indexOf('revious') || valueMap['currentEmployer.endDate']
                    },
                    width: 8,
                    name: `${camel}.reasonForLeaving`
                  }
                }
              ]} />
          ]
          : []
      }
    </div>
  }
}

export default EmployerFormGroups
