import React, { Component } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import EntryContext from "../context/EntryContext";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import { API_ROOT_URL } from "../constants";

class DropdownTextMenu extends Component {
  static contextType = EntryContext;
  constructor(props) {
    super();

    this.state = {
      showMenu: false,
      showDeleteConfirmation: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.pauseEntry = this.pauseEntry.bind(this);
    this.resumeEntry = this.resumeEntry.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(e) {
    if (this.dropdownMenu) {
      if (!this.dropdownMenu.contains(e.target)) {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener("click", this.closeMenu);
        });
      }
    }
  }

  pauseEntry() {
    Axios.put(
      `${API_ROOT_URL}/api/text/${this.context.id}/pause`,
      {},
      { withCredentials: true }
    ).then((res) => {
      this.setState({ showMenu: false });
      this.context.pauseEntry();
    });
  }

  resumeEntry() {
    Axios.put(`${API_ROOT_URL}/api/text/${this.context.id}/resume`, {}).then(
      (res) => {
        this.setState({ showMenu: false });
        this.context.resumeEntry();
      }
    );
  }

  render() {
    return (
      <div className="dropDownMenu">
        <button onClick={this.showMenu}>
          <BsThreeDotsVertical />
        </button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            {this.context.days < 0 ? (
              <button onClick={() => this.resumeEntry()}>
                <div className="button-content">
                  <FaPlay />
                  <span>Resume</span>
                </div>
              </button>
            ) : (
              <button onClick={() => this.pauseEntry()}>
                <div className="button-content">
                  <FaPause />
                  <span>Pause</span>
                </div>
              </button>
            )}
            <button
              onClick={() =>
                this.props.history.push(`/edit/text/${this.context.id}`)
              }
            >
              <div className="button-content">
                <MdEdit />
                <span>Edit</span>
              </div>
            </button>
            <button
              onClick={() => this.setState({ showDeleteConfirmation: true })}
            >
              <div className="button-content">
                <MdDelete />
                <span>Delete</span>
              </div>
              <Dialog
                open={this.state.showDeleteConfirmation}
                headerTitle="Are you sure you want to delete this entry?"
                content={
                  <div className="unsubscribe-dialog">
                    <Button
                      className="negative-button"
                      label="Delete"
                      onClick={() => {
                        Axios.delete(
                          `${API_ROOT_URL}/api/text/${this.context.id}`
                        ).then(window.location.reload(false));
                      }}
                    />
                    <Button
                      label="Cancel"
                      onClick={() =>
                        this.setState({ showDeleteConfirmation: false })
                      }
                    />
                  </div>
                }
              />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(DropdownTextMenu);
