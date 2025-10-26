'use client';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import React, { useEffect, useRef, useState } from 'react';

// Types
type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type DropdownProps = {
  children: ReactNode;
};

type DropdownTriggerProps = {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void; // Internal prop from cloneElement
  setIsOpenAction?: (isOpen: boolean) => void; // External prop
};

type DropdownMenuProps = {
  children: ReactNode;
  isOpen?: boolean;
  align?: 'left' | 'right' | 'center';
};

type DropdownItemProps = {
  children: ReactNode;
  icon?: LucideIcon;
  onClick?: () => void; // Internal prop
  onClickAction?: () => void; // External prop
  variant?: 'default' | 'danger';
};

type DropdownLabelProps = {
  children: ReactNode;
};

// Dropdown Components
export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<DropdownContextType>, { isOpen, setIsOpen })
          : child)}
    </div>
  );
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  isOpen,
  setIsOpen,
  setIsOpenAction,
}) => {
  // Use setIsOpenAction if provided, otherwise use setIsOpen from cloneElement
  const handleClick = setIsOpenAction || setIsOpen;

  return (
    <button
      type="button"
      onClick={() => handleClick?.(!isOpen)}
    >
      {children}
    </button>
  );
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, isOpen, align = 'left' }) => {
  if (!isOpen) {
    return null;
  }

  const alignmentClasses: Record<'left' | 'right' | 'center', string> = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`absolute ${alignmentClasses[align]} mt-2 w-56 z-50`}>
      <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1">
        {children}
      </div>
    </div>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  icon: Icon,
  onClick,
  onClickAction,
  variant = 'default',
}) => {
  // Use onClickAction if provided, otherwise use onClick
  const handleClick = onClickAction || onClick;

  const variantClasses: Record<'default' | 'danger', string> = {
    default: 'text-gray-700 hover:bg-gray-100',
    danger: 'text-red-600 hover:bg-red-50',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${variantClasses[variant]}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
};

export const DropdownSeparator: React.FC = () => {
  return <div className="h-px bg-gray-200 my-1" />;
};

export const DropdownLabel: React.FC<DropdownLabelProps> = ({ children }) => {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {children}
    </div>
  );
};
