import bmiImg from "@/assets/images/bmi.png";
import bmrImg from "@/assets/images/bmr.png";
import carImg from "@/assets/images/car.png";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex gap-10 justify-center">
        {/*go to BMI*/}
        <div>
          <Image
            src={bmiImg}
            alt="BMI Illustration"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
            BMI Calculater
          </h1>
          <h3 className="text-xl text-center mt-2 text-gray-600">
            คำณวนค่า BMI
          </h3>
          <Link
            href="/bmi"
            className="block w-50 mx-auto mt-6
   bg-blue-500 text-white text-center py-2 px-4 rounded"
          >
            go to BMI Input data
          </Link>
        </div>

        {/*go to BMR*/}
        <div>
          <Image
            src={bmrImg}
            alt="BMR Illustration"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
            BMR Calculater
          </h1>
          <h3 className="text-xl text-center mt-2 text-gray-600">
            คำณวนค่า BMR
          </h3>
          <Link
            href="/bmr"
            className="block w-50 mx-auto mt-6
   bg-blue-500 text-white text-center py-2 px-4 rounded"
          >
            go to BMR Input data
          </Link>
        </div>

        {/*go to CAR Installment*/}
        <div>
          <Image
            src={carImg}
            alt="Car Installment Illustration"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="text-center text-3xl font-bold mt-4 text-blue-600">
            Car Installment
          </h1>
          <h3 className="text-xl text-center mt-2 text-gray-600">
            คำนวณค่างวดรถยนต์
          </h3>
          <Link
            href="/carinstallment"
            className="block w-50 mx-auto mt-6
   bg-blue-500 text-white text-center py-2 px-4 rounded"
          >
            go to Car Installment
          </Link>
        </div>
      </div>
    </>
  );
}
