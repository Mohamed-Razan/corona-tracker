import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = localData => {
  
  const doc = new jsPDF();

  
  const tableColumn = ["Date", "Total Infected", "Total Recovered", "Total Active", "Total Deaths"];
  
  const tableRows = [];

  localData.forEach(data => {
    const pdfData = [
      data.Date.toString().substring(0, 10),
      data.Confirmed,
      data.Recovered,
      data.Active,
      data.Deaths
    ];
    
    tableRows.push(pdfData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save('COVID19_LocalData');
};

export default generatePDF;