import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  
  interface EvaluationResult {
    question: string
    sourceAnswer: string
    generatedAnswer: string
    relevanceScore: number
    contextualScore: number
    semanticScore: number
    overallScore: number
  }
  
  interface ResultsTableProps {
    results: EvaluationResult[]
  }
  
  export function ResultsTable({ results }: ResultsTableProps) {
    const getScoreColor = (score: number) => {
      if (score >= 0.9) return 'bg-green-500/20 text-green-500'
      if (score >= 0.7) return 'bg-yellow-500/20 text-yellow-500'
      return 'bg-red-500/20 text-red-500'
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Source Answer</TableHead>
                  <TableHead>Generated Answer</TableHead>
                  <TableHead className="text-right">Relevance</TableHead>
                  <TableHead className="text-right">Contextual</TableHead>
                  <TableHead className="text-right">Semantic</TableHead>
                  <TableHead className="text-right">Overall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {result.question}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {result.sourceAnswer}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {result.generatedAnswer}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className={getScoreColor(result.relevanceScore)}>
                        {(result.relevanceScore * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className={getScoreColor(result.contextualScore)}>
                        {(result.contextualScore * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className={getScoreColor(result.semanticScore)}>
                        {(result.semanticScore * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className={getScoreColor(result.overallScore)}>
                        {(result.overallScore * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }