
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { showToast } from '../redux/uiSlice';

const PRODUCTS = [
  { id: 1, name: 'Écran UltraWide 4K 34"', price: 850, category: 'AFFICHAGE', icon: '🖥️' },
  { id: 2, name: 'Clavier Mécanique RGB', price: 180, category: 'PÉRIPHÉRIQUE', icon: '⌨️' },
  { id: 3, name: 'Souris Sans Fil Ergonomique', price: 95, category: 'ACCESSOIRE', icon: '🖱️' },
  { id: 4, name: 'Casque Haute Fidélité ANC', price: 320, category: 'AUDIO', icon: '🎧' }
];

export default function ProductList() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    dispatch(
      showToast(`${product.name} ajouté au panier !`)
    );
  };

  
  return (
    <section className="product-section">
      <h3>📦 Catalogue Produits</h3>
      <p>Chaque clic sur le bouton déclenche une action via Redux.</p>

      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-category">
              <span>{product.icon}</span>
              <small>{product.category}</small>
            </div>

            <h4 className="product-title">{product.name}</h4>

            <div className="product-footer">
              <strong className="product-price">{product.price} DT</strong>
              <button
                className="btn-add"
                onClick={() => handleAddToCart(product)}
              >
                + Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
