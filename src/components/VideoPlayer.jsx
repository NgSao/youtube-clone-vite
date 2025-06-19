
import PropTypes from "prop-types"
import "../css/VideoPlayer.css"

const VideoPlayer = ({ videoId }) => {
    return (
        <div className="video-player">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}

VideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired,
}

export default VideoPlayer
