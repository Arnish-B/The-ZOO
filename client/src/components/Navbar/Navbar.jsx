import React, { useState } from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 my-5 justify-center">
      <div className="col-span-2 mx-auto md:mx-0">
        <img
          src="/twitter-logo.png"
          alt="Logo"
          width={"100px"}
          className="ml-8"
        />
      </div>

      <div className="col-span-6 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="mt-6 flex justify-between items-center">
          <h2 className=" font-bold text-2xl">

            {location.includes("agentprofile") ? (
              "Agent Profile"
            ) : location.includes("explore") ? (
              "Explore"
            ) : location.includes("profile") ? (
               <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : (
              "Home"
            )}
          </h2>
          <StarBorderPurple500Icon />
        </div>
      </div>

      <div className=" mt-6 col-span-2 px-0 md:px-6 mx-auto">
        <SearchIcon className="absolute m-2" />
        <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
      </div>
    </div>
  );
};

export default Navbar;
