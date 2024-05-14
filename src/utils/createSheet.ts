import xl from "excel4node";

export function createSheet(
  resultName: string,
  headingColumnNames: string[],
  concludedNumbers: any[]
) {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Worksheet Name");
  const date = new Date();

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

  const filePath = `${
    process.env.ROOT_PATH_GENERATED_FILES
  }/${resultName}-${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}.xlsx`;

  console.log("File log stored in:", filePath);

  wb.write(filePath);
}
