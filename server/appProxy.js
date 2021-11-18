/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

const appProxy = (server) => {
  server.use(
    '/oppfolgingsplan/api/syfooprest',
    createProxyMiddleware({
      target: process.env.SYFOOPREST_URL,
      pathRewrite: {
        '^/oppfolgingsplan/api/syfooprest': '/syfooprest/api',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );
};

module.exports = appProxy;
