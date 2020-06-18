import React from 'react';
import { shape, string } from 'prop-types';

import { useDispatch } from 'react-redux';
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
import { startLogin } from '../../src/actions/auth';

// Done becuse of next/link requires a tag.
/* eslint-disable jsx-a11y/anchor-is-valid */

const Login = ({ values }) => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = values;
    dispatch(startLogin({ email, password }));
  };

  return (
    <StyledSection aria-labelledby="login-header">
      <InnerSection>
        <H2 id="login-header">
          Sign In
          <p className="screen-reader-only"> with your credentials below:</p>
        </H2>
        <StyledForm onSubmit={onSubmit}>
          <label htmlFor="login-email" className="screen-reader-only">
            Email:
          </label>
          <Input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
          />

          <label htmlFor="login-password" className="screen-reader-only">
            Password:
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            id="login-password"
          />

          <PrimaryButton>Login</PrimaryButton>
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
  );
};

Login.propTypes = {
  values: shape({
    email: string,
    password: string
  })
};

Login.defaultProps = {
  values: {
    email: '',
    password: ''
  }
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email format')
      .required('Email is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  })
})(Login);
