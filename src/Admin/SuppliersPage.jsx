// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AdminNavbar from './AdminNavbar';

// const BASE_URL = 'http://localhost:8085/suppliers/all';
// const MATERIALS_URL = 'http://localhost:8085/materials/all'; // Replace with your actual materials endpoint
// const REQUEST_URL = 'http://localhost:8085/request'; // Endpoint for sending request data

// const SuppliersPage = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     supplierName: '',
//     materialQuality: '',
//     location: '',
//     estimatedDelivery: '',
//     email: '',
//     contactNumber: '',
//     password: '',
//     material: '',
//     role:'supplier'
//   });
//   const [requestData, setRequestData] = useState({
//     supplierName: '',
//     quality: '',
//     price: '',
//     unitOfMeasure: '',
//     unitInOrder: '',
//     totalAmount: '',
//     address: ''
//   });
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const response = await axios.get(BASE_URL);
//         setSuppliers(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch suppliers');
//         setLoading(false);
//       }
//     };

//     const fetchMaterials = async () => {
//       try {
//         const response = await axios.get(MATERIALS_URL);
//         setMaterials(response.data);
//       } catch (err) {
//         console.error('Failed to fetch materials:', err);
//       }
//     };

//     fetchSuppliers();
//     fetchMaterials();
//   }, []);

//   const handleRequestClick = (supplier) => {
//     setSelectedSupplier(supplier);
//     setRequestData({
//       supplierName: supplier.supplierName,
//       quality: supplier.materialQuality,
//       price: supplier.material.unitPrice,
//       unitOfMeasure: supplier.material.unitOfMeasure, // Set default value if applicable
//       unitInOrder: '',
//       totalAmount: '',
//       address: ''
//     });
//     setIsRequestModalOpen(true);
//   };

//   const handleRequestChange = (e) => {
//     const { name, value } = e.target;
//     setRequestData(prevState => {
//       const updatedData = { ...prevState, [name]: value };
//       // Trigger total amount calculation whenever relevant fields change
//       if (name === 'price' || name === 'unitInOrder') {
//         const price = parseFloat(updatedData.price) || 0;
//         const unitInOrder = parseFloat(updatedData.unitInOrder) || 0;
//         updatedData.totalAmount = (price * unitInOrder).toFixed(2);
//       }
//       return updatedData;
//     });
//   };

//   const handleRequestSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(REQUEST_URL, requestData);
//       alert('Request sent successfully');
//       setIsRequestModalOpen(false); // Close modal after successful submission
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request');
//     }
//   };

//   const handleAddSupplierClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setFormData({
//       supplierName: '',
//       materialQuality: '',
//       location: '',
//       estimatedDelivery: '',
//       email: '',
//       contactNumber: '',
//       password: '',
//       material: ''
//     });
//   };

//   const handleRequestModalClose = () => {
//     setIsRequestModalOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleMaterialChange = (e) => {
//     const { value } = e.target;
//     setFormData({ ...formData, material: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting form data:', formData); // Log form data before sending

//     try {
//       const data = new FormData();
//       data.append("supplierName", formData.supplierName);
//       data.append("materialQuality", formData.materialQuality);
//       data.append("location", formData.location);
//       data.append("estimatedDeliveryDate", formData.estimatedDelivery);
//       data.append("email", formData.email);
//       data.append("contactNumber", formData.contactNumber);
//       data.append("password", formData.password);
//       data.append("materialId", formData.material);
//       const response = await axios.post('http://localhost:8085/suppliers', data);
//       await axios.post('http://localhost:8085/suppliers/sendmail', response.data);
//       console.log('Response from server:', response.data); // Log response from server
//       alert('Supplier added successfully');
//       handleModalClose(); // Close modal after successful submission
//     } catch (err) {
//       console.error('Error adding supplier:', err); // Log error details
//       alert('Failed to add supplier');
//     }
//   };

//   const handleCardClick = (cardName) => {
//     alert(`Clicked on ${cardName}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 relative">
//       <AdminNavbar />
//       <div className="pt-16"> {/* Ensure there's enough top padding for the AdminNavbar */}
//         <div className="p-6">
//           {/* Back Button */}
//           <button 
//             onClick={() => window.history.back()} 
//             className="absolute top-16 left-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//           >
//             Back to AdminDashboard
//           </button>

