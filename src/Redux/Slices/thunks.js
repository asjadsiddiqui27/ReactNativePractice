import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',  // Action type
    async() => {
        const datafetch = await axios.get("https://fakestoreapi.com/products");
        // console.log("datafetch",datafetch.data);
        return datafetch.data;
    }

)