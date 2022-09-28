import { createContext, ReactNode, useState } from "react";
import { FieldData, FormData } from "../types/forms";

export type AddFieldType = (name: string, data: FieldData) => void;
export type UpdateFieldType = (name: string, data: Partial<FieldData>) => void;

export type FormContextValue = {
  data: FormData;
  addField: AddFieldType;
  updateField: UpdateFieldType;
};

type ContextProps = {
  children: ReactNode;
};

const initialContextData: FormContextValue = {
  data: {
    fields: {},
    isValid: false,
    isReady: false,
  },
  addField: () => null,
  updateField: () => null,
};

const FormContext = createContext<FormContextValue>(initialContextData);

export const Form = ({ children }: ContextProps) => {
  const [data, setData] = useState(initialContextData.data);

  const addField: AddFieldType = (name, data) =>
    setData((state) => ({
      ...state,
      fields: { ...state.fields, [name]: data },
    }));

  // @todo - resctrict what can be updated
  const updateField: UpdateFieldType = (name, data) =>
    setData((state) => ({
      ...state,
      fields: {
        ...state.fields,
        [name]: {
          ...state.fields[name],
          ...data,
        },
      },
    }));

  return (
    <FormContext.Provider
      value={{
        data,
        addField,
        updateField,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
