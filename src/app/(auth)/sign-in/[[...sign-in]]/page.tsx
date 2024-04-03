import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div className="flex min-h-[98vh] lg:grid lg:grid-cols-2">
            <div className="hidden lg:block">
        <Image
          alt="Image"
          className="h-full w-full object-cover bg-background"
          height="1080"
          src="/images/placeholder.svg"
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width="1920"
        />
      </div>
      <div className="flex items-center justify-center w-full lg:min-h-screen">
        <SignIn />
      </div>
    </div>
  )
}

export default Page