import "./App.css";
import Input from "./components/Input";
import FormContext, { Form } from "./context/FormContext";
import Submit from "./components/Submit";
import InputPassword from "./components/InputPassword";
import { useContext } from "react";

function App() {
  return (
    <div className="App">
      <Form>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p>Form Tools</p>
          <Input
            name="match"
            validation={{
              type: "match",
              relatedField: "password",
            }}
          />
          <InputPassword name="password" />
          <Submit />
        </div>
      </Form>
    </div>
  );
}

export default App;
