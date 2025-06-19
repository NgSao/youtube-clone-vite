"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { youtubeAPI } from "../services/youtubeAPI"
import { useTheme } from "../context/ThemeContext"
import ThemeToggle from "./ThemeToggle"
import "../css/VideoInfo.css"

const VideoInfo = ({ video }) => {
    const [showFullDescription, setShowFullDescription] = useState(false)
    const { isDarkMode } = useTheme()

    if (!video) return null

    const { snippet, statistics } = video
    const viewCount = youtubeAPI.formatViewCount(statistics?.viewCount || 0)
    const likeCount = youtubeAPI.formatViewCount(statistics?.likeCount || 0)
    const publishedAt = youtubeAPI.formatTimeAgo(snippet.publishedAt)

    return (
        <div className={`video-info ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div className="video-header">
                <h1 className="video-title">{snippet.title}</h1>
                <ThemeToggle />
            </div>

            <div className="video-meta-row">
                <div className="video-stats">
                    <span className="view-count">{viewCount} lượt xem</span>
                    <span className="separator">•</span>
                    <span className="publish-date">{publishedAt}</span>
                </div>

                <div className="video-actions">
                    <button className="action-btn like-btn">
                        <svg className="action-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" />
                        </svg>
                        <span className="action-text">{likeCount}</span>
                    </button>

                    <button className="action-btn dislike-btn">
                        <svg className="action-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z" />
                        </svg>
                    </button>

                    <button className="action-btn share-btn">
                        <svg className="action-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,2v6C8,9,4,14,4,20c2.5-3.5,6-5.1,10-5.1V22l8-10L14,2L14,2z" />
                        </svg>
                        <span className="action-text">Chia sẻ</span>
                    </button>

                    <button className="action-btn download-btn">
                        <svg className="action-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.7-.7.7 5 5 5-5z" />
                        </svg>
                        <span className="action-text">Tải xuống</span>
                    </button>

                    <button className="action-btn save-btn">
                        <svg className="action-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z" />
                        </svg>
                        <span className="action-text">Lưu</span>
                    </button>

                    <button className="action-btn more-btn">
                        <svg className="action-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="channel-section">
                <div className="channel-info">
                    <div className="channel-avatar">
                        <div className="avatar-placeholder">{snippet.channelTitle.charAt(0)}</div>
                    </div>
                    <div className="channel-details">
                        <div className="channel-name-row">
                            <h3 className="channel-name">{snippet.channelTitle}</h3>
                            <svg className="verified-badge" viewBox="0 0 24 24" width="14" height="14">
                                <path
                                    d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2ZM21,9V7L19,6V4A2,2 0 0,0 17,2H15V4L13,3L11,4V2H9A2,2 0 0,0 7,4V6L5,7V9L7,10V12L5,13V15L7,16V18A2,2 0 0,0 9,20H11V18L13,19L15,18V20H17A2,2 0 0,0 19,18V16L21,15V13L19,12V10L21,9ZM12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <p className="subscriber-count">8.13 Tr người đăng ký</p>
                    </div>
                </div>
                <button className="subscribe-btn subscribed">
                    <svg className="bell-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path
                            d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.92 6,11V16L4,18V19H20V18L18,16Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span>Đã đăng ký</span>
                </button>
            </div>

            <div className="video-description">
                <div className="description-preview">
                    <div className="description-meta">
                        <span className="hashtags">#saonguyen #snd #youtube #video</span>
                    </div>
                    <p className={`description-text ${showFullDescription ? "expanded" : ""}`}>
                        {snippet.description || "Chúc các bạn xem stream vui vẻ. ...thêm"}
                    </p>
                    {snippet.description && snippet.description.length > 100 && (
                        <button className="show-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                            {showFullDescription ? "Ẩn bớt" : "...thêm"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

VideoInfo.propTypes = {
    video: PropTypes.object.isRequired,
}

export default VideoInfo
