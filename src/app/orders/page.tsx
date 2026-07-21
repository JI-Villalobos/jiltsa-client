'use client'

import { useState } from "react";
import Layout from "../layouts/Layout";
import Modal from "../components/shared/Modal";
import { CreatePurchaseForm } from "./components/CreatePurchaseForm";

export default function Orders() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <button className="transition delay-150 duration-300 ease-in-out  
                            hover:-translate-y-1 hover:scale-110 text-mp-white 
                            text-center bg-gradient-to-r from-mp-green to-mp-blue  
                            p-2 rounded mt-6"
          onClick={() => setShowModal(true)}
        >
          Crear Orden
        </button>
        <div className="flex flex-col items-center justify-center">

        </div>
      </div>
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <CreatePurchaseForm />
        </Modal>
      }
    </Layout>
  )
}