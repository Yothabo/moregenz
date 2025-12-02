exports.handler = async function(event, context) {
  const apiKey = process.env.VITE_NEWSAPI_KEY;
  
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=security+OR+cybersecurity+OR+surveillance&language=en&sortBy=publishedAt&pageSize=2&apiKey=${apiKey}`
    );
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data.articles || [])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' })
    };
  }
};