//           {/* Static Cards Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-12">
//             <div 
//               className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
//               onClick={() => handleCardClick('Cement')}
//             >
//               <img 
//                 src="\cementImage.jpg"
//                 alt="Cement"
//                 className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
//               />
//               <h3 className="text-lg font-semibold mb-2">Cement</h3>
//             </div>
//             <div 
//               className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
//               onClick={() => handleCardClick('Paints')}
//             >
//               <img 
//                 src="\paintImage.jpg"
//                 alt="Paints"
//                 className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
//               />
//               <h3 className="text-lg font-semibold mb-2">Paints</h3>
//             </div>
//             <div 
//               className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
//               onClick={() => handleCardClick('Rods')}
//             >
//               <img 
//                 src="\rodsImage.webp"
//                 alt="Rods"
//                 className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
//               />
//               <h3 className="text-lg font-semibold mb-2">Steel Rods</h3>
//             </div>
//             <div 
//               className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
//               onClick={() => handleCardClick('Bricks')}
//             >
//               <img 
//                 src="\bricks.jfif"
//                 alt="Bricks"
//                 className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
//               />
//               <h3 className="text-lg font-semibold mb-2">Bricks</h3>
//             </div>
//           </div>

//           {/* Suppliers Table Section */}
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
//             <button 
//               onClick={handleAddSupplierClick} 
//               className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
//             >
//               Add Supplier
//             </button>
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b">
//                   <th className="px-4 py-2 text-left">Supplier Name</th>
//                   <th className="px-4 py-2 text-left">Material Quality</th>
//                   <th className="px-4 py-2 text-left">Location</th>
//                   {/* <th className="px-4 py-2 text-left">Estimated Delivery</th> */}
//                   <th className="px-4 py-2 text-left">Email</th>
//                   <th className="px-4 py-2 text-left">Contact Number</th>
//                   <th className="px-4 py-2 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {suppliers.map((supplier) => (
//                   <tr key={supplier.id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRequestClick(supplier)}>
//                     <td className="px-4 py-2">{supplier.supplierName}</td>
//                     <td className="px-4 py-2">{supplier.materialQuality}</td>
//                     <td className="px-4 py-2">{supplier.location}</td>
//                     {/* <td className="px-4 py-2">{supplier.estimatedDelivery}</td> */}
//                     <td className="px-4 py-2">{supplier.email}</td>
//                     <td className="px-4 py-2">{supplier.contactNumber}</td>
//                     <td className="px-4 py-2">
//                       <button 
//                         onClick={() => handleRequestClick(supplier)}
//                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
//                       >
//                         Request
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Add Supplier Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4">
//               <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
//               <form onSubmit={handleFormSubmit}>
//                 {/* Form Fields */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Supplier Name</label>
//                   <input 
//                     type="text" 
//                     name="supplierName" 
//                     value={formData.supplierName} 
//                     onChange={handleInputChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 {/* Add other form fields similarly */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Material</label>
//                   <select 
//                     name="material" 
//                     value={formData.material} 
//                     onChange={handleMaterialChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                   >
//                     <option value="">Select Material</option>
//                     {materials.map(material => (
//                       <option key={material.id} value={material.id}>
//                         {material.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* Add other form fields similarly */}
//                 <div className="flex justify-end">
//                   <button 
//                     type="submit" 
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//                   >
//                     Add Supplier
//                   </button>
//                   <button 
//                     type="button" 
//                     onClick={handleModalClose} 
//                     className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Request Modal */}
//         {isRequestModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4">
//               <h2 className="text-xl font-bold mb-4">Request from Supplier</h2>
//               <form onSubmit={handleRequestSubmit}>
//                 {/* Form Fields */}
                
