import { DynamicModule, Module } from '@nestjs/common';
import { SavePdfUseCases } from 'src/applications/use-cases/savePdf.usecases';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { ServicesModule } from '../services/services.module';
import { PdfService } from '../services/pdf/pdf.service';
import { UseCaseProxy } from './usecase-proxy';
import { LoggerModule } from '../services/logger/logger.module';

@Module({
  imports: [EnvironmentConfigModule, ServicesModule, LoggerModule],
})
export class UsecaseProxyModule {

  static SAVE_PDF_PROXY = 'savePdfUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [PdfService],
          provide: UsecaseProxyModule.SAVE_PDF_PROXY,
          useFactory: (pdfService: PdfService) =>
            new UseCaseProxy(new SavePdfUseCases(pdfService)),
        },
      ],
      exports: [
        UsecaseProxyModule.SAVE_PDF_PROXY,
      ],
    };
  }
}
