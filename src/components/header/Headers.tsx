import { NavLink } from "react-router-dom";

function Headers() {
  return (
    <div className="w-full h-[50px] bg-[#add8e6] flex flex-row items-center justify-end">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "no-underline font-bold mx-[6px] mr-10"
            : "no-underline font-light mx-[6px] mr-10"
        }
      >
        Anasayfa
      </NavLink>
      <NavLink
        to="/my-travels"
        className={({ isActive }) =>
          isActive
            ? "no-underline font-bold mx-[6px] mr-10"
            : "no-underline font-light mx-[6px] mr-10"
        }
      >
        Gezilerim
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "no-underline font-bold mx-[6px] mr-10"
            : "no-underline font-light mx-[6px] mr-10"
        }
      >
        Profilim
      </NavLink>
    </div>
  );
}

export default Headers;
