const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// File path for orders.json
const ordersFilePath = path.join(__dirname, 'orders.json');

// Endpoint to handle order submissions
app.post('/api/orders', (req, res) => {
    const orderDetails = req.body;

    // Save the order details to a JSON file
    const orders = fs.existsSync(ordersFilePath)
        ? JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'))
        : [];

    orders.push(orderDetails);

    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

    res.status(201).send({ message: 'Order placed successfully!' });
});




// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
