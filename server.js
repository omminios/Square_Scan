const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const prefix = 'WKE3O6QVO3YUB7GQLG5UGYKZ';
const Auth = 'EAAAEHFkgFd6vbgT05doAvMWApQBecbXnDZq6zM2BWAhQ7i318fqOWd39iZQfWeZ';
const Sandbox = 'sandbox-sq0idb-I3jXA8hCO2Glh9bq_HZ76w';
const URL = 'https://connect.squareupsandbox.com/v2/catalog/list?types=item_variation';
const URL2 =`https://connect.squareupsandbox.com/v2/catalog/object/${prefix}`;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

const axios = require('axios');

app.use(cors('localhost:5500'));


app.get('/findsku/:sku', async (req, res) => {
    const skuValue = req.params.sku;

    try {
        const response = await axios.get(URL, {
            headers: {
                'Authorization': `Bearer ${Auth}`,
                'Square-Version': '2022-03-23',
                'Content-Type': "application/json"
            }
        });

        let isSkuFound = false;
        if (response.data) {
            const Item_list = response.data.objects;
            const Response_SKU = Item_list[0].item_variation_data.sku;
            const Item_name = Item_list[0].item_variation_data.name
            
            if (skuValue == Response_SKU) {
                isSkuFound = true;
                console.log(Item_name)
                res.json(isSkuFound);
            }
        } else {
            res.json(isSkuFound);
        }
    } catch (error) {
        console.error("Error:", error);
        res.json(isSkuFound);
    }
});





app.get('/getitem/', async (req, res) => {
    const skuValue = req.params.sku;
    
    try {
        const response = await axios.get(URL2, {
            headers: {
                'Authorization': `Bearer ${Auth}`,
                'Square-Version': '2022-03-23',
                'Content-Type': "application/json"
            }
        }).then(response => {
            const itemData = response.data.object.item_data;

            if (response.data) {
                console.log(itemData)
                res.json(itemData);
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
            
        })

        
        
    } catch (error) {
        console.error('Error fetching item from Square:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
