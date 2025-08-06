import React, { useState } from 'react';
import Stepper, { Step } from './Stepper/Stepper';
import { color } from 'framer-motion';
import '../css/Details.css';
import DottedBackground from './Background';
import { style } from 'framer-motion/client';
import { BsCursor } from 'react-icons/bs';
import { cn } from '../lib/utils';
import ScrollPicker from './SingleScroll';
import FloorInputComponent from './floor';
import { useNavigate } from 'react-router-dom';

export const Details = () => {
    const navigate = useNavigate();

    const [selectedGender, setSelectedGender] = useState(null);
    // address, phone number, organisation, floors , parking slots with for floors 

    const [currentValue, setCurrentValue] = useState(null);

  // This MUST be stable (useCallback if defined outside)
  const handleSelection = async (value) => {
    await console.log("Selection received in parent:", value);
    setCurrentValue(value);
  };
    return(
        <div>
            <DottedBackground>
                <Stepper initialStep={1}>
                    <Step onContinue={() => {
                        const nameInput = document.getElementById('name');
                        if (!nameInput.value.trim()) {
                        alert("Please enter your name");
                        return false; // Prevent continuation
                        }
                    }}>
                        <div className="step-content">
                            <h3>Hey There 👋🏻!</h3>
                            <p>We're happy that you've taken the first step towards a healthier you. We need a few details to kickstart your journey.</p>
                            <br />
                            <h3>What is your name?</h3>
                            <input type='name' placeholder='Enter your name' className='input' id="name" />
                        </div>
                    </Step>
                    <Step onContinue={() => {
                        const addressInput = document.getElementById('address');
                        if (!addressInput.value.trim()) {
                        alert("Please enter your Address");
                        return false; // Prevent continuation
                        }
                    }}>
                        <div className="step-content">
                            <h3>Enter Your Location</h3>
                            <input
                                type="text"
                                placeholder="address"
                                className="input"
                                id="address"
                            />
                        </div>
                    </Step>
                    <Step onContinue={() => {
                        const phoneInput = document.getElementById('phone');
                        if (!phoneInput.value.trim()) {
                        alert("Please enter your Phone number");
                        return false; // Prevent continuation
                        }
                    }}>
                        <div className="step-content">
                            <h3>Enter Your Phone number</h3>
                            <input
                                type="number"
                                placeholder="Phone Number"
                                className="input"
                                id="phone"
                            />
                        </div>
                    </Step>
                    <Step>
                        <div className="step-content">
                            <h3>Select the number of floors in your Parking</h3>
                            <ScrollPicker 
                                onSelectionChange={handleSelection} 
                                label="Floor"
                            />
                        </div>
                    </Step>
                    <Step onContinue={() => {
                        navigate('/dashboard')
                        return true; // Allow continuation
                        }}>
                        <div className="step-content">
                            <h3>Enter Parking slots in each floor </h3>
                            <FloorInputComponent floorCount={currentValue} />
                        </div>
                    </Step>
                </Stepper>
            </DottedBackground>
        </div>
    );
} 