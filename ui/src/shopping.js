// ShoppingWebsite.js
// import React, { useState } from 'react';
// import SearchBar from './components/searchbar';

// const ShoppingWebsite = () => {
//   // Sample products data (you can fetch this from an API or any other source)
//   const products = [
//     { id: 1, name: 'Almonda' },
//     { id: 2, name: 'Apple' },
//     // Add more products here
//   ];

//   const [filteredProducts, setFilteredProducts] = useState(products);

//   const handleSearch = (searchTerm) => {
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       <ul>
//         {filteredProducts.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShoppingWebsite;
