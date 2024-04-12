import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: [] as string[],
  reducers: {
    addToBookmarks: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
      return state
    },
    removeFromBookmarks: (state, action: PayloadAction<string>) =>
      state.filter((bookmarked: string) => bookmarked !== action.payload),
  },
})

export const { addToBookmarks, removeFromBookmarks } = bookmarksSlice.actions
export default bookmarksSlice.reducer
