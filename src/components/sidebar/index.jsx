import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiShield, 
  FiBriefcase, 
  FiUserCheck, 
  FiLayers, 
  FiBookOpen, 
  FiCreditCard, 
  FiSettings, 
  FiLogOut, 
  FiArrowRight 
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/sign-in';
  };


  const activeClass = "group flex items-center justify-between px-4 py-3 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200";
  

  const inactiveClass = "group flex items-center justify-between px-4 py-3 text-slate-500 border-2 border-transparent hover:border-black hover:text-black hover:bg-slate-50 hover:translate-x-2 transition-all duration-300";

  return (
    <div className="flex flex-col h-full bg-white">

      <div className="p-8">
        <h1 className="text-2xl font-black text-black tracking-tighter border-b-4 border-black inline-block leading-none">
          ADMIN-CRM<span className="text-slate-300">.</span>
        </h1>
      </div>


      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-4 ml-2"> Menu</p>


        <Link to="/" className={location.pathname === "/" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiHome size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Asosiy</span>
          </div>
          {location.pathname !== "/" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/managers" className={location.pathname === "/managers" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiBriefcase size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Menajerlar</span>
          </div>
          {location.pathname !== "/managers" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/admins" className={location.pathname === "/admins" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiShield size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Adminlar</span>
          </div>
          {location.pathname !== "/admins" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/teachers" className={location.pathname === "/teachers" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiUserCheck size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Ustozlar</span>
          </div>
          {location.pathname !== "/teachers" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/students" className={location.pathname === "/students" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiUsers size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Studentlar</span>
          </div>
          {location.pathname !== "/students" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/groups" className={location.pathname === "/groups" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiLayers size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Guruhlar</span>
          </div>
          {location.pathname !== "/groups" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/courses" className={location.pathname === "/courses" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiBookOpen size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">Kurslar</span>
          </div>
          {location.pathname !== "/courses" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <Link to="/payments" className={location.pathname === "/payments" ? activeClass : inactiveClass}>
          <div className="flex items-center space-x-3">
            <FiCreditCard size={20} />
            <span className="font-bold text-xs uppercase tracking-[1px]">To'lovlar</span>
          </div>
          {location.pathname !== "/payments" && <FiArrowRight className="opacity-0 group-hover:opacity-100" />}
        </Link>


        <div className="pt-6 mt-6 border-t border-slate-200">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-4 ml-2">Boshqalar</p>
          
          <Link to="/settings" className={location.pathname === "/settings" ? activeClass : inactiveClass}>
            <div className="flex items-center space-x-3">
              <FiSettings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              <span className="font-bold text-xs uppercase tracking-[1px]">Sozlamalar</span>
            </div>
          </Link>

          <Link to="/profile" className={location.pathname === "/profile" ? activeClass : inactiveClass}>
            <div className="flex items-center space-x-3">
              <FiUserCheck size={20} />
              <span className="font-bold text-xs uppercase tracking-[1px]">Profil</span>
            </div>
          </Link>
        </div>
      </nav>


      <div className="p-4 border-t-2 border-black bg-slate-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-4 bg-white border-2 border-black text-black font-black uppercase text-[10px] tracking-[3px] hover:bg-black hover:text-white transition-all duration-300 active:scale-95"
        >
          <FiLogOut size={16} />
          <span>Chiqish</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;