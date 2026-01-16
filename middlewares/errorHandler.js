// middlewares/errorHandler.js

// 404 Handler
export function notFound(req, res, next) {
  res.status(404).json({ message: "Route Not Found" });
}

// Global Error Handler
export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
}
