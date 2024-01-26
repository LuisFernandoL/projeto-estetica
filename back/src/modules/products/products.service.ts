import { CreateProductDTO } from "./dtos/create-product.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product.entitie";
import { PrismaService } from "src/database/prisma.service";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "node:fs";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDTO: CreateProductDTO, userId: string) {
    const product = new Product();

    Object.assign(product, { ...createProductDTO });

    const newProduct = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        cover_image: product.cover_image,
        userId,
      },
    });
    return newProduct;
  }

  async findeOne(id: string) {
    const product = this.prisma.product.findFirst({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException("Product not found.");
    }
    return product;
  }

  async findAll() {
    const prodcts = await this.prisma.product.findMany();
    return prodcts;
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException("Product not found.");
    }
    await this.prisma.product.delete({ where: { id } });
  }

  
  async update(id: string, updateProductDto: UpdateProductDto ) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException("User not found");
    }
    const updateProduct = await this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
    return plainToInstance(Product, updateProduct);
  }

  async upload(cover_image: Express.Multer.File, productId: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findProduct = await this.prisma.product.findFirst({
      where: { id: productId },
    });
    if (!findProduct) {
      throw new NotFoundException("Product not found.");
    }

    const uploudImage = await cloudinary.uploader.upload(
      cover_image.path,
      {
        resource_type: "image",
      },
      (error, result) => {
        return result;
      },
    );

    const updateProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        cover_image: uploudImage.secure_url,
      },
    });
    console.log(uploudImage);

    unlink(cover_image.path, (error) => {
      if (error) console.log(error);
    });
    return updateProduct;
  }
}