//                 <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Supplier Id</label>
//                   <input 
//                     type="text" 
//                     name="supplierId" 
//                     value={requestData.supplierId} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                     disabled
//                   />
//                   <label className="block text-gray-700 mb-2">Supplier Name</label>
//                   <input 
//                     type="text" 
//                     name="supplierName" 
//                     value={requestData.supplierName} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Material Quality</label>
//                   <input 
//                     type="text" 
//                     name="quality" 
//                     value={requestData.quality} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Price</label>
//                   <input 
//                     type="number" 
//                     name="price" 
//                     value={requestData.price} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Unit of Measure</label>
//                   <input 
//                     type="text" 
//                     name="unitOfMeasure" 
//                     value={requestData.unitOfMeasure} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Unit I Order</label>
//                   <input 
//                     type="number" 
//                     name="unitInOrder" 
//                     value={requestData.unit} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Total Amount</label>
//                   <input 
//                     type="text" 
//                     name="totalAmount" 
//                     value={requestData.totalAmount} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Address</label>
//                   <input 
//                     type="text" 
//                     name="address" 
//                     value={requestData.address} 
//                     onChange={handleRequestChange} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="flex justify-end">
//                   <button 
//                     type="submit" 
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//                   >
//                     Submit Request
//                   </button>
//                   <button 
//                     type="button" 
//                     onClick={handleRequestModalClose} 
//                     className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuppliersPage;

