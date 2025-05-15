import api from "./intercept";

export const getRooms = async(cursor)=>{
    try{
        const res = await api({
            method: "get",
            url: `/api/chat`,
          
            withCredentials:true,
            params:{
                cursor:cursor

            }
        })
        
        return res.data;
        
    } 
    catch(err){
        console.err('채팅방 목록 가져오기실패.',err);
    }
};

export const createRoom = async(ItemId,kind,ItemOwnerId)=>{
    try{
        const res = await api({
            method: "post",
            url: `/api/chat`,
           
            data:{
                itemId:ItemId,
                
                itemType:kind,
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
        return res.data;
    }catch(err){
        console.err('채팅방 생성실패.',err);
    }
};

export const exitRoom = async(RoomId)=>{
    try{
        const res = await api({
            method: "patch",
            url: `/api/chat/${RoomId}/exit`,
            withCredentials:true,

           
        })
        return res.data;
    }catch(err){
        console.err('퇴장실패.',err);
    }
};

export const makePost = async(data)=>{
    try{
        const res = await api({
            method: "post",
            url: `/api/deliveries`,
            withCredentials:true,
            data:{
                itemType:data.itemType,
                itemId:data.itemId,
                buyerId:data.buyerId,
                sellerId:data.sellerId,
            }
           
        })
        console.log('배송생성',res)
        return res.data;
    }catch(err){
        console.err('배송생성실패.',err);
    }
};

