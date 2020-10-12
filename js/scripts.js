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
    

Pizza.prototype.calculateTotalPrice = function() {

    var total = 0;
    var deliveryPrice = 0;
    var sizePrice = this.getPizzaSizePrice(this.pizzaSize);
    var totalToppings = 0;

    if(this.isDelivered){
        deliveryPrice = this.getDeliveryPrice();
    }

    this.toppings.forEach(function(topping) {
        totalToppings += topping.toppingPrice;
    });

    total = deliveryPrice + sizePrice + totalToppings;

    return total;

}



//front-end logic
$("document").ready(function() {

    $("input#delivery-yes").click(function() {
        alert("The delivery charge is : "+ new Pizza().getDeliveryPrice());
        $("#delivery-address").show();
    })

    $("input#delivery-no").click(function(){
        $("#delivery-address").hide();
    })

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
        
        for(var i=0; i<selectedToppings.length; i++) {
            if(selectedToppings[i] === "onion"){
                orderedPizza.toppings.push(onion)
            }
            if(selectedToppings[i] === "tomatoe"){
                orderedPizza.toppings.push(tomatoe)
            }
            if(selectedToppings[i] === "cheese"){
                orderedPizza.toppings.push(cheese)
            }
            if(selectedToppings[i] === "spinach"){
                orderedPizza.toppings.push(spinach)
            }
            if(selectedToppings[i] === "mushroom"){
                orderedPizza.toppings.push(mushroom)
            }
            if(selectedToppings[i] === "olive"){
                orderedPizza.toppings.push(olive)
            }
            if(selectedToppings[i] === "chicken"){
                orderedPizza.toppings.push(chicken)
            }
            if(selectedToppings[i] === "saucage"){
                orderedPizza.toppings.push(saucage)
            }
            if(selectedToppings[i] === "ham"){
                orderedPizza.toppings.push(ham)
            }
            if(selectedToppings[i] === "pepper"){
                orderedPizza.toppings.push(pepper)
            }
        }
        

        if(deliveryChoice === "true"){
           
            deliveryAddress = $("#address").val();
            orderedPizza.setDeliveryAddress(deliveryAddress);
            orderedPizza.isDelivered = true;
        }

        var totalPrice = orderedPizza.calculateTotalPrice();

        $(".total-price").append("<h3 class='alert alert-info mt-2'> The Total charge is " + totalPrice + " RwF</h3>")

        event.preventDefault();
    });


   

});