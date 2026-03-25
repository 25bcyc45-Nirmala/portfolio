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

console.log("Supabase URL:", process.env.SUPABASE_URL ? "✅ Set" : "❌ Missing");
console.log("Supabase Key:", process.env.SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing");
// Test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
}); 

// POST /api/contact → Save a message
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📝 Received contact form:", { name, email, message });

  // Check if Supabase is configured
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("❌ Supabase credentials missing!");
    return res.status(500).json({ success: false, error: "Server misconfigured" });
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ name, email, message }])
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    console.log("✅ Message saved:", data);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /contact → Save a message (backward compatibility)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📝 Received contact form:", { name, email, message });

  // Check if Supabase is configured
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("❌ Supabase credentials missing!");
    return res.status(500).json({ success: false, error: "Server misconfigured" });
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ name, email, message }])
      .select();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    console.log("✅ Message saved:", data);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// Start server ✅ ← Add it **here, at the very bottom**
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));