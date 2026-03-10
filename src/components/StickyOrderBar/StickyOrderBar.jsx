import React, { useState, useEffect } from 'react';
import './StickyOrderBar.scss';
import OrderButton from '../OrderButton/OrderButton';

export default function StickyOrderBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    // Show the bar only after scrolling past the Hero section
    useEffect(() => {
        const handleScroll = () => {
            // Wartość 1.5 * innerHeight odpowiada orientacyjnie momentowi,
            // w którym kończy się przypięty u góry efekt HeroParallaxWrapper.
            const threshold = window.innerHeight * 1.5;

            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOrderClick = () => {
        setIsGenerating(true);
        setProgress(0);

        // Simulate "Generating Request" progress bar
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Wait a moment then scroll to form and reset
                    setTimeout(() => {
                        const formSection = document.getElementById("inspection-form");
                        if (formSection) {
                            formSection.scrollIntoView({ behavior: "smooth" });
                        }
                        setIsGenerating(false);
                        setProgress(0);
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
    };

    return (
        <div className={`sticky-order-bar ${isVisible ? 'visible' : ''}`}>
            <div className="sticky-bar-content">
                <div className="bar-info">
                    <span className="info-title">SZYBKI KONTAKT</span>
                    <span className="info-subtitle">Zarezerwuj termin przeglądu online</span>
                </div>

                <div className="bar-action">
                    {isGenerating ? (
                        <div className="progress-container">
                            <div className="progress-text">GENEROWANIE ZAPYTANIA... {progress}%</div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    ) : (
                        <OrderButton
                            className="pulse"
                            showIcon={false}
                            text="UMÓW PRZEGLĄD"
                            onClick={handleOrderClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
