// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaShoppingCart, FaRegCreditCard, FaSearch, FaInfoCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addItem } from '../cartSlice'; // Ensure this path is correct
// import UserNavbar from './UserNavbar';
// import Banner from './Banner';

// // Sample data for brand images
// const brands = [
//   { id: 1, name: 'Ambuja Cement', image: '/ambujaCementImage.png' },
//   { id: 2, name: 'Asianpaints', image: '/asianpaintsImage.png' },
//   { id: 3, name: 'Birla Cement', image: '/birlaa1Image.png' },
//   { id: 4, name: 'BondIt Chemicals', image: '/bonditImage.png' },
//   { id: 5, name: 'Crompton', image: '/cromptonImage.png'},
//   { id: 6, name: 'Godrej', image: '/godrejImage.png'},
//   { id: 7, name: 'Greenpanel', image: '/greenpanelImage.png'},
//   { id: 8, name: 'Greenstone', image:'/greenstone.avif'},
//   { id: 9, name: 'Havells', image:'havellsImage.png'},
//   { id: 10, name: 'Jindal TMT', image:'jindalStellImage.jpg'}
// ];

// const HomePage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [materials, setMaterials] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await axios.get('http://localhost:8085/materials/all');
//         setMaterials(response.data);
//       } catch (err) {
//         setError('Error fetching materials');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:8085/materials/categories');
//         setCategories(response.data);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     };

//     fetchMaterials();
//     fetchCategories();
//   }, []);

//   const filteredMaterials = materials.filter((material) => {
//     if (!material || !material.materialName) {
//       console.error('Invalid material:', material);
//       return false;
//     }
//     const matchesSearchTerm = material.materialName.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
//     return matchesSearchTerm && matchesCategory;
//   });

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center py-8">{error}</div>;

//   const handleBuyNow = (material) => {
//     navigate('/payment', { state: { material } });
//   };

//   const handleAddToCart = (material) => {
//     if (!material.id || !material.unitPrice) {
//       console.error('Invalid material data:', material);
//       return;
//     }
//     dispatch(addItem({ ...material, quantity: 1 }));
//   };

//   const handleViewDetails = (material) => {
//     navigate(`/material/${material.materialId}`); // Navigate to material details page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <UserNavbar />
//       <Banner />

//       <div className="max-w-8xl mx-auto px-4 py-6">
//         <div className="bg-gray-200 py-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-4">Our Trusted Brands</h2>
//             <div className="flex overflow-x-auto space-x-4">
//               {brands.map((brand) => (
//                 <div key={brand.id} className="flex-shrink-0 w-32">
//                   <img src={brand.image} alt={brand.name} className="w-full h-auto object-contain" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-8 mt-5">
//           <div className="w-64 bg-gray-200 py-8 px-4">
//             <h2 className="text-xl font-bold mb-4">Filters</h2>

