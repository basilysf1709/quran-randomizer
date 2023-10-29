import { NextResponse } from "next/server";
import axios from 'axios';
import { SURAH_AYAH_COUNTS } from "@/util/api-constants";


// Function to generate a random surah and ayah reference
function getRandomReference() {
  const surah = Math.floor(Math.random() * 114) + 1; // Random surah between 1 and 114
  const ayah = Math.floor(Math.random() * SURAH_AYAH_COUNTS[surah - 1]) + 1; // Random ayah for that surah

  return `${surah}:${ayah}`;
}
export async function GET() {
  try {
    const reference = getRandomReference();
    const response = await axios.get(`http://api.alquran.cloud/v1/ayah/${reference}/en.sahih`);

    if (response.status !== 200) {
      return NextResponse.json({ message: "Failed to fetch the verse." }, { status: response.status });
    }

    return NextResponse.json(response.data.data, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Failed to fetch the verse." }, { status: 500 });
  }
}

