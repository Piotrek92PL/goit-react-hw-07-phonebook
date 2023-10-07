import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactsAsync,
  deleteContactAsync,
} from 'components/features/phonebookSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);

  useEffect(() => {
    dispatch(fetchContactsAsync()); 
  }, [dispatch]);

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}{' '}
          <button onClick={() => dispatch(deleteContactAsync(contact.id))}>
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
