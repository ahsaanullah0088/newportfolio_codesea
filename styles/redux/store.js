import { configureStore } from "@reduxjs/toolkit";
import Contslice from "./Contslice";
import submitformData from "./submitformData";
import BlogSlice from "./BlogSlice";
import Sing from "./Sing";
import userdashboard from "./userdashboard";
import AdminDashboard from "./AdminDashboard";

const store = configureStore({
    reducer : {
        Contact : Contslice,
        formSumbit : submitformData,
        blogs : BlogSlice,
        Sign : Sing,
        user : userdashboard,
        admin : AdminDashboard
    }
});

export default store;
