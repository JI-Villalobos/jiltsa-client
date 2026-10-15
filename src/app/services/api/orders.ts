import axios from "axios"
import { authOptions, endPoints } from ".."

export interface Order {
  id?: number
  providerId: number
  branchId: number
  creationDate: string
  estimatedCost: number
  realCost: number
  status: number
  isOpen: boolean
  items: OrderItem[]
}

export interface OrderItem {
  id?: number
  orderId: number
  item: string
  requested: number
  price: number
  budgeted: number
  itemType: string
  stocked: number
  finalPrice: number
  total: number
  status: number
}

export type CreateOrder = Omit<Order, 'id' | 'items'>
export type UpdateOrder = Omit<Order, 'items'>

export const saveOrder = async (order: CreateOrder) => {
  const { data } = await axios.post<Order>(endPoints.orders.mutate, order, authOptions())

  return data
}

export const updateOrder = async (order: UpdateOrder) => {
  const { data } = await axios.put(endPoints.orders.mutate, order, authOptions())

  return data
}

export const getOrder = async (orderId: number) => {
  const { data } = await axios.get<Order>(endPoints.orders.getById(orderId), authOptions())

  return data
}

export const getOrders = async (branchId: number) => {
  const { data } = await axios.get<Order[]>(endPoints.orders.getOrders(branchId), authOptions())

  return data
}

export const saveItems = async (items: OrderItem[]) => {
  await axios.post(endPoints.orderItems.saveAll, items, authOptions())
}