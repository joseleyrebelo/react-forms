import { useContext } from "react";
import FormContext from "../context/FormContext";

interface Props {}

const Submit = ({}: Props) => {
  const formContext = useContext(FormContext);
  const handler = () => {
    console.log(formContext.data);
  };
  return (
    <div
      style={{ padding: "10px;", backgroundColor: "black", color: "white" }}
      onClick={handler}
    >
      submit
    </div>
  );
};

export default Submit;
