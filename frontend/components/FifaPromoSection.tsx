"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export default function FifaPromoSection() {
  return (
    <section className="relative w-full py-20 bg-black overflow-hidden border-t border-white/5">
      {/* Background Watermark/Texture */}
      <div className="absolute inset-0 bg-[#020617] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
              FIFA+ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Stream.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Free.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Live.</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Stream live matches, relive iconic FIFA World Cup moments and enjoy world class documentaries. All for free.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link href="https://www.plus.fifa.com" target="_blank" className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  Watch on FIFA+ <Play size={16} className="fill-black" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
              
              {/* Large Feature Image - Spans 2 cols */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
                 {/* 
                    PLACEHOLDER: Insert your preferred image URL here.
                    Suggested: A high-quality action shot of a star player (e.g., Messi, Mbappe).
                 */}
                 <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center text-gray-500 font-bold">
                    IMAGE 1 (Large)
                 </div>
                 <Image 
                   src="https://wallpapercave.com/wp/wp5425876.jpg" 
                   alt="FIFA+ Feature" 
                   fill 
                   className="object-cover transition-transform duration-500 group-hover:scale-110" 
                 />
                
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Small Image 1 */}
              <div className="relative rounded-2xl overflow-hidden group">
                 {/* 
                    PLACEHOLDER: Insert your preferred image URL here.
                    Suggested: A close-up portrait or emotion shot.
                 */}
                 <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center text-gray-400 text-xs font-bold text-center p-2">
                    IMAGE 2
                 </div>
                 
                 <Image 
                   src="https://wallpapercave.com/wp/wp12892649.jpg" 
                   alt="Feature 2" 
                   fill 
                   className="object-cover transition-transform duration-500 group-hover:scale-110" 
                 />
                
              </div>

              {/* Small Image 2 (Archive Text Style) */}
              <div className="relative rounded-2xl overflow-hidden bg-green-500 group flex flex-col justify-center items-center p-4">
                 {/* 
                    PLACEHOLDER: This block is styled with text as per design, but you can replace with an image.
                 */}
                 <h3 className="font-black text-2xl md:text-3xl text-black/20 uppercase leading-none tracking-tighter">
                   Archive
                 </h3>
                 <h3 className="font-black text-2xl md:text-3xl text-black uppercase leading-none tracking-tighter">
                   Archive
                 </h3>
                 <h3 className="font-black text-2xl md:text-3xl text-black/20 uppercase leading-none tracking-tighter">
                   Archive
                 </h3>
              </div>


              {/* Small Image 3 */}
              <div className="relative rounded-2xl overflow-hidden group">
                  {/* 
                    PLACEHOLDER: Insert your preferred image URL here.
                    Suggested: Graphic pattern or another player shot.
                 */}
                 <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center text-gray-500 text-xs font-bold text-center p-2">
                    IMAGE 3
                 </div>
                 
                 <Image 
                   src="https://www.sportico.com/wp-content/uploads/2023/05/press-release-2.jpg?w=1040&h=585&crop=1" 
                   alt="Feature 3" 
                   fill 
                   className="object-cover transition-transform duration-500 group-hover:scale-110" 
                 />
                
              </div>

               {/* Portrait Image - Spans 2 rows vertically on right */}
               <div className="row-span-2 relative rounded-2xl overflow-hidden group">
                 {/* 
                    PLACEHOLDER: Insert your preferred image URL here.
                    Suggested: A vertical portrait (e.g., Mbappe, Putellas).
                 */}
                 <div className="absolute inset-0 bg-gray-600 animate-pulse flex items-center justify-center text-gray-300 font-bold">
                    IMAGE 4 (Vertical)
                 </div>
                 
                 <Image 
                   src="https://wallpapercave.com/wp/wp2544922.jpg" 
                   alt="Feature 4" 
                   fill 
                   className="object-cover transition-transform duration-500 group-hover:scale-110" 
                 />
                
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
