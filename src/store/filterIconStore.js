import { create } from "zustand";

const useFilterIconStore=create(
 
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
        })
);

export default useFilterIconStore;