import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { PrimaryButton } from '../../src/components/Buttons';
import { H2 } from '../../src/components/Tyopgrahy';

import {
  StyledForm,
  StyledSection,
  InnerSection,
  ErrorMsg
} from '../../src/components/AuthForm';

import { Input } from '../../src/components/Input';

import { startResetPassword } from '../../src/actions/auth';

const validationSchema = Yup.object().shape({
  updatedPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  updatedPasswordConfirm: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Please confirm password')
});

const ResetPassword = () => {
  const [formError, setFormError] = useState();
  const dispatch = useDispatch();

  const {
    query: { resetToken }
  } = useRouter();

  return (
    <StyledSection aria-labelledby="reset-password-header">
      <InnerSection>
        <H2 id="reset-password-header">
          Reset Your Password
          <span className="screen-reader-only">
            Enter your password and then confirm it by typing it in again:
          </span>
        </H2>
        <Formik
          initialValues={{
            updatedPassword: '',
            updatedPasswordConfirm: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            const error = await dispatch(
              startResetPassword(values, resetToken)
            );
            if (error) {
              setFormError(error);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => {
            return (
              <StyledForm>
                <>
                  <label
                    htmlFor="reset-pass-password"
                    className="screen-reader-only"
                  >
                    New Password:
                  </label>
                  <Input
                    type="password"
                    name="updatedPassword"
                    id="reset-pass-password"
                    placeholder="New Password"
                  />
                  {errors.updatedPassword && touched.updatedPassword && (
                    <ErrorMsg>{errors.updatedPassword}</ErrorMsg>
                  )}
                </>

                <>
                  <label
                    htmlFor="reset-pass-password-confirm"
                    className="screen-reader-only"
                  >
                    Confirm New Password:
                  </label>
                  <Input
                    type="password"
                    name="updatedPasswordConfirm"
                    id="reset-pass-password-confirm"
                    placeholder="Confirm Password"
                  />
                  {errors.updatedPasswordConfirm &&
                    touched.updatedPasswordConfirm && (
                      <ErrorMsg>{errors.updatedPasswordConfirm}</ErrorMsg>
                    )}
                </>
                <PrimaryButton disabled={isSubmitting} type="submit">
                  Reset {isSubmitting ? 'ting' : ''} Password
                </PrimaryButton>
                {formError && <ErrorMsg>{formError}</ErrorMsg>}
              </StyledForm>
            );
          }}
        </Formik>
      </InnerSection>
    </StyledSection>
  );
};

export default ResetPassword;
