import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Plus, Minus, Clock, MapPin, Phone, Heart, Search, X, Check } from 'lucide-react';
import './ChineseRestaurant.css'; // import the CSS file

const ChineseRestaurant = () => {
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('appetizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1563379091339-03246963d3d6?w=1200&h=600&fit=crop'
  ];

  const menuData = {
  appetizers: [
    { id: 1, name: "Dragon Spring Rolls", price: 8.99, description: "Crispy golden rolls filled with fresh vegetables and served with sweet & sour sauce", spice: "mild", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop", rating: 4.8 },
    { id: 2, name: "Szechuan Dumplings", price: 12.99, description: "Hand-folded dumplings with spicy pork filling in aromatic chili oil", spice: "hot", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop", rating: 4.9 },
    { id: 3, name: "Crispy Wontons", price: 9.99, description: "Golden fried wontons stuffed with seasoned pork and shrimp", spice: "mild", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop", rating: 4.7 },
    { id: 12, name: "Vegetable Spring Rolls", price: 7.99, description: "Fresh vegetables wrapped in crispy rolls with dipping sauce", spice: "mild", image: "https://images.unsplash.com/photo-1601050690423-bb33c1c9f2f8?w=300&h=200&fit=crop", rating: 4.6 },
    { id: 13, name: "Sesame Prawn Toast", price: 10.99, description: "Crispy toast topped with seasoned prawns and sesame seeds", spice: "medium", image: "https://images.unsplash.com/photo-1599785209707-fc0d9c33d4d6?w=300&h=200&fit=crop", rating: 4.7 },
    { id: 14, name: "Chicken Satay Skewers", price: 11.99, description: "Grilled chicken skewers with peanut sauce", spice: "medium", image: "https://images.unsplash.com/photo-1617196032647-f7ff94a7560c?w=300&h=200&fit=crop", rating: 4.8 },
  ],
  mains: [
    { id: 4, name: "Kung Pao Chicken", price: 18.99, description: "Diced chicken with peanuts, vegetables in a spicy sauce", spice: "medium", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop", rating: 4.6 },
    { id: 5, name: "Mapo Tofu", price: 16.99, description: "Silky tofu in spicy Szechuan peppercorn sauce with ground pork", spice: "hot", image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=300&h=200&fit=crop", rating: 4.8 },
    { id: 6, name: "Sweet & Sour fish", price: 19.99, description: "Crispy pork pieces with bell peppers and pineapple in tangy sauce", spice: "mild", image: "https://images.unsplash.com/photo-1563379091339-03246963d3d6?w=300&h=200&fit=crop", rating: 4.5 },
    { id: 7, name: "Beijing Roast Duck", price: 28.99, description: "Traditional roast duck with pancakes, cucumber, and hoisin sauce", spice: "mild", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop", rating: 4.9 },
    { id: 8, name: "Ma La Hot Pot", price: 24.99, description: "Fiery Szechuan hot pot with fresh vegetables and choice of protein", spice: "very_hot", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop", rating: 4.7 },
    { id: 15, name: "Beef Chow Fun", price: 17.99, description: "Stir-fried rice noodles with tender beef and bean sprouts", spice: "medium", image: "https://images.unsplash.com/photo-1600170297076-94ee99f0a35f?w=300&h=200&fit=crop", rating: 4.6 },
    { id: 16, name: "General Tso’s Chicken", price: 19.99, description: "Crispy chicken tossed in a sweet and spicy sauce", spice: "hot", image: "https://images.unsplash.com/photo-1594007656310-776a4264b4ed?w=300&h=200&fit=crop", rating: 4.7 },
    { id: 17, name: "Sweet Chili Shrimp", price: 21.99, description: "Juicy shrimp in sweet chili sauce with scallions", spice: "medium", image: "https://images.unsplash.com/photo-1609872319033-0d7f2f1a5b2e?w=300&h=200&fit=crop", rating: 4.8 },
  ],
  noodles: [
    { id: 9, name: "Dan Dan Noodles", price: 14.99, description: "Szechuan noodles with spicy sesame sauce and minced pork", spice: "medium", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop", rating: 4.8 },
    { id: 10, name: "Lo Mein Delight", price: 13.99, description: "Soft noodles stir-fried with vegetables and your choice of protein", spice: "mild", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=200&fit=crop", rating: 4.6 },
    { id: 11, name: "Spicy Ramen Bowl", price: 16.99, description: "Rich pork bone broth with hand-pulled noodles and soft-boiled egg", spice: "medium", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop", rating: 4.7 },
    { id: 18, name: "Shrimp Lo Mein", price: 15.99, description: "Classic Lo Mein noodles with shrimp and vegetables", spice: "mild", image: "https://images.unsplash.com/photo-1601386589375-7e37463c8c3a?w=300&h=200&fit=crop", rating: 4.6 },
    { id: 19, name: "Vegetable Chow Mein", price: 12.99, description: "Crispy noodles stir-fried with seasonal vegetables", spice: "mild", image: "https://images.unsplash.com/photo-1589308078053-9bb42bb9d2b7?w=300&h=200&fit=crop", rating: 4.5 },
    { id: 20, name: "Spicy Beef Ramen", price: 17.99, description: "Rich beef broth with spicy chili oil and noodles", spice: "hot", image: "https://images.unsplash.com/photo-1617196481533-1f9bc72c1b4d?w=300&h=200&fit=crop", rating: 4.7 },
  ]
};


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
      } else acc.push(item);
      return acc;
    }, []));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const getFilteredItems = () => {
    const items = menuData[activeSection] || [];
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpice = spiceFilter === 'all' || item.spice === spiceFilter;
      return matchesSearch && matchesSpice;
    });
  };

  const getTotalPrice = () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

  const placeOrder = () => {
    if (cart.length > 0) {
      setOrderPlaced(true);
      setTimeout(() => { setOrderPlaced(false); setCart([]); setShowCart(false); }, 3000);
    }
  };

  const SpiceIndicator = ({ level }) => {
    const spiceCount = { mild: 1, medium: 2, hot: 3, very_hot: 4 };
    return (
      <div className="spice-indicator">
        {[...Array(4)].map((_, i) => (
          <span key={i} className={i < spiceCount[level] ? 'spice-active' : 'spice-inactive'}>🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <div className="restaurant-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">🐉</div>
          <div>
            <h1 className="title">Dragon Palace</h1>
            <p className="subtitle">Authentic Chinese Cuisine</p>
          </div>
        </div>
        <div className="header-right">
          <div className="hours"><Clock size={16} /> 11:00 AM - 10:00 PM</div>
          <button className="cart-button" onClick={() => setShowCart(true)}>
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="cart-count">{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {heroImages.map((img, idx) => (
          <div key={idx} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}>
            <img src={img} alt="Chinese cuisine" />
            <div className="overlay"></div>
          </div>
        ))}
        <div className="hero-content">
          <h2>Taste of Heaven</h2>
          <p>Embark on a culinary journey through authentic Chinese flavors.</p>
          <button onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>Explore Menu</button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <h2>Our Signature Menu</h2>

        <div className="filters">
          <div className="search">
            <Search size={16} />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search dishes..." />
          </div>
          <select value={spiceFilter} onChange={e => setSpiceFilter(e.target.value)}>
            <option value="all">All Spice Levels</option>
            <option value="mild">Mild 🌶️</option>
            <option value="medium">Medium 🌶️🌶️</option>
            <option value="hot">Hot 🌶️🌶️🌶️</option>
            <option value="very_hot">Very Hot 🌶️🌶️🌶️🌶️</option>
          </select>
        </div>

        <div className="menu-categories">
          {Object.keys(menuData).map(section => (
            <button key={section} className={activeSection === section ? 'active' : ''} onClick={() => setActiveSection(section)}>
              {section}
            </button>
          ))}
        </div>

        <div className="menu-items">
          {getFilteredItems().map(item => (
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} />
              <button className={favorites.includes(item.id) ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(item.id)}>
                <Heart size={18} />
              </button>
              <div className="card-content">
                <h3>{item.name}</h3>
                <SpiceIndicator level={item.spice} />
                <p>{item.description}</p>
                <div className="price-cart">
                  <span>${item.price}</span>
                  <button onClick={() => addToCart(item)}><Plus size={16} /> Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart and Order Modals */}
      {showCart && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Your Order</h3>
              <button onClick={() => setShowCart(false)}><X size={24} /></button>
            </div>
            {cart.length === 0 ? <p>Cart is empty</p> : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div>{item.name} - ${item.price}</div>
                    <div>
                      <button onClick={() => removeFromCart(item.id)}><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
                <div className="total">
                  Total: ${getTotalPrice()}
                </div>
                <button onClick={placeOrder}>Place Order</button>
              </>
            )}
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="modal">
          <div className="modal-content">
            <Check size={48} />
            <h3>Order Placed!</h3>
            <p>Your meal will be ready soon. Thank you!</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChineseRestaurant;
