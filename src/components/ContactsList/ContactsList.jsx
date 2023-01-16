import { Contact } from './Contact/Contact';
import css from './ContactsList.module.css';
import { PropTypes } from 'prop-types';

export const ContactsList = ({ contactList = [], onDelete }) => (
  <ul className={css.contactsList}>
    {console.log('ContactsList.render')}

    {contactList.map(item => (
      <Contact key={item.id} contact={item} onDelete={onDelete} />
    ))}
  </ul>
);

ContactsList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ),
  onDelete: PropTypes.func.isRequired,
};
