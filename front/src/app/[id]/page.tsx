
import ProductContainer from "@/components/productContainer"
import { ProductData } from "@/schemas/producsts.schema"
import api from "@/services/api"
import Link from "next/link"
import { Suspense } from "react"

interface PageProps {
    params: { id: string }
}

export const revalidate = 90

export const generateStaticParams = async () => {
    const response = await api.get<ProductData[]>("/products")

    return response.data.map((product) => ({ id: product.id }))
}

const Product = async ({ params }: PageProps) => {
    const response = await api.get(`/products/${params.id}`)
    const product = response.data

    return (
        <main className="body min-h-screen">
            <div className="flex justify-end p-6" >
                <Link href={"/"} className="btn-primary" >Voltar</Link>
            </div>
            <div className="flex items-center justify-center">
                <Suspense fallback={<p>Loading</p>}> <ProductContainer product={product} /></Suspense>
            </div>
        </main>
    )
}

export default Product
