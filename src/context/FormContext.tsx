import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { FieldTypes, ParsedValidationProp } from '../types/fields'

export type AddFieldFunc = (name: string, data: FormFieldData) => void
export type UpdateFieldFunc = (name: string, updates?: Partial<FormFieldData>) => void
export type GetFieldFunc = (name: string) => string

export type FormFields = { [name: string]: FormFieldData }
export type FormValue = {
  fields: FormFields
  isValid: boolean
  isReady: boolean
  addField: AddFieldFunc
  updateField: UpdateFieldFunc
  getFieldValue: GetFieldFunc
  validateForm: () => void
}

export type FieldFormValidated = boolean | string

export type FormFieldData = {
  name: string
  value: string
  type: FieldTypes
  isValid: boolean
  validation: ParsedValidationProp
  validationBout: ParsedValidationProp
  setValidationBout: Dispatch<SetStateAction<ParsedValidationProp>>
}
type WatchingType = { [watcher: string]: Set<string> }

type ContextProps = {
  children: ReactNode
}

const initialContextData: FormValue = {
  fields: {},
  isValid: false,
  isReady: false,
  addField: () => null,
  updateField: () => null,
  getFieldValue: () => '',
  validateForm: () => null,
}

const FormContext = createContext<FormValue>(initialContextData)

export const Form = ({ children }: ContextProps) => {
  const [updatedField, setUpdatedField] = useState<{
    name: string
    time: number
  }>({ name: '', time: Date.now() })
  const [watching, setWatching] = useState<WatchingType>({})
  const [fields, setFields] = useState<FormFields>({})
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isReady] = useState<boolean>(false)

  const validationBoutMatch = (name: string, validation: ParsedValidationProp) => {
    let validationBout = validation
    if ('relatedField' in validation && validation.relatedField && validation.relatedField in fields) {
      validationBout = {
        // Excludes relatedField; Return only others
        ...(({ relatedField, ...others }) => others)(validation),
        matchValue: fields[validation.relatedField].value,
      }
    }
    fields[name].setValidationBout(validationBout)
    return validationBout
  }

  const registerWatcher = (name: string, field: FormFieldData) => {
    if ('relatedField' in field.validation && field.validation.relatedField) {
      const watchedField = field.validation.relatedField
      setWatching((watching) => ({
        ...watching,
        ...{
          [watchedField]: new Set(
            watchedField in watching ? Array.from(watching[watchedField]).concat([name]) : [name],
          ),
        },
      }))
    }
  }

  const updateWatcherFields = (watchedField: string) =>
    (watchedField in watching && watching[watchedField] ? watching[watchedField] : []).forEach(
      (watcher) => watcher in fields && updateField(watcher),
    )

  const validateForm = () => {
    setIsValid(Object.values(fields).every((field) => field.isValid))
  }

  const addField: AddFieldFunc = (name, field) => {
    registerWatcher(name, field)
    setFields((state) => ({ ...state, [name]: field }))
    setUpdatedField({ name, time: Date.now() })
  }

  // @todo - resctrict what can be updated
  const updateField: UpdateFieldFunc = (name, updates) => {
    // @todo - dissect validationBout handler -- updateValidationBout
    setFields((fields) => ({
      ...fields,
      [name]: {
        ...fields[name],
        ...(updates || null),
        validationBout:
          fields[name].validation.type === 'match' && 'relatedField' in fields[name].validation
            ? validationBoutMatch(name, fields[name].validation)
            : fields[name].validationBout,
      },
    }))

    setUpdatedField({ name, time: Date.now() })
  }

  const getFieldValue: GetFieldFunc = (name) => fields[name].value

  useEffect(() => {
    updateWatcherFields(updatedField.name)
    validateForm()
  }, [updatedField])

  return (
    <FormContext.Provider
      value={{
        fields,
        isValid,
        isReady,
        addField,
        updateField,
        getFieldValue,
        validateForm,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormContext
