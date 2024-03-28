import styles from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './contact_form/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contact_list/ContactList';
import { Section } from './common/section/Section';
import { useEffect, useState } from 'react';

const CONTACTS_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    async function getContacts() {
      const data = localStorage.getItem(CONTACTS_KEY);

      if (data) {
        setContacts(JSON.parse(data));
      }
    }

    getContacts().catch(err => {
      console.log(err);
      window.alert(err.message);
    });
  }, []);

  const addContact = form => {
    const { name, number } = form;

    if (contacts.length > 0) {
      const contactsName = contacts.map(contact => contact.name);
      const isAlreadyAdded = contactsName.includes(name);

      if (isAlreadyAdded) {
        window.alert(`${name} is already in contacts`);
        return;
      }
    }

    if (name !== '' && number !== '') {
      const id = nanoid();
      const contact = {
        id,
        name,
        number,
      };

      setContacts(prev => [...prev, contact]);
    }
  };

  const filterContacts = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const deleteContact = evt => {
    const id = evt.target.id;
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.contactBook}>
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <div className={styles.contacts}>
            <Filter filter={filter} onChange={filterContacts} />
            <ContactList
              filter={filter}
              contacts={contacts}
              onClick={deleteContact}
            />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default App;

// data

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
