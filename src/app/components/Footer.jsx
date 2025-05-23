import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#121317] text-center text-sm text-gray-400 py-4">
        <div className="space-x-4 mb-1 flex flex-wrap justify-center items-center gap-2 px-4 text-center">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold">{process.env.NEXT_PUBLIC_BANK_NAME }</span> • (877) 483-6811 •
          </p>
          <a href={process.env.NEXT_PUBLIC_FORGET_PASSWORD_URL }className="text-[#36C3F1] hover:underline">Privacy Policy</a>
          <span className="">•</span>
          <p href="#" className="">Member FDIC</p>
          <span className="">•</span>
          <p href="#" className="">Equal Housing Lender</p>
        </div>
      </footer>
  )
}

export default Footer