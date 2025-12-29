import React from "react";
import { Mail, Lock, User, Github, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <AuthLayout
      title="Tạo tài khoản"
      subtitle="Tham gia vào cộng đồng của chúng tôi."
    >
      <form onSubmit={handleRegister} className="space-y-5">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Sát Thủ Đa Tình"
            label="Username"
            icon={<User size={18} />}
          />
          <Input
            type="email"
            placeholder="developer@example.com"
            label="Email"
            icon={<Mail size={18} />}
          />
          <Input
            type="password"
            placeholder="••••••••"
            label="Password"
            icon={<Lock size={18} />}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500/50"
          />
          <label htmlFor="terms" className="text-sm text-slate-400">
            Tôi đồng ý với{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Điều khoản và điều kiện
            </a>
          </label>
        </div>

        <Button type="submit" fullWidth>
          Tạo tài khoản <ArrowRight size={18} />
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900/60 text-slate-500">
              Hoặc đăng ký với
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
          Bạn đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
