"use strict";

const express = require("express"),
      app     = express(),
      path    = require("path"),
      PORT    = process.env.NODE_PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.use(express.static("public"));
}

require("./api")(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});