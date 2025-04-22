import React from "react";
import "../Loader.css"; // Add custom styles for the loader

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="loader-banner">
                <div className="spinner"></div>
                <p>Loading, please wait...</p>
            </div>
        </div>
    );
}