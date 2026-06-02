import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Header({ currentPath, navigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Dịch vụ', path: '/dich-vu' },
    { name: 'Bảng giá', path: '/bang-gia' },
    { name: 'Dự án', path: '/du-an' },
    { name: 'Giải pháp', path: '/giai-phap' },
    { name: 'Đào tạo', path: '/dao-tao' },
    { name: 'Blog', path: '/blog' },
    { name: 'Liên hệ', path: '/lien-he' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-lg shadow-slate-100/20'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-[#0A2F8F] to-[#1E73FF] rounded-xl overflow-hidden shadow-md shadow-[#1E73FF]/20 group-hover:scale-105 transition-transform duration-300">
              {/* Custom SVG Tech Whale representation */}
              <svg
                viewBox="0 0 100 100"
                className="w-7 h-7 text-[#22C7F5] fill-current drop-shadow"
              >
                <path d="M10,65 C30,70 50,60 55,45 C58,35 68,25 80,22 C85,20 90,25 88,32 C85,42 75,55 60,65 C45,75 25,78 12,78 Z" />
                <path d="M55,45 C65,35 75,32 82,35 C88,38 85,45 78,50 Z" opacity="0.7" />
                <path d="M12,78 C8,75 5,68 8,60 C11,52 20,50 25,55 Z" opacity="0.6" />
                <circle cx="72" cy="35" r="4" fill="#020617" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#22C7F5]/10 to-transparent animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 flex items-center">
                Whale<span className="text-[#1E73FF]">Solutions.vn</span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-[#1E73FF] font-medium uppercase">
                Freelance Studio
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                   key={item.path}
                   onClick={() => handleNavClick(item.path)}
                   className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                     isActive
                       ? 'text-[#1E73FF] font-semibold'
                       : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                   }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#1E73FF] to-[#22C7F5] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Header */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('/nhan-bao-gia')}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#1E73FF] shadow-lg shadow-[#1E73FF]/25 hover:bg-blue-600 hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Nhận báo giá
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-slate-200 py-4 px-6 shadow-xl"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1E73FF]/10 text-[#1E73FF] font-semibold border-l-4 border-[#1E73FF]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('/nhan-bao-gia')}
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-[#1E73FF] to-[#22C7F5] shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                Nhận báo giá miễn phí
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
