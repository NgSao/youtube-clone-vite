
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import WatchPage from "./pages/WatchPage"
import SearchResults from "./components/SearchResults"
import { VideoProvider } from "./context/VideoContext"
import { youtubeAPI } from "./services/youtubeAPI"
import "./App.css"
import { ThemeProvider } from "./context/ThemeContext"
import Footer from "./components/Footer"

function App() {
  const [searchData, setSearchData] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    includeLive: false,
    sortBy: "relevance",
    uploadDate: "any",
    duration: "any",
  })

  const handleSearch = async (value, filters = {}) => {
    if (!value.trim()) {
      setSearchData([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    setSearchFilters(filters)

    try {
      let results
      if (filters.includeLive) {
        results = await youtubeAPI.searchLiveVideos(value)
      } else {
        results = await youtubeAPI.searchVideosWithLiveFilter(value, false)
      }
      setSearchData(results)
    } catch (error) {
      console.error("Error searching videos:", error)
      setSearchData([])
    }
  }

  const handleClearSearch = () => {
    setSearchData([])
    setIsSearching(false)
    setSearchFilters({
      includeLive: false,
      sortBy: "relevance",
      uploadDate: "any",
      duration: "any",
    })
  }

  return (
    <Router>
      <ThemeProvider>

        <VideoProvider>

          <div className="youtube-app">
            <Header onSearch={handleSearch} onClearSearch={handleClearSearch} searchFilters={searchFilters} />

            <main className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={
                    isSearching && searchData.length > 0 ? (
                      <SearchResults data={searchData} isLiveSearch={searchFilters.includeLive} />
                    ) : (
                      <HomePage />
                    )
                  }
                />
                <Route path="/watch/:videoId" element={<WatchPage />} />
              </Routes>
            </main>
            <Footer />

          </div>
        </VideoProvider>
      </ThemeProvider>

    </Router>
  )
}

export default App
