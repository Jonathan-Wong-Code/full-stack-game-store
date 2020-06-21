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
} from '../../src/components/Forms/AuthForm';

import { Input } from '../../src/components/Input';
import useSetState from '../../src/hooks/useSetState';
import withAuth from '../../src/HoC/withAuth';

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email format')
    .required('Email is required')
});

const ForgotPassword = ({ isLoggedIn }) => {
  const [{ loading }, setState] = useSetState({
    loading: false
    // message: '',
    // error: ''
  });

  const onSubmit = async ({ email }) => {
    setState({ loading: true });
    try {
      await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/users/forgotPassword',
        data: { email }
      });
      // setState({ message: 'Password reset sent' });
    } catch (error) {
      // setState({ error: error.response.data.message });
    } finally {
      setState({ loading: false });
      Router.push('/password-reset-sent');
    }
  };

  // const onChange = (e, handleChange) => {
  //   if (message) setState({ message: '' });
  //   if (error) setState({ error: '' });
  //   handleChange(e);
  // };

  if (isLoggedIn) Router.push('/');

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
              <Input
                name="email"
                id="forgot-pass-email"
                placeholder="Email"
                // onChange={e => onChange(e, handleChange)}
              />

              {errors.email && touched.email && !loading && (
                <ErrorMsg>{errors.email}</ErrorMsg>
              )}

              <PrimaryButton>Submit</PrimaryButton>
              {/* {error && !loading && <ErrorMsg>{error}</ErrorMsg>} */}
              {loading && <p>Sending email...</p>}
              {/* {message && !loading && <p>{message}</p>} */}
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

export default withAuth(ForgotPassword);
