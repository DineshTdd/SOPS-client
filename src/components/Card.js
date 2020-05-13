import React, { useState } from "react";
import CardSvg from "../assets/svg/cards.svg";
import { Button, Icon, Label, Modal, Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addCard } from "../store/actions/card";
export default function Card() {
  const initialState = {
    cardName: {
      isRequired: false,
      isError: false,
      message: "",
    },
    cardHolder: {
      isRequired: false,
      isError: false,
      message: "",
    },
    cardNumber: {
      isRequired: false,
      isError: false,
      message: "",
    },
    cardExpiryMonth: {
      isRequired: false,
      isError: false,
      message: "",
    },
    cardExpiryYear: {
      isRequired: false,
      isError: false,
      message: "",
    },
    cardCVV: {
      isRequired: false,
      isError: false,
      message: "",
    },
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardHolder: "",
    cardNumber: "",
    cardExpiryMonth: "",
    cardExpiryYear: "",
    cardCVV: "",
  });
  const [currentFocus, setCurrentFocus] = useState("");
  const [error, setError] = useState(initialState);

  const onFocus = (ev) => {
    setError(initialState);
    setCurrentFocus(ev.target.id);
  };

  const onBlur = () => {
    setCurrentFocus("");
  };

  const onClose = () => {
    setError(initialState);
    setCardDetails({
      cardName: "",
      cardHolder: "",
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      cardCVV: "",
    });
    setOpen(false);
  };

  let cardHolderRegex = /^[a-zA-Z]{0,26}$/;
  let cardNumberRegex = /^[0-9]{0,16}$/;
  let cardExpiryRegex = /^[0-9]{0,2}$/;
  let cardCVVRegex = /^[0-9]{0,3}$/;
  const setter = (id, value) =>
    setCardDetails((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  const onChange = (ev) => {
    if (ev.target.id === "cardHolder" || ev.target.id === "cardName") {
      if (cardHolderRegex.test(ev.target.value)) {
        setter(ev.target.id, ev.target.value);
      }
      return;
    }
    if (ev.target.id === "cardNumber") {
      if (cardNumberRegex.test(ev.target.value)) {
        setter(ev.target.id, ev.target.value);
      }
      return;
    }
    if (ev.target.id === "cardExpiryMonth" || ev.target.id === "cardExpiryYear") {
      if (cardExpiryRegex.test(ev.target.value)) {
        setter(ev.target.id, ev.target.value);
      }
      return;
    }
    if (ev.target.id === "cardCVV") {
      if (cardCVVRegex.test(ev.target.value)) {
        setter(ev.target.id, ev.target.value);
      }
    }
  };

  const validateCardHolder = (value) => {
    if (value.length < 2) {
      return true;
    }
    return false;
  };

  const validateCardNumber = (value) => {
    if (value.trim().length !== 16) {
      return true;
    }
    return false;
  };

  const validateCardExpiryMonth = (value) => {
    if (value.trim().length !== 2 || parseInt(value) < 1 || parseInt(value) > 12) {
      return true;
    }
    return false;
  };

  const validateCardExpiryYear = (value) => {
    if (value.trim().length !== 2 || parseInt(value) < 20) {
      return true;
    }
    return false;
  };

  const validateCardCVV = (value) => {
    if (value.trim().length !== 3) {
      return true;
    }
    return false;
  };

  const onSuccess = () => {
    onClose();
    console.log("success");
  };

  const onFailure = () => {
    console.log("Failure");
  };

  const saveCard = async () => {
    let err = false;
    const validate = async (validationErr) => {
      return new Promise((resolve, reject) => {
        Promise.all(
          Object.keys(cardDetails).map((key) => {
            if (cardDetails[key].trim().length === 0) {
              validationErr = true;
              setError((prevState) => {
                return {
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    isRequired: true,
                  },
                };
              });
            } else {
              switch (key) {
                case "cardName":
                  if (validateCardHolder(cardDetails[key])) {
                    validationErr = true;
                    setError((prevState) => {
                      return {
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isError: true,
                          message: "Length must be between 2-26",
                        },
                      };
                    });
                  }
                  break;
                case "cardHolder":
                  if (validateCardHolder(cardDetails[key])) {
                    validationErr = true;
                    setError((prevState) => {
                      return {
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isError: true,
                          message: "Length must be between 2-26",
                        },
                      };
                    });
                  }
                  break;
                case "cardNumber":
                  if (validateCardNumber(cardDetails[key])) {
                    validationErr = true;
                    setError((prevState) => {
                      return {
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isError: true,
                          message: "Length must be 16",
                        },
                      };
                    });
                  }
                  break;
                case "cardExpiryMonth":
                  if (validateCardExpiryMonth(cardDetails[key])) {
                    validationErr = true;
                    setError((prevState) => {
                      return {
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isError: true,
                          message: "Length must be 2 and value between 1 and 12",
                        },
                      };
                    });
                  }
                  break;
                case "cardExpiryYear":
                  if (validateCardExpiryYear(cardDetails[key])) {
                    validationErr = true;
                    setError((prevState) => {
                      return {
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isError: true,
                          message: "Length must be 2 and value greater than 20",
                        },
                      };
                    });
                  }
                  break;
                case "cardCVV":
                  if (validateCardCVV(cardDetails[key])) {
                    validationErr = true;
                    setError((prevState) => {
                      return {
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isError: true,
                          message: "Length must be 3",
                        },
                      };
                    });
                  }
                  break;
                default:
                  break;
              }
            }
          })
        ).then(() => resolve(validationErr));
      });
    };
    let result = await validate(err);
    if (result) return;
    dispatch(addCard(cardDetails, onSuccess, onFailure));
  };
  return (
    <div
      style={{
        backgroundImage: `url(${CardSvg})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundPositionY: "45px",
        backgroundSize: "contain",
        position: "relative",
        // marginTop: "45px",
        height: "100vh",
        maxHeight: "auto",
        maxWidth: "100%",
      }}
    >
      <Button
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        color={"blue"}
        onClick={() => setOpen(true)}
      >
        Add Card
        <Label size={"small"} color={"black"} floating>
          <Icon style={{ paddingLeft: "5px" }} name={"add"} size={"small"} />
        </Label>
      </Button>
      <Modal size={"tiny"} onClose={onClose} open={open} closeIcon>
        <Modal.Header>Create your card</Modal.Header>
        <Modal.Content style={{ padding: "15px" }}>
          <Form style={{ marginTop: "15px" }}>
            <Form.Field
              style={{ paddingLeft: 0 }}
              error={currentFocus === "" && error.cardName.isRequired}
            >
              <Form.Input
                error={
                  error.cardName.isError && {
                    content: error.cardName.message,
                    pointing: "above",
                  }
                }
                placeholder={"Card Name"}
                id={"cardName"}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                  width: "100%",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  paddingBottom: "15px",
                }}
                value={cardDetails.cardName}
              />
            </Form.Field>
            <Form.Field
              style={{ paddingLeft: 0 }}
              error={currentFocus === "" && error.cardHolder.isRequired}
            >
              <Form.Input
                error={
                  error.cardHolder.isError && {
                    content: error.cardHolder.message,
                    pointing: "above",
                  }
                }
                placeholder={"Card Holder"}
                id={"cardHolder"}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                  width: "100%",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  paddingBottom: "15px",
                }}
                value={cardDetails.cardHolder}
              />
            </Form.Field>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Form.Field
                error={currentFocus === "" && error.cardNumber.isRequired}
                style={{
                  width: "50%",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  paddingBottom: "5px",
                }}
              >
                <Form.Input
                  error={
                    error.cardNumber.isError && {
                      content: error.cardNumber.message,
                      pointing: "above",
                    }
                  }
                  style={{
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    padding: 0,
                    paddingBottom: "10px",
                  }}
                  placeholder={"Card Number"}
                  id={"cardNumber"}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={cardDetails.cardNumber}
                />
              </Form.Field>
              <Form.Field
                error={currentFocus === "" && error.cardExpiryMonth.isRequired}
                style={{
                  width: "10.75%",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  paddingBottom: "5px",
                }}
              >
                <Form.Input
                  error={
                    error.cardExpiryMonth.isError && {
                      content: error.cardExpiryMonth.message,
                      pointing: "above",
                    }
                  }
                  placeholder={"MM"}
                  id={"cardExpiryMonth"}
                  style={{
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    padding: 0,
                    paddingBottom: "10px",
                  }}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={cardDetails.cardExpiryMonth}
                />
              </Form.Field>
              <Form.Field
                error={currentFocus === "" && error.cardExpiryYear.isRequired}
                style={{
                  width: "10%",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  paddingBottom: "5px",
                }}
              >
                <Form.Input
                  error={
                    error.cardExpiryYear.isError && {
                      content: error.cardExpiryYear.message,
                      pointing: "above",
                    }
                  }
                  placeholder={"YY"}
                  id={"cardExpiryYear"}
                  style={{
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    padding: 0,
                    paddingBottom: "10px",
                  }}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={cardDetails.cardExpiryYear}
                />
              </Form.Field>
              <Form.Field
                error={currentFocus === "" && error.cardCVV.isRequired}
                style={{
                  width: "15%",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  paddingBottom: "5px",
                }}
              >
                <Form.Input
                  error={
                    error.cardCVV.isError && { content: error.cardCVV.message, pointing: "above" }
                  }
                  placeholder={"CVV"}
                  id={"cardCVV"}
                  style={{
                    width: "100%",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    padding: 0,
                    paddingBottom: "10px",
                  }}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={cardDetails.cardCVV}
                />
              </Form.Field>
            </span>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            Cancel
          </Button>
          <Button color={"blue"} onClick={saveCard}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
