import api from "./intercept";

const _csrf = '6L-FBgg8LOZVEopW09FaWZR_Ns0-rtJsNcuCN8x6b_iLGTdE2d29NGoEG9B4I7Ni5_xubKNLG6xal7RBAfqyDqlJCcq9KVYl HTTP/1.1'


export const getRooms = async()=>{
    try{
        const res = await api({
            method: "get",
            url: `/api/chat`,
          
            withCredentials:true,
        })
        
        console.log("채팅방 목록가져옴",res)
        return res.data;
        
    } 
    catch(err){
        console.err('채팅방 목록 가져오기실패.',err);
    }
};

export const createRoom = async(ItemId,ItemOwnerId)=>{
    try{
        const res = await api({
            method: "post",
            url: `/api/chat`,
           
            data:{
                usedItemId:ItemId,
                ownerId:ItemOwnerId

            },
            withCredentials:true,

        })
        return res.data;
    }catch(err){
        console.err('채팅방 생성실패.',err);
    }
};

export const joinRoom = async(RoomId,date_cursor)=>{
    try{
        const res = await api({
            method: "get",
            url: `/api/chat/${RoomId}`,
            withCredentials:true,
            params:{
                cursor:date_cursor,
            }

           
        })
        console.log('방입장',res)
        return res.data;
    }catch(err){
        console.err('채팅방 생성실패.',err);
    }
};


