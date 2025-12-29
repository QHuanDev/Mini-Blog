import { useState } from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Background from "../Background";
import Sidebar from "../Sidebar";

const ClientLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  return (
    <>
      <div className="relative min-h-screen text-slate-200 font-sans">
        <Background />

        <Header />
        <main className="relative z-10 pt-24 px-4 pb-12 transition-all duration-300">
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleSidebar={toggleSidebar}
          />
          <div
            className={`max-w-2xl mx-auto ${
              isSidebarExpanded ? "ml-64" : "ml-16"
            } transition-all duration-300`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ClientLayout;
