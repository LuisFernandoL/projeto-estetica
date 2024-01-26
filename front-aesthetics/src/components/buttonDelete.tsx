"use client"
import { useProduct } from "@/contexts/productContext"
import { ProductData } from "@/schemas/producsts.schema"
import { MdAutoDelete } from "react-icons/md";


interface CardProps {
    product: ProductData
}

const ButtonDelete = ({ product }: CardProps) => {
    const { deleteProduct } = useProduct()

    const handleDelete = () => {
        if (window.confirm("tem certeza que deseja excluir esse produto ?"))
            deleteProduct(product.id)
    }
    return (
        <div>
            <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
                <MdAutoDelete />
            </button>
        </div>
    )
}

export default ButtonDelete