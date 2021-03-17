import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePcrPDF = localData => {
  
  const doc = new jsPDF();

  const tableColumn = ["Date", "No. of PCR tests"];
  
  const tableRows = [];

  
  localData.forEach(data => {
    const pdfData = [
      data.date,
      data.count
    ];
    
    tableRows.push(pdfData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save('COVID19_LocalPCRData');
};

export default generatePcrPDF;