// import logo from './logo.svg';
// import React from 'react';
import React, { useState, useEffect } from 'react';
import './App.css';// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutUsPage from './About';
import welcomer from './imgs/undraw_web_shopping_re_owap.svg'
import newBusiness from './NewBusiness';
import NewUserAcc from './newUserAcc';
import Products from './Products'

// var page = "default";
function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/plans" element={<newBusiness.PlanSelection />} />
          <Route path="/new-business" element={<newBusiness.NewBusiness />} />
          <Route path="/new-user" element={<NewUserAcc />} />
          {/* <Route path="/new-user" element={<NewUserAcc />} /> */}
          <Route path="/myBusiness" element={<Products />} />
          <Route path='/login' element={<OldUserAcc /> }  />
        </Routes>
    </Router>
    );
}

function Landing(){


  return (
    //   <div id='index'>
    //     <div id="welcome-header">
    //       <h2>MarketMix</h2>
    //       <div id="header-nav">
    //         <Link to="/home" id="route-link">Markets</Link>
    //         <Link to="/about-us" id="route-link">About Us</Link>
    //         <Link to="/login" id="route-link">Sign Up or Log In</Link>
    //         <Link to="#" id="route-link"> Any Questions??</Link>
    //       </div>

    //     </div>
    //     <div id='landing-text'>
    //       <p>
    //         Become part of our growing community of vendors and together lets build a thriving <span id="market" title='A place where people meet and buy or sell goods or services'>marketplace</span>!!
    //       </p>
    //       <img src={welcomer} />
    //     </div>
    // </div>
    <div className="landing-page">
    <header className="header">
      <h1>Welcome to Multi-Vendor Marketplace</h1>
      <p>Your one-stop solution for diverse products from multiple vendors.</p>
      <div id='choose-btn'>
        <Link to="/login" className="cta-button">Start Selling</Link>
        <Link to="/home" className="cta-button">Start Shopping</Link>
      </div>
    </header>
    <section className="features">
      <h2>Why Choose Us?</h2>
      <div className="features-grid">
        <div className="feature">
          <h3>Variety of Products</h3>
          <p>Discover a wide range of products across different categories from various vendors.</p>
        </div>
        <div className="feature">
          <h3>Trusted Vendors</h3>
          <p>We ensure all our vendors are verified to provide you with the best shopping experience.</p>
        </div>
        <div className="feature">
          <h3>Secure Payments</h3>
          <p>Your security is our priority. Enjoy safe and secure payment options.</p>
        </div>
        <div className="feature">
          <h3>Customer Support</h3>
          <p>Our customer support team is here to assist you with any inquiries or issues.</p>
        </div>
      </div>
    </section>
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial">
        <p>"The best marketplace I've ever used! Highly recommended."</p>
        <p>- John Doe</p>
      </div>
      <div className="testimonial">
        <p>"A great platform with a fantastic variety of products."</p>
        <p>- Jane Smith</p>
      </div>
    </section>
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Multi-Vendor Marketplace. All rights reserved.</p>
        <div className="footer-links">
          <Link to={'/about-us'} >About Us</Link>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </div>

  );
}

function Home() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    productName: '',
    priceRange: '',
    productType: '',
    business: '',
    location: '',
    businessType: ''
  });

  // useEffect(() => {
  //   // Fetch products from the backend
  //   axios.get('/api/products')
  //     .then(response => {
  //       setProducts(response.data);
  //       setFilteredProducts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  useEffect(() => {
    // Filter products based on filters
    let tempProducts = products;
    if (filters.productName) {
      tempProducts = tempProducts.filter(product =>
        product.productName.toLowerCase().includes(filters.productName.toLowerCase())
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      tempProducts = tempProducts.filter(product =>
        product.productPrice >= min && product.productPrice <= max
      );
    }
    if (filters.productType) {
      tempProducts = tempProducts.filter(product =>
        product.productType === filters.productType
      );
    }
    if (filters.business) {
      tempProducts = tempProducts.filter(product =>
        product.business === filters.business
      );
    }
    if (filters.location) {
      tempProducts = tempProducts.filter(product =>
        product.location === filters.location
      );
    }
    if (filters.businessType) {
      tempProducts = tempProducts.filter(product =>
        product.businessType === filters.businessType
      );
    }
    setFilteredProducts(tempProducts);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="product-filter-page">
      <h1>Product Listings</h1>
      <div className="filters">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={filters.productName}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="priceRange"
          placeholder="Price Range (e.g. 10-50)"
          value={filters.priceRange}
          onChange={handleFilterChange}
        />
        <select
          name="productType"
          value={filters.productType}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          {/* Add more options as needed */}
        </select>
        <input
          type="text"
          name="business"
          placeholder="Business Name"
          value={filters.business}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select
          name="businessType"
          value={filters.businessType}
          onChange={handleFilterChange}
        >
          <option value="">All Business Types</option>
          <option value="Retail">Retail</option>
          <option value="Wholesale">Wholesale</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item">
            <h3>{product.productName}</h3>
            <p>Price: {product.productPrice}</p>
            <p>Type: {product.productType}</p>
            <p>Business: {product.business}</p>
            <p>Location: {product.location}</p>
            <p>Business Type: {product.businessType}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // return (
    // <div>
    //   <div id="heading">
    //     <div id="first-bar">
    //     <h2>MarketMix</h2>
    //     <select>
    //     <option>Filter By Products</option>
    //       <option>Choose products by categories</option>
    //       <option>Phones, printers and Laptops</option>
    //       <option>Food and drinks</option>
    //       <option>Cars</option>
    //       <option>Jewelry and Accessories</option>
    //       <option>Clothes</option>
    //       <option>Shoes</option>
    //       <option>Cleaning detegants</option>
    //       <option>Furniture and  Appliances</option>
    //       <option>Tools</option>
    //       <option>Home sales</option>
    //       <option>Bags and Luggages</option>
    //       <option>Toys and Games</option>
    //       <option>Gaming consoles and Video games</option>
    //       <option>Books, Movies and Music</option>
    //     </select>
    //     </div>
    //     <div id="menu-bar">
    //       <Link to="/about">About Us</Link>
    //       <Link to="/new-business">Start Selling </Link>
    //       <Link to="#">Log in or Sign up </Link>

    //     </div>
    //   </div>
    //   <br />
    // </div>


  // );
}

