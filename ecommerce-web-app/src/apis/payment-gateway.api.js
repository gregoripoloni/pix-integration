const BASE_URL = 'http://localhost:3000';

const HEADERS = new Headers();
HEADERS.append('Content-Type', 'application/json');
HEADERS.append('Access-Control-Allow-Origin', '*');

export const checkPix = async (pixId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/pix/check/${pixId}`, {
      method: 'GET',
      headers: HEADERS,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export const generatePix = async (amount, description) => {
  try {
    const response = await fetch(`${BASE_URL}/api/pix/create`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ amount: amount * 100, description }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
