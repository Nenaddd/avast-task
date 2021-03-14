import React from 'react';

export const Input = ({
    onChange,
    value,
    type
}) => (
    <input
        type={type}
        onChange={onChange}
        value={value}
    />
);
