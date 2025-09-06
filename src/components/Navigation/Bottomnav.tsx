import React from "react";
import Button from "./Button";
import { IoIosLogOut } from "react-icons/io";

import { MdOutlineHelpOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import useAdmin from "../../context/AuthContext";


function Bottomnav() {
  const {logout} = useAdmin()

  function handleLogout(){
    logout()
  }
  return (
    <div className="flex flex-col ml-2 border-t mt-3  p-2">
      <Button className="bg-red-500" onclick={handleLogout}  title="Log Out" icon={<IoIosLogOut className="h-7 w-7"/>} />

    </div>
  );
}

export default Bottomnav;