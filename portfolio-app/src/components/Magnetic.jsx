import React from 'react';
import useMagnetic from '../hooks/useMagnetic';

const Magnetic = ({ children, intensity = 5 }) => {
  const ref = useMagnetic(intensity);
  
  // Clone the child and attach the ref
  return React.cloneElement(children, { ref });
};

export default Magnetic;
