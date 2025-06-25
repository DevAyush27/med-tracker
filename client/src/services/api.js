const API_URL = 'http://localhost:5000/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function getMedicines(token) {
  const res = await fetch(`${API_URL}/medicine`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch medicines');
  return res.json();
}

export async function addMedicine(token, data) {
  const res = await fetch(`${API_URL}/medicine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to add medicine');
  return res.json();
}

export async function updateMedicine(token, id, data) {
  const res = await fetch(`${API_URL}/medicine/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update medicine');
  return res.json();
}

export async function deleteMedicine(token, id) {
  const res = await fetch(`${API_URL}/medicine/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete medicine');
  return res.json();
} 