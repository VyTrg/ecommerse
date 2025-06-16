import React, { useEffect, useState } from 'react';
import '../styles/ProductManagement.css';

type ProductItem = {
  id: number;
  price: number;
  quantity: number;
  images: { image_url: string }[];
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
  parent: number | null;
};

type FormDataType = {
  name: string;
  price: string | number;
  quantity: string | number;
  images: string[];
  category_id: number;
  description: string;
};

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    price: '',
    quantity: '',
    images: [],
    category_id: 0,
    description: '',
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / limit);

  const loadProducts = () => {
    fetch(`http://localhost:3001/api/products?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
        setTotalCount(data.totalCount);
      })
      .catch(err => console.error('Lỗi khi tải sản phẩm:', err));
  };

  useEffect(() => { loadProducts(); }, [page]);

  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Lỗi khi tải danh mục:', err));
  }, []);

  const getCategoryName = (categoryId: number): string => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Không rõ';
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Xác nhận xoá sản phẩm này?')) {
      fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' , headers:{'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''}})
        .then(res => {
          if (res.ok) loadProducts();
        })
        .catch(err => console.error('Lỗi xoá sản phẩm:', err));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.productItems?.[0]?.price ?? '',
      quantity: product.productItems?.[0]?.quantity ?? '',
      images: product.productItems?.[0]?.images?.map(img => img.image_url) || [],
      category_id: product.category_id,
      description: product.description || '',
    });
    setShowForm(true);
  };
  console.log(categories)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name: 'price' | 'quantity') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Math.max(0, parseFloat(value)),
    }));
  };


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    for (const file of files) {
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const formDataUpload = new FormData();
          formDataUpload.append('image', file);

          const res = await fetch('http://localhost:3001/api/upload', {
            method: 'POST',
            body: formDataUpload,
          });

          const data = await res.json();

          // Chỉ lưu đường dẫn server trả về
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, data.url],
          }));
        } catch (err) {
          console.error('Lỗi khi upload ảnh:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (!formData.price || !formData.quantity || formData.images.length === 0) {
        alert("Vui lòng nhập giá, số lượng và ít nhất 1 hình ảnh.");
        return;
      }

      if (editingProduct) {
        await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''},
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            category_id: formData.category_id,
          }),
        });

        const productItemId = editingProduct.productItems?.[0]?.id;

        if (productItemId) {
          await fetch(`http://localhost:3001/api/product-items/${productItemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''},
            body: JSON.stringify({
              price: formData.price,
              quantity: formData.quantity,
              product_id: editingProduct.id,
              images: formData.images.map(url => ({ image_url: url })),
            }),
          });
        }
      } else {
        const res = await fetch('http://localhost:3001/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''},
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            category_id: formData.category_id,
          }),
        });

        const newProduct = await res.json();

        await fetch(`http://localhost:3001/api/product-items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''},
          body: JSON.stringify({
            price: formData.price,
            quantity: formData.quantity,
            product_id: newProduct.id,
            images: formData.images.map(url => ({ image_url: url })),
          }),
        });
      }

      loadProducts();
      setShowForm(false);
      setEditingProduct(null);

    } catch (err) {
      console.error('Lỗi khi lưu sản phẩm:', err);
    }
  };

  return (
    <div className="product-table-container">
      {showForm ? (
        <div className="form-popup">
          <h3>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>

          <label>Tên sản phẩm:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>

          <label>Giá:
            <input type="number" name="price" value={formData.price} onChange={handleNumberChange('price')} />
          </label>

          <label>Số lượng:
            <input type="number" name="quantity" value={formData.quantity} onChange={handleNumberChange('quantity')} />
          </label>

          <label>Thêm ảnh:
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          </label>

          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 8 }}>
            {formData.images.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative', margin: 4, border: '1px solid #ddd',
                borderRadius: 8, overflow: 'hidden', width: 100, height: 100,
              }}>
                <img src={img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
  style={{
    position: 'absolute',
    top: 4,
    right: 4,
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: 24,
    height: 24,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  }}
  onClick={() => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  }}
>
  ×
</button>
              </div>
            ))}
          </div>

          <label>Mô tả:
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              style={{ resize: "none", overflow: "auto", height: "50px", width: "100%" }}
            />
          </label>

          <label>Danh mục:
            <select name="category_id" value={formData.category_id} onChange={handleInputChange}>
              <option value="">-- Chọn danh mục --</option>
              {categories?.filter(cat => cat.parent !== null)
                  .map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>

          <div style={{ marginTop: '10px' }}>
            <button className="btn-edit" onClick={handleFormSubmit}>Lưu</button>
            <button className="btn-delete" onClick={() => setShowForm(false)}>Huỷ</button>
          </div>
        </div>
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Danh mục</th>
                <th>Ảnh</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.productItems?.[0]?.price ? `${p.productItems[0].price.toLocaleString()}₫` : 'Không rõ'}</td>
                  <td>{p.productItems?.[0]?.quantity ?? 'Không rõ'}</td>
                  <td>{getCategoryName(p.category_id)}</td>
                  <td>
                    {p.productItems?.[0]?.images?.length ? (
                      p.productItems[0].images.map((img, idx) => (
                        <img key={idx} src={img.image_url} alt={p.name} width={60} style={{ margin: 4 }} />
                      ))
                    ) : (
                      <span>Không có ảnh</span>
                    )}
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(p)}>Sửa</button>
                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button key={pageNumber}
                  style={{
                    margin: 4, padding: '8px 12px',
                    backgroundColor: pageNumber === page ? '#333' : '#eee',
                    color: pageNumber === page ? '#fff' : '#000',
                    border: 'none', borderRadius: 4, cursor: 'pointer',
                  }}
                  onClick={() => setPage(pageNumber)}>{pageNumber}
                </button>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn-add" onClick={() => {
              setFormData({
                name: '', price: '', quantity: '', images: [],
                category_id: categories[0]?.id || 0, description: ''
              });
              setEditingProduct(null);
              setShowForm(true);
            }}>+ Thêm sản phẩm</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;
