import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to store local submissions for high reliability and local verification
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data folder and file exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Retrieve submissions (useful for client demonstration or verification)
app.get('/api/submissions', (req, res) => {
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const submissions = JSON.parse(data);
    res.json({ success: true, submissions });
  } catch (error) {
    console.error('Error reading submissions:', error);
    res.status(500).json({ success: false, error: 'Cannot read submissions data' });
  }
});

// Clear submissions (for clean testing)
app.post('/api/submissions/clear', (req, res) => {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
    res.json({ success: true, message: 'Submissions cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Cannot clear submissions' });
  }
});

// Submit a contact request
app.post('/api/contact', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      businessName,
      requestType,
      serviceOfInterest,
      budget,
      timeline,
      message,
      pageSource
    } = req.body;

    // Direct simple validation
    if (!fullName || !phone || !email) {
      res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp đầy đủ Họ tên, Số điện thoại và Email.'
      });
      return;
    }

    const newSubmission = {
      id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName,
      phone,
      email,
      businessName: businessName || 'Cá nhân / Chưa có doanh nghiệp',
      requestType, // 'quote' | 'interest' | 'consult'
      serviceOfInterest,
      budget: budget || 'Chưa xác định',
      timeline: timeline || 'Chưa rõ',
      message: message || 'Không có ghi chú thêm',
      submittedAt: new Date().toISOString(),
      pageSource: pageSource || '/'
    };

    // Save locally
    const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const currentSubmissions = JSON.parse(fileContent);
    currentSubmissions.unshift(newSubmission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(currentSubmissions, null, 2), 'utf-8');

    // Attempt to send email via Resend if environment variables are configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL || 'insightads.vn@gmail.com';
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    let emailSent = false;
    let emailFeedback = '';

    if (resendApiKey) {
      try {
        const emailSubject = `[WhaleSolutions.vn] Form mới từ website - ${fullName}`;
        const emailHtml = `
          <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background-color: #020617; color: #ffffff; padding: 15px; border-radius: 6px 6px 0 0; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">WhaleSolutions.vn - Thông báo yêu cầu mới</h2>
              <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Hệ thống nhận diện yêu cầu tự động</p>
            </div>
            
            <div style="padding: 20px;">
              <h3 style="border-bottom: 2px solid #3b82f6; padding-bottom: 8px; margin-top: 0;">Thông tin chi tiết yêu cầu</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 40%;">Họ và tên:</td>
                  <td style="padding: 6px 0;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Số điện thoại:</td>
                  <td style="padding: 6px 0;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Tên doanh nghiệp:</td>
                  <td style="padding: 6px 0;">${businessName || 'Cá nhân / Chưa xác định'}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 8px; font-weight: bold;">Loại yêu cầu:</td>
                  <td style="padding: 8px; font-weight: ${requestType === 'interest' ? 'bold' : 'normal'}; color: ${requestType === 'interest' ? '#ef4444' : '#1e293b'}">
                    ${requestType === 'quote' ? 'Nhận báo giá dịch vụ đang triển khai' : requestType === 'interest' ? 'Đăng ký quan tâm dịch vụ sắp ra mắt' : 'Cần tư vấn chưa rõ dịch vụ'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Dịch vụ quan tâm:</td>
                  <td style="padding: 6px 0;">${serviceOfInterest}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Ngân sách dự kiến:</td>
                  <td style="padding: 6px 0;">${budget || 'Chưa xác định'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Thời gian triển khai:</td>
                  <td style="padding: 6px 0;">${timeline || 'Chưa rõ'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Nội dung cần tư vấn:</td>
                  <td style="padding: 6px 0; white-space: pre-wrap;">${message || 'Không có ghi chú thêm'}</td>
                </tr>
              </table>
              
              <div style="margin-top: 20px; padding: 12px; background-color: #f1f5f9; border-radius: 4px; font-size: 12px; color: #64748b;">
                <p style="margin: 0;"><b>Trang gửi form:</b> ${pageSource}</p>
                <p style="margin: 4px 0 0 0;"><b>Thời gian gửi:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (Giờ Việt Nam)</p>
              </div>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; text-align: center; color: #94a3b8;">
              <p>Email này được tạo tự động từ Website của WhaleSolutions.vn Freelance Studio.</p>
            </div>
          </div>
        `;

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: `WhaleSolutions.vn Website <${contactFromEmail}>`,
            to: [contactToEmail],
            subject: emailSubject,
            html: emailHtml
          })
        });

        if (response.ok) {
          emailSent = true;
          emailFeedback = 'Gửi email thành công qua Resend API.';
        } else {
          const errorData = await response.json();
          emailFeedback = `Resend API trả về lỗi: ${JSON.stringify(errorData)}`;
          console.error(emailFeedback);
        }
      } catch (err: any) {
        emailFeedback = `Không thể gửi email vì lỗi kết nối: ${err?.message || err}`;
        console.error(emailFeedback);
      }
    } else {
      emailFeedback = 'Chưa cấu hình API Key Resend. Biểu mẫu đã được lưu vào hệ thống dữ liệu nội bộ của studio.';
    }

    res.json({
      success: true,
      message: 'Gửi yêu cầu thành công!',
      data: newSubmission,
      emailSent,
      emailFeedback
    });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Có lỗi xảy ra trên máy chủ: ' + (error?.message || error)
    });
  }
});

// ----------------------------------------------------
// VITE OR STATIC SERVING MIDDLEWARE
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in Development mode.');
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    console.log('Serving static files from:', distPath);
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[WhaleSolutions.vn Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
