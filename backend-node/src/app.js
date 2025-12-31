const express = require("express");
const requestId = require("./middleware/requestId.middleware");
const cors = require("cors");
const { globalLimiter } = require("./middleware/rateLimit.middleware");
const corsConfig = require("./config/cors.config");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const knowledgeRoutes = require("./routes/knowledge.routes");
const errorHandler = require("./middleware/errorHandler.middleware");
const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(requestId);
app.use(cors(corsConfig));
app.use(globalLimiter);

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/knowledge", knowledgeRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "TalkAi backend" });
});
app.use(errorHandler);

module.exports = app;
