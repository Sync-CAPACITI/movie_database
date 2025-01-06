import React, { useState, useEffect } from "react";

const MovieVideo = () => {
    const [selectedResolution, setSelectedResolution] = useState("720p");

    const handleResolutionChange = (e) => {
        setSelectedResolution(e.target.value);
    };
  
    return (
        <div className="app">
            <h1>Watch Movie</h1>
            <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="resolution">Resolution: </label>
                <select
                    id="resolution"
                    value={selectedResolution}
                    onChange={handleResolutionChange}
                >
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                </select>
            </div>
            <video
                width="100%"
                controls
                style={{ backgroundColor: "#000" }}
            >
                Your browser does not support the video tag.
            </video>
            <p>
                <strong>Selected Resolution:</strong> {selectedResolution}
            </p>
        </div>
    );
}

export default MovieVideo;