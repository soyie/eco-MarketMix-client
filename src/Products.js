// About.js
import { click } from '@testing-library/user-event/dist/click';
import {React, useState} from 'react';
import { FaHome, FaCartPlus, FaEnvelope,  FaRegIdCard, FaChartArea, FaSearch } from 'react-icons/fa';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, } from 'react-router-dom';
import { Line } from 'chart.js'
// import BusinessHomePage from './businessManagement/BusinessHomePage'

const allProducts = []

//   // const [imageData, setImageData] = useState('');

// 	const requestOptions = {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	};

// 	fetch(`http://localhost:3001/mybusiness/products/all-product/${localStorage.getItem("user")}`, requestOptions)
// 	.then((response) => {
// 	response.json().then((data) => {
//   	  console.log(data)
//   	  // Handle successful res
// 		data.response.forEach(element => {
// 		allProducts.push({id: element._id,
// 		name: element.productName,
// 		price: element.productPrice,
// 		Type: element.productType,
// 		Description: element.productDescription,
// 		company: element.company,
// 		video: element.productVideo},
//   	    // {image: imageData}
// 		)
// 		});

// 	});

// 	})
// 	.catch(error => {
// 		console.error('Fetch error:', error);
// 	});

	// console.log(allProducts)


function BusinessAdminMethod() {


	const [content, setContent] = useState(BusinessHomePage);

        const handleMenu = (selectedItem) => {
            setContent(selectedItem)
        }
	return (
		<div id="businessAdmin">
			<div id='adminMenu'>
			<p>ECOMMERCE</p>
			<a onClick={() => handleMenu(BusinessHomePage)}>Home</a><br /><br />
			<a onClick={() => handleMenu(addNewProduct)}>Add new product</a><br /><br />
			<a onClick={() => handleMenu(productList)}>All product</a><br /><br />
			<a onClick={() => handleMenu(orderList)}>Orders <span id='oders'>5</span></a><br /><br />
			<a onClick={() => handleMenu(specialsList)}>Specials</a><br /><br />
			<a onClick={() => handleMenu(comboList)}>Create Combo</a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Create Discount Code</a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Messages <span id='cust-messages'>12</span></a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Notifications <span id='notifications'>3</span></a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Subscribers</a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Send Alert</a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Find Suppliers</a><br /><br />
			<a onClick={() => handleMenu(BusinessHomePage)}>Settings</a><br /><br />
			</div>
			<div id='adminDisplay'>
			{content}
		</div>
		</div>
	)
}
function BusinessHomePage(){

	return(
		<div>
			<div><FaHome /> Home</div>
			<div id="data-items">
				<div   id="Simple-data" style={{backgroundColor: "lightgreen"}}>
				<div id="icons">
					<FaEnvelope />
				</div>
				<div>
					<h1><span>0</span></h1>
					<p>Customer Messages</p>
				</div>
				</div>
				<div  id="Simple-data" style={{backgroundColor: "orange"}}>
				<div id="icons">
					<FaCartPlus />
				</div>
				<div>
					<h1><span>7</span></h1>
					<p>Unsettled Orders</p>
				</div>
				</div>
				<div id="Simple-data" style={{backgroundColor: "#008080"}}>
				<div id="icons">
					<FaRegIdCard />
				</div>
				<div>
					<h1><span>6</span></h1>
					<p>Subscribers</p>
				</div>
				</div>
			</div>


			<div>
				<p>
				<FaChartArea /> Area chat = Visitors by Month
				</p>
				{/* <Line data={data} options={options} /> */}
			</div>
			<div id="other-data">
				<div>
				<p style={{backgroundColor: "darkgray", color: "snow"}}>Most Sold Product</p>
				<p>https://yourproduct.com</p>
				</div>
				<div>
				<p style={{backgroundColor: "darkgray", color: "snow"}}>Less Sold Product</p>
				<p>https://yourproduct.com</p>
				</div>
				<div>
				<p style={{backgroundColor: "darkgray", color: "snow"}}>Prospective Customers</p>
				<p>9</p>
				</div>
				<div>
				<p style={{backgroundColor: "darkgray", color: "snow"}}>Hired Workers</p>
				<p>https://yourproduct.com</p>
				</div>
			</div>
			<div>

			</div>
		</div>
	)

}

