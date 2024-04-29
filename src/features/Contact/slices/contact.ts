import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  userType: 'legalEntity',
  companyName: '',
  fullName: '',
  email: '',
  phone: '',
  hasTelegram: false,
  hasWhatsApp: false,
  message: '',
  save: false,
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    populate: (_, action: PayloadAction<Record<string, string | boolean>>) => {
      const newState: Record<string, string | boolean> = {}

      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          newState[key] = action.payload[key]
        }
      })

      return newState as typeof initialState
    },
    wipe: () => initialState,
    toggleSave: (state, action: PayloadAction<boolean>) => (action.payload ? state : initialState),
  },
})

export const { populate, wipe, toggleSave } = contactSlice.actions
export default contactSlice.reducer
