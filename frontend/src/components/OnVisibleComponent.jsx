import React, { useState, useEffect, useRef } from 'react';

const OnVisibleComponent = ({ onVisible }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (onVisible) {
                        onVisible();
                    }
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [onVisible]);

    return (
        <div ref={ref}>
            {isVisible ? 'Component is visible' : 'Component is not visible'}
        </div>
    );
};

export default OnVisibleComponent;
