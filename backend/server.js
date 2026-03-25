// Step 4: Import dependencies
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
// Test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
}); 
 // GET all messages
app.get("/messages", async (req, res) => {
  try {
    const { data, error } = await supabase.from("messages").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: [] });
  }
});
// POST /contact → Save a message
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
// Start server ✅ ← Add it **here, at the very bottom**
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));