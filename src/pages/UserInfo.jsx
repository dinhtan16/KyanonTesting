import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import '../styles/user.info.scss'

const UserInfo = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
 useEffect(() => {
  setPayload({
    email: userData.email || "",
    birth: userData.birth || "",
    phone: userData.phone || "",
    name: userData.fullName || "",
  });
}, [userData]);
  const [payload, setPayload] = useState();
  const [inputInvalids, setInputInvalids] = useState([]);

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchDataUser = async () => {
      const fetchData = await axios.get("http://localhost:8000/users/1");
      const res = await fetchData;
      setUserData(res?.data);
    };
    fetchDataUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  const invalidNumber =  validateUpdate(payload);
    if (invalidNumber === 0) {
      try {
        const fetch = await axios.put("http://localhost:8000/users/1", {
          email: payload.email,
          fullName: payload.name,
          birth: payload.birth,
          phone: payload.phone,
          password: '123456',
        });
        const res = await fetch;
        if(res?.status === 200){
          alert('Update Successfully, please REFRESH PAGE!')
        }
        console.log(res);
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  const validateUpdate = (payload) => {
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
        case "name": {
          if (item[1].length < 6) {
            setInputInvalids((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "FullName must be from 6 characters",
              },
            ]);
            invalid++;
          }
          break;
        }
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

        case "phone": {
          const regPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
          if (!item[1].match(regPhone))  {
            setInputInvalids((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Please check your phone again !!",
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
      <h1>Profile</h1>
      <div className="login-form-item">
        <p>FullName:</p>
        <InputForm
          setInputInvalids={setInputInvalids}
          inputInvalids={inputInvalids}
          type="text"
          name="name"
          value={ payload?.name }
          onChange={(e) => handleInputChange(e)}
        />
        {inputInvalids?.length > 0 &&
          inputInvalids?.some((item) => item.name === "name") && (
            <small
              style={{
                color: "red",
                fontStyle: "italic",
                margin: "5px 0",
              }}
            >
              {inputInvalids?.find((item) => item.name === "name")?.msg}
            </small>
          )}
      </div>
      <div className="login-form-item">
        <p>Day Of Birth:</p>
        <InputForm
          setInputInvalids={setInputInvalids}
          type="date"
          name="birth"
          value={payload?.birth}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="login-form-item">
        <p>Email:</p>
        <InputForm
          setInputInvalids={setInputInvalids}
          type="text"
          name="email"
          value={payload?.email}
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
        <p>Phone:</p>
        <InputForm
          setInputInvalids={setInputInvalids}
          type="number"
          name="phone"
          value={payload?.phone}
          onChange={(e) => handleInputChange(e)}
        />
        {inputInvalids?.length > 0 &&
          inputInvalids?.some((item) => item.name === "phone") && (
            <small
              style={{
                color: "red",
                fontStyle: "italic",
                margin: "5px 0",
              }}
            >
              {inputInvalids?.find((item) => item.name === "phone")?.msg}
            </small>
          )}
      </div>
      <div className="login-form-bottom userinfo">
        <button onClick={handleSubmit}>Update</button>
        <button onClick={() => setPayload({
    email: userData.email || "",
    birth: userData.birth || "",
    phone: userData.phone || "",
    name: userData.fullName || "",
  })} id='cancel'>Cancel</button>
      </div>
    </section>
  );
};

export default UserInfo;
