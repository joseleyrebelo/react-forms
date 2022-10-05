export type FieldTypes = "text" | "number" | "textarea" | "password" | "email";

export type ValidationTypes =
  | "password"
  | "match"
  | "email"
  | "notEmpty"
  | "disabled";

export type TailoredValidations = Extract<
  ValidationTypes,
  "match" | "password"
>;

export type BluntValidations = Exclude<ValidationTypes, TailoredValidations>;

export type UnactionableValidations = Extract<ValidationTypes, "disabled">;
export type ActionableValidations = Exclude<
  ValidationTypes,
  UnactionableValidations
>;

export type MatchValidation = {
  type: Extract<TailoredValidations, "match">;
  relatedField?: string; // @todo allow only one
  matchValue?: string;
};

export type PasswordValidation = {
  type: Extract<TailoredValidations, "password">;
  minLength?: number;
  // @todo - more configuration options
};

export type DynamicValidationProp =
  | BluntValidations
  | MatchValidation
  | PasswordValidation;

export type ParsedValidationProp =
  | Exclude<DynamicValidationProp, BluntValidations>
  | { type: BluntValidations };

export type ParsedActionableValidationsProp =
  | Exclude<DynamicValidationProp, BluntValidations>
  | { type: Exclude<BluntValidations, UnactionableValidations> };
