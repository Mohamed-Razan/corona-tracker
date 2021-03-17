import jsPDF from "jspdf";
import "jspdf-autotable";

const generateHospitalPDF = localData => {
  
  const doc = new jsPDF();

  const tableColumn = ["Hospital Name", "No. of Patients"];
  
  const tableRows = [];

  
  localData.forEach(data => {
    const pdfData = [
      data.hospital.name,
      data.cumulative_total
    ];
    
    tableRows.push(pdfData);
  });


  
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save('COVID19_LocalHospitalData');
};

export default generateHospitalPDF;