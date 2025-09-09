"use client";
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

const createRobotIcon = (status: string) => {
  const color = status === "maintenance" ? "#ef4444" : "#10b981"; 
  const svgIcon = `
    <svg width="60" height="80" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Map Pin Shape -->
      <path d="M30 0C13.431 0 0 13.431 0 30C0 46.568 30 80 30 80S60 46.568 60 30C60 13.431 46.569 0 30 0Z" fill="${color}"/>
      
      <!-- White Circle Background -->
      <circle cx="30" cy="30" r="20" fill="white"/>
      
      <!-- Robot Body -->
      <g transform="translate(30, 30)">
        <!-- Main Robot Body -->
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#374151" stroke="#1f2937" stroke-width="1"/>
        
        <!-- Robot Head -->
        <circle cx="0" cy="-8" r="4" fill="#374151" stroke="#1f2937" stroke-width="1"/>
        
        <!-- Eyes -->
        <circle cx="-2" cy="-8" r="1.5" fill="white"/>
        <circle cx="2" cy="-8" r="1.5" fill="white"/>
        <circle cx="-2" cy="-8" r="0.8" fill="#1f2937"/>
        <circle cx="2" cy="-8" r="0.8" fill="#1f2937"/>
        
        <!-- Wheels -->
        <circle cx="-6" cy="4" r="3" fill="#1f2937" stroke="#374151" stroke-width="1"/>
        <circle cx="6" cy="4" r="3" fill="#1f2937" stroke="#374151" stroke-width="1"/>
        
        <!-- Wheel Details -->
        <circle cx="-6" cy="4" r="1.5" fill="#6b7280"/>
        <circle cx="6" cy="4" r="1.5" fill="#6b7280"/>
        
        <!-- Robot Arms -->
        <rect x="-12" y="-2" width="4" height="2" rx="1" fill="#374151"/>
        <rect x="8" y="-2" width="4" height="2" rx="1" fill="#374151"/>
        
        <!-- Status Indicator -->
        <circle cx="6" cy="-6" r="2" fill="${status === 'maintenance' ? '#fbbf24' : '#10b981'}"/>
        ${status === 'maintenance' ?
      '<path d="M5 -6.5 L7 -5.5 M7 -6.5 L5 -5.5" stroke="white" stroke-width="0.8" stroke-linecap="round"/>' :
      '<path d="M5.5 -6.5 L6 -5.5 L7.5 -7" stroke="white" stroke-width="0.8" stroke-linecap="round" fill="none"/>'
    }
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`;
};


const createCenterIcon = () => {
  const svgIcon = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Background Circle -->
      <circle cx="25" cy="25" r="25" fill="#10b981"/>
      <circle cx="25" cy="25" r="20" fill="white"/>
      
      <!-- Radio Tower -->
      <g transform="translate(25, 25)">
        <!-- Tower Base -->
        <rect x="-2" y="5" width="4" height="8" fill="#374151"/>
        
        <!-- Tower Mast -->
        <rect x="-1" y="-10" width="2" height="15" fill="#374151"/>
        
        <!-- Radio Waves -->
        <circle cx="0" cy="-5" r="3" fill="none" stroke="#374151" stroke-width="1.5"/>
        <circle cx="0" cy="-5" r="6" fill="none" stroke="#374151" stroke-width="1"/>
        <circle cx="0" cy="-5" r="9" fill="none" stroke="#374151" stroke-width="0.5"/>
        
        <!-- Antenna -->
        <circle cx="0" cy="-10" r="1.5" fill="#374151"/>
        <rect x="-0.5" y="-12" width="1" height="2" fill="#374151"/>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`;
};

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!, // <-- add !
  });

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="flex absolute">
      <div className="flex h-screen w-screen text-white">
      
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
                  anchor: new window.google.maps.Point(30, 80), // Pin point at bottom
                }}
                title={`Robot ${robot.id} - ${robot.status}`}
                animation={robot.status === "in_fleet" ? window.google.maps.Animation.BOUNCE : undefined}
              />
            ))}
          </GoogleMap>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex p-8 flex-col gap-6 absolute max-h-screen overflow-y-auto hide-scrollbar">
        {/* Logo */}
        <div className="flex justify-start p-4">
          <Image
            src={Logo}
            alt="App Logo"
            width={150}
            height={60}
            className="object-contain"
          />
        </div>

        <div className="px-4 w-full min-h-screen text-white space-y-6">
          <BaseStation />
          {/* System Info */}
          <SystemInfo />
          <div className="bg-gray-800 rounded-2xl p-4  mx-auto shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2">
              <h1 className="text-lg font-semibold">Compute & Storage Metrics</h1>
              <button className="flex  hover:bg-gray-700 rounded-lg transition-colors">
                <div className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </div>
              </button>
            </div>
            <StorageInfo />
            <div className="flex items-center justify-between px-4 py-2">
              <h1 className="text-lg font-semibold">Compute & Storage Metrics</h1>
              <button className="flex  hover:bg-gray-700 rounded-lg transition-colors">
                <div className="text-gray-500">
                  <svg fill="gray" className="w-6 h-6 " version="1.1" id="Capa_1" xmlns="http://www.w3.org/1999/xlink"
                    viewBox="0 0 483.12 483.12" >
                    <g>
                      <g>
                        <path d="M2.728,366.416c6.8,4.9,21.5-1.2,37.2-15.5c28.1-25.7,56.6-51.4,83.4-78.6c41.4-41.9,81.7-84.9,122.4-127.4
			c67,79.4,145.5,150,217.8,225.4c3.4,3.6,11.4,6.6,14.9,6.6c6.9,0,5.3-7.4,0.9-16.3c-14.7-29.3-38.2-59.1-64.4-87.1
			c-51-54.3-101.2-109.2-154.5-161.7l-0.2-0.2l0,0c-7.4-7.3-19.3-7.2-26.6,0.2c-12.6,12.8-25.2,25.8-37.5,39
			c-8.4,7.9-16.8,15.7-25.1,23.6c-52.7,50.4-104.6,101.6-153,155.8C4.128,345.716-4.772,361.116,2.728,366.416z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </button>
            </div>
            <div className="max-w-96 ">
              <BucketInfo />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* Internet Explorer and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
}