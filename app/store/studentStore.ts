import { create } from "zustand";

interface StudentState {
  student: any | null;
  setStudent: (student: any) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  student: null,
  setStudent: (student) => set({ student }),
}));
