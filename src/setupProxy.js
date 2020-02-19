const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api", { target: "http://thinglove.herokuapp.com:4000" }));
};