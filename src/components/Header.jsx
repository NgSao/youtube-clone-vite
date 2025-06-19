import PropTypes from "prop-types"
import SearchWithFilters from "./SearchWithFilters"
import ThemeToggle from "./ThemeToggle"
import "../css/Header.css"

const Header = ({ onSearch, onClearSearch, searchFilters }) => {
    const handleLogoClick = () => {
        onClearSearch()
        window.location.href = "/"
    }

    return (
        <header className="youtube-header">
            <div className="header-left">
                <button className="menu-btn" aria-label="Menu">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                </button>
                <div className="logo" onClick={handleLogoClick}>
                    <svg viewBox="0 0 90 20" width="90" height="20">
                        <path
                            d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35042 27.9727 3.12324Z"
                            fill="#FF0000"
                        />
                        <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                    </svg>
                    <span className="logo-text">YouTube</span>
                </div>
            </div>

            <div className="header-center">
                <SearchWithFilters onSearch={onSearch} onClearSearch={onClearSearch} initialFilters={searchFilters} />
            </div>

            <div className="header-right">
                <ThemeToggle />
                <button className="icon-btn" aria-label="Create">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
                    </svg>
                </button>
                <button className="icon-btn" aria-label="Notifications">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                </button>
                <button className="profile-btn" aria-label="Account">
                    <div className="profile-avatar">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                </button>
            </div>
        </header>
    )
}

Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
    searchFilters: PropTypes.object,
}

export default Header
