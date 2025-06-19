
import { useState } from "react"
import PropTypes from "prop-types"
import { youtubeAPI } from "../services/youtubeAPI"
import "../css/CommentSection.css"

const CommentSection = ({ comments }) => {
    const [sortBy, setSortBy] = useState("relevance")
    const [showReplies, setShowReplies] = useState({})

    const toggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }))
    }

    return (
        <div className="comment-section">
            <div className="comment-header">
                <h3>{comments.length} bình luận</h3>
                <div className="sort-options">
                    <button
                        className={`sort-btn ${sortBy === "relevance" ? "active" : ""}`}
                        onClick={() => setSortBy("relevance")}
                    >
                        Hàng đầu
                    </button>
                    <button className={`sort-btn ${sortBy === "time" ? "active" : ""}`} onClick={() => setSortBy("time")}>
                        Mới nhất
                    </button>
                </div>
            </div>

            <div className="add-comment">
                <div className="user-avatar">
                    <div className="avatar-placeholder">U</div>
                </div>
                <div className="comment-input-container">
                    <input type="text" placeholder="Thêm bình luận công khai..." className="comment-input" />
                </div>
            </div>

            <div className="comments-list">
                {comments.map((comment) => {
                    const snippet = comment.snippet.topLevelComment.snippet
                    const replies = comment.replies?.comments || []

                    return (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-avatar">
                                <img
                                    src={snippet.authorProfileImageUrl || "/placeholder.svg"}
                                    alt={snippet.authorDisplayName}
                                    className="avatar-img"
                                />
                            </div>

                            <div className="comment-content">
                                <div className="comment-author">
                                    <span className="author-name">{snippet.authorDisplayName}</span>
                                    <span className="comment-time">{youtubeAPI.formatTimeAgo(snippet.publishedAt)}</span>
                                </div>

                                <p className="comment-text">{snippet.textDisplay}</p>

                                <div className="comment-actions">
                                    <button className="comment-action-btn">
                                        <span className="like-icon">👍</span>
                                        <span>{snippet.likeCount || ""}</span>
                                    </button>
                                    <button className="comment-action-btn">
                                        <span className="dislike-icon">👎</span>
                                    </button>
                                    <button className="comment-action-btn">Trả lời</button>
                                </div>

                                {replies.length > 0 && (
                                    <div className="replies-section">
                                        <button className="show-replies-btn" onClick={() => toggleReplies(comment.id)}>
                                            {showReplies[comment.id] ? "Ẩn" : "Hiển thị"} {replies.length} phản hồi
                                        </button>

                                        {showReplies[comment.id] && (
                                            <div className="replies-list">
                                                {replies.map((reply) => (
                                                    <div key={reply.id} className="reply-item">
                                                        <div className="comment-avatar">
                                                            <img
                                                                src={reply.snippet.authorProfileImageUrl || "/placeholder.svg"}
                                                                alt={reply.snippet.authorDisplayName}
                                                                className="avatar-img"
                                                            />
                                                        </div>
                                                        <div className="comment-content">
                                                            <div className="comment-author">
                                                                <span className="author-name">{reply.snippet.authorDisplayName}</span>
                                                                <span className="comment-time">
                                                                    {youtubeAPI.formatTimeAgo(reply.snippet.publishedAt)}
                                                                </span>
                                                            </div>
                                                            <p className="comment-text">{reply.snippet.textDisplay}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array.isRequired,
}

export default CommentSection
