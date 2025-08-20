import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassificationResult {
  bodyType: string;
  confidence: number;
  recommendations: string[];
}

export const BodyTypeClassifier = () => {
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    wrist: '',
    age: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const { toast } = useToast();

  const classifyBodyType = async () => {
    setIsLoading(true);
    
    try {
      // Load the model
      const model = await tf.loadLayersModel('/models/bodytype_model.h5');
      
      // Prepare input data (normalize the measurements)
      const height = parseFloat(measurements.height) / 200; // Normalize height
      const weight = parseFloat(measurements.weight) / 100; // Normalize weight
      const chest = parseFloat(measurements.chest) / 120; // Normalize chest
      const waist = parseFloat(measurements.waist) / 100; // Normalize waist
      const wrist = parseFloat(measurements.wrist) / 25; // Normalize wrist
      const age = parseFloat(measurements.age) / 80; // Normalize age
      
      // Create tensor from input
      const inputTensor = tf.tensor2d([[height, weight, chest, waist, wrist, age]]);
      
      // Make prediction
      const prediction = model.predict(inputTensor) as tf.Tensor;
      const predictionData = await prediction.data();
      
      // Get the body type with highest probability
      const bodyTypes = ['Ectomorph', 'Mesomorph', 'Endomorph'];
      const maxIndex = predictionData.indexOf(Math.max(...Array.from(predictionData)));
      const confidence = predictionData[maxIndex] * 100;
      
      // Get recommendations based on body type
      const recommendations = getRecommendations(bodyTypes[maxIndex]);
      
      setResult({
        bodyType: bodyTypes[maxIndex],
        confidence,
        recommendations
      });
      
      // Cleanup tensors
      inputTensor.dispose();
      prediction.dispose();
      
      toast({
        title: "Classification Complete!",
        description: `Your body type has been classified as ${bodyTypes[maxIndex]}`,
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

  const handleInputChange = (field: string, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = Object.values(measurements).every(value => value.trim() !== '');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          AI Body Type Classifier
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter your measurements to discover your body type and get personalized fitness recommendations
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Body Measurements
          </CardTitle>
          <CardDescription>
            Please enter accurate measurements for the best classification results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={measurements.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={measurements.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chest">Chest (cm)</Label>
              <Input
                id="chest"
                type="number"
                placeholder="95"
                value={measurements.chest}
                onChange={(e) => handleInputChange('chest', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="waist">Waist (cm)</Label>
              <Input
                id="waist"
                type="number"
                placeholder="80"
                value={measurements.waist}
                onChange={(e) => handleInputChange('waist', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wrist">Wrist (cm)</Label>
              <Input
                id="wrist"
                type="number"
                placeholder="16"
                value={measurements.wrist}
                onChange={(e) => handleInputChange('wrist', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={measurements.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={classifyBodyType}
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Classifying...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Classify Body Type
              </>
            )}
          </Button>
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