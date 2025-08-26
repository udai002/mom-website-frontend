import { FaRegUser } from "react-icons/fa6";
import { CiGrid41 } from "react-icons/ci";
import { GrWorkshop } from "react-icons/gr";
import { GrIteration } from "react-icons/gr";
import { TiExportOutline } from "react-icons/ti";
import Button from "./Button";
import SvgIcon from "../SvgIcons/svgicon"

import Job from "../SvgIcons/Job"
import Investor from "../SvgIcons/Investor"
import Contact from "../SvgIcons/Contact"
import Prescription from "../SvgIcons/Prescription"

const OptionsList = [
  {
    id: 1,
    title: "Investors Response",
    icon:<Investor className="h-7 w-7" />,
    link: "/investor",
  },
  {
    id: 2,
    title: "Users Response",
    icon: <Contact className="h-6 w-6"/>,
    link: "/contact",
   
  },
  {
    id: 3,
    title: " Prescription Orders",
    icon: <Prescription className="h-6 w-6"/>,
    link: "/prescription"
  },
  {
    id: 4,
    title: "Manage Jobs",
    icon: <Job className="h-6 w-6"/>,
    link: "/job",
  },
  {
    id: 5,
    title: "Manage Employes",
    icon: <SvgIcon className="h-6 w-6"/>,
    link: "/employee",
  },
  
];

function Scrollbody() {
  return (
    <>
      <div className="overflow-y-auto  h-[60%] overflew-scrollbar-hide mt-2  p-2 w-72  ">
        {OptionsList.map((item) =><Button className="" link={item.link}  icon={item.icon} title={item.title} options={item.options} />)}
      </div>
    </>
  );
}

export default Scrollbody;