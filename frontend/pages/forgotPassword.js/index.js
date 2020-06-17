import React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import Link from 'next/link';
import { PrimaryButton } from '../../src/components/Buttons';
import {
  StyledForm,
  StyledSection,
  H2,
  InnerSection,
  Links
} from '../../src/components/Forms/AuthForm';
import { Input } from '../../src/components/Input';

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

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

        <Links className="links">
          <Link href="/login" as="/login">
            <a>Login to Account</a>
          </Link>
          <Link href="/signup" as="/signup">
            <a>Sign up</a>
          </Link>
        </Links>
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
