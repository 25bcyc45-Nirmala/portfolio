// Step 4: Import dependencies
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Supabase client (replace with your own keys)
const supabase = createClient(
  "https://jdboduuamelrvjelrqrg.supabase.co", // your Supabase URL
  "sb_publishable_5wyLcRU0X8PeEvhxW2Q6Pg_L9iC2Lkf" // your Supabase anon/public key
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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));