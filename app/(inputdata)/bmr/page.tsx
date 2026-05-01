"use client";

import Image from "next/image";
import bmrImg from "@/assets/images/bmr.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  const handleCalClick = () => {
    if (!weight || !height || !age || !gender) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);

    let bmr = 0;

    if (gender === "male") {
      bmr = 66 + 13.7 * weightNum + 5 * heightNum - 6.8 * ageNum;
    } else {
      bmr = 655 + 9.6 * weightNum + 1.8 * heightNum - 4.7 * ageNum;
    }

    router.push(
      `/resultbmr?gender=${gender}&weight=${weightNum}&height=${heightNum}&age=${ageNum}&bmr=${bmr.toFixed(2)}`
    );
  };

  const handleResetClick = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
  };

  return (
    <div className="w-1/2 mx-auto shadow-xl p-10 rounded-lg bg-white">
      <Image src={bmrImg} alt="BMR" width={100} height={100} className="mx-auto"/>

      <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
        BMR Calculator
      </h1>

      <div className="flex flex-col gap-4 mt-6">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">เลือกเพศ</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
        </select>

        <input
          type="number"
          placeholder="น้ำหนัก"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="ส่วนสูง"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="อายุ"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex gap-4">
          <button
            onClick={handleCalClick}
            className="bg-blue-500 text-white p-3 rounded flex-1"
          >
            คำนวณ BMR
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