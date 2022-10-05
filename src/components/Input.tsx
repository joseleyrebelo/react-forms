import React, { useContext, useEffect, useState } from "react";

import { IconCircleCheck, IconEye, IconEyeOff } from "@tabler/icons";

import { Colors } from "../helpers/utils/uiSetup";
import { getTransitions } from "../helpers/utils/uiSetup";
import FormContext, {
  FieldFormValidated,
  FormFieldData,
} from "../context/FormContext";
import {
  FieldTypes,
  DynamicValidationProp,
  ParsedValidationProp,
  BluntValidations,
  ParsedActionableValidationsProp,
} from "../types/fields";
import { validate } from "../helpers/validations";

type EventTypes = Extract<keyof InputProps, "onChange" | "onFocus" | "onBlur">;

type EventHandlerType = (e: string) => void;

type EventAbstract =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export type InputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  labelText?: string;
  value?: string;
  type?: FieldTypes;
  onBlur?: EventHandlerType;
  onFocus?: EventHandlerType;
  onChange?: EventHandlerType;
  onInput?: EventHandlerType;
  readOnly?: boolean;
  maxLength?: number;
  autoComplete?: string;
  validation?: boolean | DynamicValidationProp;
};

const Input = (props: InputProps) => {
  let {
    id,
    type = "text",
    labelText = "",
    placeholder = "",
    readOnly = false,
    maxLength = undefined,
    autoComplete = "off",
  }: InputProps = props;

  const name = props.name || id || "random"; // @todo assign random / create a new variable to handle id on Form context
  const validation: ParsedValidationProp =
    typeof props.validation === "object"
      ? props.validation
      : typeof props.validation === "string"
      ? { type: props.validation }
      : props.validation === true
      ? {
          type: type === "email" ? "email" : "notEmpty",
        }
      : { type: "disabled" };

  const { fields, ...formContext } = useContext(FormContext) || null;

  const [value, setValue] = useState<string>(props.value || "");
  const [isReady, setIsReady] = useState<boolean>(false); // @todo - isValid can be true to start with (depends on value)
  const [isValid, setIsValid] = useState<boolean>(false); // @todo - isValid can be true to start with (depends on value)
  const [errorMessage, setErrorMessage] = useState<string>(""); // @todo - isValid can be true to start with (depends on value)
  const [validationBout, setValidationBout] =
    useState<ParsedValidationProp>(validation);

  const [isOnFocus, setIsOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Tag = type === "textarea" ? "textarea" : "input";

  const inSuccess = props.validation && isValid;
  const inError = props.validation && !isValid && !!errorMessage && !isOnFocus;
  const errorInHighlight = false; // @temp
  // inError && validator?.showErrorMessage;

  const runValidation = () => {
    // @todo improve - return object with prop success and errorMessage when declared
    if (validationBout.type !== "disabled") {
      // @todo - stackoverflow why typescript is not inferrring the disabled
      // const validated: ParsedActionableValidationsProp = validate(validation, value);
      const validated = validate(
        validationBout as ParsedActionableValidationsProp,
        value
      );
      if (typeof validated === "string") {
        setErrorMessage(validated);
        setIsValid(false);
      } else {
        setErrorMessage("");
        setIsValid(validated);
      }
    }
  };

  useEffect(() => {
    if (formContext) {
      formContext.addField(name, {
        name,
        type,
        validation,
        value,
        isValid,
        validationBout,
        setValidationBout,
      });
    }
    setIsReady(true);
  }, []);

  useEffect(() => runValidation(), [value, validationBout]);

  useEffect(() => {
    if (isReady && formContext)
      formContext.updateField(name, { value, isValid });
  }, [isReady, isValid, value]);

  const handleEvent = (eventType: EventTypes, e: EventAbstract) => {
    ({
      onChange: () => setValue(e.target.value),
      onBlur: () => setIsOnFocus(false),
      onFocus: () => setIsOnFocus(true),
    }[eventType]());

    props[eventType]?.(e.target.value);
  };

  return (
    <div style={{ display: "block" }}>
      <label style={{ padding: "24px" }} htmlFor={id}>
        {labelText}
      </label>
      <div style={{ position: "relative", marginTop: "12px" }}>
        {(type === "password" || inSuccess) && (
          <div
            className={
              `absolute top-0 right-0 flex items-center px-4 ` +
              `cursor-pointer ${type !== "textarea" ? "h-full" : "h-16"} `
            }
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              display: "flex",

              alignItems: "center",
              padding: "0px 16px",
              cursor: "pointer",
              height: "100%",
            }}
          >
            {inSuccess && <IconCircleCheck color={Colors.successGreen} />}
            {type === "password" && (
              <div
                className="ml-2"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <IconEye color={Colors.metalGrey} />
                ) : (
                  <IconEyeOff color={Colors.metalGrey} />
                )}
              </div>
            )}
          </div>
        )}
        <Tag
          value={value}
          id={id}
          name={name}
          readOnly={readOnly}
          onBlur={(e: EventAbstract) => handleEvent("onBlur", e)}
          onFocus={(e: EventAbstract) => handleEvent("onFocus", e)}
          onChange={(e: EventAbstract) => handleEvent("onChange", e)}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            transition: getTransitions(["background", "border"]),
            width: "100%",
            padding: "16px 48px 16px 24px",
            borderRadius: "10px",
            border: !inError ? "2px solid gray" : "2px solid red",
            boxSizing: "border-box",
            // @todo errorinhighlight different colour
          }}
          className={
            `focus:outline-none text-subheading1 px-6 pr-12 py-4 ` +
            `rounded-xl border-2 w-full border-field-gray libertad ${
              readOnly
                ? "border-opacity-100 bg-background-gray-3"
                : `${
                    inError
                      ? `bg-error-red-light ${
                          errorInHighlight && "border-error-red"
                        }`
                      : "hover:border-icon-gray"
                  } focus:bg-silver focus:border-field-gray border-opacity-100`
            }`
          }
          {...(type !== "textarea"
            ? {
                // onInput: (e: React.FormEvent<HTMLInputElement>) => handleOnInput(e), // @todo to add)
                type:
                  type !== "password"
                    ? type
                    : showPassword
                    ? "text"
                    : "password",
              }
            : null)}
        />
      </div>
      <div className="mt-2 text-subtext1">
        {/* The -0.5rem in marginBottom means to balance the class mt-2 spacing. */}
        <div
        // style={{ minHeight: "1.5em", marginBottom: "calc(-1.5em + -0.5rem)" }}
        >
          <p
            style={{
              transition: "visibility 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`validation-error text-error-red`}
          >
            {!isValid && errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Input;
