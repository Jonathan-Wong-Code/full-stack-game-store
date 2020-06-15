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

const Login = () => {
  const onSubmit = () => {
    // Dispatch and login.
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
      </InnerSection>
    </StyledSection>
  );
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
