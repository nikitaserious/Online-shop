var controller={
	/**
	* fills list of orders
	*/
	FillOrderList: async function()
	{
		orders= await model.FillOrderList();
		view.FillOrderList(orders);
	},
	/**
	* fills order details
	*@param {int} num - current order id
	*/
	FillOrderDetails: async function(num)
	{
		orders= await model.FillOrderDetails(num);		
		view.FillOrderDetails(orders,num);	
	},
	/**
	* fills shipment data
	*@param {int} num - current order id
	*/
	FillShiptoInfo: async function(num)
	{
		orders= await model.FillShiptoInfo(num);
		view.FillShiptoInfo(orders);
	},
	/**
	* fills list of products
	*@param {int} num - current order id
	*/
	FillTable: async function(num)
	{
		orders= await model.FillTable(num);		
		view.FillTable(orders,num);
	},
	/**
	* fills shipping address
	*@param {int} num - current order id
	*/
	FillShippingAdress: async function(num)
	{
		orders= await model.FillShippingAdress(num);		
		view.FillShippingAdress(orders,num);
	},
	/**
	* fills order price
	*@param {int} num - current order id
	*/
	FillOrderPrice: async function(num)
	{
		orders= await model.FillOrderPrice(num);		
		view.FillOrderPrice(orders,num);
	},
	/**
	* initiates starting of all filling functions
	*@param {int} num - current order id
	*/
	FillAllInfo: async function(num)
	{
		 view.ViewAnimation();
		await this.FillOrderDetails(num);
	await this.FillShippingAdress(num);
	await this.FillTable(num);
	this.FillOrderPrice(num);
	document.getElementById("product-search-icon").setAttribute('onclick', 'controller.SearchProduct(' + num + ')');
	 document.getElementById("delete-order-button").setAttribute('onclick', 'controller.DeleteOrder(' + num + ')');
	 document.getElementById("new-product-button").setAttribute('onclick', 'controller.CreateNewProduct(' + num + ')');
	 document.getElementById("edit-ship").setAttribute('onclick', 'controller.EditShip(' + num + ')');
	view.HideAnimation();
	},
	/**
	* fills customer info
	*@param {int} num - current order id
	*/
	FillCustomerInfo: async function(num)
	{
		orders= await model.FillCustomerInfo(num);		
		view.FillCustomerInfo(orders,num);
	},
	/**
	*searches orders by entered sentence 
	
	*/
	SearchOrder: async function()
	{
		orders= await model.SearchOrder();
		inputvalue= await view.SearchOrderGetInput();
		view.SearchOrder(inputvalue,orders);
	},
	/**
	* sortes table of products by the name of product (ascending)
	*@param {int} num - current order id
	*/
	SortTableByProductAsc: async function(num)
	{
		orders= await model.SortTableByProductAsc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("product","icons/sort-reverse-alphabetical.svg","SortTableByProductDesc",num);
	},
	/**
	* sortes table of products by the name of product (descending)
	*@param {int} num - current order id
	*/
	SortTableByProductDesc: async function(num)
	{
		orders= await model.SortTableByProductDesc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("product","icons/sort-by-alphabet.svg","SortTableByProductAsc",num);
	},
	/**
	* sortes table of products by quantity of products (ascending)
	*@param {int} num - current order id
	*/
	SortTableByQuantityAsc: async function(num)
	{
		orders= await model.SortTableByQuantityAsc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("quantity","icons/sort-descending.svg","SortTableByQuantityDesc",num);
	},
	/**
	* sortes table of products by quantity of products (descending)
	*@param {int} num - current order id
	*/
	SortTableByQuantityDesc: async function(num)
	{
		orders= await model.SortTableByQuantityDesc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("quantity","icons/sort-ascending.svg","SortTableByQuantityAsc",num);
	},
	/**
	* sortes table of products by unit price of product (ascending)
	*@param {int} num - current order id
	*/
	SortTableByUnitPriceAsc: async function(num)
	{
		orders= await model.SortTableByUnitPriceAsc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("unit","icons/sort-descending.svg","SortTableByUnitPriceDesc",num);
	},
	/**
	* sortes table of products by unit price of product (descending)
	*@param {int} num - current order id
	*/
	SortTableByUnitPriceDesc: async function(num)
	{
		orders= await model.SortTableByUnitPriceDesc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("unit","icons/sort-ascending.svg","SortTableByUnitPriceAsc", num);
	},
	/**
	* sortes table of products by total price of product (ascending)
	*@param {int} num - current order id
	*/
	SortTableByTotalPriceAsc: async function(num)
	{
		orders= await model.SortTableByTotalPriceAsc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("total","icons/sort-descending.svg","SortTableByTotalPriceDesc",num);
	},
	/**
	* sortes table of products by total price of product (descending)
	*@param {int} num - current order id
	*/
	SortTableByTotalPriceDesc: async function(num)
	{
		orders= await model.SortTableByTotalPriceDesc(num);		
		view.FillTableAfterSort(num,orders);
		view.ChangeSortingImage("total","icons/sort-ascending.svg","SortTableByTotalPriceAsc",num);
	},
	/**
	* searches product of current id by entered sentence
	*@param {int} num - current order id
	*/
	SearchProduct: async function(num)
	{
		orders= await model.SearchProduct(num);
		inputvalue= await view.SearchProductGetInput();
		view.SearchProduct(inputvalue,orders,num);
	},
	/**
	* creates new order: gets values from inputs and pushes them to DB
	*/
	CreateNewOrder: async function()
	{
		// view.PopUpShow();
		orders= await view.CreateNewOrder();
		if(orders!=0){
		model.CreateNewOrder(orders);
		this.FillOrderList();
		view.PopUpHide();}
	},
	/**
	* allows user to edit customer data(sets inputs as editable)
	*@param {int} num - current order id
	*/
	EditCustomer: async function(num)
	{
		orders= await model.EditCustomer(num);
		view.EditCustomer(num, orders);
	},
	/**
	* updates data in customer form in DB
	*@param {int} num - current order id
	*/
	ChangeCustomer: async function(num)
	{
		orders = await view.ChangeCustomer(num);
		model.ChangeCustomer(num,orders);
		this.FillCustomerInfo(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="controller.EditCustomer('+num+')">Edit</p>';
	},
	/**
	* allows user to edit shipment data(sets inputs as editable)
	*@param {int} num - current order id
	*/
	EditShip: async function(num)
	{
		orders= await model.EditShip(num);
		view.EditShip(num, orders);
	},
	/**
	* updates data in customer form in DB
	*@param {int} num - current order id
	*/
	ChangeOrder: async function(num)
	{
		orders = await view.ChangeOrder(num);
		model.ChangeOrder(num,orders);
		this.FillShippingAdress(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="controller.EditShip('+num+')">Edit</p>';
	},
	/**
	* cancels shipment editing
	*@param {int} num - current order id
	*/
	CancelChange: async function(num)
	{
		this.FillShippingAdress(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="controller.EditShip('+num+')">Edit</p>';
	},
	/**
	* cancels customers editing
	*@param {int} num - current order id
	*/
	CancelChangeCust: async function(num)
	{
		this.FillCustomerInfo(num);
		document.getElementById("divv").innerHTML='<h3>Shipping address</h3><p class="edit-ship"'+
			'id="edit-ship" onclick="controller.EditCustomer('+num+')">Edit</p>';
	},
	/**
	* deletes current order from DB
	*@param {int} num - current order id
	*/
	DeleteOrder: async function(num)
	{
		model.DeleteOrder(num);
		this.FillOrderList();
		view.PopUpHideDelOrd();
	},
	/**
	* allows user to create new product
	*@param {int} num - current order id
	*/
	CreateNewProduct: async function(num)
	{
		// view.PopUpShow();
		orders= await view.CreateNewProduct(num);
		if(orders!=0){
		model.CreateNewProduct(orders);
		this.FillTable(num);
		view.PopUpHideNewProduct();}
	},
	/**
	* Deletes product
	*@param {int} num - current order id
	*/
	DeleteProduct: async function(num)
	{
		model.DeleteProduct(num);
		this.FillTable(num);
		view.PopUpHideDelProd();
	},
	/**
	* places map on page
	*@param {int} num - current order id
	*/
	OpenMap : async function(num)
	{
		document.getElementById("truck").setAttribute("style", "");
		document.getElementById("truck").setAttribute("src", "icons/DeliveryCar.png");
			document.getElementById("boss").setAttribute("style", "");
			document.getElementById("boss").setAttribute("src", "icons/processor.png");
			document.getElementById("map").setAttribute("style", "border-bottom: 3px solid blue");
			document.getElementById("map").setAttribute("src", "icons/mapSelected.png");
		orders= await model.OpenMap(num);
		address='';
		address= orders.shipTo.region;//may add found.ShipTo.adress
		this.CreateMap(address);
	},
	/**
	* initiates map
	*/
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
	},
	/**
	*gets id from URL
	*/
	GetIDfromURL:  function()
	{
		view.ViewAnimation();
		var id='id';
		var s = window.location.search;
    s = s.match(new RegExp(id + '=([^&=]+)'));
    return s;

	},
	/**
	* sets current order id as id from URL
	*/
	GetCurrentID: async function() //http://localhost:3000/?id=4
	{
		
		var res= this.GetIDfromURL();
		var orders = await model.FillOrderList();		
		if (res != void 0)
		{
			await this.FillAllInfo(res[1]);
		}
		else
		{
			await this.FillAllInfo(orders[0].id);
		}
		view.HideAnimation();
	}
};