import React, { useContext, useEffect, useState } from "react";

import { IconCircleCheck, IconEye, IconEyeOff } from "@tabler/icons";

import { Colors } from "../helpers/utils/uiSetup";
import { getTransitions } from "../helpers/utils/uiSetup";
import FormContext from "../context/FormContext";
import { FieldTypes, FieldValidationType } from "../types/forms";

type EventTypes = Extract<keyof Props, "onChange" | "onFocus" | "onBlur">;

type EventHandlerType = (e: string) => void;

type EventAbstract =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type Props = {
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
  validation?: FieldValidationType;
};

const Input = (props: Props) => {
  let {
    id,
    type = "text",
    labelText = "",
    placeholder = "",
    readOnly = false,
    maxLength = undefined,
    validation,
    autoComplete = "off",
  }: Props = props;

  const name = props.name || id || "random";

  const formContext = useContext(FormContext);

  const [value, setValue] = useState(props.value || "");

  const isPassword = type === "password";
  const isTextArea = type === "textarea";

  const [isOnFocus, setIsOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Tag = isTextArea ? "input" : "textarea";

  const inSuccess = false; // @temp

  // validation && validator.isValid;
  const inError = false; // @temp
  // validator && !validator.isValid && validator.hasError && !isOnFocus;
  const errorInHighlight = false; // @temp
  // inError && validator?.showErrorMessage;

  useEffect(() => {
    if (formContext)
      formContext.addField(name, {
        name,
        type,
        validation,
        value,
        isValid: false, // @todo - isValid can be true to start with (depends on value)
      });
  }, []);

  const handleEvent = (eventType: EventTypes, e: EventAbstract) => {
    const isValid = value !== ""; // @todo - run actual validation function

    if (formContext) formContext.updateField(name, { value, isValid });

    if (props[eventType]) props[eventType]?.(e.target.value);

    if (eventType === "onChange") setValue(e.target.value);
    else if (eventType === "onBlur") setIsOnFocus(false);
    else if (eventType === "onFocus") setIsOnFocus(true);
  };

  const sortedProps = {
    value,
    id,
    name,
    readOnly,
    onBlur: (e: EventAbstract) => handleEvent("onBlur", e),
    onFocus: (e: EventAbstract) => handleEvent("onFocus", e),
    onChange: (e: EventAbstract) => handleEvent("onChange", e),
    maxLength,
    placeholder,
    autoComplete,
    style: { transition: getTransitions(["background", "border"]) },
    className:
      `focus:outline-none text-subheading1 px-6 pr-12 py-4 ` +
      `rounded-xl border-2 w-full border-field-gray libertad ${
        readOnly
          ? "border-opacity-100 bg-background-gray-3"
          : `${
              inError
                ? `bg-error-red-light ${errorInHighlight && "border-error-red"}`
                : "hover:border-icon-gray"
            } focus:bg-silver focus:border-field-gray border-opacity-100`
      }`,
    ...(!isTextArea
      ? {
          // onInput: (e: React.FormEvent<HTMLInputElement>) => handleOnInput(e), // @todo to add)
          type: !isPassword ? type : showPassword ? "text" : "password",
        }
      : null),
  };

  return (
    <div className="block">
      <label className="px-6 libertad text-subtext1 text-navy" htmlFor={id}>
        {labelText}
      </label>
      <div className="mt-3 relative">
        {(isPassword || inSuccess) && (
          <div
            className={
              `absolute top-0 right-0 flex items-center px-4 ` +
              `cursor-pointer ${!isTextArea ? "h-full" : "h-16"} `
            }
          >
            {inSuccess && <IconCircleCheck color={Colors.successGreen} />}
            {isPassword && (
              <div
                className="ml-2"
                onClick={() => setShowPassword(!showPassword)}
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
        <Tag {...sortedProps} />
      </div>
      <div className="mt-2 text-subtext1">
        {/* The -0.5rem in marginBottom means to balance the class mt-2 spacing. */}
        <div
          style={{ minHeight: "1.5em", marginBottom: "calc(-1.5em + -0.5rem)" }}
        >
          <p
            style={{
              transition: "visibility 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`validation-error text-error-red`}
          >
            {/* {inError && validator?.errorMessage} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Input;
