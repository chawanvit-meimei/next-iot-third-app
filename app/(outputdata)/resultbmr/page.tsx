"use client";
import bmrImg from "@/assets/images/bmr.png";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const gender = params?.get("gender") ?? "";
  const weight = params?.get("weight") ?? "";
  const height = params?.get("height") ?? "";
  const age = params?.get("age") ?? "";
  const bmr = params?.get("bmr") ?? "";

  if (!gender || !weight || !height || !age || !bmr) {
    return (
      <div className="w-1/2 border-gray-300 mx-auto shadow-xl p-10 rounded-b-lg text-center">
        <p className="mb-4">ไม่พบข้อมูลผลลัพธ์</p>
        <Link href="/bmr" className="bg-blue-500 text-white py-2 px-4 rounded">
          กลับไปคำนวณ
        </Link>
      </div>
    );
  }

  return (
    <div className="w-1/2 border-gray-300 mx-auto shadow-xl p-10 rounded-b-lg">
      <Image
        src={bmrImg}
        alt="BMR"
        width={100}
        height={100}
        className="mx-auto"
      />
      <h1 className="text-2xl font-bold mb-4 text-center">ผลลัพธ์ BMR</h1>
      <p className="mb-2">เพศ: {gender === "male" ? "ชาย" : "หญิง"}</p>
      <p className="mb-2">น้ำหนัก: {weight} kg</p>
      <p className="mb-2">ส่วนสูง: {height} cm</p>
      <p className="mb-2">อายุ: {age} ปี</p>
      <p className="mb-4">
        BMR: <span className="font-semibold">{bmr}</span>
      </p>
      <Link href="/bmr" className="bg-blue-500 text-white py-2 px-4 rounded">
        กลับไปคำนวณ
      </Link>
    </div>
  );
}
