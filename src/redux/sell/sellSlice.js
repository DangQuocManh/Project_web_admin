import { createSlice } from "@reduxjs/toolkit"
import cookies from 'react-cookies'

// export const sellSlice = createSlice ({
//     name: "slide",
//     initialState: {
//         slide: cookies.load('slide'),
//     },
//     reducers: {
//         login: (state, action) => {
//             state.slide = action.payload;
//         },
//         logout: (state) => {
//             state.slide = null;
//         }
//     }
// })

// export const { login, logout } = sellSlice.actions;

// export const selectslide = (state) => state.slide.slide
// export default sellSlice.reducer
export const sellSlice = createSlice({
    name: "user",
    initialState: {
        user: cookies.load('user'),
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export const { login, logout } = sellSlice.actions;

export const selectslide = (state) => state.user.user
export default sellSlice.reducer