// Packages
import React, { useState } from "react";

export default function useToggle(init = false) {
  const [toggle, setToggle] = useState(init);
  const handleToggle = () => setToggle(!toggle);
  return { toggle, handleToggle, setToggle };
}
