import { NextResponse } from "next/server";
import axios from 'axios';
import { NextApiRequest } from "next";

export async function GET(req : NextApiRequest) {
  try {
    if (req.url != undefined) {
      const urlString = req.url;
      const url = new URL(urlString);
      const params = new URLSearchParams(url.search);
      const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${params.get("number")}`);

      if (response.status !== 200) {
        return NextResponse.json({ message: "Failed to fetch the verse." }, { status: response.status });
      }

      return NextResponse.json(response.data.data, { status: 200 });
    }
    return NextResponse.json({ message: "Failed to fetch the verse." }, { status: 500 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Failed to fetch the verse." }, { status: 500 });
  }
}