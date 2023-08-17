import { useState } from "react";
import "./App.css";
import PdfViewer from "./components/PdfViewer";
import axios from "axios";

function App() {
  const [pdf_uri, setPdf_uri] = useState();

  const handleLoadPDF = async () => {
    try {
      let req_url = `${process.env.REACT_APP_BACKEND_HOST}/pdf/view-pdf`;
      //console.log(req_url)
      const response = await axios.get(req_url, {
        responseType: "blob",
      });

      // create blob(binary object with a type application/json)
      const pdf_uri = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setPdf_uri(pdf_uri);
    } catch (error) {
      console.log("Handle load pdf failed",error)
    }
  };

  const handleSavePDF = async () => {
    try {
      if(!pdf_uri){
        return;
      }
      const form_data = await get_form_data(pdf_uri);

      //POST req to nestjs backend
      const req_url=`${process.env.REACT_APP_BACKEND_HOST}/pdf/save-pdf`
      const response = await axios.post(
        req_url,
        form_data
      );
    } catch (error) {
      console.log("save pdf failed",error)
    }
  };

  async function get_form_data() {
    // type -> radio , select , input 
    let data = [];
    let radio_eles_array = Array.from(
      document.querySelectorAll(".radioButton input")
    );

    //need radio value as needed for backend form radio btn selection
    const radio_map_id_values = Object.freeze({
      pdfjs_internal_id_19R: "parttime",
      pdfjs_internal_id_24R: "fulltime",
      pdfjs_internal_id_39R: "parttime",
      pdfjs_internal_id_44R: "fulltime",
    });

    const radio_data = radio_eles_array.map((el) => {
      return {
        type: "radio",
        id: el.id,
        name: el.name,
        is_checked: el.checked,
        value: radio_map_id_values[el.id]
      };
    });

    //console.log(radio_data, "radio_data");

    let select_options_array = Array.from(document.querySelectorAll("select"));

    const select_data = select_options_array.map((el) => {
      return {
        type: "select",
        id: el.id,
        name: el.name,
        value: el.value,
      };
    });

    //console.log(select_data, "select_data");

    let input_text_array = Array.from(
      document.querySelectorAll(".textWidgetAnnotation input")
    );

    const input_text_data = input_text_array.map((el) => {
      return {
        type: "input",
        id: el.id,
        name: el.name,
        value: el.value,
      };
    });

    data = [...input_text_data, ...radio_data, ...select_data];
    //console.log(data);
    return data;
  }

  return (
    <>
      <div id="btn-cont">
        <button id="load-btn" onClick={handleLoadPDF}>
          Load PDF
        </button>
        <button id="save-btn" onClick={handleSavePDF}>
          Save PDF
        </button>
      </div>
      <div id="pdf-container">
        <PdfViewer pdf={pdf_uri} />
      </div>
    </>
  );
}

export default App;
