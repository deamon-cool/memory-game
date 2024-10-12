import React from 'react';

import './button.scss';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  clickHandler: () => void;
}

export const Button = ({ className, children, clickHandler }: ButtonProps) => {
  return (
    <button className={`button ${className ?? ''}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
