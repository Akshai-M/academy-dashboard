import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
    admin: any[],
    setAdmin: (admin: any[]) => void,
    clearAdmin: () => void,
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set) => ({
            admin: [],
            setAdmin: (admin) => set({ admin }),
            clearAdmin: () => set({ admin: [] }),
        }),
        {
            name: "admin-storage",
        }
    )
);