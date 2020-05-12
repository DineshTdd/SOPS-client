import React, { useState } from "react";
import LoginSvg from "../assets/svg/login.svg";
import { Form, Button, Icon } from "semantic-ui-react";
import "../assets/styles/auth.scss";
import { history } from "../App";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState({
    email: {
      isRequired: false,
    },
    password: {
      isRequired: false,
    },
  });
  const signIn = async () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      if (email.trim().length === 0) {
        setError((prevState) => {
          return { ...prevState, email: { ...prevState["email"], isRequired: true } };
        });
      }
      if (password.trim().length === 0) {
        setError((prevState) => {
          return { ...prevState, password: { ...prevState["password"], isRequired: true } };
        });
      }
      return;
    }
    let userDetails = {
      email,
      password,
    };
    dispatch(authActions.userLogin(userDetails));
  };
  return (
    <div className="auth-root">
      <div className="auth-svg-parent">
        <p className="auth-title">Login to SOPS</p>
        <img src={LoginSvg} alt="" className="auth-svg" />
      </div>
      <div className="auth-form-parent">
        <Form className="auth-form">
          <Form.Field required error={error["email"].isRequired} className="auth-form-field">
            <label htmlFor={"email"}>Email</label>
            <input id={"email"} value={email} onChange={(ev) => setEmail(ev.target.value)} />
          </Form.Field>
          <Form.Field required error={error["password"].isRequired} className="auth-form-field">
            <label htmlFor={"password"}>Password</label>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "110%",
              }}
            >
              <div style={{ width: "91%" }}>
                <input
                  id={"password"}
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              <div style={{ cursor: "pointer", width: "8%" }}>
                <Icon
                  name={isPasswordVisible ? "eye" : "eye slash"}
                  onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                />
              </div>
            </span>
          </Form.Field>
          <div className="auth-button-group">
            <div>
              <button
                className="auth-button"
                onClick={(ev) => {
                  ev.preventDefault();
                  history.push("/signup");
                }}
              >
                Are you new to our system?
              </button>
            </div>
            <div>
              <Button onClick={signIn}>Login</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
