/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');
const winstonLogger = require('./winstonLogger');

const appProxy = (server) => {
  server.use(
    '/syk/oppfolgingsplan/api/oppfolgingsplanservice',
    createProxyMiddleware({
      target: process.env.SYFOOPPFOLGINGSPLANSERVICE_HOST,
      pathRewrite: {
        '^/syk/oppfolgingsplan/api/oppfolgingsplanservice': '/syfooppfolgingsplanservice/api',
      },
      onError: (err, req, res) => {
        winstonLogger.error(err);
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
