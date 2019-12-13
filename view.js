var view = {
	// Get the modal
	modal: document.getElementById("myModal"),

	// Get the button that opens the modal
	btn: document.getElementById("icon-add-order"),

	// Get the <span> element that closes the modal
	span: document.getElementsByClassName("close")[0],

	/**
	* fills list of orders on the page
	*@param {object} ord - mapped order
	*/
	FillOrderList: function (ord) {
		var orderlist = '';
		if (ord.length == 0) {
				document.getElementById('kks').innerHTML = "No orders";
			};
		for (var i = 0; i < ord.length; ++i) {
			if (ord[i].summary.status == "accepted" || ord[i].summary.status == "Accepted") {
				orderlist += '<div class="order-info" onclick="controller.FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="accepted">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' + '</div>';
			}

			else if (ord[i].summary.status == "urgent" || ord[i].summary.status == "Urgent") {
				orderlist += '<div class="order-info" onclick="controller.FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="urgent">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' + '</div>';
			}
			else if (ord[i].summary.status == "pending" || ord[i].summary.status == "pending") {
				orderlist += '<div class="order-info" onclick="controller.FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="pending">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' + '</div>';
			}
			else if (ord[i].summary.status == "Too late" || ord[i].summary.status == "too late") {
				orderlist += '<div class="order-info" onclick="controller.FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="too-late">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' + '</div>';
			}
			else {
				orderlist += '<div class="order-info" onclick="controller.FillAllInfo(' + ord[i].id + ')">' + '<div class="order-id">' + 'Order   ' + ord[i].id + '</div>' +
					'<div class="order-date">' + ord[i].summary.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
					'<div class="order-name">' + ord[i].summary.customer + '</div>' +
					'<div class="undef-status">' + ord[i].summary.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + ord[i].summary.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' + '</div>';
			}
		}
		document.getElementById('kks').innerHTML = orderlist;

	},
	/**
	* fills order details on the page
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillOrderDetails: function (found, num) {
		if(found!=undefined){
		document.getElementById('numberOrders').innerHTML = "Orders(" + model.numberOrders.length + ")";
		order_details = '<div class="order-details-id">' + 'Order   ' + found.id + '</div>' +
			'<div class="order-details-customer">' + found.summary.customer + '</div>' +
			'<div class="order-details-ordered">' + 'Ordered ' + found.summary.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
			'<div class="order-details-shipped">' + 'Shipped ' + found.summary.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
			'<span><img src="icons/DeliveryCar.png" width="50px" id="truck" style="" onclick="controller.FillShiptoInfo(' + (num) + ')">' +
			'<img src="icons/processor.png" width="50px" id="boss" style="" onclick="controller.FillCustomerInfo(' + (num) + ')">' +
			'<img src="icons/map.png" width="50px" id="map" style="" onclick="controller.OpenMap(' + (num) + ')"></span>';
		document.getElementById('kek').innerHTML = order_details;}
		else {window.location = "notFound.html";}
	},
	/**
	* fills shipment info on the page
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillShiptoInfo: function (found, num) {
		ship_adr = '<div>' + found.shipTo.name + '</div>' +
			'<div>' + found.shipTo.address + '</div>' +
			'<div>' + found.shipTo.ZIP + '</div>' +
			'<div>' + found.shipTo.region + '</div>' +
			'<div>' + found.shipTo.country + '</div>';

		ship_params = '<div>Name: </div><div>Street: </div><div>ZIP Code / City: </div>' +
			'<div>Region: </div><div>Country: </div>';

		document.getElementById("truck").setAttribute("style", "border-bottom: 3px solid blue;");
		document.getElementById("truck").setAttribute("src", "icons/DeliveryCarSelected.png");
		document.getElementById("boss").setAttribute("style", "");
		document.getElementById("boss").setAttribute("src", "icons/processor.png");
		document.getElementById("map").setAttribute("style", "");
		document.getElementById("map").setAttribute("src", "icons/map.png");
		document.getElementById('shipping-values').innerHTML = ship_adr;
		document.getElementById('shipping-params').innerHTML = ship_params;
		document.getElementById("divv").innerHTML = '<h3>Shipping address</h3><p class="edit-ship"' +
			'id="edit-ship" onclick="controller.EditShip(' + num + ')">Edit</p>';
	},
	/**
	* fills list of products on the page
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillTable: function (found, num) {
		var table = '';		
		document.getElementById('table').innerHTML = '<tr><th class="column-product">Product' +
			'<img src="icons/sort-by-alphabet.svg" id="product" width="15px" onclick="controller.SortTableByProductAsc(' + (num) + ')">' +
			'</th><th>Unit Price' +
			'<img src="icons/sort-ascending.svg" id="unit" width="15px" onclick="controller.SortTableByUnitPriceAsc(' + (num) + ')">' +
			'</th><th class="column-quantity">Quantity' +
			'<img src="icons/sort-ascending.svg" id="quantity" width="15px" onclick="controller.SortTableByQuantityAsc(' + (num) + ')">' +
			'</th><th class="column-total">Total' +
			'<img src="icons/sort-ascending.svg" id="total" width="15px" onclick="controller.SortTableByTotalPriceAsc(' + (num) + ')">' +
			'</th><th>Delete Product</th></tr>';
		document.getElementById("productsNumber").innerHTML = "Line items(" + found.length + ")";
		found.forEach(function (product) {
			table = '<tr>' + '<td class="column-product"><b>' + product.name + '</b><br>' + '</td>' +
				'<td class="column-unitprice"><b>' + product.price +
				'</b>' + ' ' + product.currency + '</td>' +
				'<td class="column-quantity">' + product.quantity + '</td>' +
				'<td class="column-total"><b>' + product.totalPrice + '</b>' + ' ' + product.currency + '</td>' +
				'<td class="column-delete-product"><img src="icons/delete(1).svg" width="15px" onclick="view.PopUpShowdDelProd(' + product.id + ')"></td>' + '</tr>';
			//document.write(table);
			document.getElementById('table').innerHTML += table;

		})
		if (found.length == 0) {
				document.getElementById('table').innerHTML = "No products";
				console.log(found);
			};
	},
	/**
	* fills shipping details on the page
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillShippingAdress: function (found, num) {
		ship_adr = '<div>' + found.shipTo.name + '</div>' +
			'<div>' + found.shipTo.address + '</div>' +
			'<div>' + found.shipTo.ZIP + '</div>' +
			'<div>' + found.shipTo.region + '</div>' +
			'<div>' + found.shipTo.country + '</div>';
		document.getElementById('shipping-values').innerHTML = ship_adr;
	},
	/**
	* fills order price on the page
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillOrderPrice: function (found, num) {
		var price = 0;
		found.forEach(function (product) {
			price = price + Number(product.totalPrice);
		});

		document.getElementById('order-details-right').innerHTML = '<div class="order-details-price">' + price +
			'</div>' + '<div class="order-details-currency">' + ' ' + found[0].currency + '</div>';
	},
	/**
	* fills customer details on the page
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillCustomerInfo: function (found, num) {
		document.getElementById("boss").setAttribute("style", "border-bottom: 3px solid blue");
		document.getElementById("boss").setAttribute("src", "icons/processorSelected.png");
		document.getElementById("truck").setAttribute("src", "icons/DeliveryCar.png");
		document.getElementById("truck").setAttribute("style", "");
		document.getElementById("map").setAttribute("style", "");
		document.getElementById("map").setAttribute("src", "icons/map.png");
		document.getElementById('shipping-params').innerHTML = '<div>Name: </div><div>Address: </div><div>Phone: </div><div>Email: </div>';
		document.getElementById("divv").innerHTML = '<h3>Shipping address</h3><p class="edit-ship"' +
			'id="edit-customer" onclick="controller.EditCustomer(' + num + ')">Edit</p>';
		document.getElementById('shipping-values').innerHTML =
			'<div>' + found.customerInfo.firstName + ' ' + found.customerInfo.lastName + '</div>' +
			'<div>' + found.customerInfo.address + '</div>' +
			'<div>' + found.customerInfo.phone + '</div>' +
			'<div>' + found.customerInfo.email + '</div>';
	},
	/**
	* gets input value for "search" function
	*/
	SearchOrderGetInput: function () {
		var input1 = document.getElementById('order-list-search');
		var input = input1.value;
		return input;
	},
	/**
	* fills list of orders with propert found orders
	*@param {string} input - entered value
	*@param {object} orders - list of mapped orders
	*/
	SearchOrder: function (input, orders) {
		document.getElementById('kks').innerHTML = " ";
		var filteredArr = orders.filter(function (item, index, array) {
			if (Object.keys(item).some((key) => item[key].indexOf(input) !== -1)) {
				console.log(item);
				var orderlist = '<div class="order-info" onclick="controller.FillAllInfo(' + item.id + ')">' +
					'<div class="order-id">' + 'Order   ' + item.id + '</div>' +
					'<div class="order-date">' + item.createdAt.slice(0, 10).replace(/-/g, ".") + '</div>' +
					'<div class="order-name">' + item.customer + '</div>' +
					'<div class="'+(item.status)+'">' + item.status + '</div>' +
					'<div class="order-shipped">' + 'Shipped:' + item.shippedAt.slice(0, 10).replace(/-/g, ".") + '</div>' + '</div>';
				console.log(orderlist);
				document.getElementById('kks').innerHTML += orderlist;
				// document.getElementsByClassName('order-info')[2].innerHTML = " ";		////////////////////////////////////////////////////////////////////////////////////////////////////////////		

				return item;
			}
			
		});
		if (filteredArr.length == 0) {
				document.getElementById('kks').innerHTML = "No orders";
			};
	},
	/**
	* changes sorting image(asc->desc->asc)
	*@param {int} id - tag id of element
	*@param {string} src - value of "src" property for image tag
	*@param {string} sortfun - propert sorting function
	*@param {int} num - current order id
	*/
	ChangeSortingImage: async function (id, src, sortfun, num) {
		var string = 'controller.' + (sortfun) + '(' + (num) + ')'
		document.getElementById(id).setAttribute("src", src);
		document.getElementById(id).setAttribute("onclick", string);

	},
	/**
	* fills table after sorting
	*@param {object} found - mapped order
	*@param {int} num - current order id
	*/
	FillTableAfterSort: function (num, ord) {
		var table = '';
		document.getElementById('table').innerHTML = '<tr><th class="column-product">Product' +
			'<img src="icons/sort-by-alphabet.svg" id="product" width="15px" onclick="controller.SortTableByProductAsc(' + (num) + ')">' +
			'</th><th>Unit Price' +
			'<img src="icons/sort-ascending.svg" id="unit" width="15px" onclick="controller.SortTableByUnitPriceAsc(' + (num) + ')">' +
			'</th><th class="column-quantity">Quantity' +
			'<img src="icons/sort-ascending.svg" id="quantity" width="15px" onclick="controller.SortTableByQuantityAsc(' + (num) + ')">' +
			'</th><th class="column-total">Total' +
			'<img src="icons/sort-ascending.svg" id="total" width="15px" onclick="controller.SortTableByTotalPriceAsc(' + (num) + ')">' +
			'</th><th>Delete Product</th></tr>';
		ord.forEach(function (product) {
			table = '<tr>' + '<td class="column-product"><b>' + product.name + '</b><br>' + '</td>' +
				'<td class="column-unitprice"><b>' + product.price +
				'</b>' + ' ' + product.currency + '</td>' +
				'<td class="column-quantity">' + product.quantity + '</td>' +
				'<td class="column-total"><b>' + product.totalPrice + '</b>' + ' ' + product.currency + '</td>' +
				'<td class="column-delete-product"><img src="icons/delete(1).svg" width="15px" onclick="controller.PopUpShowdDelProd(' + product.id + ')"></td>' + '</tr>';

			document.getElementById('table').innerHTML += table;

		})
	},
	/**
	* gets input value for searching products
	
	*/
	SearchProductGetInput: function () {
		var input1 = document.getElementById('product-search');
		var input = input1.value;
		return input;
	},
	/**
	* fills table of products after searching
	*@param {string} input - input value
	*@param {object} orders - mapped orders
	*@param {int} num - current order id
	*/
	SearchProduct: function (input, orders, num) {
		var table = '';
		var table_equal = '<tr><th class="column-product">Product' +
			'<img src="icons/sort-by-alphabet.svg" id="product" width="15px" onclick="controller.SortTableByProductAsc(' + (num) + ')">' +
			'</th><th>Unit Price' +
			'<img src="icons/sort-ascending.svg" id="unit" width="15px" onclick="controller.SortTableByUnitPriceAsc(' + (num) + ')">' +
			'</th><th class="column-quantity">Quantity' +
			'<img src="icons/sort-ascending.svg" id="quantity" width="15px" onclick="controller.SortTableByQuantityAsc(' + (num) + ')">' +
			'</th><th class="column-total">Total' +
			'<img src="icons/sort-ascending.svg" id="total" width="15px" onclick="controller.SortTableByTotalPriceAsc(' + (num) + ')">' +
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

				
				return item;
			}
			// 	if ((document.getElementById('table').innerHTML) == ('<tbody>' + table_equal + '</tbody>')) {
			// 	document.getElementById('table').innerHTML = "Not Found";
			// }
		});
		document.getElementById("productsNumber").innerHTML = "Line items(" + filteredArr.length + ")";
		if (filteredArr.length == 0) {
			document.getElementById('table').innerHTML = "No products";
		};


	},
	/**
	* shows new order popup	
	*/
	PopUpShow: function () {
		document.getElementById("myModal").style.display = "block";
	},
	/**
	* hides new order popup	
	*/
	PopUpHide: function () {
		document.getElementById("myModal").style.display = "none";
	},
	/**
	* shows delete order popup	
	*/
	PopUpShowdDelOrd: function () {
		document.getElementById("myModalDelOrd").style.display = "block";
	},
	/**
	* hides delete order popup	
	*/
	PopUpHideDelOrd: function () {
		document.getElementById("myModalDelOrd").style.display = "none";
	},
	/**
	* shows new product popup	
	*/
	PopUpShowNewProduct: function () {
		document.getElementById("myModalNewProd").style.display = "block";
	},
	/**
	* hides new product popup	
	*/
	PopUpHideNewProduct: function () {
		document.getElementById("myModalNewProd").style.display = "none";
	},
	/**
	* shows delete product popup	
	*/
	PopUpShowdDelProd: function (num) {
		document.getElementById("myModalDelProd").style.display = "block";
		document.getElementById("delete-product-button").setAttribute('onclick', 'DeleteProduct(' + num + ')');
	},
	/**
	* hides delete product popup	
	*/
	PopUpHideDelProd: function () {
		document.getElementById("myModalDelProd").style.display = "none";
	},
	/**
	* gets input values for creating new order
	*/
	CreateNewOrder: function () {
		var customer=document.getElementById('customer').value;
		var status=document.getElementById('status').value;
		var totalPrice=document.getElementById('totalPrice').value;
		var name=document.getElementById('name').value;
		var address=document.getElementById('address').value;
		var ZIP=document.getElementById('ZIP').value;
		var region=document.getElementById('region').value;
		var firstName=document.getElementById('firstName').value;
		var lastName=document.getElementById('lastName').value;
		var address=document.getElementById('address').value;
		var phone=document.getElementById('phone').value;
		var email=document.getElementById('email').value;
		if(customer==""|| status=="" ||totalPrice=="" || totalPrice=="" || name==""|| address=="" ||
			ZIP==""|| region=="" || firstName=="" || lastName=="" ||phone==""|| email=="")
		{
			alert("Please Fill All Required Field");
			 var data=0;
		}
		else{

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
		}}
		return data;
	},
	/**
	* fills customer form after editing
	*@param {int} num - current order id
	*@param {object} found - mapped order	
	*/
	EditCustomer: function (num, found) {
		ship_adr = '<input type="text" class="input-ship-adr" id="namecust" value="' + found.customerInfo.firstName + ' ' + found.customerInfo.lastName + '">' +
			'<input type="text" class="input-ship-adr" id="addresscust" value="' + found.customerInfo.address + '">' +
			'<input type="text" class="input-ship-adr" id="phonecust" value="' + found.customerInfo.phone + '">' +
			'<input type="text" class="input-ship-adr" id="emailcust" value="' + found.customerInfo.email + '">';
		document.getElementById('shipping-values').innerHTML = ship_adr;
		document.getElementById("divv").innerHTML = '<h3>Shipping address</h3><p class="edit-ship"' +
			'id="save-ship" onclick="controller.ChangeCustomer(' + num + ')">Save</p>' +
			'<p class="edit-ship" onclick="controller.CancelChangeCust(' + num + ')"> Cancel</p>';
	},
	/**
	* gets input values from customer form after editing
	*@param {int} num - current order id	
	*/
	ChangeCustomer: function (num) {
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
	/**
	* fills shipment form after editing
	*@param {int} num - current order id
	*@param {object} found - mapped order	
	*/
	EditShip: function (num, found) {
		ship_adr = '<input type="text" class="input-ship-adr" id="nameship" value="' + found.shipTo.name + '">' +
			'<input type="text" class="input-ship-adr" id="addressship" value="' + found.shipTo.address + '">' +
			'<input type="text" class="input-ship-adr" id="ZIPship" value="' + found.shipTo.ZIP + '">' +
			'<input type="text" class="input-ship-adr" id="regionship" value="' + found.shipTo.region + '">' +
			'<input type="text" class="input-ship-adr" id="countryship" value="' + found.shipTo.country + '">';
		document.getElementById('shipping-values').innerHTML = ship_adr;
		document.getElementById("divv").innerHTML = '<h3>Shipping address</h3><p class="edit-ship"' +
			'id="save-ship" onclick="ChangeOrder(' + num + ')">Save</p>' +
			'<p class="edit-ship" onclick="controller.CancelChange(' + num + ')"> Cancel</p>';
	},
	/**
	* gets input values from shipment form after editing
	*@param {int} num - current order id	
	*/
	ChangeOrder: function (num) {
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
	/**
	* gets input values for creating new product
	*@param {int} num - current order id	
	*/
	CreateNewProduct: function (num) {
		var name=document.getElementById('nameProd').value;
		var price=document.getElementById('priceProd').value;
		var currency=document.getElementById('currencyProd').value;
		var quantity=document.getElementById('quantityProd').value;
		var totalPrice=document.getElementById('totalPriceProd').value;		
		if(name==""|| price=="" ||currency=="" || quantity=="" || totalPrice=="")
		{
			alert("Please Fill All Required Field");
			 var data=0;
		}
		else{
		var data =
		{
			"name": document.getElementById('nameProd').value,
			"price": document.getElementById('priceProd').value,
			"currency": document.getElementById('currencyProd').value,
			"quantity": document.getElementById('quantityProd').value,
			"totalPrice": document.getElementById('totalPriceProd').value,
			"orderId": num
		}}
		return data;
	},
	/**
	* view loading animation
	*/
	ViewAnimation: function () {
		document.getElementById('anim').innerHTML = '<div class="cssload-cube cssload-c1"></div>' +
			'<div class="cssload-cube cssload-c2"></div><div class="cssload-cube cssload-c4"></div>' +
			'<div class="cssload-cube cssload-c3"></div>';
	},
	/**
	* hide loading animation
	*/
	HideAnimation: function () {
		document.getElementById('anim').innerHTML = '';
	}
};