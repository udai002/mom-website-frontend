import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";

type option = {
  id: number;
  title: string;
  link?: string;
};

type buttonProps = {
  icon: string;
  title: string;
  className?: string;
  link?: string;
  options?: option[];
};

function Button(props: buttonProps) {
  const [reverse, setReverse] = useState(false);
  const [open, setOpen] = useState(false);

  function handleOptionsToggle() {
    setOpen(!open);
  }
  const toggleReverse = () => {
    setReverse(!reverse);
  };

  return (
    <div className="flex flex-col">
      <button
        className={` flex-col items-center justify-between px-2 hover:inset-shadow-md  border-[1px] hover:scale-20 transform-transition border-[#c2c2c2] hover:border-[#fff] m-1 mt-4 rounded-[10px] py-1${
          props.className
        } ${open ? "bg-[white]" : "bg-[#00a99d]"}`}
        onClick={() => {
          handleOptionsToggle();
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 p-1">
           
            {props.icon && (
              <span className={`${open ? " text-[#00a99d]" : "text-[white] "}`}>
                {props.icon}
              </span>
            )}

            <p className={`${open ? "text-[#00a99d]" : "text-[white]"}`}>
              {props.title}
            </p>
          </div>
          {props.link === null && (
            <motion.div
              animate={{ rotate: reverse ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MdKeyboardArrowDown
                onClick={toggleReverse}
                style={{ cursor: "pointer", display: "inline-block" }}
                className={`${
                  open ? " text-[#00a99d] size-7 " : "text-[white] size-7 "
                }`}
              />
            </motion.div>
          )}
        </div>
        {open && (
          <div className="w-full ">
            {props.options?.map((item) => (
              <ul className="p-3 text-left border-[1px] border-[#00a99d] rounded-[8px] mt-3 border-transparent hover:border-[#00a99d] px-6 py-3 transition duration-300">
                <li>
                  <button className="">{item.title}</button>
                </li>
              </ul>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

export default Button;