export const getReminders = async (token) => {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(NEXT_PUBLIC_API_URL + '/reminders', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status === 200) {
    const data = await response.json()
    return data
  }
  return []
};

export const getReminder = async (token, id) => {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(NEXT_PUBLIC_API_URL + `/reminders/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status === 200) {
    const data = await response.json()
    return data
  }
  return null
}