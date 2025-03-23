// filepath: /Users/akshatshah/Desktop/project final/electro/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Endpoint to save order details
app.post('/save-order', (req, res) => {
    const orderDetails = req.body;

    // Define the file path to save the order
    const filePath = path.join(__dirname, 'orders.json');

    // Read existing orders from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        let orders = [];
        if (!err && data) {
            orders = JSON.parse(data);
        }

        // Add the new order to the list
        orders.push(orderDetails);

        // Save the updated orders back to the file
        fs.writeFile(filePath, JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Error saving order:', err);
                return res.status(500).send('Failed to save order.');
            }
            res.status(200).send('Order saved successfully.');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});