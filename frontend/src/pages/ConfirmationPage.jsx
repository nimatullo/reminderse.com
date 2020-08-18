import React, { Component } from "react";
import Axios from "axios";
import { API_ROOT_URL } from "../constants";

class ConfirmationPage extends Component {
  componentDidMount() {
    Axios.get(
      `${API_ROOT_URL}/confirm_email_token/${this.props.match.params.token}`
    ).then((res) => {
      console.log(res.data);
    });
  }
  render() {
    return (
      <div>
        <h1>Your email has been confirmed.</h1>
        <h3>You should now be able to receive emails!</h3>
      </div>
    );
  }
}

export default ConfirmationPage;
