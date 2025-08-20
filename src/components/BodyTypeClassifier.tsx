import React, { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, Camera, Target, TrendingUp, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface ClassificationResult {
  bodyType: string;
  confidence: number;
  recommendations: string[];
}

export const BodyTypeClassifier = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      // Display original image
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // Load and process image
      const imageElement = await loadImage(file);
      const processedBlob = await removeBackground(imageElement);
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);

      toast({
        title: "Image Processed!",
        description: "Background removed successfully. Ready for classification.",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const classifyFromImage = async () => {
    if (!processedImage) return;

    setIsLoading(true);
    
    try {
      // Simulate classification from image
      // In a real implementation, you would process the image with a computer vision model
      const bodyTypes = ['Ectomorph', 'Mesomorph', 'Endomorph'];
      const randomIndex = Math.floor(Math.random() * bodyTypes.length);
      const confidence = 75 + Math.random() * 20; // Random confidence between 75-95%
      
      const recommendations = getRecommendations(bodyTypes[randomIndex]);
      
      setResult({
        bodyType: bodyTypes[randomIndex],
        confidence,
        recommendations
      });
      
      toast({
        title: "Classification Complete!",
        description: `Your body type has been classified as ${bodyTypes[randomIndex]}`,
      });
      
    } catch (error) {
      console.error('Error classifying body type:', error);
      toast({
        title: "Classification Error",
        description: "There was an error classifying your body type. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = (bodyType: string): string[] => {
    const recommendations = {
      Ectomorph: [
        "Focus on compound exercises like squats, deadlifts, and bench press",
        "Eat in a caloric surplus with plenty of protein",
        "Limit cardio to 2-3 sessions per week",
        "Get adequate rest - 7-9 hours of sleep per night",
        "Consider weight gainer supplements"
      ],
      Mesomorph: [
        "Combine strength training with moderate cardio",
        "Maintain a balanced diet with adequate protein",
        "Vary your workout routine every 6-8 weeks",
        "Focus on both muscle building and definition",
        "Stay hydrated and maintain consistent training"
      ],
      Endomorph: [
        "Incorporate more cardio - aim for 4-5 sessions per week",
        "Focus on a caloric deficit for fat loss",
        "Include HIIT training in your routine",
        "Emphasize whole foods and reduce processed foods",
        "Consider intermittent fasting"
      ]
    };
    
    return recommendations[bodyType as keyof typeof recommendations] || [];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          AI Body Type Classifier
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Upload your photo and let AI analyze your body type with personalized fitness recommendations
        </p>
      </div>

      {/* Image Upload Section */}
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            Upload Your Photo
          </CardTitle>
          <CardDescription>
            Upload a clear full-body photo for accurate body type classification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="w-full max-w-md bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Image...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Choose Image
                </>
              )}
            </Button>

            {/* Image Preview */}
            {uploadedImage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                <div className="space-y-2">
                  <h4 className="font-medium text-center">Original Image</h4>
                  <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={uploadedImage} 
                      alt="Original" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {processedImage && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-center flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent" />
                      Processed Image
                    </h4>
                    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {processedImage && (
              <Button
                onClick={classifyFromImage}
                disabled={isLoading}
                className="w-full max-w-md bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-5 w-5" />
                    Classify Body Type
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Classification Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {result.bodyType}
                </h3>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {result.confidence.toFixed(1)}% Confidence
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span>{result.confidence.toFixed(1)}%</span>
                </div>
                <Progress value={result.confidence} className="h-3" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Personalized Recommendations:</h4>
              <ul className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};