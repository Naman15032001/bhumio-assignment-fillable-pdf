import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { UsecaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { PdfController } from './presentations/pdf/pdf.controller';
import { LoggerModule } from './infrastructures/services/logger/logger.module';

@Module({
  imports: [UsecaseProxyModule.register(), EnvironmentConfigModule , LoggerModule],
  controllers: [PdfController],
})
export class AppModule {}
