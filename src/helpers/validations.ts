import {
  PasswordValidation,
  MatchValidation,
  ActionableValidations,
  ParsedActionableValidationsProp,
  ValidationHandlers,
} from '../types/fields'

const DEFAULT_MESSAGES = {
  blankField: 'This field may not be blank',
  invalidEmail: 'Enter a valid email address',
  passwordMinimumSize: 'Ensure this field has at least 8 characters',
  valuesMustMatch: 'Values must match',
  minLength8: 'Ensure this field has at least 8 characters',
  invalidPhoneNumber: 'Please enter a valid phone number',
}

let boutHandlers: null | ValidationHandlers

const boutSetErrorMessage = (message: string) => {
  if (boutHandlers && 'setErrorMessage' in boutHandlers && boutHandlers.setErrorMessage)
    boutHandlers.setErrorMessage(message)
}

export const isValidEmail = (email: string) => {
  const rgx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.trim() === '') {
    // @todo is this repeating with general empty fields
    boutSetErrorMessage(DEFAULT_MESSAGES.blankField)
    return false
  } else if (!email.includes('@')) {
    boutSetErrorMessage(DEFAULT_MESSAGES.invalidEmail)
    return false
  } else if (!rgx.test(email)) {
    boutSetErrorMessage(DEFAULT_MESSAGES.invalidEmail)
    return false
  } else {
    return true
  }
}

export const isValidPassword = (password: string, config: PasswordValidation) => {
  if (!!config.minLength && password.length < config.minLength) {
    boutSetErrorMessage(DEFAULT_MESSAGES.passwordMinimumSize)
    return false
  } else {
    return true
  }
}

export const isValidMatch = (value: string, config: MatchValidation) => {
  if (config.matchValue && value !== config.matchValue) {
    boutSetErrorMessage(DEFAULT_MESSAGES.valuesMustMatch)
    return false
  } else {
    return true
  }
}

export const isValidNotEmpty = (value: string) => {
  if (!value || value.trim() === '') {
    boutSetErrorMessage(DEFAULT_MESSAGES.blankField)
    return false
  } else {
    return true
  }
}

export const isValidAgainstLength = (value: string, length: number) => {
  if (value.length < length) {
    boutSetErrorMessage(DEFAULT_MESSAGES.minLength8)
    return false
  } else {
    return true
  }
}

export const validate = (validation: ParsedActionableValidationsProp, value: string, handlers?: ValidationHandlers) => {
  boutHandlers = handlers || null
  const validationFunctions: {
    [name in ActionableValidations]: Function
  } = {
    email: (value: string) => isValidEmail(value),
    password: (value: string, config: PasswordValidation) => isValidPassword(value, config),
    match: (value: string, config: MatchValidation) => isValidMatch(value, config),
    notEmpty: (value: string) => isValidNotEmpty(value),
  }

  return (
    validationFunctions.notEmpty(value) &&
    (validation.type !== 'notEmpty' ? validationFunctions[validation.type](value, validation) : true)
  ) // does not validate notEmpty twice
}
