//backend logic
var Pizza = function(pizzaName, pizzaCrust, pizzaSize){
    this.pizzaName = pizzaName;
    this.pizzaCrust = pizzaCrust;
    this.pizzaSize = pizzaSize;
    this.toppings = [];
    this.isDelivered = false;
}

var Topping = function(toppingName, toppingPrice) {
    this.toppingName = toppingName;
    this.toppingPrice = toppingPrice;
}

Pizza.prototype.getDeliveryPrice = function() {
    return 1000;
}

Pizza.prototype.setDeliveryAddress = function(deliveryAddress) {
    this.deliveryAddress = deliveryAddress;
}

Pizza.prototype.getPizzaSizePrice = function(pizzaSize) {

    if(pizzaSize === "small") {
        return 1000;
    }
    else if(pizzaSize === "medium"){
        return 2000;
    }
    else {
        return 2500;
    }
}

Pizza.prototype.getPizzaCrustPrice = function(crust) {
    if(this.pizzaCrust === "crispy"){
        return 1000;
    }else if(this.pizzaCrust === "stuffed") {
        return 1500;
    }else {
        return 800;
    }
}

Pizza.prototype.setToppings = function(toppings) {
    
    for(var i=0; i<toppings.length; i++) {

        if(toppings[i] === "onion"){
            this.toppings.push(onion)
        }
        if(toppings[i] === "tomatoe"){
            this.toppings.push(tomatoe)
        }
        if(toppings[i] === "cheese"){
            this.toppings.push(cheese)
        }
        if(toppings[i] === "spinach"){
            this.toppings.push(spinach)
        }
        if(toppings[i] === "mushroom"){
            this.toppings.push(mushroom)
        }
        if(toppings[i] === "olive"){
            this.toppings.push(olive)
        }
        if(toppings[i] === "chicken"){
            this.toppings.push(chicken)
        }
        if(toppings[i] === "saucage"){
            this.toppings.push(saucage)
        }
        if(toppings[i] === "ham"){
            this.toppings.push(ham)
        }
        if(toppings[i] === "pepper"){
            this.toppings.push(pepper)
        }
    }
}

var onion = new Topping("onion", 200);
var tomatoe = new Topping("tomatoe", 200);
var cheese = new Topping("cheese", 500);
var spinach = new Topping("spinach", 200);
var mushroom = new Topping("mushroom", 300);
var olive = new Topping("olive", 300);
var saucage = new Topping("saucage", 500);
var chicken = new Topping("chicken", 1000);
var pepper = new Topping("pepper", 200);
var ham = new Topping("ham", 1000);
    

Pizza.prototype.calculateTotalPrice = function(numberOfOrders) {

    var total = 0;
    var deliveryPrice = 0;
    var sizePrice = this.getPizzaSizePrice(this.pizzaSize);
    var crustPrice = this.getPizzaCrustPrice(this.pizzaCrust)
    var totalToppings = 0;

    if(this.isDelivered){
        deliveryPrice = this.getDeliveryPrice();
    }

    this.toppings.forEach(function(topping) {
        totalToppings += topping.toppingPrice;
    });

    total = (deliveryPrice + sizePrice + crustPrice + totalToppings) * numberOfOrders;

    return total;

}






//front-end logic
$("document").ready(function() {

    $("input.delivery-yes").click(function() {
        alert("The delivery charge is : "+ new Pizza().getDeliveryPrice());
        $("#delivery-address").show();
    });

    $("input#delivery-no").click(function(){
        $("#delivery-address").hide();
    });

    function resetField() {
        $("#pizza-name").val("");
        $("input[type='radio'][name='delivered']").prop("checked", false);
        $("input[type='checkbox'][name='toppings[]']").prop("checked", false);
        $("#delivery-address").val("");
        $("#delivery-address").hide();
        $("#number-of-pizza").val("");
    }


    $("form#order-form").submit(function(event) {

        var inputtedPizzaName = $("#pizza-name").val();
        var selectedPizzaSize = $("#pizza-size").val();
        var selectedPizzaCrust = $("#pizza-crust").val();
        var deliveryChoice = $("input[type='radio'][name='delivered']:checked").val();
        var deliveryAddress = "";

        var selectedToppings = [];
        var index = 0;

        $(":checkbox:checked").each(function() {
            selectedToppings[index ++] = $(this).val();
        });

        var orderedPizza = new Pizza(inputtedPizzaName, selectedPizzaCrust, selectedPizzaSize);
        
        orderedPizza.setToppings(selectedToppings);

        if(deliveryChoice === "true"){
           
            deliveryAddress = $("#address").val();
            orderedPizza.setDeliveryAddress(deliveryAddress);
            orderedPizza.isDelivered = true;
            alert("Thank you for ordering.You order will be delivered to your place : "+orderedPizza.deliveryAddress);
            
        }

        var numberOfOrders = parseInt($("#number-of-pizza").val());

        var totalPrice = orderedPizza.calculateTotalPrice(numberOfOrders);

        $(".total-price").append("<h3 class='alert alert-info mt-2'> The Total charge is " + totalPrice + " RwF</h3>")


        $("#checkout").click(function() {
           $("#show-order").show();
            
            $(".ordered-pizza-name").text(orderedPizza.pizzaName);
            $(".ordered-pizza-size").text(orderedPizza.pizzaSize);
            $(".ordered-pizza-crust").text(orderedPizza.pizzaCrust);
            $(".delivery-choice").text(orderedPizza.isDelivered);
            $(".number-of-order").text(numberOfOrders);
 
            orderedPizza.toppings.forEach(function(topping) {
                $("#toppings").append("<li>" +topping.toppingName+ "</li>")
            });
 
            $(".ordered-pizza-name-price").text(0);
            $(".ordered-pizza-size-price").text(orderedPizza.getPizzaSizePrice(selectedPizzaSize));
            $(".ordered-pizza-crust-price").text(orderedPizza.getPizzaCrustPrice(this.pizzaCrust));

              if(orderedPizza.isDelivered === true){
                $(".delivery-choice-price").text(orderedPizza.getDeliveryPrice);
              }else {
                $(".delivery-choice-price").text(0);
              }
               
 
            orderedPizza.toppings.forEach(function(topping) {
                $("#toppings-price").append("<li>" +topping.toppingPrice+ "</li>")
            });

           $(".total").text(totalPrice)

        });

        event.preventDefault();

        resetField();

    });
   

});