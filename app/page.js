'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [subdomain, setSubdomain] = useState('')
  const [school, setSchool] = useState(null)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      const sub = host.replace('.localhost', '').replace(':3000', '')
      setSubdomain(sub)
    }
  }, [])

  useEffect(() => {
    if (subdomain) {
      fetchSchool()
    }
  }, [subdomain]) // 👈 Only call when subdomain is ready

  const fetchSchool = async () => {
    try {
      const typeValue = `${subdomain}.icbapp`
      console.log('Sending type:', typeValue)

      const response = await fetch('/api/school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subdomain }),
      })

      const data = await response.json()
      console.log('Response:', data)
      setSchool(data.school)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {school?.tenant_id?  <h1 className="text-2xl font-bold">school: {school?.tenant_id}</h1> : <h1 className="text-2xl font-bold">No school found</h1>}
        {school?.logo && (
          <img
            src={school.logo}
            alt="ICBApp Logo"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
        )}
      </main>
    </div>
  )
}
