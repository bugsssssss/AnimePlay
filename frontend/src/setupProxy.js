// setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/media",
		createProxyMiddleware({
			target: "http://localhost:8000", // Change the target URL if your Django server is running on a different port
			changeOrigin: true,
		})
	);
};
