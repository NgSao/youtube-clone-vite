import "../css/LoadingSpinner.css"

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Đang tải...</p>
            </div>
        </div>
    )
}

export default LoadingSpinner
