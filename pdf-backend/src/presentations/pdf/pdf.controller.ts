import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructures/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infrastructures/usecase-proxy/usecase-proxy.module';
import { SavePdfUseCases } from 'src/applications/use-cases/savePdf.usecases';
import { Response } from 'express';
import { LoggerService } from 'src/infrastructures/services/logger/logger.service';

@Controller('pdf')
export class PdfController {
  constructor(
    @Inject(UsecaseProxyModule.SAVE_PDF_PROXY)
    private readonly savePdfUsecaseProxy: UseCaseProxy<SavePdfUseCases>,
    private logger: LoggerService,
  ) { }

  @Get('view-pdf')
  async viewPdf(@Res() res: Response) {
    try {
      this.logger.debug('PdfController-viewPdf', 'started');
      res.sendFile(process.env.PDF_PATH);
    } catch (error) {
      this.logger.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  @Post('save-pdf')
  async savePdf(@Body() formData: any, @Res() res: Response) {
    this.logger.debug('PdfController-savePdf', 'started');
    try {
      const result = await this.savePdfUsecaseProxy
        .getInstance()
        .execute(formData);
      res.json({ message: 'PDF saved with filled data.' });
    } catch (error) {
      this.logger.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
