"use client";

import Image from "next/image";
import bmiImg from "@/assets/images/bmi.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const router = useRouter();

  const handleCalClick = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (
      isNaN(weightNum) ||
      isNaN(heightNum) ||
      weightNum <= 0 ||
      heightNum <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ถูกต้อง",
      });
      return;
    }

    const heightM = heightNum / 100;
    const bmi = weightNum / (heightM * heightM);
    const roundedBmi = parseFloat(bmi.toFixed(2));

    let result = "";

    if (roundedBmi < 18.5) result = "น้ำหนักต่ำกว่าเกณฑ์";
    else if (roundedBmi < 24.9) result = "น้ำหนักปกติ";
    else if (roundedBmi < 29.9) result = "น้ำหนักเกิน";
    else result = "โรคอ้วน";

    const params = new URLSearchParams({
      wei: String(weightNum),
      hei: String(heightNum),
      bmi: String(roundedBmi),
      result,
    });

    router.push("/resultbmi?" + params.toString());
  };

  const handleResetClick = () => {
    setWeight("");
    setHeight("");
  };

  return (
    <div className="w-1/2 mx-auto shadow-xl p-10 rounded-lg bg-white">
      <Image src={bmiImg} alt="BMI" width={100} height={100} className="mx-auto"/>

      <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
        BMI Calculator
      </h1>

      <div className="flex flex-col gap-4 mt-6">
        <input
          type="number"
          placeholder="น้ำหนัก (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="ส่วนสูง (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex gap-4">
          <button
            onClick={handleCalClick}
            className="bg-blue-500 text-white p-3 rounded flex-1"
          >
            คำนวณ BMI
          </button>

          <button
            onClick={handleResetClick}
            className="bg-red-500 text-white p-3 rounded flex-1"
          >
            รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
}