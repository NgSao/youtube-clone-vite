import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const VideoContext = createContext()

const VideoProvider = ({ children }) => {
    const navigate = useNavigate()

    const handleVideoPlay = (videoId) => {
        if (videoId) {
            navigate(`/watch/${videoId}`)
        }
    }

    return <VideoContext.Provider value={{ handleVideoPlay }}>{children}</VideoContext.Provider>
}

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { VideoProvider, VideoContext }
