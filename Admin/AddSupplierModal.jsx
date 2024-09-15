import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddSupplierModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    reorderLevel: '',
    status: '',
    batchNumberOrSerialNumber: '',
    materialId: '' // Ensure field name matches the select input
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [materialOptions, setMaterialOptions] = useState([]); // To store the material options

  useEffect(() => {
    const fetchMaterialOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8085/materials/all'); // Adjust the endpoint as needed
        console.log('Material options fetched:', response.data); // Debugging
        setMaterialOptions(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterialOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("reorderLevel", formData.reorderLevel);
      data.append("status", formData.status);
      data.append("batchNumberOrSerialNumber", formData.batchNumberOrSerialNumber);
      data.append("materialId", formData.materialId); // Ensure field name matches the select input

      await axios.post('http://localhost:8085/inventory/add', data);

      // Display success notification
      Swal.fire({
        icon: 'success',
        title: 'Inventory Added',
        text: 'The inventory was added successfully.',
        confirmButtonText: 'OK'
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error adding inventory:', error);
      // Display error notification
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue adding the inventory. Please try again.',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Inventory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">ReOrder Level</label>
            <input
              type="number"
              name="reorderLevel"
              value={formData.reorderLevel}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Batch Number or Serial Number</label>
            <input
              type="text"
              name="batchNumberOrSerialNumber"
              value={formData.batchNumberOrSerialNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Material ID</label>
            <select
              name="materialId"
              value={formData.materialId} // Ensure this matches the state field name
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Select Material</option>
              {materialOptions.map((material) => (
                <option key={material.id} value={material.materialId}>
                  {material.materialName} {/* Ensure the property name matches the API response */}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;
