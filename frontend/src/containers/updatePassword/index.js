import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { StyledForm, InnerSection, ErrorMsg } from '../../components/AuthForm';
import { Input } from '../../components/Input';
import { H2 } from '../../components/Tyopgrahy';
import { Section } from './css';
import { PrimaryButton } from '../../components/Buttons';
import { startPasswordUpdate } from '../../actions/auth';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required('Current password is required'),

  updatedPassword: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Updated password is required'),

  updatedPasswordConfirm: Yup.string()
    .trim()
    .required('Please confirm password.')
});

const UpdatePassword = () => {
  const [formError, setFormError] = useState();
  const [successful, setSuccessful] = useState();

  const dispatch = useDispatch();

  return (
    <Section>
      <InnerSection>
        <H2 id="header">
          Update Password
          <span className="screen-reader-only">in the fields below</span>
        </H2>
        <Formik
          initialValues={{
            currentPassword: '',
            updatedPassword: '',
            updatedPasswordConfirm: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            const error = await dispatch(startPasswordUpdate(values));
            if (error) {
              setFormError(error);
            } else {
              setSuccessful(true);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => {
            return (
              <StyledForm>
                <>
                  <label htmlFor="current-password">Current Password:</label>
                  <Input
                    type="text"
                    name="currentPassword"
                    id="current-password"
                    placeholder="Current Password"
                  />
                  {errors.currentPassword && touched.currentPassword && (
                    <ErrorMsg>{errors.currentPassword}</ErrorMsg>
                  )}
                </>
                <>
                  <label htmlFor="updated-password">Updated Password:</label>
                  <Input
                    type="text"
                    name="updatedPassword"
                    id="updated-password"
                    placeholder="Updated Password"
                  />
                  {errors.updatedPassword && touched.updatedPassword && (
                    <ErrorMsg>{errors.updatedPassword}</ErrorMsg>
                  )}
                </>
                <>
                  <label htmlFor="updated-password-confirm">
                    Confirm Password:
                  </label>
                  <Input
                    type="text"
                    name="updatedPasswordConfirm"
                    id="updated-password-confirm"
                    placeholder="Confirm Password"
                  />
                  {errors.updatedPasswordConfirm &&
                    touched.updatedPasswordConfirm && (
                      <ErrorMsg>{errors.updatedPasswordConfirm}</ErrorMsg>
                    )}
                </>
                {isSubmitting && <p>Uploading changes...</p>}
                {successful && <p>Password updated!</p>}

                <PrimaryButton type="submit" disabled={isSubmitting}>
                  Submit{isSubmitting ? 'ting' : ''}
                </PrimaryButton>
                {formError && <ErrorMsg>{formError}</ErrorMsg>}
              </StyledForm>
            );
          }}
        </Formik>
      </InnerSection>
    </Section>
  );
};

export default UpdatePassword;
