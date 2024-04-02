import { useNavigate } from "react-router-dom";
import { addContact } from "../utils/api";
import ContactInput from "../components/ContactInput";
import { LocaleConsumer } from "../Contexts/LocaleContext";

const AddPage = () => {
  const navigate = useNavigate();

  const onAddContactHandler = async (contact) => {
    await addContact(contact);

    navigate("/");
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section>
            <h2>{locale === "id" ? "Tambah Kontak" : "Add Contact"}</h2>
            <ContactInput addContact={onAddContactHandler} />
          </section>
        );
      }}
    </LocaleConsumer>
  );
};

export default AddPage;
