import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  DollarSign,
  X,
  Download,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  Loader,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations from API
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/reservations`,
        { withCredentials: true }
      );
      setReservations(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to load reservations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchReservations();
  }, []);

  // Filter reservations based on search and filters
  useEffect(() => {
    let result = reservations;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(reservation => 
        reservation.fullName.toLowerCase().includes(term) ||
        reservation.email.toLowerCase().includes(term) ||
        (reservation.flight && reservation.flight.title.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(reservation => reservation.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === 'today') {
        result = result.filter(reservation => {
          const resDate = new Date(reservation.date);
          resDate.setHours(0, 0, 0, 0);
          return resDate.getTime() === today.getTime();
        });
      } else if (dateFilter === 'upcoming') {
        result = result.filter(reservation => new Date(reservation.date) > today);
      } else if (dateFilter === 'past') {
        result = result.filter(reservation => new Date(reservation.date) < today);
      }
    }
    
    setFilteredReservations(result);
  }, [reservations, searchTerm, statusFilter, dateFilter]);

  // View reservation details
  const viewReservationDetails = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailModal(true);
  };

  // Update reservation status
  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/api/reservations/${reservationId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        // Update local state
        setReservations(reservations.map(res => 
          res._id === reservationId ? { ...res, status: newStatus } : res
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update reservation status');
    } finally {
      setLoading(false);
    }
  };

  // Delete reservation
  const deleteReservation = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        setLoading(true);
        await axios.delete(
          `${API_BASE_URL}/api/reservations/${id}`,
          { withCredentials: true }
        );
        
        // Remove from local state
        setReservations(reservations.filter(reservation => reservation._id !== id));
      } catch (error) {
        console.error('Error deleting reservation:', error);
        setError('Failed to delete reservation');
      } finally {
        setLoading(false);
      }
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  if (loading && reservations.length === 0) {
    return (
      <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto text-[#b94c2a]" size={48} />
          <p className="mt-4 text-[#b94c2a]">Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="ml-4 text-red-800 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#b94c2a] rounded-2xl">
            <Calendar className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#b94c2a]">Reservation Management</h1>
            <p className="text-[#b94c2a]/70 text-lg">View and manage customer bookings</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white w-full md:w-64"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white appearance-none w-full"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white appearance-none w-full"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchReservations}
              className="flex items-center gap-2 bg-[#b94c2a] text-white px-4 py-3 rounded-xl hover:bg-[#a03d22] transition-colors"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" size={16} /> : <RefreshCw size={16} />}
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eec09a]/30">
          <div className="text-3xl font-bold text-[#b94c2a]">{reservations.length}</div>
          <div className="text-[#b94c2a]/70">Total Reservations</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eec09a]/30">
          <div className="text-3xl font-bold text-[#b94c2a]">
            {reservations.filter(r => r.status === 'confirmed').length}
          </div>
          <div className="text-[#b94c2a]/70">Confirmed</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eec09a]/30">
          <div className="text-3xl font-bold text-[#b94c2a]">
            {reservations.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-[#b94c2a]/70">Pending</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eec09a]/30">
          <div className="text-3xl font-bold text-[#b94c2a]">
            ${reservations.reduce((sum, reservation) => sum + reservation.total, 0)}
          </div>
          <div className="text-[#b94c2a]/70">Total Revenue</div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#eec09a]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#eec09a]/10">
              <tr>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Customer</th>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Flight</th>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Date & Time</th>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Travelers</th>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Total</th>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-[#b94c2a] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eec09a]/20">
              {filteredReservations.map(reservation => (
                <tr key={reservation._id} className="hover:bg-[#eec09a]/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-[#b94c2a]">{reservation.fullName}</div>
                    <div className="text-sm text-[#b94c2a]/70 flex items-center gap-1">
                      <Mail size={14} />
                      {reservation.email}
                    </div>
                    {reservation.phoneNumber && (
                      <div className="text-sm text-[#b94c2a]/70 flex items-center gap-1">
                        <Phone size={14} />
                        {reservation.phoneNumber}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {reservation.flight && reservation.flight.mainImage && (
                        <img 
                          src={reservation.flight.mainImage} 
                          alt={reservation.flight.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div className="font-medium text-[#b94c2a] max-w-xs">
                        {reservation.flight ? reservation.flight.title : 'Flight not found'}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-[#b94c2a]">{formatDate(reservation.date)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-[#b94c2a]">
                      <Users size={16} />
                      {reservation.travelers}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 font-semibold text-[#b94c2a]">
                      <DollarSign size={16} />
                      {reservation.total}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(reservation.status)}`}>
                      {getStatusIcon(reservation.status)}
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewReservationDetails(reservation)}
                        className="p-2 bg-[#eec09a]/20 text-[#b94c2a] rounded-lg hover:bg-[#eec09a]/30 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      <select
                        value={reservation.status}
                        onChange={(e) => updateReservationStatus(reservation._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(reservation.status)} border-none outline-none cursor-pointer`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      
                      <button
                        onClick={() => deleteReservation(reservation._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete Reservation"
                        disabled={loading}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredReservations.length === 0 && !loading && (
          <div className="text-center py-16">
            <Calendar className="mx-auto text-[#b94c2a]/30 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-[#b94c2a]/50 mb-2">No reservations found</h3>
            <p className="text-[#b94c2a]/40">
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search or filter criteria' 
                : 'No reservations have been made yet'
              }
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <Loader className="animate-spin mx-auto text-[#b94c2a] mb-4" size={48} />
            <p className="text-[#b94c2a]">Loading reservations...</p>
          </div>
        )}
      </div>

      {/* Reservation Detail Modal */}
      {showDetailModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#eec09a]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#b94c2a]">Reservation Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-[#b94c2a]" size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#b94c2a] mb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Full Name</div>
                      <div className="text-[#b94c2a]">{selectedReservation.fullName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Email</div>
                      <div className="text-[#b94c2a]">{selectedReservation.email}</div>
                    </div>
                    {selectedReservation.phoneNumber && (
                      <div>
                        <div className="text-sm text-[#b94c2a]/60">Phone Number</div>
                        <div className="text-[#b94c2a]">{selectedReservation.phoneNumber}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Pick-up Location</div>
                      <div className="text-[#b94c2a] flex items-center gap-1">
                        <MapPin size={16} />
                        {selectedReservation.pickUpLocation}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#b94c2a] mb-2">Reservation Details</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Reservation Date</div>
                      <div className="text-[#b94c2a]">{formatDate(selectedReservation.date)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Number of Travelers</div>
                      <div className="text-[#b94c2a] flex items-center gap-1">
                        <Users size={16} />
                        {selectedReservation.travelers}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Total Amount</div>
                      <div className="text-[#b94c2a] flex items-center gap-1 font-semibold">
                        <DollarSign size={16} />
                        {selectedReservation.total}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[#b94c2a]/60">Status</div>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(selectedReservation.status)}`}>
                        {getStatusIcon(selectedReservation.status)}
                        {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#b94c2a] mb-2">Flight Information</h3>
                <div className="flex items-center gap-4 p-4 bg-[#eec09a]/10 rounded-xl">
                  {selectedReservation.flight && selectedReservation.flight.mainImage && (
                    <img 
                      src={selectedReservation.flight.mainImage} 
                      alt={selectedReservation.flight.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-[#b94c2a]">
                      {selectedReservation.flight ? selectedReservation.flight.title : 'Flight not found'}
                    </div>
                    <div className="text-sm text-[#b94c2a]/70 mt-1">
                      Reservation created on {formatDate(selectedReservation.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-[#eec09a]/30">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    updateReservationStatus(
                      selectedReservation._id, 
                      selectedReservation.status === 'confirmed' ? 'pending' : 'confirmed'
                    );
                    setShowDetailModal(false);
                  }}
                  className="flex-1 bg-[#b94c2a] text-white py-3 px-6 rounded-xl hover:bg-[#a03d22] transition-colors font-semibold"
                >
                  {selectedReservation.status === 'confirmed' ? 'Mark as Pending' : 'Confirm Reservation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;