import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../Contexts/LocaleContext";

export class ContactInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      name: "",
      tag: "",
    };

    // Binding this
    this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
    this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onNameChangeEventHandler(e) {
    this.setState(() => {
      return {
        name: e.target.value,
      };
    });
  }

  onTagChangeEventHandler(e) {
    this.setState(() => {
      return {
        tag: e.target.value,
      };
    });
  }

  onSubmitEventHandler(e) {
    e.preventDefault();
    this.props.addContact(this.state);
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form
              className="contact-input"
              onSubmit={this.onSubmitEventHandler}
            >
              <input
                type="text"
                placeholder={locale === "id" ? "Nama" : "Name"}
                value={this.state.name}
                onChange={this.onNameChangeEventHandler}
              />
              <input
                type="text"
                placeholder="Tag"
                value={this.state.tag}
                onChange={this.onTagChangeEventHandler}
              />
              <button type="submit">
                {locale === "id" ? "Tambah" : "Add"}
              </button>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ContactInput.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactInput;
