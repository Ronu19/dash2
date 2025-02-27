"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditCertificate({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customer_Name: '',
    site_Location: '',
    make_Model: '',
    range: '',
    serial_No: '',
    calibration_Gas: '',
    gas_Canister_Details: '',
    date_Of_Calibration: '',
    calibration_Due_Date: '',
  })

  useEffect(() => {
    const fetchCertificate = async () => {
      const response = await fetch(`/api/certificates/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      }
    }
    fetchCertificate()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/certificates/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating certificate:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Edit Certificate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer_Name">Customer Name</Label>
            <Input
              id="customer_Name"
              name="customer_Name"
              value={formData.customer_Name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_Location">Site Location</Label>
            <Input
              id="site_Location"
              name="site_Location"
              value={formData.site_Location}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="make_Model">Make/Model</Label>
            <Input
              id="make_Model"
              name="make_Model"
              value={formData.make_Model}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="range">Range</Label>
            <Input
              id="range"
              name="range"
              value={formData.range}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serial_No">Serial No.</Label>
            <Input
              id="serial_No"
              name="serial_No"
              value={formData.serial_No}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calibration_Gas">Calibration Gas</Label>
            <Input
              id="calibration_Gas"
              name="calibration_Gas"
              value={formData.calibration_Gas}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gas_Canister_Details">Gas Canister Details</Label>
            <Input
              id="gas_Canister_Details"
              name="gas_Canister_Details"
              value={formData.gas_Canister_Details}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date_Of_Calibration">Date of Calibration</Label>
            <Input
              id="date_Of_Calibration"
              name="date_Of_Calibration"
              type="date"
              value={formData.date_Of_Calibration}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calibration_Due_Date">Calibration Due Date</Label>
            <Input
              id="calibration_Due_Date"
              name="calibration_Due_Date"
              type="date"
              value={formData.calibration_Due_Date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
