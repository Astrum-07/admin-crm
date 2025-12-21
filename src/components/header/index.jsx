import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FiChevronRight, FiUser, FiMenu, FiBell } from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const params = useParams();

  const [userData, setUserData] = useState({
    name: "Yuklanmoqda...",
    role: "User",
  });

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    

    console.log("LocalStorage dagi xom ma'lumot:", storedUser);

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        console.log("Parse qilingan ma'lumot:", parsed);

      
        const firstName = parsed?.first_name || "";
        const lastName = parsed?.last_name || "";
        const fullName = parsed?.name || parsed?.fullName || parsed?.username;

        const finalName = (firstName || lastName) 
          ? `${firstName} ${lastName}`.trim() 
          : (fullName || "Foydalanuvchi");


        const finalRole = parsed?.role || "Manager";

        setUserData({
          name: finalName,
          role: finalRole
        });
      } catch (error) {
        console.error("JSON parse qilishda xato:", error);
        setUserData({ name: "Admin", role: "Manager" });
      }
    } else {
      setUserData({ name: "Kirilmagan", role: "Mehmon" });
    }
  }, [location.pathname]); 

  const getPathName = () => {
    const path = location.pathname;
    if (path === "/") return "Asosiy";
    if (path.includes("/managers")) return "Menajerlar";
    if (path.includes("/admins")) return "Adminlar";
    if (path.includes("/teachers")) return "Ustozlar";
    if (path.includes("/students")) return "Studentlar";
    if (path.includes("/groups")) return "Guruhlar";
    if (path.includes("/courses")) return "Kurslar";
    if (path.includes("/payments")) return "To'lovlar";
    if (path.includes("/settings")) return "Sozlamalar";
    if (path.includes("/profile")) return "Profil";
    return params.name || "Sahifa";
  };

  return (
    <header className="h-16 md:h-20 bg-white border-b-2 border-black px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      

      <div className="flex items-center space-x-3 md:space-x-6">
        <button 
          onClick={toggleSidebar}
          className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all active:scale-90"
        >
          <FiMenu size={20} />
        </button>

        <nav className="flex items-center space-x-1 md:space-x-2">
          <span className="hidden sm:block text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">Tizim</span>
          <FiChevronRight className="hidden sm:block text-slate-300" size={14} />
          
          <span className="text-black font-black text-[10px] md:text-xs uppercase tracking-widest bg-slate-100 px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
            {getPathName()}
          </span>
        </nav>
      </div>


      <div className="flex items-center space-x-2 md:space-x-6">
        <button className="p-2 border-2 border-transparent hover:border-black transition-all">
          <FiBell size={18} className="md:size-5" />
        </button>

        <div className="flex items-center space-x-2 md:space-x-4 border-l-2 border-slate-100 pl-3 md:pl-6 group cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-black uppercase tracking-tight">
              {userData.name}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {userData.role}
            </p>
          </div>
          
          <div className="w-9 h-9 md:w-11 md:h-11 border-2 border-black bg-white flex items-center justify-center transition-all group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FiUser size={20} className="md:size-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;