import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk function to fetch data from the server
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_,{rejectWithValue}) => {
   try {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getservice`)
    return res.data
   } catch (error) {
    return rejectWithValue(error.message) 
   }
  }
);

const Contslice = createSlice({
  name: "Contact",
  initialState: {
    contacts: [],
    status: 'idle', // possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {
    addContact: (state, action) => {
      // Assuming action.payload is the new contact to be added
      state.contacts.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // When fetchContacts is pending, set status to 'loading'
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      // When fetchContacts succeeds, update state with fetched data
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      // When fetchContacts fails, update state with error message
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.msg;
      });
  }
});

export const { addContact } = Contslice.actions;
export default Contslice.reducer;
