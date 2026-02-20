import { useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, updateDoc, setDoc, increment, getDoc } from "firebase/firestore";

// Helper to get today's date in YYYY-MM-DD format based on local timezone
const getTodayDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Tracks a page view for the current day.
 * Uses sessionStorage to prevent counting multiple views in the same browser session.
 */
export const trackPageView = async () => {
  try {
    const sessionKey = "has_visited_today";
    const today = getTodayDateString();

    // Check if we already tracked this session today
    const lastVisitDate = sessionStorage.getItem(sessionKey);
    if (lastVisitDate === today) {
      return; // Already logged for this session today
    }

    const docRef = doc(db, "page_views", today);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        count: increment(1)
      });
    } else {
      await setDoc(docRef, {
        date: today,
        count: 1
      });
    }

    sessionStorage.setItem(sessionKey, today);
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

/**
 * Tracks time spent on a specific section and saves it to Firestore.
 * Adds the elapsed time (in seconds) to the daily total for that section.
 * @param {string} sectionId - The unique name/id of the section (e.g., 'hero', 'faq')
 */
export const trackSectionTime = async (sectionId, timeInSeconds) => {
  if (timeInSeconds < 1) return; // Ignore very short glimpses

  try {
    const today = getTodayDateString();
    const docRef = doc(db, "section_time", today);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [sectionId]: increment(timeInSeconds)
      });
    } else {
      await setDoc(docRef, {
        date: today,
        [sectionId]: timeInSeconds
      });
    }
  } catch (error) {
    console.error(`Failed to track section time for ${sectionId}:`, error);
  }
};

/**
 * React Hook to track how long an element is visible in the viewport.
 * @param {string} sectionId - The identifier for the section.
 * @returns {React.MutableRefObject} - Ref to attach to the target DOM element.
 */
export const useSectionTracker = (sectionId) => {
  const elementRef = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Started viewing
          startTimeRef.current = Date.now();
        } else {
          // Stopped viewing
          if (startTimeRef.current) {
            const timeSpent = (Date.now() - startTimeRef.current) / 1000;
            accumulatedTimeRef.current += timeSpent;
            startTimeRef.current = null;
          }
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(element);

    // Cleanup: when component unmounts, log any remaining accumulated time
    return () => {
      observer.disconnect();
      if (startTimeRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000;
        accumulatedTimeRef.current += timeSpent;
      }
      
      const roundedTime = Math.round(accumulatedTimeRef.current);
      if (roundedTime > 0) {
        trackSectionTime(sectionId, roundedTime);
      }
    };
  }, [sectionId]);

  return elementRef;
};
