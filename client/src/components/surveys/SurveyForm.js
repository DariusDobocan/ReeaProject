import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {
  renderFields(){
    return _.map(FIELDS, ({label, name}) => {
      return (<Field key={name} component={SurveyField} type="text" label={label} name={name} />
    );
    });
  }
  render(){
    return(
      <div>
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="yellow darken-4 btn-flat white-text" >
          Cancel
          <i className="material-icons right">cancel</i>
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
        Next
        <i className="material-icons right">done</i>
        </button>
      </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if(!values[name]){
      errors[name]= 'You cannot let this field empty';
    }
  });

  errors.recipients = validateEmails(values.recipients || '');
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
