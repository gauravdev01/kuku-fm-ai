import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Square, PlayCircle } from "lucide-react";
import AudioWaveform from './AudioWaveform';
import { toast } from '../lib/toast';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunksRef.current.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      });

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      toast.success('Recording completed!');
    }
  };

  const handlePlayRecording = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
      toast.info('Playing your recording');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Voice Sample Recording</h3>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full flex justify-center items-center h-16 bg-gray-50 rounded-lg">
          {isRecording ? (
            <div className="flex items-center gap-3">
              <AudioWaveform isActive={true} />
              <span className="text-red-500 font-medium">{formatTime(recordingTime)}</span>
            </div>
          ) : audioURL ? (
            <div className="flex items-center gap-3">
              <AudioWaveform />
              <span className="text-gray-600 font-medium">Recording saved</span>
            </div>
          ) : (
            <span className="text-gray-400">Ready to record</span>
          )}
        </div>
        
        <div className="flex gap-4">
          {!isRecording ? (
            <>
              <Button 
                onClick={handleStartRecording}
                className="bg-kuku-purple hover:bg-kuku-purple-dark"
              >
                <Mic className="mr-2 h-4 w-4" /> Start Recording
              </Button>
              {audioURL && (
                <Button 
                  variant="outline" 
                  onClick={handlePlayRecording}
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> Play
                </Button>
              )}
            </>
          ) : (
            <Button 
              variant="destructive" 
              onClick={handleStopRecording}
            >
              <Square className="mr-2 h-4 w-4" /> Stop Recording
            </Button>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          Please read the sample text aloud to create your voice clone.
          We recommend recording at least 3 minutes for best results.
        </p>
      </div>
    </div>
  );
};

export default VoiceRecorder;
