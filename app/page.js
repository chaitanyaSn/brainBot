'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, BookOpen, Brain, BrainCircuit, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  // Redirect to dashboard if signed in
  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const userToken = await window.Clerk?.session?.getToken();
        if (userToken) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    redirectToDashboard();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">

           <BrainCircuit size={30} className='text-blue-600'/>
            <h2 className='font-bold text-2xl'>Brain Bot</h2>

        </div>
        
        <div className="flex items-center gap-4">
          <SignedOut>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Features</Button>
            <SignInButton mode="modal">
              <Button>Get Started</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton  />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Smarter with <span className="text-blue-500">AI-Powered</span> Education
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your learning experience with personalized AI-generated study materials, 
              notes, and practice questions.
            </p>
            <div>
              <SignedIn>
                <Link href={'/dashboard'}><Button className ="animate-bounce" variant="outline">Go to dashboard</Button></Link>
              </SignedIn>
            </div>
            
          </div>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Generated Content</h3>
              <p className="text-gray-600">
                Get personalized study materials tailored to your learning style and pace.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Notes</h3>
              <p className="text-gray-600">
                Automatically generate comprehensive notes from your course materials.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Laptop className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with dynamic content and practice questions to reinforce your understanding.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>© 2024 EduAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}