

var view={
	// Get the modal
	 modal : document.getElementById("myModal"),

// Get the button that opens the modal
	 btn : document.getElementById("icon-add-order"),

// Get the <span> element that closes the modal
	 span : document.getElementsByClassName("close")[0],
	FillOrderList: function(ord)
	{
		var orderlist='';
		for (var i = 0; i < ord.length; ++i) {

				 orderlist += '<div class="order-info" onclick="FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="intime">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt + '</div>' + '</div>';				
			} 
			document.getElementById('kks').innerHTML = orderlist;

	},
	FillOrderDetails: function(found,num)
	{
		order_details = '<div class="order-details-id">' + 'Order   ' + found.id + '</div>' +
				'<div class="order-details-customer">' + found.summary.customer + '</div>' +
				'<div class="order-details-ordered">' + 'Ordered ' + found.summary.createdAt + '</div>' +
				'<div class="order-details-shipped">' + 'Shipped ' + found.summary.shippedAt + '</div>' +
				'<span><img src="icons/delivery-truck.svg" width="50px" onclick="FillShiptoInfo(' + (num) + ')">' +
				'<img src="icons/boss.svg" width="40px" onclick="FillCustomerInfo(' + (num) + ')">' +
				'<img src="icons/map.svg" width="40px" onclick="OpenMap(' + (num) + ')"></span>';
			document.getElementById('kek').innerHTML = order_details;
	},
	FillShiptoInfo: function(found,num)
	{
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
	},
	FillTable: function(found,num)
	{
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
		found.forEach(function (product) {
				table = '<tr>' + '<td class="column-product"><b>' + product.name + '</b><br>' + '</td>' +
					'<td class="column-unitprice"><b>' + product.price +
					'</b>' + ' ' + product.currency + '</td>' +
					'<td class="column-quantity">' + product.quantity + '</td>' +
					'<td class="column-total"><b>' + product.totalPrice + '</b>' + ' ' + product.currency + '</td>' + 
					'<td class="column-delete-product"><img src="icons/delete(1).svg" width="15px" onclick="PopUpShowdDelProd(' + product.id + ')"></td>'+'</tr>';
				//document.write(table);
				document.getElementById('table').innerHTML += table;

			})
	},
	FillShippingAdress: function(found,num)
	{
		ship_adr = '<div>' + found.shipTo.name + '</div>' +
				'<div>' + found.shipTo.address + '</div>' +
				'<div>' + found.shipTo.ZIP + '</div>' +
				'<div>' + found.shipTo.region + '</div>' +
				'<div>' + found.shipTo.country + '</div>';
			document.getElementById('shipping-values').innerHTML = ship_adr;
	},
	FillOrderPrice: function(found,num)
	{
		found.forEach(function (product) {
		price = price + Number(product.totalPrice);
	});

	document.getElementById('order-details-right').innerHTML = '<div class="order-details-price">' + price +
		'</div>' + '<div class="order-details-currency">' + ' ' + found[0].currency + '</div>';
	},
	FillCustomerInfo: function(found,num)
	{
		document.getElementById('shipping-params').innerHTML = '<div>Name: </div><div>Address: </div><div>Phone: </div><div>Email: </div>';
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-customer" onclick="EditCustomer('+num+')">Edit</p>';
	document.getElementById('shipping-values').innerHTML =
		'<div>' + found.customerInfo.firstName + ' ' + found.customerInfo.lastName + '</div>' +
		'<div>' + found.customerInfo.address + '</div>' +
		'<div>' + found.customerInfo.phone + '</div>' +
		'<div>' + found.customerInfo.email + '</div>';
	},
	SearchOrderGetInput: function()
	{
		var input1 = document.getElementById('order-list-search');
	var input = input1.value;
	return input;
	},
	SearchOrder: function(input,orders)
	{
		var filteredArr = orders.filter(function (item, index, array) {
		if (Object.keys(item).some((key) => item[key].indexOf(input) !== -1)) {
			 console.log(item);
		var orderlist = '<div class="order-info" onclick="FillAllInfo(' + item.id + ')">' +
				'<div class="order-id">' + 'Order   ' + item.id + '</div>' +
				'<div class="order-date">' + item.createdAt + '</div>' +
				'<div class="order-name">' + item.customer + '</div>' +
				'<div class="intime">' + item.status + '</div>' +
				'<div class="order-shipped">' + 'Shipped:' + item.shippedAt + '</div>' + '</div>';
			console.log(orderlist);
			document.getElementById('orders-after-search').innerHTML += orderlist;
			document.getElementsByClassName('order-info')[2].innerHTML = " ";		////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			console.log("Yes");
			return item;
		}
		else {
			document.getElementById('order-search').innerHTML += "Not Found";
			console.log("Not");

		}});
	},
	FillTableAfterSort: function(num,ord)
	{
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
	},
	SearchProductGetInput: function()
	{
		var input1 = document.getElementById('product-search');
	var input = input1.value;
	return input;
	},
	SearchProduct: function(input,orders,num)
	{
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
	var filteredArr = orders.filter(function (item, index, array) {
		

		if (Object.keys(item).some((key) => item[key].indexOf(input) !== -1)) {
			
			table = '<tr>' + '<td class="column-product"><b>' + item.name + '</b><br>' + '</td>' +
				'<td class="column-unitprice"><b>' + item.price +
				'</b>' + ' ' + item.currency + '</td>' +
				'<td class="column-quantity">' + item.quantity + '</td>' +
				'<td class="column-total"><b>' + item.totalPrice + '</b>' + ' ' + item.currency + '</td>' + '</tr>';
			
			document.getElementById('table').innerHTML += table;
							
			console.log("Yes");
			return item;
		}
		if ((document.getElementById('table').innerHTML) == ('<tbody>' + table_equal + '</tbody>')) {
		document.getElementById('table').innerHTML = "Not Found";
	}
	});

	},
	PopUpShow: function()
	{
		document.getElementById("myModal").style.display = "block";
	},
	PopUpHide: function()
	{
		document.getElementById("myModal").style.display = "none";
	},
	PopUpShowdDelOrd: function()
	{
		document.getElementById("myModalDelOrd").style.display = "block";
	},
	PopUpHideDelOrd: function()
	{
		document.getElementById("myModalDelOrd").style.display = "none";
	},
	PopUpShowNewProduct: function()
	{
		document.getElementById("myModalNewProd").style.display = "block";
	},
	PopUpHideNewProduct: function()
	{
		document.getElementById("myModalNewProd").style.display = "none";
	},
	PopUpShowdDelProd: function(num)
	{
		document.getElementById("myModalDelProd").style.display = "block";
  	document.getElementById("delete-product-button").setAttribute('onclick', 'DeleteProduct(' + num + ')');
	},
	PopUpHideDelProd: function()
	{
		document.getElementById("myModalDelProd").style.display = "none";
	},
	CreateNewOrder: function()
	{
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
	return data;
	},
	EditCustomer: function(num,found)
	{
		ship_adr = '<input type="text" class="input-ship-adr" id="namecust" value="' + found.customerInfo.firstName+' '+found.customerInfo.lastName +'">'  +
				'<input type="text" class="input-ship-adr" id="addresscust" value="' + found.customerInfo.address+'">' +   
				'<input type="text" class="input-ship-adr" id="phonecust" value="' + found.customerInfo.phone+'">' + 
				'<input type="text" class="input-ship-adr" id="emailcust" value="' + found.customerInfo.email+'">';
			document.getElementById('shipping-values').innerHTML = ship_adr;
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="save-ship" onclick="ChangeCustomer('+num+')">Save</p>'+
			'<p class="edit-ship" onclick="CancelChangeCust('+num+')"> Cancel</p>';
	},
	ChangeCustomer: function(num)
	{
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
	};
	return data;
	},
	EditShip: function(num,found)
	{
		ship_adr = '<input type="text" class="input-ship-adr" id="nameship" value="' + found.shipTo.name +'">'  +
				'<input type="text" class="input-ship-adr" id="addressship" value="' + found.shipTo.address+'">' +   
				'<input type="text" class="input-ship-adr" id="ZIPship" value="' + found.shipTo.ZIP+'">' + 
				'<input type="text" class="input-ship-adr" id="regionship" value="' + found.shipTo.region+'">' + 
				'<input type="text" class="input-ship-adr" id="countryship" value="' + found.shipTo.country+'">' ;
			document.getElementById('shipping-values').innerHTML = ship_adr;
			document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="save-ship" onclick="ChangeOrder('+num+')">Save</p>'+
			'<p class="edit-ship" onclick="CancelChange('+num+')"> Cancel</p>';
	},
	ChangeOrder: function(num)
	{
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
	};
	return data;
	},
	CreateNewProduct: function(num)
	{
		var data =
	{
		"name": document.getElementById('nameProd').value,
   "price": document.getElementById('priceProd').value,
   "currency": document.getElementById('currencyProd').value,
   "quantity": document.getElementById('quantityProd').value,
   "totalPrice": document.getElementById('totalPriceProd').value,
   "orderId": num
	}
	return data;
	},
};
var model= {
	apiPrefix : 'http://localhost:3000/api/',
	urlGetProductsTemplate : function(){ return (model.apiPrefix + 'Orders/{num}/products')},
	urlDeleteOrderTemplate : function(){ return (model.apiPrefix + 'Orders/{num}')},
	urlDeleteProductTemplate : function(){ return (model.apiPrefix + 'OrderProducts/{num}')},
	FillOrderList: async function()
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		return ord;				
	},
	FillOrderDetails: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},
	FillShiptoInfo: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},
	FillTable: async function(num)
	{	
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		return ord;
	},
	FillShippingAdress: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},
	FillOrderPrice: async function(num)
	{	
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		return ord;
	},
	FillCustomerInfo: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},
	SearchOrder: async function()
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var mappedArr = ord.map(function (item) {
		return {
			id: item.id.toString(),
			createdAt: item.summary.createdAt,
			customer: item.summary.customer,
			status: item.summary.status,
			shippedAt: item.summary.shippedAt
		};
	});
		return 	mappedArr;			
	},
	SortTableByProduct: async function(num)
	{
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		ord.sort(function (a, b) {
		var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
		if (nameA < nameB) //сортируем строки по возрастанию
			return -1;
		if (nameA > nameB)
			return 1;
		else return 0;
	})
		return ord;
	},
	SortTableByQuantity: async function(num)
	{
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		ord.sort(function (a, b) {		
		return a.quantity - b.quantity
	})	
		return ord;
	},
	SortTableByUnitPrice: async function(num)
	{
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		ord.sort(function (a, b) {
		return a.price - b.price
	})
		return ord;
	},
	SortTableByTotalPrice: async function(num)
	{
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		ord.sort(function (a, b) {
		return a.totalPrice - b.totalPrice
	})
		return ord;
	},
	SearchProduct: async function(num)
	{
		var urlGetProducts= urlGetProductsTemplate.replace("{num}", num);
		var any = await fetch(urlGetProducts);			
		var ord = await any.json();
		var mappedArr = ord.map(function (item) {
		return {
			name: item.name,
			price: item.price.toString(),
			currency: item.currency,
			quantity: item.quantity.toString(),
			totalPrice: item.totalPrice.toString()
		};
	});
		return 	mappedArr;			
	},
	CreateNewOrder: async function(data)
	{
		var any = await fetch(apiPrefix+'Orders', {
		method: 'POST', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	});			
		
	},
	EditCustomer: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},
	ChangeCustomer: async function(num,data)
	{
		var editShip = urlDeleteOrderTemplate.replace("{num}", num);
		var any = await fetch(editShip, {
		method: 'PUT', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	});
	},
	EditShip: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},	
	ChangeOrder: async function(num,data)
	{
		var editShip = urlDeleteOrderTemplate.replace("{num}", num);
		var any = await fetch(editShip, {
		method: 'PUT', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	});
	},
	DeleteOrder: async function(num)
	{
		var urlDeleteOrder = urlDeleteOrderTemplate.replace("{num}", num);
		var any = await fetch(urlDeleteOrder, {
		method: 'DELETE' // или 'PUT'		
	});
	},
	CreateNewProduct: async function(data)
	{
		var any = await fetch(apiPrefix+'OrderProducts', {
		method: 'POST', // или 'PUT'
		body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
		headers: {
			'Content-Type': 'application/json'
		}
	});			
	},
	DeleteProduct: async function(num)
	{
		var urlDeleteProduct = urlDeleteProductTemplate.replace("{num}", num);
		var any = await fetch(urlDeleteProduct, {
		method: 'DELETE' // или 'PUT'		
	});
	},
	OpenMap: async function(num)
	{
		var any = await fetch(apiPrefix+'Orders');			
		var ord = await any.json();
		var found = await ord.find(function (element) {
				return element.id == num;});
		return found;
	},
};

