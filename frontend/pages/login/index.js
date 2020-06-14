import React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { PrimaryButton } from '../../src/components/Buttons';
import { StyledForm, StyledSection, H2 } from './css';
import { Input } from '../../src/components/Input';

const Login = () => (
  <StyledSection aria-labelledby="login-header">
    <H2 id="login-header">Sign In</H2>
    <StyledForm>
      <Input type="email" name="email" />
      <Input type="password" name="password" />
      <PrimaryButton>Login</PrimaryButton>
    </StyledForm>
  </StyledSection>
);

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
  }),

  handleSubmit: () => {
    console.log('submitting');
  }
})(Login);
