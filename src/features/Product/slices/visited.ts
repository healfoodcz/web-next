import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const visitedSlice = createSlice({
  name: 'visited',
  initialState: {} as Record<string, string[]>,
  reducers: {
    addToVisited: (state, action: PayloadAction<[string, string]>) => {
      const [categoryId, productId] = action.payload
      // might be the first visited product in the category
      if (!(categoryId in state)) {
        return {
          ...state,
          [categoryId]: [productId],
        }
      }
      // filter out if product already visited in the near past
      const visited = state[categoryId].filter((someProductId) => someProductId !== productId)
      // prepend recently visited product
      visited.unshift(productId)
      // limit the size
      const limit = 4
      if (visited.length > limit) {
        visited.length = limit
      }
      // save
      return {
        ...state,
        [categoryId]: visited,
      }
    },
  },
})

export const { addToVisited } = visitedSlice.actions
export default visitedSlice.reducer
