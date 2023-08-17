import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PdfConfig } from 'src/domains/config/pdf.interface';

@Injectable()
export class EnvironmentConfigService implements PdfConfig {
  constructor(private configService: ConfigService) {}

  getFrontendHost(): string {
    return this.configService.get<string>('FRONTEND_HOST');
  }

  getPdfPath(): string {
    return this.configService.get<string>('PDF_HOST');
  }
}
