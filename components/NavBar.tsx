import React from 'react'
import Link from 'next/link'

export default function NavBar
() {
  return (
    <div className='w-full flex bg-blue-400 text-white p-5 justify-center'>
        <Link href="/" className='mx-5 hover:underline'>หน้าหลัก</Link>
        <Link href="/bmi" className='mx-5 hover:underline'>คำนวณ BMI</Link>
        <Link href="/bmr" className='mx-5 hover:underline'>คำนวณ BMR</Link>
        <Link href="/carinstallment" className='mx-5 hover:underline'>คำนวณค่างวเรถ</Link>
    </div>
  )
}
