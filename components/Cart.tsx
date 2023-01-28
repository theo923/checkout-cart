import styles from "@/styles/Home.module.css";
import { GiConfirmed } from "react-icons/gi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Iitem } from "@/interface/checkout";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../pages/_app";

const matchCart = (allItem, cartItem: Iitem[]) => {
  const result = [];
  cartItem.forEach((item: Iitem) => {
    if (item.id in allItem)
      result.push({
        ...allItem[item.id],
        quantity: item.quantity,
        price: allItem[item.id].fixedRecipientDenominations[0],
      });
  });
  return result;
};

const Cart = ({ data }) => {
  const idCart = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    var local = JSON.parse(window.localStorage.getItem("cart"));
    if (local && local.length > 0) setCart(matchCart(data, local));
    else setCart(matchCart(data, idCart));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      var newIdCart = cart.map((citem) => {
        return {
          id: citem.productId,
          quantity: citem.quantity,
        };
      });

      window.localStorage.setItem("cart", JSON.stringify(newIdCart));
    }
  }, [cart, loaded]);

  return (
    <div data-test="component-shoppingCart" className={styles.colorBG}>
      <div className={styles.divBorder}>
        <button
          className={styles.stringNicon}
          onClick={() => setCart(matchCart(data, idCart))}
        >
          <GiConfirmed size="40px" />
          <h2>reset</h2>
        </button>
        <h3 className={styles.pageHeading}>Shopping Cart</h3>
        <div className={styles.cart}>
          {cart
            ? cart.map((item, idx: number) => {
                return (
                  <div className={styles.divBorder} key={idx}>
                    <div className={styles.cartItem}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          className={styles.cartItemCover}
                          src={item.img}
                          alt="item_img"
                        />
                      </div>
                      <div className={styles.cartNameNPrice}>
                        <h3>{item.name}</h3>
                        <div
                          style={{
                            color: item.available ? "green" : "red",
                          }}
                        >
                          {item.available ? "In Stock" : "Not Available"}
                        </div>
                        <div>{"Description: " + item.description}</div>
                        <div>${item.price}@1</div>
                        <div className={styles.cartUpdateQuantity}>
                          <button
                            style={{ marginRight: "10px" }}
                            onClick={() =>
                              item.quantity + 1 <= 10
                                ? setCart((prev) =>
                                    prev.map((citem) => {
                                      if (item.productId === citem.productId)
                                        return {
                                          ...item,
                                          quantity: item.quantity + 1,
                                        };
                                      return citem;
                                    })
                                  )
                                : null
                            }
                          >
                            +
                          </button>
                          <div>{item.quantity}</div>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              item.quantity - 1 >= 1
                                ? setCart((prev) =>
                                    prev.map((citem) => {
                                      if (item.productId === citem.productId)
                                        return {
                                          ...item,
                                          quantity: item.quantity - 1,
                                        };
                                      return citem;
                                    })
                                  )
                                : null
                            }
                          >
                            -
                          </button>
                          <button
                            className={styles.stringNicon}
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              setCart((prev) =>
                                prev.filter(
                                  (citem) => citem.productId !== item.productId
                                )
                              )
                            }
                          >
                            <RiDeleteBin2Fill size="20px" />
                          </button>
                        </div>
                      </div>
                      <h2 className={styles.cartNameNPriceEnd}>
                        $
                        {(
                          item.fixedRecipientDenominations[0] * item.quantity
                        ).toFixed(2)}
                      </h2>
                    </div>
                    <div />
                  </div>
                );
              })
            : null}
          <div className={styles.cartQuantityCount}>
            <h2>total</h2>
            <h2>
              $
              {cart
                ?.reduce(
                  (accu: number, item) =>
                    accu + item.fixedRecipientDenominations[0] * item.quantity,
                  0
                )
                .toFixed(2)}
            </h2>
          </div>
          <div className={styles.cartActionBtn}>
            <button
              className={styles.stringNicon}
              disabled={!Boolean(cart.length > 0)}
              onClick={() => setCart([])}
            >
              <GiConfirmed size="40px" />
              <h2>clear</h2>
            </button>
            <button
              className={styles.stringNicon}
              disabled={!Boolean(cart.length > 0)}
            >
              <GiConfirmed size="40px" />
              <h2>confirm</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
