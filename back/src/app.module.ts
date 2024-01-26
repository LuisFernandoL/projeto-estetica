import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProductModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
