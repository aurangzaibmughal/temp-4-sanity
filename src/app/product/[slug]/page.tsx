// Use "async" in the component itself for fetching data
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// Define the structure of your page props according to Next.js requirements
interface PageProps {
  params: Promise <{ slug: string }>;
}

// Fetch product data directly inside the component
async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      code,
      price,
      description,
      stockLevel,
      image {
        asset->{
          _id,
          url
        }
      }
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: PageProps) {
  // Fetch product data within the component
  const product = await getProduct((await params).slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <div className="aspect-square">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-semibold text-gray-500">{product.code}</p>
          <span className="text-4xl font-semibold text-pink-400">${product.price}</span>
          <p className="text-lg font-semibold text-gray-500">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
