'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div 
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: `url(/assets/bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-[#1E1F20] text-white w-full md:w-md max-w-lg p-8 rounded-lg shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/assets/logo.png"
              alt="Bravera Bank" 
              width={288}
              height={80}
              className="h-12"
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Bravera Banking</h1>
          
          <p className="text-center mb-8">
            Access your accounts securely or verify your information to continue.
          </p>

          <div className="flex flex-col space-y-4">
            <Link href="/login" className="bg-[#F2AA2E] text-[#1E1F20] px-6 py-3 rounded-md text-center font-medium hover:bg-[#e0a02a] transition-colors">
              Login to Your Account
            </Link>
            
            <Link href="/verification" className="bg-[#3B3836] text-white px-6 py-3 rounded-md text-center font-medium hover:bg-[#4e4c4b] transition-colors">
              Verify Your Information
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Need help? Contact our support team at</p>
            <a href="mailto:support@bravera-bank.com" className="text-[#F2AA2E] hover:underline">
              support@bravera-bank.com
            </a>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#1E1F20] text-white py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image 
              src="/assets/logo.png" 
              alt="Bravera Bank" 
              width={150} 
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Bravera Bank. All rights reserved.</p>
            <p>
              <a href="#" className="text-gray-400 hover:text-[#F2AA2E] mr-4">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#F2AA2E]">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}