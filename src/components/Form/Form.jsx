import PropTypes from 'prop-types';
import css from './Form.module.css';
import { Component } from 'react';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  formSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.formSubmit}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleFilterChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
          />
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleFilterChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter phone number"
          />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
