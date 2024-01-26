"use client"

import { useProduct } from "@/contexts/productContext";
import Link from "next/link";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";


import { FaImage } from "react-icons/fa";

const UploadImageForm = () => {
    const { productInfo, setProductInfo, setCoverImage, createProduct } = useProduct();

    const onDrop = useCallback((files: File[]) => {
        setCoverImage(files[0])
    }, [setCoverImage])

    const dropzone = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg"]
        }
    })

    const { getRootProps, getInputProps } = dropzone

    return (

        <div className="container flex flex-col sm:min-w-[430px] md:min-w-[900px] lg:min-w-[1000px] justify-center items-center bg-gray-800 ">
            <div className="flex flex-col w-4/5 sm:flex-wrap" >
                <p className="text-4xl my-6 font-semibold text-center">Salvar Produto</p>
                <div className="flex flex-row justify-center mb-6">
                    <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2   ">
                    <div className="flex flex-col sm:min-w-[300px] md:w-1/2 ">
                        <div className="pr-6">
                            <label htmlFor="gender" className="user-form-label">
                                Nome
                            </label>
                            <div className="mt-2 mb-12 ">
                                <input
                                    type="text"
                                    className="user-input-form  text-gray-950"
                                    placeholder="Nome"
                                    onChange={(e) => {
                                        setProductInfo({ ...productInfo, name: e.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="year" className="user-form-label">
                                    Descrição
                                </label>
                                <div className="mt-2 mb-12">
                                    <input
                                        type="text"
                                        className="user-input-form  text-gray-950"
                                        placeholder="Descrição"
                                        onChange={(e) => {
                                            setProductInfo({ ...productInfo, description: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="user-form-label">
                                    Preço
                                </label>
                                <div className="mt-2 mb-12">
                                    <input
                                        type="text"
                                        className="user-input-form  text-gray-950"
                                        placeholder="Preço"
                                        onChange={(e) => {
                                            setProductInfo({ ...productInfo, price: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        {...getRootProps()}
                        className=" flex flex-col sm:min-w-[300px] md:w-1/2 bg-blue-900 rounded-lg border-dashed border-2 border-gray-400">
                        <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
                            <div className="flex flex-col items-center justify-center">
                                <FaImage className=" fill-gray-200 w-24 h-20 m-4" />
                                <p className="text-3xl">Arrasta e solte a capa aqui</p>
                                <p className="text-3xl mt-4">- OU -</p>
                                <button className="user-form-button w-48 my-8 text-gray-950" onClick={(e) => e.preventDefault()}>
                                    Busque aqui
                                </button>
                                <p className="text-lg italic font-gray-200">Formatos suportados: jpg</p>
                            </div>
                        </label>
                        <input className="hidden" {...getInputProps()} />
                    </div>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                    <div className="flex flex-col md:flex-row items-center justify-center  py-5 gap-2">

                        <div className="" >
                            <Link href={"/"} className="user-form-button bg-pink-600 text-gray-950" >Voltar</Link>
                        </div>

                        <button
                            className="user-form-button text-gray-950"
                            onClick={(e) => {
                                e.preventDefault();
                                createProduct()
                            }}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UploadImageForm;


// return (

//     <div className="container w-3/4 min-w-[1393px] bg-gray-800 flex justify-center">
//         <div>
//             <p className="text-4xl my-6 font-semibold text-center">Salvar Produto</p>
//             <div className="flex flex-row justify-center mb-6">
//                 <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
//             </div>
//             <div className="flex flex-row w-4/5">
//                 <div className="min-w-[648px] min-h-[410px] justify-center">
//                     <div className="pr-6">
//                         <label htmlFor="gender" className="user-form-label">
//                             Nome
//                         </label>
//                         <div className="mt-2 mb-12">
//                             <input
//                                 type="text"
//                                 className="user-form-input"
//                                 placeholder="Nome"
//                                 onChange={(e) => {
//                                     setProductInfo({ ...productInfo, name: e.target.value });
//                                 }}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="year" className="user-form-label">
//                                 Descrição
//                             </label>
//                             <div className="mt-2 mb-12">
//                                 <input
//                                     type="text"
//                                     className="user-form-input"
//                                     placeholder="Descrição"
//                                     onChange={(e) => {
//                                         setProductInfo({ ...productInfo, description: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="name" className="user-form-label">
//                                 Preço
//                             </label>
//                             <div className="mt-2 mb-12">
//                                 <input
//                                     type="text"
//                                     className="user-form-input"
//                                     placeholder="Preço"
//                                     onChange={(e) => {
//                                         setProductInfo({ ...productInfo, price: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div
//                     {...getRootProps()}
//                     className=" flex flex-col min-w-[648px] min-h-[410px] bg-blue-900 rounded-lg border-dashed border-2 border-gray-400">
//                     <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
//                         <div className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2">
//                             <FaImage className="fill-gray-200 w-24 h-20 m-4" />
//                             <p className="text-3xl">Arrasta e solte a capa aqui</p>
//                             <p className="text-3xl mt-4">- OU -</p>
//                             <button className="user-form-button w-48 my-8 text-gray-950" onClick={(e) => e.preventDefault()}>
//                                 Busque aqui
//                             </button>
//                             <p className="text-lg italic font-gray-200">Formatos suportados: jpg</p>
//                         </div>
//                     </label>
//                     <input className="hidden" {...getInputProps()} />
//                 </div>
//             </div>
//             <div className="flex items-center justify-end">
//                 <div className="flex flex-row gap-2">

//                     <div className="" >
//                         <Link href={"/"} className="user-form-button bg-pink-600 w-32 my-8 text-gray-950" >Voltar</Link>
//                     </div>

//                     <button
//                         className="user-form-button w-72 my-8 text-gray-950"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             createProduct()
//                         }}>
//                         Finalizar Cadastro
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// )
// }


// export default UploadImageForm;

