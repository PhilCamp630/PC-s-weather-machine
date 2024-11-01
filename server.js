const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/health', async (req, res) => {
    try {
      await prisma.$connect(); // Test the connection
      res.status(200).json({ status: 'Connected to the database' });
    } catch (error) {
      res.status(500).json({ error: 'Database connection failed' });
    }
  });

// Create a new user
app.post('/user', async (req, res) => {
  const { name, email, password } = req.body; // Ensure password is included
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Consider hashing passwords before storing
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Create a new post for a user
app.post('/post', async (req, res) => {
  const { title, content, userId, locationId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        user: { connect: { id: userId } }, // Link to the user
        location: { connect: { id: locationId } }, // Link to the location
      },
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error creating post' });
  }
});

// Create a new comment on a post
app.post('/comment', async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } }, // Link to the post
        user: { connect: { id: userId } }, // Link to the user
      },
    });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Error creating comment' });
  }
});

// Create a new location
app.post('/location', async (req, res) => {
  const { name, region, country, lat, lon, tz_id, localtime_epoch, localtime } = req.body;
  try {
    const location = await prisma.location.create({
      data: {
        name,
        region,
        country,
        lat,
        lon,
        tz_id,
        localtime_epoch,
        localtime,
      },
    });
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: 'Error creating location' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
