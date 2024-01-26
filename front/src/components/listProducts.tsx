import { ProductData } from "@/schemas/producsts.schema";
import Card from "./card";
import { Suspense } from "react";

interface ListProductsProps {
    products: ProductData[]
}

const ListProducts = ({ products }: ListProductsProps) => {

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-items-center">
            {products.map((product) => {
                return <Suspense key={product.id} fallback={<p>Loading</p>}> <Card product={product} /> </Suspense>
            })}
        </div>
    )

}

export default ListProducts