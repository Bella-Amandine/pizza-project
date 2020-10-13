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
    var crustPrice = this.getPizzaCrustPrice(this.pizzaCrust)
    var totalToppings = 0;

    if(this.isDelivered){
        deliveryPrice = this.getDeliveryPrice();
    }

    this.toppings.forEach(function(topping) {
        totalToppings += topping.toppingPrice;
    });

    total = deliveryPrice + sizePrice + crustPrice + totalToppings;

    return total;

}



//front-end logic
$("document").ready(function() {

    $("input.delivery-yes").click(function() {
        alert("The delivery charge is : "+ new Pizza().getDeliveryPrice());
        $("#delivery-address").show();
    })

    $("input#delivery-no").click(function(){
        $("#delivery-address").hide();
    })

    var counter = 0;
    $("#new-order-btn").click(function() {
        counter ++;
        $("#new-order").append("<div class='form-group'>"+
                                   "<label for='pizza-name'>Name</label>"+
                                    "<input id='pizza-name' type='text' class='form-control'>"+
                                "</div>"+

                                "<div class='form-group'>"+
                                   "<label for='pizza-size'>Select Pizza Size</label>"+
                                   "<select name='pizza-size' id='pizza-size' class='form-control'>"+
                                       "<option value='small'>Small</option>"+
                                       "<option value='medium'>Medium</option>"+
                                       "<option value='large'>Large</option>"+
                                   "</select>"+
                                "</div>"+

                                "<div class='form-group'>"+
                                   "<label for='pizza-crust'>Prefered Pizza Crust</label>"+
                                   "<select name='pizza-crust' id='pizza-crust' class='form-control'>"+
                                      "<option value='crispy'>Crispy</option>"+
                                       "<option value='stuffed'>Stuffed</option>"+
                                       "<option value='glutted-free'>Glutten-Free</option>"+
                                   "</select>"+
                                "</div>"+

                                "<div class='form-group'>"+
                                   "<label for='toppings'>Choose your prefered toppings: </label>"+
                                   "<div class='row'>"+

                                       "<div class='toppings'>"+
                                          "<label for='onion' class='col-md-2'>"+
                                               "<input name='toppings[]' type='checkbox' value='onion' id='onion'>"+
                                                    "Onion"+
                                           "</label>"+

                                            "<label for='tomatoe' class='col-md-2'>"+
                                                "<input name='toppings[]' type='checkbox' value='tomatoe' id='tomatoe'>"+
                                                    "Tomatoe"+
                                            "</label>"+

                                            "<label for='Cheese' class='col-md-2'>"+
                                                "<input name='toppings[]' type='checkbox' value='cheese' id='Cheese'>"+
                                                    "Cheese"+
                                            "</label>"+

                                            "<label for='Spinach' class='col-md-2'>"+
                                                "<input name='toppings[]' type='checkbox' value='spinach' id='Spinach'>"+
                                                    "Spinach"+
                                            "</label>"+

                                           "<label for='Mushrooms' class='col-md-3'>"+
                                               "<input name='toppings[]' type='checkbox' value='mushroom' id='Mushroom'>"+
                                                  "Mushrooms"+
                                           "</label>"+

                                           "<label for='Olives' class='col-md-2'>"+
                                               "<input name='toppings[]' type='checkbox' value='olive' id='Olive'>"+
                                                    "Olives"+
                                          " </label>"+

                                           "<label for='Saucage' class='col-md-2'>"+
                                               "<input name='toppings[]' type='checkbox' value='saucage' id='Saucage'>"+
                                                    "Saucage"+
                                           "</label>"+

                                           "<label for='Chicken' class='col-md-2'>"+
                                               "<input name='toppings[]' type='checkbox' value='chicken' id='Chicken'>"+
                                                    "Chicken"+
                                           "</label>"+

                                          " <label for='Pepper' class='col-md-2'>"+
                                               "<input name='toppings[]' type='checkbox' value='pepper' id='Pepper'>"+
                                                    "Pepper"+
                                          " </label>"+

                                           "<label for='Ham' class='col-md-2'>"+
                                              " <input name='toppings[]' type='checkbox' value='ham' id='Ham'>"+
                                                    "Ham"+
                                          " </label>"+
                                      "</div>"+

                                    "</div>"+
                              "</div>"+

                               "<div class='form-group'>"+
                                   "<label for='delivered-option'>Delivered? <small>YES/NO</small></label>"+

                                   "<div class='form-check'>"+
                                       "<input type='radio' name='delivered-'" +counter+ " value='true' id='delivery-yes' class='form-check-input delivery-yes'> "+
                                       "<label for='delivery-yes' class='form-check-label'>YES</label>"+
                                   "</div>"+
                                   "<div class='form-check'>"+
                                       "<input type='radio' name='delivered-'" +counter+ " value='false' id='delivery-no' class='form-check-input'> "+
                                       "<label for='delivery-no' class='form-check-label'>NO</label>"+
                                   "</div>"+
        
                               "</div>"+

                               "<div id='delivery-address' class='form-group'>"+
                                   "<label for='address'>Your Address</label>"+
                                   "<input id='address' type='text' class='form-control'>"+
                               "</div>")
    });


    $("form#order-form").submit(function(event) {
        var orders = [];
        var totalOrderedPrice = 0;

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

        alert("Thank you for ordering.You order will be delivered to your place : "+orderedPizza.deliveryAddress);

        var totalPrice = orderedPizza.calculateTotalPrice();
        totalOrderedPrice += totalPrice;

        
        orders.push(orderedPizza);
        

        $(".total-price").append("<h3 class='alert alert-info mt-2'> The Total charge is " + totalOrderedPrice + " RwF</h3>")

        $("#checkout").click(function() {
           $("#show-order").show();
           orders.forEach(function(orderedPizza){
            
            $(".ordered-pizza-name").text(orderedPizza.pizzaName);
            $(".ordered-pizza-size").text(orderedPizza.pizzaSize);
            $(".ordered-pizza-crust").text(orderedPizza.pizzaCrust);
            $(".delivery-choice").text(orderedPizza.isDelivered);
 
            orderedPizza.toppings.forEach(function(topping) {
                $("#toppings").append("<li>" +topping.toppingName+ "</li>")
            });
 
            $(".ordered-pizza-name-price").text(0);
            $(".ordered-pizza-size-price").text(orderedPizza.getPizzaSizePrice);
            $(".ordered-pizza-crust-price").text(orderedPizza.getPizzaCrustPrice);

              if(orderedPizza.isDelivered === true){
                $(".delivery-choice-price").text(orderedPizza.getDeliveryPrice);
              }else {
                $(".delivery-choice-price").text(0);
              }
               
 
            orderedPizza.toppings.forEach(function(topping) {
                $("#toppings-price").append("<li>" +topping.toppingPrice+ "</li>")
            });

            $("#toppings-price").append("<hr>");
           });

           $(".total").text(totalOrderedPrice)
        });


        event.preventDefault();
    });
   

});