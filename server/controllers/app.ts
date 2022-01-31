export default function renderApp(req, res) {
  const resHeaders = res.getHeaders();
  // req.tld!
  const faviconLang = ['com', 'com.tr'].includes('ru') ? 'en' : 'ru';
  const { ip, nonce } = req;

  res.renderBundle('desktop', {
    faviconLang,
    ip,
    nonce,
    resHeaders,
  });
}
