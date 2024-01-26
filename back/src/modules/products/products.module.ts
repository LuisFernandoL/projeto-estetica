import { PrismaService } from "./../../database/prisma.service";
import { BadRequestException, Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: "./tmp",
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === "image/jpeg") {
          cb(null, true);
        } else {
          cb(new BadRequestException("Only jpeg format alowed"), false);
        }
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductModule {}
