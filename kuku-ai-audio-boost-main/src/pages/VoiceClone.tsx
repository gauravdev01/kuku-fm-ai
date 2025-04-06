import React, { useState } from 'react';
import Header from '@/components/Header';
import VoiceRecorder from '@/components/VoiceRecorder';
import VoiceCloneSettings from '@/components/VoiceCloneSettings';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from '../lib/toast';
import voiceCloneService from '@/services/voiceCloneService';

const VoiceClone = () => {
  const [voiceName, setVoiceName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingCount, setRecordingCount] = useState(0);
  const [voiceId, setVoiceId] = useState<string | null>(null);
  
  const handleCreateVoiceClone = async () => {
    if (!voiceName.trim()) {
      toast.error('Please enter a name for your voice clone');
      return;
    }
    
    if (recordingCount === 0) {
      toast.error('Please record at least one voice sample');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, we would collect and send the actual recordings
      const sampleBlob = new Blob(['dummy-data'], { type: 'audio/wav' });
      
      const result = await voiceCloneService.createVoiceClone({
        name: voiceName,
        audioSamples: [sampleBlob]
      });
      
      setVoiceId(result.voiceId);
      toast.success('Voice clone created successfully!');
    } catch (error) {
      console.error('Error creating voice clone:', error);
      toast.error('Failed to create voice clone. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRecordingAdded = () => {
    setRecordingCount(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Your Voice Clone</h1>
        <p className="text-center text-gray-600 mb-8">
          Record your voice to create a digital twin that can narrate any content
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <Tabs defaultValue="record" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="record">Record Samples</TabsTrigger>
                <TabsTrigger value="settings">Voice Settings</TabsTrigger>
                <TabsTrigger value="create" disabled={recordingCount === 0}>Create Clone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="record" className="space-y-6">
                <p className="text-gray-700">
                  Please record yourself reading the following sentences clearly. The more samples you record, the better your voice clone will sound.
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Sample Text:</h3>
                  <p className="italic">
                    "The quick brown fox jumps over the lazy dog. I love listening to audiobooks and podcasts during my commute. The sunset painted the sky with vibrant hues of orange and purple."
                  </p>
                </div>
                
                <VoiceRecorder />
                
                <Button 
                  onClick={handleRecordingAdded} 
                  variant="outline"
                  className="w-full"
                >
                  Add This Recording
                </Button>
                
                {recordingCount > 0 && (
                  <p className="text-sm text-green-600">
                    {recordingCount} recording{recordingCount !== 1 ? 's' : ''} added
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="settings">
                <VoiceCloneSettings />
              </TabsContent>
              
              <TabsContent value="create" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="voice-name">Name Your Voice Clone</Label>
                    <Input 
                      id="voice-name" 
                      placeholder="e.g., My Narrator Voice" 
                      value={voiceName}
                      onChange={(e) => setVoiceName(e.target.value)}
                    />
                  </div>
                  
                  {voiceId ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Voice Clone Created!</h3>
                      <p className="text-green-700 mb-2">Your voice clone is ready to use across all Kuku FM content.</p>
                      <p className="text-sm text-gray-600">Voice ID: {voiceId}</p>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleCreateVoiceClone}
                      disabled={isProcessing}
                      className="w-full bg-kuku-purple hover:bg-kuku-purple-dark"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Processing...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Create My Voice Clone
                        </>
                      )}
                    </Button>
                  )}
                  
                  <p className="text-sm text-gray-500 text-center">
                    Voice cloning typically takes 2-3 minutes to process.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceClone;
