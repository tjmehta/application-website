import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import Debug from 'debug'
import defaults from '101/defaults'
import omit from '101/omit'
import pluck from '101/pluck'
import put from '101/put'
import ReactSelect from 'react-select'

const debug = Debug('job-app:Input')

class Input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps () {
    return true
  }
  render () {
    const divProps = this.props.div || {}
    const inputProps = omit(this.props.input || {}, ['width', 'offset', 'isVisible'])
    defaults(inputProps, {
      required: true,
      className: 'form-control',
      type: 'text',
      value: ''
    })
    defaults(inputProps, {
      placeholder: this.props.label && this.props.label.text.split(' ').length < 4
        ? this.props.label.text.slice(0, -1)
        : ''
    })
    if (inputProps.required === false) {
      inputProps.placeholder += ' (optional)'
    }
    debug('render', inputProps)
    switch (inputProps.type) {
      case 'checkboxes':
        return this.renderCheckboxes(divProps, inputProps)
      case 'date':
        return this.renderDate(divProps, inputProps)
      case 'dateRange':
        return this.renderDateRange(divProps, inputProps)
      case 'select':
        return this.renderSelect(divProps, inputProps)
      case 'email':
      case 'tel':
      case 'text':
      case 'hidden':
        return this.renderText(divProps, inputProps)
      case 'textarea':
        return this.renderTextArea(divProps, inputProps)
      default:
        throw new Error(`unknown type: ${inputProps.type}`)
    }
  }
  renderCheckboxes (divProps, inputProps) {
    defaults(divProps, {
      className: `col-sm-${this.props.input && this.props.input.width}`
    })
    const commonInputProps = omit(inputProps, ['values'])
    commonInputProps.type = 'checkbox'
    defaults(commonInputProps, {
      style: {
        top: '-1px',
        marginTop: '0px'
      }
    })
    return <div {...divProps}>
      {
        this.props.input.values.map((value, i) => {
          const inputProps = put(commonInputProps, {
            checked: commonInputProps.value === value,
            value: value
          })
          return <label key={inputProps.name + i} className='checkbox-inline'>
            <input {...inputProps} /><span>{value}</span>
          </label>
        })
      }
    </div>
  }
  renderDate (divProps, inputProps) {
    const inputOnChange = inputProps.onChange
    defaults(divProps, {
      className: `col-sm-${this.props.input && this.props.input.width} date`
    })
    defaults(inputProps, {
      onChange: onChange
    })
    if (window.bootstrapData) {
      inputProps.type = 'text'
      return <div {...divProps}>
        <input {...inputProps} />
      </div>
    }
    inputProps = omit(inputProps, ['onChange'])
    inputProps.placeholderText = inputProps.placeholder
    delete inputProps.placeholder
    function onChange (val) {
      // mock proxy, so works like normal input
      inputOnChange({
        target: {
          name: inputProps.name,
          value: val
        }
      })
    }
    if (inputProps.value) {
      inputProps.selected = inputProps.value
    }
    inputProps = omit(inputProps, ['value'])
    debug('renderDate', inputProps)
    return <div {...divProps}>
      <DatePicker {...inputProps} />
      <div className='input-group-addon'>
        <span className='glyphicon glyphicon-calendar' />
      </div>
    </div>
  }
  renderDateRange (divProps, inputProps) {
    inputProps.type = 'text' // override
    inputProps = omit(inputProps, ['type'])
    defaults(divProps, {
      className: `col-sm-${this.props.input && this.props.input.width} input-date-range`,
      'data-provide': 'datepicker'
    })
    const startInputProps = put(inputProps, 'name', inputProps.name + 'Start')
    const endInputProps = put(inputProps, 'name', inputProps.name + 'End')
    return <div {...divProps}>
      <input {...startInputProps} />
      <span className='input-group-addon'>to</span>
      <input {...endInputProps} />
    </div>
  }
  renderSelect (divProps, inputProps) {
    const inputOnChange = inputProps.onChange
    inputProps = omit(inputProps, ['type', 'className', 'onChange'])
    defaults(divProps, {
      className: `col-sm-${this.props.input && this.props.input.width}`,
      onChange: onChange
    })
    function onChange (props) {
      if (props && props.target) {
        // hack: search..
        return
      }
      // mock proxy, so works like normal input
      if (inputProps.multi) {
        props = {
          value: props.map(pluck('value')).join(',')
        }
      }
      props = props || {value: null}
      inputOnChange({
        target: put(props, 'name', inputProps.name)
      })
    }
    var value = this.props.input.value
    // if (inputProps.multiple) {
    //   value = value || []
    // }
    debug('renderSelect', inputProps)
    return <div {...divProps}>
      <ReactSelect {...inputProps} onChange={onChange} value={value} />
    </div>
  }
  renderText (divProps, inputProps) {
    defaults(divProps, {
      className: `col-sm-${this.props.input && this.props.input.width}`
    })
    return <div {...divProps}>
      <input {...inputProps} />
    </div>
  }
  renderTextArea (divProps, inputProps) {
    defaults(divProps, {
      className: `col-sm-${this.props.input && this.props.input.width}`
    })
    if (this.props.input.offset) {
      divProps.className += ' col-sm-offset-' + this.props.input.offset
    }
    inputProps = omit(inputProps, 'type')
    return <div {...divProps}>
      <textarea {...inputProps} />
    </div>
  }
}

export default Input
