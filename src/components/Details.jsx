import React, { useState, useCallback } from 'react'; // 1. Import useCallback for optimization
import Stepper, { Step } from './Stepper/Stepper';
import '../css/Details.css';
import DottedBackground from './Background';
import ScrollPicker from './SingleScroll';
import FloorInputComponent from './floor';
import { useNavigate } from 'react-router-dom';

export const Details = () => {
    const navigate = useNavigate();

    // 2. Consolidate ALL form data into a single state object. This is our "notebook".
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        floorCount: 1, // Start with a valid default
        floorData: {},
    });

    // 3. Create one generic handler for all standard text inputs.
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    // 4. Update handlers for custom components to modify the unified formData state.
    const handleSelection = useCallback((value) => {
        setFormData(prevData => ({
            ...prevData,
            floorCount: value
        }));
    }, []);
    
    const handleFloorDataChange = useCallback((data) => {
        setFormData(prevData => ({
            ...prevData,
            floorData: data
        }));
    }, []);

    const sendDataToBackend = async (data) => {
        // This function remains the same
        try {
            console.log("Sending data to backend:", data);
            const response = await fetch('http://localhost:5000/api/parking-setup/setup ', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, timestamp: new Date().toISOString() })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            console.log("Backend response:", result);
            return result;
        } catch (error) {
            console.error("Error sending data to backend:", error);
            alert("Error saving data. Please try again.");
            throw error;
        }
    };

    const handleFinalStepCompleted = async () => {
        console.log("Final step completed - sending data:", formData);

        // 5. The validation and submission now use the state object directly. No more getElementById!
        try {
            if (!formData.name || !formData.address || !formData.phone || !formData.floorCount) {
                alert("Please fill in all required fields");
                return;
            }
            await sendDataToBackend(formData);
            console.log("Data sent successfully - navigating to dashboard!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Error in final step completion:", error);
        }
    };

    return (
        <div>
            <DottedBackground>
                <Stepper onFinalStepCompleted={handleFinalStepCompleted}>
                    {/* --- Step 1: Name --- */}
                    <Step onContinue={() => !!formData.name.trim()}>
                        <div className="step-content">
                            <h1 style={{fontSize:'50px'}}>👋🏻</h1>
                            
                            <h3>We're happy that you've taken the first step towards a healthier you. We need a few details to kickstart your journey.</h3>
                            <br />
                            <input
                                type='text'
                                placeholder='Enter your name'
                                className='input'
                                name="name" // Matches the key in formData
                                value={formData.name} // Displays the value from state
                                onChange={handleInputChange} // Updates the state
                            />
                        </div>
                    </Step>

                    {/* --- Step 2: Address --- */}
                    <Step onContinue={() => !!formData.address.trim()}>
                        <div className="step-content">
                            <h3>Enter Your Location</h3>
                            <input
                                type="text"
                                placeholder="Address"
                                className="input"
                                name="address" // Matches the key in formData
                                value={formData.address} // Displays the value from state
                                onChange={handleInputChange} // Updates the state
                            />
                        </div>
                    </Step>

                    {/* --- Step 3: Phone --- */}
                    <Step onContinue={() => !!formData.phone.trim()}>
                        <div className="step-content">
                            <h3>Enter Your Phone number</h3>
                            <input
                                type="tel" // Use "tel" for phone numbers
                                placeholder="Phone Number"
                                className="input"
                                name="phone" // Matches the key in formData
                                value={formData.phone} // Displays the value from state
                                onChange={handleInputChange} // Updates the state
                            />
                        </div>
                    </Step>
                    
                    {/* --- Step 4: Floor Count --- */}
                    <Step>
                        <div className="step-content">
                            <h3>Select the number of floors in your Parking</h3>
                            <ScrollPicker 
                                onSelectionChange={handleSelection} 
                                label="Floor"
                            />
                        </div>
                    </Step>
                    
                    {/* --- Step 5: Floor Data --- */}
                    <Step>
                        <div className="step-content">
                            <h3>Enter Parking slots in each floor </h3>
                            <FloorInputComponent 
                                floorCount={formData.floorCount} 
                                onDataChange={handleFloorDataChange}
                            />
                        </div>
                    </Step>
                </Stepper>
            </DottedBackground>
        </div>
    );
};