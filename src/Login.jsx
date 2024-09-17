// import React, { useState } from 'react';
// import Header from './Header'; // Import the Header component
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import CenteredNotification from './CenteredNotification'; // Import the custom notification component

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({ email: '', password: '' });
//   const [notification, setNotification] = useState(null); // State for notifications
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const validateEmail = (email) => {
//     if (!email.includes('@')) {
//       return 'Email must contain an @ symbol.';
//     }
//     return '';
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return 'Password must be at least 8 characters long, contain one capital letter and one special character.';
//     }
//     return '';
//   };

//   const handleEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       email: validateEmail(newEmail),
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       password: validatePassword(newPassword),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8085/login', { email, password });
      
//       if (response.data) {
//         const userData = response.data;
//         setUser(userData);

//         switch (userData.role) {
//           case 'admin':
//             sessionStorage.setItem('adminid', userData.adminUserId); // Store admin ID
//             navigate('/admin-dashboard');
//             break;
//           case 'user':
//             sessionStorage.setItem('userid', userData.id); // Store user ID
//             setNotification({
//               type: 'success',
//               message: 'Login successful! Redirecting to home...',
//             });
//             setTimeout(() => navigate('/home'), 3000); // Redirect after 3 seconds
//             break;
//             case 'supplier':
//               sessionStorage.setItem('supplierId', supplierId.supplierId);
//               setNotification({
//                 type:'success',
//                 message: 'Login successful!!!',
//               });
//               setTimeout(() => navigate('/supplierHome'), 3000);
//               break;
//           default:
//             setErrors({ email: '', password: '' });
//             setNotification({
//               type: 'error',
//               message: 'Login failed: Invalid email or password.',
//             });
//             break;
//         }
//       } else {
//         setErrors({ email: '', password: '' });
//         setNotification({
//           type: 'error',
//           message: 'Login failed: Invalid email or password',
//         });
//       }
//     } catch (error) {
//       setErrors({ email: '', password: '' });
//       setNotification({
//         type: 'error',
//         message: 'Login failed: Invalid email or password',
//       });
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header /> {/* Include Header here */}
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg border border-gray-200">
//           {/* Image Column */}
//           <div className="w-1/2 hidden lg:block">
//             <img
//               src="/loginImage.jpg" // Ensure the image path is correct
//               alt="Construction"
//               className="w-full h-full object-cover rounded-l-lg"
//             />
//           </div>
//           {/* Form Column */}
//           <div className="w-full lg:w-1/2 p-8">
//             <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   placeholder="Enter your email"
//                   className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
//                 />
//                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   placeholder="Enter your password"
//                   className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
//                 />
//                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
//               >
//                 Login
//               </button>
//               {notification && (
//                 <CenteredNotification
//                   type={notification.type}
//                   message={notification.message}
//                   onClose={() => setNotification(null)}
//                 />
//               )}
//               <p className="mt-4 text-center text-sm text-gray-500">
//                 Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import Header from './Header'; // Import the Header component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CenteredNotification from './CenteredNotification'; // Import the custom notification component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [notification, setNotification] = useState(null); // State for notifications
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Email must contain an @ symbol.';
    }
    return '';
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long, contain one capital letter and one special character.';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(newEmail),
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(newPassword),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/login', { email, password });
      
      if (response.data) {
        const userData = response.data;
        setUser(userData);
        console.log(userData)

        switch (userData.role) {
          case 'admin':
            sessionStorage.setItem('adminid', userData.adminUserId); // Store admin ID
            navigate('/admin-dashboard');
            break;
          case 'user':
            sessionStorage.setItem('userid', userData.id); // Store user ID
            setNotification({
              type: 'success',
              message: 'Login successful! Redirecting to home...',
            });
            setTimeout(() => navigate('/home'), 3000); // Redirect after 3 seconds
            break;
          case 'supplier':
            sessionStorage.setItem('supplierid', userData.supplierId); // Correctly store supplier ID
            setNotification({
              type: 'success',
              message: 'Login successful! Redirecting to supplier home...',
            });
            setTimeout(() => navigate('/supplierHome'), 3000); // Redirect after 3 seconds
            break;
          default:
            setErrors({ email: '', password: '' });
            setNotification({
              type: 'error',
              message: 'Login failed: Invalid email or password.',
            });
            break;
        }
      } else {
        setErrors({ email: '', password: '' });
        setNotification({
          type: 'error',
          message: 'Login failed: Invalid email or password.',
        });
      }
    } catch (error) {
      setErrors({ email: '', password: '' });
      setNotification({
        type: 'error',
        message: 'Login failed: Invalid email or password.',
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header /> {/* Include Header here */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Image Column */}
          <div className="w-1/2 hidden lg:block">
            <img
              src="/loginImage.jpg" // Ensure the image path is correct
              alt="Construction"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          {/* Form Column */}
          <div className="w-full lg:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
              >
                Login
              </button>
              {notification && (
                <CenteredNotification
                  type={notification.type}
                  message={notification.message}
                  onClose={() => setNotification(null)}
                />
              )}
              <p className="mt-4 text-center text-sm text-gray-500">
                Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