function addNewProduct(){
	var productImageItem = new Object();

	const saveProducts = () =>{
		const productImage = document.getElementById('image').files[0];
		// const imagelist = document.getElementById("MoreImages").files[0];
		// console.log(productImage);
		// console.log(imagelist.length)

		if (productImage){
			const reader = new FileReader();
			reader.onload = function(e) {
				const imageData = e.target.result;
				productImageItem.image = imageData
			};
			reader.readAsDataURL(productImage);
		}
		if (document.getElementById("type").value === ""){
		alert("Type can not be Empty")
		}


		console.log(productImageItem)
		const product = {
		productName: document.getElementById("name").value,
		productPrice: document.getElementById("price").value,
		productType: document.getElementById("type").value,
		productImage: productImageItem,
		productVideo: document.getElementById("video").value,
		productDescription: document.getElementById("description").value,
		company: localStorage.getItem("user")
		}

		var missing = 0;
		for (let key in product){
			console.log(product[key])
			if (product[key] === null || product[key] === undefined || product[key] === ""){
				missing += 1;
			}
		}
		if (missing != 0){
			alert("add some missing data")
		}

		if(missing == 0){
		console.log(product)
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)

		};

		fetch(`http://localhost:3001/mybusiness/products/new-product`, requestOptions)
		.then((response) => {
		response.json().then((data) => {
			console.log(data.productImage);
			if (data.success === "Successful request") {
				// Handle successful response
				console.log(data.productImage)
			}
		});
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
		}
	}

	return(
		<div id='new-product'>
		<p>Product Name: </p>
		<input id="name" type="text" placeholder='Iphone 14 pro max' />
		<p>Price: </p>
		<input type="text" id="price" placeholder='product price ' title='please note that each price we will add 2% for online payment processing'/>
		<p>Product Type: </p>
		<select id='type'>
			<option value="" >Please select</option>
			<option value="Phones" >Phones</option>
			<option value="Printers" >Printers</option>
			<option value="Laptops" >Laptops</option>
			<option value="Drinks">Drinks</option>
			<option value="Food">Food</option>
			<option value="Bikes">Bikes</option>
			<option value="Cars">Cars</option>
			<option value="Jewelry">Jewelry</option>
			<option value="Accessories">Accessories</option>
			<option value="Jackets">Jackets</option>
			<option value="Clothes">Clothes</option>
			<option value="Shoes">Shoes</option>
			<option value="Socks">Socks</option>
			<option value="Cleaning detegants">Cleaning detegants</option>
			<option value="Appliances">Appliances</option>
			<option value="Furniture">Furniture</option>
			<option value="Tools">Tools</option>
			<option value="Home">Home</option>
			<option value="land">Land sales</option>
			<option value="Bags and Luggages">Bags and Luggages</option>
			<option value="Toys">Toys</option>
			<option value="Toys">Toys</option>
			<option value="Gaming consoles">Gaming consoles</option>
			<option value="Video games">Video games</option>
			<option value="Movies">Movies</option>
			<option value="Books">Books</option>
			<option value="Weaves">Weaves</option>
			<option value="Hair products">Hair products</option>
			<option value="Skin care">Skin care</option>
			<option value="Other">Other</option>
		</select>
		<p>Add an image: </p>
		<input type="file" id="image"/>
		<p>Descriptive Video link: </p>
		<input id="video" type="link" placeholder='https://youtube.com/yourVideo' />
		<p>Description: </p>
		<textarea id="description" rows='15' cols="90" placeholder='Describe What your Product'/><br />
		{/* <button onClick={showchecks} id='submitButton'>Submit</button> */}
		<Link id="saveProd" onClick={saveProducts} > Save</Link>
		</div>
	)
}

const item = "";

function productList() {
	const showItem = (i) =>{
		var productItem = []
		console.log(i)
		document.getElementById('modal').style.display = 'block';
		allProducts.forEach(product =>{
			if (product.id == i){
				console.log(product)
				document.getElementById("name").innerHTML = product.name
				document.getElementById("id").innerHTML = product.id
				document.getElementById("price").innerHTML = product.price
				document.getElementById("video").innerHTML = product.video
				document.getElementById("prodtype").innerHTML = product.Type
				document.getElementById("description").innerHTML = product.Description
			}
		})
	};



	const closeModal = () => {
		document.getElementById('modal').style.display = 'none';
		console.log(document.getElementById('modal').style.display)
	};

	const deleteItem = (i) => {
		const requestOptions = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		};

		fetch(`http://localhost:3001/mybusiness/products/all-product/delete/${localStorage.getItem("user")}/${i}`, requestOptions)
		.then((response) => {
		response.json().then((data) => {
		console.log(data)
		});
		})
		.catch(error => {
		console.error('Fetch error:', error);
		});

		console.log(allProducts)

	}

	// console.log(allProducts[1].id)

	return (
		<div id="list-page">
		<input type='text' placeholder='Find Product' /><button><FaSearch /></button>
		<div id="product-list">
			<table style={{ width: '100%' }}>
			<thead>
				<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Product Price</th>
				<th>Category</th>
				<th>Description</th>
				<th>No of Orders</th>
				<th>Action</th>
				</tr>
			</thead>
			<tbody id='tableBody'>
				{allProducts.map((row, index) => (
				<tr key={index}>
					<td>{row.id}</td>
					<td>{row.name}</td>
					<td>{row.price}</td>
					<td>{row.Type}</td>
					<td>{row.Description}</td>
					<td>{index}</td>
					<td><button onClick={() => showItem((row.id))}>More</button></td>
				</tr>
				))}
			</tbody>
			</table>
		</div>
		<div id='modal' className='modal-content animate' style={{ display: 'none' }}>
			<span onClick={closeModal} id='closer'>x</span>
			<h3 id="businessName"></h3>
			<p><spam>Name  </spam><spam id="name"></spam></p>
			<p><spam>Product Id/SKU  </spam><spam id="id"></spam></p>
			<p><spam>Price  </spam><spam id="price"></spam></p>
			<p><spam>Type  </spam><spam id="prodtype"></spam></p>
			<p><spam>Video Link  </spam><spam id="video"></spam></p>
			<p><spam>Description  </spam><spam id="description"></spam></p>

			<button onClick={() => deleteItem((document.getElementById("id").value))}>Delete</button>
		</div>
		</div>
	)
}


