
export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  rating: number;
  coverImage: string;
  interactive: boolean;
  category: 'fiction' | 'non-fiction' | 'personal-growth' | 'comedy' | 'drama';
}

const sampleStories: Story[] = [
  {
    id: 'story-1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library with infinite books, each telling the story of a life you could have lived.',
    duration: '8 hrs 40 mins',
    rating: 4.8,
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000',
    interactive: true,
    category: 'fiction'
  },
  {
    id: 'story-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Tiny changes, remarkable results. A guide to making small changes that yield big results.',
    duration: '5 hrs 35 mins',
    rating: 4.9,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000',
    interactive: false,
    category: 'personal-growth'
  },
  {
    id: 'story-3',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. How to better think about one of life\'s most important subjects.',
    duration: '5 hrs 48 mins',
    rating: 4.7,
    coverImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000',
    interactive: false,
    category: 'non-fiction'
  },
  {
    id: 'story-4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description: 'A lone astronaut must save Earth from disaster in this interstellar adventure.',
    duration: '16 hrs 10 mins',
    rating: 4.9,
    coverImage: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000',
    interactive: true,
    category: 'fiction'
  },
  {
    id: 'story-5',
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    description: 'Train your mind for peace and purpose every day with timeless wisdom from Jay Shetty.',
    duration: '10 hrs 54 mins',
    rating: 4.6,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000',
    interactive: true,
    category: 'personal-growth'
  },
  {
    id: 'story-6',
    title: 'Born a Crime',
    author: 'Trevor Noah',
    description: 'Stories from a South African Childhood - a compelling, inspiring, and comically sublime tale.',
    duration: '8 hrs 44 mins',
    rating: 4.8,
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000',
    interactive: false,
    category: 'comedy'
  }
];

class StoriesService {
  async getAllStories(): Promise<Story[]> {
    // In a real app, this would fetch from an API
    return Promise.resolve(sampleStories);
  }
  
  async getStoryById(id: string): Promise<Story | undefined> {
    // In a real app, this would fetch a specific story from an API
    return Promise.resolve(sampleStories.find(story => story.id === id));
  }
  
  async getInteractiveStories(): Promise<Story[]> {
    return Promise.resolve(sampleStories.filter(story => story.interactive));
  }
  
  async getStoriesByCategory(category: Story['category']): Promise<Story[]> {
    return Promise.resolve(sampleStories.filter(story => story.category === category));
  }
  
  async getRecommendedStories(): Promise<Story[]> {
    // In a real app, this would use user preferences
    return Promise.resolve(sampleStories.slice(0, 3));
  }
}

export default new StoriesService();
