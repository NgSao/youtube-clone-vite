
import { useContext } from "react"
import PropTypes from "prop-types"
import { VideoContext } from "../context/VideoContext"
import { youtubeAPI } from "../services/youtubeAPI"
import "../css/RelatedVideos.css"

const RelatedVideos = ({ videos }) => {
    const { handleVideoPlay } = useContext(VideoContext)

    return (
        <div className="related-videos">
            <h3 className="related-title">Video liên quan</h3>
            <div className="related-list">
                {videos.map((video) => {
                    const videoId = video.id?.videoId || video.id
                    const snippet = video.snippet

                    return (
                        <div key={videoId} className="related-item" onClick={() => handleVideoPlay(videoId)}>
                            <div className="related-thumbnail">
                                <img
                                    src={snippet.thumbnails.medium.url || "/placeholder.svg"}
                                    alt={snippet.title}
                                    className="thumbnail-img"
                                />
                            </div>

                            <div className="related-info">
                                <h4 className="related-video-title">{snippet.title}</h4>
                                <p className="related-channel">{snippet.channelTitle}</p>
                                <p className="related-meta">{youtubeAPI.formatTimeAgo(snippet.publishedAt)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

RelatedVideos.propTypes = {
    videos: PropTypes.array.isRequired,
}

export default RelatedVideos
