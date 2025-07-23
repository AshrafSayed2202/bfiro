import React, { useRef, useEffect, useState } from 'react';

const VideoComponent = ({ src, muted }) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timeoutRef.current = setTimeout(() => {
                        setIsVisible(true);
                    }, 500);
                } else {
                    clearTimeout(timeoutRef.current);
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            observer.disconnect();
            clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isVisible) {
                video.play().catch(err => {
                    console.warn('Autoplay failed:', err);
                });
            } else {
                video.pause();
            }
        }
    }, [isVisible]);

    return (
        <video
            ref={videoRef}
            src={src}
            className="h-full w-full object-cover"
            muted={muted}
            playsInline
        />
    );
};

export default VideoComponent;
