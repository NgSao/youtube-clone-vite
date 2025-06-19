import { useContext } from "react";
import PropTypes from "prop-types";
import VideoCard from "./VideoCard";
import { MovieContext } from "../context/MovieDetailContext";
import "../css/VideoGrid.css";

const VideoGrid = ({ videos }) => {
    const { handleVideoTrailer } = useContext(MovieContext)

    return (
        <div className="video-grid-container">
            <div className="video-grid">
                {videos.map((video) => (
                    <VideoCard
                        key={video.snippet.resourceId?.videoId || video.id}
                        video={video}
                        onClick={() => handleVideoTrailer(video.snippet.resourceId?.videoId || video.id)}
                    />
                ))}
            </div>
        </div>
    )
}

VideoGrid.propTypes = {
    videos: PropTypes.array.isRequired,
}

export default VideoGrid
