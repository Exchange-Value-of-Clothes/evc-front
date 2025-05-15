import { useState, useEffect, useCallback } from "react";
import { getUserInfo} from "../api/userApi"; // API 호출 함수 경로에 맞게 수정

const useFetchUser = () => {
    const [userInfo, setUserInfo] = useState({
        imageName: "",
        imageUrl: "",
        nickname: "",
        point: "",
    });

    const fetchUser = useCallback(async () => {
        try {
            const userData = await getUserInfo();
            let updatedUserInfo = {
                ...userInfo,
                nickname: userData.nickname,
                point: userData.point,
                imageName: userData.imageName,
            };

            if (userData.imageName) {
                console.log(userData.imageName)
                
            } else {
                console.log("이미지가 없음, 기본 적용");
            }

            setUserInfo(updatedUserInfo);
        } catch (err) {
            console.error("유저 정보 가져오는 중 오류:", err);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { userInfo, fetchUser };
};

export default useFetchUser;
