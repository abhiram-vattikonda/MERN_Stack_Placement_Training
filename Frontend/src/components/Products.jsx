import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setError("");
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };
      if (editingId) {
        await updateProduct(editingId, payload);
        setEditingId(null);
      } else {
        await createProduct(payload);
      }
      setFormData({ name: "", description: "", price: "", quantity: "", category: "" });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      quantity: String(product.quantity),
      category: product.category,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch {
      setError("Failed to delete product");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", price: "", quantity: "", category: "" });
  };

  if (loading) return <p className="text-gray-500">Loading products...</p>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border rounded px-3 py-2 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={2}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Qty</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">₹{product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3 text-gray-500 text-sm max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
