

import { createContext, useState } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import YouTube from "react-youtube"
import "../css/MovieDetailContext.css"

const MovieContext = createContext()

const opts = {
  height: "480",
  width: "854",
  playerVars: {
    autoplay: 1,
  },
}

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("")
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleVideoTrailer = (videoId) => {
    setTrailerUrl(videoId)
    setIsOpen(true)
  }

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="youtube-modal"
        overlayClassName="youtube-modal-overlay"
        contentLabel="YouTube Video Modal"
      >
        {trailerUrl && (
          <div className="youtube-player-container">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  )
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { MovieProvider, MovieContext }
