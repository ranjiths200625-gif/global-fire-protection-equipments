import React, { useState, useEffect } from 'react';
import { Search, Trash2, Eye, X, Phone, Mail } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { formatDate, getStatusBadgeClass } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';

const STATUSES = ['All', 'New', 'Contacted', 'Completed', 'Closed'];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updating, setUpdating] = useState(false);
  const { addToast } = useToast();

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await enquiryService.getAll(params);
      setEnquiries(res.data || []);
    } catch (err) {
      addToast('Failed to load enquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleUpdateStatus = async (id, newStatus, notes) => {
    setUpdating(true);
    try {
      const res = await enquiryService.updateStatus(id, {
        status: newStatus,
        notes: notes !== undefined ? notes : selectedEnquiry?.notes,
      });
      addToast('Enquiry updated.', 'success');
      setSelectedEnquiry(res.data);
      fetchEnquiries();
    } catch (err) {
      addToast('Failed to update enquiry status.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      await enquiryService.delete(id);
      addToast('Enquiry record deleted.', 'success');
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      addToast('Failed to delete enquiry.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900">Enquiry Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review customer inquiries, track follow-ups, and update communication statuses.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-brand-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 shadow-xs"
          />
        </form>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No enquiries found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">{formatDate(enq.createdAt)}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{enq.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{enq.phone}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{enq.productOrService}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadgeClass(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id)}
                          className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Status Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-brand-700 font-bold bg-brand-50 px-2.5 py-0.5 rounded-full">
                Enquiry Details
              </span>
              <h3 className="text-xl font-heading font-black text-slate-900 mt-2">
                {selectedEnquiry.name}
              </h3>
              <p className="text-xs text-slate-500">
                Submitted on {formatDate(selectedEnquiry.createdAt)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="font-mono text-slate-900 font-bold hover:underline"
                >
                  {selectedEnquiry.phone}
                </a>
              </div>
              {selectedEnquiry.email && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-slate-900 font-bold hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">
                  Required Service:
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedEnquiry.productOrService}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">
                  Customer Message:
                </span>
                <p className="text-slate-800 mt-1 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            {/* Update Status Controls */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">
                Update Status:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['New', 'Contacted', 'Completed', 'Closed'].map((st) => (
                  <button
                    key={st}
                    disabled={updating}
                    onClick={() => handleUpdateStatus(selectedEnquiry._id, st)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedEnquiry.status === st
                        ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Internal Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Internal Follow-up Notes:
              </label>
              <textarea
                rows={2}
                defaultValue={selectedEnquiry.notes || ''}
                onBlur={(e) =>
                  handleUpdateStatus(selectedEnquiry._id, selectedEnquiry.status, e.target.value)
                }
                placeholder="Add notes (e.g. Called customer, quoted refill rate for 4 units)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 resize-none"
              />
              <p className="text-[10px] text-slate-400">Notes save automatically when you click outside.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
