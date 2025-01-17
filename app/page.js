import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-green-300">
      <div>logo</div>
      <SignedOut>
        <SignInButton mode="modal"></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
      
    </div>
  )
}
