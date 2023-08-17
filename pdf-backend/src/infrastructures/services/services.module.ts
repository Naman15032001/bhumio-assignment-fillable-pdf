import { Module } from '@nestjs/common';
import { PdfService } from './pdf/pdf.service';
import { LoggerModule } from './logger/logger.module';


@Module({
  imports: [LoggerModule],
  providers: [PdfService],
  exports: [PdfService],
})
export class ServicesModule {}