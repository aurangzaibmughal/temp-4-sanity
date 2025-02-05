'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Ensure this path is correct
import { Product } from '../../../types/products';
import { allProducts, four, six } from '@/sanity/lib/queries';
import { addToCart } from '../actions/action';
import { urlFor } from '@/sanity/lib/image';

function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await client.fetch(six);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Fetch error:', err); // More detailed logging
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);
    alert("OK");
  };

  return (
    <div className="w-full bg-white py-20">
      {/* Section Heading */}
      <h2 className="text-[#3F509E] text-3xl font-bold text-center mb-16">Trending Products</h2>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-20">
        {products.map((product) => (
          <div key={product._id} className="group relative">
            {/* Image with Gray Background */}
            <div className="bg-gray-200 flex justify-center items-center p-6 h-[280px] relative">
              <Image
                src={urlFor(product.image).url()}
                alt="Trending Product"
                width={200}
                height={200}
                className="object-contain transition-all duration-300 group-hover:opacity-90"
              />
            </div>

            {/* Product Details */}
            <div className="mt-4 text-center">
              <h3 className="text-[#3F509E] font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-[#3F509E] font-bold inline-block">${product.price}</p>
              <span className="text-gray-500 line-through ml-2">${product.price}</span>
              <br></br>
              <button onClick={(e) => handleAddToCart(e, product)} className="mt-2 bg-pink-500 text-white py-1 px-3 rounded">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* Vouchers and Product List Section */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Voucher 1 */}
        <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
          <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
          <button className="text-pink-600 underline text-lg font-medium">Shop Now</button>
          <Image
            src="/voucher1.png"
            alt="Voucher Image"
            width={200}
            height={200}
            className="absolute bottom-2 right-0 object-contain pl-10"
          />
        </div>

        {/* Voucher 2 */}
        <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
          <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
          <button className="text-pink-600 underline text-lg font-medium mt-4">View Collection</button>
          <Image
            src="/voucher2.png"
            alt="Voucher Image"
            width={200}
            height={200}
            className="absolute bottom-2 right-2 object-contain pb-7"
          />
        </div>

        {/* Exclusive Product List */}
        <div className="flex flex-col space-y-4">
          {products.slice(0, 3).map((product) => ( // Display a few exclusive products
            <div
              key={product._id}
              className="bg-gray-200 flex items-center p-4 h-[100px] rounded shadow"
            >
              <Image
                src={urlFor(product.image).url()}
                alt="Exclusive Product"
                width={80}
                height={80}
                className="object-contain mr-4"
              />
              <div>
                <h3 className="text-[#3F509E] font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-[#3F509E] font-bold inline-block">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;







// 'use client';

//   import Image from 'next/image';
//   import { useEffect, useState } from 'react';
//   import { client } from '@/sanity/lib/client'; // Ensure this path is correct
//   import { Product } from '../../../types/products';
//   import { allProducts , four, seven } from '@/sanity/lib/queries';
//   import { addToCart } from '../actions/action';
//   import { urlFor } from '@/sanity/lib/image';
  

  
//   function TrendingProducts() {
//       const [products, setProducts] = useState<Product[]>([]);
//       const [loading, setLoading] = useState(true);
//       const [error, setError] = useState<string | null>(null);
  
//       useEffect(() => {
//           async function fetchProducts() {
//               try {
//                   const fetchedProducts = await client.fetch(seven);
//                   setProducts(fetchedProducts);
//               } catch (err) {
//                   setError('Failed to fetch products');
//                   console.error('Fetch error:', err); // More detailed logging
//               } finally {
//                   setLoading(false);
//               }
//           }
//           fetchProducts();
//       }, []);
  
//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>{error}</div>;
  
//       const handleAddToCart = (e: React.MouseEvent, product: Product) => {
//           e.preventDefault();
//           addToCart(product);
//           alert("OK")
//       }
  
  

//   return (
//     <div className="w-full bg-white py-20">
//       {/* Section Heading */}
//       <h2 className="text-[#3F509E] text-3xl font-bold text-center mb-16">Trending Products</h2>

//       {/* Product Grid */}
//       <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
//         {products.map((product) => (
//           <div key={product._id} className="group relative">
//             {/* Image with Gray Background */}
//             <div className="bg-gray-200 flex justify-center items-center p-6 h-[280px] relative">
//               <Image
//                 src={urlFor(product.image).url()}
//                 alt="Trending Product"
//                 width={200}
//                 height={200}
//                 className="object-contain transition-all duration-300 group-hover:opacity-90"
//               />
//             </div>

//             {/* Product Details */}
//             <div className="mt-4 text-center">
//               <h3 className="text-[#3F509E] font-semibold text-lg mb-2">Cantilever Chair</h3>
//               <p className="text-[#3F509E] font-bold inline-block">$26.00</p>
//               <span className="text-gray-500 line-through ml-2">$42.00</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Vouchers and Product List Section */}
//       <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Voucher 1 */}
//         <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
//           <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
//           <button className="text-pink-600 underline text-lg font-medium">Shop Now</button>
//           <Image
//             src="/voucher1.png"
//             alt="Voucher Image"
//             width={200}
//             height={200}
//             className="absolute bottom-2 right-0 object-contain pl-10"
//           />
//         </div>

//         {/* Voucher 2 */}
//         <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
//           <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
//    {/* Button */}
//    <button className="text-pink-600 underline text-lg font-medium mt-4">
//     View Collection
//   </button>
//           <Image
//             src="/voucher2.png"
//             alt="Voucher Image"
//             width={200}
//             height={200}
//              className="absolute bottom-2 right-2 object-contain pb-7"
//           />
//         </div>

//         {/* Exclusive Product List */}
//         <div className="flex flex-col space-y-4">
//           {TrendingProducts.map((product) => (


//             <div
//               key={product.id}
//               className="bg-gray-200 flex items-center p-4 h-[100px] rounded shadow"
//             >
//               <Image
//                 src={urlFor(product.image).url()}
//                 alt="Exclusive Product"
//                 width={80}
//                 height={80}
//                 className="object-contain mr-4"
//               />
//               <div>
//                 <h3 className="text-[#3F509E] font-semibold text-lg mb-1">Exclusive Seat Chair</h3>
//                 <p className="text-[#3F509E] font-bold inline-block">$32.00</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TrendingProducts;