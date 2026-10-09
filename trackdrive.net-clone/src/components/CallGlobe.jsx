import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function CallGlobe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.2],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.5, 1],
      markers: [
        // US
        { location: [37.7595, -122.4367], size: 0.05 },
        { location: [40.7128, -74.0060], size: 0.06 },
        { location: [34.0522, -118.2437], size: 0.05 },
        // Europe
        { location: [51.5074, -0.1278], size: 0.04 },
        { location: [48.8566, 2.3522], size: 0.03 },
        // Asia
        { location: [1.3521, 103.8198], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.05 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="globe-container">
      <div className="globe-overlay" />
      <canvas
        ref={canvasRef}
        style={{ width: 400, height: 400, maxWidth: '100%', aspectRatio: 1 }}
      />
    </div>
  );
}
