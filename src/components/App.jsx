import styles from './App.module.css';
import ContactForm from './contact_form/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contact_list/ContactList';
import { Section } from './common/section/Section';

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contactBook}>
        <Section title="Phonebook">
          <ContactForm />
        </Section>
        <Section title="Contacts">
          <div className={styles.contacts}>
            <Filter />
            <ContactList />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default App;
