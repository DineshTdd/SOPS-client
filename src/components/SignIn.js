import React, { useState } from "react";
import LoginSvg from "../assets/svg/login.svg";
import { Form, Button, Icon, Modal, Message } from "semantic-ui-react";
import "../assets/styles/auth.scss";
import { history } from "../App";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

export default function SignIn() {
  const dispatch = useDispatch();
  const initialState = {
    email: {
      isRequired: false,
    },
    password: {
      isRequired: false,
    },
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentFocus, setCurrentFocus] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, updateLoginStatus] = useState({
    status: "",
    message: "",
  });
  const [error, setError] = useState(initialState);

  const onFocus = (ev) => {
    setError(initialState);
    setCurrentFocus(ev.target.id);
  };

  const onBlur = () => {
    setCurrentFocus("");
  };

  const onClose = () => {
    updateLoginStatus({
      status: "",
      message: "",
    });
  };

  const onSuccess = () => {
    updateLoginStatus({
      status: "success",
      message: "Logged in successfully. Please wait while you're redirected!",
    });
    setTimeout(() => {
      updateLoginStatus({
        status: "",
        message: "",
      });
      history.push("/");
    }, 3500);
    setIsLoading((prevState) => !prevState);
  };
  const onFailure = (error) => {
    let errorMsg = error;
    if (
      !errorMsg.startsWith("Something") &&
      !errorMsg.startsWith("Please") &&
      !errorMsg.startsWith("Logging")
    ) {
      errorMsg = `Logging you in failed! Try again later!
      ${errorMsg}`;
    }
    updateLoginStatus({
      status: "error",
      message: errorMsg,
    });
    setIsLoading((prevState) => !prevState);
  };
  const enterKeyCapture = async (ev) => {
    if (ev.which === 13 || ev.keyCode === 13 || ev.key === "Enter") {
      ev.preventDefault();
      ev.stopPropagation();
      document.getElementById("email").blur();
      document.getElementById("password").blur();
      await signIn();
      return false;
    }
    return true;
  };
  const signIn = async () => {
    setIsLoading(true);
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
      setIsLoading((prevState) => !prevState);
      return;
    }
    let userDetails = {
      email,
      password,
    };
    const tryLogin = (userDetails) =>
      new Promise((resolve, reject) =>
        resolve(dispatch(authActions.userLogin(userDetails, onSuccess, onFailure)))
      );
    const triggerLogin = async (userDetails) => await tryLogin(userDetails);
    return await triggerLogin(userDetails);
  };
  return (
    <div
      className="auth-root"
      onKeyDown={(ev) => {
        return enterKeyCapture(ev);
      }}
    >
      <div className="auth-svg-parent">
        <p className="auth-title">Login to SOPS</p>
        <img src={LoginSvg} alt="" className="auth-svg" />
      </div>
      <div className="auth-form-parent">
        <Form className="auth-form">
          <Form.Field
            required
            error={currentFocus === "" && error["email"].isRequired}
            className="auth-form-field"
          >
            <label htmlFor={"email"}>Email</label>
            <input
              id={"email"}
              value={email}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </Form.Field>
          <Form.Field
            required
            error={currentFocus === "" && error["password"].isRequired}
            className="auth-form-field"
          >
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
                  onFocus={onFocus}
                  onBlur={onBlur}
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
                  if (ev.key === "Enter" || ev.keyCode === 13 || ev.which === 13) return;
                  history.push("/signup");
                }}
              >
                Are you new to our system?
              </button>
            </div>
            <div>
              <Button disabled={isLoading} loading={isLoading} onClick={signIn}>
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <Modal
        style={{ padding: 0 }}
        dimmer={"blurring"}
        open={loginStatus.status === "error" || loginStatus.status === "success"}
        closeOnDimmerClick={loginStatus.status === "error"}
        closeOnEscape={loginStatus.status === "error"}
        closeIcon={loginStatus.status === "error"}
        onClose={onClose}
      >
        <Modal.Content style={{ padding: 0 }}>
          <Message icon info>
            {loginStatus.status === "success" ? <Icon name="circle notched" loading /> : null}
            <Message.Content>
              <Message.Header>{loginStatus.status}</Message.Header>
              {loginStatus.message}
            </Message.Content>
          </Message>
        </Modal.Content>
      </Modal>
    </div>
  );
}
