import apiClient from '../api/axios';

//gets all products
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

//gets 1 product by id
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

//creates 1 product
export const createProduct = async (product) => {
  try {
    const response = await apiClient.post('/api/products', product, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

//edits 1 product
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await apiClient.put(`/api/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

//deletes a product
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

//uploads an image to the backend uploads folder
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await apiClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl; // Return the image URL directly
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
