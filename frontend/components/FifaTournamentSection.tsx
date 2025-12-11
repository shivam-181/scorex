"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FifaTournamentSection() {
  return (
    <section className="bg-[#F3F6FF] text-dark min-h-screen flex items-center py-12 md:py-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#050D24] leading-[1.1]">
              World’s best on show in FIFA’s tournaments
            </h2>
            
            <div className="flex flex-col gap-4 text-sm md:text-base text-[#050D24]/80 leading-relaxed font-medium">
                <p>
                    As well as showcasing the very best the beautiful game has to offer, FIFA’s tournaments drive the sport’s development.
                </p>
                <p>
                    The FIFA World Cup™ and FIFA Women’s World Cup™ offer a shot at global glory to the game’s top nations, while elite clubs come together to contest the FIFA Club World Cup.
                </p>
                <p>
                    The FIFA U-17 and U-20 World Cups and their female equivalents have a well-earned reputation for helping develop superstars-in-the-making, while the FIFA Futsal World Cup™ and FIFA Beach Soccer World Cup™ provide a platform for the crème de la crème of these thrilling disciplines.
                </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2">
             <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
                {/* 
                    Using a placeholder related to FIFA Tournaments / Players collage. 
                    Since I don't have the exact image URL from the user (only a screenshot of it),
                    I will use a substitute high-quality collage or players image from a reliable source
                    Or I can use the same specific collage if I can guess/find the URL, 
                    but likely a generic one is safer to start.
                    Lets use a generic football collage or stadium atmosphere.
                */}
                <Image 
                    src="https://digitalhub.fifa.com/transform/85a3d787-1200-44e8-bc89-b4833bd8e3a8/FIFAPLUS_BEST-ON-SHOW_Tournaments_00?&io=transform:fill,aspectratio:16x9,width:1366&quality=75"
                    alt="FIFA Tournaments Collage"
                    fill
                    className="object-cover transition-transform duration-900 hover:scale-110"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
