const mysql = require("mysql");
const inquirer = require("inquirer")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID: " + results[i].id)
            console.log("Product Name: " + results[i].product_name)
            console.log("Price: " + results[i].price)
            console.log("--------------------------------------------")
        }
        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            message: "Which product would you like to purchase?"
        },
        {
            name: "units",
            type: "input",
            message: "How many units?"
        }
        ]).then(function (answer) {
            var productID;
            for (var i = 0; i < results.length; i++) {
                if (answer.choice == results[i].product_name) {
                    productID = results[i].id;
                    if (answer.units <= results[i].stock_quantity) {
                        var updatedQuantity = results[i].stock_quantity - answer.units;
                        var totalCost = answer.units * results[i].price;
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                { stock_quantity: updatedQuantity },
                                { id: productID }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("------------------------------------------")
                                console.log("Order placed successfully");
                                console.log("Order Summary  --->");
                                console.log("Product: " + answer.choice);
                                console.log("Quantity: "+ answer.units);
                                console.log("Total: $"+ totalCost);
                                console.log("------------------------------------------")
                            }
                        );
                    } else {
                        console.log("Quantity available is: " + results[i].stock_quantity);
                    }
                }
            }
        })
    })
}
