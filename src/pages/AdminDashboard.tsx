import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Result {
  id: string;
  roll_number: string;
  semester: number;
  student_name: string;
  subject_name: string;
  marks_obtained: number;
  max_marks: number;
  grade: string | null;
  created_at: string;
}

const emptyForm = {
  roll_number: "",
  semester: "1",
  student_name: "",
  max_marks: "100",

  subjects: [
    { subject_name: "Mathematics", marks_obtained: "", grade: "" },
    { subject_name: "Physics", marks_obtained: "", grade: "" },
    { subject_name: "Chemistry", marks_obtained: "", grade: "" },
    { subject_name: "English", marks_obtained: "", grade: "" },
    { subject_name: "Programming", marks_obtained: "", grade: "" },
  ],
};

const AdminDashboard = () => {
  const calculateGrade = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;

    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";

    return "F";
  };

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Result | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const groupedResults = results.reduce((acc: any[], item: any) => {
    const existing = acc.find((r) => r.roll_number === item.roll_number);

    if (existing) {
      existing.subjects.push({
        subject: item.subject_name,
        marks: item.marks_obtained,
        grade: item.grade,
      });
    } else {
      acc.push({
        id: item.id,
        roll_number: item.roll_number,
        student_name: item.student_name,
        semester: item.semester,
        subjects: [
          {
            subject: item.subject_name,
            marks: item.marks_obtained,
            grade: item.grade,
          },
        ],
      });
    }

    return acc;
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("student_results")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setResults(data as Result[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

const openEdit = (r: any) => {
  setEditing(r);

  setForm({
    roll_number: r.roll_number,
    semester: String(r.semester),
    student_name: r.student_name,
    max_marks: "100",

    subjects: r.subjects.map((s: any) => ({
      subject_name: s.subject,
      marks_obtained: String(s.marks),
      grade: s.grade ?? "",
    })),
  });

  setOpen(true);
};

  const handleSave = async () => {
   if (
  !form.roll_number ||
  !form.student_name
) {
  toast.error("Please fill in all required fields");
  return;
}
    setSaving(true);
    const payload = form.subjects.map((subject: any) => ({
      roll_number: form.roll_number.trim().toUpperCase(),
      semester: parseInt(form.semester, 10),
      student_name: form.student_name.trim(),
      subject_name: subject.subject_name,
      marks_obtained: parseInt(subject.marks_obtained, 10),
      max_marks: parseInt(form.max_marks, 10) || 100,
      grade: subject.grade || null,
    }));

    if (editing) {
  // pehle purane subjects delete karo
  await supabase
    .from("student_results")
    .delete()
    .eq("roll_number", editing.roll_number);

  // fir naye 5 subjects insert karo
  const { error } = await supabase
    .from("student_results")
    .insert(payload);

  if (error) {
    toast.error(error.message);
  } else {
    toast.success("Result updated");
    setOpen(false);
    load();
  }
}else {
      const { error } = await supabase.from("student_results").insert(payload);
      if (error) toast.error(error.message);
      else {
        toast.success("Result added");
        setOpen(false);
        load();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this result?")) return;
    const { error } = await supabase
      .from("student_results")
      .delete()
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-gradient py-4 px-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-primary-foreground font-heading font-semibold text-lg">
              Admin Dashboard
            </h2>
            <p className="text-primary-foreground/80 text-xs">{user?.email}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1.5" />
            Sign out
          </Button>
        </div>
      </motion.header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-card rounded-2xl card-shadow p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground">
                Student Results
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage all published results
              </p>
            </div>
            <Button variant="hero" onClick={openNew}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add Result
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No results yet. Click "Add Result" to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Sem</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedResults.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono">
                        {r.roll_number}
                      </TableCell>

                      <TableCell>{r.student_name}</TableCell>

                      <TableCell>{r.semester}</TableCell>

                      <TableCell>
                        {r.subjects.map((s: any, index: number) => (
                          <div key={index}>{s.subject}</div>
                        ))}
                      </TableCell>

                      <TableCell>
                        {r.subjects.map((s: any, index: number) => (
                          <div key={index}>{s.marks}</div>
                        ))}
                      </TableCell>

                      <TableCell>
                        {r.subjects.map((s: any, index: number) => (
                          <div key={index}>{s.grade || "—"}</div>
                        ))}
                      </TableCell>

                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(r)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(r.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Result" : "Add Result"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Roll Number *</label>
              <Input
                placeholder="0928CS231001"
                value={form.roll_number}
                onChange={(e) =>
                  setForm({ ...form, roll_number: e.target.value })
                }
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Student Name *</label>
              <Input
                value={form.student_name}
                onChange={(e) =>
                  setForm({ ...form, student_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Semester</label>
              <Select
                value={form.semester}
                onValueChange={(v) => setForm({ ...form, semester: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-3 block">
                  Subjects & Marks
                </label>

                <div className="space-y-4">
                  {form.subjects.map((subject, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3">
                      <Input value={subject.subject_name} disabled />

                      <Input
                        type="number"
                        placeholder="Marks"
                        value={subject.marks_obtained}
                        onChange={(e) => {
                          const updatedSubjects = [...form.subjects];

                          const marks = e.target.value;

                          updatedSubjects[index].marks_obtained = marks;

                          updatedSubjects[index].grade = calculateGrade(
                            Number(marks),
                            Number(form.max_marks),
                          );

                          setForm({
                            ...form,
                            subjects: updatedSubjects,
                          });
                        }}
                      />

                      <Input value={subject.grade} disabled />
                    </div>
                  ))}
                </div>
              </div>

              <label className="text-sm font-medium">Max Marks</label>
              <Input
                type="number"
                value={form.max_marks}
                onChange={(e) =>
                  setForm({ ...form, max_marks: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X className="w-4 h-4 mr-1.5" /> Cancel
            </Button>
            <Button variant="hero" onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editing ? (
                "Save changes"
              ) : (
                "Add result"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
