import React from "react";
import { Mail, Lock, Github, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic here
    navigate("/");
  };

  return (
    <AuthLayout
      title="Chào mừng trở lại"
      subtitle="Đăng nhập vào tài khoản của bạn."
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="developer@example.com"
            label="Email"
            icon={<Mail size={18} />}
          />
          <div className="space-y-1">
            <Input
              type="password"
              placeholder="••••••••"
              label="Password"
              icon={<Lock size={18} />}
            />
            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>
        </div>

        <Button type="submit" fullWidth>
          Đăng nhập <ArrowRight size={18} />
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900/60 text-slate-500">
              Hoặc đăng nhập với
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="secondary" className="justify-center">
            <Github size={18} /> GitHub
          </Button>
          <Button type="button" variant="secondary" className="justify-center">
            <span className="font-bold text-lg leading-none bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-green-400">
              G
            </span>{" "}
            Google
          </Button>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
