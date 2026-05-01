"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const wei = params?.get("wei") ?? "";
  const hei = params?.get("hei") ?? "";
  const bmi = params?.get("bmi") ?? "";
  const result = params?.get("result") ?? "";

  if (!wei || !hei || !bmi || !result) {
    return (
      <div className="w-1/2 border-gray-300 mx-auto shadow-xl p-10 rounded-b-lg text-center">
        <p className="mb-4">ไม่พบข้อมูลผลลัพธ์</p>
        <Link href="/bmi" className="bg-blue-500 text-white py-2 px-4 rounded">
          กลับไปคำนวณ
        </Link>
      </div>
    );
  }

  return (
    <div className="w-1/2 border-gray-300 mx-auto shadow-xl p-10 rounded-b-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">ผลลัพธ์ BMI</h1>
      <p className="mb-2">น้ำหนัก: {wei} kg</p>
      <p className="mb-2">ส่วนสูง: {hei} cm</p>
      <p className="mb-2">BMI: <span className="font-semibold">{bmi}</span></p>
      <p className="mb-4">สถานะ: <span className="font-semibold">{result}</span></p>
      <Link href="/bmi" className="bg-blue-500 text-white py-2 px-4 rounded">
        กลับไปคำนวณ
      </Link>
    </div>
  );
}