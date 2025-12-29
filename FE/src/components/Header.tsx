import { Bell, MessageCircle, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";
interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 h-16 border-b border-slate-800 bg-black/40 backdrop-blur-md transition-all duration-300 flex items-center px-6">
      <div className="flex items-center px-5">
        <span className="text-3xl font-bold bg-linear-to-tr from-blue-400 to-purple-500 bg-clip-text text-transparent">
          NexusSocial
        </span>
      </div>

      <div className="flex-1 pl-20">
        <div className="relative w-full max-w-md group">
          <Input
            type="text"
            placeholder="Tìm kiếm trên DevSocial..."
            icon={<Search size={18} />}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
            // GUEST VIEW: Show Login/Register Buttons
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" className="text-sm px-6 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            // LOGGED IN VIEW: Show Notifications & Profile
            <>
              <button
          className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors"
          title="Bạn bè"
        >
          <Users size={20} />
          <span className="absolute top-0 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-black"></span>
        </button>
        <button
          className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors"
          title="Tin nhắn"
        >
          <MessageCircle size={20} />
          <span className="absolute top-0 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-black"></span>
        </button>
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-black"></span>
        </button>

        <div className="h-8 w-px bg-slate-800 mx-1"></div>

        <div className="group relative cursor-pointer">
          <div className="w-9 h-9 p-0.5 rounded-full bg-liear-to-tr from-blue-500 to-purple-500">
            <img
              src="https://picsum.photos/100/100"
              alt="User"
              className="w-full h-full rounded-full border-2 border-slate-900 object-cover"
            />
          </div>

          <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 p-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
            >
              Settings
            </Link>
            <div className="h-px bg-slate-800 my-1"></div>
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
            >
              Sign Out
            </Link>
          </div>
        </div>
            </>
          )}
        
      </div>
    </header>
  );
};

export default Header;
