
import { useEffect, useState } from "react"
import VideoSection from "../components/VideoSection"
import LoadingSpinner from "../components/LoadingSpinner"
import { youtubeAPI } from "../services/youtubeAPI"
const VITE_ID_1 = import.meta.env.VITE_ID_1
const VITE_ID_2 = import.meta.env.VITE_ID_2
const HomePage = () => {
    const [trendingVideos, setTrendingVideos] = useState([])
    const [laamVlogVideos, setLaamVlogVideos] = useState([])
    const [mixigamingVideos, setMixigamingVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true)

                // Fetch trending videos from Vietnam
                const trending = await youtubeAPI.getTrendingVideos()
                setTrendingVideos(trending)

                // Fetch LaamVlog channel videos
                const laamVlog = await youtubeAPI.getChannelVideos(VITE_ID_1) // LaamVlog channel ID
                setLaamVlogVideos(laamVlog)

                // Fetch Mixigaming channel videos
                const mixigaming = await youtubeAPI.getChannelVideos(VITE_ID_2) // Replace with actual Mixigaming channel ID
                setMixigamingVideos(mixigaming)
            } catch (error) {
                console.error("Error fetching homepage data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchAllData()
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }
    console.log("video", laamVlogVideos)
    return (
        <div className="homepage">
            <VideoSection title="🔥 Trending tại Việt Nam" videos={trendingVideos} showViewCount={true} flag={false} />

            <VideoSection title="📺 LâmVlog - Mới nhất" videos={laamVlogVideos} showChannelName={false} flag={true} />

            <VideoSection title="🎮 Mixigaming - Mới nhất" videos={mixigamingVideos} showChannelName={false} flag={true} />
        </div>
    )
}

export default HomePage
