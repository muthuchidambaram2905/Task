import Image from "next/image"
import Icon1 from "@/data/Vector.png"

export default function BaseStation() {
    return <>
     
    <div className="bg-gray-700 rounded-2xl  max-w-md mx-auto shadow-2xl">
     
        <div className="flex items-center gap-3  px-6 py-2">
            <div className="w-5 h-5 flex items-center justify-center">
                <Image
            src={Icon1}
            alt="App Logo"
            width={150}
            height={60}
            className="object-contain"
          />
            </div>
            <h1 className="text-white text-lg font-semibold">Base station</h1>
        </div>

      
        <div className="bg-gray-800 rounded-b-xl px-6 py-2 mb-4">
            <div className="flex items-center gap-4">
              
                <div className="w-12 h-12 rounded-md bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-gray-300 text-lg"></i>
                </div>
                
              
                <div className="flex-1">
                    <h3 className="text-white font-medium text-lg mb-1">Basestation_v1_2</h3>
                    <p className="text-gray-400 text-sm">Uptime - 14 mins</p>
                </div>

            
                <div className="flex items-center gap-3">
                 
                    <div className="flex items-center border-gray-600 border-2 rounded-md p-1 gap-1">
                        <div className="w-6 h-3 border border-green-500 rounded-sm relative">
                            <div className="w-4/5 h-full bg-green-500 rounded-sm"></div>
                            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-1.5 bg-green-500 rounded-r-sm"></div>
                        </div>
                        <span className="text-white p-1 text-xs font-medium">80%</span>
                    </div>
                    
                
                    <div className="text-green-400  border-green-700 border-2 rounded-md px-1  ">
                        <i className="fas fa-wifi text-sm"></i>
                    </div>
                   
                    <div className=" border-gray-600 border-2 rounded-md px-0.5">
                      <i className="fa fa-info-circle"></i>
                    </div>
                </div>
            </div>
             <div className="flex gap-3 py-2">
            <button className="flex-1 text-sm border-gray-600 border-2 bg-opacity-20 bg-gray-600 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
            Base Station Info
            </button>
            <button className="flex-1 text-sm text-green-600 border-green-700 border-2 bg-opacity-20 bg-green-600 hover:bg-green-700  py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                Robot Compute
            </button>
        </div>
        </div>     
    </div>
</>

}