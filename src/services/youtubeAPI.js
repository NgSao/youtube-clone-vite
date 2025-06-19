const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"

class YouTubeAPI {
    // Get trending videos from Vietnam
    async getTrendingVideos() {
        try {
            const response = await fetch(
                `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=VN&maxResults=10&key=${API_KEY}`,
            )
            const data = await response.json()

            if (data.error) {
                throw new Error(data.error.message)
            }

            return data.items || []
        } catch (error) {
            console.error("Error fetching trending videos:", error)
            return []
        }
    }

    // Get channel videos by channel ID
    async getChannelVideos(channelId, maxResults = 10) {

        try {
            // const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCA_23dkEYToAc37hjSsCnXA&key=AIzaSyDWucyrYYer0kQj883dX_1CQHfDaDkRgg4`)

            // First get the uploads playlist ID
            const channelResponse = await fetch(`${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`)
            const channelData = await channelResponse.json()
            if (channelData.error) {
                throw new Error(channelData.error.message)
            }

            const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

            if (!uploadsPlaylistId) {
                throw new Error("Uploads playlist not found")
            }

            // Get videos from uploads playlist
            const videosResponse = await fetch(
                `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&order=date&key=${API_KEY}`,
            )
            const videosData = await videosResponse.json()

            if (videosData.error) {
                throw new Error(videosData.error.message)
            }

            return videosData.items || []
        } catch (error) {
            console.error("Error fetching channel videos:", error)
            return []
        }
    }

    // Get video details
    async getVideoDetails(videoId) {
        try {
            const response = await fetch(
                `${BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`,
            )
            const data = await response.json()

            if (data.error) {
                throw new Error(data.error.message)
            }

            return data.items[0] || null
        } catch (error) {
            console.error("Error fetching video details:", error)
            return null
        }
    }

    // Get video comments
    async getVideoComments(videoId, maxResults = 20) {
        try {
            const response = await fetch(
                `${BASE_URL}/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}&order=relevance&key=${API_KEY}`,
            )
            const data = await response.json()

            if (data.error) {
                console.error("Error fetching comments:", data.error.message)
                return []
            }

            return data.items || []
        } catch (error) {
            console.error("Error fetching video comments:", error)
            return []
        }
    }

    // Get related videos (using search with same category)
    async getRelatedVideos(videoId, maxResults = 10) {
        try {
            // First get video details to find category
            const videoDetails = await this.getVideoDetails(videoId)
            if (!videoDetails) return []

            const channelId = videoDetails.snippet.channelId
            const title = videoDetails.snippet.title

            // Search for related videos from same channel or similar title
            const response = await fetch(
                `${BASE_URL}/search?part=snippet&channelId=${channelId}&type=video&maxResults=${maxResults}&key=${API_KEY}`,
            )
            const data = await response.json()

            if (data.error) {
                // Fallback: search by keywords from title
                const keywords = title.split(" ").slice(0, 3).join(" ")
                const fallbackResponse = await fetch(
                    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(keywords)}&type=video&maxResults=${maxResults}&key=${API_KEY}`,
                )
                const fallbackData = await fallbackResponse.json()
                return fallbackData.items?.filter((item) => item.id.videoId !== videoId) || []
            }

            return data.items?.filter((item) => item.id.videoId !== videoId) || []
        } catch (error) {
            console.error("Error fetching related videos:", error)
            return []
        }
    }

    // Search videos
    async searchVideos(query, maxResults = 20) {
        try {
            const response = await fetch(
                `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`,
            )
            const data = await response.json()

            if (data.error) {
                throw new Error(data.error.message)
            }

            return data.items || []
        } catch (error) {
            console.error("Error searching videos:", error)
            return []
        }
    }

    // Search live videos
    async searchLiveVideos(query, maxResults = 20) {
        try {
            const response = await fetch(
                `${BASE_URL}/search?part=snippet&eventType=live&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`,
            )
            const data = await response.json()

            if (data.error) {
                console.error("Error searching live videos:", data.error.message)
                return []
            }

            return data.items || []
        } catch (error) {
            console.error("Error searching live videos:", error)
            return []
        }
    }

    // Get live chat messages
    async getLiveChatMessages(liveChatId, pageToken = null) {
        try {
            let url = `${BASE_URL}/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&maxResults=200&key=${API_KEY}`

            if (pageToken) {
                url += `&pageToken=${pageToken}`
            }

            const response = await fetch(url)
            const data = await response.json()

            if (data.error) {
                console.error("Error fetching live chat:", data.error.message)
                return { messages: [], nextPageToken: null, pollingIntervalMillis: 5000 }
            }

            return {
                messages: data.items || [],
                nextPageToken: data.nextPageToken,
                pollingIntervalMillis: data.pollingIntervalMillis || 5000,
            }
        } catch (error) {
            console.error("Error fetching live chat messages:", error)
            return { messages: [], nextPageToken: null, pollingIntervalMillis: 5000 }
        }
    }

    // Check if video is live
    async checkIfVideoIsLive(videoId) {
        try {
            const response = await fetch(`${BASE_URL}/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${API_KEY}`)
            const data = await response.json()

            if (data.error || !data.items || data.items.length === 0) {
                return { isLive: false, liveChatId: null }
            }

            const video = data.items[0]
            const liveDetails = video.liveStreamingDetails

            return {
                isLive: !!(liveDetails && liveDetails.actualStartTime && !liveDetails.actualEndTime),
                liveChatId: liveDetails?.activeLiveChatId || null,
                concurrentViewers: liveDetails?.concurrentViewers || null,
            }
        } catch (error) {
            console.error("Error checking live status:", error)
            return { isLive: false, liveChatId: null }
        }
    }

    // Enhanced search with live filter option
    async searchVideosWithLiveFilter(query, includeLive = false, maxResults = 20) {
        try {
            let url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`

            if (includeLive) {
                url += "&eventType=live"
            }

            const response = await fetch(url)
            const data = await response.json()

            if (data.error) {
                throw new Error(data.error.message)
            }

            return data.items || []
        } catch (error) {
            console.error("Error searching videos:", error)
            return []
        }
    }

    // Format view count
    formatViewCount(viewCount) {
        const count = Number.parseInt(viewCount)
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`
        }
        return count.toString()
    }

    // Format duration
    formatDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
        if (!match) return "0:00"

        const hours = Number.parseInt(match[1]) || 0
        const minutes = Number.parseInt(match[2]) || 0
        const seconds = Number.parseInt(match[3]) || 0

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        }
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    // Format time ago
    formatTimeAgo(publishedAt) {
        const date = new Date(publishedAt)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 1) return "Hôm nay"
        if (diffDays < 7) return `${diffDays} ngày trước`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`
        return `${Math.floor(diffDays / 365)} năm trước`
    }
}

export const youtubeAPI = new YouTubeAPI()
