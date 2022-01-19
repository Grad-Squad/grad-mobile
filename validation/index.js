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

export const maxCharError = (t, max) => t('TextInput/max char error', { max });

const nameRequiredMaxChar = 25;
export const nameRequired = (t) =>
  yup
    .string()
    .max(nameRequiredMaxChar, maxCharError(t, nameRequiredMaxChar))
    .required(t('InputValidationError/field required'));

const biographyMaxChar = 190;
export const biography = (t) =>
  yup.string().max(biographyMaxChar, maxCharError(t, biographyMaxChar));

export const roles = Object.freeze({ student: 'student', teacher: 'teacher' });

export const roleRequired = (t) =>
  yup
    .string()
    .oneOf(Object.keys(roles))
    .required(t('InputValidationError/field required'));

const commentMaxChar = 700;
export const comment = (t) =>
  yup.string().max(commentMaxChar, maxCharError(t, commentMaxChar));

export const materialTitle = (t) =>
  yup.string().trim().max(100, maxCharError(t, 100)).required(requiredError(t));

const searchMaxChar = 100;
export const search = (t) =>
  yup.string().max(searchMaxChar, maxCharError(t, searchMaxChar));
