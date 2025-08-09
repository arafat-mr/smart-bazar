import React from 'react';
import useUserInfo from '../../Hooks/useUserInfo';

const DashbHome = () => {
  const { userInfo } = useUserInfo();
  const role = userInfo?.role || 'user'; 

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center p-4 bg-transparent backdrop-blur-2xl shadow-2xl rounded-md">
      <div className="bg-transparent backdrop-blur-2xl shadow-2xl text-white rounded-md p-8 md:p-12 max-w-xl w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Welcome to Your Dashboard</h2>

        {role === 'admin' && (
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">Admin Panel</h3>
            <p className="text-white">Manage users, products, and oversee platform operations.</p>
          </section>
        )}

        {role === 'vendor' && (
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">Vendor Dashboard</h3>
            <p className="text-white">Upload products, manage listings, and track your sales.</p>
          </section>
        )}

        {role === 'user' && (
          <section>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">User Dashboard</h3>
            <p className="text-white">Browse products, add to watchlist, and manage your orders.</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default DashbHome;
