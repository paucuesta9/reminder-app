export const login = async (username, password) => {
  const response = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}