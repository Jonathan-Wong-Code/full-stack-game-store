import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { StyledForm, InnerSection, ErrorMsg } from '../../components/AuthForm';
import { Input } from '../../components/Input';
import { H2 } from '../../components/Tyopgrahy';
import { Section } from './css';
import { PrimaryButton } from '../../components/Buttons';
import { startPasswordUpdate } from '../../actions/auth';
import { selectAuthError, selectAuthLoading } from '../../selectors/auth';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required('Current password is required'),

  updatedPassword: Yup.string()
    .trim()
    .required('Updated password is required'),

  updatedPasswordConfirm: Yup.string()
    .trim()
    .required('Passwords do not much.')
});

const UpdatePassword = () => {
  const [successful, setSuccessful] = useState();

  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const apiError = useSelector(selectAuthError);

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
            const success = await dispatch(startPasswordUpdate(values));
            setSuccessful(success);
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
                {apiError && !loading && <ErrorMsg>{apiError}</ErrorMsg>}
              </StyledForm>
            );
          }}
        </Formik>
      </InnerSection>
    </Section>
  );
};

export default UpdatePassword;
