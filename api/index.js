"use strict";

module.exports = app => {
  app.use("/api/*", (req, res) => {
    return res.status(404).json({
      error: "Invalid endpoint"
    });
  });
};