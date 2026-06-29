import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const Button = ({ variant = 'primary', className = '', ...props }) => {
    const base = 'px-3 py-2 rounded text-sm font-medium';
    const styles = variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300';
    return _jsx("button", { className: `${base} ${styles} ${className}`, ...props });
};
