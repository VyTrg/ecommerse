import { useEffect, useState } from 'react';
import { User, UserInput } from '../types/User';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import '../styles/UserManagement.css';
import Pagination from '../components/Pagination';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    fetch('http://localhost:3001/api/users', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => {
        console.error('Failed to load users:', err);

      });
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token') || ''}`
        }
      })
        .then(res => {
          if (res.ok) {
            setUsers(users.filter(u => u.id !== id));
          } else {
            console.error('Delete failed');
          }
        })
        .catch(err => console.error('Error deleting user:', err));
    }
  };

  const handleFormSubmit = (user: UserInput | User) => {
    if ('id' in user) {
      // 👉 SỬA người dùng
      fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${sessionStorage.getItem('token')}`},
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(updated => {
          setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
          setShowForm(false);
        })
        .catch(err => console.error('Error updating user:', err));
    } else {
      // 👉 THÊM người dùng mới qua API đăng ký
      fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
        .then(res => {
          if (!res.ok) throw new Error('Creation failed');
          return res.json();
        })
        .then(newUser => {
          // API trả về dạng: { status: "success", user: {...} }
          setUsers(prev => [...prev, newUser.user]); // ✅ Dùng newUser.user
          setShowForm(false);
        })
        .catch(err => {
          console.error('Error add user:', err);
          alert('Email already exists or invalid data!');
        });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  const totalCount = users.length;
  const totalPages = Math.ceil(totalCount / limit);
  const start = (page - 1) * limit;
  const currentUsers = users.slice(start, start + limit);
  return (
    <div className="user-management-container">
      <h2 className="user-management-title">User Management</h2>

      {!showForm && (
        <div className="user-management-action">
          <button className="btn-add" onClick={handleAdd}>Add User</button>
        </div>
      )}

      {showForm ? (
        <UserForm
          initialData={editingUser || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <UserTable users={currentUsers} onEdit={handleEdit} onDelete={handleDelete} />

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
};


export default UserManagement;