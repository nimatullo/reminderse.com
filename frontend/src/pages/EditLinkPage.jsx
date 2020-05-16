import React, { Component } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import "../styles/EditPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Components.css";

class EditLinkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      category: "",
      date: new Date(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/link/${this.props.match.params.id}`).then((res) => {
      this.setState({
        title: res.data.entry_title,
        url: res.data.url,
        category: res.data.category,
        date: new Date(res.data.date),
      });
    });
  }

  handleSubmit() {
    const data = {
      entry_title: this.state.title,
      url: this.state.url,
      category: this.state.category,
      date: this.state.date,
    };
    Axios.put(`/api/link/${this.props.match.params.id}`, data).then((res) =>
      this.props.history.push("/entries")
    );
  }

  render() {
    return (
      <div className="container">
        <div className="add-page">
          <h1>Edit Entry</h1>
          <TextField
            label="Entry Title"
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <TextField
            label="URL"
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
          />
          <div className="textFieldGroup">
            <TextField
              label="Category"
              value={this.state.category}
              onChange={(e) => this.setState({ category: e.target.value })}
            />
            <div className="textFieldContainer">
              <label>
                <b>Next Email Date</b>
              </label>
              <DatePicker
                className="textField"
                placeholderText="Date of next send"
                selected={this.state.date}
                onChange={(date) => this.setState({ date: date })}
                minDate={new Date()}
              />
            </div>
          </div>
          <Button onClick={this.handleSubmit} label="Save Changes" />
        </div>
      </div>
    );
  }
}

export default withRouter(EditLinkPage);
