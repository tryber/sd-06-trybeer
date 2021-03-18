const POST = 'POST';
const fetchApiJsonBody = (urlParameter, body, method = POST) => fetch(
  `http://localhost:3001${urlParameter}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
).then((response) => response.json());

export default fetchApiJsonBody;
