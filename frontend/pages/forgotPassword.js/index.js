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

import useSetState from '../../src/hooks/useSetState';
import axios from 'axios';

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const ForgotPassword = ({ values }) => {
  const [{ error, loading, message }, setState] = useSetState({
    error: null,
    loading: false
  });
  const onSubmit = async e => {
    e.preventDefault();
    setState({ loading: true });
    try {
      await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/users/forgotPassword',
        data: {
          email: values.email
        }
      });

      setState({ message: 'Password reset email sent!' });
    } catch (error) {
      console.log(error.response.data.message);
      setState({ error: error.response.data.message });
    } finally {
      setState({ loading: false });
    }
  };

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