//====================================================================Working code====================================================================================

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const BASE_URL = 'http://localhost:8085/suppliers/all';
const MATERIALS_URL = 'http://localhost:8085/materials/all'; // Replace with your actual materials endpoint
const REQUEST_URL = 'http://localhost:8085/request';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: '',
    materialQuality: '',
    location: '',
    estimatedDelivery: '',
    email: '',
    contactNumber: '',
    password: '',
    material: '',
    role: 'supplier'
  });
  const [requestData, setRequestData] = useState({
    supplierName: '',
    quality: '',
    price: '',
    unitOfMeasure: '',
    unitInOrder: '',
    totalAmount: '',
    address: ''
  });
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(BASE_URL);
        const updatedSuppliers = response.data.map(supplier => ({
          ...supplier,
          material: supplier.material || {} // Ensure material is always an object
        }));
        setSuppliers(updatedSuppliers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch suppliers');
        setLoading(false);
      }
    };

    const fetchMaterials = async () => {
      try {
        const response = await axios.get(MATERIALS_URL);
        setMaterials(response.data);
      } catch (err) {
        console.error('Failed to fetch materials:', err);
      }
    };

    fetchSuppliers();
    fetchMaterials();
  }, []);

  const handleRequestClick = (supplier) => {
    setSelectedSupplier(supplier);
    setRequestData({
      supplierId: supplier.supplierId,
      supplierName: supplier.supplierName,
      quality: supplier.materialQuality,
      price: supplier.material.unitPrice || '', // Default to empty string if undefined
      unitOfMeasure: supplier.material.unitOfMeasure || '', // Default to empty string if undefined
      unitInOrder: '',
      totalAmount: '',
      address: ''
      
    });
    setIsModalOpen(true);
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestData(prevState => {
      const updatedData = { ...prevState, [name]: value };
      // Trigger total amount calculation whenever relevant fields change
      if (name === 'price' || name === 'unitInOrder') {
        const price = parseFloat(updatedData.price) || 0;
        const unitInOrder = parseFloat(updatedData.unitInOrder) || 0;
        updatedData.totalAmount = (price * unitInOrder).toFixed(2);
      }
      return updatedData;
    });
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(REQUEST_URL, requestData);
      console.log(requestData)
      alert('Request sent successfully');
      setIsModalOpen(false); // Close modal after successful submission
    } catch (err) {
      console.error('Error sending request:', err);
      alert('Failed to send request');
    }
  };

  const handleAddSupplierClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      supplierName: '',
      materialQuality: '',
      location: '',
      estimatedDelivery: '',
      email: '',
      contactNumber: '',
      password: '',
      material: '',
      role: 'supplier'
    });
  };

  const handleRequestModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMaterialChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, material: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Log form data before sending

    try {
      const data = new FormData();
      data.append("supplierName", formData.supplierName);
      data.append("materialQuality", formData.materialQuality);
      data.append("location", formData.location);
      data.append("estimatedDeliveryDate", formData.estimatedDelivery);
      data.append("email", formData.email);
      data.append("contactNumber", formData.contactNumber);
      data.append("password", formData.password);
      data.append("materialId", formData.material);
      const response = await axios.post('http://localhost:8085/suppliers', data);
      await axios.post('http://localhost:8085/suppliers/sendmail', response.data);
      console.log('Response from server:', response.data); // Log response from server
      alert('Supplier added successfully');
      handleModalClose(); // Close modal after successful submission
    } catch (err) {
      console.error('Error adding supplier:', err); // Log error details
      alert('Failed to add supplier');
    }
  };

  const handleCardClick = (cardName) => {
    alert(`Clicked on ${cardName}`);
  };

  const getFilteredSuppliers = () => {
    return suppliers.filter((supplier) => {
      const matchesLocation = supplier.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesMaterial = supplier.material.name ? supplier.material.name.toLowerCase().includes(materialFilter.toLowerCase()) : false;
      return matchesLocation && matchesMaterial;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="pt-16"> {/* Ensure there's enough top padding for the AdminNavbar */}
        <div className="p-6">
          
          {/* Static Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleCardClick('Cement')}
            >
              <img
                src="\cementImage.jpg"
                alt="Cement"
                className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
              />
              <h3 className="text-lg font-semibold mb-2">Cement</h3>
            </div>
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleCardClick('Paints')}
            >
              <img
                src="\paintImage.jpg"
                alt="Paints"
                className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
              />
              <h3 className="text-lg font-semibold mb-2">Paints</h3>
            </div>
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleCardClick('Rods')}
            >
              <img
                src="\rodsImage.webp"
                alt="Rods"
                className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
              />
              <h3 className="text-lg font-semibold mb-2">Steel Rods</h3>
            </div>
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleCardClick('Bricks')}
            >
              <img
                src="\bricks.jfif"
                alt="Bricks"
                className="w-full h-32 object-cover rounded-t-lg mb-4 transition-transform transform hover:scale-110"
              />
              <h3 className="text-lg font-semibold mb-2">Bricks</h3>
            </div>
          </div>

          {/* Suppliers Table Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Supplier Details</h2>
              <button
                onClick={handleAddSupplierClick}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Add Supplier
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Supplier Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Material Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estimated Delivery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {supplier.supplierName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.materialQuality}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.estimatedDeliveryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button
                        onClick={() => handleRequestClick(supplier)}
                        className="text-blue-500 hover:underline"
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Supplier Modal */}
        {isModalOpen && !selectedSupplier && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Add Supplier</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="supplierName">Supplier Name</label>
                  <input
                    type="text"
                    id="supplierName"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="materialQuality">Material Quality</label>
                  <input
                    type="text"
                    id="materialQuality"
                    name="materialQuality"
                    value={formData.materialQuality}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="estimatedDelivery">Estimated Delivery Date</label>
                  <input
                    type="date"
                    id="estimatedDelivery"
                    name="estimatedDelivery"
                    value={formData.estimatedDelivery}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="material">Material</label>
                  <select
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleMaterialChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Select a material</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.materialId}>
                        {material.materialName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Request Material Modal */}
        {isModalOpen && selectedSupplier && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Request Material</h2>
              <form onSubmit={handleRequestSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="supplierName">Supplier Name</label>
                  <input
                    type="text"
                    id="supplierName"
                    name="supplierName"
                    value={requestData.supplierName}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="quality">Material Quality</label>
                  <input
                    type="text"
                    id="quality"
                    name="quality"
                    value={requestData.quality}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={requestData.price}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="unitOfMeasure">Unit of Measure</label>
                  <input
                    type="text"
                    id="unitOfMeasure"
                    name="unitOfMeasure"
                    value={requestData.unitOfMeasure}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="unitInOrder">Unit in Order</label>
                  <input
                    type="number"
                    id="unitInOrder"
                    name="unitInOrder"
                    value={requestData.unitInOrder}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="totalAmount">Total Amount</label>
                  <input
                    type="text"
                    id="totalAmount"
                    name="totalAmount"
                    value={requestData.totalAmount}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="address">Delivery Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={requestData.address}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                 
                  <input
                    type="text"
                    id="suuplierId"
                    name="supplierId"
                    value={requestData.supplierId}
                    onChange={handleRequestChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    hidden
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestModalClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;

