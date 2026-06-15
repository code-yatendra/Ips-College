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

interface ResultsPageProps {
  rollNo: string;
  semester: string;
  studentName: string;
  results: Result[];
  onBack: () => void;
  onHome: () => void;
  loading?: boolean;
  error?: string | null;
}

const ResultsPageAC = ({
  rollNo,
  semester,
  studentName,
  results,
  onBack,
  onHome,
  loading = false,
  error = null,
}: ResultsPageProps) => {
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-rose-600 to-pink-600 py-4 px-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-white hover:text-rose-200 transition-colors font-medium"
          >
            ← Back
          </button>
          <div className="text-center">
            <h2 className="text-white font-heading font-semibold text-lg">
              Results Portal - Section A-C
            </h2>
            <p className="text-rose-200 text-xs">Names starting with A, B, C</p>
          </div>
          <button
            onClick={onHome}
            className="text-white hover:text-rose-200 transition-colors font-medium"
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
            <div className="bg-white dark:bg-rose-900/50 rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-rose-200 dark:bg-rose-800 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-rose-200 dark:bg-rose-800 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-rose-200 dark:bg-rose-800 rounded w-2/3 mx-auto"></div>
              </div>
              <p className="text-rose-600 dark:text-rose-300 mt-4">Loading results...</p>
            </div>
          ) : error ? (
            <div className="bg-white dark:bg-rose-900/50 rounded-2xl shadow-xl p-8 text-center">
              <div className="text-destructive text-6xl mb-4">⚠</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Error Loading Results
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={onBack} className="bg-rose-600 hover:bg-rose-700 text-white">
                Try Again
              </Button>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white dark:bg-rose-900/50 rounded-2xl shadow-xl p-8 text-center">
              <div className="text-rose-400 text-6xl mb-4">📋</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                No Results Found
              </h3>
              <p className="text-muted-foreground mb-6">
                No results found for Roll No: {rollNo} in Semester {semester}
              </p>
              <Button onClick={onBack} className="bg-rose-600 hover:bg-rose-700 text-white">
                Search Again
              </Button>
            </div>
          ) : (
            <>
              {/* Section Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mb-4"
              >
                <span className="bg-rose-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  SECTION A - C
                </span>
              </motion.div>

              {/* Student Info Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-rose-900/50 rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-rose-500"
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
                  <div className="bg-rose-100 dark:bg-rose-800/50 rounded-xl px-6 py-3 text-center">
                    <p className="text-sm text-rose-600 dark:text-rose-300">Semester</p>
                    <p className="text-3xl font-bold text-rose-700 dark:text-rose-200">{semester}</p>
                  </div>
                </div>
              </motion.div>

              {/* Results Table */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white dark:bg-rose-900/50 rounded-2xl shadow-xl overflow-hidden mb-6"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-rose-100 dark:bg-rose-800/50">
                      <TableHead className="font-semibold text-rose-800 dark:text-rose-200">Subject</TableHead>
                      <TableHead className="text-center font-semibold text-rose-800 dark:text-rose-200">Marks Obtained</TableHead>
                      <TableHead className="text-center font-semibold text-rose-800 dark:text-rose-200">Max Marks</TableHead>
                      <TableHead className="text-center font-semibold text-rose-800 dark:text-rose-200">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <motion.tr
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        className="border-b border-rose-100 dark:border-rose-800"
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
                className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-rose-200 text-sm">Total Marks</p>
                    <p className="text-3xl font-bold">
                      {totalMarks} / {maxTotalMarks}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-rose-200 text-sm">Percentage</p>
                    <p className="text-3xl font-bold">{percentage}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-rose-200 text-sm">Overall Grade</p>
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
                <Button variant="outline" onClick={onBack} className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  Search Another
                </Button>
                <Button onClick={() => window.print()} className="bg-rose-600 hover:bg-rose-700 text-white">
                  Print Results
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-rose-600 dark:text-rose-300 border-t border-rose-200 dark:border-rose-800">
        © 2024 IPS Group of Colleges - Section A-C Results
      </footer>
    </div>
  );
};

export default ResultsPageAC;
