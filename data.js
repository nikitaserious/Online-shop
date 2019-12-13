var Orders = [
	{
		id: "1",
		OrderInfo: {
			createdAt: "10.08.1991",
			customer: "Alfreds Futterkiste",
			status: "Accepted",
			shippedAt: "8.09.1991"
		},
		ShipTo: {
			name: "Maria Anders",
			Address: "Obere Str. 57",
			ZIP: "12209",
			Region: "Germany",
			Country: "Germany"
		},
		CustomerInfo: {
			firstName: "Maria",
			lastName: "Anders",
			address: "Obere Str. 57",
			phone: "030-0074321",
			email: "Maria.Anders@company.com"
		},
		products: [
			{
				id: "1",
				name: "Chai",
				price: "18",
				currency: "EUR",
				quantity: "2",
				totalPrice: "36"
			},
			{
				id: "2",
				name: "Aniseed Syrup",
				price: "10",
				currency: "EUR",
				quantity: "3",
				totalPrice: "30"
			},
			{
				id: "3",
				name: "Chef Anton's Cajun Seasoning",
				price: "22",
				currency: "EUR",
				quantity: "2",
				totalPrice: "44"
			},
			{
				id: "4",
				name: "Chef Anton's Gumbo Mix",
				price: "36",
				currency: "EUR",
				quantity: "21",
				totalPrice: "756"
			},
			{
				id: "5",
				name: "Grandma's Boysenberry Spread",
				price: "25",
				currency: "EUR",
				quantity: "5",
				totalPrice: "125"
			}
		]
	},
	{
		id: "2",
		OrderInfo: {
			createdAt: "23.12.2006",
			customer: "Bon app",
			status: "Pending",
			shippedAt: "13.02.2007"
		},
		ShipTo: {
			name: "Laurence Lebihan",
			Address: "12, rue des Bouchers",
			ZIP: "13008",
			Region: "France",
			Country: "France"
		},
		CustomerInfo: {
			firstName: "Laurence",
			lastName: "Lebihan",
			address: "12, rue des Bouchers",
			phone: "91.24.45.40",
			email: "Laurence.Lebihan@company.com"
		},
		products: [
			{
				id: "1",
				name: "Queso Cabrales",
				price: "21",
				currency: "EUR",
				quantity: "5",
				totalPrice: "105"
			},
			{
				id: "2",
				name: "Queso Manchego La Pastora",
				price: "38",
				currency: "EUR",
				quantity: "3",
				totalPrice: "114"
			},
			{
				id: "3",
				name: "Pavlova",
				price: "120",
				currency: "EUR",
				quantity: "5",
				totalPrice: "600"
			},
			{
				id: "4",
				name: "Sir Rodney's Marmalade",
				price: "5",
				currency: "EUR",
				quantity: "3",
				totalPrice: "15"
			},
			{
				id: "5",
				name: "Genen Shouyu",
				price: "40",
				currency: "EUR",
				quantity: "7",
				totalPrice: "280"
			},
			{
				id: "6",
				name: "Tofu",
				price: "23.25",
				currency: "EUR",
				quantity: "1",
				totalPrice: "23.25"
			},
			{
				id: "7",
				name: "Alice Mutton",
				price: "32",
				currency: "EUR",
				quantity: "39",
				totalPrice: "1248"
			}
		]
	}
];
// var apiPrefix = 'http://localhost:3000/api/';
// var urlGetProductsTemplate = apiPrefix + 'Orders/{num}/products';
// var urlDeleteOrderTemplate = apiPrefix + 'Orders/{num}';
// var urlDeleteProductTemplate = apiPrefix + 'OrderProducts/{num}';
function FillOrderList() {

	// var Orders=JSON.parse(Orders);
	fetch('http://localhost:3000/api/Orders').then(response => {
		response.json().then(ord => {
			var orderlist = '';
			
			for (var i = 0; i < ord.length; ++i) {
				orderlist += '<div class="order-info" onclick="FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="intime">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt + '</div>' + '</div>';
				
				
			} 
			document.getElementById('kks').innerHTML = orderlist;
		})



	})
	
};




