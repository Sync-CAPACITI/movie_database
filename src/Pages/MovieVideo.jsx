import React, { useState, useEffect } from "react";

const MovieVideo = () => {
    const [selectedResolution, setSelectedResolution] = useState("720p");

    const resolutions = ["480p", "720p", "1080p", "4K"];
  
    return (
        <div className="app">
            <h1>Watch Movie</h1>
            <div style={{ marginBottom: "1rem" }}>
                
                <div className="category-buttons">
                    <label htmlFor="resolution">RESOLUTION: </label>
                    {resolutions.map((res) => (
                        <button
                            key={res}
                            onClick={() => setSelectedResolution(res)}>
                            {res}
                        </button>
                    ))}
                </div>
            </div>
            <video
                width="100%"
                controls
                style={{ backgroundColor: "#000" }}
            >
                Your browser does not support the video tag.
            </video>
            <p className="search">
                <strong>Selected Resolution:</strong> {selectedResolution}
            </p>
        </div>
    );
}

export default MovieVideo;