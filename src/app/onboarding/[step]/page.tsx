"use client"
import React, { useEffect } from 'react'
import { Steps } from '../steps'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const validSteps = ['grade', 'study', 'topics', 'reason', "success"];

export default function Page({ params }: { params: { step: string } }) {
  const router = useRouter();
  useEffect(() => {
    if (!validSteps.includes(params.step)) {
      router.push('/onboarding');
    }
  }, [params.step, router]);
  const renderStepMessage = (step: string) => {
    switch (step) {
      case 'grade':
        return 'Which grade are you in?';
      case 'study':
        return 'What do you wish to study?';
      case 'topics':
        return 'Which topics are you interested in?';
      case 'reason':
        return 'What did you choose HackMath?';
      case 'success':
        return 'Great Onboarding Complete!';
      default:
        return '';
    }
  };
  return (
    <div className='h-[80vh] flex items-center justify-center'>
      {params.step === 'success' ? (
        <div className='text-center items-center flex flex-col'>
          <span className='font-black text-3xl mb-5'>{renderStepMessage(params.step)}</span>

          <Image src="/images/success.svg" height={100} width={100} alt="Success" className="mr-2 pb-6" />
          <Button size="lg" variant="primary">
            <Link href="/learn">Start Learning!</Link>
          </Button>
        </div>
      ) : (
        <div className='w-full'>
          <div className='mx-auto flex justify-center pt-16'>
            <span className='font-black text-3xl'>{renderStepMessage(params.step)}</span>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center h-[70vh] gap-4'>
            <Steps step={params.step} />
          </div>
        </div>
      )}
    </div>
  )
}