function FillOrderDetails(num) {


	
	fetch('http://localhost:3000/api/Orders').then(response => {
		response.json().then(ord => {

			var found = ord.find(function (element) {

				return element.id == num;
			});

			order_details = '<div class="order-details-id">' + 'Order   ' + found.id + '</div>' +
				'<div class="order-details-customer">' + found.summary.customer + '</div>' +
				'<div class="order-details-ordered">' + 'Ordered ' + found.summary.createdAt + '</div>' +
				'<div class="order-details-shipped">' + 'Shipped ' + found.summary.shippedAt + '</div>' +
				'<span><img src="icons/delivery-truck.svg" width="50px" onclick="FillShiptoInfo(' + (num) + ')">' +
				'<img src="icons/boss.svg" width="40px" onclick="FillCustomerInfo(' + (num) + ')">' +
				'<img src="icons/map.svg" width="40px" onclick="OpenMap(' + (num) + ')"></span>';
			document.getElementById('kek').innerHTML = order_details;
		})

	})
	
}

function FillShiptoInfo(num) {
	fetch('http://localhost:3000/api/Orders').then(response => {
		response.json().then(ord => {
			var found = ord.find(function (element) {

				return element.id == num;
			});

			ship_adr = '<div>' + found.shipTo.name + '</div>' +
				'<div>' + found.shipTo.address + '</div>' +
				'<div>' + found.shipTo.ZIP + '</div>' +
				'<div>' + found.shipTo.region + '</div>' +
				'<div>' + found.shipTo.country + '</div>';

			ship_params = '<div>Name: </div><div>Street: </div><div>ZIP Code / City: </div>' +
				'<div>Region: </div><div>Country: </div>';
			document.getElementById('shipping-values').innerHTML = ship_adr;
			document.getElementById('shipping-params').innerHTML = ship_params;
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditShip('+num+')">Edit</p>';

		})

	})

}

function FillShippingAdress(num) {
	
	
	fetch('http://localhost:3000/api/Orders').then(response => {
		response.json().then(ord => {
			
			var found = ord.find(function (element) {

				return element.id == num;
			});

			ship_adr = '<div>' + found.shipTo.name + '</div>' +
				'<div>' + found.shipTo.address + '</div>' +
				'<div>' + found.shipTo.ZIP + '</div>' +
				'<div>' + found.shipTo.region + '</div>' +
				'<div>' + found.shipTo.country + '</div>';
			document.getElementById('shipping-values').innerHTML = ship_adr;
		})

	})


}

function FillTable(num) {
	var table = '';
	document.getElementById('table').innerHTML = '<tr><th class="column-product">Product' +
		'<img src="icons/sort-by-alphabet.svg" width="15px" onclick="SortTableByProduct(' + (num) + ')">' +
		'</th><th>Unit Price' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByUnitPrice(' + (num) + ')">' +
		'</th><th class="column-quantity">Quantity' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByQuantity(' + (num) + ')">' +
		'</th><th class="column-total">Total' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByTotalPrice(' + (num) + ')">' +
		'</th><th>Delete Product</th></tr>';
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {
			ord.forEach(function (product) {
				table = '<tr>' + '<td class="column-product"><b>' + product.name + '</b><br>' + '</td>' +
					'<td class="column-unitprice"><b>' + product.price +
					'</b>' + ' ' + product.currency + '</td>' +
					'<td class="column-quantity">' + product.quantity + '</td>' +
					'<td class="column-total"><b>' + product.totalPrice + '</b>' + ' ' + product.currency + '</td>' + 
					'<td class="column-delete-product"><img src="icons/delete(1).svg" width="15px" onclick="PopUpShowdDelProd(' + product.id + ')"></td>'+'</tr>';
				//document.write(table);
				document.getElementById('table').innerHTML += table;

			})
		})

	})
};

