import ListProducts from "@/components/listProducts";
import { ProductData } from "@/schemas/producsts.schema";
import api from "@/services/api";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export default async function Home() {
  const products: ProductData[] = await fetchProducts();
  const token = getCookie("aesthetics.token", { cookies });

  if (!token) {
    console.error("Not admin");
    return (
      <>
        <main className="body min-h-screen p-4">
          <div className="flex gap-5 w-full p-6 flex-wrap">
            <p className="text-4xl md:text-6xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-300">Gersoni Beauty</p>
          </div>
          <ListProducts products={products} />
        </main>
      </>
    );
  }
  const decoded: { admin?: boolean } = jwtDecode(token);
  const isAdmin = decoded && decoded.admin === true;

  return (

    <main className="body min-h-screen p-4">
      <div className="flex gap-5 justify-around w-full p-6 flex-wrap">
        <p className="text-4xl md:text-6xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-300">Gersoni Beauty</p>
        {isAdmin ? (
          <Link href={"/upload"} className="flex justify-center items-center py-1.5 px-3 bg-transparent text-gray-100 border border-pink-500 rounded-2xl shadow-md">
            Cadastrar Produto
          </Link>
        ) : null}
      </div>
      <ListProducts products={products} />
    </main>
  );
}