function orderList(){

  const openModal = () => {
    document.getElementById('modal').style.display = 'block';
  };
  
  const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
    console.log(document.getElementById('modal').style.display)
  };

  return(
    <div id="list-page">
      <input type='text' placeholder='Find Product' /><button><FaSearch /></button>
      <div id="product-list">
      <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Ordered by</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>User Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id_648bvge5r7g</td>
              <td>Andile</td>
              <td>2</td>
              <td>Location Id</td>
              <td>id_user-456ufrcjfdv</td>
              <td><a href='#' onClick={openModal}>More</a></td>
            </tr>
            <tr>
              <td>id_648bvge5r7g</td>
              <td>Andile</td>
              <td>6</td>
              <td>lat: 12.432.563, long: 34.5653.646</td>
              <td>id_user-456ufrcjfdv</td>
              <td><a href='#' onClick={openModal}>More</a></td>
            </tr>
            <tr>
              <td>id_648bvge5r7g</td>
              <td>Andile</td>
              <td>1</td>
              <td>lat: 12.432.563, long: 34.5653.646</td>
              <td>id_user-456ufrcjfdv</td>
              <td><a href='#' onClick={openModal}>More</a></td>
            </tr>
            <tr>
              <td>id_648bvgsffr</td>
              <td>Sive</td>
              <td>1</td>
              <td>lat: 12.432.563, long: 34.5653.646</td>
              <td>id_user-456u6789fdv</td>
              <td><a href='#' onClick={openModal}>More</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id='modal' className='modal-content animate' style={{ display: 'none' }}>
        <span onClick={closeModal} id='closer'>x</span>
      </div>
    </div>
  )
}


function specialsList(){

	const openModal = () => {
		document.getElementById('modal').style.display = 'block';
	};

	const closeModal = () => {
		document.getElementById('modal').style.display = 'none';
	};

	const openSpecial = () => {
	  document.getElementById('specialModal').style.display = 'block';
	};

	const closeSpecial = () => {
		document.getElementById('specialModal').style.display = 'none';
	};

	const newSpecial = (id) =>{
		allProducts.forEach(product =>{
			if (product.id == id){
				console.log(product)
				document.getElementById("name").innerHTML = product.name
				document.getElementById("id").innerHTML = product.id
				document.getElementById("price").innerHTML = product.price
				document.getElementById("prodtype").innerHTML = product.Type
				document.getElementById("description").innerHTML = product.Description
			}
		})
	}

  return(
    <div id="specials-page">
		<button onClick={openSpecial}>Add New Special</button><br />
		<input type='text' placeholder='Find Product' /><button><FaSearch /></button>
		<div id="product-list">
		<table style={{ width: '100%' }}>
			<thead>
				<tr>
				<th>Product Id</th>
				<th>Product Name</th>
				<th>Start date</th>
				<th>End date</th>
				<th>Target</th>
				<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<td>id_648bvge5r7g</td>
				<td>Iphone 3</td>
				<td>2/12/2023</td>
				<td>23/05/2024</td>
				<td>23</td>
				<td><a href='#' onClick={openModal}>More</a></td>
				</tr>
				<tr>
				<td>id_648bvge5r7g</td>
				<td>Samsung Galaxy S22</td>
				<td>3/05/2023</td>
				<td>23/05/2024</td>
				<td>12</td>
				<td><a href='#' onClick={openModal}>More</a></td>
				</tr>
				<tr>
				<td>id_648bvge5r7g</td>
				<td>Asus Vivobook</td>
				<td>3/05/2023</td>
				<td>3/06/2023</td>
				<td>10</td>
				<td><a href='#' onClick={openModal}>More</a></td>
				</tr>
				<tr>
				<td>id_648bvgsffr</td>
				<td>Sansui NoteBook</td>
				<td>3/05/2023</td>
				<td>3/06/2023</td>
				<td>10</td>
				<td><a href='#' onClick={openModal}>More</a></td>
				</tr>
			</tbody>
			</table>
		</div>
		<div id='modal' className='modal-content animate' style={{ display: 'none' }}>
			<span onClick={closeModal} id='closer'>x</span>
		</div>
		<div id='specialModal' className='modal-content animate'>
        <span onClick={closeSpecial} id='closer'>X</span>
		<div  style={{display:"flex"}}>
			<div style={{flex:"1"}}>
				{allProducts.map((row, index) => (
					<ul key={index}>
						<li onClick={() => newSpecial(row.id)} style={{cursor: "pointer"}}>{row.name}<span style={{padding: '23px'}}></span>{row.price}</li>
						{/* <td><button onClick={() => showItem((row.id))}>More</button></td> */}
					</ul>
				))}
			</div>
			<div style={{flex:"2"}}>
				<h3> No Selected product</h3>
			</div>
			<div style={{flex:"2"}}>
				<form>
					<p>New special Price</p>
					<input type='phone' placeholder='New Price' />
					<p>Target you wish to reach</p>
					<input type='phone' placeholder='Target Number of buyers' />
					<p>Start Date</p>
					<input type='date' />
					<p>End Date</p>
					<input type='date' />
				</form>
			</div>
		</div>

	  </div>
    </div>
  )
}


