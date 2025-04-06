
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from '../lib/toast';

const VoiceCloneSettings = () => {
  const [pitch, setPitch] = useState(50);
  const [stability, setStability] = useState(70);
  const [clarity, setClarity] = useState(80);
  const [enhanceMode, setEnhanceMode] = useState(true);
  
  const handleSaveSettings = () => {
    toast.success("Voice settings saved successfully!");
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voice Clone Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="pitch">Pitch Adjustment</Label>
              <span className="text-sm text-gray-500">{pitch}%</span>
            </div>
            <Slider 
              id="pitch"
              min={0} 
              max={100} 
              step={1} 
              defaultValue={[pitch]}
              onValueChange={(value) => setPitch(value[0])} 
              className="cursor-pointer"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="stability">Stability</Label>
              <span className="text-sm text-gray-500">{stability}%</span>
            </div>
            <Slider 
              id="stability"
              min={0} 
              max={100} 
              step={1} 
              defaultValue={[stability]}
              onValueChange={(value) => setStability(value[0])} 
              className="cursor-pointer"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="clarity">Clarity & Precision</Label>
              <span className="text-sm text-gray-500">{clarity}%</span>
            </div>
            <Slider 
              id="clarity"
              min={0} 
              max={100} 
              step={1} 
              defaultValue={[clarity]}
              onValueChange={(value) => setClarity(value[0])} 
              className="cursor-pointer"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enhance-mode" className="text-base">AI Enhancement Mode</Label>
              <p className="text-sm text-gray-500">Applies advanced processing to improve voice quality</p>
            </div>
            <Switch 
              id="enhance-mode" 
              checked={enhanceMode} 
              onCheckedChange={setEnhanceMode} 
            />
          </div>
          
          <Button 
            onClick={handleSaveSettings}
            className="w-full bg-kuku-purple hover:bg-kuku-purple-dark"
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCloneSettings;
