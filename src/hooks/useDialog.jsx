import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return {
    open,
    toggle,
  };
};

export default useModal;
