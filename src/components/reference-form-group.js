import exists from '101/exists'
import React, { Component } from 'react'

import FormGroup from './form-group.js'

class ReferenceFormGroup extends Component {
  render () {
    const name = this.props.name
    let required = this.props.required
    required = exists(required) ? required : true
    return <FormGroup disabled={this.props.disabled} admin={this.props.admin} fields={[
      {
        label: {
          width: 3,
          text: `Reference ${name}:`
        },
        input: {
          type: 'text',
          required: required,
          width: 3,
          name: `reference${name}.name`,
          placeholder: 'Name'
        }
      },
      {
        input: {
          type: 'text',
          required: required,
          width: 3,
          name: `reference${name}.business`,
          placeholder: 'Business'
        }
      },
      {
        input: {
          type: 'tel',
          required: required,
          width: 3,
          name: `reference${name}.phone`,
          placeholder: 'Phone'
        },
        clear: true
      }
    ]} />
  }
}

export default ReferenceFormGroup
