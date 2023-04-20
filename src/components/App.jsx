import React, { Component } from 'react';
import { GlobalStyle } from 'components/Globalstyle.js';
import { Layout, Header, MainHeader } from './Layout.js';
import { ContactsForm } from 'components/ContactsForm/ContactsForm.jsx';
import { ContactList } from 'components/ContactList/ContactList.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
// import initialContacts from '../contacts.json';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContact = localStorage.getItem('contact');
    if (localContact !== null) {
      this.setState({ contacts: JSON.parse(localContact) });
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    this.state.contacts.filter(contact => contact.name === newContact.name)
      .length
      ? alert(`${newContact.name}: is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const contacts = this.getFilterContacts();
    return (
      <Layout>
        <GlobalStyle />
        <MainHeader>Phonebook</MainHeader>
        <ContactsForm onSubmit={this.addContact} />
        <Header>Contacts</Header>
        <Filter onChange={this.changeFilter} value={this.state.filter}></Filter>
        {contacts.length > 0 && (
          <ContactList
            contacts={contacts}
            onDeleteContact={this.deleteContact}
          ></ContactList>
        )}
      </Layout>
    );
  }
}
