import { ProductsService } from "./products.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UpdateProductDto } from "./dtos/update-product.dto";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post("")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDTO: CreateProductDTO, @Request() req) {
    console.log("User from Request:", req.user);

    if (!req.user || req.user.admin !== true) {
      console.error("Authentication failed. User is not an admin.");
      throw new UnauthorizedException(
        "Apenas administradores podem criar produtos.",
      );
    }
    return this.productsService.create(createProductDTO, req.user.id);
  }

  @Get(":id")
  @ApiBearerAuth()
  findOne(@Param("id") id: string) {
    return this.productsService.findeOne(id);
  }

  @Get("")
  findAll() {
    return this.productsService.findAll();
  }

  @Patch(":id")
  @ApiBearerAuth()
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch("upload/:id")
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "cover_image", maxCount: 1 }]),
  )
  upload(
    @UploadedFiles()
    files: {
      cover_image?: Express.Multer.File[];
    },
    @Param("id") id: string,
  ) {
    const { cover_image } = files;
    return this.productsService.upload(cover_image[0], id);
  }

  @HttpCode(204)
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
