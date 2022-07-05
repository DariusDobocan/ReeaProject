import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(FIELDS, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });

  return(
    <div>
      <h5>Rewiew Before Sending!</h5>
      {reviewFields}
      <button
        className="yellow darken-4 white-text btn-flat" onClick={onCancel} style={{ marginTop: '10px' }}>
        Back
        <i className='material-icons left'>keyboard_arrow_left</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="teal btn-flat white-text right" style={{ marginTop: '10px'}}>
        Send
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return{
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
