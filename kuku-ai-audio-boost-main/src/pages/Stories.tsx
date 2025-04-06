
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StoryCard from '@/components/StoryCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import storiesService, { Story } from '@/services/storiesService';

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const allStories = await storiesService.getAllStories();
        setStories(allStories);
        setFilteredStories(allStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStories();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStories(stories);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredStories(
        stories.filter(
          story => 
            story.title.toLowerCase().includes(query) || 
            story.author.toLowerCase().includes(query) ||
            story.description.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, stories]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filterByCategory = async (category: Story['category'] | 'all' | 'interactive') => {
    setLoading(true);
    try {
      let filteredStories: Story[];
      
      if (category === 'all') {
        filteredStories = await storiesService.getAllStories();
      } else if (category === 'interactive') {
        filteredStories = await storiesService.getInteractiveStories();
      } else {
        filteredStories = await storiesService.getStoriesByCategory(category);
      }
      
      setFilteredStories(filteredStories);
    } catch (error) {
      console.error('Error filtering stories:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Explore Stories</h1>
        <p className="text-center text-gray-600 mb-8">
          Find the perfect content for your AI voice clone
        </p>
        
        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search by title, author or keywords" 
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="all" onClick={() => filterByCategory('all')}>All</TabsTrigger>
            <TabsTrigger value="interactive" onClick={() => filterByCategory('interactive')}>Interactive</TabsTrigger>
            <TabsTrigger value="fiction" onClick={() => filterByCategory('fiction')}>Fiction</TabsTrigger>
            <TabsTrigger value="non-fiction" onClick={() => filterByCategory('non-fiction')}>Non-Fiction</TabsTrigger>
            <TabsTrigger value="personal-growth" onClick={() => filterByCategory('personal-growth')}>Personal Growth</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Stories Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-kuku-purple border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading stories...</p>
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No stories found matching your search.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                filterByCategory('all');
              }}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
