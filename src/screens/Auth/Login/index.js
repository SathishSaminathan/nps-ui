import React, { Component } from "react";

import "./login.scss";
import { AuthSVG } from "assets/undraw";

export default class Login extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="loginContainer">
          <div className="inputContainer">
            <div className="projectDescription"><object></object></div>
            <div className="leftInputContainer"></div>
            <div className="rightInputContainer"></div>
          </div>
        </div>
      </div>
    );
  }
}
