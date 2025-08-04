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
    <div className="min-h-screen bg-[#f8e6db] flex flex-col items-center pt-8">
      <div className="w-full max-w-2xl bg-[#f8e6db] rounded-xl shadow p-8 mx-auto">
        <h1
          className="text-3xl md:text-4xl font-extrabold text-center mb-4 cursor-pointer"
          onClick={handleContactClick}
        >
          Contact us
        </h1>
        <h2
          className="text-xl font-bold mb-2 cursor-pointer"
          onClick={handleContactClick}
        >
          Get in Touch With Us
        </h2>
        <p className="mb-6 text-black text-base">
          Planning your balloon adventure or just have a quick question?<br />
          we'll get back to you faster than a balloon lifts off at sunrise.
        </p>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold mb-2 text-lg text-center">Send a message</h3>
          <label className="block mb-2 font-semibold">The details of your request</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="write something......"
            className="w-full rounded-xl border border-gray-300 p-3 mb-6"
            rows={4}
          />
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">First name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Juliette"
                className="w-full rounded-xl border border-gray-300 p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Last name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Madow"
                className="w-full rounded-xl border border-gray-300 p-2"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Phone</label>
              <div className="flex items-center">
                <span className="inline-block mr-2">
                  <img src="/images/flag-morocco.png" alt="Morocco" className="inline w-6 h-6 rounded" />
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+212"
                  className="w-full rounded-xl border border-gray-300 p-2"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="JulietteMadow@gmail.com"
                className="w-full rounded-xl border border-gray-300 p-2"
                type="email"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#e17055] text-white font-bold py-3 rounded-xl text-lg mt-2"
          >
            Envoyer
          </button>
        </form>
        {/* Ajoute un gestionnaire sur tout texte ou bouton contenant "contact" */}
        {/* Exemple pour un bouton générique */}
        {/* <button onClick={handleContactClick}>Contact</button> */}
      </div>
    </div>
  );
};

export default Contact;