function FillTableAfterSort(num,ord){
var table='';
document.getElementById('table').innerHTML='<tr><th class="column-product">Product'+
	'<img src="icons/sort-by-alphabet.svg" width="15px" onclick="SortTableByProduct(' + (num) + ')">' +
		'</th><th>Unit Price' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByUnitPrice(' + (num) + ')">' +
		'</th><th class="column-quantity">Quantity' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByQuantity(' + (num) + ')">' +
		'</th><th class="column-total">Total' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByTotalPrice(' + (num) + ')">' +
		'</th><th>Delete Product</th></tr>';
ord.forEach(function(product){
	table = '<tr>' + '<td class="column-product"><b>' + product.name + '</b><br>' + '</td>' +
				'<td class="column-unitprice"><b>' + product.price +
				'</b>' + ' ' + product.currency + '</td>' +
				'<td class="column-quantity">' + product.quantity + '</td>' +
				'<td class="column-total"><b>' + product.totalPrice + '</b>' + ' ' + product.currency + '</td>' + 
				'<td class="column-delete-product"><img src="icons/delete(1).svg" width="15px" onclick="PopUpShowdDelProd(' + product.id + ')"></td>'+'</tr>';
	
	document.getElementById('table').innerHTML += table;

})
};

function FillOrderPrice(num) {
	var price = 0;
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {
			ord.forEach(function (product) {
		price = price + Number(product.totalPrice);
	});

	document.getElementById('order-details-right').innerHTML = '<div class="order-details-price">' + price +
		'</div>' + '<div class="order-details-currency">' + ' ' + ord[0].currency + '</div>';
	})
	})
	
};
function FillAllInfo(num) {
	FillOrderDetails(num);
	FillShippingAdress(num);
	FillTable(num);
	FillOrderPrice(num);
	document.getElementById("product-search-icon").setAttribute('onclick', 'SearchProduct(' + num + ')');
	 document.getElementById("delete-order-button").setAttribute('onclick', 'DeleteOrder(' + num + ')');
	 document.getElementById("new-product-button").setAttribute('onclick', 'CreateNewProduct(' + num + ')');
	 document.getElementById("edit-ship").setAttribute('onclick', 'EditShip(' + num + ')');



}

function FillCustomerInfo(num) {

	document.getElementById('shipping-params').innerHTML = '<div>Name: </div><div>Address: </div><div>Phone: </div><div>Email: </div>';
	fetch(apiPrefix+'Orders').then(response => {
		response.json().then(ord => {
			var found = ord.find(function (element) {

				return element.id == num;
			});
	document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-customer" onclick="EditCustomer('+num+')">Edit</p>';
	document.getElementById('shipping-values').innerHTML =
		'<div>' + found.customerInfo.firstName + ' ' + found.customerInfo.lastName + '</div>' +
		'<div>' + found.customerInfo.address + '</div>' +
		'<div>' + found.customerInfo.phone + '</div>' +
		'<div>' + found.customerInfo.email + '</div>';
	})
	})
}

function SearchOrder() {
	var input1 = document.getElementById('order-list-search');
	var input = input1.value;
	fetch(apiPrefix+'Orders').then(response => {
		response.json().then(ord => {
	var mappedArr = ord.map(function (item) {
		return {
			id: item.id.toString(),
			createdAt: item.summary.createdAt,
			customer: item.summary.customer,
			status: item.summary.status,
			shippedAt: item.summary.shippedAt
		};
	});
	
	var filteredArr = mappedArr.filter(function (item, index, array) {
		
		if (Object.keys(item).some((key) => item[key].indexOf(input) !== -1)) {
			
			
			var orderlist = '<div class="order-info" onclick="FillAllInfo(' + item.id + ')">' +
				'<div class="order-id">' + 'Order   ' + item.id + '</div>' +
				'<div class="order-date">' + item.createdAt + '</div>' +
				'<div class="order-name">' + item.customer + '</div>' +
				'<div class="intime">' + item.status + '</div>' +
				'<div class="order-shipped">' + 'Shipped:' + item.shippedAt + '</div>' + '</div>';
			
			document.getElementById('orders-after-search').innerHTML += orderlist;
			document.getElementsByClassName('order-info')[2].innerHTML = " ";		////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			
			return item;
		}
		else {
			document.getElementById('order-search').innerHTML += "Not Found";
			

		}

	});
	})
	})

}

