import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Package, Wrench, ArrowRight, AlertCircle } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { productService } from '../../services/productService';
import { serviceService } from '../../services/serviceService';
import { formatDate, getStatusBadgeClass } from '../../utils/helpers';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    productsCount: 0,
    servicesCount: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [enqRes, prodRes, servRes] = await Promise.all([
          enquiryService.getAll(),
          productService.getAll(),
          serviceService.getAll(),
        ]);

        setMetrics({
          totalEnquiries: enqRes.metrics?.total || enqRes.data?.length || 0,
          newEnquiries: enqRes.metrics?.new || 0,
          productsCount: prodRes.data?.length || 0,
          servicesCount: servRes.data?.length || 0,
        });

        setRecentEnquiries(enqRes.data?.slice(0, 5) || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900">Dashboard Overview</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time summary of business enquiries, inventory, and services.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Enquiries</p>
            <p className="text-3xl font-heading font-black text-brand-700 mt-2">
              {metrics.newEnquiries}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50 text-brand-700 border border-red-100">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</p>
            <p className="text-3xl font-heading font-black text-slate-900 mt-2">
              {metrics.totalEnquiries}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Products</p>
            <p className="text-3xl font-heading font-black text-slate-900 mt-2">
              {metrics.productsCount}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Services</p>
            <p className="text-3xl font-heading font-black text-slate-900 mt-2">
              {metrics.servicesCount}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Wrench className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-black text-slate-900">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-500">Latest submissions from the website contact and enquiry forms.</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-500">Loading enquiries...</div>
        ) : recentEnquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No customer enquiries received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-3">Date</th>
                  <th className="py-3.5 px-3">Customer</th>
                  <th className="py-3.5 px-3">Phone</th>
                  <th className="py-3.5 px-3">Product / Service</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 text-slate-500">{formatDate(enq.createdAt)}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{enq.name}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-700">{enq.phone}</td>
                    <td className="py-3.5 px-3 text-slate-700">{enq.productOrService}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadgeClass(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        to={`/admin/enquiries`}
                        className="text-brand-700 hover:text-brand-900 font-bold text-[11px]"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
