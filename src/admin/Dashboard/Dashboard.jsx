import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Plane, 
  Calendar, 
  Users, 
  TrendingUp, 
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Award,
  ChevronRight,
  Activity,
  Plus,
  BarChart3,
  Settings,
  UserCheck
} from 'lucide-react';

const Dashboard = () => {
  const [animationClass, setAnimationClass] = useState('');
  const [stats, setStats] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);
  const [topFlights, setTopFlights] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    setAnimationClass('animate-fade-in');
    fetchDashboardData();
  }, []);

  // Fetch data from your API endpoints
  const fetchDashboardData = async () => {
    try {
      // In a real app, you would fetch these from your backend API
      const reservationsResponse = await fetch('/api/reservations?limit=3&sort=-createdAt');
      const flightsResponse = await fetch('/api/flights?limit=3&sort=-rating');
      const statsResponse = await fetch('/api/dashboard/stats');
      
      const reservationsData = await reservationsResponse.json();
      const flightsData = await flightsResponse.json();
      const statsData = await statsResponse.json();
      
      setRecentReservations(reservationsData.reservations || []);
      setTopFlights(flightsData.flights || []);
      setStats(statsData.stats || []);
      setCategories(statsData.categories || {});
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data if API calls fail
      loadMockData();
    }
  };

  // Mock data based on your models (fallback)
  const loadMockData = () => {
    setStats([
      { 
        title: 'Total Revenue', 
        value: '$87,450', 
        icon: DollarSign, 
        color: 'bg-gradient-to-br from-green-500 to-green-600', 
        change: '+18%',
        description: 'From 156 reservations'
      },
      { 
        title: 'Active Flights', 
        value: '42', 
        icon: Plane, 
        color: 'bg-gradient-to-br from-blue-500 to-blue-600', 
        change: '+12%',
        description: 'Across all categories'
      },
      { 
        title: 'Total Reservations', 
        value: '1,847', 
        icon: Calendar, 
        color: 'bg-gradient-to-br from-purple-500 to-purple-600', 
        change: '+25%',
        description: 'This month'
      },
      { 
        title: 'Happy Travelers', 
        value: '3,256', 
        icon: Users, 
        color: 'bg-gradient-to-br from-orange-500 to-orange-600', 
        change: '+31%',
        description: 'Total customers served'
      }
    ]);

    setRecentReservations([
      {
        _id: '1',
        fullName: 'Sarah Johnson',
        date: '2025-08-30',
        travelers: 2,
        total: 1250,
        pickUpLocation: 'City Center',
        flight: {
          _id: 'f1',
          title: 'Romantic Sunset Flight',
          category: 'romantic offer'
        },
        status: 'confirmed'
      },
      {
        _id: '2',
        fullName: 'Michael Chen',
        date: '2025-09-02',
        travelers: 4,
        total: 2800,
        pickUpLocation: 'Airport',
        flight: {
          _id: 'f2',
          title: 'VIP City Tour',
          category: 'vip'
        },
        status: 'pending'
      },
      {
        _id: '3',
        fullName: 'Emma Davis',
        date: '2025-09-05',
        travelers: 1,
        total: 950,
        pickUpLocation: 'Beach Resort',
        flight: {
          _id: 'f3',
          title: 'Adventure Explorer',
          category: 'most reserved'
        },
        status: 'confirmed'
      }
    ]);

    setTopFlights([
      {
        _id: 'f1',
        title: 'Romantic Sunset Flight',
        category: 'romantic offer',
        rating: 4.9,
        price: 450,
        reviews: Array(89).fill(), // Mock 89 reviews
      },
      {
        _id: 'f2',
        title: 'VIP City Explorer',
        category: 'vip',
        rating: 4.8,
        price: 650,
        reviews: Array(67).fill(), // Mock 67 reviews
      },
      {
        _id: 'f3',
        title: 'Adventure Seeker',
        category: 'most reserved',
        rating: 4.7,
        price: 350,
        reviews: Array(156).fill(), // Mock 156 reviews
      }
    ]);

    setCategories({
      vip: 18,
      'romantic offer': 12,
      'most reserved': 12
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vip': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'romantic offer': return <Heart className="w-4 h-4 text-pink-600" />;
      case 'most reserved': return <TrendingUp className="w-4 h-4 text-green-600" />;
      default: return <Plane className="w-4 h-4 text-blue-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'romantic offer': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'most reserved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Calculate revenue for a flight based on price and number of reservations
  const calculateFlightRevenue = (flight) => {
    if (!flight.reviews) return '$0';
    const revenue = flight.reviews.length * flight.price;
    return `$${revenue.toLocaleString()}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6 ${animationClass}`}>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r from-[#b94c2a] to-[#d4934a] bg-clip-text text-transparent mb-4">
            Flight Dashboard
          </h1>
          <p className="text-[#b94c2a]/70 text-lg">Manage your flight booking business with ease</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50 hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-500 hover:bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  <TrendingUp size={14} className="mr-1" />
                  <span className="font-semibold text-xs">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-[#b94c2a]/60 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-[#b94c2a] mb-1">{stat.value}</p>
              <p className="text-xs text-[#b94c2a]/50">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Reservations */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#b94c2a] flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Recent Reservations
              </h3>
              <button className="text-[#b94c2a] hover:bg-[#eec09a]/20 px-3 py-1 rounded-lg transition-colors">
                View All <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation._id} className="bg-gradient-to-r from-white to-[#eec09a]/5 border border-[#eec09a]/30 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-[#eec09a]/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#b94c2a] to-[#d4934a] rounded-full flex items-center justify-center text-white font-bold">
                        {reservation.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#b94c2a]">{reservation.fullName}</h4>
                        <p className="text-sm text-[#b94c2a]/60">{reservation.flight?.title}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(reservation.flight?.category)}`}>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(reservation.flight?.category)}
                        {reservation.flight?.category}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <Clock className="w-4 h-4" />
                      {new Date(reservation.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <Users className="w-4 h-4" />
                      {reservation.travelers} travelers
                    </div>
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <DollarSign className="w-4 h-4" />
                      ${reservation.total}
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Flights */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-[#b94c2a] mb-6 flex items-center gap-2">
              <Plane className="w-6 h-6" />
              Top Flights
            </h3>
            <div className="space-y-4">
              {topFlights.map((flight) => (
                <div key={flight._id} className="bg-gradient-to-r from-[#eec09a]/10 to-white border border-[#eec09a]/30 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#b94c2a] text-sm">{flight.title}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-medium text-[#b94c2a]">{flight.rating}</span>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getCategoryColor(flight.category)}`}>
                    {getCategoryIcon(flight.category)}
                    {flight.category}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#b94c2a]/70">
                    <div>{flight.reviews?.length || 0} bookings</div>
                    <div className="font-semibold text-green-600">{calculateFlightRevenue(flight)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-[#b94c2a] mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { action: 'Add Flight', icon: Plus, color: 'from-blue-500 to-blue-600' },
                { action: 'View Reports', icon: BarChart3, color: 'from-green-500 to-green-600' },
                { action: 'Manage Users', icon: UserCheck, color: 'from-purple-500 to-purple-600' },
                { action: 'Settings', icon: Settings, color: 'from-orange-500 to-orange-600' }
              ].map((item, index) => (
                <button key={index} className={`group bg-gradient-to-br ${item.color} hover:shadow-xl text-white font-semibold py-6 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}>
                  <item.icon className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <div className="text-sm">{item.action}</div>
                </button>
              ))}
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-[#b94c2a] mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              System Overview
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[#b94c2a]/70">Flight Categories</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#b94c2a]/70">VIP Flights</span>
                  <span className="font-semibold text-[#b94c2a]">{categories.vip || 0}</span>
                </div>
                <div className="w-full bg-[#eec09a]/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full" 
                    style={{ width: `${((categories.vip || 0) / Object.values(categories).reduce((a, b) => a + b, 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#b94c2a]/70">Romantic Offers</span>
                  <span className="font-semibold text-[#b94c2a]">{categories['romantic offer'] || 0}</span>
                </div>
                <div className="w-full bg-[#eec09a]/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full" 
                    style={{ width: `${((categories['romantic offer'] || 0) / Object.values(categories).reduce((a, b) => a + b, 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#b94c2a]/70">Most Reserved</span>
                  <span className="font-semibold text-[#b94c2a]">{categories['most reserved'] || 0}</span>
                </div>
                <div className="w-full bg-[#eec09a]/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" 
                    style={{ width: `${((categories['most reserved'] || 0) / Object.values(categories).reduce((a, b) => a + b, 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;