import { Component } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  nanoid = nanoid();

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const {
      name: { value: name },
      number: { value: number },
    } = form.elements;

    const check = this.checkIfContactExist(name);

    if (!check) {
      const newContact = {
        id: nanoid,
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
      Notiflix.Notify.success('New contact succesfully added!');
      form.reset();
    } else {
      Notiflix.Notify.warning(`${name} is already in contacts.`);
    }
  };

  checkIfContactExist = name => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDelete = id => {
    const { contacts } = this.state;
    const deleteContact = contacts.find(contact => contact.id === id);

    if (deleteContact) {
      this.setState(state => ({
        contacts: state.contacts.filter(contact => contact.id !== id),
      }));

      Notiflix.Notify.success(`${deleteContact.name} has been removed`);
    }
  };

  render() {
    const { contacts, filter } = this.state;
    const filterSearch = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#000000',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} filter={filter} />
        <ContactList onClick={this.handleDelete} contacts={filterSearch} />
      </div>
    );
  }
}
