import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { 
  FiUser, FiMail, FiCalendar, FiCamera, 
  FiLock, FiCheck, FiLoader, FiAlertCircle 
} from 'react-icons/fi';

const Profile = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('token');


  const getLocalUser = () => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(getLocalUser());
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
  });


  const updateMutation = useMutation({
    mutationFn: async (newData) => {
      const response = await fetch(`${baseUrl}/api/auth/edit-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Xatolik yuz berdi");
      return result;
    },
    onSuccess: (data) => {
      const updatedUser = data?.user || data?.data || data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profil yangilandi!");
    },
    onError: (error) => alert(error.message)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (!user) return <div className="p-10 text-center font-bold">Foydalanuvchi topilmadi.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      

      <div className="bg-white border-[3px] md:border-[4px] border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left w-full">

            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 border-[3px] md:border-[4px] border-black rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                <FiUser size={50} className="text-slate-300 md:size-16" />
              </div>
              <button className="absolute bottom-0 right-0 bg-black text-white p-2 border-2 border-white rounded-full hover:scale-110 transition-all">
                <FiCamera size={14} />
              </button>
            </div>


            <div className="space-y-1">
              <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-slate-500 font-bold text-sm md:text-base tracking-tight">{user?.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest pt-1">
                <FiCalendar /> Qo'shilgan: 2025-06-04
              </div>
            </div>
          </div>


          <div className="w-full md:w-auto text-center">
            <span className="inline-block bg-red-600 text-white px-6 md:px-8 py-2 border-2 border-black font-black uppercase tracking-[2px] text-[10px] md:text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {user?.role || 'manager'}
            </span>
          </div>
        </div>
      </div>


      <div className="bg-white border-[3px] md:border-[4px] border-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-8 border-b-2 border-black pb-4 text-center md:text-left">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter italic">Profil ma'lumotlari</h2>
          <p className="text-slate-400 font-bold text-xs md:text-sm">Shaxsiy ma'lumotlaringizni yangilashingiz mumkin.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-8">
            

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-[2px]">Ism</label>
              <input 
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full p-3 md:p-4 border-2 border-black font-bold text-sm md:text-base focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all outline-none"
              />
            </div>


            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-[2px]">Familiya</label>
              <input 
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="w-full p-3 md:p-4 border-2 border-black font-bold text-sm md:text-base focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all outline-none"
              />
            </div>


            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-[2px]">Email</label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 md:p-4 border-2 border-black font-bold text-sm md:text-base focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all outline-none"
              />
            </div>


            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-[2px]">Rol</label>
              <input 
                type="text"
                value={user?.role || 'manager'}
                readOnly
                className="w-full p-3 md:p-4 border-2 border-black bg-slate-50 text-slate-400 font-bold text-sm md:text-base cursor-not-allowed outline-none"
              />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-6 md:pt-8 border-t-2 border-black">
            <button 
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-white border-2 border-black text-black font-black uppercase text-[10px] md:text-xs tracking-[1px] hover:bg-slate-50 transition-all active:scale-95"
            >
              <FiLock /> Parol ni O'zgartirish
            </button>
            
            <button 
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 md:py-4 bg-black text-white border-2 border-black font-black uppercase text-[10px] md:text-xs tracking-[1px] hover:bg-white hover:text-black transition-all disabled:opacity-50 active:scale-95"
            >
              {updateMutation.isPending ? <FiLoader className="animate-spin" /> : <FiCheck />}
              O'zgartirish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;