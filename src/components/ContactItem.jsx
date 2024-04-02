import PropTypes from "prop-types";
import ContactItemImage from "./ContactItemImage";
import ContactItemBody from "./ContactItemBody";
import DeleteButton from "./DeleteButton";

const ContactItem = ({ name, tag, imageUrl, id, onDelete }) => {
  return (
    <div className="contact-item">
      <ContactItemImage imageUrl={imageUrl} tag={tag} />
      <ContactItemBody name={name} tag={tag} />
      <DeleteButton id={id} onDelete={onDelete} />
    </div>
  );
};

ContactItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
