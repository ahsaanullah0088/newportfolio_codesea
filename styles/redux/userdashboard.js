import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getorders = createAsyncThunk(
    "getOrdersByEmail/get",
    async(token,{rejectWithValue}) => {
        try {
            let response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getorderemail?token=`+token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

let userSlice = createSlice({
    name : "userSlice",
    initialState : {
        error : null,
        loading : true,
        data : []
    },
    reducers:{
        storeData : (action,state) => {
            return state.data.push(action.payload)
        },
        sortOrder : (action,state)=>{
            if(action.payload === "Older"){
                state.loading = true;
                if(state.data.length !== 0){
                  let sortData = state.data.sort(a,b=>b.createdAt - a.createdAt);
                  if(sortData){
                      state.loading = false
                      return sortData
                  }
                }
            }
        },
        searchService : (action,state) =>{
            // let filterdata = state.data.filter((service)=>{
            //     return service.service === action.payload
            // });
            return state.data
        }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(getorders.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload.findOrders;
            return state
        }).addCase(getorders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        }).addCase(getorders.pending,(state)=>{
            state.loading = true
        })
    }
});

export const {storeData,sortOrder,searchService} = userSlice.actions;
export default userSlice.reducer;