import axios from "axios";
import api from "./intercept";

const API_URL = process.env.REACT_APP_API_URL;


export const registerApi = async (type,datas) => {
    try {
        const res = await api({
            method: "post",
            url: `/api/${type}`,
           
            data: datas,
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        if (err.response) {
            console.error("등록실패 - 응답 에러", err.response);
        } else if (err.request) {
            console.error("등록실패 - 요청 에러", err.request);
        } else {
            console.error("등록실패 - 설정 에러", err.message);
        }
        throw err;  // 에러를 다시 던져서 호출한 곳에서 처리하도록
    }
};

export const getUsedItem = async (cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `${API_URL}/api/useditems`,
            withCredentials: true,
            params:{
                cursor:cursors,
            }
        });

        return res.data;
    } catch (err) {
        console.error("조회실패", err);
        throw err;
    }
};

export const getSpecUsedItem = async (itemId) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/useditems/${itemId}`,
            withCredentials: true,
           
        });

        return res.data;
    } catch (err) {
        console.error("조회실패", err);
        throw err;
    }
};

export const postImg = async (imgPath, imgs) => {
    try {
        

        const res = await api({
            method: "post",
            url: `/api/images`,
            withCredentials: true,
         
        
            data:{
                prefix: imgPath,
                imageNames:imgs,
            },
        });

        return res.data;
    } catch (err) {
        console.log("보낸거",imgs)
        console.error("이미지 이름 전송 실패", err);
        throw err;
    }
};

export const s3Img = async (signedUrl,type,file)=>{
    try {
        const res = await axios({
            method: "put",
            url: signedUrl,
            withCredentials: true,
            headers: {
                'Content-Type': type, 
                Authorization: undefined,
              },
            data:file,
        });

        return res.data;
    } catch (err) {
        console.log("url",signedUrl,"타입",type,"파일",file)
        console.error('S3 Upload Error:', err.response?.data || err.message);

        throw err;
    }
};

export const getAuctionItem = async (cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `${API_URL}/api/auctionitems`,
            withCredentials: true,
            params:{
                cursor:cursors,
            }
        });

        return res.data;
    } catch (err) {
        console.error("경매페이지조회실패", err);
        throw err;
    }
};

export const getSpecAucItem = async (itemId) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/auctionitems/${itemId}`,
            withCredentials: true,
           
        });
        return res.data;
    } catch (err) {
        console.error("경매아이템조회실패", err);
        throw err;
    }
};

export const createAuc = async (Id) => {
    try {
        const res = await api({
            method: "post",
            url: `/api/bid/${Id}`,
            withCredentials: true,
           
        });

        return res.data;
    } catch (err) {
        console.error("경매생성실패", err);
        throw err;
    }
};


export const searchApi = async (text,cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/useditems/search`,
            withCredentials: true,
            params:{
                q:text,
                cursor:cursors

            }
           
        });

        
        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const searchApi_auc = async (text,cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/auctionitems/search`,
            withCredentials: true,
            params:{
                q:text,
                cursor:cursors
            }
           
        });

        
        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const getMyitem = async (cursors,state) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/my/store/useditems`,
            withCredentials: true,
            params:{
                cursor:cursors,
                condition:state
            }
           
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const getMyAuc = async (cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/my/store/auctionitems`,
            withCredentials: true,
            params:{
                cursor:cursors,     
            }    
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
        
    }
};

export const getOrderList = async (cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/deliveries`,
            withCredentials: true,
            params:{
                cursor:cursors,     
            }    
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const getOrder = async (orderId) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/deliveries/${orderId}`,
            withCredentials: true,
              
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const editUsed = async (usedItemId,state) => {
    try {
        const res = await api({
            method: "patch",
            url: `/api/my/store/useditems/${usedItemId}`,
            withCredentials: true,
            params:{
                transactionStatus:state
            }
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const deleteUsed = async (usedItemId) => {
    try {
        const res = await api({
            method: "delete",
            url: `/api/my/store/useditems/${usedItemId}`,
            withCredentials: true,
              
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const deleteAuc = async (usedItemId) => {
    try {
        const res = await api({
            method: "delete",
            url: `/api/my/store/auctionitems/${usedItemId}`,
            withCredentials: true,
              
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const getWhoitem = async (cursors,state,id) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/members/${id}/store/useditems`,
            withCredentials: true,
            params:{
                cursor:cursors,
                condition:state
            }
           
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
    }
};

export const getWhoAuc = async (cursors,id) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/members/${id}/store/auctionitems`,
            withCredentials: true,
            params:{
                cursor:cursors,     
            }    
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
        
    }
};

export const postLiked = async (id,type) => {
    try {
        const res = await api({
            method: "post",
            url: `/api/likes/${id}`,
            withCredentials: true,
            params:{
                itemType:type,     
            }    
        });

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
        
    }
};

export const getLikeItem= async (cursors) => {
    try {
        const res = await api({
            method: "get",
            url: `/api/likes/my`,
            withCredentials: true,
            params:{
                cursor:cursors,     
            }  
        })
           

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
        
    }
};

export const editUsedPost= async (id,dataForm) => {
    try {
        const res = await api({
            method: "put",
            url: `/api/my/store/useditems/${id}`,
            withCredentials: true,
            data:dataForm
        })
           

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
        
    }
};

export const editAucPost= async (id,dataForm) => {
    try {
        const res = await api({
            method: "put",
            url: `/api/my/store/auctionitems/${id}`,
            withCredentials: true,
            data:dataForm

           
        })
           

        return res.data;
    } catch (err) {
        console.error("fail", err);
        throw err;
        
    }
};