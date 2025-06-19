import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../components/VideoPlayer"
import VideoInfo from "../components/VideoInfo"
import CommentSection from "../components/CommentSection"
import RelatedVideos from "../components/RelatedVideos"
import LoadingSpinner from "../components/LoadingSpinner"
import { youtubeAPI } from "../services/youtubeAPI"
import LiveChatSection from "../components/LiveChatSection"
import "../css/WatchPage.css"
const WatchPage = () => {
    const { videoId } = useParams()
    const [videoData, setVideoData] = useState(null)
    const [comments, setComments] = useState([])
    const [relatedVideos, setRelatedVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [liveInfo, setLiveInfo] = useState({ isLive: false, liveChatId: null })

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!videoId) return

            try {
                setLoading(true)

                // Fetch video details
                const video = await youtubeAPI.getVideoDetails(videoId)
                setVideoData(video)

                // Check if video is live and get live chat ID
                const liveStatus = await youtubeAPI.checkIfVideoIsLive(videoId)
                setLiveInfo(liveStatus)

                // Fetch comments (only if not live)
                if (!liveStatus.isLive) {
                    const videoComments = await youtubeAPI.getVideoComments(videoId)
                    setComments(videoComments)
                }

                // Fetch related videos
                const related = await youtubeAPI.getRelatedVideos(videoId)
                setRelatedVideos(related)
            } catch (error) {
                console.error("Error fetching video data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchVideoData()
    }, [videoId])

    if (loading) {
        return <LoadingSpinner />
    }

    if (!videoData) {
        return <div className="error-message">Video không tìm thấy</div>
    }

    return (
        <div className="watch-page">
            <div className="watch-content">
                <div className="video-section">
                    <VideoPlayer videoId={videoId} />
                    <VideoInfo video={videoData} />
                    {liveInfo.isLive ? (
                        <LiveChatSection liveChatId={liveInfo.liveChatId} isLive={liveInfo.isLive} />
                    ) : (
                        <CommentSection comments={comments} videoId={videoId} />
                    )}
                </div>

                <div className="sidebar-section">
                    <RelatedVideos videos={relatedVideos} />
                </div>
            </div>
        </div>
    )
}

export default WatchPage
