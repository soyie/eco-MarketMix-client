// About.js
import React from 'react';


const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to MarketMix, your premier destination for multi-vendor e-commerce solutions! Our platform is designed to empower businesses of all sizes to reach a global audience, offering a seamless and user-friendly experience for both vendors and customers.</p>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>At MarketMix, our mission is to create an inclusive and dynamic marketplace that fosters growth and innovation. We aim to provide businesses with the tools they need to succeed in the competitive world of online retail, while offering customers a diverse range of products and services at their fingertips.</p>
      </div>

      <div className="what-is-section">
        <h2>What is Multi-Vendor E-commerce?</h2>
        <p>Multi-vendor e-commerce platforms allow multiple vendors to sell their products and services through a single storefront...</p>
      </div>

      <div className="why-choose-section">
        <h2>Why Choose MarketMix?</h2>
        <ol>
          <li>Comprehensive Vendor Management</li>
          <li>Customizable Storefronts</li>
          <li>Advanced Analytics</li>
          {/* <li>Secure Transactions</li> */}
          <li>Customer Support</li>
          <li>10x Cheaper than hiring a developer to create a website</li>
        </ol>
      </div>

      <div className="vision-section">
        <h2>Our Vision</h2>
        <p>We envision a future where MarketMix is the go-to platform for multi-vendor e-commerce, known for its innovation, reliability, and commitment to empowering businesses...</p>
      </div>

      <div className="join-us-section">
        <h2>Join Us Today!</h2>
        <p>Whether you're a vendor looking to expand your reach or a customer searching for the best products and deals, MarketMix is the place for you. Join our vibrant community today and experience the future of e-commerce!</p>
      </div>

      <div className="additional-info-section">
        <h2>Additional Information on Multi-Vendor E-commerce</h2>
        <p>Multi-vendor e-commerce platforms like MarketMix represent a growing trend in the online retail space...</p>
      </div>

      <style jsx>{`
        .about-us-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .about-us-header {
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .mission-section,
        .what-is-section,
        .why-choose-section,
        .vision-section,
        .join-us-section,
        .additional-info-section {
          margin-bottom: 30px;
        }

        .mission-section h2,
        .what-is-section h2,
        .why-choose-section h2,
        .vision-section h2,
        .join-us-section h2,
        .additional-info-section h2 {
          color: #333;
        }

        .why-choose-section ol {
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
}

export default AboutUsPage;
