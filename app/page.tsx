'use client';
import { useState } from 'react';

export default function Home() {
  const [product, setProduct] = useState('');
  const [feedback, setFeedback] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (useFeedback = false) => {
    setIsLoading(true);
    const prompt = `Create an engaging ad image for ${product}`;
    const feedbackText = useFeedback ? feedback : '';

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, feedback: feedbackText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setImageUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-cyan-400">
      <header className="w-full p-4 bg-white bg-opacity-10 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">AdMorph</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Transform Your Ads with AI</h2>
          <p className="text-xl text-blue-100 mb-8">
            Enter your product description and let AdMorph create stunning AI-generated ads for you.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter your product description"
              className="flex-grow mr-2 bg-white bg-opacity-20 text-white placeholder-blue-200 p-2 rounded"
            />
            <button 
              onClick={() => generateImage(false)} 
              disabled={isLoading}
              className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded"
            >
              {isLoading ? 'Generating...' : 'Generate Ad'}
            </button>
          </div>
        </section>

        <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-4">Generated Ad</h3>
          {imageUrl ? (
            <div className="w-full flex justify-center">
              <img src={imageUrl} alt="Generated Ad" className="rounded-lg" />
            </div>
          ) : (
            <p className="text-blue-100">Enter a product description and generate an ad!</p>
          )}
        </section>

        {imageUrl && (
          <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 max-w-4xl mx-auto mt-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Improve Your Ad</h3>
            <p className="text-blue-100 mb-4">
              Not happy with the generated ad? Enter feedback and refine it!
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="E.g., 'Make it less colorful'"
                className="flex-grow mr-2 bg-white bg-opacity-20 text-white placeholder-blue-200 p-2 rounded"
              />
              <button 
                onClick={() => generateImage(true)} 
                disabled={isLoading}
                className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded"
              >
                {isLoading ? 'Regenerating...' : 'Regenerate Ad'}
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="w-full p-4 bg-white bg-opacity-10 backdrop-blur-md mt-8">
        <div className="container mx-auto text-center text-blue-100">
          <p>&copy; 2025 AdMorph. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
