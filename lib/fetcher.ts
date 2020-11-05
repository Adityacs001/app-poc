const fetchdetail = async (endpoint) => {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const Pushdetail = async (endpoint, payload) => {
  var url = `${process.env.NEXT_API_BASEURL}${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json " },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  return result;
};

export { fetchdetail, Pushdetail };
