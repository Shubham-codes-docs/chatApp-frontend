import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const Buttons = () => {
  return (
    <button type="submit" style={{backgroundColor:"inherit"}}>
      <FontAwesomeIcon icon={faPaperPlane} size="2x" color="black"/>
    </button>
  );
};

export default Buttons;
