import React, { Component } from 'react'

import Debug from 'debug'
import defaults from '101/defaults'
import exists from '101/exists'
import omit from '101/omit'
import put from '101/put'

import Input from './input.js'

const debug = Debug('job-app:FormGroup')

class FormGroup extends Component {
  constructor (props) {
    super(props)
    this.state = this.getState(props)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps () {
    return true
  }
  getIsVisibleMap (props, valueMap) {
    const isVisibleMap = {}
    props.fields.forEach((field) => {
      if (field.input) {
        isVisibleMap[field.input.name] = field.input.isVisible
          ? field.input.isVisible(valueMap)
          : true
      }
    })
    return isVisibleMap
  }
  getState (props) {
    const valueMap = {}
    props.fields.forEach((field) => {
      if (field.input) {
        valueMap[field.input.name] = window.bootstrapData
          ? window.bootstrapData[field.input.name]
          : field.input.value
      }
    })
    const isVisibleMap = this.getIsVisibleMap(props, valueMap)
    return {
      isVisibleMap: isVisibleMap,
      valueMap: valueMap
    }
  }
  handleChange (proxy) {
    debug('handleChange triggerred', arguments)
    this.props.fields.find((field) => {
      if (field.input.name === proxy.target.name) {
        const value = proxy.target.value
        debug('handleChange', proxy.target.name, value, proxy.target.value)
        field.input.value = value
        const valueMap = put(this.state.valueMap, proxy.target.name, value)
        this.setState({
          isVisibleMap: this.getIsVisibleMap(this.props, valueMap),
          valueMap: valueMap
        })
        if (this.props.onChange) {
          this.props.onChange(field.input)
        }
        return true
      }
      return false
    })
  }
  render () {
    return (
      <div className='form-group'>
        {
          this.props.fields.map((field) => {
            if (field.input) {
              defaults(field.input, {
                onChange: this.handleChange,
                disabled: this.props.disabled,
                value: this.state.valueMap[field.input.name]
              })
            }
            const labelProps = omit(field.label || {}, ['text', 'width'])
            defaults(labelProps, {
              className: `col-sm-${field.label && field.label.width} control-label`,
              htmlFor: field.input.name
            })
            const isVisible = this.state.isVisibleMap[field.input.name]
            return !isVisible ? [] : [
              field.title ? <h6 style={{paddingLeft: '15px'}}>{field.title}</h6> : null,
              field.label ? <label {...labelProps}>{field.label.text}</label> : null,
              <Input {...field} />,
              (field.helpText || field.clear) ? <div style={{ clear: 'both' }} /> : null,
              field.helpText ? <p className='help-block center'>{field.helpText}</p> : null
            ].filter(exists)
          }, [])
        }
      </div>
    )
  }
}

export default FormGroup
