import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import hi from '../assets/export.png';
const ExportPDF = ({ elementId, fileName = "download.pdf" }) => {
  const handleDownload = async () => {
    const input = document.getElementById(elementId);
    if (!input) {
      console.error(`Element with id '${elementId}' not found`);
      return;
    }

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF export error:", error);
    }
  };

  return (
    <div>
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-white-500 text-[#00a79b] rounded-lg inline  border-[#00a79b] gap-3  border flex flex-row items-center "
    >Export <img src={hi} alt="export" className="h-5 w-5"/>
      className="px-2 py-2 bg-white-500 text-[#00a79b] rounded-lg flex inline hover:bg-[#00a99a] border-[#00a79b] group hover:text-white border"
    >
      Export <img src={hi} className="w-5 h-5 hover:bg-white" alt="export"/>
    </button>
    </div>
  );
};

export default ExportPDF;



{/* <ExportPDF elementId="id" fileName="name.pdf" /> */}