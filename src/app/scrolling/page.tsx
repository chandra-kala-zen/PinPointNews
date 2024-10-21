// components/ScrollableImageList.tsx
import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from "@/components/ui/card"; 

const images = [
  "/pol.png",
  "/rainy.png",
  "/thu.png",
  "/cricket.png",
  "/food.png",
  "/health.png",
  "/jew.png",
  "/mob.png",
];

const ScrollableImageList: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-screen  snap-y snap-mandatory scroll-smooth w-full ">
        {images.map((src, index) => (
          <Card key={index} className="h-screen snap-start flex flex-col justify-center items-center max-w-[500px] m-auto">
            <CardHeader>
              <h3 className="text-lg font-semibold text-center">{`Image ${index + 1}`}</h3>
            </CardHeader>
            <CardContent className="flex-col justify-center items-center">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className='text-[18px] rounded-lg  mt-[40px]' >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vel non quia mollitia facere facilis tempore earum quaerat nihil obcaecati? Tempore quos rerum eum minus aliquid nulla consectetur beatae qui.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScrollableImageList;
