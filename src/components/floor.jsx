import React, { useState } from 'react';

const FloorInputComponent = ({ floorCount = 0 }) => {
    
  // Generate array of floor numbers based on floorCount
  const floors = Array.from({ length: floorCount }, (_, index) => index + 1);
  
  const [floorValues, setFloorValues] = useState(() => {
    // Initialize state with empty values for each floor
    const initialValues = {};
    floors.forEach((floor, index) => {
      initialValues[`floor_${index}`] = '';
    });
    return initialValues;
  });

  const [confirmedData, setConfirmedData] = useState(null);

  const handleInputChange = (floorKey, value) => {
    setFloorValues(prev => ({
      ...prev,
      [floorKey]: value
    }));
  };

  const handleConfirm = () => {
    // Create object with floor labels as keys and input values as values
    const confirmedObj = {};
    floors.forEach((floor, index) => {
      const floorKey = `floor_${index}`;
      const floorLabel = `${getOrdinal(floor)} Floor`;
      confirmedObj[floorLabel] = floorValues[floorKey];
    });
    
    setConfirmedData(confirmedObj);
    alert('Confirmed floor data:', confirmedObj);
  };

  const getOrdinal = (num) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-3 py-2 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">Floor Information</h2>
      </div>
      
      <div className="max-h-64 overflow-y-auto px-3 py-2 space-y-2">
        {floors.length === 0 ? (
          <p className="text-gray-500 text-center py-2">No floors to display (floorCount: {floorCount})</p>
        ) : (
          floors.map((floor, index) => {
            const floorKey = `floor_${index}`;
            const floorLabel = `${getOrdinal(floor)} Floor`;
            
            return (
              <div key={floorKey} className="flex items-center justify-between space-x-3">
                <label 
                  htmlFor={floorKey}
                  className="text-sm font-medium text-gray-700 min-w-0 flex-shrink-0"
                >
                  {floorLabel}:
                </label>
                <input
                  id={floorKey}
                  type="text"
                  value={floorValues[floorKey]}
                  onChange={(e) => handleInputChange(floorKey, e.target.value)}
                  placeholder="Enter value"
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            );
          })
        )}
      </div>
      
      {floors.length > 0 && (
        <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleConfirm}
            className="w-full px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 transition-colors"
          >
            Confirm
          </button>
        </div>
      )}
      
      {/* Display confirmed data */}
      {confirmedData && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-1">Confirmed Data:</h3>
          <div className="space-y-0.5">
            {Object.entries(confirmedData).map(([key, value]) => (
              <div key={key} className="text-sm text-blue-700">
                <span className="font-medium">{key}:</span> {value || '(empty)'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorInputComponent;