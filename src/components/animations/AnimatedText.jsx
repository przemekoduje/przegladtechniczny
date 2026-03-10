import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
    text,
    className = '',
    tag: Tag = 'h2',
    delay = 0
}) {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        // Split text into words to prevent unnatural line breaks mid-word
        const words = el.innerText.split(' ');
        el.innerHTML = '';

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            // We can animate character by character inside the word wrapper
            const chars = word.split('');
            chars.forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.innerText = char;
                charSpan.style.opacity = 0;
                charSpan.style.transform = 'translateY(10px)';
                charSpan.style.display = 'inline-block';
                wordSpan.appendChild(charSpan);
            });

            el.appendChild(wordSpan);

            // Add standard space between words for natural browser wrapping
            if (index < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });

        // Select the individual character spans for animation
        const spans = el.querySelectorAll('span > span');

        gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
            delay: delay,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        }
    }, [text, delay]);

    return (
        <Tag ref={textRef} className={className}>
            {text}
        </Tag>
    );
}
