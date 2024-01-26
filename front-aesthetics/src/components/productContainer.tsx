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
        <div className="w-4/5 min-h-[803] gap-4 md:gap-0 flex-wrap md:flex-nowrap bg-pink-800 rounded-lg flex flex-col md:flex-row pb-8 pt-20 justify-center px-4">
            <div className="flex flex-col flex-wrap justify-center ml-0 lg:ml-16">
                <p className="text-4xl md:text-5xl text-gray-100 pb-6 md:ml-12">{product.name}</p>
                <div className=" md:w-[30rem] md:h-[33rem] lg:ml-12 w-full h-[186px] justify-center flex">
                    <Image
                        className="object-cover md:w-4/5 md:h-4/5 lg:w-full h-full rounded-lg md:mt-3"
                        src={product.cover_image ? product.cover_image : imagemcapa}
                        width={209}
                        height={186}
                        alt={product.name}
                    />
                </div>
            </div>
            <div className="flex flex-col md:gap-12 w-4/5 justify-center lg:ps-7 ">
                <p className="text-4xl md:text-5xl my-2 text-gray-100">
                    <strong>Descrição:</strong> {product.description}
                </p>
                <p className="text-4xl md:text-5xl my-2 text-gray-100">
                    <strong>Preço:</strong> R$ {product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductContainer;
