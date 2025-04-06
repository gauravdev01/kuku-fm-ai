
import React from 'react';
import Header from '@/components/Header';
import StoryCard from '@/components/StoryCard';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from '../lib/toast';

const Home = () => {
  const navigate = useNavigate();

  const featuredStories = [
    {
      id: 'story-1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      description: 'Between life and death there is a library with infinite books, each telling the story of a life you could have lived.',
      duration: '8 hrs 40 mins',
      rating: 4.8,
      coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000',
      interactive: true
    },
    {
      id: 'story-2',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Tiny changes, remarkable results. A guide to making small changes that yield big results.',
      duration: '5 hrs 35 mins',
      rating: 4.9,
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000',
      interactive: false
    },
    {
      id: 'story-3',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      description: 'A lone astronaut must save Earth from disaster in this interstellar adventure.',
      duration: '16 hrs 10 mins',
      rating: 4.9,
      coverImage: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000',
      interactive: true
    }
  ];

  const handleCreateVoice = () => {
    navigate('/voice-clone');
  };

  const handleExploreStories = () => {
    navigate('/stories');
  };

  const handleTryDemo = () => {
    toast.info('Demo feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kuku-purple via-kuku-purple-dark to-kuku-blue text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Listening Experience with AI Voice Clone
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Create your own AI voice to narrate stories or experience interactive storytelling like never before on Kuku FM
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleCreateVoice}
                className="bg-white text-kuku-purple hover:bg-kuku-purple-light hover:text-white"
              >
                <Mic className="mr-2 h-5 w-5" />
                Create Your Voice
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleExploreStories}
                className="border-white text-white hover:bg-white hover:text-kuku-purple"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-kuku-purple-light flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Voice Clone</h3>
            <p className="text-gray-600">Record your voice for just a few minutes and our AI will create a perfect digital twin of your voice.</p>
          </Card>
          
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-kuku-blue-light flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Select Any Story</h3>
            <p className="text-gray-600">Browse our extensive library of stories, books, and podcasts to listen in your own voice.</p>
          </Card>
          
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-kuku-purple flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Storytelling</h3>
            <p className="text-gray-600">Experience stories where your choices matter with interactive storytelling voiced by your AI clone.</p>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={handleTryDemo}
            className="bg-kuku-purple hover:bg-kuku-purple-dark"
          >
            Try Demo Story Now
          </Button>
        </div>
      </section>
      
      {/* Featured Stories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Stories</h2>
          <p className="text-center text-gray-600 mb-8">Perfect for your new AI voice</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard 
                key={story.id}
                title={story.title}
                author={story.author}
                description={story.description}
                duration={story.duration}
                rating={story.rating}
                coverImage={story.coverImage}
                interactive={story.interactive}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={handleExploreStories} 
              className="border-kuku-purple text-kuku-purple hover:bg-kuku-purple hover:text-white"
            >
              View All Stories
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Kuku FM AI Audio Boost</h2>
            <p className="mb-6">Transform your listening experience with the power of AI</p>
            <p className="text-sm opacity-75">© 2025 Kuku FM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
