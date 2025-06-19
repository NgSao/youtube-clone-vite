
import { useContext } from "react"
import PropTypes from "prop-types"
import { VideoContext } from "../context/VideoContext"
import LiveVideoCard from "./LiveVideoCard"
import VideoCard from "./VideoCard"
import "../css/SearchResults.css"

const SearchResults = ({ data, isLiveSearch = false }) => {
    const { handleVideoPlay } = useContext(VideoContext)

    if (!data || data.length === 0) {
        return (
            <div className="search-results">
                <div className="no-results">
                    <h3>Không tìm thấy kết quả</h3>
                    <p>Thử tìm kiếm với từ khóa khác</p>
                </div>
            </div>
        )
    }

    return (
        <div className="search-results">
            <div className="results-header">
                <h2>
                    {isLiveSearch ? "Video phát trực tiếp" : "Kết quả tìm kiếm"} ({data.length})
                </h2>
            </div>

            <div className="results-grid">
                {data.map((item) => {
                    const videoId = item.id?.videoId || item.id

                    if (isLiveSearch) {
                        return <LiveVideoCard key={videoId} video={item} onClick={() => handleVideoPlay(videoId)} />
                    }

                    return <VideoCard key={videoId} video={item} onClick={() => handleVideoPlay(videoId)} />
                })}
            </div>
        </div>
    )
}

SearchResults.propTypes = {
    data: PropTypes.array.isRequired,
    isLiveSearch: PropTypes.bool,
}

export default SearchResults
