import * as XLSX from 'xlsx'

export const ORDER_ITEM_SCHEMA = [
  { "ARTICULO": "", "SOLICITUD": "", "PRECIO": "", "TOTAL": "", "TIPO": "" }
]

export const generateTemplate = (schema: unknown[]) => {
  const worksheet = XLSX.utils.json_to_sheet(schema)

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "data")

  XLSX.writeFile(workbook, "template.xlsx", { compression: true });
}