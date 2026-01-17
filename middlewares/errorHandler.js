// middlewares/errorHandler.js

// 404 Handler
export function notFound(req, res, next) {
  res.status(404).json({ message: "Route Not Found" });
}

// Global Error Handler
export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Agar response already sent hai
  if (res.headersSent) {
    return next(err); 
  }

  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
}
