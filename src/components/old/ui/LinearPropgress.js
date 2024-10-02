import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate(props) {
  const { value } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (value && !isNaN(value)) {
        setProgress(value)
      }
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return (
    <div className="base-linear-wrapper">
      <LinearProgress className="base-linear" variant="determinate" value={progress} />
    </div>
  );
}