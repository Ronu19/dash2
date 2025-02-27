"use client"

import {
    Table,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Certificate = {
  id: number;
  customer_Name: string;
  site_Location: string;
  make_Model: string;
  range: string;
  serial_No: string;
  calibration_Gas: string;
  gas_Canister_Details: string;
  date_Of_Calibration: string;
  calibration_Due_Date: string;
}

interface CertificateTableProps {
  initialData: Certificate[];
}

export default function CertificateTable({ initialData }: CertificateTableProps) {
  const router = useRouter()
  const [certificatesData, setCertificatesData] = useState<Certificate[]>(initialData)

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setCertificatesData(certificatesData.filter(cert => cert.id !== id))
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting certificate:', error)
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/certificates/edit/${id}`)
  }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Site Location</TableHead>
          <TableHead>Make/Model</TableHead>
          <TableHead>Range</TableHead>
          <TableHead>Serial No.</TableHead>
          <TableHead>Calibration Gas</TableHead>
          <TableHead>Gas Canister Details</TableHead>
          <TableHead>Date of Calibration</TableHead>
          <TableHead>Calibration Due Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificatesData.map((certificate) => (
          <TableRow key={certificate.id}>
            <TableCell>{certificate.customer_Name}</TableCell>
            <TableCell>{certificate.site_Location}</TableCell>
            <TableCell>{certificate.make_Model}</TableCell>
            <TableCell>{certificate.range}</TableCell>
            <TableCell>{certificate.serial_No}</TableCell>
            <TableCell>{certificate.calibration_Gas}</TableCell>
            <TableCell>{certificate.gas_Canister_Details}</TableCell>
            <TableCell>{certificate.date_Of_Calibration}</TableCell>
            <TableCell>{certificate.calibration_Due_Date}</TableCell>
            <TableCell className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(certificate.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(certificate.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}