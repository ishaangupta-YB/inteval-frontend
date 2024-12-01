import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { FileUpload } from "./components/file-upload";
import { ResultsTable } from "./components/results-table";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkPreview } from "./components/ui/link-preview";

interface EvaluationResult {
  question: string;
  sourceAnswer: string;
  generatedAnswer: string;
  relevanceScore: number;
  contextualScore: number;
  semanticScore: number;
  overallScore: number;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<EvaluationResult[]>([]);

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setTimeout(() => {
      const mockResults: EvaluationResult[] = [
        {
          question: "What is machine learning?",
          sourceAnswer:
            "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
          generatedAnswer:
            "Machine learning is an AI approach that allows computers to learn and enhance their performance through experience, without explicit programming.",
          relevanceScore: 0.92,
          contextualScore: 0.88,
          semanticScore: 0.9,
          overallScore: 0.9,
        },
        {
          question: "Explain neural networks.",
          sourceAnswer:
            "Neural networks are computing systems inspired by biological neural networks in human brains. They consist of interconnected nodes that process and transmit signals.",
          generatedAnswer:
            "Neural networks are computer systems modeled after the human brain's neural structure, featuring connected nodes that process information and learn patterns.",
          relevanceScore: 0.95,
          contextualScore: 0.89,
          semanticScore: 0.93,
          overallScore: 0.92,
        },
        {
          question: "What is deep learning?",
          sourceAnswer:
            "Deep learning is a subset of machine learning that uses multiple layers of neural networks to process complex patterns in data.",
          generatedAnswer:
            "Deep learning is an advanced form of machine learning utilizing layered neural networks to analyze and learn from complex data patterns.",
          relevanceScore: 0.88,
          contextualScore: 0.85,
          semanticScore: 0.87,
          overallScore: 0.87,
        },
        {
          question: "Define supervised learning.",
          sourceAnswer:
            "Supervised learning is a type of machine learning where the model learns from labeled training data to make predictions or classifications.",
          generatedAnswer:
            "Supervised learning involves training AI models using labeled datasets to enable them to make accurate predictions and classifications.",
          relevanceScore: 0.91,
          contextualScore: 0.86,
          semanticScore: 0.89,
          overallScore: 0.89,
        },
      ];

      setResults(mockResults);
      setIsProcessing(false);
      clearInterval(interval);
    }, 5000);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background p-8 flex flex-col">
        <div className="container mx-auto space-y-8 flex-grow">
          <div className="flex justify-between items-center">
            <a className="text-4xl font-bold" href="/">IntEval</a>
            <ModeToggle />
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <FileUpload
                  onFileSelect={setFile}
                  accept=".json"
                  className="flex-1"
                />
                <Button
                  onClick={handleProcess}
                  disabled={!file || isProcessing}
                >
                  Process Evaluation
                </Button>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </CardContent>
          </Card>

          {results.length > 0 && <ResultsTable results={results} />}
        </div>

        <footer className="mt-auto pt-8">
          <div className="container mx-auto">
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
              © 2024 IntEval. All rights reserved. Created by{" "}
                <LinkPreview
                  url="https://www.linkedin.com/in/ishaangupta1201"
                  className="font-medium text-primary hover:underline inline-flex items-center"
                >
                  ishaangupta1201
                </LinkPreview>{" "} 
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
