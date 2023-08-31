const express = require('express');
// const cors = require('cors');
const db = require('./src/backend/config/db'); 
const app = express();
const PORT = process.env.PORT || 3001;


// app.use(cors());
app.use(express.json());

const vendorRoutes = require('./src/backend/routes/vendorRoutes');
const purchaseRoutes = require('./src/backend/routes/purchaseRoutes');
const saleRoutes = require('./src/backend/routes/saleRoutes');

app.use('/api/vendors', vendorRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', saleRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
