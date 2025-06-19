import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "../css/SearchWithFilters.css"

const SearchWithFilters = ({ onSearch, onClearSearch, initialFilters = {} }) => {
    const [searchValue, setSearchValue] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        includeLive: false,
        sortBy: "relevance",
        uploadDate: "any",
        duration: "any",
        ...initialFilters,
    })

    useEffect(() => {
        setFilters((prev) => ({ ...prev, ...initialFilters }))
    }, [initialFilters])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            onSearch(searchValue, filters)
        }
    }

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)

        if (searchValue.trim()) {
            onSearch(searchValue, newFilters)
        }
    }

    const handleClear = () => {
        setSearchValue("")
        setFilters({
            includeLive: false,
            sortBy: "relevance",
            uploadDate: "any",
            duration: "any",
        })
        setShowFilters(false)
        onClearSearch()
    }

    return (
        <div className="search-with-filters">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn" aria-label="Search">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z" />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    className={`filter-toggle ${showFilters ? "active" : ""}`}
                    onClick={() => setShowFilters(!showFilters)}
                    aria-label="Toggle filters"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M10,18h4v-2h-4V18z M3,6v2h18V6H3z M6,13h12v-2H6V13z" />
                    </svg>
                    <span>Bộ lọc</span>
                </button>

                <button type="button" className="mic-btn" aria-label="Voice search">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                    </svg>
                </button>

                {searchValue && (
                    <button type="button" className="clear-btn" onClick={handleClear}>
                        Xóa
                    </button>
                )}
            </form>

            {showFilters && (
                <div className="filters-panel">
                    <div className="filter-row">
                        <div className="filter-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.includeLive}
                                    onChange={(e) => handleFilterChange("includeLive", e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                <span className="live-indicator">🔴</span>
                                <span>Chỉ video phát trực tiếp</span>
                            </label>
                        </div>
                    </div>

                    <div className="filter-row">
                        <div className="filter-group">
                            <label className="select-label">Sắp xếp theo:</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                className="filter-select"
                            >
                                <option value="relevance">Liên quan</option>
                                <option value="date">Ngày tải lên</option>
                                <option value="viewCount">Lượt xem</option>
                                <option value="rating">Đánh giá</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="select-label">Thời gian tải lên:</label>
                            <select
                                value={filters.uploadDate}
                                onChange={(e) => handleFilterChange("uploadDate", e.target.value)}
                                className="filter-select"
                            >
                                <option value="any">Bất kỳ</option>
                                <option value="hour">Giờ qua</option>
                                <option value="today">Hôm nay</option>
                                <option value="week">Tuần này</option>
                                <option value="month">Tháng này</option>
                                <option value="year">Năm này</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="select-label">Thời lượng:</label>
                            <select
                                value={filters.duration}
                                onChange={(e) => handleFilterChange("duration", e.target.value)}
                                className="filter-select"
                            >
                                <option value="any">Bất kỳ</option>
                                <option value="short">Dưới 4 phút</option>
                                <option value="medium">4-20 phút</option>
                                <option value="long">Trên 20 phút</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

SearchWithFilters.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
    initialFilters: PropTypes.object,
}

export default SearchWithFilters
