import React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { useRouter } from 'next/router';
import { string, shape, bool } from 'prop-types';

import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { PrimaryButton } from '../../src/components/Buttons';
import { H2 } from '../../src/components/Tyopgrahy';

import {
  StyledForm,
  StyledSection,
  InnerSection
} from '../../src/components/AuthForm';

import { Input } from '../../src/components/Input';

import { startResetPassword } from '../../src/actions/auth';

const ResetPassword = ({ values, isSubmitting }) => {
  const dispatch = useDispatch();

  const {
    query: { resetToken }
  } = useRouter();

  const onSubmit = async e => {
    e.preventDefault();
    compose(dispatch, startResetPassword)(values, resetToken);
  };

  return (
    <StyledSection aria-labelledby="reset-password-header">
      <InnerSection>
        <H2 id="reset-password-header">
          Reset Your Password
          <span className="screen-reader-only">
            Enter your password and then confirm it by typing it in again:
          </span>
        </H2>

        <StyledForm onSubmit={onSubmit}>
          <label htmlFor="reset-pass-password" className="screen-reader-only">
            New Password:
          </label>
          <Input
            type="password"
            name="updatedPassword"
            id="reset-pass-password"
            placeholder="New Password"
          />

          <label
            htmlFor="reset-pass-password-confirm"
            className="screen-reader-only"
          >
            Confirm New Password:
          </label>
          <Input
            type="password"
            name="updatedPasswordConfirm"
            id="reset-pass-password-confirm"
            placeholder="Confirm Password"
          />
          <PrimaryButton disabled={isSubmitting}>
            Reset {isSubmitting ? 'ting' : ''} Password
          </PrimaryButton>
        </StyledForm>
      </InnerSection>
    </StyledSection>
  );
};

ResetPassword.propTypes = {
  values: shape({
    updatedPassword: string,
    updatedPasswordConfirm: string
  }),
  isSubmitting: bool.isRequired
};

ResetPassword.defaultProps = {
  values: shape({
    updatedPasswordConfirm: '',
    updatedPassword: ''
  })
};

export default withFormik({
  mapPropsToValues: () => ({
    updatedPassword: '',
    updatedPasswordConfirm: ''
  }),

  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),

    passwordConfirm: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Password is required')
  })
})(ResetPassword);
