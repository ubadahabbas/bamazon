const mysql = require("mysql");
const inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon_DB"
});


inquirer.prompt([{
    name: "choice",
    type: "rawlist",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    message: "What do you want to do?"
}
]).then(function (answer) {
    switch (answer.choice) {
        case 'View Products for Sale':
            viewProducts();
            break;
        case 'View Low Inventory':
            lowInventory();
            break;
        case 'Add to Inventory':
            addToInventory();
            break;
        case 'Add New Product':
            addProduct();
            break;
    }

    function viewProducts() {
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].id)
                console.log("Product Name: " + res[i].product_name)
                console.log("In Stock: " + res[i].stock_quantity)
                console.log("Price: " + res[i].price)
                console.log("--------------------------------------------")
            }
        })
        connection.end();

    }

    function lowInventory() {

        connection.query("SELECT * FROM products", function (err, res) {

            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity <= 50) {
                    console.log("Low In Stock: ")
                    console.log("Product ID: " + res[i].id)
                    console.log("Product Name: " + res[i].product_name)
                    console.log("Quantity Available: " + res[i].stock_quantity)
                    console.log("--------------------------------------------")
                }
            }
        })
        connection.end();

    };

    function addToInventory() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([{
                    name: "name",
                    type: "rawlist",
                    choices: function () {
                        var choicesArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choicesArray.push(res[i].product_name);
                        }
                        return choicesArray;
                    },
                    message: "Select product to add inventory."
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many new units?"
                }])
                .then(function (answer) {
                    var newInv =0;
                    var id;
                    for (var i=0; i<res.length;i++){
                        if(answer.name == res[i].product_name){
                            newInv = res[i].stock_quantity+parseInt(answer.units);
                            id = res[i].id;
                            console.log(res[i].stock_quantity)
                            console.log(parseInt(answer.units))
                        }
                    }
                    var query = `UPDATE products SET stock_quantity = ${newInv} WHERE id =${id}`;
                    connection.query(query,function(err,res){
                        if (err) throw err;
                        console.log("Inventory Updated")
                        console.log("New Inventroty is: "+  newInv)
                        connection.end();
                    })

                })
        })
    };

   function addProduct(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
                .prompt([{
                    name: "name",
                    type: "input",
                    message: "Enter product name."
                },
                {
                    name: "department",
                    type: "input",
                    message: "Enter department name."
                },
                {
                    name: "price",
                    type: "input",
                    message: "Enter selling price."
                },
                {

                    name: "stock",
                    type: "input",
                    message: "Enter stock quantity."
                }
            ]).then (function(answer){
                console.log(answer.name)
                var price = parseInt(answer.price);
                var stock = parseInt(answer.stock);
                var query = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${answer.name}", "${answer.department}", ${price}, ${stock})`;
                connection.query(query,function(err,res){
                    if (err) throw err;
                    console.log(answer)
                    console.log("Product added successfully")
                    connection.end();
                })
            })

    })
   }

});
