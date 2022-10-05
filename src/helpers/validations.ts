import {
  PasswordValidation,
  DynamicValidationProp,
  MatchValidation,
  ValidationTypes,
  ActionableValidations,
  ParsedValidationProp,
  BluntValidations,
  ParsedActionableValidationsProp,
} from "../types/fields";

const defaultMessages = {
  blankField: "This field may not be blank",
  invalidEmail: "Enter a valid email address",
  passwordMinimumSize: "Ensure this field has at least 8 characters",
  valuesMustMatch: "Values must match",
  minLength8: "Ensure this field has at least 8 characters",
  invalidPhoneNumber: "Please enter a valid phone number",
};

export const isValidEmail = (email: string) => {
  const rgx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim() === "") {
    return defaultMessages.blankField;
  } else if (!email.includes("@")) {
    return defaultMessages.invalidEmail;
  } else if (!rgx.test(email)) {
    return defaultMessages.invalidEmail;
  } else {
    return true;
  }
};

export const isValidPassword = (
  password: string,
  config: PasswordValidation
) => {
  if (!!config.minLength && password.length < config.minLength) {
    return defaultMessages.passwordMinimumSize;
  } else {
    return true;
  }
};

export const isValidMatch = (value: string, config: MatchValidation) => {
  if (config.relatedField) {
    return null;
  } else if (config.matchValue && value !== config.matchValue) {
    return defaultMessages.valuesMustMatch;
  } else {
    return true;
  }
};

export const isValidNotEmpty = (value: string) => {
  if (!value || value.trim() === "") {
    return defaultMessages.blankField;
  } else {
    return true;
  }
};

export const isValidAgainstLength = (value: string, length: number) => {
  if (value.length < length) {
    return defaultMessages.minLength8;
  } else {
    return true;
  }
};

export const validate = (
  validation: ParsedActionableValidationsProp,
  value: string
) => {
  const validationTypesToFuncs: {
    [name in ActionableValidations]: Function;
  } = {
    email: (value: string) => isValidEmail(value),
    password: (value: string, config: PasswordValidation) =>
      isValidPassword(value, config),
    match: (value: string, config: MatchValidation) =>
      isValidMatch(value, config),
    notEmpty: (value: string) => isValidNotEmpty(value),
  };

  return validationTypesToFuncs[validation.type](value, validation);
};
