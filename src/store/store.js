import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const useStore = create((set)=>({
    currentPage: window.location.pathname,
    setPage:(newPage)=>set({currentPage:newPage}),
}));

export default useStore;