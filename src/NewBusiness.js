// About.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useHref, useNavigate  } from 'react-router-dom';
import item from './imgs/undraw_online_shopping_re_k1sv.svg'


var chosenPlan = '';

const PlanSelection = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            name: 'White',
            price: 'Free',
            description: 'Access to basic features.',
            features: [
                'Vendor Profile',
                'Product Listings (10 products)',
                'Order Management',
                'Customer Management',
                'Basic Analytics',
                'Basic Support (email support with limited hours)',
                'Limited Storage (100 MB)',
            ],
        },
        {
            name: 'Premium',
            price: '$10/month',
            description: 'Affordable plan with more features.',
            features: [
                'Vendor Profile',
                'Unlimited Product Listings',
                'Order Management',
                'Customer Management',
                'Advanced Analytics',
                'Priority Support (phone and email support with extended hours)',
                'Increased Storage (1 GB)',
                'Discounted Transaction Fees (8%)',
            ],
        },
        {
            name: 'Gold',
            price: '$30/month',
            description: 'Advanced features for growing businesses.',
            features: [
                'Vendor Profile',
                'Unlimited Product Listings',
                'Order Management',
                'Customer Management',
                'Advanced Analytics',
                'Priority Support',
                'Dedicated Account Manager',
                'Advanced Product Options (product variations, bundles)',
                'Increased Storage (5 GB)',
                'Free Setup and Support (dedicated onboarding and support)',
            ],
        },
        {
            name: 'Black',
            price: '$100/month',
            description: 'All-inclusive plan for large enterprises.',
            features: [
                'Vendor Profile',
                'Unlimited Product Listings',
                'Order Management',
                'Customer Management',
                'Advanced Analytics',
                'Priority Support',
                'Dedicated Account Manager',
                'Advanced Product Options',
                'Unlimited Storage',
                'Custom Development (custom integrations, API access)',
                'Dedicated Server',
                'Personalized Support (dedicated support manager)',
            ],
        },
    ];

    const handleSelectPlan = (planName) => {
        setSelectedPlan(planName);
    };
    const href = useHref("/new-business");
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log(`Selected Plan: ${selectedPlan}`);
        chosenPlan = selectedPlan;
        navigate(href)
        // You can add the code to handle the submission, like sending the selected plan to the server.
    };

    return (
        <div className="plan-selection">
            <h1>Choose Your Plan</h1>
            <div className="plans-container">
                {plans.map((plan) => (
                    <div 
                        key={plan.name} 
                        className={`plan-card ${selectedPlan === plan.name ? 'selected' : ''}`}
                        onClick={() => handleSelectPlan(plan.name)}
                    >
                        <h2>{plan.name}</h2>
                        <h3>{plan.price}</h3>
                        <p>{plan.description}</p>
                        <ul>
                            {plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} disabled={!selectedPlan}>Continue</button>
        </div>
    );
};


function NewBusiness() {
    const [isOpen, setIsOpen] = useState(false);
    const [soldProducts, setSoldProducts] = useState([]);
    const [error, setError] = useState('');


    const validateEmail = (email) => {
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailReg.test(email);
    };

    const validateLink = (link) => {
        const linkReg = /^https?:\/\/[^\s]+$/;
        return linkReg.test(link);
    };

    const checker = () => {
        const soldProductElements = document.getElementsByName('soldProducts[]');
        const selectedProducts = [];
        for (let i = 0; i < soldProductElements.length; i++) {
            if (soldProductElements[i].checked) {
                selectedProducts.push(soldProductElements[i].value);
            }
        }
        setSoldProducts(selectedProducts);
    };

    const allSoldStuff = () => {
        setIsOpen(!isOpen);
    };

    const showchecks = async (e) => {
        e.preventDefault();
        setError('');
    
        const ownerName = document.getElementById('owner-name').value;
        const ownerSurname = document.getElementById('surname').value;
        const dateOfBirth = document.getElementById('date').value;
        const email = document.getElementById('email').value;
        const businessName = document.getElementById('business-name').value;
        const location = document.getElementById('location').value;
        const phone = document.getElementById('phone').value;
        const background = document.getElementById('background').value;
        const facebook = document.getElementById('link').value;
        const instagram = document.getElementById('insta').value;
        const x = document.getElementById('x').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const description = document.getElementById('description').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
    
        const productImage = document.getElementById('back-image').files[0];
        const iconImage = document.getElementById('icon').files[0];
    
        // Collect checked checkboxes
        checker();
    
        setTimeout(() => {
            if (!ownerName || !ownerSurname || !dateOfBirth || !email || !businessName || !location || !phone || !facebook || !instagram || !x || !description || soldProducts.length === 0 || !validateEmail(email) || !validateLink(facebook) || !validateLink(instagram) || !validateLink(x)) {
                console.log(soldProducts);
                setError("Please fill out all required fields.");
                return;
            }
            if (password !== password2) {
                setError("Passwords do not match.");
                return;
            }
    
            if (!productImage || !iconImage) {
                setError("Please upload both a product image and an icon image.");
                return;
            }
    
            const imageListing = new FormData();
            imageListing.append('ownerName', ownerName);
            imageListing.append('ownerSurname', ownerSurname);
            imageListing.append('dateOfBirth', dateOfBirth);
            imageListing.append('email', email);
            imageListing.append('businessName', businessName);
            imageListing.append('location', location);
            imageListing.append('phone', phone);
            imageListing.append('background', background);
            imageListing.append('facebook', facebook);
            imageListing.append('instagram', instagram);
            imageListing.append('x', x);
            imageListing.append('whatsapp', whatsapp);
            imageListing.append('description', description);
            imageListing.append('password', password);
            imageListing.append('products', soldProducts);
            imageListing.append('productImage', productImage);
            imageListing.append('iconImage', iconImage);
    
            try {
                fetch('http://localhost:3001/accounts/new-business', {
                    method: 'POST',
                    body: imageListing,
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success === "Successful request") {
                        console.log(data);
                        // Handle successful response, e.g., save user ID or navigate to another page
                    } else {
                        setError("Something went wrong. Please try again.");
                    }
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    setError("An error occurred while sending data. Please try again.");
                });
            } catch (error) {
                console.error('Fetch error:', error);
                setError("An error occurred while sending data. Please try again.");
            }
        }, 5000); // 5-second delay before executing the fetch call
    };

    return (
        <div id="newBusinessMain">
            <h3>Welcome to the eco-MarketMix</h3>
            <p>Creating a new Account</p>
            <br />
            <div id="createBusinessAcc">
                <div id="createBusinessAccL">
                    <p>Owner's Name: </p>
                    <input type="text" placeholder='Marketer' id='owner-name' />
                    <p>Owner's Surname: </p>
                    <input id="surname" type="text" placeholder='Mixer' />
                    <p>Date of Birth: </p>
                    <input id='date' type="date" />
                    <p>User Email: </p>
                    <input id="email" type="email" placeholder='admin@marketmix.com' />
                    <p>Business Name: </p>
                    <input id="business-name" type="text" placeholder='MarketMix' />
                    <p>Where Are you located: </p>
                    <input id="location" type="text" placeholder='Umtata' />
                    <p>Phone Number: </p>
                    <input id="phone" type="text" placeholder='012345689' />
                    <p>Whatsapp details: </p>
                    <input id="whatsapp" type="text" placeholder='012345689' />
                    <p>Facebook profile link: </p>
                    <input id="link" type="link" placeholder='facebook' />
                    <p>Password: </p>
                    <input id="password" type="password" placeholder='Password' />
                    <p>Repeat Password: </p>
                    <input id="password2" type="password" placeholder='Repeat Password' />
                </div>
                <div id="createBusinessAccR">
                    <p>Please select what you sell: </p>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={allSoldStuff}>Select Options</button>
                        <div className="dropdown-content">
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Phones, printers and Laptops" />Phones, printers and Laptops</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Food and drinks" />Food and drinks</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Cars" />Cars</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Jewelry and Accessories" />Jewelry and Accessories</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Clothes" />Clothes and Jackets</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Shoes" />Shoes and Socks</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Cleaning detergents" />Cleaning detergents</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Furniture and Appliances" />Furniture and Appliances</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Tools" />Tools</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Home sales" />Home and Land sales</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Bags and Luggages" />Bags and Luggages</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Toys and Games" />Toys and Games</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Gaming consoles and Video games" />Gaming consoles and Video games</label><br />
                            <label>
                                <input name="soldProducts[]" type="checkbox" value="Books, Movies and Music " />Books, Movies and Music </label><br />
                            <label>
                                <input name="soldProducts[]" type='checkbox' value="Other" />Weaves, Hair products, and skin care</label><br />
                            <label>
                                <input name="soldProducts[]" type='checkbox' value="Other" />Other</label><br />
                        </div>
                    </div>
                    <p>Choose a background color: </p>
                    <input id="background" type="color" title='this color will show behind your products' />
                    <p>Choose a background image: </p>
                    <input type="file" id="back-image" accept='image/*' />
                    <p>Add a Business Icon: </p>
                    <input type="file" id="icon" accept='image/*' />
                    <p>Instagram profile link: </p>
                    <input id="insta" type="link" placeholder='instagram' />
                    <p>X profile link: </p>
                    <input id="x" type="link" placeholder='X' />
                    <p>Brief about your business: </p>
                    <textarea id="description" rows='15' cols="90" placeholder='Describe What you sell' /><br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={showchecks} id='submitButton'>Submit</button>
                </div>
            </div>
        </div>
    );
}




export default {PlanSelection, NewBusiness};
