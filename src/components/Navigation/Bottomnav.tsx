import React from "react";
import Button from "./Button";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

function Bottomnav() {
  return (
    <div className="flex flex-col border-t-[1px] mt-20 ">
      <Button title="Log Out" icon={<IoIosLogOut className="h-7 w-7"/>} />
    </div>
  );
}

export default Bottomnav;