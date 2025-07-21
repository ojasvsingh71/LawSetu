import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Logout } from "../components/Logout";

export default function Contact() {
  const menuRef = useRef(null);

  const toggleMenu = () => {
    const menu = menuRef.current;
    if (menu) {
      menu.classList.toggle("opacity-0");
      menu.classList.toggle("scale-95");
      menu.classList.toggle("pointer-events-none");
      menu.classList.toggle("opacity-100");
      menu.classList.toggle("scale-100");
      menu.classList.toggle("pointer-events-auto");
    }
  };

  return (
    <>
    <style>
      {`
      @keyframes fadeInUp {
        0% { opacity:0; transform: translateY(20px);}
        100% { opacity:1; transform: translateY(0);}
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
      }
      @keyframes pulse {
        0%,100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      .pulse {
        animation: pulse 1.2s ease-in-out infinite;
        display: inline-block;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    
      .floating-icon {
        position: absolute;
        font-size: 2rem;
        opacity: 1;
        animation: float 1.8s ease-in-out infinite;
        z-index: 1;
        pointer-events: none;
      }
    
      .icon-email {
        top: 7rem;
        left: 2rem;
        animation-delay: 0s;
      }
    
      .icon-location {
        top: 14rem;
        right: 2rem;
        animation-delay: 1s;
      }
    
      .icon-phone {
        top: 25rem;
        left: 2rem;
        animation-delay: 2s;
      }
    
      .icon-doc {
        top: 32rem;
        right: 2rem;
        animation-delay: 3s;
      }
      @keyframes phoneShake {
        0%, 100% { transform: rotate(0deg); }
        20% { transform: rotate(3deg); }
        40% { transform: rotate(-3deg); }
        60% { transform: rotate(2deg); }
        80% { transform: rotate(-2deg); }
      }
      
      .phone-shake {
        animation: phoneShake 0.6s ease-in-out infinite;
        transform-origin: center;
      }
      @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
      .wiggle {
        animation: wiggle 0.5s ease-in-out infinite;
        display: inline-block;
      }
      @keyframes dropPinBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      .address-icon {
        animation: dropPinBounce 1.4s ease-in-out infinite;
        display: inline-block;
      }
      `}
    </style>

    <div className="min-h-screen relative overflow-visible bg-gradient-to-br from-gray-50 via-white to-indigo-100">
      <div className="floating-icon icon-email">✉️</div>
      <div className="floating-icon icon-location">📍</div>
      <div className="floating-icon icon-phone">📞</div>
      <div className="floating-icon icon-doc">📝</div>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text">
            LawSetu
          </div>
          <div className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
            <Link to="/" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/editor" className="relative group">
              Templates
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="relative group">
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link onClick={Logout} className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-500 transition duration-300">
              Logout
            </Link>
          </div>
          <div className="md:hidden relative">
            <button onClick={toggleMenu} className="text-3xl text-indigo-600 focus:outline-none">☰</button>
            <div ref={menuRef} className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden opacity-0 scale-95 pointer-events-none transition-all duration-300 z-50">
              <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">
                Home
              </Link>
              <Link to="/editor" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">
                Templates
              </Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">
                Contact
              </Link>
              <Link onClick={Logout} className="block px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 text-center">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <section className="pt-20 pb-16 px-6 max-w-6xl mx-auto relative z-10 animate-fade-in-up">
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <h2 className="text-5xl font-bold text-center text-indigo-600 mb-4 relative">
          Contact Us
          <span className="block w-16 h-1 bg-indigo-400 rounded-full mx-auto mt-3"></span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about features,
          pricing, or anything else, our team is ready to answer all your questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <form className="space-y-6 bg-white/40 backdrop-blur-lg p-6 shadow-xl rounded-3xl border border-gray-200 hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out relative z-10 animate-fade-in-up">
            <span className="absolute -top-3 -left-3 w-6 h-6 bg-indigo-400 rounded-full animate-ping opacity-70"></span>
            <span className="absolute -bottom-4 -right-4 w-5 h-5 bg-violet-400 rounded-full animate-ping opacity-70"></span>
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Name</label>
              <input type="text" id="name" required placeholder="Your full name" className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"/>
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email</label>
              <input type="email" id="email" required placeholder="you@example.com" className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"/>
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Message</label>
              <textarea id="message" rows="4" required placeholder="Write your message here..." className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"></textarea>
            </div>
            <button type="submit" className="group w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:from-indigo-700 hover:to-violet-700 relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">✉️ Send Message
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-500 animate-pulse"></span>
            </button>
          </form>
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-2xl hover:scale-105 transition">
              <div className="text-indigo-600 contact-icon">
                <Mail className="w-6 h-6 wiggle" />
              </div>
              <div>
                <h4 className="text-md font-semibold mb-0.5">Email</h4>
                <p className="text-sm">support@lawsetu.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-2xl hover:scale-105 transition">
              <div className="text-indigo-600 contact-icon">
                <svg className="w-6 h-6 address-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-0.5">Address</h4>
                <p className="text-sm">123 Legal Avenue, New Delhi</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-2xl hover:scale-105 transition">
              <div className="text-indigo-600 contact-icon phone-shake">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.464 15.464 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1v3.5a1 1 0 01-1 1C9.61 21.01 2.99 14.39 2.99 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-0.5">Phone</h4>
                <p className="text-sm">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-indigo-600 text-white py-16 mt-12">
        {/* subtle glow under footer */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md"></div>
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & intro */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">LawSetu</h3>
            <p className="text-indigo-100 max-w-xs leading-relaxed">Your AI-powered legal assistant. Draft NDAs, employment contracts, and more — in minutes.</p>
          </div>
          {/* Quick links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links ✉️</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/editor" className="hover:text-white hover:underline transition duration-300">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Connect with us */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Connect With Us <span className="pulse">🚀</span></h4>
            <p className="text-indigo-100 text-sm">Let’s grow together and innovate legal tech.</p>
            <div className="flex space-x-6 text-2xl">
              <Link to="https://github.com/ojasvsingh71/LawSetu" className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300">
                <Github className="w-6 h-6" />
              </Link>
              <a href="#" className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="mailto:info@lawsetu.com" className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-xs text-indigo-100 mt-2">Made with <span className="pulse">❤️</span> by LawSetu team.</p>
          </div>
        </div>
        <div className="mt-12 border-t border-indigo-300/50 pt-6 text-center text-indigo-100 text-sm">
          © 2025 LawSetu. All rights reserved. 🔗
        </div>
      </footer>
    </div>
  </>
  );
}
