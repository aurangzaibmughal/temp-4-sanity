'use client';

import Image from 'next/image';
import { Product } from '../../../types/products';
import { useEffect, useState } from 'react';
import { addToCart } from '../actions/action';
import { client } from '@/sanity/lib/client';
import { four } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

function TopCategories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await client.fetch(four);
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
      {/* Heading */}
      <h2 className="text-center text-[#3F509E] text-3xl font-bold mb-12">Top Categories</h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        {products.map((category) => (
          <div key={category._id} className="relative group flex flex-col items-center">
            {/* Circle Image with Hover Effect */}
            <div className="w-[150px] h-[150px] flex justify-center items-center bg-gray-200 rounded-full relative overflow-hidden">
              <Image
                src={urlFor(category.image).url()}
                alt={category.name}
                width={120}
                height={120}
                className="object-cover"
              />

              {/* Hover Blue Circle Outline */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#3F509E] transition-all duration-300"></div>

              {/* Hover View Shop Button */}
              <button className="absolute bottom-2 bg-[#08D15F] text-white px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Shop
              </button>
            </div>

            {/* Category Name and Price */}
            <h3 className="text-[#3F509E] font-bold mt-4">{category.name}</h3>
            <p className="text-gray-600">{category.price}</p>
          </div>
        ))}
      </div>

      {/* Pink Dots */}
      <div className="flex justify-center mt-4">
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
      </div>
    </div>
  );
}

export default TopCategories;


// 'use client';

// import Image from 'next/image';
// import { Product } from '../../../types/products';
// import { useEffect, useState } from 'react';
// import { addToCart } from '../actions/action';
// import { client } from '@/sanity/lib/client';
// import { four } from '@/sanity/lib/queries';
// import { urlFor } from '@/sanity/lib/image';

// function TopCategories() {
//   const [products, setProducts] = useState<Product[]>([]);
//       const [loading, setLoading] = useState(true);
//       const [error, setError] = useState<string | null>(null);
  
//       useEffect(() => {
//           async function fetchProducts() {
//               try {
//                   const fetchedProducts = await client.fetch(four);
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
//  return (
//     <div className="w-full bg-white py-20">
//       {/* Heading */}
//       <h2 className="text-center text-[#3F509E] text-3xl font-bold mb-12">Top Categories</h2>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
//         {TopCategories.map((category) => (
//           <div key={category.id} className="relative group flex flex-col items-center">
//             {/* Circle Image with Hover Effect */}
//             <div className="w-[150px] h-[150px] flex justify-center items-center bg-gray-200 rounded-full relative overflow-hidden">
//               <Image
//                 src={urlFor(category.image).url()}
//                 alt={category.name}
//                 width={120}
//                 height={120}
//                 className="object-cover"
//               />

//               {/* Hover Blue Circle Outline */}
//               <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#3F509E] transition-all duration-300"></div>

//               {/* Hover View Shop Button */}
//               <button className="absolute bottom-2 bg-[#08D15F] text-white px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 View Shop
//               </button>
//             </div>

//             {/* Category Name and Price */}
//             <h3 className="text-[#3F509E] font-bold mt-4">{category.name}</h3>
//             <p className="text-gray-600">{category.price}</p>
//           </div>
//         ))}
//       </div>

//       {/* Pink Dots */}
//       <div className="flex justify-center mt-4">
//         <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
//         <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
//         <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
//       </div>
//     </div>
//   );
// }

// export default TopCategories;