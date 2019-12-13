var model = {
	apiPrefix: 'http://localhost:3000/api/',
	numberOrders:0,
	urlGetProductsTemplate: function () { return (model.apiPrefix + 'Orders/{num}/products') },
	urlDeleteOrderTemplate: function () { return (model.apiPrefix + 'Orders/{num}') },
	urlDeleteProductTemplate: function () { return (model.apiPrefix + 'OrderProducts/{num}') },
	FillOrderList: async function () {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		return ord;
	},
	/**
	* gets data for choosen order
	*@param {int} num - current order id
	*/
	FillOrderDetails: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		this.numberOrders=ord;
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	},
	/**
	* gets data for choosen order
	*@param {int} num - current order id
	*/
	FillShiptoInfo: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	},
	/**
	* gets list of products for choosen order
	*@param {int} num - current order id
	*/
	FillTable: async function (num) {		
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		return ord;
	},
	/**
	* gets data for choosen order
	*@param {int} num - current order id
	*/
	FillShippingAdress: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	},
	/**
	* gets order price for choosen order
	*@param {int} num - current order id
	*/
	FillOrderPrice: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		return ord;
	},
	/**
	* gets customer data from DB
	*@param {int} num - current order id
	*/
	FillCustomerInfo: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	},
	/**
	*creates mapped list of orders 
	
	*/
	SearchOrder: async function () {
		var any = await fetch(model.apiPrefix + 'Orders');
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
		return mappedArr;
	},
	/**
	* sortes table of products by the name of product (ascending)
	*@param {int} num - current order id
	*/
	SortTableByProductAsc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
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
	/**
	* sortes table of products by the name of product (descending)
	*@param {int} num - current order id
	*/
	SortTableByProductDesc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
			if (nameA < nameB) 
				return 1;
			if (nameA > nameB)
				return -1;
			else return 0;
		})
		return ord;
	},
	/**
	* sortes table of products by quantity of products (ascending)
	*@param {int} num - current order id
	*/
	SortTableByQuantityAsc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			return a.quantity - b.quantity
		})
		return ord;
	},
	/**
	* sortes table of products by quantity of products (descending)
	*@param {int} num - current order id
	*/
	SortTableByQuantityDesc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			return b.quantity - a.quantity
		})
		return ord;
	},
	/**
	* sortes table of products by unit price of product (ascending)
	*@param {int} num - current order id
	*/
	SortTableByUnitPriceAsc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			return a.price - b.price
		})
		return ord;
	},
	/**
	* sortes table of products by unit price of product (descending)
	*@param {int} num - current order id
	*/
	SortTableByUnitPriceDesc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			return b.price - a.price
		})
		return ord;
	},
	/**
	* sortes table of products by total price of product (ascending)
	*@param {int} num - current order id
	*/
	SortTableByTotalPriceAsc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			return a.totalPrice - b.totalPrice
		})
		return ord;
	},
	/**
	* sortes table of products by total price of product (descending)
	*@param {int} num - current order id
	*/
	SortTableByTotalPriceDesc: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
		var any = await fetch(urlGetProducts);
		var ord = await any.json();
		ord.sort(function (a, b) {
			return b.totalPrice - a.totalPrice
		})
		return ord;
	},	
	/**
	* returns mapped array of products to search values
	*@param {int} num - current order id
	*/
	SearchProduct: async function (num) {
		var urlGetProducts = model.urlGetProductsTemplate().replace("{num}", num);
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
		return mappedArr;
	},
	/**
	* puts new order to DB
	*@param {object} data - mapped order
	*/
	CreateNewOrder: async function (data) {
		var any = await fetch(model.apiPrefix + 'Orders', {
			method: 'POST', // или 'PUT'
			body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
			headers: {
				'Content-Type': 'application/json'
			}
		});

	},
	/**
	* gets order with selected id
	*@param {int} num - current order id
	*/
	EditCustomer: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	},/**
	* puts edited customer to DB
	*@param {int} num - current order id
	*/
	ChangeCustomer: async function (num, data) {
		var editShip = model.urlDeleteOrderTemplate().replace("{num}", num);
		var any = await fetch(editShip, {
			method: 'PUT', // или 'PUT'
			body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	/**
	* gets order with selected id
	*@param {int} num - current order id
	*/
	EditShip: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	},
	/**
	* puts edited order to DB
	*@param {int} num - current order id
	*@param {object} data - mapped order
	*/
	ChangeOrder: async function (num, data) {
		var editShip = model.urlDeleteOrderTemplate().replace("{num}", num);
		var any = await fetch(editShip, {
			method: 'PUT', // или 'PUT'
			body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	/**
	* deletes selected order form DB
	*@param {int} num - current order id
	*/
	DeleteOrder: async function (num) {
		var urlDeleteOrder = model.urlDeleteOrderTemplate().replace("{num}", num);
		var any = await fetch(urlDeleteOrder, {
			method: 'DELETE' // или 'PUT'		
		});
	},
	/**
	* Puts new product data to DB
	*@param {object} data - mapped product
	*/
	CreateNewProduct: async function (data) {
		var any = await fetch(model.apiPrefix + 'OrderProducts', {
			method: 'POST', // или 'PUT'
			body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	DeleteProduct: async function (num) {
		var urlDeleteProduct = model.urlDeleteProductTemplate().replace("{num}", num);
		var any = await fetch(urlDeleteProduct, {
			method: 'DELETE' // или 'PUT'		
		});
	},
	/**
	* gets order with selected id
	*@param {int} num - current order id
	*/
	OpenMap: async function (num) {
		var any = await fetch(model.apiPrefix + 'Orders');
		var ord = await any.json();
		var found = await ord.find(function (element) {
			return element.id == num;
		});
		return found;
	}
}