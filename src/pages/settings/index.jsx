import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiShield, 
  FiGlobe, 
  FiBell, 
  FiTrash2, 
  FiSave, 
  FiLock,
  FiMoon,
  FiCheckCircle
} from 'react-icons/fi';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const remembered = localStorage.getItem('rememberedAdmin');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (remembered) setIsRemembered(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-2 md:px-6 animate-in fade-in duration-500">
      
      <div className="space-y-1">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black">Sozlamalar</h1>
        <p className="text-slate-400 font-bold text-sm tracking-wide">Tizim va shaxsiy hisobingizni boshqaring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* HISOB SOZLAMALARI */}
        <div className="bg-white border-[4px] border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b-2 border-black pb-4">
              <div className="p-3 bg-black text-white border-2 border-black">
                <FiUser size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest">Joriy Hisob</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Account Overview</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-400">Foydalanuvchi</span>
                <p className="font-black text-black text-lg border-b border-slate-100">{user?.first_name} {user?.last_name || "Admin"}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-400">Email</span>
                <p className="font-black text-black border-b border-slate-100">{user?.email || "email@crm.uz"}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-400">Rol</span>
                <p className="font-black text-red-600 uppercase tracking-widest text-sm">{user?.role || "Manager"}</p>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full py-4 border-2 border-black font-black uppercase text-xs tracking-[3px] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 active:translate-y-1">
            <FiLock /> Parolni Yangilash
          </button>
        </div>

        {/* KIRISH VA XAVFSIZLIK */}
        <div className="bg-white border-[4px] border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center gap-4 border-b-2 border-black pb-4">
            <div className="p-3 bg-black text-white border-2 border-black">
              <FiShield size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">Xavfsizlik</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Security & Login</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-sm uppercase tracking-tight">Avtomatik Kirish</p>
                <p className="text-[10px] text-slate-400 font-bold">Ma'lumotlar localStorage-da saqlangan</p>
              </div>
              <div className={`w-12 h-6 border-2 border-black p-0.5 transition-colors cursor-pointer ${isRemembered ? 'bg-black' : 'bg-slate-100'}`}>
                <div className={`w-4 h-full border border-black transition-transform ${isRemembered ? 'translate-x-6 bg-white' : 'translate-x-0 bg-white'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-sm uppercase tracking-tight">Ikki bosqichli autentifikatsiya</p>
                <p className="text-[10px] text-slate-400 font-bold italic">Hozircha faol emas</p>
              </div>
              <div className="w-12 h-6 border-2 border-slate-200 p-0.5 bg-slate-50 cursor-not-allowed">
                <div className="w-4 h-full bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white border-[4px] border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center gap-4 border-b-2 border-black pb-4">
            <div className="p-3 bg-black text-white border-2 border-black">
              <FiGlobe size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">Tizim Tili</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Language & Appearance</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 border-2 border-black font-black text-xs uppercase bg-black text-white">O'zbekcha</button>
            <button className="py-3 border-2 border-black font-black text-xs uppercase hover:bg-slate-50 transition-all">English</button>
            <button className="py-3 border-2 border-black font-black text-xs uppercase hover:bg-slate-50 transition-all">Русский</button>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-2">
              <FiMoon className="text-black" />
              <span className="font-black text-xs uppercase">Tungi rejim</span>
            </div>
            <div className="w-12 h-6 border-2 border-black p-0.5 bg-slate-100 cursor-pointer">
              <div className="w-4 h-full bg-black"></div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[4px] border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center gap-4 border-b-2 border-black pb-4">
            <div className="p-3 bg-red-600 text-white border-2 border-black">
              <FiTrash2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest text-red-600">Xavfli Hudud</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Danger Zone</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => {
                if(window.confirm("Barcha kesh ma'lumotlarini o'chirmoqchimisiz?")) {
                  localStorage.clear();
                  window.location.href = '/sign-in';
                }
              }}
              className="w-full py-4 bg-white border-2 border-red-600 text-red-600 font-black uppercase text-xs tracking-[1px] hover:bg-red-600 hover:text-white transition-all active:translate-y-1"
            >
              Keshni Tozalash va Chiqish
            </button>
            <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-widest italic">
              Bu amal barcha saqlangan token va profil ma'lumotlarini o'chirib tashlaydi.
            </p>
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-10">
        <button className="flex items-center gap-3 px-12 py-5 bg-black text-white border-4 border-black font-black uppercase text-sm tracking-[4px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          <FiCheckCircle size={20} /> Sozlamalarni Saqlash
        </button>
      </div>

    </div>
  );
};

export default Settings;