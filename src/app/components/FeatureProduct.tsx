'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Ensure this path is correct
import { urlFor } from '@/sanity/lib/image'; // Ensure this path is correct
import { Product } from '../../../types/products';
import { allProducts , four } from '@/sanity/lib/queries';
import Link from 'next/link';
import { addToCart } from '../actions/action';

function FeaturedProducts() {
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
        alert("OK")
    }

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h2 className="text-[#3F509E]  text-4xl text-center mb-16 font-bold">Featured Products</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {products.map((product) => (

                    <div key={product._id} className='border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200'
                    >
                        <Link href={`/product/${product.slug.current}`}>
                        
                            
                       <Image
                            src={urlFor(product.image).url()} // Make sure urlFor works as expected
                            alt={product.name}
                            width={200}
                            height={250}
                            className='text-center mt-4 text-lg font-semibold text-red-500"'
                            />
                            <div className='text-lg font-semibold text-red-500'>
                            <h3 className='text-center'>{product.name}</h3>
                            </div>
                        
                        <div className='flex justify-center items-center gap-1 mt-1'>
                        
                        <span className="text-[#05E6B7] text-4xl">-</span>
                        <span className="text-[#F701A8] text-4xl">-</span>
                        <span className="text-[#00009D] text-4xl">-</span>
                        </div>
                        <div className="text-center mt-4">
                        <p className="text-lg font-semibold text-red-500">${product.price}</p>
                        <p className=" mt-2 text-sm text-gray-600">Code - Y523201 {product.code}</p>
                        <button className="px-4 py-2 bg-[#FB2E86] text-white rounded-md text-sm hover:bg-pink-600
                        hover:scale-110 transition-transform duration-300 ease-in-out
                         "
                            onClick={(e) => handleAddToCart(e , product)}
                            >
                                Add to Cart
                        </button>
                        </div>
                     </Link>
                </div>
                ))}
            </div>
            
        </div>
        
    );
}

export default FeaturedProducts;
