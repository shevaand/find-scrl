import { useState, useRef, useEffect } from 'react'

const useScroll = ({ itemCount, itemHeight, buffer = 5 }) => {
  const [scrollOffset, setScrollOffset] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollOffset(containerRef.current.scrollTop);
  
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const startIndex = Math.max(0, Math.floor(scrollOffset / itemHeight) - buffer)
  const endIndex = Math.min(itemCount, startIndex + Math.ceil(250 / itemHeight) + buffer * 2)

  return { containerRef, startIndex, endIndex }
}

export default useScroll
