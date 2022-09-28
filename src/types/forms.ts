import { useState } from "react";

export type FieldTypes = "text" | "number" | "textarea" | "password" | "email";

export type FieldValidationTypes =
  | "text"
  | "password"
  | "match"
  | "email"
  | "filled";

export type FieldValidationType =
  | true
  | FieldValidationTypes
  | { type: Extract<FieldValidationTypes, "match">; value: string };

export type FieldData = {
  name: string;
  value: string;
  type: FieldTypes;
  isValid: Boolean;
  validation?: FieldValidationType;
};

export type FormData = {
  fields: { [name: string]: FieldData };
  isValid: Boolean;
  isReady: Boolean; // @todo reevaluate
};
