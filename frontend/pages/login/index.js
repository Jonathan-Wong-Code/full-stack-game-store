import React, { useEffect } from 'react';
// import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { compose } from 'redux';

import Link from 'next/link';
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

import { startLogin, clearLoginError } from '../../src/actions/auth';
import { selectAuthError, selectAuthLoading } from '../../src/selectors/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const Login = () => {
  const dispatch = useDispatch();

  const loginError = useSelector(selectAuthError);
  const loginLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    return () => dispatch(clearLoginError());
  }, []);

  const onSubmit = async values => {
    await compose(dispatch, startLogin)(values);
    // Router.push('/');
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values)}
    >
      {({ errors, touched, isSubmitting }) => (
        <StyledSection aria-labelledby="login-header">
          <InnerSection>
            <H2 id="login-header">
              Sign In
              <span className="screen-reader-only">
                with your credentials below:
              </span>
            </H2>

            <StyledForm>
              <>
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
              </>

              <>
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
              </>

              <PrimaryButton disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </PrimaryButton>
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

export default Login;
