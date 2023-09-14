
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import counterReducer from './slices/counterSlice';

export default configureStore( {
    reducer: {
        data: dataReducer,
        counter: counterReducer,
    }
} );
