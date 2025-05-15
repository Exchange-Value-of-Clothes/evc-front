import { create } from "zustand";

const useStore = create((set)=>({
    currentPage: window.location.pathname,
    setPage:(newPage)=>set({currentPage:newPage}),
}));

export default useStore;