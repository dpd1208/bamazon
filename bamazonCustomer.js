//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

//connect to bamazon db
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

function start() {

    //show available products to the user 
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw erry;

        //confirm connection to bamazon db
        console.log("Bamazon App Loaded")
        console.log('----------------------------------------------------------------------------------------------------')
        //loop through products to show product info
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }

        //inquirer prompts user for product selection
        console.log(' ');
        inquirer.prompt([{
                    type: "input",
                    name: "id",
                    message: "Please enter the ID of the product you would like to purchase.",
                    validate: function (value) {
                        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },

                //inquirer prompts user for product qunatity
                {
                    type: "input",
                    name: "qty",
                    message: "Please enter the number of items of the product you would like to purchase.",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ])

            //create variables for user inputs and total due
            .then(function (ans) {
                var chosenProduct = (ans.id) - 1;
                var chosenQuantity = parseInt(ans.qty);
                var totalDue = parseFloat(((res[chosenProduct].price) * chosenQuantity).toFixed(2));

                //ensure there is enough of the product to purchase
                if (res[chosenProduct].stock_quantity >= chosenQuantity) {

                    //if enough, subtract amount chosen from products table
                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (res[chosenProduct].stock_quantity - chosenQuantity)
                        },
                        {
                            item_id: ans.id
                        }
                    ], function (err, result) {
                        if (err) throw err;
                        console.log("Purchase confirmed. The amount charged is $" + totalDue.toFixed(2) + ". Shipping included. Please allow up to 10 days for shipment.");
                    });

                } else {
                    console.log("The amount you chose is more than we have in inventory.");
                }

                //regardless of successful purchase, trigger whatElse function
                whatElse();
            })
    })


    //prompt user if they want to buy more items
    function whatElse() {
        inquirer.prompt([{
            type: "confirm",
            name: "reply",
            message: "Is there anything else you would like to purchase?"
        }]).then(function (ans) {
            if (ans.reply) {
                start();
            } else {
                console.log("Thanks for shopping at Bamazon!");
            }
        });
    }
};

start();