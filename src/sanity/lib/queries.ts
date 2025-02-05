import { groq } from "next-sanity";

export const allProducts = groq `*[_type =="product"]`;
export const four = groq `*[_type =="product"] | order(_createdAt desc) [0...4]`;

export const six = groq `*[_type =="product"] | order(_createdAt desc) [0...6]`;

 export const seven = groq `*[_type =="product"] | order(_createdAt desc) [0...7]`;

    
