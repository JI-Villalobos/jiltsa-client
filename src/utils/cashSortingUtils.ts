import { CashSorting } from "@/app/services/api/cashSorting"

export const compare = (a: CashSorting, b: CashSorting): boolean => {
  return a.bt1000 === b.bt1000 &&
    a.bt500 === b.bt500 &&
    a.bt200 === b.bt200 &&
    a.bt100 === b.bt100 &&
    a.bt50 === b.bt50 &&
    a.bt20 === b.bt20 &&
    a.md20 === b.md20 &&
    a.md10 === b.md10 &&
    a.md5 === b.md5 &&
    a.md2 === b.md2 &&
    a.md1 === b.md1 &&
    a.md005 === b.md005 &&
    a.bls10 === b.bls10 &&
    a.bls5 === b.bls5 &&
    a.bls2 === b.bls2 &&
    a.bls1 === b.bls1
}

export const calculateTotalAmount = (cashSorting: CashSorting): number => {
  return (cashSorting.bt1000 * 1000) +
    (cashSorting.bt500 * 500) +
    (cashSorting.bt200 * 200) +
    (cashSorting.bt100 * 100) +
    (cashSorting.bt50 * 50) +
    (cashSorting.bt20 * 20) +
    (cashSorting.md20 * 20) +
    (cashSorting.md10 * 10) +
    (cashSorting.md5 * 5) +
    (cashSorting.md2 * 2) +
    (cashSorting.md1 * 1) +
    (cashSorting.md005 * 0.5) +
    (cashSorting.bls10 * 500) +
    (cashSorting.bls5 * 500) +
    (cashSorting.bls2 * 200) +
    (cashSorting.bls1 * 100)
}