
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { youtubeAPI } from "../services/youtubeAPI"
import "../css/LiveVideoCard.css"

const LiveVideoCard = ({ video, onClick }) => {
    const [liveInfo, setLiveInfo] = useState({ isLive: false, concurrentViewers: null })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkLiveStatus = async () => {
            const videoId = video.id?.videoId || video.id
            if (videoId) {
                const info = await youtubeAPI.checkIfVideoIsLive(videoId)
                setLiveInfo(info)
            }
            setLoading(false)
        }

        checkLiveStatus()
    }, [video])

    const snippet = video.snippet
    const videoId = video.id?.videoId || video.id

    return (
        <div className="live-video-card" onClick={onClick}>
            <div className="video-thumbnail">
                <img src={snippet.thumbnails.high.url || "/placeholder.svg"} alt={snippet.title} className="thumbnail-img" />

                {!loading && liveInfo.isLive && (
                    <>
                        <div className="live-badge">
                            <span className="live-dot"></span>
                            TRỰC TIẾP
                        </div>
                        {liveInfo.concurrentViewers && (
                            <div className="viewer-count">{youtubeAPI.formatViewCount(liveInfo.concurrentViewers)} đang xem</div>
                        )}
                    </>
                )}

                {!loading && !liveInfo.isLive && (
                    <div className="video-duration">
                        {youtubeAPI.formatDuration("PT5M30S")} {/* Mock duration */}
                    </div>
                )}
            </div>

            <div className="video-info">
                <div className="channel-avatar">
                    <div className="avatar-placeholder">{snippet.channelTitle.charAt(0)}</div>
                </div>

                <div className="video-details">
                    <h3 className="video-title">
                        {liveInfo.isLive && <span className="live-indicator">🔴 </span>}
                        {snippet.title}
                    </h3>
                    <p className="channel-name">{snippet.channelTitle}</p>
                    <p className="video-meta">
                        {liveInfo.isLive ? (
                            <>Đang phát trực tiếp • {youtubeAPI.formatTimeAgo(snippet.publishedAt)}</>
                        ) : (
                            <>{youtubeAPI.formatTimeAgo(snippet.publishedAt)}</>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

LiveVideoCard.propTypes = {
    video: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default LiveVideoCard
