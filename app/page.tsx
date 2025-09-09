"use client";
import { useState } from "react";
import { useLoadScript, GoogleMap, Marker, Circle } from "@react-google-maps/api";
import Image from "next/image";
import Logo from "@/data/logo1.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import StorageInfo from "@/components/Content";
import BucketInfo from "@/components/DataCard";
import BaseStation from "@/components/BaseStation";
import SystemInfo from "@/components/SystemInfo";

const center = { lat: 9.9252, lng: 78.1198 };

const robots = [
  { id: 1, lat: 9.926, lng: 78.118, status: "maintenance" },
  { id: 2, lat: 9.928, lng: 78.122, status: "in_fleet" },
  { id: 3, lat: 9.924, lng: 78.120, status: "maintenance" },
];

// 🟢 Robot icon SVG
const createRobotIcon = (status: string) => {
  const color = status === "maintenance" ? "#ef4444" : "#10b981";
  const svgIcon = `
    <svg width="60" height="80" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0C13.431 0 0 13.431 0 30C0 46.568 30 80 30 80S60 46.568 60 30C60 13.431 46.569 0 30 0Z" fill="${color}"/>
      <circle cx="30" cy="30" r="20" fill="white"/>
      <g transform="translate(30, 30)">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#374151" stroke="#1f2937" stroke-width="1"/>
        <circle cx="0" cy="-8" r="4" fill="#374151" stroke="#1f2937" stroke-width="1"/>
        <circle cx="-2" cy="-8" r="1.5" fill="white"/>
        <circle cx="2" cy="-8" r="1.5" fill="white"/>
        <circle cx="-2" cy="-8" r="0.8" fill="#1f2937"/>
        <circle cx="2" cy="-8" r="0.8" fill="#1f2937"/>
        <circle cx="-6" cy="4" r="3" fill="#1f2937" stroke="#374151" stroke-width="1"/>
        <circle cx="6" cy="4" r="3" fill="#1f2937" stroke="#374151" stroke-width="1"/>
        <circle cx="-6" cy="4" r="1.5" fill="#6b7280"/>
        <circle cx="6" cy="4" r="1.5" fill="#6b7280"/>
        <rect x="-12" y="-2" width="4" height="2" rx="1" fill="#374151"/>
        <rect x="8" y="-2" width="4" height="2" rx="1" fill="#374151"/>
        <circle cx="6" cy="-6" r="2" fill="${status === "maintenance" ? "#fbbf24" : "#10b981"}"/>
        ${
          status === "maintenance"
            ? '<path d="M5 -6.5 L7 -5.5 M7 -6.5 L5 -5.5" stroke="white" stroke-width="0.8" stroke-linecap="round"/>'
            : '<path d="M5.5 -6.5 L6 -5.5 L7.5 -7" stroke="white" stroke-width="0.8" stroke-linecap="round" fill="none"/>'
        }
      </g>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`;
};

// 🟢 Center icon SVG
const createCenterIcon = () => {
  const svgIcon = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="25" fill="#10b981"/>
      <circle cx="25" cy="25" r="20" fill="white"/>
      <g transform="translate(25, 25)">
        <rect x="-2" y="5" width="4" height="8" fill="#374151"/>
        <rect x="-1" y="-10" width="2" height="15" fill="#374151"/>
        <circle cx="0" cy="-5" r="3" fill="none" stroke="#374151" stroke-width="1.5"/>
        <circle cx="0" cy="-5" r="6" fill="none" stroke="#374151" stroke-width="1"/>
        <circle cx="0" cy="-5" r="9" fill="none" stroke="#374151" stroke-width="0.5"/>
        <circle cx="0" cy="-10" r="1.5" fill="#374151"/>
        <rect x="-0.5" y="-12" width="1" height="2" fill="#374151"/>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`;
};

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar - Desktop (Left) */}
     <div className="hidden md:flex flex-col absolute left-0 px-2 top-0 items-start h-full max-h-screen overflow-y-auto hide-scrollbar shadow-xl z-20 w-[450px]">
  {/* Logo */}
  <div className="flex justify-start py-6 border-b border-gray-700 w-full">
    <Image src={Logo} alt="App Logo" width={140} height={50} />
  </div>

  {/* Content */}
  <div className="flex flex-col text-white flex-1  py-6 space-y-6 ">
    <BaseStation />
    <SystemInfo />

    <div className="bg-gray-800 rounded-2xl p-4 shadow-md w-full">
      <h2 className="text-lg font-semibold mb-3">Storage Info</h2>
      <StorageInfo />
    </div>

    <div className="bg-gray-800 rounded-2xl p-4 shadow-md w-full">
      <h2 className="text-lg font-semibold mb-3">Bucket Info</h2>
      <BucketInfo />
    </div>
  </div>
</div>


      {/* Map */}
      <div className="flex-1 relative">
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="w-full h-full"
          options={{
            styles: [
              { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
            ],
            disableDefaultUI: true,
          }}
        >
          <Circle
            center={center}
            radius={500}
            options={{
              strokeColor: "#10b981",
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: "#10b981",
              fillOpacity: 0.1,
            }}
          />
          <Marker
            position={center}
            icon={{
              url: createCenterIcon(),
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 25),
            }}
            title="Base Station"
          />
          {robots.map((robot) => (
            <Marker
              key={robot.id}
              position={{ lat: robot.lat, lng: robot.lng }}
              icon={{
                url: createRobotIcon(robot.status),
                scaledSize: new window.google.maps.Size(60, 80),
                anchor: new window.google.maps.Point(30, 80),
              }}
              title={`Robot ${robot.id} - ${robot.status}`}
              animation={
                robot.status === "in_fleet"
                  ? window.google.maps.Animation.BOUNCE
                  : undefined
              }
            />
          ))}
        </GoogleMap>
      </div>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex ">
          <div className="bg-gray-900 w-fit p-6 overflow-y-auto hide-scrollbar flex flex-col space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Image src={Logo} alt="App Logo" width={120} height={45} />
              <button
                className="text-white text-2xl"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Menu Items */}
            <BaseStation />
            <SystemInfo />

            <div className="bg-gray-800 rounded-2xl p-4 shadow-md w-full">
              <h2 className="text-lg font-semibold mb-3">Storage Info</h2>
              <StorageInfo />
            </div>

            <div className="bg-gray-800 rounded-2xl p-4 shadow-md w-full">
              <h2 className="text-lg font-semibold mb-3">Bucket Info</h2>
              <BucketInfo />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg text-white"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
