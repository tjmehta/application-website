import React, { Component } from 'react'
import Debug from 'debug'
import { subscribe } from 'horizon-react'

import AddressFormGroup from './address-form-group.js'
import FormGroup from './form-group.js'
import ReferenceFormGroup from './reference-form-group.js'
import WorkHistoryFieldset from './work-history-fieldset.js'

const debug = Debug('App')

const mapDataToProps = {
  positions: (hz) => hz('positions')
}

class JobAppForm extends Component {
  renderApplicationInformation () {
    return <fieldset>
      <legend>Applicant Information</legend>
      <FormGroup disabled={this.props.disabled} fields={[
        {
          title: 'Name and Age',
          label: {
            width: 2,
            text: 'Full Name:'
          },
          input: {
            width: 3,
            name: 'fname',
            placeholder: 'First Name'
          }
        }, {
          input: {
            width: 3,
            required: false,
            name: 'mname',
            placeholder: 'Middle'
          }
        }, {
          input: {
            width: 3,
            name: 'lname',
            placeholder: 'Last Name'
          }
        }, {
          label: {
            width: 2,
            text: 'Nickname:'
          },
          input: {
            required: false,
            width: 4,
            name: 'nickname'
          }
        }, {
          label: {
            width: 2,
            text: 'Birthdate:'
          },
          input: {
            type: 'date',
            width: 3,
            name: 'birthdate',
            showYearDropdown: true
          }
        }
      ]} />
      <AddressFormGroup disabled={this.props.disabled}
        title='Contact Information'
        autocomplete
        phone
        name='Applicant'
        leftWidth={2} />
    </fieldset>
  }
  renderQuestions () {
    return <fieldset>
      <legend>Questions</legend>
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'What position(s) are you applying for?'
          },
          input: {
            type: 'select',
            multi: true,
            searchable: true,
            options: this.props.positions
              .map((position) => position.title)
              .sort()
              .map((val) => ({ value: val, label: val })),
            width: 4,
            name: 'position',
            placeholder: 'Positions Applying For'
          }
        }
      ]} />
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'On what date would you be able to start work?'
          },
          input: {
            type: 'date',
            width: 3,
            name: 'startDate',
            placeholder: 'Start Date'
          }
        }
      ]} />
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'Have you ever been convicted of a crime in the last ten years?'
          },
          input: {
            type: 'select',
            width: 3,
            name: 'criminal',
            values: ['Yes', 'No'],
            options: [
              'Yes',
              'No'
            ].map((val) => ({ value: val, label: val })),
            placeholder: 'Select'
          },
          helpText: '(Criminal convictions are not an absolute ban to employment but may limit job positions)'
        },
        {
          label: {
            width: 7,
            text: 'Please describe your criminal conviction:'
          },
          input: {
            name: 'criminalDescription',
            isVisible (valueMap) {
              var isVisible = valueMap['criminal'] === 'Yes'
              debug('criminalDescription.isVisible', isVisible, valueMap)
              return isVisible
            },
            offset: 2,
            width: 8,
            type: 'textarea'
          }
        }
      ]} />
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'Have you ever been employed in the University Inn?'
          },
          input: {
            type: 'select',
            width: 3,
            name: 'previouslyEmployed',
            options: [
              'Yes',
              'No'
            ].map((val) => ({ value: val, label: val })),
            placeholder: 'Select'
          }
        }
      ]} />
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'Have you ever applied for a position at the University Inn?'
          },
          input: {
            type: 'select',
            width: 3,
            name: 'previouslyApplied',
            options: [
              'Yes',
              'No'
            ].map((val) => ({ value: val, label: val })),
            placeholder: 'Select'
          }
        },
        {
          label: {
            width: 7,
            text: 'What position did you previously apply for?'
          },
          input: {
            name: 'previouslyAppliedPosition',
            isVisible (valueMap) {
              var isVisible = valueMap['previouslyApplied'] === 'Yes'
              debug('previouslyAppliedPosition.isVisible', isVisible, valueMap)
              return isVisible
            },
            width: 4,
            type: 'text'
          }
        }
      ]} />
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'Are you legally eligible for employment?'
          },
          input: {
            type: 'select',
            width: 3,
            name: 'eligibleForEmployment',
            options: [
              'Yes',
              'No'
            ].map((val) => ({ value: val, label: val })),
            placeholder: 'Select'
          },
          helpText: '(Proof of U.S. citizenship or immigration status will be required)'
        }
      ]} />
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 7,
            text: 'Were you referred to the University Inn?'
          },
          input: {
            type: 'select',
            width: 3,
            name: 'wasReferred',
            options: [
              'Yes',
              'No'
            ].map((val) => ({ value: val, label: val })),
            placeholder: 'Select'
          }
        },
        {
          label: {
            width: 7,
            text: 'Who were you referred by?'
          },
          input: {
            name: 'referrer',
            isVisible (valueMap) {
              var isVisible = valueMap['wasReferred'] === 'Yes'
              debug('referrer.isVisible', isVisible, valueMap)
              return isVisible
            },
            width: 4,
            type: 'text'
          }
        }
      ]} />
    </fieldset>
  }
  renderEducation () {
    return <fieldset>
      <legend>Education</legend>
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 4,
            text: 'Highest level of education?'
          },
          input: {
            type: 'select',
            options: [
              'High school',
              'College/University',
              'Trade or Business school'
            ].map((val) => ({ value: val, label: val })),
            width: 4,
            name: 'educationLevel',
            placeholder: 'Education Level'
          },
          clear: true
        },
        {
          label: {
            width: 4,
            text: 'School Name:'
          },
          input: {
            name: 'schoolName',
            isVisible (valueMap) {
              var isVisible = valueMap['educationLevel']
              debug('schoolName.isVisible', isVisible, valueMap)
              return isVisible
            },
            width: 4,
            type: 'text'
          },
          clear: true
        },
        {
          label: {
            width: 4,
            text: 'Degree:'
          },
          input: {
            name: 'degree',
            required: false,
            isVisible (valueMap) {
              var isVisible = valueMap['educationLevel']
              debug('degree.isVisible', isVisible, valueMap)
              return isVisible
            },
            width: 4,
            type: 'text'
          },
          clear: true
        }
      ]} />
    </fieldset>
  }
  renderAgreement () {
    return <fieldset>
      <legend>Agreement</legend>
      <p>
      I certify that answers given herein are true and complete to the best of my knowledge. I authorize investigation of all statements contained in this application for employment as may be necessary in arriving at an employment decision. In the event of employment, I understand that false or misleading information given in my application or interview(s) would result in discharge. I understand, also, that I am required by all rules and regulations of the Company.
      I understand that nothing contained in the application or discussed during an interview, if granted creates or is intended to create an employment contract between the Company and me.
      In addition, I understand and agree that if I am employed; my employment is for not definite or determinable period and may be terminated at any time, with or without prior notice, at the option of either the Company or me.
      I authorize and release from liability all employers, persons, schools, law enforcement agencies, and other organizations named in this application to provide information requested by 1) Intercontinental Hotels Group 2) University Inn, and 3) its subsidiaries
      I understand that no manager, or representative of the Company, other than the chief operating office of the Company, has any authority to enter into any agreement for employment for any specified period of time or make any agreement contrary to the information stated in this application.
      I agree to conform to the rules and regulations of the Company, and understand that my employment and compensation can be terminated, with or without cause, and with or without notice, at any time at the option of either the Company or me.
      </p>
      <FormGroup disabled={this.props.disabled} fields={[
        {
          label: {
            width: 2,
            text: 'Agree?'
          },
          input: {
            type: 'checkboxes',
            required: true,
            width: 1,
            name: 'agree',
            values: ['Yes']
          }
        },
        {
          label: {
            width: 2,
            text: 'Full Name:'
          },
          input: {
            width: 5,
            name: 'agree.name',
            placeholder: 'Full Name'
          }
        }
      ]} />
      {
       this.props.noButton
        ? null
        : this.renderButton()
      }
    </fieldset>
  }
  renderButton () {
    return <div className='form-group'>
      <div className='col-sm-offset-3'>
        <button type='submit' disabled={this.props.disabled} className='btn btn-primary col-sm-7'>Submit</button>
      </div>
    </div>
  }
  render () {
    return <form className='form-horizontal' onSubmit={this.props.onSubmit} encType='multipart/form-data' method='post' size='50000'>
      { this.renderApplicationInformation() }
      { this.renderQuestions() }
      { this.renderEducation() }
      <WorkHistoryFieldset disabled={this.props.disabled} />
      <fieldset>
        <legend>References</legend>
        <ReferenceFormGroup disabled={this.props.disabled} name={1} />
        <ReferenceFormGroup disabled={this.props.disabled} name={2} required={false} />
        <ReferenceFormGroup disabled={this.props.disabled} name={3} required={false} />
      </fieldset>
      {
        this.props.noButton
          ? null
          : this.renderAgreement()
      }
    </form>
  }
}

export default subscribe({
  mapDataToProps
})(JobAppForm)
