const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db');
const movieRoutes = require('./movieRoutes');

app.use(cors()); 
app.use(express.json());
app.use('/api/movies', movieRoutes);

sequelize.sync().then(() => {
  console.log('✅ DB connected');
  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
}).catch(err => {
  console.error('❌ DB connection failed:', err);
});
