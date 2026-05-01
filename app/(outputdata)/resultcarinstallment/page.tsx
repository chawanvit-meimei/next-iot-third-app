"use client";

import Image from "next/image";
import carImg from "@/assets/images/car.png";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResultCarContent() {
  const params = useSearchParams();

  const carPrice = params?.get("carPrice") ?? "";
  const downPayment = params?.get("downPayment") ?? "";
  const loanMonths = params?.get("loanMonths") ?? "";
  const interestRate = params?.get("interestRate") ?? "";
  const monthlyPayment = params?.get("monthlyPayment") ?? "";
  const totalPayment = params?.get("totalPayment") ?? "";
  const totalInterest = params?.get("totalInterest") ?? "";
  const loanAmount = params?.get("loanAmount") ?? "";

  if (
    !carPrice ||
    !downPayment ||
    !loanMonths ||
    !interestRate ||
    !monthlyPayment
  ) {
    return (
      <div className="w-1/2 border-gray-300 mx-auto shadow-xl p-10 rounded-b-lg text-center">
        <p className="mb-4">ไม่พบข้อมูลผลลัพธ์</p>

        <Link
          href="/carinstallment"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          กลับไปคำนวณ
        </Link>
      </div>
    );
  }

  return (
    <div className="w-1/2 border-gray-300 mx-auto shadow-xl p-10 rounded-b-lg">
      <Image
        src={carImg}
        alt="Car Installment"
        width={100}
        height={100}
        className="mx-auto"
      />

      <h1 className="text-2xl font-bold mb-4 text-center">
        ผลลัพธ์การผ่อนรถยนต์
      </h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="mb-2">
          ราคารถยนต์:
          <span className="font-semibold">
            {" "}
            {parseFloat(carPrice).toLocaleString("th-TH", {
              maximumFractionDigits: 2,
            })}{" "}
            บาท
          </span>
        </p>

        <p className="mb-2">
          ดาวน์เพย์เมนต์:
          <span className="font-semibold">
            {" "}
            {parseFloat(downPayment).toLocaleString("th-TH", {
              maximumFractionDigits: 2,
            })}{" "}
            บาท
          </span>
        </p>

        <p className="mb-2">
          วงเงินสินเชื่อ:
          <span className="font-semibold">
            {" "}
            {parseFloat(loanAmount).toLocaleString("th-TH", {
              maximumFractionDigits: 2,
            })}{" "}
            บาท
          </span>
        </p>

        <p className="mb-2">
          ระยะเวลา:
          <span className="font-semibold"> {loanMonths} เดือน</span>
        </p>

        <p className="mb-2">
          อัตราดอกเบี้ย:
          <span className="font-semibold"> {interestRate}%</span>
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded mb-4 border-2 border-blue-300">
        <p className="mb-2 text-lg">
          ค่าผ่อนรายเดือน:
          <span className="font-bold text-blue-600">
            {" "}
            {parseFloat(monthlyPayment).toLocaleString("th-TH", {
              maximumFractionDigits: 2,
            })}{" "}
            บาท
          </span>
        </p>

        <p className="mb-2">
          จำนวนดอกเบี้ยรวม:
          <span className="font-semibold">
            {" "}
            {parseFloat(totalInterest).toLocaleString("th-TH", {
              maximumFractionDigits: 2,
            })}{" "}
            บาท
          </span>
        </p>

        <p className="mb-2">
          จำนวนเงินที่ต้องจ่ายรวม:
          <span className="font-semibold">
            {" "}
            {parseFloat(totalPayment).toLocaleString("th-TH", {
              maximumFractionDigits: 2,
            })}{" "}
            บาท
          </span>
        </p>
      </div>

      <Link
        href="/carinstallment"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 block text-center"
      >
        กลับไปคำนวณ
      </Link>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <ResultCarContent />
    </Suspense>
  );
}