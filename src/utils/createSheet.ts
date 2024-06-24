import xl from "excel4node";

export function createSheet(
  resultName: string,
  headingColumnNames: string[],
  concludedNumbers: any[]
) {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Worksheet Name");
  const date = new Date();
  let months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]

  let monthNumber = date.getMonth();
  let monthName = months[monthNumber]

  let headingRowIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(headingRowIndex, headingColumnNames.indexOf(heading) + 1).string(
      heading
    );
  });

  let rowIndex = 2;

  concludedNumbers.forEach((record, i) => {
    headingColumnNames.forEach((heading, index) => {
      let columnIndex = 1;
      Object.entries(record).forEach(([key, value]) => {
        if (typeof value === "number" || typeof value === "string") {
          ws.cell(rowIndex, columnIndex).string(value.toString());
        } else {
          ws.cell(rowIndex, columnIndex).string("");
        }
        columnIndex++;
      });
    });
    rowIndex++;
  });
  
  const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  const filePath = `${
    process.env.ROOT_PATH_GENERATED_FILES
  }/${resultName} - ${date.getDate()}${
    monthName
  }${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}_${randomDigits}.xlsx`;

  console.log("File log stored in:", filePath);

  wb.write(filePath);
}