function comboList(){

  const prods = []
  return(
    <div id="specials-page">
      <button>Add New Special</button><br />
      <input type='text' placeholder='Find Product' /><button><FaSearch /></button>
      <div id='create-combo'>
        <div id="products-list">
        {allProducts.map((row, index) => (
          <div key={index}>
          <button onClick={console.log(productList.productFile.image)}>Save</button>
          <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvge5r7g")}}><img src={productList.productFile.image} /></div>
          </div>
        ))}
              {/* <tr key={index}> */}
                {/* <td>{row.productDescription}</t */}
              
              {/* <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvge5r7g")}}>Samsung Galaxy S22</div>
              <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvge5r7g")}}>Asus Vivobook</div>
              <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvgsffr")}}>Sansui NoteBook</div> */}
        </div>

        <div id='drag-zone' onDragOver={(event) => {
          event.preventDefault()
        }} onDrop={(event) =>{
        event.preventDefault();
        const data = event.dataTransfer.getData("id");
        prods.push(data);
        if (prods.length != 0){
          console.log(prods)
          // prods.forEach((prod) =>{
            document.getElementById("showIdSt").innerHTML = "<p>"+prods+"<br /><br /></p>"
          // })
          document.getElementById("saveSpecial").style.display = 'block';
        }
        // else if (prods.length !=0){
        //   console.log(prods)
        // }
        }}>
          <div id='showIdSt'></div>
          <button id="saveSpecial">Save</button>
        </div>
        <div id="onGoingSpecials">
          <></>
        </div>
      </div>

    </div>
  )
}


function discountCodeList(){
  var prods = [];
  return(
    <div id="specials-page">
      <button>Add New Special</button><br />
      <input type='text' placeholder='Find Product' /><button><FaSearch /></button>
      <div id='create-combo'>
        <div id="products-list">
              <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvge5r7g")}}>Iphone 3</div>
              <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvge5r7g")}}>Samsung Galaxy S22</div>
              <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvge5r7g")}}>Asus Vivobook</div>
              <div draggable = 'true' onDragStart={(event) => {event.dataTransfer.setData("id", "id_648bvgsffr")}}>Sansui NoteBook</div>
        </div>

        <div id='drag-zone' onDragOver={(event) => {
          event.preventDefault()
        }} onDrop={(event) =>{
        event.preventDefault();
        const data = event.dataTransfer.getData("id");
        prods.push(data);
        if (prods.length != 0){
          console.log(prods)
          // prods.forEach((prod) =>{
            document.getElementById("showIdSt").innerHTML = "<p>"+prods+"<br /><br /></p>"
          // })
          document.getElementById("saveSpecial").style.display = 'block';
        }
        // else if (prods.length !=0){
        //   console.log(prods)
        // }
        }}>
          <div id='showIdSt'></div>
          <button id="saveSpecial">Save</button>
        </div>
        <div id="onGoingSpecials">
          <></>
        </div>
      </div>

    </div>
  )
}




export default BusinessAdminMethod;
