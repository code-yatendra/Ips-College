-- Create student_results table
CREATE TABLE public.student_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  roll_number TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester >= 1 AND semester <= 6),
  student_name TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  marks_obtained INTEGER NOT NULL,
  max_marks INTEGER NOT NULL DEFAULT 100,
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (students can view results)
CREATE POLICY "Anyone can view results" 
ON public.student_results 
FOR SELECT 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_student_results_roll_semester ON public.student_results(roll_number, semester);