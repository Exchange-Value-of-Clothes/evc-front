import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const useFilterIconStore=create(
    devtools(
        (set)=>({
           selectedIcon:[],
           selectButton:(IconName)=>
            set((state)=>{
                const isSelected=state.selectedIcon.includes(IconName);
                return{
                    selectedIcon:isSelected
                    ?state.selectedIcon.filter(icon=>icon!==IconName)
                    :[...state.selectedIcon,IconName],
                }

           }),
           resetSelection:()=>set({selectedIcon:[]}),
        }))
);

export default useFilterIconStore;