function SortTableByProduct(num) {
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {			
	ord.sort(function (a, b) {
		var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
		if (nameA < nameB) //сортируем строки по возрастанию
			return -1;
		if (nameA > nameB)
			return 1;
		else return 0;
	})
	FillTableAfterSort(num,ord);
	
})
	})

}

function SortTableByQuantity(num) {
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {			
	ord.sort(function (a, b) {		
		return a.quantity - b.quantity
	})	

	FillTableAfterSort(num,ord);
	
})
	})
}

function SortTableByUnitPrice(num) {
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {
	ord.sort(function (a, b) {
		return a.price - b.price
	})
	FillTableAfterSort(num,ord);
	})
	})
}

function SortTableByTotalPrice(num) {
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {
	ord.sort(function (a, b) {
		return a.totalPrice - b.totalPrice
	})
	FillTableAfterSort(num,ord);
	
})
	})
	
}

function SearchProduct(num) {
	var input1 = document.getElementById('product-search');
	var input = input1.value;
	var urlGetProducts = urlGetProductsTemplate.replace("{num}", num);
	fetch(urlGetProducts).then(response => {
		response.json().then(ord => {
	var mappedArr = ord.map(function (item) {
		return {
			name: item.name,
			price: item.price.toString(),
			currency: item.currency,
			quantity: item.quantity.toString(),
			totalPrice: item.totalPrice.toString()
		};
	});
	
	var table = '';
	var table_equal = '<tr><th class="column-product">Product' +
		'<img src="icons/sort-by-alphabet.svg" width="15px" onclick="SortTableByProduct(' + (num) + ')">' +
		'</th><th>Unit Price' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByUnitPrice(' + (num) + ')">' +
		'</th><th class="column-quantity">Quantity' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByQuantity(' + (num) + ')">' +
		'</th><th class="column-total">Total' +
		'<img src="icons/sort-ascending.svg" width="15px" onclick="SortTableByTotalPrice(' + (num) + ')">' +
		'</th></tr>';
	document.getElementById('table').innerHTML = table_equal;
	
	var filteredArr = mappedArr.filter(function (item, index, array) {
		

		if (Object.keys(item).some((key) => item[key].indexOf(input) !== -1)) {
			
			table = '<tr>' + '<td class="column-product"><b>' + item.name + '</b><br>' + '</td>' +
				'<td class="column-unitprice"><b>' + item.price +
				'</b>' + ' ' + item.currency + '</td>' +
				'<td class="column-quantity">' + item.quantity + '</td>' +
				'<td class="column-total"><b>' + item.totalPrice + '</b>' + ' ' + item.currency + '</td>' + '</tr>';
			
			document.getElementById('table').innerHTML += table;
						
			
			return item;
		}
	
	});
	if ((document.getElementById('table').innerHTML) == ('<tbody>' + table_equal + '</tbody>')) {
		document.getElementById('table').innerHTML = "Not Found";
	}
	})
})

}

