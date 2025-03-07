import React from "react";

const foodItems = [
  { name: "Pizza", image: "/pizza.jpg", description: "Our pizzas are made with fresh dough, premium mozzarella, and rich tomato sauce for an authentic taste." },
  { name: "Burger", image: "/burger.jpg", description: "Our burgers feature 100% beef patties, fresh lettuce, and special sauces for a juicy bite." },
  { name: "Zinger", image: "/zinger.jpeg", description: "Crispy, spicy chicken fillet double-breaded for extra crunch, served with mayo and lettuce." },
  { name: "Hot Dog", image: "/hotdog.jpeg", description: "Premium beef sausage grilled to perfection, topped with mustard, ketchup, and relish." },
  { name: "Sandwich", image: "/sand.jpg", description: "Freshly made sandwiches with high-quality ingredients and a variety of fillings." },
  { name: "Roll", image: "/roll.jpg", description: "Delicious chicken or beef rolls wrapped in soft, fresh paratha with flavorful sauces." },
  { name: "Fries", image: "/fries.jpeg", description: "Crispy golden fries, lightly salted and served with your choice of dip." },
  { name: "Shawarma", image: "/shawarma.jpg", description: "Juicy grilled chicken wrapped in soft pita with garlic sauce and fresh veggies." },
  { name: "Tacos", image: "/tacos.jpg", description: "Mexican-style tacos filled with seasoned meat, fresh salsa, and cheese." },
  { name: "Pasta", image: "/pasta.jpeg", description: "Delicious pasta cooked in rich, creamy sauces with fresh herbs and spices." },
  { name: "Noodles", image: "/noodels.webp", description: "Perfectly cooked noodles tossed in flavorful sauces and fresh veggies." },
  { name: "Biryani", image: "/biryani.jpg", description: "Aromatic basmati rice cooked with spices, meat, and saffron for a rich taste." },
  { name: "Steak", image: "/steak.jpeg", description: "Juicy, perfectly grilled steak served with mashed potatoes and vegetables." },
  { name: "Donuts", image: "/donuts.jpeg", description: "Soft, fluffy donuts glazed with delicious toppings and fillings." },
  { name: "Ice Cream", image: "/icecreame.jpg", description: "Creamy and delicious ice cream available in multiple flavors." },
  { name: "Sushi", image: "/sushi.jpeg", description: "Fresh sushi rolls made with high-quality fish, rice, and seaweed." },
  { name: "Falafel", image: "/falafel.jpeg", description: "Crispy, deep-fried chickpea balls served with tahini sauce." },
  { name: "Kebab", image: "/kebab.jpg", description: "Grilled skewers of marinated meat served with fresh salad and sauces." },
  { name: "Pancakes", image: "/pencase.jpeg", description: "Fluffy pancakes topped with syrup, fruits, and whipped cream." },
  { name: "Brownies", image: "/brownies.jpeg", description: "Rich, fudgy brownies made with high-quality chocolate." },
  { name: "Milkshake", image: "/milshakes.jpeg", description: "Thick, creamy milkshakes blended with fresh fruits and toppings." }
];

const FoodServices = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-4 p-4">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Our Food Services</h1>
      <ul className="text-center">
        {foodItems.map((item, index) => (
          <li key={index} className="mb-6">
            <h3 className="text-2xl text-left font-semibold mb-2">{item.name}</h3>
            <img src={item.image} alt={item.name} className="lg:max-w-lg  w-full h-1/3 max-h-lg   rounded-md mx-auto mb-2" />
            <p className="text-sm text-gray-700 max-w-lg mx-auto">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodServices;
