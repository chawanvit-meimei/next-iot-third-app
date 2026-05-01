"use client";
import Image from "next/image";
import carImg from "@/assets/images/car.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const [carPrice, setCarPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("");
  const [loanMonths, setLoanMonths] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const router = useRouter();

  const handlePercentClick = (percent: number) => {
    const carPriceNum = parseFloat(carPrice);

    if (isNaN(carPriceNum) || carPriceNum <= 0) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: "กรุณาใส่ราคารถยนต์ก่อน",
        showCancelButton: false,
        timer: 1500,
      });
      return;
    }

    const calculatedDownPayment = (carPriceNum * percent) / 100;
    setDownPayment(calculatedDownPayment.toFixed(2));
    setDownPaymentPercent(percent.toString());
  };

  const handleCalClick = () => {
    const carPriceNum = parseFloat(carPrice);
    const downPaymentNum = parseFloat(downPayment);
    const loanMonthsNum = parseFloat(loanMonths);
    const interestRateNum = parseFloat(interestRate);

    if (
      isNaN(carPriceNum) ||
      isNaN(downPaymentNum) ||
      isNaN(loanMonthsNum) ||
      isNaN(interestRateNum) ||
      carPriceNum <= 0 ||
      downPaymentNum < 0 ||
      loanMonthsNum <= 0 ||
      interestRateNum < 0 ||
      downPaymentNum > carPriceNum ||
      loanMonthsNum > 360
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณาใส่ข้อมูลให้ถูกต้อง",
        text: "ราคารถ > 0, ดาวน์ payment ≤ ราคารถ, ระยะเวลา 1-360 เดือน, อัตราดอกเบี้ย ≥ 0",
        showCancelButton: false,
        timer: 2000,
      });
      return;
    }

    const loanAmount = carPriceNum - downPaymentNum;
    const monthlyRate = interestRateNum / 100 / 12;

    let monthlyPay = 0;
    if (monthlyRate === 0) {
      monthlyPay = loanAmount / loanMonthsNum;
    } else {
      monthlyPay =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanMonthsNum)) /
        (Math.pow(1 + monthlyRate, loanMonthsNum) - 1);
    }

    const roundedMonthlyPayment = parseFloat(monthlyPay.toFixed(2));
    const totalPayment = parseFloat((roundedMonthlyPayment * loanMonthsNum).toFixed(2));
    const totalInterest = parseFloat((totalPayment - loanAmount).toFixed(2));

    router.push(
      `/resultcarinstallment?carPrice=${carPriceNum}&downPayment=${downPaymentNum}&loanMonths=${loanMonthsNum}&interestRate=${interestRateNum}&monthlyPayment=${roundedMonthlyPayment}&totalPayment=${totalPayment}&totalInterest=${totalInterest}&loanAmount=${loanAmount}`
    );
  };

  const handleResetClick = () => {
    setCarPrice("");
    setDownPayment("");
    setDownPaymentPercent("");
    setLoanMonths("");
    setInterestRate("");
  };

  return (
    <div
      className="w-1/2 border-gray-300 mx-auto shadow-xl shadow-gray-300
       p-10 rounded-b-lg"
    >
      <Image
        src={carImg}
        alt="Car Installment"
        width={100}
        height={100}
        className="mx-auto"
      />
      <h1 className="text-2xl font-bold mb-4 text-center">
        คำนวณการผ่อนชำระรถยนต์
      </h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">ราคารถยนต์ (บาท)</label>
        <input
          type="number"
          value={carPrice}
          onChange={(e) => setCarPrice(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full"
          placeholder="เช่น 1000000"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">ดาวน์เพย์เมนต์ (บาท)</label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => {
            setDownPayment(e.target.value);
            setDownPaymentPercent("");
          }}
          className="border-2 border-gray-300 p-2 rounded w-full"
          placeholder="เช่น 250000"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => handlePercentClick(10)}
            className="flex-1 bg-blue-400 text-white py-2 px-3 rounded hover:bg-blue-500 text-sm"
          >
            10%
          </button>
          <button
            onClick={() => handlePercentClick(20)}
            className="flex-1 bg-blue-400 text-white py-2 px-3 rounded hover:bg-blue-500 text-sm"
          >
            20%
          </button>
          <button
            onClick={() => handlePercentClick(30)}
            className="flex-1 bg-blue-400 text-white py-2 px-3 rounded hover:bg-blue-500 text-sm"
          >
            30%
          </button>
          <button
            onClick={() => handlePercentClick(50)}
            className="flex-1 bg-blue-400 text-white py-2 px-3 rounded hover:bg-blue-500 text-sm"
          >
            50%
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">ระยะเวลาการผ่อน (เดือน)</label>
        <input
          type="number"
          value={loanMonths}
          onChange={(e) => setLoanMonths(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full"
          placeholder="เช่น 60"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">อัตราดอกเบี้ย (%/ปี)</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full"
          placeholder="เช่น 5.5"
          step="0.01"
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleCalClick}
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
        >
          คำนวณ
        </button>
        <button
          onClick={handleResetClick}
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
        >
          ลบข้อมูล
        </button>
      </div>
    </div>
  );
}