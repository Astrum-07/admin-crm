import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiMoreHorizontal, 
  FiCreditCard,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiLayers
} from 'react-icons/fi';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState([]);

  useEffect(() => {

    const localData = localStorage.getItem('local_payments');
    
    if (localData) {
      setPayments(JSON.parse(localData));
    } else {

      const dummyPayments = [
        {
          _id: "1",
          student_id: { first_name: "Olimbek", last_name: "Olimov" },
          group_id: { name: "Backend Node.js" },
          payment_price: 1400000,
          month: "2025-05",
          method: "naqd",
          paidAt: "2025-05-12"
        },
        {
          _id: "2",
          student_id: { first_name: "Davron", last_name: "Raimjonov" },
          group_id: { name: "Frontend React" },
          payment_price: 1200000,
          month: "2025-05",
          method: "karta",
          paidAt: "2025-05-15"
        },
        {
          _id: "3",
          student_id: { first_name: "Aziz", last_name: "Karimov" },
          group_id: { name: "Ingliz tili" },
          payment_price: 800000,
          month: "2025-06",
          method: "naqd",
          paidAt: "2025-06-01"
        }
      ];
      setPayments(dummyPayments);

      localStorage.setItem('local_payments', JSON.stringify(dummyPayments));
    }
  }, []);


  const filteredPayments = payments.filter((payment) => {
    const studentName = `${payment.student_id?.first_name} ${payment.student_id?.last_name}`.toLowerCase();
    const groupName = (payment.group_id?.name || "").toLowerCase();
    return studentName.includes(searchTerm.toLowerCase()) || groupName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8 pb-10 px-2 md:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black font-sans">
            To'lovlar
          </h1>
          <p className="text-slate-400 font-bold text-sm tracking-wide">
            Mahalliy xotiradagi to'lovlar tarixi (Offline mode)
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group flex-1 min-w-[250px]">
            <input 
              type="text"
              placeholder="Talaba yoki guruh nomi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-bold text-sm focus:outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-slate-300"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
          </div>

          <button className="flex items-center justify-center gap-3 px-6 py-3.5 bg-black text-white border-2 border-black font-black uppercase text-xs tracking-[2px] hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
            <FiPlus size={18} /> To'lov Qo'shish
          </button>
        </div>
      </div>

      <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white uppercase text-[11px] tracking-[2px] font-black">
                <th className="py-5 px-4 text-center border-r border-white/20 w-16">No</th>
                <th className="py-5 px-6 border-r border-white/20">Talaba</th>
                <th className="py-5 px-6 border-r border-white/20">Guruh</th>
                <th className="py-5 px-6 border-r border-white/20 text-center">Summa</th>
                <th className="py-5 px-6 border-r border-white/20">Sana / Oy</th>
                <th className="py-5 px-6 border-r border-white/20 text-center">Usul</th>
                <th className="py-5 px-6 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black font-sans">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment, index) => (
                  <tr key={payment._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-5 px-4 text-center font-black text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-2 font-black text-sm uppercase tracking-tight">
                        <FiUser className="text-slate-400" />
                        <span>{payment.student_id?.first_name} {payment.student_id?.last_name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <FiLayers className="text-slate-300" />
                        <span>{payment.group_id?.name || "Guruhsiz"}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 border-2 border-black font-black text-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <FiDollarSign />
                        {payment.payment_price?.toLocaleString()} UZS
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="space-y-1 text-center">
                        <div className="text-[10px] font-black text-black uppercase bg-slate-100 border border-black px-1 inline-block">
                          {payment.month}
                        </div>
                        <div className="flex items-center justify-center space-x-1 text-[9px] font-bold text-slate-400 uppercase italic">
                          <FiCalendar />
                          <span>{payment.paidAt}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-black px-2 py-1">
                         {payment.method}
                       </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <button className="p-3 border-2 border-transparent hover:border-black transition-all active:scale-90">
                        <FiMoreHorizontal size={20} className="text-black" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center font-black uppercase tracking-widest text-slate-300 italic">
                    Ma'lumot topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;