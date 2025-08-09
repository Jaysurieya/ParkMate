import React from 'react';
import ParkingSlots from './Floor-dash';
import SidebarDemo from './Sidebar_layout';

const Dashboard = () => {
    return(
        <div>
            <ParkingSlots 
                numberOfFloors={5} 
                slotsPerFloor={15} 
            />
        </div>
    );
}

export default Dashboard;