import { useState, useEffect } from "react";
import { Video, AlertCircle } from "lucide-react";
import React from "react";

const CameraFeed = ({ id }) => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className='relative bg-gray-900 border-4 border-gray-700 rounded-lg overflow-hidden shadow-lg'>
      <div className='absolute top-2 left-2 bg-gray-800 bg-opacity-75 px-2 py-1 rounded-md z-10'>
        <span className='text-xs font-mono text-gray-300'>
          CAM_{id.toString().padStart(2, "0")}
        </span>
      </div>
      {isOffline ? (
        <div className='flex items-center justify-center h-full bg-gray-800'>
          <AlertCircle className='w-12 h-12 text-red-500' />
          <span className='ml-2 text-red-400 font-bold'>OFFLINE</span>
        </div>
      ) : (
        <div className='w-full h-full relative'>
          <video
            className='w-full h-full object-cover'
            controls={false}
            autoPlay
            loop
            muted
            controlsList='nodownload nofullscreen'
            onError={() => {
              setIsOffline(true);
            }}
            onLoadedData={() => {
              setIsOffline(false);
            }}
          >
            <source
              src={`${process.env.REACT_APP_CAMERA_FEED_URI}/ISU1CAM${id}.mp4`}
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
          <div className='absolute inset-0 bg-static opacity-40 mix-blend-overlay'></div>
        </div>
      )}
      <div className='absolute bottom-2 right-2 flex items-center bg-gray-800 bg-opacity-75 px-2 py-1 rounded-md'>
        <Video className='w-4 h-4 text-red-500 mr-1' />
        <span className='text-xs font-mono text-gray-300'>LIVE</span>
      </div>
    </div>
  );
};

export default function Component() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-static opacity-10'></div>
      </div>
      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-extrabold text-gray-100'>
            Camera Monitoring
          </h1>
          <div className='text-gray-400 font-mono'>
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <CameraFeed key={index} id={index + 1} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes staticAnimation {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .bg-static {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: staticAnimation 0.5s steps(6, end) infinite both;
        }
      `}</style>
    </div>
  );
}