function check(){
var input1 = document.getElementById('customer').value;
	


}
function CreateNewOrder() {
	
	var data =
	{
		"summary": {
			"createdAt": "2017.09.17",
			"customer": document.getElementById('customer').value,
			"status": document.getElementById('status').value,
			"shippedAt": "2017.09.17",
			"totalPrice": document.getElementById('totalPrice').value,
			"currency": document.getElementById('currency').value
		},
		"shipTo": {
			"name": document.getElementById('name').value,
			"address": document.getElementById('address').value,
			"ZIP": document.getElementById('ZIP').value,
			"region": document.getElementById('region').value,
			"country": document.getElementById('country').value
		},
		"customerInfo": {
			"firstName": document.getElementById('firstName').value,
			"lastName": document.getElementById('lastName').value,
			"address": document.getElementById('address').value,
			"phone": document.getElementById('phone').value,
			"email": document.getElementById('email').value
		}
	}
	
	fetch('http://localhost:3000/api/Orders', {
		method: 'POST', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		
	});
	FillOrderList();
	PopUpHide();

}

function EditCustomer(num){
	fetch(apiPrefix+ 'Orders').then(response => {
		response.json().then(ord => {
			var found = ord.find(function (element) {

				return element.id == num;
			});
			// document.getElementById("shipping-params").style.justifyСontent='space-evenly';
			
			ship_adr = '<input type="text" class="input-ship-adr" id="namecust" value="' + found.customerInfo.firstName+' '+found.customerInfo.lastName +'">'  +
				'<input type="text" class="input-ship-adr" id="addresscust" value="' + found.customerInfo.address+'">' +   
				'<input type="text" class="input-ship-adr" id="phonecust" value="' + found.customerInfo.phone+'">' + 
				'<input type="text" class="input-ship-adr" id="emailcust" value="' + found.customerInfo.email+'">';
			document.getElementById('shipping-values').innerHTML = ship_adr;
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="save-ship" onclick="ChangeCustomer('+num+')">Save</p>'+
			'<p class="edit-ship" onclick="CancelChangeCust('+num+')"> Cancel</p>';
})
	})
}

function ChangeCustomer(num){
	var data =
	{		
		"customerInfo": {
			"firstName": document.getElementById('namecust').value,
			"lastName": " ",
			"address": document.getElementById('addresscust').value,
			"phone": document.getElementById('phonecust').value,
			"email": document.getElementById('emailcust').value			
		},		
		"id": num
	}

	var editShip = urlDeleteOrderTemplate.replace("{num}", num);
	fetch(editShip, {
		method: 'PUT', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		
		if (response.status==200){
			FillCustomerInfo(num);
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditCustomer('+num+')">Edit</p>';
		}
	});
}

function EditShip(num){
	fetch(apiPrefix+ 'Orders').then(response => {
		response.json().then(ord => {
			var found = ord.find(function (element) {

				return element.id == num;
			});
			// document.getElementById("shipping-params").style.justifyСontent='space-evenly';
			
			ship_adr = '<input type="text" class="input-ship-adr" id="nameship" value="' + found.shipTo.name +'">'  +
				'<input type="text" class="input-ship-adr" id="addressship" value="' + found.shipTo.address+'">' +   
				'<input type="text" class="input-ship-adr" id="ZIPship" value="' + found.shipTo.ZIP+'">' + 
				'<input type="text" class="input-ship-adr" id="regionship" value="' + found.shipTo.region+'">' + 
				'<input type="text" class="input-ship-adr" id="countryship" value="' + found.shipTo.country+'">' ;
			document.getElementById('shipping-values').innerHTML = ship_adr;
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="save-ship" onclick="ChangeOrder('+num+')">Save</p>'+
			'<p class="edit-ship" onclick="CancelChange('+num+')"> Cancel</p>';
})
	})
	
}

function ChangeOrder(num) {
	var data =
	{		
		"shipTo": {
			"name": document.getElementById('nameship').value,
			"address": document.getElementById('addressship').value,
			"ZIP": document.getElementById('ZIPship').value,
			"region": document.getElementById('regionship').value,
			"country": document.getElementById('countryship').value
		},		
		"id": num
	}

	var editShip = urlDeleteOrderTemplate.replace("{num}", num);
	fetch(editShip, {
		method: 'PUT', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		console.log(response.status);
		if (response.status==200){
			FillShippingAdress(num);
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditShip('+num+')">Edit</p>';
		}
	});
}

