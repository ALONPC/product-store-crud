export const baseUrl = 'http://localhost:8000';

export const onSearch = async (searchValue) => {
  try {
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchValue }),
    });
    const json = await res.json();
    if (!res.ok) {
      throw res.status;
    } else {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${baseUrl}/products`, {
      method: 'GET',
    });
    const json = await res.json();
    if (!res.ok) {
      throw res.status;
    } else {
      return json || [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (productPayload) => {
  try {
    const res = await fetch(`${baseUrl}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productPayload),
    });
    const json = await res.json();
    if (!res.ok) {
      throw res.status;
    } else {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id, productPayload) => {
  try {
    const res = await fetch(`${baseUrl}/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productPayload),
    });
    const json = await res.json();
    if (!res.ok) {
      throw res.status;
    } else {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/product/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    if (!res.ok) {
      throw res.status;
    } else {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};