function OldUserAcc() {
  const openModal = () => {
    document.getElementById('accountType').style.display = 'block';
  };
  const closeModal = () => {
      document.getElementById('accountType').style.display = 'none';
      console.log(document.getElementById('accountType').style.display)
  };


  const closeWarning = () => {
    document.getElementById("warnings").style.display = "none";
  };


  const showchecks = e => {
          // var missing = 0;
          // const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          // if (!document.getElementById('email').value.match(emailReg)){
          //     document.getElementById("warnings").style.display = "block";
          // }
          // else{
              const users = {
                  email: document.getElementById('email').value,
                  password: document.getElementById('password').value,
              }
              //check for missing values
              // for (let key in users){
              //     if (users[key] === null || users[key] === undefined || users[key] === ""){
              //         missing += 1;
              //     }
              // }
              // if (missing !== 0){
              //     document.getElementById("warnings").style.display = "block";
              // }
              // else{
                const requestOptions = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(users)
                };
                fetch(`http://localhost:3001/accounts/log-users`, requestOptions)
                  .then((response) => {
                    response.json().then((data) => {
                      // console.log(data.success); // Should log { success: "Successful request" }
                      if (data.success === "Successfull request") {
                        console.log(data.user._id)
                        localStorage.setItem("user", data.user._id)
                      }
                      else{
                        console.log("Somethong went wrong")
                      }
                    });
                  })
                  .catch(error => {
                    console.error('Fetch error:', error);
                  });

  };
  return (
      <div style={{height: '100%'}}>
          <h3>Welcome Back to the MarketMix</h3>
          <p>Welcome Back</p>
          <br />
          <div id="new-acc-page">
              <div id="new-page">
                  <p>Email: </p>
                  <input id="email" type="email" placeholder='admin@marketmix.com' />
                  <p>Password: </p>
                  <input id="password" type="password" placeholder='Password' /><br /><br />
                  <button onClick={showchecks} id='LogInId'>Sign In</button><br /><br />
              Don't have an account? <Link to="" id="" onClick={openModal}> Sign Up</Link>
              </div>
          </div>
        <div id='accountType' className='modal-content animate' style={{ display: 'none' }}>
          <span onClick={closeModal} id='closer'>x</span><br /><br /><br />
          <div className='accountType-BTN'>
            <Link to="/new-user" className='cta-button' id="newUser" style={{top: '95px'}}>Prospective Customer</Link><br /><br /><br />
            <Link to="/plans" className='cta-button' id="newBus">Start an Online Business</Link>
          </div>
        </div>

          <div id="warnings">
              <h2>Incorrect Log In</h2>
              <p>Incorrect Email or Password</p>
              <Link id="closeWarning" onClick={closeWarning}>Close</Link>
          </div>
      </div>
  );
}


export default App;

// const data = {
//   sender: document.getElementById("name").value,
//   senderEmail: document.getElementById("email").value,
//   message: document.getElementById("message").value
// };
// const requestOptions = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// };
// fetch(`https://172.203.233.243/SendMessage`, requestOptions)
//   .then(response => {})
//   .then(data => {})
//   .catch(error => {
//     console.error('Fetch error:', error);
//   });


// fetch('https://api.example.com/data', {
//   headers: {
//     'Authorization': 'Bearer your-token',
//     'Content-Type': 'application/json'
//   }
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

// async function fetchData() {
//   try {
//     const response = await fetch('https://api.example.com/data');
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('There has been a problem with your fetch operation:', error);
//   }
// }

// fetchData();