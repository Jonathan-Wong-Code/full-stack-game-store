import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';

import Link from 'next/link';

import {
  StyledForm,
  StyledSection,
  InnerSection,
  Links,
  ErrorMsg
} from '../../src/components/AuthForm';

import { selectAuthError, selectAuthLoading } from '../../src/selectors/auth';
import { startSignup, clearLoginError } from '../../src/actions/auth';
import { PrimaryButton } from '../../src/components/Buttons';
import { H2 } from '../../src/components/Tyopgrahy';
import { Input } from '../../src/components/Input';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Enter a valid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .min(8, 'Password confirm must be at least 8 characters')
    .required('Password confirmation required')
});

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const Signup = () => {
  const dispatch = useDispatch();

  const loginError = useSelector(selectAuthError);
  const loginLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    return () => dispatch(clearLoginError());
  }, []);

  const onSubmit = values => {
    compose(dispatch, startSignup)(values);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <StyledSection aria-labelledby="forgot-password-header">
          <InnerSection>
            <H2 id="forgot-password-header">
              Signup
              <span className="screen-reader-only">
                Fill in the follow fields below:
              </span>
            </H2>

            <StyledForm>
              <>
                <label htmlFor="signup-name" className="screen-reader-only">
                  Name:
                </label>
                <Input name="name" id="signup-name" placeholder="Name" />
                {errors.name && touched.name && !loginLoading && (
                  <ErrorMsg>{errors.name}</ErrorMsg>
                )}
              </>

              <>
                <label htmlFor="signup-email" className="screen-reader-only">
                  Email:
                </label>
                <Input name="email" id="signup-email" placeholder="Email" />
                {errors.email && touched.email && !loginLoading && (
                  <ErrorMsg>{errors.email}</ErrorMsg>
                )}
              </>

              <>
                <label htmlFor="signup-password" className="screen-reader-only">
                  Password:
                </label>
                <Input
                  type="password"
                  name="password"
                  id="signup-password"
                  placeholder="Password"
                />
                {errors.password && touched.password && !loginLoading && (
                  <ErrorMsg>{errors.password}</ErrorMsg>
                )}
              </>

              <>
                <label
                  htmlFor="signup-password-confirm"
                  className="screen-reader-only"
                >
                  Confirm Password:
                </label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  id="signup-password-confirm"
                  placeholder="Confirm Password"
                />
                {errors.passwordConfirm &&
                  touched.passwordConfirm &&
                  !loginLoading && (
                    <ErrorMsg>{errors.passwordConfirm}</ErrorMsg>
                  )}
              </>

              <PrimaryButton>Submit</PrimaryButton>
              {loginLoading && <p>Signing up...</p>}
              {loginError && !loginLoading && (
                <ErrorMsg apiError>{loginError}</ErrorMsg>
              )}
            </StyledForm>

            <Links className="links">
              <Link href="/login" as="/login">
                <a>Login to Account</a>
              </Link>
              <Link href="/forgotPassword" as="/forgotPassword">
                <a>Forgot your password?</a>
              </Link>
            </Links>
          </InnerSection>
        </StyledSection>
      )}
    </Formik>
  );
};

export default Signup;
