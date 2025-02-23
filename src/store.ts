import { create } from "zustand";

interface Field {
  id: number | string;
  name: string;
  type: string;
  values: string;
}

interface EditorState {
  isEditing: boolean;
  editingField: Field | null;
  openEditor: (field?: Field | null) => void;
  closeEditor: () => void;
}

export const useFieldStore = create<EditorState>((set) => ({
  isEditing: false,
  editingField: null,

  openEditor: (field = null) =>
    set({
      isEditing: true,
      editingField: field ?? { id: crypto.randomUUID(), name: "Задайте имя", type: "string", values: "Задайте значение" },
    }),

  closeEditor: () => set({ isEditing: false, editingField: null }),
}));
