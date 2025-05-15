import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const Timer = ({ endTime }) => {
  const [remainingTime, setRemainingTime] = useState('');

  const calculateRemainingTime = () => {
    const now = dayjs();
    const end = dayjs(endTime);
    const diff = end.diff(now);

    if (diff <= 0) {
      return '종료됨';
    } else {
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  useEffect(() => {
    // 처음 진입하자마자 계산해서 보여주기
    setRemainingTime(calculateRemainingTime());

    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <div>남은 시간: {remainingTime}</div>;
};
