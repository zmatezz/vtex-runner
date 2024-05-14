import * as xlsx from 'xlsx';

export function listenerListExcel(filePath: string): Promise<any[]> {
  console.log('Reading spreadsheet:', filePath);
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const itemsList: any[] = [];

  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  for (let i = 1; i < rows.length; i++) {
    itemsList.push(rows[i]);
  }

  console.log('Spreadsheet Items:', itemsList);

  return itemsList as any;
}
