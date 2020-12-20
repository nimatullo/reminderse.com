import React, { Component } from "react";

const EntryContext = React.createContext();

export const EntryConsumer = EntryContext.Consumer;

class EntryProvider extends Component {
  state = {
    id: this.props.value.id,
    entry_title: this.props.value.entry_title,
    days: this.props.value.days,
    text_content: this.props.value.text_content,
    url: this.props.value.url,
    category: this.props.value.category,
    pauseEntry: () => {
      this.setState({ days: -1 });
    },
    resumeEntry: () => {
      this.setState({ days: 3 });
    },
  };

  render() {
    return (
      <EntryContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </EntryContext.Provider>
    );
  }
}

export { EntryProvider };

export default EntryContext;
