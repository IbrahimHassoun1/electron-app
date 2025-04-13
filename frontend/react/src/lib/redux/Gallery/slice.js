import { createSlice } from "@reduxjs/toolkit";

const GallerySlice = createSlice({
    name:'gallery',
    initialState:{
        list:[],
        loading:false,
        AddImagePopup:false
    },
    reducers:{
        displayPopup:(state) => {
            return {
                ...state,
                AddImagePopup:true,
            }
        },
        hidePopup:(state) => {
            return {
                ...state,
                AddImagePopup:false,
            }
        },
        fetchingImages:(state)=>{
            return {
                ...state,
                loading:true,
            }
        },
        storeImages:(state, action) => {
            const images = action.payload;
            return {
                ...state,
                loading:false,
                list:images,
            }
        },

    }
})
export const {hidePopup,displayPopup,fetchingImages, storeImages} = GallerySlice.actions;
export default GallerySlice;