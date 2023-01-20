import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed h-[80px] bg-purple-600 top-0 left-0 w-full flex items-center z-[100]">
      <nav className=" w-full px-10 flex justify-between items-center m-auto">
        <div>
          <span className="text-3xl text-white font-bold tracking-tight cursor-pointer">
          <Link to='/lists'>ShoppingList </Link>
          </span>
        </div>
        <div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
