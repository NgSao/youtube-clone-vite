
import { createContext, useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem("youtube-theme")
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark")
        } else {
            // Check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setIsDarkMode(prefersDark)
        }
    }, [])

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light")
        // Save to localStorage
        localStorage.setItem("youtube-theme", isDarkMode ? "dark" : "light")
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
