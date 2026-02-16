'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Lazy-loaded image component with intersection observer
 * Only loads images when they're about to enter the viewport
 */
export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, isLoaded]);

  return (
    <div ref={imgRef} className={className}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          loading={priority ? undefined : 'lazy'}
        />
      ) : (
        <div
          style={{
            width: width || '100%',
            height: height || 'auto',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}
