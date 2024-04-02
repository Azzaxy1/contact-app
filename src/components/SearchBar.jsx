import PropTypes from "prop-types";

const SearchBar = ({ keyword, keywordChange }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Cari berdasarkan nama..."
      value={keyword}
      onChange={(e) => keywordChange(e.target.value)}
    />
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
