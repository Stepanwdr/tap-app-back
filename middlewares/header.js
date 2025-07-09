const ALLOW_ORIGINS = [
  'http://localhost:5173',
  'https://descending-affiliates-within-bernard.trycloudflare.com'
];

export default function headers(req, res, next) {
  try {
    const { method } = req;
    const { origin } = req.headers;
    if (method === 'OPTIONS') {
      next();
      return;
    }

    if (ALLOW_ORIGINS.includes(origin)) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
    }

    next();
  } catch (e) {
    next(e);
  }
}