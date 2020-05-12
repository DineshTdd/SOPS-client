import React, { useState } from "react";
import SignUpSvg from "../assets/svg/signup.svg";
import { Form, Button, Icon } from "semantic-ui-react";
import "../assets/styles/auth.scss";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

export default function SignUp() {
  const initialState = {
    username: {
      isRequired: false,
      validationErrMsg: "",
      isValidError: false,
    },
    password: {
      isRequired: false,
      validationErrMsg: "",
      isValidError: false,
    },
    email: {
      isRequired: false,
      validationErrMsg: "",
      isValidError: false,
    },
    repeatPassword: {
      isRequired: false,
      validationErrMsg: "",
      isValidError: false,
    },
  };
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [currentFocus, setCurrentFocus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const setFocus = (ev) => {
    setError(initialState);
    setCurrentFocus(ev.target.id);
  };
  const setBlur = (ev) => {
    setCurrentFocus("");
  };

  const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    let re = /^([a-zA-Z0-9]){3,30}$/;
    return re.test(username);
  };

  const validatePassword = (password) => {
    let re = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$/;
    return re.test(password);
  };

  const validateRepeatPassword = (repeatPassword) => {
    if (
      JSON.stringify(initialState["repeatPassword"]) === JSON.stringify(error["repeatPassword"])
    ) {
      if (password === repeatPassword) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const setValidationError = async (isRequired, isValidError, message, key) => {
    setError((prevState) => {
      return {
        ...prevState,
        [key]: {
          isRequired,
          isValidError,
          validationErrMsg: message,
        },
      };
    });
    return 1;
  };

  const onSignUp = async () => {
    let err = false;
    const validate = (validationErr) =>
      new Promise((resolve, reject) => {
        Promise.all(
          Object.keys(error).map(async (key) => {
            // eslint-disable-next-line
            if (eval(key).trim().length === 0) {
              validationErr = true;
              await setValidationError(true, false, "", key);
            } else {
              switch (key) {
                case "email":
                  // eslint-disable-next-line
                  if (!validateEmail(eval(key))) {
                    validationErr = true;
                    await setValidationError(
                      error[key].isRequired,
                      true,
                      "Enter a valid email!",
                      key
                    );
                  }
                  break;
                case "username":
                  // eslint-disable-next-line
                  if (!validateUsername(eval(key))) {
                    validationErr = true;
                    await setValidationError(
                      error[key].isRequired,
                      true,
                      "Min.3 and max.30 alphanum characters allowed ",
                      key
                    );
                  }
                  break;
                case "password":
                  // eslint-disable-next-line
                  if (!validatePassword(eval(key))) {
                    validationErr = true;
                    await setValidationError(
                      error[key].isRequired,
                      true,
                      "Valid only if - password length is between 8-20 and it consists of 2 uppercase characters, 1 special character, 2 digits, 3 lowercase characters",
                      key
                    );
                  }
                  break;
                case "repeatPassword":
                  // eslint-disable-next-line
                  if (!validateRepeatPassword(eval(key))) {
                    validationErr = true;
                    await setValidationError(
                      error[key].isRequired,
                      true,
                      "Passwords do not match",
                      key
                    );
                  }
                  break;
                default:
                  break;
              }
            }
            return "";
          })
        ).then(
          () => resolve(validationErr),
          (err) => reject(err)
        );
      });
    validate(err).then(
      async (result) => {
        if (!result) {
          let userDetails = {
            username,
            email,
            password,
            repeatPassword,
          };
          dispatch(authActions.userSignup(userDetails));
        } else {
          return;
        }
      },
      (err) => {
        return;
      }
    );
  };
  return (
    <div className="auth-root">
      <div className="auth-svg-parent">
        <p className="auth-title">Register for SOPS</p>
        <img src={SignUpSvg} className="auth-svg" alt={""} />
      </div>
      <div className="auth-form-parent">
        <Form className="auth-form">
          <Form.Field
            error={error["username"].isRequired && currentFocus !== "username"}
            required
            className="auth-form-field"
          >
            <label htmlFor={"username"}>Username</label>
            <Form.Input
              error={
                error["username"].isValidError && {
                  content: error["username"].validationErrMsg,
                  pointing: "above",
                }
              }
              id={"username"}
              onFocus={setFocus}
              onBlur={setBlur}
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </Form.Field>
          <Form.Field
            error={error["email"].isRequired && currentFocus !== "email"}
            required
            className="auth-form-field"
          >
            <label htmlFor={"email"}>Email</label>
            <Form.Input
              error={
                error["email"].isValidError && {
                  content: error["email"].validationErrMsg,
                  pointing: "above",
                }
              }
              id={"email"}
              onFocus={setFocus}
              onBlur={setBlur}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </Form.Field>
          <Form.Field
            error={error["password"].isRequired && currentFocus !== "password"}
            required
            className="auth-form-field"
          >
            <label htmlFor={"password"}>Password</label>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                width: "110%",
              }}
            >
              <div style={{ width: "91%" }}>
                <Form.Input
                  error={
                    error["password"].isValidError && {
                      content: error["password"].validationErrMsg,
                      pointing: "above",
                    }
                  }
                  id={"password"}
                  onFocus={setFocus}
                  onBlur={setBlur}
                  value={password}
                  type={isPasswordVisible ? "text" : "password"}
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
          <Form.Field
            error={error["repeatPassword"].isRequired && currentFocus !== "repeatPassword"}
            required
            className="auth-form-field"
          >
            <label htmlFor={"repeatPassword"}>Confirm Password</label>
            <Form.Input
              error={
                error["repeatPassword"].isValidError && {
                  content: error["repeatPassword"].validationErrMsg,
                  pointing: "above",
                }
              }
              id={"repeatPassword"}
              onFocus={setFocus}
              onBlur={setBlur}
              value={repeatPassword}
              type={"password"}
              onCopy={(ev) => ev.preventDefault()}
              onPaste={(ev) => ev.preventDefault()}
              onChange={(ev) => setRepeatPassword(ev.target.value)}
            />
          </Form.Field>
          <Button onClick={onSignUp} style={{ right: "0" }}>
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
