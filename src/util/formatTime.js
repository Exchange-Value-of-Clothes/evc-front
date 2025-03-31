export const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5); // "14:53" 형식으로 변환
  };
  