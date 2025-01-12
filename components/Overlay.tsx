import React from "react";

interface OverlayProps {
    bgColor: string
}

const Overlay = ({bgColor}:OverlayProps) => {
    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                background: bgColor,
            }}
        />
    );
};

export default Overlay;
