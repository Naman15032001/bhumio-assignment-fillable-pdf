import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs/promises';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class PdfService {
  constructor(private logger: LoggerService) {}
  async fillAndSavePdf(formData: any) {
    this.logger.debug('PdfService-fillAndSavePdf','startee')

    const pdfPath = process.env.PDF_PATH; // example pdf path
    const pdfData = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfData);

    const form = pdfDoc.getForm();
  
    form.getFields().forEach((field) => {
      console.log(field.getName());
    });

    for (let data of formData) {
      if (data.type === 'radio' && data.is_checked) {
        const field = form.getRadioGroup(data.name);
        field.select(data.value);
      }
      if (data.type == 'input') {
        const field = form.getTextField(data.name);
        field.setText(data.value as string);
      }
      if (data.type == 'select') {
        const field = form.getDropdown(data.name);
        field.select(data.value as string);
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();
    await fs.writeFile(pdfPath, modifiedPdfBytes);
  }
}
