"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { getCookie } from "cookies-next"
import { ProductData, ProductSchema, productRequest } from "@/schemas/producsts.schema";
import { Toast } from "@/components/toast";
import { redirect } from "next/navigation"


interface Props {
  children: ReactNode;
}

interface ProductProviderData {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  productInfo: ProductData;
  setProductInfo: Dispatch<SetStateAction<ProductData>>;
  coverImage: File | null;
  setCoverImage: Dispatch<SetStateAction<File | null>>;
  createProduct: () => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (formData: ProductData, productId: string) => Promise<void>
  editing: ProductData;
}

const ProductContext = createContext<ProductProviderData>({} as ProductProviderData);

export function ProductProvider({ children }: Props) {
  const router = useRouter();
 
  const [products, setProducts] = useState<ProductData[]>([]);
  const [editing, setEditing] = useState<ProductData>({} as ProductData);
  const [page, setPage] = useState(0);
  const cookies = getCookie("aesthetics.token");

  if (cookies) {
    api.defaults.headers.common.authorization = `Bearer ${cookies}`;
  }

  const [productInfo, setProductInfo] = useState<ProductData>({
    id: "",
    name: "",
    description: "",
    price: "",
    cover_image: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);

  const uploadFiles = async (productId: string, coverImage: File) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } }
    const fd = new FormData()
    if (coverImage.name.includes("jpg")) {
      fd.append("cover_image", coverImage)
      const status = await api.patch(`/products/upload/${productId}`, fd, config)
        .then((res) => res.status)
      return { status }
    }
    return { status: 400 }
  }

  const createProduct = () => {
    api.post<ProductData>("/products", ProductSchema.parse(productInfo as productRequest))
      .then((res) => {
        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          id: res.data.id,
        }));
        return uploadFiles(res.data.id, coverImage!);
      })
      .then((res) => {
        res.status === 200
          ? Toast({ message: "Produto cadastrado com sucesso", isSucess: true })
          : "delete o produto"
        router.push("/")
      })
      .catch((err) => {
        console.log(err)
        Toast({ message: "Erro ao cadastrar o produto" })
      })
  }

  const deleteProduct = (productId: string) => {
    api.delete(`/products/${productId}`)
      .then(() => {
        Toast({ message: "Produto deletado com sucesso", isSucess: true });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao deletar o produto" });
      });
  };


  const updateProduct = async (formData: ProductData, productId: string) => {
    try {
   
      const token = getCookie("aesthetics.token")
      const { data } = await api.patch(`/products/${productId} `, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const update = products.filter((product) => product.id !== productId);
      setProducts([...update, data]);
      redirect("/");
    } catch (error) { }
  };


  return (
    <ProductContext.Provider
      value={{
        coverImage,
        setCoverImage,
        page,
        setPage,
        productInfo,
        setProductInfo,
        createProduct,
        updateProduct,
        deleteProduct,
        editing,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
