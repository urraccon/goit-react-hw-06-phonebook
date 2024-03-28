import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { Button } from 'components/common/button/Button';
import { useEffect, useState } from 'react';

export const ContactList = ({ contacts, onClick, filter }) => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    if (contacts.length > 0) {
      if (filter.length > 0) {
        const filtredList = contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
        setContactList(filtredList);
      } else {
        setContactList(contacts);
      }
    }
  }, [filter, contacts]);

  return (
    <div className={styles.container}>
      <ul className={styles.contactList}>
        {contactList.map(contact => (
          <li key={contact.id} className={styles.contact}>
            <div className={styles.contactContainer}>
              <span className={styles.id}>
                {`${contactList.indexOf(contact) + 1}.`}
                <span className={styles.name}>
                  {`${contact.name}:`}
                  <span className={styles.number}>{contact.number}</span>
                </span>
              </span>
              <Button id={contact.id} onClick={onClick}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onClick: PropTypes.func,
  filter: PropTypes.string,
};
