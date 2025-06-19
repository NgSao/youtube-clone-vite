
import PropTypes from "prop-types"
import { youtubeAPI } from "../services/youtubeAPI"
import "../css/VideoCard.css"

const VideoCard = ({ video, onClick, showViewCount = false, showChannelName = true }) => {
    const formatDuration = () => {
        const durations = ["3:45", "8:12", "15:30", "2:18", "11:45", "6:33"]
        return durations[Math.floor(Math.random() * durations.length)]
    }

    const formatViewCount = () => {
        const views = ["1.2M", "856K", "2.1M", "445K", "3.8M", "127K"]
        return views[Math.floor(Math.random() * views.length)]
    }

    const snippet = video.snippet
    const statistics = video.statistics

    return (
        <div className="video-card" onClick={onClick}>
            <div className="video-thumbnail">
                <img
                    src={snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "/placeholder.svg"}
                    alt={snippet.title}
                    className="thumbnail-img"
                    loading="lazy"
                />
                <div className="video-duration">{formatDuration()}</div>
            </div>

            <div className="video-info">
                {showChannelName && (
                    <div className="channel-avatar">
                        <div className="avatar-placeholder">{snippet.channelTitle?.charAt(0) || "?"}</div>
                    </div>
                )}

                <div className="video-details">
                    <h3 className="video-title" title={snippet.title}>
                        {snippet.title}
                    </h3>
                    {showChannelName && <p className="channel-name">{snippet.channelTitle}</p>}
                    <p className="video-meta">
                        {showViewCount && statistics?.viewCount && (
                            <>{youtubeAPI.formatViewCount(statistics.viewCount)} lượt xem • </>
                        )}
                        {!showViewCount && <>{formatViewCount()} lượt xem • </>}
                        {youtubeAPI.formatTimeAgo(snippet.publishedAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}

VideoCard.propTypes = {
    video: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    showViewCount: PropTypes.bool,
    showChannelName: PropTypes.bool,
}

export default VideoCard
