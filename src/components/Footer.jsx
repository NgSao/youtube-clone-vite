
import { useTheme } from "../context/ThemeContext"
import "../css/Footer.css"

const Footer = () => {
    const { isDarkMode } = useTheme()
    const currentYear = new Date().getFullYear()

    return (
        <footer className={`youtube-footer ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <svg viewBox="0 0 90 20" width="90" height="20">
                                <path
                                    d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z"
                                    fill="#FF0000"
                                />
                                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                            </svg>
                            <span className="footer-logo-text">YouTube Clone</span>
                        </div>
                        <p className="footer-description">
                            Ứng dụng xem video trực tuyến được xây dựng với React và YouTube API
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Liên kết</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Trang chủ</a></li>
                            <li><a href="#" className="footer-link">Thịnh hành</a></li>
                            <li><a href="#" className="footer-link">Đăng ký</a></li>
                            <li><a href="#" className="footer-link">Thư viện</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Hỗ trợ</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Trung tâm trợ giúp</a></li>
                            <li><a href="#" className="footer-link">Báo cáo lỗi</a></li>
                            <li><a href="#" className="footer-link">Phản hồi</a></li>
                            <li><a href="#" className="footer-link">Liên hệ</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Thông tin</h4>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Về chúng tôi</a></li>
                            <li><a href="#" className="footer-link">Chính sách bảo mật</a></li>
                            <li><a href="#" className="footer-link">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="footer-link">Hướng dẫn cộng đồng</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>© {currentYear} Bản quyền thuộc về <strong>SaoNguyen</strong></p>
                        <p className="footer-email">
                            <svg className="email-icon" viewBox="0 0 24 24" width="16" height="16">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                            </svg>
                            <a href="mailto:snd@gmail.com" className="footer-email-link">nguyensaovn2019@gmail.com</a>
                        </p>
                    </div>

                    <div className="footer-social">
                        <p className="footer-made-with">
                            Được xây dựng với ❤️ bằng React & YouTube API
                        </p>
                        <div className="footer-tech-stack">
                            <span className="tech-badge">React</span>
                            <span className="tech-badge">YouTube API</span>
                            <span className="tech-badge">CSS3</span>
                            <span className="tech-badge">JavaScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
