import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { PdfController } from './pdf.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [PdfController],
})
export class PdfModule {}
