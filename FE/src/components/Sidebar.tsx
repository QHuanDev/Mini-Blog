import React from "react";
import {
  House,
  BookMarked,
  History,
  PanelRightOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const menuIcons = [
    { icon: <House />, label: "Trang chủ", href: "" },
    { icon: <BookMarked />, label: "Yêu thích", href: "" },
    { icon: <History />, label: "Lịch sử", href: "" },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-50 h-[calc(100vh-64px)] bg-black/90 border-r border-slate-800 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 h-16 border-b border-slate-800/50">
          <span
            className={`
    text-xl font-bold whitespace-nowrap
    transition-all duration-300 ease-in-out
    overflow-hidden
    ${isExpanded ? "opacity-100 max-w-50" : "opacity-0 max-w-0"}
  `}
          >
            Menu
          </span>

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-auto"
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? <PanelRightOpen /> : <PanelRightOpen />}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 overflow-visible">
          {menuIcons.map((item, index) => (
            <Link
              key={index}
              className="relative flex items-center group transition-all duration-300 ease-out
              gap-4 px-4 py-3 rounded-2xl mx-1
              text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
              to={item.href}
            >
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <span
                className={`text-base tracking-wide font-medium whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden
                  ${isExpanded ? "opacity-100 max-w-50" : "opacity-0 max-w-0"}`}
              >
                {item.label}
              </span>
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800/45 text-white text-sm rounded-3xl opacity-0 group-hover:opacity-100  transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        
        
      </div>
    </aside>
  );
};

export default Sidebar;
