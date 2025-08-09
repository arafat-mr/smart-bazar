import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ['vendor-products', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/vendor/${user?.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/products/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Your product has been removed.', 'success');
        refetch();
      }
    }
  };

  const showRejectionReason = (reason) => {
    Swal.fire({
      title: 'Rejection Reason',
      text: reason || 'No reason provided.',
      background: '#083344', 
      color: '#ffffff',
      confirmButtonColor: '#0ea5e9'
    });
  };

  return (
    <div className="p-2 lg:p-6 max-w-7xl mx-auto bg-blue-900 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">📦 My Products</h2>

      <div className="overflow-x-auto">
        <table className="table text-white">
          <thead>
            <tr className="text-white bg-blue-600">
              <th>#</th>
              <th>Item Name</th>
              <th>Price/unit</th>
              <th>Market</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const latestPrice = product.prices?.[product.prices.length - 1]?.price;
              const latestDate = product.prices?.[product.prices.length - 1]?.date;

              return (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.itemName}</td>
                  <td>৳{latestPrice}</td>
                  <td>{product.marketName}</td>
                  <td>{latestDate}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`badge ${
                          product.status === 'approved'
                            ? 'badge-success'
                            : product.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}
                      >
                        {product.status}
                      </span>
                      {product.status === 'rejected' && product.rejectionReason && (
                        <button
                          onClick={() => showRejectionReason(product.rejectionReason)}
                          className="btn btn-xs bg-yellow-600 text-white"
                          title="See rejection reason"
                        >
                          ❓
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="space-x-2 flex flex-wrap items-center gap-1">
                    <Link to={`/dashboard/update-product/${product._id}`} className="btn btn-sm btn-info">
                      ✏️ Update
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-error">
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center mt-6 text-white/70">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
