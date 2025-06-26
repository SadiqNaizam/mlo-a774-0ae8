import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { MessageCircle } from 'lucide-react';

const AuthenticationPage = () => {
  console.log('AuthenticationPage loaded');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to send the OTP.
    // For this mock, we'll just simulate success.
    if (phone.length >= 10) {
      console.log(`Requesting OTP for phone number: ${phone}`);
      setIsOtpSent(true);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the OTP with a backend service.
    // For this mock, any 6-digit OTP is considered valid.
    if (otp.length === 6) {
      console.log(`Verifying OTP: ${otp}`);
      console.log('Login successful! Navigating to chat list.');
      // Navigate to the chat list page upon successful verification.
      navigate('/chat-list');
    } else {
        alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold">WhatsApp Lite</h1>
      </div>
      
      {!isOtpSent ? (
        <Card className="w-full max-w-sm">
          <form onSubmit={handleGetOtp}>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>Enter your phone number to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="e.g., +1 123 456 7890" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Get OTP</Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <form onSubmit={handleVerifyOtp}>
            <CardHeader>
              <CardTitle>Enter OTP</CardTitle>
              <CardDescription>We've sent a 6-digit code to {phone}.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">Verify & Login</Button>
              <Button variant="link" size="sm" onClick={() => setIsOtpSent(false)}>
                Change phone number
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AuthenticationPage;