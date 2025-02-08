import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-cyan-400">
      <header className="w-full p-4 bg-white bg-opacity-10 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">AdMorph</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-blue-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-blue-200">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Transform Your Ads with AI</h2>
          <p className="text-xl text-blue-100 mb-8">
            Enter your product description and let AdMorph create stunning ads for you.
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Enter your product description"
              className="flex-grow mr-2 bg-white bg-opacity-20 text-white placeholder-blue-200"
            />
            <Button className="bg-blue-700 hover:bg-blue-600 text-white">Generate Ad</Button>
          </div>
        </section>

        <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-4">Featured Ad</h3>
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=720&width=1280" alt="Featured Ad" layout="fill" objectFit="cover" />
          </div>
          <p className="mt-4 text-blue-100">
            Experience the power of AI-generated ads with AdMorph. This featured ad showcases our cutting-edge
            technology in action.
          </p>
        </section>
      </main>

      <footer className="w-full p-4 bg-white bg-opacity-10 backdrop-blur-md mt-8">
        <div className="container mx-auto text-center text-blue-100">
          <p>&copy; 2025 AdMorph. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

