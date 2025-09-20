require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const contactRouter = require('./routes/contactRoutes');
const templeRouter = require('./routes/templeRoutes');
const bookRoutes = require('./routes/bookRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');



const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true })); // optional
app.set('json spaces', 2);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// Mount your temple routes at /api/temples

app.use('/api/temples', templeRouter); // ✅
// API route
app.use('/api/contacts', contactRouter);

app.use('/api/books', bookRoutes);


// Connect to MongoDB and then start server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');

        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });


    
// 404 fallback
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});



