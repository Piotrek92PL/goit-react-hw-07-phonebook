import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createContactAsync } from 'components/features/phonebookSlice';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, phone } = formData;

    if (name.trim() === '' || phone.trim() === '') {
      return; 
    }

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      phone,
    };

    dispatch(createContactAsync(newContact));
    setFormData({ name: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <label>
        Dodaj nowy kontakt:
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Numer telefonu:
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.phone}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default ContactForm;
