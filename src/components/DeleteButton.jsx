import PropTypes from "prop-types";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = ({ id, onDelete }) => {
  return (
    <button className="contact-item__delete" onClick={() => onDelete(id)}>
      <MdDeleteOutline />
    </button>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
