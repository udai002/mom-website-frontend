import React, { useContext } from "react";
import { Link } from "react-router";
import { Store } from "../../context/NavBarContext";

type ButtonProps = {
  icon: React.ReactNode;
  title: string;
  className?: string;
  link?: string;
};

function Button(props: ButtonProps) {
  const context = useContext(Store);
  if (!context) {
    throw new Error("Sidenavbar must be used within a Store.Provider");
  }
  const { open, setOpen } = context;

  console.log("..........", open);

  function handleOpenOptions() {
    setOpen(true);
  }

  const content = (
    <div className="flex items-center gap-5 p-1">
      {props.icon && <span>{props.icon}</span>}
      <p>{props.title}</p>
    </div>
  );

  const icons = (
    <div className="flex items-center gap-5 p-1">
      {props.icon && <span>{props.icon}</span>}
    </div>
  );

  const innerContent = open ? content : icons;

  return (
    <div className="flex flex-col">
      {props.link ? (
        <Link
          to={props.link}
          className={`flex items-center justify-between px-2 text-white border border-[#c2c2c2] m-1 mt-4 rounded-[10px] py-2 bg-[#00a99d] transition-colors duration-200 hover:bg-white hover:text-[#00a99d] ${props.className}`}
        >
          {innerContent}
        </Link>
      ) : (
        <button
          onClick={handleOpenOptions}
          className={`flex items-center justify-between text-white px-2 border border-[#c2c2c2] m-1 mt-4 rounded-[10px] py-2 bg-[#00a99d] transition-colors duration-200 hover:bg-white hover:text-[#00a99d] ${props.className}`}
        >
          {innerContent}
        </button>
      )}
    </div>
  );
}

export default Button;
