import React, { Component } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import "../styles/EditPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Components.css";
import TextArea from "../components/TextArea";
import { API_ROOT_URL } from "../constants";


class EditTextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      category: "",
      date: new Date(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Axios.get(`${API_ROOT_URL}/api/text/${this.props.match.params.id}`, { withCredentials: true }).then(
      (res) => {
        this.setState({
          title: res.data.entry_title,
          content: res.data.text_content,
          category: res.data.category,
          date: new Date(res.data.date),
        });
      }
    );
  }

  handleSubmit() {
    const data = {
      entry_title: this.state.title,
      text_content: this.state.content,
      category: this.state.category,
      date: this.state.date,
    };
    Axios.put(
      `${API_ROOT_URL}/api/text/${this.props.match.params.id}`,
      data,
      { withCredentials: true }
    ).then((res) => this.props.history.push("/entries"));
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
          <TextArea
            label="Text Content"
            onChange={(e) => this.setState({ content: e.target.value })}
            value={this.state.content}
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

export default withRouter(EditTextPage);
