const API_URL = "http://api.weatherapi.com/v1/forecast.json?key=f03fba6ff7e347d9b1c234152243110&q=10001&days=3&aqi=yes&alerts=no/api"; // Base URL for your API

export const clearLocalStorage = () => {
  localStorage.clear();
};


// User Routes:

// POST /user - Create a new user

export async function createNewUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Ensure you hash the password before storing
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
}

// GET /user/:id - Get a user by ID

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user' });
  }
}


// PUT /user/:id - Update a user by ID

export async function updateUserById(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password, // Consider hashing the password
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
}

// DELETE /user/:id - Delete a user by ID

export async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(400).json({ error: 'Error deleting user' });
  }
}



// Post Routes:

// POST /post - Create a new post



// GET /post/:id - Get a post by ID




// PUT /post/:id - Update a post by ID




// DELETE /post/:id - Delete a post by ID




// Comment Routes:

// POST /comment - Create a new comment




// GET /comment/:id - Get a comment by ID




// DELETE /comment/:id - Delete a comment by ID





// Location Routes:

// POST /location - Create a new location



// GET /location/:id - Get a location by ID



// Current Weather and Forecast (if needed):

// Define routes to get current weather and forecasts.