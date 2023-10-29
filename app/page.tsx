"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [ayah, setAyah] = useState<any>(null);
  const [arabic, setArabic] = useState<any>(null);
  const reloadPage = () => {
    window.location.reload();
  }
  useEffect(() => {
    // Assuming your API endpoint for the random Ayah is '/api/getRandomAyah'
    fetch('/api/getRandomAyah')
      .then((response) => response.json())
      .then((data) => {
        setAyah(data);
      })
      .catch((error: Error) => {
        console.error('There was an error fetching the Ayah:', error);
      });
    fetch('/api/getAyahByAyahNumber?number=2')
      .then((response) => response.json())
      .then((data) => {
        setArabic(data);
      })
      .catch((error: Error) => {
        console.error('There was an error fetching the Ayah:', error);
      });
  }, []); // The empty dependency array ensures this useEffect runs once when the component mounts

  return (
    <div>
      {ayah ? <div>{ayah.text}</div> : <div>Loading...</div>}
      {arabic ? <div>{arabic.text}</div> : <div>Loading...</div>}
      <button onClick={reloadPage} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
    </div>
  );
}
