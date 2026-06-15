import { useState } from "react";
import WelcomePage from "@/components/WelcomePage";
import ResultSearchPage from "@/components/ResultSearchPage";
import ResultsPageAC from "@/components/ResultsPageAC";
import ResultsPageDF from "@/components/ResultsPageDF";
import ResultsPageGI from "@/components/ResultsPageGI";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Page = "welcome" | "search" | "results-ac" | "results-df" | "results-gi";

interface SearchData {
  rollNo: string;
  semester: string;
}

interface Result {
  id: string;
  subject_name: string;
  marks_obtained: number;
  max_marks: number;
  grade: string | null;
}

const getResultsPage = (studentName: string): "results-ac" | "results-df" | "results-gi" => {
  const firstLetter = studentName.charAt(0).toUpperCase();
  if (["A", "B", "C"].includes(firstLetter)) return "results-ac";
  if (["D", "E", "F"].includes(firstLetter)) return "results-df";
  return "results-gi";
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  const [searchData, setSearchData] = useState<SearchData>({ rollNo: "", semester: "" });
  const [results, setResults] = useState<Result[]>([]);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (rollNo: string, semester: string) => {
    setSearchData({ rollNo, semester });
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("student_results")
        .select("id, student_name, subject_name, marks_obtained, max_marks, grade")
        .eq("roll_number", rollNo)
        .eq("semester", parseInt(semester));

      if (fetchError) {
        throw fetchError;
      }

      if (data && data.length > 0) {
        const name = data[0].student_name;
        setStudentName(name);
        setResults(data);
        // Navigate to the appropriate page based on name's first letter
        setCurrentPage(getResultsPage(name));
        toast.success("Results loaded successfully!");
      } else {
        setResults([]);
        setStudentName("");
        setCurrentPage("results-ac"); // Default page for "no results" display
      }
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to fetch results. Please try again.");
      setCurrentPage("results-ac"); // Default page for error display
      toast.error("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const resultsProps = {
    rollNo: searchData.rollNo,
    semester: searchData.semester,
    studentName,
    results,
    onBack: () => setCurrentPage("search"),
    onHome: () => setCurrentPage("welcome"),
    loading,
    error,
  };

  return (
    <>
      {currentPage === "welcome" && (
        <WelcomePage onNext={() => setCurrentPage("search")} />
      )}
      {currentPage === "search" && (
        <ResultSearchPage
          onBack={() => setCurrentPage("welcome")}
          onSubmit={handleSubmit}
        />
      )}
      {currentPage === "results-ac" && <ResultsPageAC {...resultsProps} />}
      {currentPage === "results-df" && <ResultsPageDF {...resultsProps} />}
      {currentPage === "results-gi" && <ResultsPageGI {...resultsProps} />}
    </>
  );
};

export default Index;
