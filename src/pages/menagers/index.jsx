import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { 
  FiUserPlus, 
  FiMail, 
  FiMoreVertical, 
  FiLoader, 
  FiAlertCircle,
  FiUser,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';

const Managers = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('token');


  const { data: managers, isPending, isError, error } = useQuery({
    queryKey: ['managers'],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/api/staff/all-managers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data?.data || [];
    },
    enabled: !!token,
  });


  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <FiLoader className="text-5xl animate-spin text-black" />
        <p className="font-black uppercase tracking-[3px] text-xs text-slate-400">Managerlar yuklanmoqda...</p>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="max-w-md mx-auto mt-10 border-4 border-black p-8 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center">
        <FiAlertCircle size={40} className="mx-auto text-red-600 mb-4" />
        <h2 className="text-lg font-black uppercase">Xatolik!</h2>
        <p className="text-slate-500 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 px-2 md:px-6">
      

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black font-sans">
            Managerlar
          </h1>
          <p className="text-slate-400 font-bold text-sm tracking-wide">
            Tizim boshqaruvchilari va xodimlar ro'yxati
          </p>
        </div>
        
        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-black text-white border-2 border-black font-black uppercase text-xs tracking-[2px] hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
          <FiUserPlus size={20} /> Yangi Manager
        </button>
      </div>


      <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white uppercase text-[11px] tracking-[2px] font-black">
                <th className="py-5 px-6 border-r border-white/20">Foydalanuvchi</th>
                <th className="py-5 px-6 border-r border-white/20 hidden md:table-cell">Email Manzili</th>
                <th className="py-5 px-6 border-r border-white/20">Rol</th>
                <th className="py-5 px-6 border-r border-white/20">Holat</th>
                <th className="py-5 px-6 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black">
              {managers.map((manager) => (
                <tr key={manager._id} className="hover:bg-slate-50 transition-colors group">

                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center text-black font-black text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-all">
                        {manager.first_name?.[0]}{manager.last_name?.[0]}
                      </div>
                      <div>
                        <p className="text-black font-black uppercase text-sm tracking-tight leading-none">
                          {manager.first_name} {manager.last_name}
                        </p>
                        <p className="text-slate-400 text-[9px] font-bold mt-1 uppercase tracking-tighter">
                          ID: {manager._id?.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>


                  <td className="py-5 px-6 hidden md:table-cell">
                    <div className="flex items-center space-x-2 font-bold text-slate-600 text-sm italic">
                      <FiMail className="text-black" />
                      <span>{manager.email}</span>
                    </div>
                  </td>


                  <td className="py-5 px-6">
                    <span className="inline-block bg-white border-2 border-black px-3 py-1 font-black uppercase text-[10px] tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                      {manager.role}
                    </span>
                  </td>


                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-2">
                      {manager.status === 'faol' ? (
                        <FiCheckCircle className="text-green-600" size={18} />
                      ) : (
                        <FiXCircle className="text-red-600" size={18} />
                      )}
                      <span className={`font-black uppercase text-[10px] tracking-widest ${manager.status === 'faol' ? 'text-black' : 'text-red-600'}`}>
                        {manager.status}
                      </span>
                    </div>
                  </td>


                  <td className="py-5 px-6 text-center">
                    <button className="p-3 border-2 border-transparent hover:border-black hover:bg-slate-100 transition-all active:scale-90">
                      <FiMoreVertical size={20} className="text-black" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {managers.length === 0 && (
        <div className="py-20 text-center border-4 border-black border-dashed bg-white">
          <FiUser size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-black uppercase tracking-widest italic">Hozircha managerlar mavjud emas</p>
        </div>
      )}
    </div>
  );
};

export default Managers;