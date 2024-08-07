import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import WebStorage from 'redux-persist/lib/storage'
import { PERSIST, PURGE } from 'redux-persist/es/constants'
import { bookmarks, visited } from '@/features/Product/slices'
import { contact } from '@/features/Contact/slices'

const reducers = combineReducers({
  bookmarks,
  visited,
  contact,
})

const persistConfig = {
  key: 'root',
  storage: WebStorage,
  whitelist: ['bookmarks', 'visited', 'contact'],
}

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
