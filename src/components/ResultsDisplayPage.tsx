import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Result {
  id: string;
  subject_name: string;
  marks_obtained: number;
  max_marks: number;
  grade: string | null;
}

interface ResultsDisplayPageProps {
  rollNo: string;
  semester: string;
  studentName: string;
  results: Result[];
  onBack: () => void;
  onHome: () => void;
  loading?: boolean;
  error?: string | null;
}

const ResultsDisplayPage = ({
  rollNo,
  semester,
  studentName,
  results,
  onBack,
  onHome,
  loading = false,
  error = null,
}: ResultsDisplayPageProps) => {
  const totalMarks = results.reduce((sum, r) => sum + r.marks_obtained, 0);
  const maxTotalMarks = results.reduce((sum, r) => sum + r.max_marks, 0);
  const percentage = maxTotalMarks > 0 ? ((totalMarks / maxTotalMarks) * 100).toFixed(2) : "0.00";

  const getOverallGrade = (percent: number): string => {
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B+";
    if (percent >= 60) return "B";
    if (percent >= 50) return "C";
    if (percent >= 40) return "D";
    return "F";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-gradient py-4 px-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-primary-foreground hover:text-secondary transition-colors font-medium"
          >
            ← Back
          </button>
          <h2 className="text-primary-foreground font-heading font-semibold text-lg">
            Examination Results
          </h2>
          <button
            onClick={onHome}
            className="text-primary-foreground hover:text-secondary transition-colors font-medium"
          >
            Home
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          {loading ? (
            <div className="bg-card rounded-2xl card-shadow p-8 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
              </div>
              <p className="text-muted-foreground mt-4">Loading results...</p>
            </div>
          ) : error ? (
            <div className="bg-card rounded-2xl card-shadow p-8 text-center">
              <div className="text-destructive text-6xl mb-4">⚠</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Error Loading Results
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button variant="hero" onClick={onBack}>
                Try Again
              </Button>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-card rounded-2xl card-shadow p-8 text-center">
              <div className="text-muted-foreground text-6xl mb-4">📋</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                No Results Found
              </h3>
              <p className="text-muted-foreground mb-6">
                No results found for Roll No: {rollNo} in Semester {semester}
              </p>
              <Button variant="hero" onClick={onBack}>
                Search Again
              </Button>
            </div>
          ) : (
            <>
              {/* Student Info Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-2xl card-shadow p-6 mb-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground">
                      {studentName}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Roll No: <span className="font-mono font-semibold text-foreground">{rollNo}</span>
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-xl px-6 py-3 text-center">
                    <p className="text-sm text-muted-foreground">Semester</p>
                    <p className="text-3xl font-bold text-primary">{semester}</p>
                  </div>
                </div>
              </motion.div>

              {/* Results Table */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-card rounded-2xl card-shadow overflow-hidden mb-6"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Subject</TableHead>
                      <TableHead className="text-center font-semibold">Marks Obtained</TableHead>
                      <TableHead className="text-center font-semibold">Max Marks</TableHead>
                      <TableHead className="text-center font-semibold">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <motion.tr
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        className="border-b border-border"
                      >
                        <TableCell className="font-medium">{result.subject_name}</TableCell>
                        <TableCell className="text-center">{result.marks_obtained}</TableCell>
                        <TableCell className="text-center">{result.max_marks}</TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              result.grade === "A+" || result.grade === "A"
                                ? "bg-green-100 text-green-800"
                                : result.grade === "B+" || result.grade === "B"
                                ? "bg-blue-100 text-blue-800"
                                : result.grade === "C" || result.grade === "D"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {result.grade || "-"}
                          </span>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>

              {/* Summary Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-primary-foreground/80 text-sm">Total Marks</p>
                    <p className="text-3xl font-bold">
                      {totalMarks} / {maxTotalMarks}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-primary-foreground/80 text-sm">Percentage</p>
                    <p className="text-3xl font-bold">{percentage}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-primary-foreground/80 text-sm">Overall Grade</p>
                    <p className="text-4xl font-bold">{getOverallGrade(parseFloat(percentage))}</p>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 flex justify-center gap-4"
              >
                <Button variant="outline" onClick={onBack}>
                  Search Another
                </Button>
                <Button variant="hero" onClick={() => window.print()}>
                  Print Results
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 IPS Group of Colleges. All rights reserved.
      </footer>
    </div>
  );
};

export default ResultsDisplayPage;
