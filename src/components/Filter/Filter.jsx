import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onChange, filter }) => {
  return (
    <label className={css.label} onChange={onChange}>
      Find contacts by name
      <input
        className={css.input}
        name="filter"
        type="text"
        placeholder="Find contact by name"
        filter={filter}
      />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
};
