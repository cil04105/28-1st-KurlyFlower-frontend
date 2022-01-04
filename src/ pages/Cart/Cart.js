import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { BsCheckCircle } from 'react-icons/bs';
import Category from './Category/Category';
import CartInfo from './CartInfo/CartInfo';

function Cart() {
  const [cartList, setCartList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  function selectItems(item) {
    setSelectedItems([...selectedItems, item]);
  }

  function selectAllItems(item) {
    if (selectedItems.length === cartList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartList);
    }
  }

  useEffect(() => {
    const loadCartData = async () => {
      const response = await fetch('/data/cart/cart.json');
      const data = await response.json();
      setCartList(data);
    };
    loadCartData();
  }, []);

  return (
    <div className="cart">
      <h1>장바구니</h1>
      <div className="wrap">
        <section className="select">
          <span className="selectAll">
            <BsCheckCircle className="check" onClick={selectAllItems} />
            <p className="text">{`전체선택(${selectedItems.length}/${cartList.length})`}</p>
          </span>
          <span className="selectToDelete">선택삭제</span>
        </section>
        <div className="container">
          <main className="cartList">
            <section className="list">
              <Category
                packaging="냉장"
                selectedItems={selectedItems}
                selectItems={selectItems}
                cartList={cartList}
                items={cartList.filter(item => item.packaging === '냉장')}
              />
              <Category
                packaging="냉동"
                selectedItems={selectedItems}
                selectItems={selectItems}
                cartList={cartList}
                items={cartList.filter(item => item.packaging === '냉동')}
              />
              <Category
                packaging="상온"
                selectedItems={selectedItems}
                selectItems={selectItems}
                cartList={cartList}
                items={cartList.filter(item => item.packaging === '상온')}
              />
            </section>
          </main>

          <aside>
            <CartInfo />
          </aside>
        </div>
        <section className="select">
          <span className="selectAll">
            <BsCheckCircle />
            <p className="text">전체선택(1/10)</p>
          </span>
          <span className="selectToDelete">선택삭제</span>
        </section>
      </div>
    </div>
  );
}

export default Cart;
