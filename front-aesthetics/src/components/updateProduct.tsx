"use client"
import { useProduct } from "@/contexts/productContext";
import { ProductData } from "@/schemas/producsts.schema";
import Link from "next/link";
import { useCallback, useState, ChangeEvent, FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler } from "react-hook-form";
import { FaImage } from "react-icons/fa";

const UpdateProductForm = () => {
  const { productInfo, setProductInfo, setCoverImage,updateProduct, editing } = useProduct();


  const onDrop = useCallback((files: File[]) => {
    setCoverImage(files[0]);
  }, [setCoverImage]);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
    },
  });

  const { getRootProps, getInputProps } = dropzone;

  const submit: SubmitHandler<ProductData> = (formData) => {
    updateProduct(formData, editing.id)
  }

  return (
    <div className="container flex flex-col sm:min-w-[430px] md:min-w-[900px] lg:min-w-[1000px] justify-center items-center bg-gray-800 ">
      <div className="flex flex-col w-4/5 sm:flex-wrap">
        <p className="text-4xl my-6 font-semibold text-center">Atualizar Produto</p>
        <div className="flex flex-row justify-center mb-6">
          <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
        </div>
        {/* arrumar formulario */}
        <form>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2   ">
            <div className="flex flex-col sm:min-w-[300px] md:w-1/2 ">
              <div className="pr-6">
                <label htmlFor="name" className="user-form-label">
                  Nome
                </label>
                <div className="mt-2 mb-12 ">
                  <input
                    type="text"
                    className="user-input-form  text-gray-950"
                    placeholder="Nome"
                    name="name"
                    // value={formData.name}
                  // onChange={handleChange}
                  />
                </div>
                <label htmlFor="description" className="user-form-label">
                  Descrição
                </label>
                <div className="mt-2 mb-12">
                  <input
                    type="text"
                    className="user-input-form  text-gray-950"
                    placeholder="Descrição"
                    name="description"
                    // value={formData.description}
                  // onChange={handleChange}
                  />
                </div>
                <label htmlFor="price" className="user-form-label">
                  Preço
                </label>
                <div className="mt-2 mb-12">
                  <input
                    type="text"
                    className="user-input-form  text-gray-950"
                    placeholder="Preço"
                    name="price"
                    // value={formData.price}
                  // onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div
              {...getRootProps()}
              className=" flex flex-col sm:min-w-[300px] md:w-1/2 bg-blue-900 rounded-lg border-dashed border-2 border-gray-400"
            >
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
              <div className="">
                <Link href={"/"} className="user-form-button bg-pink-600 text-gray-950">
                  Voltar
                </Link>
              </div>
              <button type="submit">Atualizar Produto</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
