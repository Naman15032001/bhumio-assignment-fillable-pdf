import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PdfViewer = ({ pdf }) => {
  
  return (
    <div>
      <Document file={pdf}>
        <Page pageNumber={1} renderForms />
      </Document>
    </div>
  );
};

export default PdfViewer;