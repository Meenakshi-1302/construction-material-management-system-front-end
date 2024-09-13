import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8085';

const UpdateMaterialPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState({
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

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/materials/${id}`);
        setMaterial(response.data);
      } catch (error) {
        console.error('Failed to fetch material data', error);
      }
    };

    fetchMaterial();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  };

  const handleFileChange = (e) => {
    setMaterial({ ...material, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('materialName', material.materialName);
      formData.append('category', material.category);
      formData.append('description', material.description);
      formData.append('unitOfMeasure', material.unitOfMeasure);
      formData.append('unitPrice', material.unitPrice);
      formData.append('quantity', material.quantity);
      formData.append('dateOfLastPurchase', material.dateOfLastPurchase);
      formData.append('expirationDate', material.expirationDate);
      if (material.picture) {
        formData.append('picture', material.picture);
      }

      await axios.put(`${BASE_URL}/materials/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/materials'); // Redirect back to the materials list page
    } catch (error) {
      console.error('Failed to update material', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Update Material</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <input
          type="text"
          name="materialName"
          value={material.materialName}
          onChange={handleInputChange}
          placeholder="Material Name"
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={material.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          value={material.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="unitOfMeasure"
          value={material.unitOfMeasure}
          onChange={handleInputChange}
          placeholder="Unit of Measure"
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="unitPrice"
          value={material.unitPrice}
          onChange={handleInputChange}
          placeholder="Unit Price"
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          value={material.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          name="dateOfLastPurchase"
          value={material.dateOfLastPurchase}
          onChange={handleInputChange}
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="date"
          name="expirationDate"
          value={material.expirationDate}
          onChange={handleInputChange}
          required
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          type="file"
          name="picture"
          onChange={handleFileChange}
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 text-black px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors duration-300"
          >
            Update Material
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMaterialPage;
