// About.js
// import React, { useState } from 'react';
// import item from './imgs/undraw_online_shopping_re_k1sv.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function NewUserAcc() {


    const showchecks = e => {
        if (document.getElementById('password').value === document.getElementById('password2').value ){
            var missing = 0;
            const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!document.getElementById('email').value.match(emailReg)){
                alert("fix your email")
            }
            else{
                const today = new Date(Date.now());
                const users = {
                    name: document.getElementById('name').value,
                    surname: document.getElementById('surname').value,
                    dateOfBirth: document.getElementById('date').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    phone: document.getElementById('phone').value,
                    regDate: today,
                    lastLogin: today
                }
                for (let key in users){
                    if (users[key] === null || users[key] === undefined || users[key] === ""){
                        missing += 1;
                    }
                }
                if (missing !== 0){
                    alert("please add the missing items")
                }
                else{
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(users)
                    };
                    fetch(`http://localhost:3001/accounts/new-user`, requestOptions)
                        .then((response) => {
                            response.json().then((data) => {
                                console.log(data); // Should log { success: "Successful request" }
                                if (data.success === "Successful request") {
                                  // Handle successful response
                                    console.log(data)

                                    alert("Account created successfully now you can simply subscribe to businesses and get discounts and notification when the are specials")
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                            alert("something wrong happened but don't worry my admin now knows, we are fixing it")
                        });
                }
            }
        }
        else{
            alert("Please Fix your password")
        }

        // console.log(document.getElementById('owner-name').value);
        // console.log(document.getElementById('surname').value);
        // console.log(document.getElementById('date').value);
        // console.log(document.getElementById('email').value);

        // console.log(document.getElementById('business-name').value);
        // console.log(document.getElementById('location').value);
        // console.log(document.getElementById('background').value);
        // console.log(document.getElementById('back-image').value);
        // console.log(document.getElementById('icon').value);
        // console.log(document.getElementById('description').value);
    };
    return (
        <div id="acc-body">
            <h3>Welcome to the MarketMix</h3>
            <p>Creating a new Account</p>
            <br />
            <div id="new-acc-page">
                <div id="new-page">
                    <p>Name: </p>
                    <input type="text" placeholder='Sonwabo' id='name'/>
                    <p>Surame: </p>
                    <input id="surname" type="text" placeholder='Matola' />
                    <p>Date of Birth: </p>
                    <input id='date' type="date" />
                    <p>Email: </p>
                    <input id="email" type="email" placeholder='admin@marketmix.com' />
                    <p>Password: </p>
                    <input id="password" type="password" placeholder='Password' />
                    <p>Repeat Password: </p>
                    <input id="password2" type="password" placeholder='Repeat Password' />
                    <p>Phone Number: </p>
                    <input id="phone" type="phone" placeholder='0123456789' />
                    <button onClick={showchecks}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}


function oldUserAcc() {


    const showchecks = e => {
            var missing = 0;
            const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!document.getElementById('email').value.match(emailReg)){
                document.getElementById("warnings").style.display = "block";
            }
            else{
                const users = {
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                }
                for (let key in users){
                    if (users[key] === null || users[key] === undefined || users[key] === ""){
                        missing += 1;
                    }
                }
                if (missing !== 0){
                    document.getElementById("warnings").style.display = "block";
                }
                else{
                    console.log(users)
                }
            }
    };
    return (
        <div id="acc-body">
            <h3>Welcome Back to the MarketMix</h3>
            <p>Log In</p>
            <br />
            <div id="new-acc-page">
                <div id="new-page">
                    <p>Email: </p>
                    <input id="email" type="email" placeholder='admin@marketmix.com' />
                    <p>Password: </p>
                    <input id="password" type="password" placeholder='Password' />
                    <button onClick={showchecks}>Sign Up</button>
                </div>
            </div>

            <div id="warnings">
                <h2>Incorrect Log In</h2>
                <p>Incorrect Email or Password</p>
                <Link id="" onClick="">Close</Link>
            </div>
        </div>
    );
}


export default NewUserAcc;
