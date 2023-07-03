import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: 'documents',
  initialState: [],
  reducers: {
    addDocuments: (state, action) =>{
      state.push(...action.payload);
    },
    removeDocuments: (state, action) =>{
      state.splice(action.payload, 1);
    },
    updateDocuments: (state, action) =>{
      console.log('action', action.payload?.data);
      state[action.payload?.index] = action.payload?.data;
    }
  }
});

export const { addDocuments, removeDocuments, updateDocuments } = documentSlice.actions;
export default documentSlice.reducer;
