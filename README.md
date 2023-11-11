# Express Timeout

[![GitHub license](https://img.shields.io/github/license/TrishCX/express-timeout.svg)](https://github.com/TrishCX/Express-Timeout/blob/main/LICENSE)

`express-timeout` is a middleware for [Express.js](https://expressjs.com/) that adds timeout functionality to your routes. With this middleware, you can easily set a timeout for specific routes, ensuring that requests that take too long are automatically terminated.

## Installation

```bash
npm install @imax.i7/express-timeout
```

## Usage

```javascript
const express = require("express");
const { RateLimitMiddleware } = require("@imax.i7/express-timeout");

const app = express();

app.use((req, res, next) =>
  RateLimitMiddleware({
    content: {
      error: "The user is now on a timeout.",
      req,
      res,
      next,
    },
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Options

You can customize the timeout duration and handle the timeout event.

```javascript
// Customize timeout duration (10 seconds) and handle timeout event
app.use((req, res, next) =>
  RateLimitMiddleware({
    req,
    res,
    next,
    onTimeout: handleTimeout,
  })
);

function handleTimeout(req, res) {
  res.status(503).send("Request timed out");
}
```

### Important Note

Make sure to place the `@imax.i7/express-timeout` middleware before your route handlers to ensure it takes effect.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

ISC
