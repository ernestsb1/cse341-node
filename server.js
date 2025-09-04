require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const contactRouter = require('./routes/contactRoutes');

const app = express();
app.set('json spaces', 2);

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB and then start server
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');

        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });

    // API route
  app.use('/api/contacts', contactRouter);



