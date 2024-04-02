import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteContact, getContacts } from "../utils/data";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";

const HomePageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
};

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: getContacts(),
      // agar bersifat opsional
      keyword: this.props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onChangeSearchHandler = this.onChangeSearchHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteContact(id);

    // update the contact state from data.js
    this.setState(() => {
      return {
        contacts: getContacts(),
      };
    });
  }

  onChangeSearchHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    // dari comp wrapper agar search params ikut berubah
    this.props.keywordChange(keyword);
  }

  render() {
    const filteredSearchContacts = this.state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <section>
        <h2>Daftar Kontak</h2>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onChangeSearchHandler}
        />
        <ContactList
          contacts={filteredSearchContacts}
          onDelete={this.onDeleteHandler}
        />
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string, // Opsional
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
