import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBlogsData = createAsyncThunk(
    "Blogsdata/get",
    async(_,{rejectWithValue}) => {
     try {
        let response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getBlogs`);
        return response.data;
     } catch (error) {
        return rejectWithValue(error.message)
     }
    }
)

export const getSingleBlog = createAsyncThunk(
    'getSingleBlog/get',
    async(querdata,{rejectWithValue})=>{
        try {
            let response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getsingleblog?title=`+querdata);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const BlogsSlice = createSlice({
    name : "blogs",
     initialState : {
        blogs: [],
        loading: true,
        error: null,
    },
    reducers:{
       
        searchBlogs: (state, action) => {
            return state,action
            // console.log(a)
            // state.blogs = state.blogs.filter((blog) => {
            //     return blog.description.includes(action.payload);
            // });
        }
    },
    
    
    reducers: {
        // Your other reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogsData.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getBlogsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBlogsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getSingleBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleBlog.pending, (state) => {
                state.loading = true;
            });
    }
});

export const {searchBlogs} = BlogsSlice.actions;
export default BlogsSlice.reducer;