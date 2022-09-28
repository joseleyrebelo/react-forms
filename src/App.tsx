import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Input from "./components/Input";
import { Form } from "./context/FormContext";
import Submit from "./components/Submit";

function App() {
  return (
    <div className="App">
      <Form>
        <p>Form Tools</p>
        <Input name="test1" />
        <Input name="test2" />
        <Input name="test3" />
        <Submit />
      </Form>
    </div>
  );
}

export default App;
