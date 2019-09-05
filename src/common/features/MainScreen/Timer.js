import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

const Timer = () => {
  const [count, setCount] = useState(moment());
  const savedCallback = useRef();

  const callback = () => setCount(moment(Date()));

  useEffect(() => (savedCallback.current = callback));

  useEffect(() => {
    const timer = setTimeout(() => savedCallback.current(), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return <h1>{count && count.format('mm:ss')}</h1>;
};

export default Timer;
