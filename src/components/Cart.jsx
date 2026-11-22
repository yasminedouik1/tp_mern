
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, applyPromoCode } from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState('');

  const discountedPrice = totalPrice * (1 - discountPercent / 100);

  const handleApplyPromo = () => {
    dispatch(applyPromoCode(promoCode.trim()));
  };

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>🛒 Mon Panier Redux</h3>

        {items.length > 0 && (
          <button
            className="btn-clear"
            onClick={() => dispatch(clearCart())}
          >
            Vider
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Le panier est actuellement vide.</p>
          <span>
            Ajoutez un article depuis le catalogue pour observer la
            réactivité de Redux.
          </span>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <span>{item.price} DT / unité</span>
                </div>

                <div className="cart-item-qty">
                  <button
                    className="btn-qty"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn-qty"
                    onClick={() => dispatch(addItem(item))}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              Nombre total d'articles :
              <strong>{totalCount}</strong>
            </p>

            <p>
              Montant total :
              <strong>{totalPrice} DT</strong>
            </p>

            <div className="promo-section">
              <input
                type="text"
                placeholder="Entrez votre code promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />

              <button
                className="btn-qty"
                onClick={handleApplyPromo}
              >
                Appliquer
              </button>
            </div>

            {discountPercent > 0 && (
              <p className="promo-result">
                Réduction : {discountPercent}%

                <br />

                Montant remisé :
                <strong>
                  {' '}
                  {discountedPrice.toFixed(2)} DT
                </strong>
              </p>
            )}
            <button
              className="btn-clear-full"
              onClick={() => dispatch(clearCart())}
            >
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
}
