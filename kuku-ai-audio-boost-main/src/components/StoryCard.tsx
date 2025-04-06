
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Star } from "lucide-react";

interface StoryCardProps {
  title: string;
  author: string;
  description: string;
  duration: string;
  rating: number;
  coverImage: string;
  interactive?: boolean;
}

const StoryCard = ({
  title,
  author,
  description,
  duration,
  rating,
  coverImage,
  interactive = false
}: StoryCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {interactive && (
          <div className="absolute top-2 right-2 bg-kuku-blue text-white text-xs font-bold px-2 py-1 rounded">
            Interactive
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">By {author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2 text-gray-600">
          {description}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-xs">{duration}</span>
          </div>
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 mr-1 fill-amber-500" />
            <span className="text-xs">{rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-kuku-purple hover:bg-kuku-purple-dark">
          <Play className="h-4 w-4 mr-2" />
          Listen Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
