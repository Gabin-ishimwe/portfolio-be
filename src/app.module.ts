/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { configs } from './config';

@Module({
  imports: [
    ContactModule,
    PrismaModule,
    ConfigModule.forRoot({ load: [configs] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
