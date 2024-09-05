// import { useState } from "react";
// import { KeyIcon } from "lucide-react";

// export default function Component() {
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsAnimating(true);
//     // Here you would typically handle the login logic
//     setTimeout(() => setIsAnimating(false), 5000); // Reset animation after 5 seconds
//   };

//   const totalBars = 20; // Total number of bars

//   return (
//     <div className='flex items-center justify-center min-h-screen bg-gray-900 text-white'>
//       <div className='relative w-full max-w-md overflow-hidden'>
//         {/* Prison bars */}
//         <div className='absolute inset-0 flex justify-between items-stretch pointer-events-none'>
//           {[...Array(totalBars)].map((_, i) => (
//             <div
//               key={i}
//               className={`w-1 bg-gray-700 transform ${
//                 isAnimating
//                   ? i < totalBars / 2
//                     ? "animate-open-bars-left"
//                     : "animate-open-bars-right"
//                   : ""
//               }`}
//             ></div>
//           ))}
//         </div>

//         {/* Login form */}
//         <form
//           onSubmit={handleSubmit}
//           className='relative z-10 bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-xl'
//         >
//           <h2 className='text-2xl font-bold mb-6 text-center'>
//             Prison Management Login
//           </h2>
//           <div className='space-y-4'>
//             <div className='space-y-2'>
//               <label htmlFor='username' className='block text-sm font-medium'>
//                 Username
//               </label>
//               <input
//                 id='username'
//                 type='text'
//                 required
//                 className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
//               />
//             </div>
//             <div className='space-y-2'>
//               <label htmlFor='password' className='block text-sm font-medium'>
//                 Password
//               </label>
//               <input
//                 id='password'
//                 type='password'
//                 required
//                 className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
//               />
//             </div>
//             <button
//               type='submit'
//               className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
//             >
//               <KeyIcon className='mr-2 h-4 w-4' />
//               Unlock Access
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* CSS for animations */}
//       <style jsx global>{`
//         @keyframes openBarsLeft {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-100vw);
//           }
//         }
//         @keyframes openBarsRight {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(100vw);
//           }
//         }
//         .animate-open-bars-left {
//           animation: openBarsLeft 3s ease-in-out forwards;
//         }
//         .animate-open-bars-right {
//           animation: openBarsRight 3s ease-in-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }
