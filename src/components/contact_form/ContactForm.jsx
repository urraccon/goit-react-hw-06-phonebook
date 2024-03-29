import styles from './ContactForm.module.css';
import { Button } from 'components/common/button/Button';
import { Input } from 'components/common/input/Input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact } from 'components/redux/contactsSlice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const inputChange = evt => {
    const { value, name } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const formSubmit = evt => {
    evt.preventDefault();

    if (number.length === 0 || name.length === 0) {
      return;
    }

    if (contacts.length > 0) {
      const [isAlreadyAdded] = contacts.map(contact =>
        contact.name.includes(name)
      );
      if (isAlreadyAdded) {
        Notify.failure(`${name} is already in contacts`);
        return;
      }
    }

    const contact = {
      name,
      number,
    };
    dispatch(addContact(contact));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.contactForm} onSubmit={formSubmit}>
      <div className={styles.inputs}>
        <Input
          labelName="Name"
          onChange={inputChange}
          inputName="name"
          value={name}
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces.
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Input
          labelName="Number"
          onChange={inputChange}
          type="tel"
          inputName="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, 
        parentheses and can start with +"
          required
        />
      </div>
      <div className={styles.btnContainer}>
        <Button type="submit">Add contact</Button>
      </div>
    </form>
  );
};

export default ContactForm;
