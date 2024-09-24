import React from "react";

export default function SignOutPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 relative overflow-hidden'>
      {/* Prison cell door background with vertical bars */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900'>
        <div className='absolute inset-0 flex justify-around'>
          {[...Array(12)].map((_, i) => (
            <div key={i} className='w-2 bg-gray-800 h-full shadow-lg'></div>
          ))}
        </div>
      </div>

      <div className='w-full max-w-md p-8 space-y-8 bg-[#F37D3D] bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-lg shadow-2xl relative z-10'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-white'>
            Signed Out
          </h2>
          <p className='mt-2 text-sm text-gray-200'>
            You have been successfully logged out from Warden
          </p>
        </div>
        <div className='mt-8 space-y-6'>
          <div className='flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          </div>
          <p className='text-center text-white'>
            Well done cybernautic earthling. Security posture levels returning
            to 100%...
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
