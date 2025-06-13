import React, { useEffect, useState } from 'react';
import '../styles/ProductManagement.css';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';

type ProductItem = {
  id: number;
  price: number;
  image: {
    image_url: string;
  };
};

type Product = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  productItems: ProductItem[];
};

type Category = {
  id: number;
  name: string;
  parent_id: number | null;
};

const ProductManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    category_id: 0,
    description: '',
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        setNotification({ message: `Error loading products: ${err.message}`, type: 'error' });
      });

    fetch('http://localhost:3001/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Error loading categories');
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => {
        setNotification({ message: `Error loading categories: ${err.message}`, type: 'error' });
      });
  }, []);

  const getCategoryName = (categoryId: number): string => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
  };

  const handleDelete = (id: number) => {
    setProductToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete === null) {
      setShowConfirm(false);
      return;
    }
      fetch(`http://localhost:3001/api/products/${productToDelete}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
          setProducts(prev => prev.filter(p => p.id !== productToDelete));
          setNotification({ message: 'Product deleted successfully!', type: 'success' });
        } else {
          throw new Error(res.statusText);
        }
      })
        .catch(err => {
        setNotification({ message: `Delete failed: ${err.message}`, type: 'error' });
      })
      .finally(() => {
        setShowConfirm(false);
        setProductToDelete(null);
      });
  };

  const handleCategoryChange = (productId: number, newCategoryId: number) => {
    fetch(`http://localhost:3001/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_id: newCategoryId }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error updating category');
        setProducts(prev =>
          prev.map(p =>
            p.id === productId ? { ...p, category_id: newCategoryId } : p
          )
        );
      })
      .catch(err => {
        setNotification({ message: `Error changing category: ${err.message}`, type: 'error' });
      });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.productItems?.[0]?.price || 0,
      image: product.productItems?.[0]?.image?.image_url || '',
      category_id: product.category_id,
      description: product.description || '',
    });
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    if (editingProduct) {
      fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(updated => {
          setProducts(prev =>
            prev.map(p => (p.id === updated.id ? updated : p))
          );
          setShowForm(false);
          setNotification({ message: 'Product updated successfully!', type: 'success' });
        })
        .catch(err => {
          setNotification({ message: `Error updating product: ${err.message}`, type: 'error' });
        });
    } else {
      fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(newProduct => {
          setProducts(prev => [...prev, newProduct]);
          setShowForm(false);
          setNotification({ message: 'Product added successfully!', type: 'success' });
        })
        .catch(err => {
          setNotification({ message: `Error adding product: ${err.message}`, type: 'error' });
        });
    }
  };
  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / limit);
  const start = (page - 1) * limit;
  const currentProducts = products.slice(start, start + limit);
  return (
    <div className="product-table-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <ConfirmDialog
        visible={showConfirm}
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setProductToDelete(null);
        }}
      />
      {showForm && (
        <div className="form-popup">
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <label>
            Product Name:
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={formData.price}
              onChange={e =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Image (URL):
            <input
              type="text"
              value={formData.image}
              onChange={e =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              rows={3}
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Product description"
            />
          </label>
          <label>
            Category:
            <select
              value={formData.category_id}
              onChange={e =>
                setFormData({
                  ...formData,
                  category_id: Number(e.target.value),
                })
              }
            >
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <div style={{ marginTop: '10px' }}>
            <button className="btn-edit" onClick={handleFormSubmit}>
              Save
            </button>
            <button className="btn-delete" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit Category</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p, index) => (
                <tr key={p.id}>
                  <td style={{ textAlign: 'center' }}>{start + index + 1}</td>
                  <td>{p.name || 'No Name'}</td>
                  <td>
                    {p.productItems?.[0]?.price
                      ? `${p.productItems[0].price.toLocaleString()}₫`
                      : 'Unknown'}
                  </td>
                  <td>{getCategoryName(p.category_id)}</td>
                  <td>
                    <select
                      value={p.category_id}
                      onChange={e =>
                        handleCategoryChange(p.id, Number(e.target.value))
                      }
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {p.productItems?.[0]?.image?.image_url ? (
                      <img src={p.productItems[0].image.image_url} alt={p.name} width={60} height={60} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            )}
            <button
              className="btn-add"
              onClick={() => {
                setFormData({
                  name: '',
                  price: 0,
                  image: '',
                  category_id: categories[0]?.id || 0,
                  description: '',
                });
                setEditingProduct(null);
                setShowForm(true);
              }}
            >
              + Add Product
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;