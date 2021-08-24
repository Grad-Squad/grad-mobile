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

