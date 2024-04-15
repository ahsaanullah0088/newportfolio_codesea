import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnalytics = createAsyncThunk(
    'FetchAnalytics/get',
    async(_,{rejectWithValue}) => {
        try {
            let resp = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/Analytics`);
            return resp.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const PostModel = createAsyncThunk(
    'PostBlog/Post',
    async(blog,{rejectWithValue}) => {
        try {
            let resp = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/PostModel`,blog);
            return resp.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const PostService = createAsyncThunk(
    'PostService/Post',
    async(service,{rejectWithValue}) => {
        try {
            let resp = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/newservice`,service);
            return resp.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const GetOrders = createAsyncThunk(
    'GetOrders/get',
    async(_,{rejectWithValue}) => {
        try {
            let resp = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getAllOrders`);
            return resp.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const ChangeStatus = createAsyncThunk(
    'ChangeStatus/POST',
    async(status,{rejectWithValue}) => {
        try {
            let resp = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateStatus`,status);
            return resp.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const CheckRoutes = createAsyncThunk(
    'CheckRoutes/get',
    async(_,{rejectWithValue}) => {
        try {
            let token = localStorage.getItem("token")
            let resp = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/middleware?token=${token}`);
            return resp.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


let dahboardSlice = createSlice({
    name : "Dashboard",
    initialState : {
        error : null,
        data : [],
        loading : true
    },
    reducers : {
        
    },
    extraReducers : (builder) =>{
        builder.addCase(getAnalytics.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading = false
        })
        .addCase(getAnalytics.rejected,(state,action)=>{
            state.error = action.payload.message;
             state.loading =false
        })
        .addCase(getAnalytics.pending,(state)=>{
            state.loading = true
        }).addCase(PostModel.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading = false
        })
        .addCase(PostModel.rejected,(state,action)=>{
            state.error = action.payload.message;
             state.loading =false
        })
        .addCase(PostModel.pending,(state)=>{
            state.loading = true
        }).addCase(PostService.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading = false
        })
        .addCase(PostService.rejected,(state,action)=>{
            state.error = action.payload.message;
             state.loading =false
        })
        .addCase(PostService.pending,(state)=>{
            state.loading = true
        }).addCase(GetOrders.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading = false
        })
        .addCase(GetOrders.rejected,(state,action)=>{
            state.error = action.payload.message;
             state.loading =false
        })
        .addCase(GetOrders.pending,(state)=>{
            state.loading = true
        }).addCase(CheckRoutes.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading = false
        })
        .addCase(CheckRoutes.rejected,(state,action)=>{
            state.error = action.payload.message;
             state.loading =false
        })
        .addCase(CheckRoutes.pending,(state)=>{
            state.loading = true
        })
    }
});

export default dahboardSlice.reducer;