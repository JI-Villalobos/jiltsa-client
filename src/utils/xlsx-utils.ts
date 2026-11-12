import * as XLSX from 'xlsx'

export const ORDER_ITEM_SCHEMA = [
  { "ARTICULO": "", "SOLICITUD": "", "PRECIO": "", "TOTAL": "", "TIPO": "" }
]

/** Column order matters: the promotion mapper reads rows by position. */
export const PROMOTION_ITEM_HEADERS = [
  "CLAVE", "DESCRIPCION", "CANTIDAD", "PRECIO_NORMAL", "PRECIO_PROMOCION", "PRECIO_COMPRA", "CADUCIDAD"
] as const

export const PROMOTION_ITEM_SCHEMA = [
  Object.fromEntries(PROMOTION_ITEM_HEADERS.map((header) => [header, ""]))
]

export const generateTemplate = (schema: unknown[], fileName = "template.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(schema)

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "data")

  XLSX.writeFile(workbook, fileName, { compression: true });
}

/**
 * Normalizes a cell that should hold a date to yyyy-MM-dd. Accepts JS dates,
 * Excel serial numbers and the strings yyyy-MM-dd or dd/MM/yyyy.
 */
export const cellToISODate = (value: unknown): string | undefined => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString().slice(0, 10)
  }
  if (typeof value === 'number') {
    const parsed = XLSX.SSF.parse_date_code(value)
    if (!parsed) return undefined
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${parsed.y}-${pad(parsed.m)}-${pad(parsed.d)}`
  }
  if (typeof value === 'string') {
    const text = value.trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text
    const dmy = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (dmy) return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`
  }
  return undefined
}

export const xlsxReader = async (file: File) => {
  const ab = await file.arrayBuffer()
  const wb = XLSX.read(ab)
  const ws = wb.Sheets[wb.SheetNames[0]]

  return XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]
}

export const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
