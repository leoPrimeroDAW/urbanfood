import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './views/Home';
import Menu from './views/Menu';
import Admin from './views/Admin';
import Producto from './views/Producto';
import Login from './views/Login';
import Carrito from './views/Carrito';
import Register from './views/Register';
import { OrderConfirmer } from './views/OrderConfirmer';


function App() {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState(null);
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    axios.get('http://localhost:5000/carta')
      .then(response => {
        setMenu(response.data);
        setShowMenu(true); // Mostrar menú después de cargar datos
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const addToOrder = (item) => {
    const existingItem = order.find(orderItem => orderItem.customId === item.customId);
    if (existingItem) {
      setOrder(order.map(orderItem =>
        orderItem.customId === item.customId
          ? { ...orderItem, cantidad: orderItem.cantidad + 1 }
          : orderItem
      ));
    } else {
      setOrder([...order, { ...item, cantidad: 1 }]);
    }
  };

  const removeFromOrder = (item) => {
    const existingItem = order.find(orderItem => orderItem.producto_id === item.producto_id);
    if (existingItem.cantidad > 1) {
      setOrder(order.map(orderItem =>
        orderItem.producto_id === item.producto_id
          ? { ...orderItem, cantidad: orderItem.cantidad - 1 }
          : orderItem
      ));
    } else {
      setOrder(order.filter(orderItem => orderItem.producto_id !== item.producto_id));
    }
  };

  const submitOrder = (callback) => {
    if (!table || !userName) {
      alert('Por favor, introduce el número de mesa y tu nombre');
      return;
    }

    const orderWithQuantity = order.map(item => ({ ...item, cantidad: item.cantidad || 1 }));

    axios.post('http://localhost:5000/pedido', {
      mesa_id: table,
      user_name: userName,
      productos: orderWithQuantity,
    })
    .then(response => {
      if (typeof response.data === 'string') {
        alert(response.data)
        console.log(response.data);
      } else if (response.data && !response.data.success) {
        console.error('Error submitting order:', response.data.message);
        alert('Error submitting order. Please try again.');
        return;
      }
      setOrder([]);
      setTable(null);
      setUserName('');
      callback();  // Redirigir al usuario después de un envío exitoso
    })
    .catch(error => {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    });
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setTable={setTable} setShowMenu={setShowMenu} setUserName={setUserName} />} />
          <Route path="/menu" element={<Menu menu={menu} addToOrder={addToOrder} removeFromOrder={removeFromOrder} order={order} setOrder={setOrder} table={table} userName={userName} />} />
          <Route path="/confirmar-pedido" element={<Carrito order={order} setOrder={setOrder} submitOrder={submitOrder} />} />
          <Route path="/admin/pedidos" element={token ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/pedidos/producto/:id" element={<Producto addToOrder={addToOrder} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/pedido-confirmado" element={<OrderConfirmer />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
