import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, createContact, deleteContactById } from 'components/apiService/apiService';

export const fetchContactsAsync = createAsyncThunk(
  'phonebook/fetchContacts',
  async () => {
    const contacts = await fetchContacts();
    console.log(contacts);
    return contacts;
  }
);

export const createContactAsync = createAsyncThunk(
  'phonebook/createContact',
  async contact => {
    const newContact = await createContact(contact);
    return newContact;
  }
);

export const deleteContactAsync = createAsyncThunk(
  'phonebook/deleteContact',
  async id => {
    await deleteContactById(id);
    return id;
  }
);

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    filter: '',
    loading: false,
    error: null, 
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(createContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilter } = phonebookSlice.actions;

export default phonebookSlice.reducer;