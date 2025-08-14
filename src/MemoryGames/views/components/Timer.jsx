import React, { useEffect, useState, useRef } from 'react';

function Timer({maxTime, setView, endView}) {
  const interval = useRef(null);
  const [time, setTime] = useState(maxTime);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTime((time) => time - 0.1);
    }, 100);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(interval.current);
      setView(endView);
    }
  }, [time, setView]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <div style={{ width: '800px', height: `10px`, backgroundColor: 'gray' }}>
        <div style={{ width: `${(time / maxTime) * 800}px`, height: `10px`, backgroundColor: 'blue' }}></div>
        <b>{time.toFixed(1)} s</b>
      </div>
    </div>
  );
}

export default Timer;