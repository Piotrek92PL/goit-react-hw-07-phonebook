import axios from 'axios';

const API_URL = 'https://65206b38906e276284c47027.mockapi.io/';

export const fetchContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}contacts`, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const createContact = async contact => {
  try {
    const response = await axios.post(`${API_URL}contacts`, contact, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

export const deleteContactById = async id => {
  try {
    await axios.delete(`${API_URL}contacts/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
