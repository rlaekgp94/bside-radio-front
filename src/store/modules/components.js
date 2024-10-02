import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: "",
  isOpen: false,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType, data } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
      state.data = data;
    },
    closeModal: (state) => {
      state.modalType = "";
      state.isOpen = false;
      state.data = null;
    },
  },
});

export default modalSlice.reducer;
export const selectModal = (state) => state.components;
export const { openModal, closeModal } = modalSlice.actions;