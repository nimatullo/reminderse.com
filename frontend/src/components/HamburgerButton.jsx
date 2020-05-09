import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const HambugerButton = () => {
  const [open, setOpen] = useState("");
  return (
    <button onClick={console.log("clicked!")}>
      <GiHamburgerMenu />
    </button>
  );
};

export default HambugerButton;
