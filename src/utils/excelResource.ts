import * as XLSX from 'xlsx';
import Fuse from 'fuse.js';
import { wrapPromise } from './suspenseResource';

export interface TableRow {
  Product: string;
  Planthoogte: string;
  Aantal: number;
  UserAantal?: number;
}

export interface ExcelData {
  tableData: TableRow[];
  header: string[];
  fuse: Fuse<TableRow>;
}

export const excelResource = wrapPromise<ExcelData>(
  (async () => {
    const response = await fetch('/data/voorraadlijst.xls');
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const header = jsonData[9] || [];
    const rows = jsonData
      .slice(10)
      .filter((row) => row.some((cell) => cell !== undefined && cell !== ''));

    const tableData: TableRow[] = rows
      .map((row) => ({
        Product: row[1]?.trim() || '',
        Planthoogte: row[2]?.trim() || '',
        Aantal: Number(row[0]) || 0,
        UserAantal: 0,
      }))
      .filter((row) => row.Product && row.Planthoogte && row.Aantal > 0);

    const fuse = new Fuse(tableData, {
      keys: ['Product'],
      threshold: 0.5,
      distance: 100,
      ignoreLocation: true,
    });

    return { tableData, header, fuse };
  })()
);