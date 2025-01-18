import React from "react";
import { Link } from "react-router-dom";
const left = () => {
  return (
    <div className= "flex justify-evenly  font-bold text-3xl my-5" >
      <div className="hover:shadow-lg hover:scale-150 hover:text-blue-950 active:scale-120 bg-cyan-600 w-1/5 h-10 rounded-md text-center">
        <Link to="/">INVENTORY</Link>
      </div>
      <div className="hover:shadow-lg hover:scale-150 hover:text-blue-950 active:scale-120  bg-cyan-600 w-1/5 h-10 rounded-md text-center">
        <Link to="/sale">SALES</Link>
      </div>
      <div className="hover:shadow-lg hover:scale-150 hover:text-blue-950 active:scale-120  bg-cyan-600 w-1/5 h-10 rounded-md text-center">
        <Link to="/report">REPORTS</Link>
      </div>
    </div>
  );
};

export default left;
