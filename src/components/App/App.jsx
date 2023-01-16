import { useState, useEffect } from 'react';
import { Section } from 'components/Section/Section';
import { PhoneBookForm } from 'components/PhoneBookForm/PhoneBookForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { FilterByName } from 'components/FilterByName/FilterByName';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isContactInState = ({ name, number }) =>
    !!contacts.filter(({ name: prevName, number: prevNumber }) => {
      return prevName === name && prevNumber === number;
    }).length;

  const handleSubmitForm = ({ name, number }) => {
    if (isContactInState({ name, number })) {
      alert('Contact is in phonebook');
      return;
    }

    setContacts(prevContacts => (
      [...prevContacts, { id: nanoid(), name, number },]
    ));
  };

  const handleFilterChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filterNormalize = filter => filter.toLowerCase();

  const contactListToDisplay = (contacts, filter) => 
     contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  ;

  const handleDeleteContact = id => {
    setContacts(prevContacts => (
      prevContacts.filter(({ id: contactId }) => contactId !== id)
    ));
  };

   ;
  const contactsToDisplay = contactListToDisplay(contacts, filterNormalize(filter));

  return (
    <>
      {console.log('App.render')}
      <Section title="Phonebook">
        <PhoneBookForm onSubmitForm={handleSubmitForm} />
      </Section>
      {!!contacts.length && (
        <>
          <Section>
            <FilterByName filter={filter} onChange={handleFilterChange} />
          </Section>

          <Section title="ContactsList">
            <ContactsList
              contactList={contactsToDisplay}
              onDelete={handleDeleteContact}
            />
          </Section>
        </>
      )}
    </>
  );
};

// state = {
//   contacts: [],
//   filter: '',
// };

// componentDidUpdate() {
//   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
// }

// componentDidMount() {
//   if (localStorage.getItem('contacts')) {
//     this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
//   }
// }

// isContactInState = ({ name, number }) =>
//   !!this.state.contacts.filter(({ name: prevName, number: prevNumber }) => {
//     return prevName === name && prevNumber === number;
//   }).length;

// handleSubmitForm = ({ name, number }) => {
//   if (this.isContactInState({ name, number })) {
//     alert('Contact is in phonebook');
//     return;
//   }

//   this.setState(({ contacts: prevContacts }) => ({
//     contacts: [...prevContacts, { id: nanoid(), name, number }],
//   }));
// };

// handleFilterChange = evt => {
//   this.setState({ filter: evt.currentTarget.value });
// };

// filterNormalize = filter => filter.toLowerCase();

// contactListToDisplay = (contacts, filter) =>
//   contacts.filter(({ name }) => name.toLowerCase().includes(filter));

// handleDeleteContact = id => {
//   this.setState(({ contacts: prevContacts }) => ({
//     contacts: prevContacts.filter(({ id: contactId }) => contactId !== id),
//   }));
// };
