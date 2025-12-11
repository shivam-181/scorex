"use client";
import Link from "next/link";
import Image from "next/image";

export default function NewsBanner() {
  return (
    <div className="w-full mt-12 relative rounded-2xl overflow-hidden h-[350px] md:h-[400px] flex group cursor-pointer group">
      
      {/* Background Image (Full width, but primarily visible on right) */}
      <div className="absolute inset-0 z-0">
         {/* 
            REPLACE THIS LINK: To change the image, simply replace the 'src' string below 
            with the URL of the image you want to use. 
            Ensure the domain of your new image is allowed in 'next.config.ts'.
         */}
         <Image 
            src="https://i.pinimg.com/1200x/a1/78/cc/a178cc8a85209480b6a287b3df7757e4.jpg" 
            alt="See all news"
            fill
            className="object-cover object-center md:object-[25%_0%] transition-transform duration-700 group-hover:scale-105"
         />
      </div>

      {/* Skewed Overlay Container */}
      {/* 
          We need a diagonal divider.
          We can do this with a large div that is skewed or uses a clip-path.
          Let's use a gradient approach for the sharp line and corner.
          Actually, a simple CSS pseudo-element or a div with clip-path polygon is best.
      */}
      
      {/* The Purple Overlay - covering left side and cutting diagonally */}
      <div 
        className="absolute inset-0 z-10 w-full md:w-[65%]"
        style={{
            background: 'linear-gradient(115deg, #270A25 65%, #270A25 85%, transparent 85.5%)'
        }}
      >
      </div>

      {/* The Grey Stripe - Creating the distinct border effect */}
      {/* Moving the gradient stop slightly to create the border line might be tricky to get perfect. 
          Use a separate element for the border line? 
          Or simpler: Linear gradient with hard stops: Purple -> Grey -> Transparent
      */}
      <div 
        className="absolute inset-0 z-10 w-full md:w-[70%]"
        style={{
            background: 'linear-gradient(115deg, #2A0927 60%, #5E5D75 60%, #5E5D75 61%, transparent 61.2%)'
        }}
      >
         {/* Content Container Inside the Overlay */}
         <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-lg">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                See all news
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-sm">
                Find all the latest news and interviews from across world football
            </p>
            
            <div>
                <Link 
                    href="/news" 
                    className="inline-block border border-white text-white px-8 py-2.5 rounded-full font-bold hover:bg-white hover:text-[#2A0927] transition-all duration-300"
                >
                    Discover
                </Link>
            </div>
         </div>
      </div>

    </div>
  );
}
