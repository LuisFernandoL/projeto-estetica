import { ProductData } from "@/schemas/producsts.schema";
import Image from "next/image";
import Link from "next/link";
import imagemcapa from "../assets/transferir.jpeg"
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import ButtonDelete from "./buttonDelete";



interface CardProps {
    product: ProductData
}

const Card = ({ product }: CardProps) => {
    const token = getCookie("aesthetics.token", { cookies });

    if (!token) {
        console.error("Not admin");
        return (
            <>
                <div className=" bg-pink-800 w-64 rounded-lg" >
                    {product ? (<Link href={`/${product.id}`} className="flex flex-col items-center min-w-56">
                        <div className=" w-[209px] h-[186px]  rounded-lg">
                            <Image
                                className="object-cover w-full h-full  rounded-lg mt-3"
                                src={product.cover_image ? product.cover_image : imagemcapa}
                                width={209}
                                height={186}
                                alt={product.name}
                            />

                        </div>
                        <div className=" flex flex-col w-4/5 justify-center gap-2 py-4">
                            <p className="text-xl">{product.name}</p>
                            <h3>{product.description}</h3>
                            <h3>R$: {product.price}</h3>
                        </div>
                    </Link>) : <></>}

                </div>
            </>
        );
    }
    const decoded: { admin?: boolean } = jwtDecode(token);
    const isAdmin = decoded && decoded.admin === true;

    

    return (
        <div className=" bg-pink-800 w-64 rounded-lg" >
            {product ? (<Link href={`/${product.id}`} className="flex flex-col items-center min-w-56">
                <div className=" w-[209px] h-[186px]  rounded-lg">
                    <Image
                        className="object-cover w-full h-full  rounded-lg mt-3"
                        src={product.cover_image ? product.cover_image : imagemcapa}
                        width={209}
                        height={186}
                        alt={product.name}
                    />

                </div>
                <div className=" flex flex-col w-4/5 justify-center gap-2 py-4">
                    <p className="text-xl">{product.name}</p>
                    <h3>{product.description}</h3>
                    <h3>R$: {product.price}</h3>
                    {isAdmin ? <ButtonDelete product={product}/>: null}
                </div>
            </Link>) : <></>}

        </div>

    )
}

export default Card
