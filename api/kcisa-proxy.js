export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { numOfRows = '10', pageNo = '1', dtype = '', title = '공연' } = req.query;
  const serviceKey = '8c75fc35-e4a5-4992-8387-2aeb9c3aef28';

  const apiUrl = `http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&dtype=${encodeURIComponent(dtype)}&title=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(apiUrl);
    const text = await response.text();

    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.status(200).send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('<response><header><resultCode>99</resultCode><resultMsg>Proxy Error</resultMsg></header><body/></response>');
  }
}
