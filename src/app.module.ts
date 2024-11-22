import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './app.controller';
import { AppService } from './app.service';
import { SystemConfigService } from './system-config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ChatController],
  providers: [AppService, SystemConfigService],
})
export class AppModule {}
