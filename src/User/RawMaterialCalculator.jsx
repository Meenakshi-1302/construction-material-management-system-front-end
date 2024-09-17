import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar'; // Ensure the path is correct

const RawMaterialCalculator = () => {
  const [area, setArea] = useState('');
  const [cementBags, setCementBags] = useState(0);
  const [bricks, setBricks] = useState(0);
  const [steelKg, setSteelKg] = useState(0);

  const navigate = useNavigate(); // Initialize navigate function from react-router-dom

  const calculateMaterials = () => {
    const areaInSquareFeet = parseFloat(area);
    if (!isNaN(areaInSquareFeet) && areaInSquareFeet > 0) {
      // For plastering
      const plasterCementBags = areaInSquareFeet * 0.25; // 0.25 bags per sq ft for plaster

      // For bricks
      const totalBricks = areaInSquareFeet * 7; // 7 bricks per sq ft

      // For steel
      const totalSteelKg = areaInSquareFeet * 1; // 1 kg of steel per sq ft

      setCementBags(plasterCementBags);
      setBricks(totalBricks);
      setSteelKg(totalSteelKg);
    } else {
      setCementBags(0);
      setBricks(0);
      setSteelKg(0);
    }
  };

  const handleBuyNow = () => {
    navigate('/home'); // Redirect to the home page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Raw Material Calculator</h2>
          <div className="flex flex-col gap-6">
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2 text-gray-700">Area (in square feet):</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={calculateMaterials}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate
            </button>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Results</h3>
              <div className="bg-gray-200 p-4 rounded-lg shadow-inner">
                <p className="text-lg font-medium text-gray-700">Cement Bags Required (for plastering): <span className="font-bold">{cementBags.toFixed(2)}</span></p>
                <p className="text-lg font-medium text-gray-700">Bricks Required: <span className="font-bold">{bricks}</span></p>
                <p className="text-lg font-medium text-gray-700">Steel Required (in kg): <span className="font-bold">{steelKg}</span></p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RawMaterialCalculator;
