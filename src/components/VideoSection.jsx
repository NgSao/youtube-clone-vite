
import { useContext } from "react"
import PropTypes from "prop-types"
import VideoCard from "./VideoCard"
import { VideoContext } from "../context/VideoContext"
import "../css/VideoSection.css"

const VideoSection = ({ title, videos, showViewCount = false, showChannelName = true, flag }) => {
    const { handleVideoPlay } = useContext(VideoContext)

    if (!videos || videos.length === 0) {
        return null
    }

    return (
        <div className="video-section">
            <h2 className="section-title">{title}</h2>
            <div className="video-grid">
                {videos.map((video) => (
                    <VideoCard
                        key={video.id || video.snippet?.resourceId?.videoId}
                        video={video}
                        showViewCount={showViewCount}
                        showChannelName={showChannelName}
                        onClick={() => {
                            const videoId = flag
                                ? video.snippet?.resourceId?.videoId
                                : video.id || video.snippet?.resourceId?.videoId
                            handleVideoPlay(videoId)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

VideoSection.propTypes = {
    title: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    showViewCount: PropTypes.bool,
    showChannelName: PropTypes.bool,
    flag: PropTypes.bool,

}

export default VideoSection
