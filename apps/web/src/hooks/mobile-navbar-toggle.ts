import { useState } from "react";

const useMobileNavbarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
};

export default useMobileNavbarToggle;
