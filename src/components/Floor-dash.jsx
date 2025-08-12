import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { Car } from 'lucide-react';

export default function ParkingSlots() {
  const [parkingData, setParkingData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch parking setup details from backend
  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/parking-setup/latest");
        const data = await response.json();
        setParkingData(data.setup);
      } catch (error) {
        console.error("Failed to fetch parking data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParkingData();
  }, []);

  // Helper to get slot status from floorData if available, else random for demo
  const getSlotStatus = (floorIdx, slotIdx) => {
    if (
      parkingData &&
      parkingData.floorData &&
      parkingData.floorData[floorIdx] &&
      parkingData.floorData[floorIdx].slots &&
      parkingData.floorData[floorIdx].slots[slotIdx]
    ) {
      return parkingData.floorData[floorIdx].slots[slotIdx].status || "available";
    }
    // fallback: random for demo
    return Math.random() > 0.7 ? "occupied" : "available";
  };

  if (loading) {
    return <div className="text-center py-10">Loading parking slots...</div>;
  }

  if (!parkingData) {
    return <div className="text-center py-10 text-red-500">No parking setup found.</div>;
  }

  const numberOfFloors = parkingData.floorCount;
  const slotsPerFloor = parkingData.floorData && parkingData.floorData[0]?.slots?.length
    ? parkingData.floorData[0].slots.length
    : 0;

  const generateSlotNumber = (floor, slotIndex) => {
    return `${floor}${String(slotIndex + 1).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parking Management System</h1>
          <p className="text-gray-600">Select your preferred parking slot</p>
        </div>

        <div className="space-y-8">
          {Array.from({ length: numberOfFloors }, (_, floorIndex) => {
            const floorNumber = floorIndex + 1;
            return (
              <Card key={floorNumber} className="w-full">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Car className="w-6 h-6" />
                    Floor {floorNumber}
                    <span className="ml-auto text-sm font-normal">
                      {slotsPerFloor} slots available
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {Array.from({ length: slotsPerFloor }, (_, slotIndex) => {
                      const slotNumber = generateSlotNumber(floorNumber, slotIndex);
                      const status = getSlotStatus(floorIndex, slotIndex);

                      return (
                        <Button
                          key={slotNumber}
                          variant={status === 'occupied' ? 'destructive' : 'outline'}
                          className={`
                            h-16 w-full flex flex-col items-center justify-center text-xs font-semibold
                            ${status === 'available'
                              ? 'hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                              : 'cursor-not-allowed opacity-60'
                            }
                          `}
                          disabled={status === 'occupied'}
                        >
                          <Car className="w-4 h-4 mb-1" />
                          {slotNumber}
                        </Button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-600">Occupied</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{numberOfFloors}</div>
                <div className="text-sm text-gray-600">Total Floors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{numberOfFloors * slotsPerFloor}</div>
                <div className="text-sm text-gray-600">Total Slots</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{slotsPerFloor}</div>
                <div className="text-sm text-gray-600">Slots per Floor</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}