import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ handleFilterChange, filter }) => {
  return (
    <label className={css.label} onChange={handleFilterChange}>
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
