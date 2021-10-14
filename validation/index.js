import * as yup from 'yup';

export const requiredError = (t) => t('InputValidationError/field required');

export const emailRequired = (t) =>
  yup
    .string()
    .email(t('InputValidationError/invalid email'))
    .required(requiredError(t))
    .trim();

export const passwordRequired = (t) =>
  yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/g,
      t('InputValidationError/invalid password')
    )
    .required(t('InputValidationError/field required'));

const nameRequiredMaxChar = 25;
export const nameRequired = (t) =>
  yup
    .string()
    .max(
      nameRequiredMaxChar,
      t('TextInput/max char error', { max: nameRequiredMaxChar })
    )
    .required(t('InputValidationError/field required'));

const biographyMaxChar = 190;
export const biography = (t) =>
  yup
    .string()
    .max(
      biographyMaxChar,
      t('TextInput/max char error', { max: biographyMaxChar })
    );

export const roles = Object.freeze({ student: 'student', teacher: 'teacher' });

export const roleRequired = (t) =>
  yup
    .string()
    .oneOf(Object.keys(roles))
    .required(t('InputValidationError/field required'));

const commentMaxChar = 700;
export const comment = (t) =>
  yup
    .string()
    .max(
      commentMaxChar,
      t('TextInput/max char error', { max: commentMaxChar })
    );
