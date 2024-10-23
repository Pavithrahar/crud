import React, { useState } from 'react';
import './App.css'; // Make sure this matches the actual filename

function App() {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({ name: '', price: '', id: null });

    const handleChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentItem.id) {
            setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
        } else {
            setItems([...items, { ...currentItem, id: Date.now() }]);
        }
        setCurrentItem({ name: '', price: '', id: null });
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
    };

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="container">
            <h1>Billing System</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={currentItem.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Item Price"
                    value={currentItem.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{currentItem.id ? 'Update' : 'Add'} Item</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
