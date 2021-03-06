import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';
import { PrimaryButton } from '../../components/Buttons';

import { H2 } from '../../components/Tyopgrahy';
import {
  StyledForm,
  InnerSection,
  ErrorMsg,
  Links
} from '../../components/AuthForm';
import { Img, ImgContainer, FileInput, Section } from './css';
import { Input } from '../../components/Input';
import { selectAuthUser } from '../../selectors/auth';
import { updateUser } from '../../actions/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email format')
    .required('Email is required'),

  name: Yup.string()
    .trim()
    .required('Name is required'),

  photo: Yup.string()
    .trim()
    .required('Photo is required')
});

const EditProfile = () => {
  const [formError, setFormError] = useState();
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <Formik
      initialValues={{
        name: user.name ?? '',
        email: user.email ?? '',
        photo: user.photo ?? '',
        photoFile: null
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        const { name, email, photoFile } = values;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('photo', photoFile);
        const error = await dispatch(updateUser(formData));
        if (error) {
          setFormError(error);
        }
      }}
    >
      {({ errors, touched, setValues, values, isSubmitting }) => {
        const onFileChange = e => {
          const file = e.currentTarget.files[0];
          file.current = e.target.files[0];

          const fileReader = new FileReader();
          fileReader.onload = () => {
            const newFile = {
              name: file.name,
              size: file.size,
              type: file.type, // MIME type
              data: fileReader.result,
              isUploading: false
            };

            setValues({ ...values, photoFile: file, photo: newFile });
          };

          fileReader.onabort = () => {
            alert('Reading aborted');
          };

          fileReader.onerror = () => {
            alert('File reading error');
          };

          fileReader.readAsDataURL(file);
        };

        return (
          <Section>
            <InnerSection>
              <H2 id="header">
                Edit profile
                <span className="screen-reader-only">in the fields below</span>
              </H2>
              <ImgContainer>
                <Img
                  src={values.photo.data ? values.photo.data : values.photo}
                  alt="Your profile"
                />
              </ImgContainer>

              <StyledForm>
                <label htmlFor="photo">Upload New Photo</label>
                <FileInput
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={onFileChange}
                />
                <>
                  <label htmlFor="name">Name:</label>
                  <Input type="text" name="name" id="name" placeholder="Name" />
                  {errors.name && touched.name && (
                    <ErrorMsg>{errors.name}</ErrorMsg>
                  )}
                </>
                <>
                  <label htmlFor="email">Email:</label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <ErrorMsg>{errors.email}</ErrorMsg>
                  )}
                </>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  Submit{isSubmitting ? 'ting' : ''}
                </PrimaryButton>
                {formError && <ErrorMsg>{formError}</ErrorMsg>}
              </StyledForm>
              {/* eslint-disable jsx-a11y/anchor-is-valid */}

              <Links className="links">
                <Link href="/updatePassword" as="/updatePassword">
                  <a>Update password</a>
                </Link>
                <Link href="/profile" as="/profile">
                  <a>Back to profile</a>
                </Link>
              </Links>
            </InnerSection>
          </Section>
        );
      }}
    </Formik>
  );
};

export default EditProfile;
