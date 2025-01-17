
const { configureStore, combineReducers } = require("@reduxjs/toolkit");
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from '@react-native-async-storage/async-storage'; 
import counterSlicer from "./Slices/counterSlice";
import userSlice from './Slices/userSlice'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const rootReducer = combineReducers({
    counter : counterSlicer,
    userlist : userSlice
})


const persistConfig = {
    key: 'root',
    storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
})

const persistor = persistStore(store);  

export {persistor, store}