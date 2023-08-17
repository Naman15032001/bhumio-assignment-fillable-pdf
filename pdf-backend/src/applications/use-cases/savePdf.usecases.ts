import { PdfService } from 'src/infrastructures/services/pdf/pdf.service';

export class SavePdfUseCases {
  constructor(private pdfService: PdfService ) {}

  async execute(formData: any): Promise<any> {
    return this.pdfService.fillAndSavePdf(formData);
  }
}