import React, { JSX, useEffect, useState } from "react";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";

type Product = {
  id: number;
  name: string;
  description: string;
  all_rate: number;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
  products: Product[];
  parent?: { id: number; name: string } | null;
  children?: Category[];
};

const CategoryAdminPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [newName, setNewName] = useState("");
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setFlatCategories(data);
        setCategories(buildTree(data));
      });
  }, []);

  const buildTree = (flatList: Category[]): Category[] => {
    const idMap: { [key: number]: Category & { children: Category[] } } = {};
    const roots: Category[] = [];

    flatList.forEach((cat) => {
      idMap[cat.id] = { ...cat, children: [] };
    });

    flatList.forEach((cat) => {
      const parentId = cat.parent?.id ?? null;
      if (parentId) {
        idMap[parentId].children.push(idMap[cat.id]);
      } else {
        roots.push(idMap[cat.id]);
      }
    });

    return roots;
  };

  const handleToggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    if (!newName.trim()) {
      setNotification({ message: 'Please enter a name', type: 'error' });
      return;
    }
    fetch("http://localhost:3001/api/categories/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, parent_id: selectedParent }),
    }).then(() => window.location.reload());
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3001/api/categories/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName }),
    }).then(() => window.location.reload());
  };

  const handleDelete = (id: number) => {
    setCategoryToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
  if (categoryToDelete === null) return;

  fetch(`http://localhost:3001/api/categories/${categoryToDelete}/delete`, {
    method: "DELETE",
  }).then(() => window.location.reload());

  setShowConfirm(false);
  setCategoryToDelete(null);
  };
  const handleCancelDelete = () => {
    setShowConfirm(false);
    setCategoryToDelete(null);
  };
  const renderFlatList = (list: Category[], level = 0): JSX.Element[] => {
    let items: JSX.Element[] = [];

    list.forEach((cat) => {
      items.push(
        <div
          key={cat.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderBottom: "1px solid #eee",
            paddingLeft: `${level * 20}px`,
            background: "#fff",
          }}
        >
          {cat.children && cat.children.length > 0 ? (
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                width: "20px",
                textAlign: "center",
                padding: "20px",
              }}
              onClick={() => handleToggleExpand(cat.id)}
            >
              {expandedIds.includes(cat.id) ? "▼" : "▶"}
            </span>
          ) : (
            <span style={{ width: "20px",padding:"20px"}}></span>
          )}

          {editingId === cat.id ? (
            <>
              <input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                style={{ flex: 1, padding: "4px" }}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingId(null)}>Exit</button>
            </>
          ) : (
            <>
              <span style={{ flex: 1 }}>{cat.name}</span>
              <button onClick={() => handleEdit(cat.id, cat.name)}>Edit</button>
              <button onClick={() => handleDelete(cat.id)}>Delete</button>
            </>
          )}
        </div>
      );

      if (expandedIds.includes(cat.id) && cat.children && cat.children.length > 0) {
        items = items.concat(renderFlatList(cat.children, level + 1));
      }
    });

    return items;
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <ConfirmDialog
        visible={showConfirm}
        message="You want to delete this category?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <h2 style={{ textAlign: "center",padding:"20px", }}>Category Management</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Category Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ padding: "8px", flex: "1 1 200px" }}
        />
        <select
          value={selectedParent ?? ""}
          onChange={(e) =>
            setSelectedParent(e.target.value ? parseInt(e.target.value) : null)
          }
          style={{ padding: "8px", flex: "1 1 200px" }}
        >
          <option value="">No parent category</option>
          {flatCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {renderFlatList(categories)}
      </div>
    </div>
  );
};

export default CategoryAdminPage;