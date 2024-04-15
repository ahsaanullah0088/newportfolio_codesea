import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// server request
export const sendformdata =  createAsyncThunk(
    'formData/submit',
    async(formData,{rejectWithValue})=>{
      try {
        let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/service`,formData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
)

export const sendEmail = createAsyncThunk(
  'formData/Email',
  async(formData,{rejectWithValue})=>{
    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/sendEmail`,formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const formDataSlice = createSlice({
    name: 'formData',
    initialState: {
      loading: false,
      error: null,
      success: false,
    },
    reducers:{
         sendData(state,action){
            return state.push(action.payload)
         }
    },
    extraReducers: (builder) => {
        builder
          .addCase(sendformdata.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(sendformdata.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
          })
          .addCase(sendformdata.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
          })
          .addCase(sendEmail.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(sendEmail.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
          })
          .addCase(sendEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
          });
      },
})

export const {sendData} = formDataSlice.actions;
export default formDataSlice.reducer
