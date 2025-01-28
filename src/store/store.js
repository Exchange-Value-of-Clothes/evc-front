import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const useStore = create(devtools((set)=>({
    currentPage: window.location.pathname,
    setPage:(newPage)=>set({currentPage:newPage}),
})));

export default useStore;