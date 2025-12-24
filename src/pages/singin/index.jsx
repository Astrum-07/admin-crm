import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { FiMail, FiLock, FiArrowRight, FiAlertCircle, FiLoader } from 'react-icons/fi';

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    const savedData = localStorage.getItem('rememberedAdmin');
    return savedData ? JSON.parse(savedData).email : '';
  });

  const [password, setPassword] = useState(() => {
    const savedData = localStorage.getItem('rememberedAdmin');
    return savedData ? JSON.parse(savedData).password : '';
  });

  const [rememberMe, setRememberMe] = useState(() => {
    return !!localStorage.getItem('rememberedAdmin');
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${baseUrl}/api/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Kirishda xatolik yuz berdi!");
      }
      return result;
    },
    onSuccess: (res) => {
      const token = res?.token || res?.data?.token || res?.accessToken;
      const userData = res?.user || res?.data?.user || res?.data;

      if (token) {
        if (rememberMe) {
          localStorage.setItem('rememberedAdmin', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('rememberedAdmin');
        }

        localStorage.setItem('token', token);
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
        }

        setTimeout(() => navigate('/'), 1000);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center p-4 font-sans text-black">
      <div className="w-full max-w-md bg-white border-[4px] border-black p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        
        <div className="text-center mb-8">
          <div className="inline-block border-[4px] border-black p-3 bg-black">
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white leading-none">
              ADMIN<span className="text-slate-400">.</span>CRM
            </h1>
          </div>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[4px] text-slate-400 italic">Avtorizatsiya</p>
        </div>

        {loginMutation.isError && (
          <div className="mb-6 p-4 border-2 border-red-600 bg-red-50 text-red-600 flex items-center space-x-3 font-bold text-xs uppercase tracking-wider animate-pulse">
            <FiAlertCircle size={20} className="flex-shrink-0" />
            <span>{loginMutation.error.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[2px]">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
                <FiMail size={20} />
              </div>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@crm.pro"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black text-black font-bold focus:outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[2px]">Parol</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
                <FiLock size={20} />
              </div>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black text-black font-bold focus:outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer pt-2">
            <div 
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-5 h-5 border-2 border-black flex items-center justify-center transition-all ${rememberMe ? 'bg-black' : 'bg-white'}`}
            >
              {rememberMe && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span 
              onClick={() => setRememberMe(!rememberMe)}
              className="text-[10px] font-black uppercase tracking-widest select-none cursor-pointer"
            >
              Meni eslab qol
            </span>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-black text-white border-2 border-black py-4 flex items-center justify-center space-x-3 font-black uppercase text-xs tracking-[4px] hover:bg-white hover:text-black transition-all duration-300 active:translate-y-2 disabled:opacity-70 group"
          >
            {loginMutation.isPending ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              <>
                <span>Kirish</span>
                <FiArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-slate-100 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Xavfsizlik tizimi faol <br />
            <span className="text-black font-black">© 2025 CRM SYSTEM</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;