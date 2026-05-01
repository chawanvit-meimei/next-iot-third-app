"use client";

import Image from "next/image";
import carImg from "@/assets/images/car.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const [carPrice, setCarPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanMonths, setLoanMonths] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const router = useRouter();

  const handleCalClick = () => {
    if (!carPrice || !downPayment || !loanMonths || !interestRate) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return;
    }

    const car = parseFloat(carPrice);
    const down = parseFloat(downPayment);
    const month = parseFloat(loanMonths);
    const rate = parseFloat(interestRate);

    const loanAmount = car - down;
    const monthlyRate = rate / 100 / 12;

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, month)) /
      (Math.pow(1 + monthlyRate, month) - 1);

    const totalPayment = monthlyPayment * month;
    const totalInterest = totalPayment - loanAmount;

    router.push(
      `/resultcarinstallment?carPrice=${car}&downPayment=${down}&loanMonths=${month}&interestRate=${rate}&monthlyPayment=${monthlyPayment.toFixed(
        2
      )}&totalPayment=${totalPayment.toFixed(
        2
      )}&totalInterest=${totalInterest.toFixed(
        2
      )}&loanAmount=${loanAmount}`
    );
  };

  return (
    <div className="w-1/2 mx-auto shadow-xl p-10 rounded-lg bg-white">
      <Image src={carImg} alt="Car" width={100} height={100} className="mx-auto"/>

      <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
        Car Installment
      </h1>

      <div className="flex flex-col gap-4 mt-6">
        <input
          type="number"
          placeholder="ราคารถ"
          value={carPrice}
          onChange={(e) => setCarPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="เงินดาวน์"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="จำนวนเดือน"
          value={loanMonths}
          onChange={(e) => setLoanMonths(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="ดอกเบี้ย"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleCalClick}
          className="bg-blue-500 text-white p-3 rounded"
        >
          คำนวณ
        </button>
      </div>
    </div>
  );
}