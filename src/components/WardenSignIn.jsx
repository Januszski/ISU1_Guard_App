import { Key } from "lucide-react";
import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

async function authenticate(username, password) {
  try {
    const message = await invoke("authenticate_ad", { username, password });
    console.log(message); // Authentication successful
  } catch (error) {
    console.error("Error:", error); // Handle authentication failure
  }
}

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", username, password);
    authenticate(username, password);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 relative overflow-hidden'>
      {/* Prison cell door background with only vertical bars */}
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
            Warden Sign On
          </h2>
          <p className='mt-2 text-sm text-gray-200'>Management System Access</p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-sm font-medium mb-2 text-white'
              >
                Username
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-500'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  id='username'
                  name='username'
                  type='text'
                  required
                  className='pl-10 w-full px-3 py-2 border border-gray-600 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium mb-2 text-white'
              >
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-500'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='pl-10 w-full px-3 py-2 border border-gray-600 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <Key
                  className='h-5 w-5 text-gray-400 group-hover:text-gray-300'
                  aria-hidden='true'
                />
              </span>
              Grant Warden Privileges
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
