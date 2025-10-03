// index.js
const express = require('express');
const cors = require('cors');

// Impor rute
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const therapistRoutes = require('./routes/therapist.routes');
const postRoutes = require('./routes/post.routes');
const groupRoutes = require('./routes/group.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rute Utama
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ScribeSoul API!' });
});

// Gunakan rute yang sudah diimpor
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/therapists', therapistRoutes); 
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});