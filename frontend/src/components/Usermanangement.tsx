import React, { useEffect, useState } from 'react';
import { User, UserInput } from '../types/User';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import '../styles/UserManagement.css';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => {
        setNotification({ message: `Error loading users: ${err.message}`, type: 'error' });
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
    setUserToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete === null) {
      setShowConfirm(false);
      return;
    }
      fetch(`http://localhost:3001/api/users/${userToDelete}`, {
        method: 'DELETE'
      })
        .then(res => {
           if (res.ok) {
          setUsers(prev => prev.filter(u => u.id !== userToDelete));
          setNotification({ message: 'User deleted successfully!', type: 'success' });
        } else {
          throw new Error(res.statusText);
        }
      })
        .catch(err => {
          setNotification({ message: `Delete failed: ${err.message}`, type: 'error' });
        })
        .finally(() => {
          setShowConfirm(false);
          setUserToDelete(null);
         });
  } // <-- Add this closing brace for handleConfirmDelete

  const handleFormSubmit = (user: UserInput | User) => {
    if ('id' in user) {
      fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(updated => {
          setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
          setShowForm(false);
           setNotification({ message: 'User updated successfully!', type: 'success' });
        })
        .catch(err => setNotification({ message: `Update failed: ${err.message}`, type: 'error' }));
      
    } else {
    
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
          setNotification({ message: 'User created successfully!', type: 'success' });
        })
        .catch(err => {
          setNotification({ message: 'Email already exists or invalid data!', type: 'error' });
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

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <ConfirmDialog
        visible={showConfirm}
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setUserToDelete(null);
        }}
      />
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