import React from "react";
import "../styles/login.scss";
import InputForm from "../components/InputForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const initPayLoad = {
    email: "",
    password: "",
  };
  const [payload, setPayload] = useState(initPayLoad);
  const [inputInvalids, setInputInvalids] = useState([]);

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalidNumber = validateLogin(payload);
    if (invalidNumber === 0) {
      try {
        const fetch = await axios.get("http://localhost:8000/users/1");
        const res = await fetch;
        if (
          res?.data.email === payload.email &&
          res?.data.password === payload.password
        ) {
          navigate("/userinfo");
        } else {
          alert("password or email wrong!");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  const validateLogin = (payload) => {
    let invalid = 0;

    const inputFields = Object.entries(payload);

    inputFields.forEach((item) => {
      if (item[1] === "") {
        setInputInvalids((prev) => [
          ...prev,
          {
            name: item[0],
            msg: "Cannot be empty!",
          },
        ]);
        invalid++;
      }
    });
    inputFields.forEach((item) => {
      switch (item[0]) {
        case "email":
          {
            let emailFormat =
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!item[1].match(emailFormat)) {
              setInputInvalids((prev) => [
                ...prev,
                {
                  name: item[0],
                  msg: "Email invalid",
                },
              ]);
              invalid++;
            }
          }
          break;

        case "password": {
          if (item[1].length < 6) {
            setInputInvalids((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Password must from 6 characters",
              },
            ]);
            invalid++;
          }
          break;
        }
        default:
          break;
      }
    });
    return invalid;
  };
  return (
    <section className="login-form">
      <h1>Login</h1>
      <div className="login-form-item">
        <p>Email:</p>
        <InputForm
          setInputInvalids={setInputInvalids}
          inputInvalids={inputInvalids}
          type="text"
          name="email"
          value={payload.email}
          onChange={(e) => handleInputChange(e)}
        />
        {inputInvalids?.length > 0 &&
          inputInvalids?.some((item) => item.name === "email") && (
            <small
              style={{
                color: "red",
                fontStyle: "italic",
                margin: "5px 0",
              }}
            >
              {inputInvalids?.find((item) => item.name === "email")?.msg}
            </small>
          )}
      </div>
      <div className="login-form-item">
        <p>Password:</p>
        <InputForm
          setInputInvalids={setInputInvalids}
          type="password"
          name="password"
          value={payload.password}
          onChange={(e) => handleInputChange(e)}
        />
        {inputInvalids?.length > 0 &&
          inputInvalids?.some((item) => item.name === "password") && (
            <small
              style={{
                color: "red",
                fontStyle: "italic",
                margin: "5px 0",
              }}
            >
              {inputInvalids?.find((item) => item.name === "password")?.msg}
            </small>
          )}
      </div>
      <div className="login-form-bottom">
        <div className="show">
          <input type="checkbox" checked />
          <span> Show password</span>
        </div>
        <button onClick={handleSubmit}>Sign In</button>
      </div>
    </section>
  );
};

export default Login;
