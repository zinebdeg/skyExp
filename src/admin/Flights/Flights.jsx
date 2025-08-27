import React from 'react';
import { Plane } from 'lucide-react';

const AdminFlights = () => (
  <div className="p-8">
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#eec09a]/30 min-h-96">
      <div className="text-center py-16">
        <Plane className="mx-auto text-[#b94c2a] mb-6" size={64} />
        <h3 className="text-3xl font-bold text-[#b94c2a] mb-4">Flight Management</h3>
        <p className="text-[#b94c2a]/60 text-lg">Manage your flight experiences and tours</p>
      </div>
    </div>
  </div>
);

export default AdminFlights;