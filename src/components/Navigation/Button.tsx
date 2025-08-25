import React from "react";
import { Link } from "react-router";

type ButtonProps = {
  icon: React.ReactNode;
  title: string;
  className?: string;
  link?: string;
};

function Button(props: ButtonProps) {
  const content = (
    <div className="flex items-center gap-5 p-1">
      {props.icon && <span className="">{props.icon}</span>}
      <p className="">{props.title}</p>
    </div>
  );

  return (
    <div className="flex flex-col">
      {props.link ? (
        <Link
          to={props.link}
          className={`flex items-center justify-between px-2 text-white border border-[#c2c2c2] m-1 mt-4 rounded-[10px] py-2 bg-[#00a99d] transition-colors duration-200 hover:bg-white hover:text-[#00a99d] ${props.className}`}
        >
          {content}
        </Link>
      ) : (
        <button
          className={`flex items-center justify-between text-white px-2 border border-[#c2c2c2] m-1 mt-4 rounded-[10px] py-2 bg-[#00a99d] transition-colors duration-200 hover:bg-white hover:text-[#00a99d] ${props.className}`}
        >
          {content}
        </button>
      )}
    </div>
  );
}

export default Button;
