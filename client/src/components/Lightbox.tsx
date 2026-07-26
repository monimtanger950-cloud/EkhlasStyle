import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';

export function Lightbox() {
  const { lightboxImage, setLightboxImage } = useStore();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (lightboxImage) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImage]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setLightboxImage]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1 && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  return (
    <AnimatePresence>
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => setScale(prev => Math.min(prev + 0.5, 5))}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setScale(prev => Math.max(prev - 0.5, 0.5))}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={() => setLightboxImage(null)}
              className="p-2.5 bg-white/15 hover:bg-white/25 text-white rounded-full backdrop-blur-sm transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scale indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
            {Math.round(scale * 100)}%
          </div>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <img
              ref={imgRef}
              src={lightboxImage}
              alt="Product zoom"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                transition: isDragging ? 'none' : 'transform 0.2s ease',
                filter: 'brightness(1.05) contrast(1.02) saturate(1.1)',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </motion.div>

          {/* Hint */}
          {scale === 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs">
              Scroll or use buttons to zoom · Drag to pan
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
