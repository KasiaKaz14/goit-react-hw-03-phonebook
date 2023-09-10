import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.listItem} key={contact.id}>
          {contact.name}: {contact.number}
          <button
            className={css.deleteButton}
            onClick={() => onClick(contact.id)}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
