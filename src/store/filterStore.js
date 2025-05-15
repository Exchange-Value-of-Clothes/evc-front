import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

const usePageFilterStore = create(devtools(
    
        persist(
            (set)=>({
                filters:{},
                setFilter:(page,filterVal)=>
                    set((state)=>({
                        filters:{...state.filters,[page]:filterVal},
                    })),
                }),
                {
                    name:"filter-storage",
                }
        )
    
));

export default usePageFilterStore;