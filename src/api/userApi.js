import api from "./intercept";

export const getUserInfo = async()=>{
    try{
        const res = await api({
            method:'get',
            url:'/api/members/profile/me',
            withCredentials: true,

        });
        return res.data;

    }
    catch(err){
        console.log("err",err);
        throw err;

    }

}
export const postImg_profile = async (imgName) => {
    try {
        
        const res = await api({
            method: "post",
            url: `/api/images/profile`,
            withCredentials: true,
         
        
            params:{
                imageName:`profile/${imgName}`
            }
        });

        return res.data;
    } catch (err) {
       
        console.error("이미지 이름 전송 실패", err);
        throw err;
    }
};

export const editUser = async (nickname,imgName) => {
    try {
        
        const res = await api({
            method: "patch",
            url: `/api/members/profile`,
            withCredentials: true,
         
        
            data:{
                "nickname" : nickname,
                "imageName" : imgName,
            }
        });

        return res.data;
    } catch (err) {
       
        console.error("프로필관련수정실패", err);
        throw err;
    }
};

export const editEmail = async (emailString) => {
    try {
        
        const res = await api({
            method: "post",
            url: `/api/members/account/email`,
            withCredentials: true,
        
            data:{
                email:emailString,
            }
        });

        return res.data;
    } catch (err) {
       
        console.error("이메일수정실패", err);
        throw err;
    }
};
export const editPassword = async ({oldPassword,newPassword,checkPassword}) => {
    try {
        
        const res = await api({
            method: "post",
            url: `/api/members/account/password`,
            withCredentials: true,
        
            data:{
                oldPassword,
                newPassword,
                checkPassword
            }
        });

        return res.data;
    } catch (err) {
       
        console.error("비밀번호수정실패", err);
        throw err;
    }
};

export const searchAddress = async (address) => {
    try {
        
        const res = await api({
            method: "post",
            url: `/api/addresses/coordinate`,
            withCredentials: true,
        
            data:{
                addressName:address,
            }
        });

        return res.data;
    } catch (err) {
       
        console.error("주소검색실패", err);
        throw err;
    }
};

export const postAddress = async (postData) => {
    try {
        
        const res = await api({
            method: "post",
            url: `/api/addresses`,
            withCredentials: true,
        
            data:{
                basicAddress: postData.basicAddress,
                detailAddress: postData.detailAddress, 
                longitude: postData.x, 
                latitude: postData.y  
            }
        });
        console.log(res,'주소보내기')
        return res.data;
    } catch (err) {
       
        console.error("주소생성실패", err);
        throw err;
    }
};

export const getAccount = async () => {
    try {
        const res = await api({
            method: "get",
            url: `/api/members/account`,
            withCredentials: true,
        
           
        });
        console.log(res,'게정조회')
        return res.data;
    } catch (err) {
       
        console.error("계정조회실패", err);
        throw err;
    }
};
export const postAccount = async (data) => {
    try {
        const res = await api({
            method: "post",
            url: `/api/members/account`,
            withCredentials: true,
            data:{
                accountName:data.accountName,
                accountNumber:data.accountNumber,
                phoneNumber:data.phoneNumber
            }   
           
        });
        console.log(res.data,'계정보내기')
        return res.data;
    } catch (err) {
       
        console.error("계정조회실패", err);
        throw err;
    }
};
