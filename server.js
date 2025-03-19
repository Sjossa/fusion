const express = require("express");
const multer = require("multer");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// PostgreSQL connection
const pool = new Pool({
  user: "yourusername",
  host: "localhost",
  database: "yourdatabase",
  password: "yourpassword",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

// JWT Authentication
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username }, "your_jwt_secret");
  res.json({ token });
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

// File upload with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /csv|xlsx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: File upload only supports CSV and XLSX formats.");
  }
};

const upload = multer({ storage, fileFilter });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file format.");
  }
  res.send("File uploaded successfully.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
