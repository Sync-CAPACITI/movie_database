import React, { useState, useRef } from "react";


const MovieVideo = () => {
    const [selectedResolution, setSelectedResolution] = useState("720p");
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const resolutions = ["480p", "720p", "1080p", "4K"];
    const videoUrl = "/5 CSS Tips & Tricks for better Responsive Web Design.mp4";

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
  
    return (
        <div className="app">
            <h1>Watch Movie</h1>
            <div style={{ marginBottom: "1rem" }}>
                
                <div className="category-buttons">
                    <label htmlFor="resolution">Select Resolution: </label>
                    {resolutions.map((res) => (
                        <button
                            key={res}
                            onClick={() => setSelectedResolution(res)}>
                            {res}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                <video
                    ref={videoRef}
                    width="100%"
                    // height={selectedResolution}
                    controls
                    style={{ backgroundColor: "#000" }}
                    src={videoUrl}
                >
                Your browser does not support the video tag.
                </video>
                <button
                    onClick={handlePlayPause}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {isPlaying ? "❚❚" : "▶"}
                </button>
            </div>

            <p className="search">
                <strong>Selected Resolution:</strong> {selectedResolution}
            </p>
        </div>
    );
}

export default MovieVideo;