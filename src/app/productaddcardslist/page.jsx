import axios from "axios";
import { useRouter } from "next/router";

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

export default function Home() {
  const router = useRouter();

  const addToCart = async (product) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart", {
        ...product,
        quantity: 1,
      });

      if (res.status === 200) {
        alert("Item added to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Could not add item to cart");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded shadow flex flex-col items-center"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-8 bg-green-500 text-white py-2 px-4 rounded"
        onClick={() => router.push("/cart")}
      >
        Go to Cart
      </button>
    </div>
  );
}
