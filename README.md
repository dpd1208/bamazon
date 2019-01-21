# Bamazon App

## How it works
This CLI application is an amazon-style, online shopping service. There are a number of available products presented to the customer for purchase. 

Using inquirer, the application will ask the customer what product they would like to buy and in what quantity. If inventory of the item is sufficient, the order will be fulfilled. If not, the customer will be prompted of such, and asked again if they would like to make a purchase. 

## Steps to running the app
1. Run the app using node bamazonCustomer.js to review a list of available products
![alt text](/images/node_CLI_bamazon.PNG  "Logo Title Text 1")

2. When prompted, enter the product ID and amount desired to get order confirmation
![alt text](/images/bamazon_order.PNG  "Logo Title Text 1")

3. If amount desired exceed inventory available, order will be rejected
![alt text](/images/bamazon_order.PNG  "Logo Title Text 1")

## Technologies
-The inventory information is stored in a MySQL database. 
-Inquirer package is used for customer inputs.
-MySQL package is used to query and update the database through node.

## Future State
1. Admin access to view and manage inventoru
2. Supervisor access to complete admin tasks, as well as add new products. 