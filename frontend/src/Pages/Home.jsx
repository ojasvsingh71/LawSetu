import { Link } from "react-router-dom";
import React, { useRef,} from "react";
import heroImage from "./assets/hero.jpeg";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Home = () => {
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float {
          animation: float 1.5s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .my-spin {
          animation: spin 1.2s linear infinite;
          display: inline-block;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25%); }
        }
        .my-bounce {
          animation: bounce 1s infinite;
          display: inline-block;
        }
        @keyframes swing {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        .swing {
          animation: swing 2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .pulse {
          animation: pulse 1.2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes waveTint {
          0%, 100% {
            color: #c7d2fe; /* soft light indigo */
          }
          50% {
            color: #a5b4fc;
          }
        }
        `}
      </style>
      

      <div className="bg-white text-gray-800">
        {/* Navbar */}
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
              <Link to="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-500 transition duration-300">
                Sign In
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
                <Link to="/login" className="block px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 text-center">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-50 to-white overflow-hidden">
          {/* Top SVG Wave */}
          <div className="absolute top-0 left-0 w-full z-0">
            <svg viewBox="0 0 1440 320" className="w-full h-40 text-indigo-100">
              <path fill="currentColor" fillOpacity="1" d="M0,64L60,85.3C120,107,240,149,360,149.3C480,149,600,107,720,106.7C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
            </svg>
          </div>
          {/* Content */}
          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-8 py-28 max-w-7xl mx-auto">
            {/* Text Column */}
            <div className="text-center md:text-left max-w-xl space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">Draft Legal<br />Documents <span className="text-indigo-600">Smarter</span><br />
              with{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600 animate-pulse">AI</span>
              </h1>
              <p className="text-lg text-gray-600">LawSetu helps you draft contracts, agreements & simplify legal work with AI.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500 transition-transform hover:scale-105">
                  Get Started
                </Link>
                <a href="#how-it-works" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-transform hover:scale-105">
                  Learn More
                </a>
              </div>
            </div>
            {/* Image Column */}
            <div className=" backdrop-blur-md bg-white/50 rounded-3xl shadow-2xl p-4 md:p-6 w-[22rem] md:w-[30rem]">
              <img src={heroImage} alt="AI Legal Assistant" className="rounded-2xl object-contain w-full h-auto"/>
            </div>
          </div>
          {/* Bottom SVG Wave */}
          <div className="absolute bottom-0 left-0 w-full z-0 rotate-180 ">
            <svg viewBox="0 0 1440 320" className="w-full h-40 animate-[waveTint_6s_ease-in-out_infinite]"
            style={{ color: "#c7d2fe" }}>
              <path fill="currentColor" fillOpacity="1" d="M0,64L60,85.3C120,107,240,149,360,149.3C480,149,600,107,720,106.7C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
            </svg>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-white via-indigo-50 to-indigo-100">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              How It Works
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-indigo-400 mx-auto rounded-full mb-14"></div>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-indigo-500/50 hover:-translate-y-3 transition transform">
                <div className="text-5xl mb-4">
                  <span className="my-bounce">📝</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-indigo-700 text-center">Select a Template</h3>
                <p className="text-gray-600">Choose from our library of NDAs, contracts, and more.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-indigo-500/50 hover:-translate-y-3 transition transform">
                <div className="text-5xl mb-4">
                  <span className="my-spin">🤖</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-indigo-700 text-center">Draft with AI</h3>
                <p className="text-gray-600">Let our AI auto-generate clauses tailored for you.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-indigo-500/50 hover:-translate-y-3 transition transform">
                <div className="text-5xl mb-4">
                  <span className="float">📄</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-indigo-700 text-center">Save or Export</h3>
                <p className="text-gray-600">Download as PDF or keep it saved in your dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
            Popular Templates
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-indigo-400 mx-auto rounded-full mb-14"></div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-3xl shadow-lg border-t-4 border-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-3 transition transform">
              <h3 className="text-2xl font-semibold mb-3 text-indigo-700 flex items-center gap-2">
                <span className="my-bounce">📝</span> NDA Agreement
              </h3>
              <p className="text-gray-600 mb-6">Protect your business relationships with solid agreements.</p>
              <Link to="/editor?template=nda" className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-2 px-6 rounded-full shadow hover:scale-105 hover:opacity-90 active:scale-95 active:opacity-80 transition">
                Create Now →
              </Link>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-lg border-t-4 border-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-3 transition transform">
              <h3 className="text-2xl font-semibold mb-3 text-indigo-700 flex items-center gap-2">
                <span className="float">📑</span> Employment Contract
              </h3>
              <p className="text-gray-600 mb-6">Set clear expectations with your employees easily.</p>
              <Link to="/editor?template=employment" className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-2 px-6 rounded-full shadow hover:scale-105 hover:opacity-90 active:scale-95 active:opacity-80 transition">
                Create Now →
              </Link>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-lg border-t-4 border-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-3 transition transform">
              <h3 className="text-2xl font-semibold mb-3 text-indigo-700 flex items-center gap-2">
                <span className="float">🏠</span> Lease Agreement
              </h3>
              <p className="text-gray-600 mb-6">Manage rental properties with professional documents.</p>
              <Link to="/editor?template=lease" className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-2 px-6 rounded-full shadow hover:scale-105 hover:opacity-90 active:scale-95 active:opacity-80 transition">
                Create Now →
              </Link>
            </div>
          </div>
        </section>

        {/* AI Highlight Section */}
        <section className="relative py-32 bg-indigo-600 overflow-hidden text-white text-center">
          <div className="absolute inset-0 bg-gradient-radial from-indigo-400/20 via-transparent to-transparent opacity-40"></div>
          <svg className="absolute top-0 left-0 w-80 opacity-20 animate-[float_2s_ease-in-out_infinite] blur-sm" fill="#818cf8" viewBox="0 0 200 200">
            <path d="M49.3,-58.6C63.7,-47.7,75.8,-31.2,78.2,-14.1C80.6,3,73.3,20.7,62,35.1C50.7,49.5,35.4,60.6,18.2,63.9C1,67.3,-17.9,62.8,-34,53.3C-50.1,43.8,-63.5,29.2,-69.1,11.8C-74.6,-5.6,-72.4,-26,-60.8,-38.8C-49.2,-51.6,-28.3,-56.8,-8.1,-54.9C12.1,-53,24.2,-44.1,49.3,-58.6Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-80 opacity-20 animate-[float_1.9s_ease-in-out_infinite] blur-sm" fill="#c7d2fe" viewBox="0 0 200 200">
            <path d="M44.8,-53.2C57.6,-42.3,66.4,-28.1,67.3,-13.7C68.1,0.7,61,15.4,51.3,27.8C41.6,40.2,29.2,50.3,13.1,56.6C-3,62.9,-22.8,65.5,-37.4,57.7C-52,49.9,-61.5,31.7,-65.1,13.6C-68.7,-4.4,-66.5,-22.5,-57.3,-35.1C-48.2,-47.7,-32.1,-54.9,-16.4,-59.1C-0.7,-63.2,14.6,-64.2,29.2,-58.7C43.8,-53.3,57.5,-41.1,44.8,-53.2Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-10 left-10 w-52 opacity-20 animate-[float_2.1s_ease-in-out_infinite] blur-sm" fill="#a5b4fc" viewBox="0 0 200 200">
            <path d="M40.8,-53.2C57.6,-42.3,66.4,-28.1,67.3,-13.7C68.1,0.7,61,15.4,51.3,27.8C41.6,40.2,29.2,50.3,13.1,56.6C-3,62.9,-22.8,65.5,-37.4,57.7C-52,49.9,-61.5,31.7,-65.1,13.6C-68.7,-4.4,-66.5,-22.5,-57.3,-35.1C-48.2,-47.7,-32.1,-54.9,-16.4,-59.1C-0.7,-63.2,14.6,-64.2,29.2,-58.7C43.8,-53.3,57.5,-41.1,40.8,-53.2Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-4 left-4 w-40 opacity-20 animate-[float_1.95s_ease-in-out_infinite] blur-sm" fill="#dbeafe" viewBox="0 0 200 200">
            <path d="M40.8,-53.2C57.6,-42.3,66.4,-28.1,67.3,-13.7C68.1,0.7,61,15.4,51.3,27.8C41.6,40.2,29.2,50.3,13.1,56.6C-3,62.9,-22.8,65.5,-37.4,57.7C-52,49.9,-61.5,31.7,-65.1,13.6C-68.7,-4.4,-66.5,-22.5,-57.3,-35.1C-48.2,-47.7,-32.1,-54.9,-16.4,-59.1C-0.7,-63.2,14.6,-64.2,29.2,-58.7C43.8,-53.3,57.5,-41.1,40.8,-53.2Z" transform="translate(100 100)" />
          </svg>
          <div className="absolute top-10 left-1/3 text-5xl swing">⚖️</div>
          <div className="absolute bottom-16 right-1/4 text-4xl my-spin">🤖</div>
          <div className="absolute top-32 right-1/5 text-6xl pulse">📜</div>
          <div className="absolute bottom-10 left-1/4 text-5xl wiggle">📚</div>
          <div className="absolute top-8 right-10 text-5xl float">🧑‍⚖️</div>
          <div className="relative max-w-3xl mx-auto space-y-8">
            <h2 className="leading-tight text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">AI-powered Contract Drafting</h2>
            <p className="text-lg max-w-xl mx-auto">
              Experience the future of legal work with our advanced AI. Draft NDAs, employment contracts, and more — in minutes, not hours.
            </p>
            <p className="text-md max-w-lg mx-auto text-indigo-100">
              Save time, reduce errors, and focus on what truly matters: growing your business.
            </p>
            <Link to="/editor" className="inline-block bg-gradient-to-r from-white to-indigo-100 text-indigo-600 px-10 py-4 rounded-full shadow transition transform hover:scale-105 hover:shadow-xl active:scale-95 active:opacity-80">
              Try AI Drafting
            </Link>
          </div>
        </section>

        {/*Testimonials*/}
        <section class="py-20 max-w-4xl mx-auto text-center px-6">
          <h2 class="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">What Users Say</h2>
          <div class="h-1 w-24 bg-gradient-to-r from-indigo-600 to-indigo-400 mx-auto rounded-full mb-10"></div>
          <blockquote class="text-2xl italic text-gray-700 relative">
            <span class="text-5xl absolute -top-10 left-1/2 transform -translate-x-1/2 text-indigo-400 animate-[float_1.5s_ease-in-out_infinite]">“</span>
            LawSetu's AI saved us countless hours drafting NDAs and contracts. A must-have for any startup.
          </blockquote>
          <p class="font-semibold text-gray-600 mt-6">— CEO, Startup Co.</p>
        </section>

        {/*Footer */}
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
                <a href="#" className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300">
                  <Github className="w-6 h-6" />
                </a>
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
};

export default Home;
