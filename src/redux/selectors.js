export const selectTable = (state) => state.renesandro.tasks;

export const selectCard = (state) => state.renesandro.card;

export const selectImages = (state) => state.renesandro.images;

export const selectModalWindow = (state) => state.renesandro.modal;

export const selectAddTaskForm = (state) => state.renesandro.addTaskForm;

export const selectGenerateImagesForm = (state) =>
  state.renesandro.generateImagesForm;

export const selectSendTaskForm = (state) => state.renesandro.sendTaskForm;

export const selectLoader = (state) => state.renesandro.loading;

export const selectError = (state) => state.renesandro.error;
