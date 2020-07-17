import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

import Link from 'next/link';
import Router from 'next/router';

import { PrimaryButton } from '../../src/components/Buttons';
import { H2 } from '../../src/components/Tyopgrahy';

import {
  StyledForm,
  StyledSection,
  InnerSection,
  Links,
  ErrorMsg
} from '../../src/components/AuthForm';

import { Input } from '../../src/components/Input';
import useSetState from '../../src/hooks/useSetState';

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email format')
    .required('Email is required')
});

const ForgotPassword = () => {
  const [{ loading }, setState] = useSetState({
    loading: false
  });

  const onSubmit = async ({ email }) => {
    setState({ loading: true });
    try {
      await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/users/forgotPassword',
        data: { email }
      });
    } catch (error) {
      // Fail silently
    } finally {
      setState({ loading: false });
      Router.push('/password-reset-sent');
    }
  };

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
    >
      {({ errors, touched }) => (
        <StyledSection aria-labelledby="forgot-password-header">
          <InnerSection>
            <H2 id="forgot-password-header">
              Forgot Your Password?
              <span className="screen-reader-only">
                Enter your email below:
              </span>
            </H2>

            <StyledForm>
              <label htmlFor="forgot-pass-email" className="screen-reader-only">
                Email:
              </label>
              <Input name="email" id="forgot-pass-email" placeholder="Email" />

              {errors.email && touched.email && !loading && (
                <ErrorMsg>{errors.email}</ErrorMsg>
              )}

              <PrimaryButton>Submit</PrimaryButton>
              {loading && <p>Sending email...</p>}
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
      )}
    </Formik>
  );
};

export default ForgotPassword;
