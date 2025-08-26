import React from "react";
import Button from "./Button";
import { IoIosLogOut } from "react-icons/io";


function Bottomnav() {
  return (
    <div className="flex flex-col border-t-[1px] mt-20 ml-2 ">
      <Button title="Log Out" icon={<IoIosLogOut className="h-7 w-7"/>} />
    </div>
  );
}

export default Bottomnav;