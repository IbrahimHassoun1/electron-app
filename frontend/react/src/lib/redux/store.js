import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import GallerySlice from './Gallery/slice';

const logger = createLogger();
const store = configureStore({
    reducer:{
        gallery:GallerySlice.reducer
    },
    middleware:(defaltMiddleware) => {
        return defaltMiddleware().concat(logger);
    }
})

export default store;