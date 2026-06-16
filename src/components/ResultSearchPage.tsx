import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ResultSearchPageProps {
  onBack: () => void;
  onSubmit: (rollNo: string, semester: string) => void;
}

const ResultSearchPage = ({ onBack, onSubmit }: ResultSearchPageProps) => {
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState("");

  const handleRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    // Only allow alphanumeric characters and limit to 12
    const filtered = value.replace(/[^A-Z0-9]/g, "").slice(0, 12);
    setRollNo(filtered);
    setError("");
  };

  const validateRollNo = (value: string): boolean => {
    // Pattern: 0928CS23XXXX - exactly 12 alphanumeric characters
    const pattern = /^[0-9]{4}[A-Z]{2}[0-9]{2}[A-Z0-9]{4}$/;
    return pattern.test(value) && value.length === 12;
  };

  const handleSubmit = () => {
    if (!rollNo) {
      setError("Please enter your roll number");
      return;
    }
    if (rollNo.length !== 12) {
      setError("Roll number must be exactly 12 characters");
      return;
    }
    if (!validateRollNo(rollNo)) {
      setError("Invalid roll number format (e.g., 0928CS231001)");
      return;
    }
    if (!semester) {
      toast.error("Please select a semester");
      return;
    }
    onSubmit(rollNo, semester);
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
            Student Result Portal
          </h2>
          <div className="w-16" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          {/* RGPV Logo Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl card-shadow p-8 mb-8"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-muted rounded-full  mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src="https://image-static.collegedunia.com/public/college_data/images/logos/1747909661Screenshot20250522at3.53.05PM.png?h=71.7&w=71.7&mode=stretch"
                  alt="RGPV Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground text-center">
                Rajiv Gandhi Proudyogiki Vishwavidyalaya
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                State Technological University of Madhya Pradesh
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Roll Number Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Student Roll Number
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 0928CS231001"
                  value={rollNo}
                  onChange={handleRollNoChange}
                  className={`h-12 text-center text-lg font-mono tracking-wider uppercase ${
                    error ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  maxLength={12}
                />
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs ${
                      error ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {error || "Format: 0928CS23XXXX (12 characters)"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {rollNo.length}/12
                  </span>
                </div>
              </div>

              {/* Semester Select */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Semester
                </label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    {[1, 2, 3, 4, 5, 6].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                variant="hero"
                size="xl"
                className="w-full mt-4"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </motion.div>

          {/* Info Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-sm text-muted-foreground"
          >
            Enter your 12-digit enrollment number to view your results
          </motion.p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border">
        © 2024 IPS Group of Colleges. All rights reserved.
      </footer>
    </div>
  );
};

export default ResultSearchPage;