//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
//               <select
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="All">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-2">Filter by Material Name</h3>
//               <input 
//                 type="text" 
//                 placeholder="Search materials..." 
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex-1">
//             <div className="relative mb-6">
//               <input 
//                 type="text" 
//                 placeholder="Search materials..." 
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FaSearch className="absolute top-2 right-4 text-gray-500" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredMaterials.map((material) => (
//                 <div key={material.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                   <img
//                     src={`data:image/jpeg;base64,${material.picture}`}
//                     alt={material.materialName}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold mb-2">{material.materialName}</h3>
//                     <p className="text-xl font-bold text-blue-600 mb-4">Rs.{material.unitPrice}</p>
//                     <div className="flex space-x-4">
//                       <button
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
//                         onClick={() => handleBuyNow(material)}
//                       >
//                         <FaRegCreditCard />
//                         <span>Buy Now</span>
//                       </button>
//                       <button
//                         className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
//                         onClick={() => handleViewDetails(material)}
//                       >
//                         <FaInfoCircle />
//                         <span>View Details</span>
//                       </button>
//                       <button
//                         className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
//                         onClick={() => handleAddToCart(material)}
//                       >
//                         <FaShoppingCart />
//                         <span>Add to Cart</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <footer className="bg-orange-600 text-white py-4 mt-8 w-full">
//         <div className="text-center">
//           <p>&copy; 2024 Construction Materials Management System. All rights reserved.</p>
//           <p>
//             <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
//             <a href="/terms-of-service" className="hover:underline"> Terms of Service</a>
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaFilter, FaSearch, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../cartSlice'; // Ensure this path is correct
import UserNavbar from './UserNavbar';
import Banner from './Banner';
const BASE_URL = 'http://localhost:8085';
// Sample data for brand images
const brands = [
  { id: 1, name: 'Ambuja Cement', image: '/ambujaCementImage.png' },
  { id: 2, name: 'Asianpaints', image: '/asianpaintsImage.png' },
  { id: 3, name: 'Birla Cement', image: '/birlaa1Image.png' },
  { id: 4, name: 'BondIt Chemicals', image: '/bonditImage.png' },
  { id: 5, name: 'Crompton', image: '/cromptonImage.png' },
  { id: 6, name: 'Godrej', image: '/godrejImage.png' },
  { id: 7, name: 'Greenpanel', image: '/greenpanelImage.png' },
  { id: 8, name: 'Greenstone', image: '/greenstone.avif' },
  { id: 9, name: 'Havells', image: 'havellsImage.png' },
  { id: 10, name: 'Jindal TMT', image: 'jindalStellImage.jpg' }
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [materialNameFilter, setMaterialNameFilter] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // Notification state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:8085/materials/all');
        setMaterials(response.data);
      } catch (err) {
        setError('Error fetching materials');
      } finally {
        setLoading(false);
      }
    };

    // const fetchCategories = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8085/materials/categories');
    //     setCategories(response.data);
    //   } catch (err) {
    //     console.error('Error fetching categories:', err);
    //   }
    // };

    fetchMaterials();
   // fetchCategories();
  }, []);
  useEffect(() => {
    const fetchMaterialsAndCategories = async () => {
      try {
        const materialsResponse = await axios.get(`${BASE_URL}/materials/all`);
        const materialsData = materialsResponse.data;
        setMaterials(materialsData);

        const uniqueCategories = Array.from(new Set(materialsData.map(material => material.category)));
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchMaterialsAndCategories();
  }, []);

  // const filteredMaterials = materials.filter((material) => {
  //   if (!material || !material.materialName) {
  //     console.error('Invalid material:', material);
  //     return false;
  //   }
  //   const matchesSearchTerm = material.materialName.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
  //   return matchesSearchTerm && matchesCategory;
  // });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">{error}</div>;

  const handleBuyNow = (material) => {
    navigate('/checkout', { state: { material } });
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleMaterialNameFilterChange = (e) => {
    setMaterialNameFilter(e.target.value);
  };

  const handleAddToCart = (material) => {
    // Log to inspect the data structure
    console.log("Adding to cart:", material);

    // Ensure correct field names for the cart slice
    const itemToAdd = {
      id: material.materialId, // Match the field expected in cartSlice
      name: material.materialName,
      unitPrice: material.unitPrice,
      quantity: 1,
      picture: material.picture
      // Add any other fields needed for your cart
    };

    dispatch(addItem(itemToAdd));

    // Trigger notification
    setNotification(`${material.materialName} added to cart!`);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const handleViewDetails = (material) => {
    navigate(`/material/${material.materialId}`); // Navigate to material details page
  };

  // Inline styles for notification
  const notificationStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    opacity: 1,
    animation: 'fadeInOut 3s ease-in-out'
  };
  const filteredMaterials = materials.filter((material) => {
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesMinPrice = minPrice === '' || material.unitPrice >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || material.unitPrice <= parseFloat(maxPrice);
    const matchesMaterialName = material.materialName.toLowerCase().includes(materialNameFilter.toLowerCase());
    return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesMaterialName;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <Banner />

      <div className="max-w-8xl mx-auto px-4 py-6">
        <div className="bg-gray-200 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Trusted Brands</h2>
            <div className="flex overflow-x-auto space-x-4">
              {brands.map((brand) => (
                <div key={brand.id} className="flex-shrink-0 w-32">
                  <img src={brand.image} alt={brand.name} className="w-full h-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-5">
          <div className="w-64 bg-gray-200 py-8 px-4">
            {/* <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div> */}

            {/* <div>
              <h3 className="text-lg font-semibold mb-2">Filter by Material Name</h3>
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaFilter className="mr-2" />
              Filter Options
            </h2>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded hover:bg-gray-200 ${selectedCategory === category ? 'bg-gray-200' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-md font-semibold">Filter by Price</h3>
              <div className="flex">
                <input
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  placeholder="Min Price"
                  className="w-full px-4 py-2 border rounded mr-2"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  placeholder="Max Price"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-md font-semibold">Filter by Material Name</h3>
              <input
                type="text"
                value={materialNameFilter}
                onChange={handleMaterialNameFilterChange}
                placeholder="Material Name"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          </div>
          </div>

          <div className="flex-1">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute top-2 right-4 text-gray-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div key={material.materialId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,${material.picture}`}
                    alt={material.materialName}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{material.materialName}</h3>
                    <p className="text-xl font-bold text-blue-600 mb-4">Rs.{material.unitPrice}</p>
                    <div className="flex space-x-4">
                      {/* <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
                        onClick={() => handleBuyNow(material)}
                      >
                        <FaRegCreditCard />
                        <span>Buy Now</span>
                      </button> */}
                      <button
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
                        onClick={() => handleViewDetails(material)}
                      >
                        <FaInfoCircle />
                        <span>View Details</span>
                      </button>
                      <button
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
                        onClick={() => handleAddToCart(material)}
                      >
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div
          style={notificationStyle}
          className="animate-fadeInOut"
        >
          {notification}
        </div>
      )}

      <footer className="bg-orange-600 text-white py-4 mt-8 w-full">
        <div className="text-center">
          <p>&copy; 2024 Construction Materials Management System. All rights reserved.</p>
          <p>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> |
            <a href="/terms-of-service" className="hover:underline"> Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


