"use client";
import Image from "next/image";
import bmiImg from "@/assets/images/bmi.png";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiResult, setBmiResult] = useState("");

    const router = useRouter();

    const handleCalClick = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (isNaN(weightNum) || isNaN(heightNum) || heightNum <= 0 || weightNum <= 0) {
            alert("กรุณาใส่น้ำหนักและส่วนสูงให้ถูกต้อง");
            return;
        }
        const heightM = heightNum / 100;
        const calculatedBmi = weightNum / (heightM * heightM);
        const roundedBmi = parseFloat(calculatedBmi.toFixed(2));
        setBmi(roundedBmi);

        let result = "";
        if (roundedBmi < 18.5) {
            result = "น้ำหนักต่ำกว่าเกณฑ์";
        } else if (roundedBmi < 24.9) {
            result = "น้ำหนักปกติ";
        } else if (roundedBmi < 29.9) {
            result = "น้ำหนักเกิน";
        } else {
            result = "โรคอ้วน";
        }
        setBmiResult(result);

        const params = new URLSearchParams({
            wei: String(weightNum),
            hei: String(heightNum),
            bmi: String(roundedBmi),
            result,
        });

        router.push('/bmi/result?' + params.toString());
    };

    const handleResetClick = () => {
        setWeight("");
        setHeight("");
        setBmi(null);
        setBmiResult("");
    }

    return (
       <div className="w-1/2 border-gray-300 mx-auto shadow-xl shadow-gray-300
       p-10 rounded-b-lg">
        <Image src={bmiImg} alt="BMI"
        width={100} height={100}
        className="mx-auto"/>

        <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
        BMI Calculater
       </h1>
       <h3 className="text-xl text-center mt-2 text-gray-600">
        คำนวณค่า BMI
       </h3>
       <div className="flex flex-col gap-4 mt-6">
            <label htmlFor="weight">น้ำหนัก (kg)</label>
            <input type="number" name="weight" id="weight"
            className="border border-gray-300 rounded px-3 py-2"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            />

            <label htmlFor="height">ส่วนสูง (cm)</label>
            <input type="number" name="height" id="height"
            className="border border-gray-300 rounded px-3 py-2"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            />
            <div className="flex gap-4">
            <button className="bg-blue-700 text-white p-3 rounded-md
            hover:bg-blue-500 transition flex-1"
            onClick={handleCalClick}>
                คำนวณ BMI
            </button>
            <button className="bg-red-700 text-white p-3 rounded-md
            hover:bg-red-500 transition flex-1"
            onClick={handleResetClick}>
                รีเซ็ต
            </button>
            </div>
            {bmi !== null && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <p className="text-lg font-semibold">ผลลัพธ์: {bmi} - {bmiResult}</p>
                </div>
            )}
       </div>

       </div>
    );
}