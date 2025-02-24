import { create } from "zustand";

export interface Field {
  id: number;
  name: string;
  type: "string";
  value: string; //| number | unknown[]
}

interface EditorState {
  isEditing: boolean;
  editingField: Field | null;
  initField: Field | null;
  openEditor: (field: Field) => void;
  closeEditor: () => void;
  editField: (fieldParams: Partial<Field>) => void;
}

export const getDefaultValueByType = (type: Field["type"]): Field["value"] => {
  switch (type) {
    case "string":
      return "Задайте значение";
    // case "number":
    //   return 1;
    // case "array":
    //   return [{ valueId: 1, value: "Значение 1" }];
    default:
      return "";
  }
};

export const useFieldStore = create<EditorState>((set, get) => ({
  isEditing: false,
  editingField: null,
  initField: null,

  openEditor: (field: Field) => {
    const editingField = field
    set({
      isEditing: true,
      editingField: editingField,
      initField: editingField,
    });
  },

  closeEditor: () => set({ isEditing: false, editingField: null, initField: null }),

  editField: (fieldParams: Partial<Field>) =>
    set({
      editingField: { ...get().editingField, ...fieldParams },
    }),
}));
