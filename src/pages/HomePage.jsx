import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { getContacts, deleteContact } from "../utils/api";
import { LocaleConsumer } from "../Contexts/LocaleContext";

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
      contacts: [],
      // agar bersifat opsional
      keyword: this.props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onChangeSearchHandler = this.onChangeSearchHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getContacts();

    this.setState(() => {
      return {
        contacts: data,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteContact(id);

    // update the contact state from data.js
    const { data } = await getContacts();
    this.setState(() => {
      return {
        contacts: data,
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
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section>
              <h2>{locale === "id" ? "Daftar Kontak" : "Contact List"}</h2>
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
        }}
      </LocaleConsumer>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string, // Opsional
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
