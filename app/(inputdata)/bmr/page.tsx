"use client";
import Image from "next/image";
import bmrImg from "@/assets/images/bmr.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { parse } from "path";

export default function Page() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmr, setBmr] = useState<number | null>(null);
  const [bmrResult, setBmrResult] = useState("");
  const router = useRouter();

  const handleCalClick = () => {
    if(weight === "" || height === "" || age === ""){
        Swal.fire({
          icon: "error",
          title: "ข้อผิดพลาด",
          text: "รุณากรอกข้อมูลให้ครบถ้วน"
        });
        return
    };

    let bmrValue = 0;
    if (gender === "male") {
      bmrValue = 66 + (13.7 * parseFloat(weight)) + (5 * parseFloat(height)) - (6.8 * parseFloat(age));
    } else{
        bmrValue = 655 + (9.6 * parseFloat(weight)) + (1.8 * parseFloat(height)) - (4.7 * parseFloat(age));
    }
    setBmr(bmrValue);
    router.push(`/resultbmr?gender=${gender}&weight=${weight}&height=${height}&age=${age}&bmr=${bmrValue}`);
  };

  const handleResetClick = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
  };

  return (
    <div
      className="w-1/2 border-gray-300 mx-auto shadow-xl shadow-gray-300
       p-10 rounded-b-lg"
    >
      <Image
        src={bmrImg}
        alt="BMR"
        width={100}
        height={100}
        className="mx-auto"
      />

      <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
        BMR Calculater
      </h1>
      <h3 className="text-xl text-center mt-2 text-gray-600">คำนวณค่า BMR</h3>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex gap-5 mx-auto w-full">
          <button
            onClick={() => setGender("male")}
            className={`w-full border rounded-b-md p-3 transition ${gender === "male" ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 border-gray-300"}`}
          >
            ชาย
          </button>
          <button
            onClick={() => setGender("female")}
            className={`w-full border rounded-b-md p-3 transition ${gender === "female" ? "bg-pink-500 text-white border-pink-500" : "bg-gray-100 border-gray-300"}`}
          >
            หญิง
          </button>
        </div>
        <label htmlFor="weight">น้ำหนัก (kg)</label>
        <input
          type="number"
          name="weight"
          id="weight"
          className="border border-gray-300 rounded px-3 py-2"
          value={weight}
          max="200"
          onChange={(e) => setWeight(e.target.value)}
        />

        <label htmlFor="height">ส่วนสูง (cm)</label>
        <input
          type="number"
          name="height"
          id="height"
          className="border border-gray-300 rounded px-3 py-2"
          value={height}
          max="300"
          onChange={(e) => setHeight(e.target.value)}
        />

        <label htmlFor="age">อายุ (ปี)</label>
        <input
          type="number"
          name="age"
          id="age"
          className="border border-gray-300 rounded px-3 py-2"
          value={age}
          max="150"
          onChange={(e) => setAge(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            className="bg-blue-700                       text-white p-3 rounded-md
            hover:bg-blue-500 transition flex-1"
            onClick={handleCalClick}
          >
            คำนวณ BMI
          </button>
          <button
            className="bg-red-700 text-white p-3 rounded-md
            hover:bg-red-500 transition flex-1"
            onClick={handleResetClick}
          >
            รีเซ็ต
          </button>
        </div>
        {bmr !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-lg font-semibold">
              ผลลัพธ์: {bmr} - {bmrResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
