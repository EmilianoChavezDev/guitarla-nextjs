import { useEffect, useState } from "react";
import Layout from "components/layout";
import Image from "next/image";
import styles from "../styles/Carrito.module.css";

export default function Carrito({
  carrito,
  actualizarCantidad,
  eliminarProducto,
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <Layout title="Carrito de Compras">
      <main className="contenedor">
        <h1 className="heading">Carrito</h1>
        <div className={styles.contenido}>
          <div className={styles.carrito}>
            <h2>Articulos</h2>
            {carrito.length === 0
              ? "Carrito vacio"
              : carrito.map((producto) => (
                  <div key={producto.id} className={styles.producto}>
                    <div>
                      <Image
                        width={200}
                        height={480}
                        src={producto.imagen}
                        alt={producto.nombre}
                      />
                    </div>
                    <div>
                      <p className={styles.nombre}>{producto.nombre}</p>
                      <div className={styles.cantidad}>
                        <p>Cantidad:</p>
                        <select
                          onChange={(e) =>
                            actualizarCantidad({
                              id: producto.id,
                              cantidad: e.target.value,
                            })
                          }
                          value={producto.cantidad}
                          className={styles.select}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <p className={styles.precio}>
                        $ <span>{producto.precio}</span>
                      </p>
                      <p className={styles.subototal}>
                        Subtotal: $
                        <span>{producto.cantidad * producto.precio}</span>
                      </p>
                    </div>

                    <button
                      className={styles.eliminar}
                      type="button"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
          </div>
          <aside className={styles.resumen}>
            <h3>Resumen del Pedido</h3>
            {carrito.length > 0 ? (
              <p>Total a pagar: ${total}</p>
            ) : (
              "Aún no hay productos a pagar"
            )}
          </aside>
        </div>
      </main>
    </Layout>
  );
}
