
export const getItemId = () => {
    const url = window.location.pathname; // 현재 URL의 pathname을 가져옴
    const parts = url.split('/'); // '/' 기준으로 URL을 분할
    const itemId = parts[parts.length - 1]; // 마지막 부분이 itemId
    return itemId;
  };
  