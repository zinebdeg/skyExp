import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  X, 
  Save,
  Upload,
  Search,
  Filter,
  User
} from 'lucide-react';

const AdminFlights = () => {
  // Sample data - in real app this would come from API
  const [flights, setFlights] = useState([
    {
      _id: '1',
      title: 'Romantic Sunset Flight over Atlas Mountains',
      overview: 'Experience breathtaking views of the Atlas Mountains during golden hour with your loved one.',
      mainImage: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400',
      images: [
        'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'
      ],
      price: 299,
      rating: 4.8,
      category: 'romantic offer',
      program: [
        { miniTitle: 'Pre-flight briefing', text: 'Safety introduction and route overview' },
        { miniTitle: 'Scenic flight', text: '45-minute flight over stunning landscapes' },
        { miniTitle: 'Champagne service', text: 'Complimentary champagne and snacks' }
      ],
      reviews: [
        {
          name: 'Sarah Johnson',
          avatar: '',
          rating: 5,
          comment: 'Absolutely magical experience! The views were incredible.',
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'VIP Desert Adventure Flight',
      overview: 'Luxury helicopter tour over the Sahara Desert with exclusive landing experience.',
      mainImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
      images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400'],
      price: 599,
      rating: 4.9,
      category: 'vip',
      program: [
        { miniTitle: 'VIP lounge access', text: 'Exclusive pre-flight lounge experience' },
        { miniTitle: 'Desert flight', text: 'Scenic flight over Sahara dunes' },
        { miniTitle: 'Desert landing', text: 'Private landing with traditional tea ceremony' }
      ],
      reviews: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    mainImage: '',
    images: [''],
    price: '',
    rating: 0,
    category: 'vip',
    program: [{ miniTitle: '', text: '' }]
  });

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    avatar: '',
    rating: 5,
    comment: ''
  });

  // Filter flights based on search and category
  const filteredFlights = flights.filter(flight => {
    const matchesSearch = flight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flight.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || flight.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      overview: '',
      mainImage: '',
      images: [''],
      price: '',
      rating: 0,
      category: 'vip',
      program: [{ miniTitle: '', text: '' }]
    });
  };

  // Reset review form
  const resetReviewForm = () => {
    setReviewForm({
      name: '',
      avatar: '',
      rating: 5,
      comment: ''
    });
  };

  // Open modal for different actions
  const openModal = (mode, flight = null) => {
    setModalMode(mode);
    setSelectedFlight(flight);
    
    if (mode === 'edit' && flight) {
      setFormData({
        title: flight.title,
        overview: flight.overview,
        mainImage: flight.mainImage,
        images: flight.images.length > 0 ? flight.images : [''],
        price: flight.price.toString(),
        rating: flight.rating,
        category: flight.category,
        program: flight.program.length > 0 ? flight.program : [{ miniTitle: '', text: '' }]
      });
    } else if (mode === 'create') {
      resetForm();
    }
    
    setShowModal(true);
  };

  // Open review modal
  const openReviewModal = (flight) => {
    setSelectedFlight(flight);
    resetReviewForm();
    setShowReviewModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
    resetForm();
  };

  // Close review modal
  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedFlight(null);
    resetReviewForm();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const flightData = {
      ...formData,
      price: parseFloat(formData.price),
      images: formData.images.filter(img => img.trim() !== ''),
      program: formData.program.filter(prog => prog.miniTitle && prog.text),
      reviews: modalMode === 'edit' ? selectedFlight.reviews : [],
      createdAt: modalMode === 'edit' ? selectedFlight.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (modalMode === 'create') {
      const newFlight = {
        ...flightData,
        _id: Date.now().toString()
      };
      setFlights([...flights, newFlight]);
    } else if (modalMode === 'edit') {
      setFlights(flights.map(flight => 
        flight._id === selectedFlight._id 
          ? { ...flight, ...flightData }
          : flight
      ));
    }

    closeModal();
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedFlight) return;
    
    const newReview = {
      ...reviewForm,
      createdAt: new Date().toISOString()
    };
    
    const updatedFlight = {
      ...selectedFlight,
      reviews: [...selectedFlight.reviews, newReview],
      // Update overall rating (simple average)
      rating: selectedFlight.reviews.length > 0 
        ? (selectedFlight.rating * selectedFlight.reviews.length + parseFloat(reviewForm.rating)) / (selectedFlight.reviews.length + 1)
        : parseFloat(reviewForm.rating)
    };
    
    setFlights(flights.map(flight => 
      flight._id === selectedFlight._id ? updatedFlight : flight
    ));
    
    closeReviewModal();
  };

  // Delete flight
  const deleteFlight = (flightId) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      setFlights(flights.filter(flight => flight._id !== flightId));
    }
  };

  // Add program item
  const addProgramItem = () => {
    setFormData({
      ...formData,
      program: [...formData.program, { miniTitle: '', text: '' }]
    });
  };

  // Remove program item
  const removeProgramItem = (index) => {
    setFormData({
      ...formData,
      program: formData.program.filter((_, i) => i !== index)
    });
  };

  // Update program item
  const updateProgramItem = (index, field, value) => {
    const newProgram = [...formData.program];
    newProgram[index][field] = value;
    setFormData({ ...formData, program: newProgram });
  };

  // Add image field
  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  // Remove image field
  const removeImageField = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  // Update image field
  const updateImageField = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#b94c2a] rounded-2xl">
            <Plane className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#b94c2a]">Flight Management</h1>
            <p className="text-[#b94c2a]/70 text-lg">Manage your flight experiences and tours</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
              <input
                type="text"
                placeholder="Search flights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="vip">VIP</option>
                <option value="romantic offer">Romantic Offer</option>
                <option value="most reserved">Most Reserved</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => openModal('create')}
            className="bg-[#b94c2a] text-white px-6 py-3 rounded-xl hover:bg-[#a03d22] transition-colors flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Add New Flight
          </button>
        </div>
      </div>

      {/* Flights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlights.map(flight => (
          <div key={flight._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#eec09a]/30 hover:shadow-xl transition-shadow">
            <div className="relative">
              <img 
                src={flight.mainImage} 
                alt={flight.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#b94c2a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {flight.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#b94c2a] mb-2 line-clamp-2">{flight.title}</h3>
              <p className="text-[#b94c2a]/70 mb-4 line-clamp-3">{flight.overview}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-[#b94c2a] font-semibold">{flight.rating.toFixed(1)}</span>
                </div>
                <div className="text-2xl font-bold text-[#b94c2a]">
                  ${flight.price}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModal('view', flight)}
                  className="flex-1 bg-[#eec09a]/20 text-[#b94c2a] py-2 px-4 rounded-lg hover:bg-[#eec09a]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => openModal('edit', flight)}
                  className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => deleteFlight(flight._id)}
                  className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              {/* Add Review Button */}
              <button
                onClick={() => openReviewModal(flight)}
                className="w-full mt-3 bg-green-100 text-green-600 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredFlights.length === 0 && (
        <div className="text-center py-16">
          <Plane className="mx-auto text-[#b94c2a]/30 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-[#b94c2a]/50 mb-2">No flights found</h3>
          <p className="text-[#b94c2a]/40">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Start by adding your first flight experience'
            }
          </p>
        </div>
      )}

      {/* Flight Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#eec09a]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#b94c2a]">
                {modalMode === 'create' ? 'Add New Flight' : 
                 modalMode === 'edit' ? 'Edit Flight' : 'Flight Details'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-[#b94c2a]" size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalMode === 'view' ? (
                // View Mode
                <div className="space-y-6">
                  <img 
                    src={selectedFlight.mainImage} 
                    alt={selectedFlight.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  
                  <div>
                    <h3 className="text-2xl font-bold text-[#b94c2a] mb-2">{selectedFlight.title}</h3>
                    <p className="text-[#b94c2a]/70 mb-4">{selectedFlight.overview}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Price</div>
                        <div className="text-2xl font-bold text-[#b94c2a]">${selectedFlight.price}</div>
                      </div>
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Rating</div>
                        <div className="text-2xl font-bold text-[#b94c2a] flex items-center gap-1">
                          <Star className="text-yellow-500 fill-current" size={20} />
                          {selectedFlight.rating.toFixed(1)}
                        </div>
                      </div>
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Category</div>
                        <div className="text-lg font-semibold text-[#b94c2a] capitalize">{selectedFlight.category}</div>
                      </div>
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Reviews</div>
                        <div className="text-2xl font-bold text-[#b94c2a]">{selectedFlight.reviews.length}</div>
                      </div>
                    </div>
                  </div>

                  {/* Program */}
                  <div>
                    <h4 className="text-xl font-bold text-[#b94c2a] mb-4">Flight Program</h4>
                    <div className="space-y-3">
                      {selectedFlight.program.map((item, index) => (
                        <div key={index} className="bg-[#eec09a]/10 p-4 rounded-xl">
                          <h5 className="font-semibold text-[#b94c2a] mb-2">{item.miniTitle}</h5>
                          <p className="text-[#b94c2a]/70">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  {selectedFlight.reviews.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-[#b94c2a] mb-4">Reviews</h4>
                      <div className="space-y-4">
                        {selectedFlight.reviews.map((review, index) => (
                          <div key={index} className="bg-[#eec09a]/10 p-4 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                              {review.avatar ? (
                                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                              ) : (
                                <div className="w-10 h-10 bg-[#b94c2a] rounded-full flex items-center justify-center text-white font-bold">
                                  {review.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-[#b94c2a]">{review.name}</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-[#b94c2a]/70">{review.comment}</p>
                            <div className="text-sm text-[#b94c2a]/50 mt-2">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Create/Edit Mode
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                        placeholder="Enter flight title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                      >
                        <option value="vip">VIP</option>
                        <option value="romantic offer">Romantic Offer</option>
                        <option value="most reserved">Most Reserved</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#b94c2a] font-semibold mb-2">Overview</label>
                    <textarea
                      required
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 h-24"
                      placeholder="Enter flight overview"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Price ($)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  {/* Main Image */}
                  <div>
                    <label className="block text-[#b94c2a] font-semibold mb-2">Main Image URL</label>
                    <input
                      type="url"
                      required
                      value={formData.mainImage}
                      onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                      className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Additional Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[#b94c2a] font-semibold">Additional Images</label>
                      <button
                        type="button"
                        onClick={addImageField}
                        className="text-[#b94c2a] hover:bg-[#eec09a]/20 p-2 rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => updateImageField(index, e.target.value)}
                            className="flex-1 p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                            placeholder="https://example.com/image.jpg"
                          />
                          {formData.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="p-3 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[#b94c2a] font-semibold">Flight Program</label>
                      <button
                        type="button"
                        onClick={addProgramItem}
                        className="text-[#b94c2a] hover:bg-[#eec09a]/20 p-2 rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.program.map((item, index) => (
                        <div key={index} className="bg-[#eec09a]/10 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#b94c2a] font-medium">Program Item {index + 1}</span>
                            {formData.program.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeProgramItem(index)}
                                className="text-red-500 hover:bg-red-100 p-1 rounded"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={item.miniTitle}
                              onChange={(e) => updateProgramItem(index, 'miniTitle', e.target.value)}
                              className="p-3 border border-[#eec09a]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                              placeholder="Mini title"
                            />
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) => updateProgramItem(index, 'text', e.target.value)}
                              className="p-3 border border-[#eec09a]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                              placeholder="Description"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-6 border-t border-[#eec09a]/30">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 text-gray-600 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#b94c2a] text-white py-3 px-6 rounded-xl hover:bg-[#a03d22] transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      <Save size={20} />
                      {modalMode === 'create' ? 'Create Flight' : 'Update Flight'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedFlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#eec09a]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#b94c2a]">
                Add Review for {selectedFlight.title}
              </h2>
              <button
                onClick={closeReviewModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-[#b94c2a]" size={24} />
              </button>
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Avatar URL (Optional)</label>
                <input
                  type="url"
                  value={reviewForm.avatar}
                  onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                  className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1"
                    >
                      <Star
                        size={28}
                        className={star <= reviewForm.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                  <span className="text-lg font-semibold text-[#b94c2a] ml-2">
                    {reviewForm.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Comment</label>
                <textarea
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 h-32"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#eec09a]/30">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#b94c2a] text-white py-3 px-6 rounded-xl hover:bg-[#a03d22] transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Save size={20} />
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFlights;