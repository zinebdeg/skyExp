import React, { useState } from "react";
import "../../App.css";

const handleContactClick = () => {
  window.location.href = "/contact";
};

const Contact = () => {
  const [form, setForm] = useState({
    details: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Ajoute ici la logique d'envoi si besoin
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f0e7e0] to-[#ffe6d6] flex flex-col items-center pt-8">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mx-auto border border-[#f3e2d2]">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-2 cursor-pointer text-[#a43518] drop-shadow-lg tracking-tight"
          onClick={handleContactClick}
        >
          Contact us
        </h1>
        <h2
          className="text-2xl font-semibold mb-6 cursor-pointer text-center text-[#ff7e47]"
          onClick={handleContactClick}
        >
          Get in Touch With Us
        </h2>
        <p className="mb-8 text-gray-700 text-lg text-center">
          Planning your balloon adventure or just have a quick question?<br />
          <span className="text-[#a43518] font-semibold">We'll get back to you faster than a balloon lifts off at sunrise.</span>
        </p>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold mb-3 text-xl text-center text-[#a43518]">Send a message</h3>
          <label className="block mb-2 font-semibold text-[#a43518]">The details of your request</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Write something..."
            className="w-full rounded-2xl border border-[#ffd6b3] p-3 mb-6 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
            rows={4}
          />
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">First name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Juliette"
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">Last name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Madow"
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">Phone</label>
              <div className="flex items-center">
                <span className="inline-block mr-2">
                  <img src="/images/flag-morocco.png" alt="Morocco" className="inline w-6 h-6 rounded shadow" />
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+212"
                  className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="JulietteMadow@gmail.com"
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
                type="email"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff7e47] to-[#a43518] text-white font-bold py-3 rounded-2xl text-lg mt-2 shadow-lg hover:from-[#a43518] hover:to-[#ff7e47] transition"
          >
            Envoyer
          </button>
        </form>
        {/* Info Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-12 mb-8">
          {/* Address Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">📍</div>
            <div className="font-bold mb-1 text-[#a43518]">Address</div>
            <div className="text-center text-gray-700 text-base">
              Sidi Boughaba Droua N°1<br />Km 13, Route de Fès<br />Marrakech 40000
            </div>
          </div>
          {/* Contact Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">📞</div>
            <div className="font-bold mb-1 text-[#a43518]">Contact</div>
            <div className="text-center text-gray-700 text-base">
              +212 6 12 88 11 44<br />
              <span className="text-xs">contact@skyexperience-marrakech.com</span>
            </div>
          </div>
          {/* Office Hour Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">⏰</div>
            <div className="font-bold mb-1 text-[#a43518]">Office Hour</div>
            <div className="text-center text-gray-700 text-base">
              Monday - Saturday:<br />6:00 - 19:00
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-8">
          <h3 className="font-bold text-2xl mb-4 text-[#a43518] text-center">Frequently Asked Questions</h3>
          <ul className="list-disc pl-6 text-gray-800 text-base space-y-2">
            <li>How long does a hot-air balloon ride in Marrakech last?</li>
            <li>What altitude can we expect to fly at during a hot-air balloon ride in Marrakech?</li>
            <li>What's the best time of year for a hot-air balloon flight in Marrakech?</li>
            <li>Are there age restrictions for hot-air balloon rides in Marrakech?</li>
            <li>What should I wear for a hot-air balloon flight in Marrakech?</li>
            <li>Are there any weight restrictions for hot-air balloon flights in Marrakech?</li>
          </ul>
        </div>
        {/* Ajoute un gestionnaire sur tout texte ou bouton contenant "contact" */}
        {/* Exemple pour un bouton générique */}
        {/* <button onClick={handleContactClick}>Contact</button> */}
      </div>
    </div>
  );
};

export default Contact;
