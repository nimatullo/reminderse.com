import React, { Component } from "react";
import Axios from "axios";
import { API_ROOT_URL } from "../constants";

class ConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationSuccessful: false,
      confirmationMessage: "",
      desc: "",
    };
  }
  componentDidMount() {
    Axios.get(
      `${API_ROOT_URL}/confirm_email_token/${this.props.match.params.token}`
    )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            confirmationSuccessful: true,
            confirmationMessage: "Your email has been confirmed!",
            desc: "You should now be able to receive reminders!",
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          this.setState({
            confirmationSuccessful: true,
            confirmationMessage: "Your email is already confirmed",
            desc: "You should already be able to receive reminders.",
          });
        } else {
          this.setState({
            confirmationSuccessful: false,
            confirmationMessage: "Your email cannot be confirmed.",
            desc: "Please make sure you have a valid confirmation link.",
          });
        }
      });
  }
  render() {
    let textColor = "#fff";
    if (this.state.confirmationSuccessful) {
      textColor = "#058807";
    } else {
      textColor = "#ea4242";
    }
    return (
      <div style={{ color: textColor }}>
        <h1>{this.state.confirmationMessage}</h1>
        <h3>{this.state.desc}</h3>
      </div>
    );
  }
}

export default ConfirmationPage;
