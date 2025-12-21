import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiBookOpen, 
  FiUserCheck, 
  FiDollarSign, 
  FiTrendingUp, 
  FiCalendar,
  FiArrowUpRight,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';

const Home = () => {
  const [user, setUser] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }


    const savedPayments = localStorage.getItem('local_payments');
    if (savedPayments) {
      const allPayments = JSON.parse(savedPayments);

      setRecentPayments(allPayments.slice(0, 3));
    }
  }, []);

  const stats = [
    { id: 1, name: 'Jami Talabalar', value: '1,240', icon: FiUsers, change: '+12%' },
    { id: 2, name: 'Aktiv Kurslar', value: '24', icon: FiBookOpen, change: '+2' },
    { id: 3, name: 'Ustozlar', value: '38', icon: FiUserCheck, change: '0' },
    { id: 4, name: "Oylik tushum", value: '42.5M', icon: FiDollarSign, change: '+18%' },
  ];

  return (
    <div className="space-y-10 pb-20 px-2 md:px-6 animate-in fade-in duration-700">
      

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-4 border-black pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Xush Kelibsiz, <br /> 
            <span className="bg-black text-white px-3">
              {user?.first_name || user?.name || 'Admin'}!
            </span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[4px] text-[10px] md:text-xs">
            Bugun: {new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Tizim holati</p>
          <div className="flex items-center gap-2 text-green-600 font-black uppercase text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Online
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-black text-white border-2 border-black">
                <item.icon size={22} />
              </div>
              <span className="text-[9px] font-black text-green-600 border border-green-200 px-1">{item.change}</span>
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.name}</p>
            <h3 className="text-3xl font-black text-black">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
              <h2 className="text-xl font-black uppercase italic flex items-center gap-2">
                <FiTrendingUp /> So'nggi To'lovlar
              </h2>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">LocalStorage Data</p>
            </div>
            
            <div className="space-y-4">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-2 border-black hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 border-2 border-black flex items-center justify-center font-black group-hover:bg-black group-hover:text-white transition-all uppercase">
                        {(payment.student_id?.first_name || 'U')[0]}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight">
                          {payment.student_id?.first_name} {payment.student_id?.last_name}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Guruh: {payment.group_id?.name || 'Noma\'lum'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm">
                        {payment.payment_price?.toLocaleString()} UZS
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 italic">
                        {payment.paidAt || 'Yaqinda'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center border-2 border-dashed border-slate-300">
                  <FiAlertCircle className="mx-auto text-slate-300 mb-2" size={30} />
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Hozircha to'lovlar tarixi yo'q</p>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="space-y-8">

          <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/20 pb-2">
              <FiCalendar /> Navbatchilik
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-white pl-4 group cursor-pointer hover:translate-x-1 transition-transform">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Manager</p>
                <p className="font-black uppercase text-sm tracking-tight">
                  {user?.first_name} {user?.last_name || '(Siz)'}
                </p>
              </div>
              <div className="border-l-4 border-slate-700 pl-4 opacity-50">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Kuzatuvchi</p>
                <p className="font-black uppercase text-sm tracking-tight italic">Tizim Ma'muri</p>
              </div>
            </div>
          </div>


          <button className="w-full bg-white border-4 border-black p-4 font-black uppercase text-xs tracking-[3px] flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2">
             <FiArrowUpRight size={20} /> Texnik Yordam
          </button>
        </div>

      </div>

      <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[4px] justify-center pt-10">
        <FiClock /> Tizim statusi: Sinxronizatsiya faol
      </div>
    </div>
  );
};

export default Home;