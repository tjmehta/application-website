import React, { Component } from 'react'
import i from 'i'

import exists from '101/exists'

import FormGroup from './form-group.js'

const inflect = i()

class AddressFormGroup extends Component {
  componentWillReceiveProps () {
    return true
  }
  render () {
    const camel = inflect.camelize(this.props.name.replace(/ /g, '_'), false)
    const autocomplete = this.props.autocomplete
    return <FormGroup disabled={this.props.disabled} admin={this.props.admin} fields={[
      this.props.phone
        ? {
          title: this.props.title || `${this.props.name} Address`,
          label: {
            width: this.props.leftWidth || 3,
            text: 'Phone:'
          },
          input: {
            type: 'tel',
            width: 4,
            name: !autocomplete ? `${camel}.homePhone` : 'homePhone',
            placeholder: 'Home Phone Number'
          }
        }
        : null,
      this.props.phone
        ? {
          label: {
            width: 1,
            text: 'Email:'
          },
          input: {
            type: 'email',
            width: 4,
            name: !autocomplete ? `${camel}.email` : 'email',
            placeholder: 'Email Address'
          },
          clear: true
        }
        : null,
      {
        title: !this.props.phone ? this.props.title || `${this.props.name} Address` : null,
        label: {
          width: this.props.leftWidth || 3,
          text: 'Address 1:'
        },
        input: {
          width: 9,
          name: !autocomplete ? `${camel}.line1` : 'address1',
          placeholder: 'Address Line 1'
        }
      }, {
        label: {
          width: this.props.leftWidth || 3,
          text: 'Address 2:'
        },
        input: {
          width: 9,
          required: false,
          name: !autocomplete ? `${camel}.line2` : 'address2',
          placeholder: 'Address Line 2'
        }
      }, {
        label: {
          width: this.props.leftWidth || 3,
          text: 'City:'
        },
        input: {
          width: 3,
          name: !autocomplete ? `${camel}.city` : 'city'
        }
      }, {
        label: {
          width: 1,
          text: 'State:'
        },
        input: {
          width: 2,
          name: !autocomplete ? `${camel}.state` : 'state'
        }
      }, {
        label: {
          width: 1,
          text: 'Zipcode:'
        },
        input: {
          width: 2,
          name: !autocomplete ? `${camel}.zipcode` : 'zipcode'
        }
      }
    ].filter(exists)} />
  }
}

export default AddressFormGroup
