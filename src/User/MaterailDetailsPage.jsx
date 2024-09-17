import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../cartSlice'; // Ensure this path is correct
import { FaShoppingCart, FaRegCreditCard } from 'react-icons/fa';
import UserNavbar from './UserNavbar';

const MaterialDetailsPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [material, setMaterial] = useState(null);
  const [similarMaterials, setSimilarMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/materials/${id}`);
        setMaterial(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching material details');
        setLoading(false);
      }
    };

    const fetchSimilarMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:8085/materials/all');
        const allMaterials = response.data;
        const similar = allMaterials.filter((mat) => mat.category === material?.category && mat.id !== id);
        setSimilarMaterials(similar);
      } catch (err) {
        console.error('Error fetching similar materials:', err);
      }
    };

    fetchMaterialDetails();
    fetchSimilarMaterials();
  }, [id, material?.category]);

  const handleBuyNow = () => {
    if (material) {
      // Add the item to the cart
      dispatch(addItem({ ...material, quantity: 1 }));
      // Redirect to checkout page
      navigate('/checkout', { state: { material } });
    }
  };

  const handleAddToCart = () => {
    if (material) {
      dispatch(addItem({ ...material, quantity: 1 }));
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold mt-20">Loading...</div>;
  if (error) return <div className="text-center text-lg font-semibold mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <UserNavbar />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row mb-8">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/3">
            <img
              src={`data:image/jpeg;base64,${material.picture}`}
              alt={material.materialName}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3 md:ml-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{material.materialName}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-2">Category: <span className="text-gray-500">{material.category}</span></p>
            <p className="text-xl font-semibold text-gray-700 mb-2">Unit Price: <span className="text-blue-600">Rs.{material.unitPrice}</span></p>
            <p className="text-xl font-semibold text-gray-700 mb-2">Unit of Measure: <span className="text-gray-500">{material.unitOfMeasure}</span></p>
            <p className="text-lg mt-4 text-gray-600">{material.description}</p>
            {/* Container for buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleBuyNow}
                className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
              >
                <FaRegCreditCard className="text-xl" />
                <span>Buy Now</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-gray-600 text-white px-6 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700 transition"
              >
                <FaShoppingCart className="text-xl" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarMaterials.map((similar) => (
              <div key={similar.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={`data:image/jpeg;base64,${similar.picture}`}
                  alt={similar.materialName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{similar.materialName}</h3>
                  <p className="text-xl font-bold text-blue-600 mb-4">Rs.{similar.unitPrice}</p>
                  <button
                    onClick={() => navigate(`/materials/${similar.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailsPage;
