import React from "react";
import { LiaCubesSolid, } from "react-icons/lia"; 
import { FaRegUser } from "react-icons/fa6";
import { MdStorefront } from "react-icons/md";
import { CiGrid41 } from "react-icons/ci";
import { SiAtandt } from "react-icons/si";
import { GrWorkshop } from "react-icons/gr";
import { PiWarehouse } from "react-icons/pi";
import { GrIteration } from "react-icons/gr";
import { TiExportOutline } from "react-icons/ti";
import Button from "./Button";







const OptionsList = [
  {
    id: 1,
    title: "Investors Response",
    icon:<CiGrid41 className="h-7 w-7" />,
    link: "/investor",
  },
  {
    id: 2,
    title: "Users Response",
    icon: <GrIteration className="h-6 w-6"/>,
    link: "/contact",
   
  },
  {
    id: 3,
    title: " Prescription Orders",
    icon: <GrWorkshop className="h-6 w-6"/>,
    link: "/prescription"
  },
  {
    id: 4,
    title: "Manage Jobs",
    icon: <TiExportOutline className="h-6 w-6"/>,
    link: "/job",
  },
  {
    id: 5,
    title: "Manage Employes",
    icon: <FaRegUser className="h-6 w-6"/>,
    link: "/employee",
  },
  
];

function Scrollbody() {
  return (
    <>
      <div className="overflow-y-auto  h-[60%] overflew-scrollbar-hide mt-2 border-b-[1px] p-2 w-72  ">
        {OptionsList.map((item) =><Button className="" link={item.link}  icon={item.icon} title={item.title} options={item.options} />)}
      </div>
    </>
  );
}

export default Scrollbody;