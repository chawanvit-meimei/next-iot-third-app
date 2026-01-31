import bmiImg from "@/assets/images/bmi.png";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
    <Image src={bmiImg} alt="BMI Illustration"
    width={100} height={100}
    className="mx-auto" />
    <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
    BMI Calculater
   </h1>
   <h3 className="text-xl text-center mt-2 text-gray-600">
    คำณวนค่า  BMI
   </h3>
   <Link href="/bmi" className='block w-50 mx-auto mt-6
   bg-blue-500 text-white text-center py-2 px-4 rounded'>
   go to BMI Input data
   </Link>
    </>
  );
}