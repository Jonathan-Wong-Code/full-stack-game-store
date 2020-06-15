import React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { PrimaryButton } from '../../src/components/Buttons';
import {
  StyledForm,
  StyledSection,
  H2,
  InnerSection
} from '../../src/components/Forms/AuthForm';
import { Input } from '../../src/components/Input';

const ForgotPassword = () => {
  const onSubmit = () => {};

  return (
    <StyledSection aria-labelledby="forgot-password-header">
      <InnerSection>
        <H2 id="forgot-password-header">
          Forgot Your Password?
          <p className="screen-reader-only">Enter your email below:</p>
        </H2>

        <StyledForm onSubmit={onSubmit}>
          <label htmlFor="forgot-pass-email" className="screen-reader-only">
            Email:
          </label>
          <Input
            type="email"
            name="email"
            id="forgot-pass-email"
            placeholder="Email"
          />
          <PrimaryButton>Submit</PrimaryButton>
        </StyledForm>
      </InnerSection>
    </StyledSection>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: ''
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email format')
      .required('Email is required')
  })
})(ForgotPassword);
