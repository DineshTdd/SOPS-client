import React from "react";
import InfoSvg from "../assets/svg/home.svg";

export default function Info() {
  return (
    <div style={{ width: "100%" }}>
      <p className={"welcome-title"}>Welcome to SOPS</p>
      <img src={InfoSvg} alt={""} style={{ width: "100%", height: "auto", maxHeight: "70vh" }} />
    </div>
  );
}
