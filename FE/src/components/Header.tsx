import { ChevronDown, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 h-16 border-b border-slate-800 bg-black/40 backdrop-blur-md transition-all duration-300 flex items-center px-6">
      <div className="flex items-center px-11">
        <span className="text-3xl font-bold bg-linear-to-tr from-blue-400 to-purple-500 bg-clip-text text-transparent">
          DevSocial
        </span>
      </div>

      <div className="flex-1 pl-20">
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm trên DevSocial..."
            className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group cursor-pointer flex items-center space-x-1">
          <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
            Đề xuất
          </span>
          <ChevronDown
            size={14}
            className="text-slate-500 group-hover:text-white transition-colors mt-0.5"
          />

          {/* Simple Dropdown content (Visual only) */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Xu hướng
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                Mới nhất
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-l border-slate-800 pl-6">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src="https://picsum.photos/id/64/100/100"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
