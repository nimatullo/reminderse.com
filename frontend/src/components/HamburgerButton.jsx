import React, { useState } from "react";

const HambugerButton = () => {
  const [open, setOpen] = useState("");
  return (
    <button onClick={console.log("clicked!")}>
      <GiHamburgerMenu />
    </button>
  );
};

export default HambugerButton;
