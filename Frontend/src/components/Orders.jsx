import { useState, useEffect } from "react";
import { getOrders, createOrder, updateOrder, deleteOrder, getUsers, getProducts } from "../api";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    status: "pending",
    products: [{ productId: "", quantity: "1", price: "" }],
  });

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        getOrders(),
        getUsers(),
        getProducts(),
      ]);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setError("");
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Auto-calculate totalAmount from products
  const calculateTotal = (productList) => {
    return productList.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + qty * price;
    }, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...formData.products];
    updated[index][field] = value;

    // Auto-fill price when a product is selected
    if (field === "productId" && value) {
      const selected = products.find((p) => p._id === value);
      if (selected) {
        updated[index].price = String(selected.price);
      }
    }

    setFormData({ ...formData, products: updated });
  };

  const addProductRow = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productId: "", quantity: "1", price: "" }],
    });
  };

  const removeProductRow = (index) => {
    if (formData.products.length <= 1) return;
    const updated = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updated });
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      status: "pending",
      products: [{ productId: "", quantity: "1", price: "" }],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (order) => {
    setEditingId(order._id);
    setShowForm(true);
    setFormData({
      userId: order.userId?._id || order.userId || "",
      status: order.status || "pending",
      products: order.products?.length
        ? order.products.map((p) => ({
            productId: p.productId?._id || p.productId || "",
            quantity: String(p.quantity || 1),
            price: String(p.price || ""),
          }))
        : [{ productId: "", quantity: "1", price: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const totalAmount = calculateTotal(formData.products);
      const payload = {
        userId: formData.userId,
        status: formData.status,
        totalAmount,
        products: formData.products.map((p) => ({
          productId: p.productId,
          quantity: Number(p.quantity),
          price: Number(p.price),
        })),
      };

      if (editingId) {
        await updateOrder(editingId, payload);
      } else {
        await createOrder(payload);
      }
      resetForm();
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateOrder(id, { status: newStatus });
      fetchAll();
    } catch {
      setError("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      await deleteOrder(id);
      fetchAll();
    } catch {
      setError("Failed to delete order");
    }
  };

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  const formTotal = calculateTotal(formData.products);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Orders ({orders.length})</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            + New Order
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {editingId ? "Edit Order" : "Create New Order"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            {editingId && (
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            )}
          </div>

          {/* Products */}
          <div className="space-y-3">
            <label className="font-medium text-sm text-gray-700">Products</label>
            {formData.products.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <select
                  value={item.productId}
                  onChange={(e) => handleProductChange(idx, "productId", e.target.value)}
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} (₹{p.price})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleProductChange(idx, "quantity", e.target.value)}
                  placeholder="Qty"
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => handleProductChange(idx, "price", e.target.value)}
                  placeholder="Price"
                  required
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => removeProductRow(idx)}
                  disabled={formData.products.length <= 1}
                  className="text-red-500 hover:text-red-700 disabled:opacity-30 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProductRow}
              className="text-purple-600 hover:underline text-sm"
            >
              + Add another product
            </button>
          </div>

          {/* Auto-calculated total */}
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Amount:</span>
            <span className="text-xl font-bold text-purple-700">
              ₹{formTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || formTotal === 0}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : editingId ? "Update Order" : "Place Order"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-400">
            No orders found
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer: {order.userId?.name || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Products in order */}
              {order.products?.length > 0 && (
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-xs text-gray-500 mb-2">Items:</p>
                  {order.products.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.productId?.name || "Product"}</span>
                      <span className="text-gray-500">
                        {item.quantity} × ₹{item.price?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <p className="font-semibold text-lg">
                  Total: ₹{order.totalAmount?.toLocaleString()}
                </p>
                <div className="flex gap-2 items-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
