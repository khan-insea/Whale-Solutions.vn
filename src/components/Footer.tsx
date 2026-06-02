import React from 'react';
import { Mail, Phone, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const menuLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Dịch vụ', path: '/dich-vu' },
    { name: 'Bảng giá', path: '/bang-gia' },
    { name: 'Dự án', path: '/du-an' },
    { name: 'Giải pháp số', path: '/giai-phap' },
    { name: 'Đào tạo', path: '/dao-tao' },
    { name: 'Kiến thức / Blog', path: '/blog' },
    { name: 'Liên hệ', path: '/lien-he' }
  ];

  return (
    <footer className="bg-[#0B132B] border-t border-slate-800 pt-16 pb-8 text-slate-350">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Intro */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-[#0A2F8F] to-[#1E73FF] rounded-lg">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#22C7F5] fill-current">
                  <path d="M10,65 C30,70 50,60 55,45 C58,35 68,25 80,22 C85,20 90,25 88,32 C85,42 75,55 60,65 C45,75 25,78 12,78 Z" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Whale<span className="text-[#22C7F5]">Solutions.vn</span>
              </span>
            </div>
            
            <p className="text-[#22C7F5] text-sm font-semibold leading-relaxed">
              “Website, Marketing & AI tinh gọn cho doanh nghiệp nhỏ.”
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              WhaleSolutions.vn là freelance studio đồng hành cùng hộ kinh doanh, startup, và SME tối ưu quy trình tìm kiếm khách hàng bằng công nghệ, tự động hóa và nội dung chất lượng cao.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" />
                Đang nhận yêu cầu dịch vụ
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Danh mục trang
            </h3>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="text-slate-400 hover:text-[#22C7F5] text-sm flex items-center group transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#22C7F5] mr-1" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Liên hệ trực tiếp
            </h3>
            <p className="text-slate-400 text-xs text-left">
              Mọi thắc mắc kỹ thuật hoặc nhu cầu xây dựng khẩn cấp, vui lòng gọi điện thoại hoặc trò chuyện trực tiếp qua Zalo của Solo Founder:
            </p>
            <div className="space-y-3">
              <a
                href="tel:0969969969"
                className="flex items-center text-sm text-slate-300 hover:text-[#22C7F5] transition-colors"
              >
                <Phone size={16} className="text-[#22C7F5] mr-2.5 flex-shrink-0" />
                <span>Hotline: 096.996.9969</span>
              </a>
              <a
                href="mailto:insightads.vn@gmail.com"
                className="flex items-center text-sm text-slate-300 hover:text-[#22C7F5] transition-colors"
              >
                <Mail size={16} className="text-[#22C7F5] mr-2.5 flex-shrink-0" />
                <span className="break-all font-mono text-xs">insightads.vn@gmail.com</span>
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://zalo.me/0969969969"
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-[#22C7F5]/10 hover:bg-[#22C7F5]/20 text-[#22C7F5] transition-colors max-w-max"
              >
                Liên hệ Zalo tư vấn
                <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Column 4: Lộ trình phát triển */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Lộ trình dịch vụ
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              “Giải pháp Marketing – Công nghệ – Truyền thông – Sự kiện đang được phát triển theo từng giai đoạn.”
            </p>
            <div className="space-y-2 border-l border-slate-700 pl-3 pt-1">
              <div className="text-xs">
                <span className="text-[#22C7F5] font-semibold">Giai đoạn 1 (Sẵn sàng):</span>
                <span className="text-slate-400"> Web, Landing Page, Ads, Content, Setup Tracking kỹ thuật.</span>
              </div>
              <div className="text-xs">
                <span className="text-slate-500 font-semibold">Giai đoạn 2 (Sắp tới):</span>
                <span className="text-slate-500"> CRM, App doanh nghiệp nhỏ, Trợ lý Chatbot AI, In ấn thi công, Teabreak & Khai trương.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} WhaleSolutions.vn Freelance Studio. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-slate-500">
            <span>Mã bảo vệ SSL</span>
            <span>&bull;</span>
            <span>Bảo mật dữ liệu khách hàng</span>
            <span>&bull;</span>
            <button onClick={() => navigate('/admin')} className="hover:text-white transition-colors underline bg-transparent border-0 cursor-pointer p-0 text-xs text-slate-500">
              Quản trị đơn hàng
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
