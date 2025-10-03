// server.js
import express from "express";
import pool from "./db.js";
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Serve a static HTML page
app.get("/init", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS books (
            id BIGSERIAL PRIMARY KEY,           
            title VARCHAR(255) NOT NULL,        
            isbn VARCHAR(50) UNIQUE NOT NULL,   
            published_date DATE,                
            author_id BIGINT,                   
            CONSTRAINT fk_author
            FOREIGN KEY (author_id) REFERENCES authors(id)
            ON DELETE SET NULL              
            );

            `);
    res.send("✅ tables table created (if not already).");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error creating table");
  }
});
// Example API route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express server 🚀" });
});

app.post("/authors ", async (req, res) => {
  try {
    const { title, isbn, published_date,author_id } = req.body;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error creating table");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
