export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum Income {
  PRONTIPAGOS = 'PRONTIPAGOS',
  MEDICAMENTO = 'MEDICAMENTO'
}

export const conceptList = ["Cobro con tarjeta", "Cobro por transferencia", "BBVA", "COPPEL", "BANORTE", "BANREGIO", "SCOTIABANK", "OTROS"]

export enum Defaults {
  PRONTIPAGOS = 1,
  MEDICAMENTO = 2
}

export enum ExpenseStages {
  SELECT_EXPENSE_TYPE = 'SELECT_EXPENSE_TYPE',
  PROVIDER_SELECTION = 'PROVIDER_SELECTION',
  SERVICE_SELECTION = 'SERVICE_SELECTION',
  NEW_EXPENSE_DETAILS = 'NEW_EXPENSE_DETAILS'
}