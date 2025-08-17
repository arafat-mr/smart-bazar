import React from 'react';
import useUserInfo from '../../Hooks/useUserInfo';

const DashbHome = () => {
  const { userInfo } = useUserInfo();
  const role = userInfo?.role || 'user'; 

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center p-4 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md">
      <div className="bg-transparent backdrop-blur-2xl shadow-2xl text-gray-800 rounded-md p-8 md:p-12 max-w-xl w-full text-center"
                     style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}

      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Welcome to Your Dashboard</h2>

        {role === 'admin' && (
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Admin Panel</h3>
            <p className="text-gray-800">Manage users, products, and oversee platform operations.</p>
          </section>
        )}

        {role === 'vendor' && (
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Vendor Dashboard</h3>
            <p className="text-gray-800">Upload products, manage listings, and track your sales.</p>
          </section>
        )}

        {role === 'user' && (
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">User Dashboard</h3>
            <p className="text-gray-800">Browse products, add to watchlist, and manage your orders.</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default DashbHome;
