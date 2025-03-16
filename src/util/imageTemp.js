const DB_NAME = "TempDB";
const STORE_NAME = "form_data";

// IndexedDB 초기화
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveFormToDB = async (formData, images) => {
    const db = await openDB();
    
    console.log("🟢 IndexedDB 저장 시작...");
  
    try {
      const imageData = await Promise.all(
        images.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve({ name: file.name, dataURL: reader.result });
              reader.onerror = (error) => {
                console.error("❌ 이미지 변환 오류:", error);
                reject(error);
              };
              reader.readAsDataURL(file);
            })
        )
      );

      // 이미지 변환 후 새로운 트랜잭션 시작
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
  
      const putRequest = store.put({
        id: "savedForm",
        formData,
        images: imageData,
      });
  
      putRequest.onsuccess = () => console.log("✅ IndexedDB 저장 성공!");
      putRequest.onerror = () => console.error("❌ IndexedDB 저장 실패:", putRequest.error);
  
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => {
          console.log("🟢 트랜잭션 완료됨.");
          resolve();
        };
        transaction.onerror = (event) => {
          console.error("❌ 트랜잭션 오류:", event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("❌ IndexedDB 저장 중 오류 발생:", error);
    }
};
  
export const getFormFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get("savedForm");

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteDatabase = async () => {
    console.log("db삭제",DB_NAME)
    const request = indexedDB.deleteDatabase(DB_NAME);
  
    request.onsuccess = () => {
      console.log(`✅ 데이터베이스 '${DB_NAME}' 삭제 성공!`);
    };
  
    request.onerror = (event) => {
      console.error(`❌ 데이터베이스 '${DB_NAME}' 삭제 실패:`, event.target.error);
    };
  
    request.onblocked = () => {
      console.warn(`⚠️ 데이터베이스 '${DB_NAME}' 삭제가 차단되었습니다. 다른 탭에서 사용 중일 수 있습니다.`);
    };
  };
  
