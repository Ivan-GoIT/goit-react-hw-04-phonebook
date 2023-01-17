import { PropTypes } from 'prop-types';
import css from './Contact.module.css';

export const Contact = ({ contact: { id, name, number }, onDelete }) => {
  const handleClick = () => onDelete(id);

  return (
    <li className={css.listItem}>
      <p>
        {name}: {number}
      </p>
      <button type="button" onClick={handleClick}>
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};
