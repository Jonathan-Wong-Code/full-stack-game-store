import React from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { useRouter } from 'next/router';

import { PrimaryButton } from '../../src/components/Buttons';
import {
  StyledForm,
  StyledSection,
  H2,
  InnerSection
} from '../../src/components/Forms/AuthForm';
import { Input } from '../../src/components/Input';

const ResetPassword = () => {
  const {
    query: { resetToken }
  } = useRouter();

  const onSubmit = () => {};

  console.log(resetToken);
  return (
    <StyledSection aria-labelledby="reset-password-header">
      <InnerSection>
        <H2 id="reset-password-header">
          Reset Your Password
          <p className="screen-reader-only">
            Enter your password and then confirm it by typing it in again:
          </p>
        </H2>

        <StyledForm onSubmit={onSubmit}>
          <label htmlFor="reset-pass-password" className="screen-reader-only">
            New Password:
          </label>
          <Input
            type="password"
            name="password"
            id="reset-pass-password"
            placeholder="New Password"
          />

          <label
            htmlFor="reset-pass-password-confirm"
            className="screen-reader-only"
          >
            Confirm New Password:
          </label>
          <Input
            type="password"
            name="passwordConfirm"
            id="reset-pass-password-confirm"
            placeholder="Confirm Password"
          />
          <PrimaryButton>Reset Password</PrimaryButton>
        </StyledForm>
      </InnerSection>
    </StyledSection>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    password: '',
    passwordConfirm: ''
  }),

  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),

    passwordConfirm: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Password is required')
  })
})(ResetPassword);
