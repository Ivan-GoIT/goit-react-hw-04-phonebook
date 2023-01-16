import { Component } from 'react';
import { Section } from 'components/Section/Section';
import { PhoneBookForm } from 'components/PhoneBookForm/PhoneBookForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { FilterByName } from 'components/FilterByName/FilterByName';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  isContactInState = ({ name, number }) =>
    !!this.state.contacts.filter(({ name: prevName, number: prevNumber }) => {
      return prevName === name && prevNumber === number;
    }).length;

  handleSubmitForm = ({ name, number }) => {
    if (this.isContactInState({ name, number })) {
      alert('Contact is in phonebook');
      return;
    }

    this.setState(({ contacts: prevContacts }) => ({
      contacts: [...prevContacts, { id: nanoid(), name, number }],
    }));
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filterNormalize = filter => filter.toLowerCase();

  contactListToDisplay = (contacts, filter) =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));

  handleDeleteContact = id => {
    this.setState(({ contacts: prevContacts }) => ({
      contacts: prevContacts.filter(({ id: contactId }) => contactId !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = this.filterNormalize(filter);
    const contactsToDisplay = this.contactListToDisplay(
      contacts,
      normalizedFilter
    );

    return (
      <>
        <Section title="Phonebook">
          <PhoneBookForm onSubmitForm={this.handleSubmitForm} />
        </Section>
        {!!this.state.contacts.length && (
          <>
            <Section>
              <FilterByName
                filter={filter}
                onChange={this.handleFilterChange}
              />
            </Section>

            <Section title="ContactsList">
              <ContactsList
                contactList={contactsToDisplay}
                onDelete={this.handleDeleteContact}
              />
            </Section>
          </>
        )}
      </>
    );
  }
}
