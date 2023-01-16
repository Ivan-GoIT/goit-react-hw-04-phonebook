import css from './FilterByName.module.css';
import { PropTypes } from 'prop-types';


export const FilterByName = ({ filter, onChange }) => {
  return (
    <label>
          {console.log('FilterByName.render')}

      <p className={css.labelStyle}>Find contacts by name</p>
      <input
        className={css.inputStyle}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={filter}
        onChange={onChange}
      />
    </label>
  );
};

FilterByName.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
}
