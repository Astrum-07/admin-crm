import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const MainLayout = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex">

      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r-2 border-black transition-transform duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } w-64`}
      >
        <Sidebar />
      </aside>


      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? "ml-0" : "ml-64"
        }`}
      >

        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;