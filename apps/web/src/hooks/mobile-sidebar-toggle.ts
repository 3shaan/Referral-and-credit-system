import { useState } from "react";

const useMobileSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
};

export default useMobileSidebarToggle
