import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const BASE_URL = 'http://localhost:8085/suppliers/all';
const MATERIALS_URL = 'http://localhost:8085/materials/all';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [modalSuppliers, setModalSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    supplierName: '',
    materialQuality: '',
    location: '',
    estimatedDelivery: '',
    email: '',
    contactNumber: '',
    password: '',
    material: ''
  });
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setSuppliers(response.data);
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

  const handleRequestClick = (supplierId) => {
    alert(`Request sent to supplier with ID: ${supplierId}`);
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
      material: ''
    });
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
    console.log('Submitting form data:', formData);
  
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
      console.log('Response from server:', response.data);
      alert('Supplier added successfully');
      handleModalClose();
    } catch (err) {
      console.error('Error adding supplier:', err);
      alert('Failed to add supplier');
    }
  };

  const handleCardClick = (materialName) => {
    if (materialName == 'Cement') {
      const filteredSuppliers = suppliers.filter(supplier => supplier.material.materialName === materialName);
      setModalSuppliers(filteredSuppliers);
      setIsModalOpen(true);
    } else {
      alert(`Clicked on ${materialName}`);
    }
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
              <h3 className="text-lg font-semibold mb-2">Card 1</h3>
              <p>Cement</p>
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
              <h3 className="text-lg font-semibold mb-2">Card 2</h3>
              <p>Paints</p>
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
              <h3 className="text-lg font-semibold mb-2">Card 3</h3>
              <p>Rods</p>
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
              <h3 className="text-lg font-semibold mb-2">Card 4</h3>
              <p>Bricks</p>
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
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.supplierId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.supplierName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.materialQuality}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.material.materialName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.material.unitPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button 
                        onClick={() => handleRequestClick(supplier.supplierId)} 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
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
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Suppliers for {selectedMaterial}</h2>
            {modalSuppliers.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Quality</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {modalSuppliers.map((supplier) => (
                    <tr key={supplier.supplierId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.supplierName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.materialQuality}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{supplier.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No suppliers found for {selectedMaterial}</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersPage;
