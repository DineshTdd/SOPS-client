import React, { useState } from "react";
import { Menu, Icon, Segment } from "semantic-ui-react";
import Info from "./Info";
import Card from "./Card";
import Shop from "./Shop";
import "../assets/styles/home.scss";
import { removeUser } from "../store/actions/auth";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("info");
  const handleItemClick = (e, { name }) => setMenu(name);
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ backgroundColor: "black" }}>
        <Segment inverted style={{ paddingBottom: "5px", paddingTop: "2px" }}>
          <Menu stackable inverted pointing secondary fluid>
            <Menu.Item
              name={"info"}
              onClick={handleItemClick}
              style={{ alignSelf: "center", paddingTop: "inherit", paddingBottom: "inherit" }}
            >
              <Icon name="vcard" color={"blue"} size={"large"} />
            </Menu.Item>
            <Menu.Item name="card" active={menu === "card"} onClick={handleItemClick}>
              <p style={{ color: menu === "card" ? "#00A0EE" : null }}>Your Cards</p>
            </Menu.Item>

            <Menu.Item name="shop" active={menu === "shop"} onClick={handleItemClick}>
              <p style={{ color: menu === "shop" ? "#00A0EE" : null }}>Shopping Cart</p>
            </Menu.Item>
            <Menu.Item
              position={"right"}
              onClick={() => {
                dispatch(removeUser());
              }}
            >
              <p>Logout</p>
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
      {menu === "info" ? <Info /> : menu === "card" ? <Card /> : <Shop />}
    </div>
  );
}
