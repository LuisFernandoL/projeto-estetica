'use client'
import Image from "next/image";
import { ProductData } from "@/schemas/producsts.schema";
import imagemcapa from "../assets/transferir.jpeg"
import { useProduct } from "@/contexts/productContext";
import Link from "next/link";


interface IProductContainerProps {
    product: ProductData;
}

const ProductContainer = ({ product }: IProductContainerProps) => {
    const { deleteProduct, updateProduct } = useProduct()

    const handleDelete = () => {
        if (window.confirm("tem certeza que deseja excluir esse produto ?"))
            deleteProduct(product.id)
    }

    return (
        <div className="w-4/5 h-3/4 min-w-[1502px] min-h-[803] bg-pink-800 rounded-lg flex flex-row pb-8 pt-20">
            <div className="flex flex-col justify-center w-2/4 pl-32">
                <p className="text-5xl text-gray-100 pb-6 ml-12">{product.name}</p>
                <div className=" w-[30rem] h-[33rem] ml-12">
                    <Image
                        className="object-cover w-full h-full  rounded-lg mt-3"
                        src={product.cover_image ? product.cover_image : imagemcapa}
                        width={209}
                        height={186}
                        alt={product.name}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-12 w-2/4 justify-center ">
                <p className="text-5xl my-2 text-gray-100">
                    <strong>Descrição:</strong> {product.description}
                </p>
                <p className="text-5xl my-2 text-gray-100">
                    <strong>Preço:</strong> R$ {product.price}
                </p>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                    Deletar Produto
                </button>
                {/* <Link href={"/updateProduct"}>
                    Atualizar Produto
                </Link> */}
            </div>
        </div>
    );
};

export default ProductContainer;
