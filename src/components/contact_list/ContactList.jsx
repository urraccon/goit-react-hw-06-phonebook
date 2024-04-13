import styles from './ContactList.module.css';
import { Button } from 'components/common/button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'components/redux/contactsSlice';

export const ContactList = () => {
  const [contactList, setContactList] = useState([]);

  const contacts = useSelector(state => state.contacts.list);
  const filter = useSelector(state => state.contactsFilter);
  const dispatch = useDispatch();

  console.log('contact list is: ', contacts);

  useEffect(() => {
    if (contacts.length > 0 && filter.length > 0) {
      const filtredList = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
      setContactList(filtredList);
      return;
    }

    setContactList(contacts);
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
              <Button onClick={() => dispatch(deleteContact(contact.id))}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
