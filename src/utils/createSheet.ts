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

  concludedNumbers.forEach((record) => {
    headingColumnNames.forEach((heading, index) => {
      const value = record[heading];
      if (value === null) {
        ws.cell(rowIndex, index + 1).string("null");
      } else if (value === undefined) {
        ws.cell(rowIndex, index + 1).string("undefined");
      } else if (typeof value === "number") {
        ws.cell(rowIndex, index + 1).number(value);
      } else if (typeof value === "boolean") {
        ws.cell(rowIndex, index + 1).string(value.toString());
      } else {
        ws.cell(rowIndex, index + 1).string(value.toString());
      }
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
