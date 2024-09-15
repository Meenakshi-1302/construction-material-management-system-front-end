import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaFilter, FaPlus, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const BASE_URL = 'http://localhost:8085';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [materialNameFilter, setMaterialNameFilter] = useState(''); // New state for materialName filter
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    materialId: '',
    materialName: '',
    category: '',
    description: '',
    unitOfMeasure: '',
    unitPrice: '',
    quantity: '',
    dateOfLastPurchase: '',
    expirationDate: '',
    picture: null,
  });
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

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

  const filteredMaterials = materials.filter((material) => {
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesMinPrice = minPrice === '' || material.unitPrice >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || material.unitPrice <= parseFloat(maxPrice);
    const matchesMaterialName = material.materialName.toLowerCase().includes(materialNameFilter.toLowerCase());
    return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesMaterialName;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = async (material = null) => {
    if (material) {
      setNewMaterial({
        ...material,
        picture: null, // Clear picture for editing (optional)
        materialId: material.materialId || '' // Ensure materialId is assigned
      });
      setEditingMaterial(material);
    } else {
      setNewMaterial({
        materialId: '',
        unitPrice: '',
        quantity: '',
        dateOfLastPurchase: '',
      });
      setEditingMaterial(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMaterial(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewMaterial({ ...newMaterial, picture: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('materialName', newMaterial.materialName);
      formData.append('category', newMaterial.category);
      formData.append('description', newMaterial.description);
      formData.append('unitOfMeasure', newMaterial.unitOfMeasure);
      formData.append('unitPrice', newMaterial.unitPrice);
      formData.append('quantity', newMaterial.quantity);
      formData.append('dateOfLastPurchase', newMaterial.dateOfLastPurchase);
      formData.append('expirationDate', newMaterial.expirationDate);
      if (newMaterial.picture) {
        formData.append('picture', newMaterial.picture);
      }

      if (editingMaterial) {
        if (!newMaterial.materialId) {
          throw new Error('Material ID is missing.');
        }
        await axios.put(`${BASE_URL}/materials/${newMaterial.materialId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${BASE_URL}/materials`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Material added successfully!');
      }

      const materialsResponse = await axios.get(`${BASE_URL}/materials/all`);
      setMaterials(materialsResponse.data);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save material', error);
      toast.error('Failed to add material');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this material?');
    if (confirmed) {
      try {
        await axios.delete(`${BASE_URL}/materials/${id}`);
        const materialsResponse = await axios.get(`${BASE_URL}/materials/all`);
        setMaterials(materialsResponse.data);
      } catch (error) {
        console.error('Failed to delete material', error);
        toast.error('Failed to delete material');
      }
    }
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <header className="bg-black-500 text-white p-4 flex items-center justify-between">
        <button className="text-black flex items-center">
          <FaHome className="mr-2" />
          <span>Home</span>
        </button>
        <h1 className="text-xl font-bold">Materials List</h1>
        <div></div>
      </header>
      <div className="flex flex-col lg:flex-row p-6">
        <div className="lg:w-1/4 lg:pr-4 mb-6 lg:mb-0">
          <button
            onClick={handleBack}
            className="bg-orange-600 text-black px-4 py-2 mb-4 rounded-lg flex items-center hover:bg-orange-400 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
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
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Materials List</h2>
              <button
                onClick={() => handleOpenModal()}
                className="bg-orange-600 text-black px-4 py-2 rounded-lg flex items-center hover:bg-orange-400 transition-colors duration-300"
              >
                <FaPlus className="mr-2" />
                Add Material
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  {/* <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Material ID</th> */}
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Unit of Measure</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {currentMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50 transition-colors duration-300">
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.materialId}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <img
                        src={`data:image/jpeg;base64,${material.picture}`}
                        alt={material.materialName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.materialName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.unitOfMeasure}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.unitPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(material.materialId)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-orange-500 text-black p-4 text-center">
        <p>&copy; 2024 Construction Materials Management System. All rights reserved.</p>
      </footer>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h2 className="text-xl font-bold mb-4">{editingMaterial ? 'Edit Material' : 'Add New Material'}</h2>
            <form onSubmit={handleFormSubmit}>
              {editingMaterial && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Material ID</label>
                  <input
                    type="text"
                    name="materialId"
                    value={newMaterial.materialId}
                    readOnly
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Material Name</label>
                  <input
                    type="text"
                    name="materialName"
                    value={newMaterial.materialName}
                    onChange={handleInputChange}
                    placeholder="Material Name"
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={newMaterial.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={newMaterial.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit of Measure</label>
                  <input
                    type="text"
                    name="unitOfMeasure"
                    value={newMaterial.unitOfMeasure}
                    onChange={handleInputChange}
                    placeholder="Unit of Measure"
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={newMaterial.unitPrice}
                    onChange={handleInputChange}
                    placeholder="Unit Price"
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newMaterial.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Purchase</label>
                  <input
                    type="date"
                    name="dateOfLastPurchase"
                    value={newMaterial.dateOfLastPurchase}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                  <input
                    type="date"
                    name="expirationDate"
                    value={newMaterial.expirationDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  name="picture"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 text-black px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors duration-300"
                >
                  {editingMaterial ? 'Update Material' : 'Add Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer /> {/* Include ToastContainer to render notifications */}
    </div>
  );
};

export default MaterialsPage;
