const fetchdetail = async (endpoint) => {
  var url = `${process.env.NEXT_API_BASEURL}${endpoint}`;

  const response = await fetch(url, {
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

const fetchdetailfromindexserver = async (endpoint) => {
  var url = `${process.env.NEXT_API_INDEX_BASEURL}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const Pushdetailfromindexserver = async (endpoint, payload) => {
  var url = `${process.env.NEXT_API_INDEX_BASEURL}${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json " },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  return result;
};

export {
  fetchdetail,
  Pushdetail,
  fetchdetailfromindexserver,
  Pushdetailfromindexserver,
};