var controller={
	FillOrderList: async function()
	{
		orders= await model.FillOrderList();
		view.FillOrderList(orders);
	},
	FillOrderDetails: async function(num)
	{
		orders= await model.FillOrderDetails(num);		
		view.FillOrderDetails(orders,num);	
	},
	FillShiptoInfo: async function(num)
	{
		orders= await model.FillShiptoInfo(num);
		view.FillShiptoInfo(orders);
	},
	FillTable: async function(num)
	{
		orders= await model.FillTable(num);		
		view.FillTable(orders,num);
	},
	FillShippingAdress: async function(num)
	{
		orders= await model.FillShippingAdress(num);		
		view.FillShippingAdress(orders,num);
	},
	FillOrderPrice: async function(num)
	{
		orders= await model.FillOrderPrice(num);		
		view.FillOrderPrice(orders,num);
	},
	FillCustomerInfo: async function(num)
	{
		orders= await model.FillCustomerInfo(num);		
		view.FillCustomerInfo(orders,num);
	},
	SearchOrder: async function()
	{
		orders= await model.SearchOrder();
		inputvalue= await view.SearchOrderGetInput();
		view.SearchOrder(inputvalue,orders);
	},
	SortTableByProduct: async function(num)
	{
		orders= await model.SortTableByProduct(num);		
		view.FillTableAfterSort(num,orders);
	},
	SortTableByQuantity: async function(num)
	{
		orders= await model.SortTableByQuantity(num);		
		view.FillTableAfterSort(num,orders);
	},
	SortTableByUnitPrice: async function(num)
	{
		orders= await model.SortTableByUnitPrice(num);		
		view.FillTableAfterSort(num,orders);
	},
	SortTableByTotalPrice: async function(num)
	{
		orders= await model.SortTableByTotalPrice(num);		
		view.FillTableAfterSort(num,orders);
	},
	SearchProduct: async function(num)
	{
		orders= await model.SearchProduct(num);
		inputvalue= await view.SearchProductGetInput();
		view.SearchProduct(inputvalue,orders,num);
	},
	CreateNewOrder: async function()
	{
		// view.PopUpShow();
		orders= await view.CreateNewOrder();
		model.CreateNewOrder(orders);
		this.FillOrderList();
		view.PopUpHide();
	},
	EditCustomer: async function(num)
	{
		orders= await model.EditCustomer(num);
		view.EditCustomer(num, orders);
	},
	ChangeCustomer: async function(num)
	{
		orders = await view.ChangeCustomer(num);
		model.ChangeCustomer(num,orders);
		this.FillCustomerInfo(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditCustomer('+num+')">Edit</p>';
	},
	EditShip: async function(num)
	{
		orders= await model.EditShip(num);
		view.EditShip(num, orders);
	},
	ChangeOrder: async function(num)
	{
		orders = await view.ChangeOrder(num);
		model.ChangeOrder(num,orders);
		this.FillShippingAdress(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditShip('+num+')">Edit</p>';
	},
	CancelChange: async function(num)
	{
		this.FillShippingAdress(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditShip('+num+')">Edit</p>';
	},
	CancelChangeCust: async function(num)
	{
		this.FillCustomerInfo(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="EditCustomer('+num+')">Edit</p>';
	},
	DeleteOrder: async function(num)
	{
		model.DeleteOrder(num);
		this.FillOrderList();
		view.PopUpHideDelOrd();
	},
	CreateNewProduct: async function(num)
	{
		// view.PopUpShow();
		orders= await view.CreateNewProduct(num);
		model.CreateNewProduct(orders);
		this.FillTable(num);
		view.PopUpHideNewProduct();
	},
	DeleteProduct: async function(num)
	{
		model.DeleteProduct(num);
		this.FillTable(num);
		view.PopUpHideDelProd();
	},
	OpenMap : async function(num)
	{
		orders= await model.OpenMap(num);
		address='';
		address= orders.shipTo.region;//may add found.ShipTo.adress
		this.CreateMap(address);
	},
	CreateMap: async function()
	{
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
};

