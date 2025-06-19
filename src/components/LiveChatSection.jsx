
import { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { youtubeAPI } from "../services/youtubeAPI"
import "../css/LiveChatSection.css"

const LiveChatSection = ({ liveChatId, isLive }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPageToken, setNextPageToken] = useState(null)
    const [pollingInterval, setPollingInterval] = useState(5000)
    const messagesEndRef = useRef(null)
    const intervalRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const fetchMessages = async (pageToken = null) => {
        if (!liveChatId) return

        try {
            const result = await youtubeAPI.getLiveChatMessages(liveChatId, pageToken)

            if (pageToken) {
                // Append new messages
                setMessages((prev) => [...prev, ...result.messages])
            } else {
                // Initial load
                setMessages(result.messages)
            }

            setNextPageToken(result.nextPageToken)
            setPollingInterval(result.pollingIntervalMillis)
            setLoading(false)

            // Scroll to bottom after new messages
            setTimeout(scrollToBottom, 100)
        } catch (error) {
            console.error("Error fetching live chat:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!liveChatId || !isLive) {
            setLoading(false)
            return
        }

        // Initial fetch
        fetchMessages()

        // Set up polling for new messages
        intervalRef.current = setInterval(() => {
            fetchMessages(nextPageToken)
        }, pollingInterval)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [liveChatId, isLive])

    useEffect(() => {
        // Update polling interval when it changes
        if (intervalRef.current && isLive) {
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(() => {
                fetchMessages(nextPageToken)
            }, pollingInterval)
        }
    }, [pollingInterval, nextPageToken, isLive])

    if (!isLive) {
        return (
            <div className="live-chat-section">
                <div className="chat-header">
                    <h3>Chat trực tiếp</h3>
                </div>
                <div className="chat-disabled">
                    <p>Chat chỉ khả dụng khi video đang phát trực tiếp</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="live-chat-section">
                <div className="chat-header">
                    <h3>Chat trực tiếp</h3>
                </div>
                <div className="chat-loading">
                    <div className="loading-spinner"></div>
                    <p>Đang tải chat...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="live-chat-section">
            <div className="chat-header">
                <h3>Chat trực tiếp</h3>
                <div className="chat-status">
                    <span className="live-dot"></span>
                    {messages.length} tin nhắn
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((message) => {
                    const snippet = message.snippet
                    const author = message.authorDetails

                    return (
                        <div key={message.id} className="chat-message">
                            <div className="message-avatar">
                                <img
                                    src={author.profileImageUrl || "/placeholder.svg"}
                                    alt={author.displayName}
                                    className="avatar-img"
                                />
                            </div>

                            <div className="message-content">
                                <div className="message-header">
                                    <span
                                        className="author-name"
                                        style={{ color: author.displayName === snippet.authorChannelId ? "#ff0000" : "#0f0f0f" }}
                                    >
                                        {author.displayName}
                                    </span>
                                    {author.isChatOwner && <span className="owner-badge">Chủ kênh</span>}
                                    {author.isChatModerator && <span className="mod-badge">Mod</span>}
                                    {author.isChatSponsor && <span className="sponsor-badge">Thành viên</span>}
                                </div>

                                <div className="message-text">{snippet.displayMessage}</div>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-section">
                <div className="chat-input-container">
                    <input type="text" placeholder="Nói gì đó..." className="chat-input" disabled />
                    <button className="send-btn" disabled>
                        Gửi
                    </button>
                </div>
                <p className="chat-notice">Đăng nhập để tham gia chat trực tiếp</p>
            </div>
        </div>
    )
}

LiveChatSection.propTypes = {
    liveChatId: PropTypes.string,
    isLive: PropTypes.bool.isRequired,
}

export default LiveChatSection