function CancelChange(num){
	FillShippingAdress(num);
	document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditShip('+num+')">Edit</p>';
}

function CancelChangeCust(num){
	FillCustomerInfo(num);
	document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditCustomer('+num+')">Edit</p>';
}

function DeleteOrder(num){
	var urlDeleteOrder = urlDeleteOrderTemplate.replace("{num}", num);
	fetch(urlDeleteOrder, {
		method: 'DELETE' // или 'PUT'
		
	}).then(response => {
		console.log(response.status)
	});
	FillOrderList();
	PopUpHideDelOrd();
}

function CreateNewProduct(num) {
	
	var data =
	{
   "name": document.getElementById('nameProd').value,
   "price": document.getElementById('priceProd').value,
   "currency": document.getElementById('currencyProd').value,
   "quantity": document.getElementById('quantityProd').value,
   "totalPrice": document.getElementById('totalPriceProd').value,
   "orderId": num
	}

	
	fetch(apiPrefix+'OrderProducts', {
		method: 'POST', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		console.log(response.status)
	});
	 FillTable(num);
	 PopUpHideNewProduct();

}

function DeleteProduct(num){
	var urlDeleteProduct = urlDeleteProductTemplate.replace("{num}", num);
	fetch(urlDeleteProduct, {
		method: 'DELETE' // или 'PUT'
		
	}).then(response => {
		console.log(response.status)
	});
	 // FillOrderList();
	 FillTable(num);
	 PopUpHideDelProd();
}

function OpenMap(num){
	fetch(apiPrefix + 'Orders').then(response => {
		response.json().then(ord => {

			var found = ord.find(function (element) {

				return element.id == num;
			});
			address='';
			address= found.shipTo.region;//may add found.ShipTo.adress
			createMap(address);
			})

	})
	
}
	
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("icon-add-order");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function PopUpShow() {
  document.getElementById("myModal").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function PopUpHide(){

  document.getElementById("myModal").style.display = "none";
}

function PopUpShowdDelOrd() {

  document.getElementById("myModalDelOrd").style.display = "block";
  
}

// When the user clicks on <span> (x), close the modal
function PopUpHideDelOrd(){

  document.getElementById("myModalDelOrd").style.display = "none";
}

function PopUpShowNewProduct() {
  document.getElementById("myModalNewProd").style.display = "block";
}

function PopUpHideNewProduct(){

  document.getElementById("myModalNewProd").style.display = "none";
}

function PopUpShowdDelProd(num) {

  document.getElementById("myModalDelProd").style.display = "block";
  document.getElementById("delete-product-button").setAttribute('onclick', 'DeleteProduct(' + num + ')');
}

// When the user clicks on <span> (x), close the modal
function PopUpHideDelProd(){

  document.getElementById("myModalDelProd").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// $(document).ready(function(){
//     PopUpHide();
// });
// function PopUpShow(){
//     $("#popup1").show();
// }
// function PopUpHide(){
//     $("#popup1").hide();
// }
var myMap;

function createMap(address){
    ymaps.ready(init);
    function init(){
       myMap = new ymaps.Map("lol", {
        center: [20,20],
        zoom: 9
    });

         // Поиск координат центра 
         ymaps.geocode(address, {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Сортировка результатов от центра окна карты.
        // boundedBy: myMap.getBounds(),
        // strictBounds: true,
        // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
        // Если нужен только один результат, экономим трафик пользователей.
        results: 1
    }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
                // Координаты геообъекта.
                coords = firstGeoObject.geometry.getCoordinates(),
                // Область видимости геообъекта.
                bounds = firstGeoObject.properties.get('boundedBy');

                firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // Получаем строку с адресом и выводим в иконке геообъекта.
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            myMap.setBounds(bounds, {
                // Проверяем наличие тайлов на данном масштабе.
                checkZoomRange: true
            });
        });
}
}