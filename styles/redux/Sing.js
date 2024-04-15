const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export let logReq = createAsyncThunk(
    "submitLoginForm/submit",
    async(formData,{rejectWithValue}) => {
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export let SignUpReq = createAsyncThunk(
    "submitSignUpinForm/submit",
    async(formData,{rejectWithValue}) => {
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

let SignSlice = createSlice({
    name : "Login",
    initialState : {
        error : null,
        loading : true
    },
    reducers : {
        clearToken : (action,state) =>{
            localStorage.removeItem("token");
            return state;
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(logReq.fulfilled,(state)=>{
            state.error = null;
            state.loading = false;
            return state
        })
        .addCase(logReq.pending,(state) => {
            state.loading = true;
            return state;
        })
        .addCase(logReq.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
            return state
        }).addCase(SignUpReq.fulfilled,(state)=>{
            state.error = null;
            state.loading = false;
            return state
        })
        .addCase(SignUpReq.pending,(state) => {
            state.loading = true;
            return state;
        })
        .addCase(SignUpReq.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
            return state
        })
    }
});

export const {clearToken} = SignSlice.actions;
export default SignSlice.reducer;