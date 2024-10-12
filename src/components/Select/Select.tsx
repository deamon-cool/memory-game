import React from 'react';

import './select.scss';

type Option = { id: string; icon: string; value: string };

interface SelectProps {
  className?: string;
  options: Option[];
  placeholder: string;
  selectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const Select = ({ className, options, placeholder, selectChange, value }: SelectProps) => {
  return (
    <select className={`select ${className ?? ''}`} onChange={selectChange} value={value}>
      <option value='' hidden>
        {placeholder}
      </option>
      {options.map(({ id, icon, value }) => (
        <option className='option' key={id} value={value}>
          {icon} &nbsp; {value}
        </option>
      ))}
    </select>
  );
};
