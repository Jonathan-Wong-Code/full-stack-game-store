import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { compose } from 'redux';
import Router from 'next/router';

import Link from 'next/link';
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

import { startLogin } from '../../src/actions/auth';
import { selectAuthError, selectAuthLoading } from '../../src/selectors/auth';
import withAuth from '../../src/HoC/withAuth';
// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const Login = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  const loginError = useSelector(selectAuthError);
  const loginLoading = useSelector(selectAuthLoading);

  const onSubmit = values => {
    compose(dispatch, startLogin)(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email format')
      .required('Email is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  if (isLoggedIn) Router.push('/');

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
    >
      {({ errors, touched }) => (
        <StyledSection aria-labelledby="login-header">
          <InnerSection>
            <H2 id="login-header">
              Sign In
              <span className="screen-reader-only">
                with your credentials below:
              </span>
            </H2>

            <StyledForm>
              <label htmlFor="login-email" className="screen-reader-only">
                Email:
              </label>
              <Input
                type="email"
                name="email"
                id="login-email"
                placeholder="Email"
              />

              {errors.email && touched.email && !loginLoading && (
                <ErrorMsg>{errors.email}</ErrorMsg>
              )}

              <label htmlFor="login-password" className="screen-reader-only">
                Password:
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                id="login-password"
              />

              {errors.password && touched.password && !loginLoading && (
                <ErrorMsg>{errors.password}</ErrorMsg>
              )}
              {loginLoading && <p>Logging in...</p>}
              <PrimaryButton>Login</PrimaryButton>
              {loginError && !loginLoading && <ErrorMsg>{loginError}</ErrorMsg>}
            </StyledForm>

            <Links className="links">
              <Link href="/forgotPassword" as="/forgotPassword">
                <a>Forgot your password?</a>
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

export default withAuth(Login);
