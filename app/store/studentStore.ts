import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudentState {
  student: any | null;
  setStudent: (student: any) => void;
  clearStudent: () => void;
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set) => ({
      student: null,
      setStudent: (student) => set({ student }),
      clearStudent: () => set({ student: null }),
    }),
    {
      name: "student-storage",
    }
  )
);
