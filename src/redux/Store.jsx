import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Users'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    users: userSlice,
    // başka slice'lar...
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;