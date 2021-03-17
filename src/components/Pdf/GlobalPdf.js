import jsPDF from "jspdf";
import "jspdf-autotable";

const generateGlobalPDF = globalData => {
  
  const doc = new jsPDF();

  const tableColumn = ["Date", "Total Infected", "Total Deaths"];
 
  const tableRows = [];

 
  globalData.forEach(data => {
    const pdfData = [
      data.date,
      data.confirmed,
      data.deaths
    ];
   
    tableRows.push(pdfData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save('COVID19_GlobalData');
};

export default generateGlobalPDF;