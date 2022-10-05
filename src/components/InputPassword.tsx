import { useState } from "react";

import Input, { InputProps } from "./Input";

const InputPassword = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // @todo toggle

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      validation={{ type: "password" }}
    />
  );
};

export default InputPassword;
