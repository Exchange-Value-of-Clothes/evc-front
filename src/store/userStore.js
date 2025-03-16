import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const userStore = create(devtools((set) => ({
  accessToken: null,
 
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
})));

export default userStore;
