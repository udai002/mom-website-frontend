import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";


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
  {
    id:6 , 
    title:"Employee Engagment",
    icon:<PiMicrosoftTeamsLogoBold className="h-6 w-6"/> , 
    link:"/employeeEngagment"
  },
    {
    id:7 , 
    title:"Employee Leaves",
    icon:<AiOutlineFileDone  className="h-6 w-6"/> , 
    link:"/leaves"
  }
  
];

function Scrollbody() {
  return (
    <>
      <div className="overflow-y-auto h-[70%] overflew-scrollbar-hide mt-2 md:p-4  w-72  ">
        {OptionsList.map((item) =><Button className="" link={item.link}  icon={item.icon} title={item.title} options={item.options} />)}
      </div>
    </>
  );
}

export default Scrollbody;