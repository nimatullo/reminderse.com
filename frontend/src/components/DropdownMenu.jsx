import React, { Component } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { withRouter } from "react-router-dom";

class DropdownMenu extends Component {
  constructor(props) {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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
            <button onClick={() => window.open(this.props.url, "_blank")}>
              <div className="button-content">
                <IoMdOpen />
                <span>Open</span>
              </div>
            </button>
            <button
              onClick={() => this.props.history.push(`/edit/${this.props.id}`)}
            >
              <div className="button-content">
                <MdEdit />
                <span>Edit</span>
              </div>
            </button>
            <button>
              <div className="button-content">
                <MdDelete />
                <span>Delete</span>
              </div>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(DropdownMenu);
