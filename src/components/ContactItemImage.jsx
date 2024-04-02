// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const ContactItemImage = ({ imageUrl, tag }) => {
  return (
    <div className="contact-item__image">
      <img src={imageUrl} alt={tag} />
    </div>
  );
};

ContactItemImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ContactItemImage;
