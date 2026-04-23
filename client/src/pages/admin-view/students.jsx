import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  addNewStudent,
  deleteStudent,
  fetchAllStudents,
  updateStudent,
  toggleStudentVisibility,
} from "@/store/admin/student-slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil, Trash2, FileText, CreditCard, Search,
  UploadCloudIcon, XIcon, FileIcon, Eye, EyeOff,
} from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import imageCompression from "browser-image-compression";
import mlogo from "@/assets/mlogo.png";

// ── Logo → base64 ────────────────────────────────────────────────────────────
async function getLogoBase64(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve("");
    img.src = src;
  });
}

// ── Default design tokens ────────────────────────────────────────────────────
const defaultAdmitDesign = {
  headerBg: "#1a237e",
  headerText: "#ffffff",
  accentBg: "#e8eaf6",
  accentText: "#1a237e",
  borderColor: "#1a237e",
  institutionName: "Institution Name",
  footerText: "This admit card must be presented at the examination center along with a valid photo ID.",
  sig1: "Examiner",
  sig2: "Principal / Director",
  sig3: "Controller of Examinations",
};

const defaultCertDesign = {
  borderColor: "#b8860b",
  titleColor: "#b8860b",
  nameColor: "#1a237e",
  gradeBg: "#1a237e",
  gradeText: "#ffffff",
  institutionName: "Institution Name",
  certTitle: "Certificate of Achievement",
  certSubtitle: "This is to certify that",
  certBody: "The following student has successfully completed",
  sig1: "Examiner",
  sig2: "Principal / Director",
  sig3: "Controller of Examinations",
};

const emptyForm = {
  name: "", fatherName: "", motherName: "", dob: "", gender: "",
  rollNumber: "", course: "", batch: "", enrollmentNumber: "",
  email: "", phone: "", address: "", photo: "",
  examCenter: "", examDate: "", examTime: "",
  grade: "", percentage: "", passingYear: "",
};

const fields = [
  { name: "name", label: "Student Name", type: "text" },
  { name: "fatherName", label: "Father's Name", type: "text" },
  { name: "motherName", label: "Mother's Name", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "rollNumber", label: "Roll Number", type: "text" },
  { name: "course", label: "Course", type: "text" },
  { name: "batch", label: "Batch / Year", type: "text" },
  { name: "enrollmentNumber", label: "Enrollment Number", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "examCenter", label: "Exam Center", type: "text" },
  { name: "examDate", label: "Exam Date", type: "date" },
  { name: "examTime", label: "Exam Time", type: "time" },
  { name: "grade", label: "Grade", type: "text" },
  { name: "percentage", label: "Percentage (%)", type: "text" },
  { name: "passingYear", label: "Passing Year", type: "text" },
];

// ── HTML Generators ──────────────────────────────────────────────────────────
function generateAdmitCardHTML(s, logoBase64, d = defaultAdmitDesign) {
  const logoImg = logoBase64
    ? `<img src="${logoBase64}" alt="logo" style="height:48px;object-fit:contain;"/>`
    : "";
  return `<!DOCTYPE html><html><head><title>Admit Card</title>
  <style>
    *{box-sizing:border-box;}
    body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5;}
    .card{max-width:620px;margin:auto;background:#fff;border:2px solid ${d.borderColor};border-radius:8px;overflow:hidden;}
    .header{background:${d.headerBg};color:${d.headerText};padding:14px 20px;display:flex;align-items:center;gap:14px;}
    .header-text{flex:1;}
    .header-text h1{margin:0;font-size:20px;}
    .header-text p{margin:4px 0 0;font-size:13px;opacity:.85;}
    .inst{font-size:11px;opacity:.7;margin-top:2px;}
    .body{padding:20px;display:grid;grid-template-columns:1fr auto;gap:12px;}
    .fields{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .photo img{width:100px;height:120px;object-fit:cover;border:2px solid ${d.borderColor};border-radius:4px;}
    .photo .placeholder{width:100px;height:120px;background:${d.accentBg};border:2px solid ${d.borderColor};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#666;}
    .row{display:flex;flex-direction:column;gap:2px;}
    .lbl{font-size:10px;color:#888;text-transform:uppercase;letter-spacing:.5px;}
    .val{font-size:13px;font-weight:600;color:${d.accentText};}
    .exam-box{grid-column:1/-1;background:${d.accentBg};border-radius:6px;padding:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:4px;}
    .sigs{grid-column:1/-1;display:flex;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid #ddd;}
    .sig{text-align:center;flex:1;}
    .sig-line{border-top:1px solid #333;width:100px;margin:0 auto 4px;}
    .sig-label{font-size:11px;color:#666;}
    .footer{background:${d.headerBg};color:${d.headerText};padding:10px 20px;font-size:11px;text-align:center;}
    .badge{display:inline-block;background:${d.headerText};color:${d.headerBg};font-weight:700;padding:2px 10px;border-radius:20px;font-size:13px;}
    @media print{body{background:#fff;padding:0;}}
  </style></head><body>
  <div class="card">
    <div class="header">
      ${logoImg}
      <div class="header-text">
        <h1>ADMIT CARD</h1>
        <p>${s.course || "Course"} &mdash; ${s.batch || "Batch"}</p>
        <p class="inst">${d.institutionName}</p>
      </div>
      <span class="badge">Roll: ${s.rollNumber || "N/A"}</span>
    </div>
    <div class="body">
      <div class="fields">
        <div class="row"><span class="lbl">Student Name</span><span class="val">${s.name || ""}</span></div>
        <div class="row"><span class="lbl">Enrollment No.</span><span class="val">${s.enrollmentNumber || ""}</span></div>
        <div class="row"><span class="lbl">Father's Name</span><span class="val">${s.fatherName || ""}</span></div>
        <div class="row"><span class="lbl">Mother's Name</span><span class="val">${s.motherName || ""}</span></div>
        <div class="row"><span class="lbl">Date of Birth</span><span class="val">${s.dob || ""}</span></div>
        <div class="row"><span class="lbl">Gender</span><span class="val">${s.gender || ""}</span></div>
        <div class="row" style="grid-column:1/-1"><span class="lbl">Address</span><span class="val">${s.address || ""}</span></div>
        <div class="exam-box">
          <div class="row"><span class="lbl">Exam Center</span><span class="val">${s.examCenter || ""}</span></div>
          <div class="row"><span class="lbl">Exam Date</span><span class="val">${s.examDate || ""}</span></div>
          <div class="row"><span class="lbl">Exam Time</span><span class="val">${s.examTime || ""}</span></div>
        </div>
        <div class="sigs">
          <div class="sig"><div class="sig-line"></div><div class="sig-label">${d.sig1}</div></div>
          <div class="sig"><div class="sig-line"></div><div class="sig-label">${d.sig2}</div></div>
          <div class="sig"><div class="sig-line"></div><div class="sig-label">${d.sig3}</div></div>
        </div>
      </div>
      <div class="photo">${s.photo ? `<img src="${s.photo}" alt="photo"/>` : `<div class="placeholder">Photo</div>`}</div>
    </div>
    <div class="footer">${d.footerText}</div>
  </div></body></html>`;
}

function generateCertificateHTML(s, logoBase64, d = defaultCertDesign) {
  const logoImg = logoBase64
    ? `<img src="${logoBase64}" alt="logo" style="height:64px;object-fit:contain;margin-bottom:6px;"/>`
    : "";
  return `<!DOCTYPE html><html><head><title>Certificate</title>
  <style>
    *{box-sizing:border-box;}
    body{font-family:Georgia,serif;margin:0;padding:30px;background:#f9f6ee;}
    .cert{max-width:720px;margin:auto;background:#fff;border:8px double ${d.borderColor};padding:40px;text-align:center;position:relative;}
    .cert::before{content:'';position:absolute;inset:12px;border:2px solid ${d.borderColor};pointer-events:none;}
    .inst{font-size:13px;color:#777;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;}
    h1{color:${d.titleColor};font-size:34px;margin:4px 0;letter-spacing:2px;}
    .subtitle{color:#555;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin:12px 0 4px;}
    .presented{font-size:15px;color:#444;margin-bottom:6px;}
    .student-name{font-size:30px;color:${d.nameColor};font-weight:700;border-bottom:2px solid ${d.borderColor};display:inline-block;padding:0 20px 4px;margin:8px 0 14px;}
    .details{font-size:14px;color:#444;line-height:2.2;}
    .grade-box{display:inline-block;background:${d.gradeBg};color:${d.gradeText};padding:8px 28px;border-radius:4px;font-size:18px;font-weight:700;margin:14px 0;}
    .footer{display:flex;justify-content:space-between;margin-top:36px;padding-top:14px;border-top:1px solid #ddd;}
    .sig{text-align:center;flex:1;}
    .sig-line{border-top:1px solid #333;width:120px;margin:0 auto 4px;}
    .sig-label{font-size:12px;color:#666;}
    @media print{body{background:#fff;padding:0;}}
  </style></head><body>
  <div class="cert">
    ${logoImg}
    <div class="inst">${d.institutionName}</div>
    <h1>${d.certTitle}</h1>
    <div class="subtitle">${d.certSubtitle}</div>
    <div class="presented">${d.certBody}</div>
    <div class="student-name">${s.name || "Student Name"}</div>
    <div class="details">
      <strong>Course:</strong> ${s.course || ""} &nbsp;|&nbsp; <strong>Batch:</strong> ${s.batch || ""}<br/>
      <strong>Enrollment No.:</strong> ${s.enrollmentNumber || ""} &nbsp;|&nbsp; <strong>Roll No.:</strong> ${s.rollNumber || ""}<br/>
      <strong>Father's Name:</strong> ${s.fatherName || ""}<br/>
      <strong>Passing Year:</strong> ${s.passingYear || ""}
    </div>
    <div class="grade-box">Grade: ${s.grade || "N/A"} &nbsp;&nbsp; ${s.percentage ? s.percentage + "%" : ""}</div>
    <div class="footer">
      <div class="sig"><div class="sig-line"></div><div class="sig-label">${d.sig1}</div></div>
      <div class="sig"><div class="sig-line"></div><div class="sig-label">${d.sig2}</div></div>
      <div class="sig"><div class="sig-line"></div><div class="sig-label">${d.sig3}</div></div>
    </div>
  </div></body></html>`;
}

// ── Photo Upload ─────────────────────────────────────────────────────────────
function PhotoUpload({ currentUrl, onUploaded }) {
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    let processed = file;
    if (file.size > 1024 * 1024) {
      try { processed = await imageCompression(file, { maxSizeMB: 0.3, maxWidthOrHeight: 1920, useWebWorker: true }); }
      catch { /* fallback */ }
    }
    setImageFile(processed);
    setLoading(true);
    const data = new FormData();
    data.append("my_file", processed);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);
      if (res?.data?.success) onUploaded(res.data.result.url);
    } catch (err) { console.error("Upload failed", err); }
    finally { setLoading(false); }
  }

  function handleRemove() {
    setImageFile(null); onUploaded("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="sm:col-span-2 flex flex-col gap-1">
      <Label>Student Photo</Label>
      <div className="border-2 border-dashed rounded-lg p-4">
        <Input id="student-photo-upload" type="file" accept="image/*" className="hidden" ref={inputRef}
          onChange={(e) => handleFile(e.target.files[0])} />
        {currentUrl && !loading && (
          <div className="flex items-center gap-3 mb-3">
            <img src={currentUrl} alt="student" className="w-16 h-20 object-cover rounded border" />
            <Button type="button" variant="ghost" size="icon" onClick={handleRemove}><XIcon className="w-4 h-4" /></Button>
          </div>
        )}
        {loading ? <Skeleton className="h-10 bg-gray-100" /> : imageFile && currentUrl ? null : (
          <Label htmlFor="student-photo-upload"
            className="flex flex-col items-center justify-center h-24 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <UploadCloudIcon className="w-8 h-8 mb-1" />
            <span className="text-sm">Click or drag & drop to upload photo</span>
          </Label>
        )}
        {imageFile && !loading && !currentUrl && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><FileIcon className="w-5 h-5 text-primary" /><span className="text-sm">{imageFile.name}</span></div>
            <Button type="button" variant="ghost" size="icon" onClick={handleRemove}><XIcon className="w-4 h-4" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Design Editor Panel ──────────────────────────────────────────────────────
function DesignField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        {type === "color" && (
          <input type="color" value={value} onChange={(e) => onChange(name, e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border p-0.5" />
        )}
        <Input
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="h-8 text-sm"
          placeholder={label}
        />
      </div>
    </div>
  );
}

function DesignEditor({ type, design, onChange, onClose, onPrint }) {
  const isAdmit = type === "admit";
  const fields = isAdmit ? [
    { label: "Institution Name", name: "institutionName", type: "text" },
    { label: "Header Background", name: "headerBg", type: "color" },
    { label: "Header Text Color", name: "headerText", type: "color" },
    { label: "Accent Background", name: "accentBg", type: "color" },
    { label: "Accent Text Color", name: "accentText", type: "color" },
    { label: "Border Color", name: "borderColor", type: "color" },
    { label: "Footer Text", name: "footerText", type: "text" },
    { label: "Signature 1", name: "sig1", type: "text" },
    { label: "Signature 2", name: "sig2", type: "text" },
    { label: "Signature 3", name: "sig3", type: "text" },
  ] : [
    { label: "Institution Name", name: "institutionName", type: "text" },
    { label: "Certificate Title", name: "certTitle", type: "text" },
    { label: "Subtitle Line", name: "certSubtitle", type: "text" },
    { label: "Body Line", name: "certBody", type: "text" },
    { label: "Border Color", name: "borderColor", type: "color" },
    { label: "Title Color", name: "titleColor", type: "color" },
    { label: "Name Color", name: "nameColor", type: "color" },
    { label: "Grade Box Background", name: "gradeBg", type: "color" },
    { label: "Grade Box Text", name: "gradeText", type: "color" },
    { label: "Signature 1", name: "sig1", type: "text" },
    { label: "Signature 2", name: "sig2", type: "text" },
    { label: "Signature 3", name: "sig3", type: "text" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-semibold">{isAdmit ? "Admit Card" : "Certificate"} Design</span>
        <div className="flex gap-2">
          <Button size="sm" onClick={onPrint}>Print / Download</Button>
          <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Controls */}
        <div className="w-64 border-r overflow-y-auto p-4 flex flex-col gap-3 shrink-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customize</p>
          {fields.map((f) => (
            <DesignField key={f.name} label={f.label} name={f.name} value={design[f.name]} onChange={onChange} type={f.type} />
          ))}
          <Button size="sm" variant="outline" className="mt-2"
            onClick={() => {
              const defaults = isAdmit ? defaultAdmitDesign : defaultCertDesign;
              Object.entries(defaults).forEach(([k, v]) => onChange(k, v));
            }}>
            Reset to Default
          </Button>
        </div>
        {/* Live Preview */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <p className="text-xs text-muted-foreground mb-2 text-center">Live Preview</p>
          <iframe
            srcDoc={onPrint.__html}
            className="w-full border-0 rounded shadow"
            style={{ height: "600px" }}
            title="design-preview"
          />
        </div>
      </div>
    </div>
  );
}

// ── Print Frame (simple, no editor) ─────────────────────────────────────────
function PrintFrame({ content, onClose }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      doc.open(); doc.write(content); doc.close();
    }
  }, [content]);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[700px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold text-lg">Preview</span>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => iframeRef.current?.contentWindow?.print()}>Print / Download</Button>
            <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
        <iframe ref={iframeRef} className="flex-1 w-full" title="preview" />
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
function AdminStudents() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { studentList, isLoading } = useSelector((state) => state.adminStudent);

  const [openSheet, setOpenSheet] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [logoBase64, setLogoBase64] = useState("");

  // Design editor state
  const [designMode, setDesignMode] = useState(null); // null | { type: 'admit'|'cert', student }
  const [admitDesign, setAdmitDesign] = useState({ ...defaultAdmitDesign });
  const [certDesign, setCertDesign] = useState({ ...defaultCertDesign });

  // Simple print (no editor)
  const [printContent, setPrintContent] = useState(null);

  const designIframeRef = useRef(null);

  useEffect(() => { dispatch(fetchAllStudents()); }, [dispatch]);
  useEffect(() => { getLogoBase64(mlogo).then(setLogoBase64); }, []);

  // Sync live preview iframe when design changes
  useEffect(() => {
    if (!designMode || !designIframeRef.current) return;
    const html = designMode.type === "admit"
      ? generateAdmitCardHTML(designMode.student, logoBase64, admitDesign)
      : generateCertificateHTML(designMode.student, logoBase64, certDesign);
    const doc = designIframeRef.current.contentDocument;
    doc.open(); doc.write(html); doc.close();
  }, [admitDesign, certDesign, designMode, logoBase64]);

  function handleDesignChange(type, key, value) {
    if (type === "admit") setAdmitDesign((p) => ({ ...p, [key]: value }));
    else setCertDesign((p) => ({ ...p, [key]: value }));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.rollNumber) {
      toast({ title: "Name and Roll Number are required", variant: "destructive" });
      return;
    }
    const action = editId
      ? updateStudent({ id: editId, formData })
      : addNewStudent(formData);
    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        toast({ title: editId ? "Student updated" : "Student added" });
        dispatch(fetchAllStudents());
        setOpenSheet(false);
        setFormData(emptyForm);
        setEditId(null);
      } else {
        toast({ title: "Something went wrong", variant: "destructive" });
      }
    });
  }

  function handleEdit(student) {
    setFormData({ ...emptyForm, ...student });
    setEditId(student._id);
    setOpenSheet(true);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    dispatch(deleteStudent(id)).then(() => {
      toast({ title: "Student deleted" });
      dispatch(fetchAllStudents());
    });
  }

  function handleToggle(id, field) {
    dispatch(toggleStudentVisibility({ id, field }));
  }

  const filtered = (studentList || []).filter((s) =>
    [s.name, s.rollNumber, s.course, s.enrollmentNumber]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // Build the current HTML for the design editor's live preview
  const currentDesignHTML = designMode
    ? (designMode.type === "admit"
        ? generateAdmitCardHTML(designMode.student, logoBase64, admitDesign)
        : generateCertificateHTML(designMode.student, logoBase64, certDesign))
    : "";

  return (
    <div className="p-2">
      {/* Design Editor — full screen overlay */}
      {designMode && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <span className="font-semibold text-lg">
              {designMode.type === "admit" ? "Admit Card" : "Certificate"} — Design Editor
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => {
                const html = designMode.type === "admit"
                  ? generateAdmitCardHTML(designMode.student, logoBase64, admitDesign)
                  : generateCertificateHTML(designMode.student, logoBase64, certDesign);
                setPrintContent(html);
              }}>
                Print / Download
              </Button>
              <Button size="sm" variant="outline" onClick={() => setDesignMode(null)}>Close</Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left: controls */}
            <div className="w-72 border-r overflow-y-auto p-4 flex flex-col gap-3 shrink-0 bg-gray-50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customize Design</p>

              {(designMode.type === "admit" ? [
                { label: "Institution Name", name: "institutionName", type: "text" },
                { label: "Header Background", name: "headerBg", type: "color" },
                { label: "Header Text Color", name: "headerText", type: "color" },
                { label: "Accent Background", name: "accentBg", type: "color" },
                { label: "Accent / Value Color", name: "accentText", type: "color" },
                { label: "Border Color", name: "borderColor", type: "color" },
                { label: "Footer Text", name: "footerText", type: "text" },
                { label: "Signature 1 Label", name: "sig1", type: "text" },
                { label: "Signature 2 Label", name: "sig2", type: "text" },
                { label: "Signature 3 Label", name: "sig3", type: "text" },
              ] : [
                { label: "Institution Name", name: "institutionName", type: "text" },
                { label: "Certificate Title", name: "certTitle", type: "text" },
                { label: "Subtitle Line", name: "certSubtitle", type: "text" },
                { label: "Body Line", name: "certBody", type: "text" },
                { label: "Border Color", name: "borderColor", type: "color" },
                { label: "Title Color", name: "titleColor", type: "color" },
                { label: "Student Name Color", name: "nameColor", type: "color" },
                { label: "Grade Box Background", name: "gradeBg", type: "color" },
                { label: "Grade Box Text Color", name: "gradeText", type: "color" },
                { label: "Signature 1 Label", name: "sig1", type: "text" },
                { label: "Signature 2 Label", name: "sig2", type: "text" },
                { label: "Signature 3 Label", name: "sig3", type: "text" },
              ]).map((f) => {
                const design = designMode.type === "admit" ? admitDesign : certDesign;
                return (
                  <div key={f.name} className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">{f.label}</Label>
                    <div className="flex items-center gap-2">
                      {f.type === "color" && (
                        <input
                          type="color"
                          value={design[f.name]}
                          onChange={(e) => handleDesignChange(designMode.type, f.name, e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border p-0.5 shrink-0"
                        />
                      )}
                      <Input
                        value={design[f.name]}
                        onChange={(e) => handleDesignChange(designMode.type, f.name, e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                );
              })}

              <Button size="sm" variant="outline" className="mt-2" onClick={() => {
                const defaults = designMode.type === "admit" ? defaultAdmitDesign : defaultCertDesign;
                if (designMode.type === "admit") setAdmitDesign({ ...defaults });
                else setCertDesign({ ...defaults });
              }}>
                Reset to Default
              </Button>
            </div>

            {/* Right: live preview */}
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
              <p className="text-xs text-muted-foreground mb-3 text-center">Live Preview — changes apply instantly</p>
              <iframe
                ref={designIframeRef}
                srcDoc={currentDesignHTML}
                className="w-full border-0 rounded-lg shadow-lg"
                style={{ minHeight: "680px" }}
                title="design-preview"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, roll, course..." className="pl-8 w-64"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button onClick={() => { setFormData(emptyForm); setEditId(null); setOpenSheet(true); }}>
            + Add Student
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Photo</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Roll No.</th>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">Batch</th>
              <th className="px-4 py-3 text-left">Enrollment No.</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={9} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={9} className="text-center py-8 text-muted-foreground">No students found</td></tr>
            ) : (
              filtered.map((s, i) => (
                <tr key={s._id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">
                    {s.photo
                      ? <img src={s.photo} alt={s.name} className="w-10 h-12 object-cover rounded border" />
                      : <div className="w-10 h-12 bg-muted rounded border flex items-center justify-center text-xs text-muted-foreground">N/A</div>
                    }
                  </td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">{s.rollNumber}</td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="px-4 py-3">{s.batch}</td>
                  <td className="px-4 py-3">{s.enrollmentNumber}</td>
                  <td className="px-4 py-3">{s.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      <Button size="icon" variant="ghost" title="Edit Student" onClick={() => handleEdit(s)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Design & Print Admit Card"
                        onClick={() => setDesignMode({ type: "admit", student: s })}>
                        <CreditCard className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Design & Print Certificate"
                        onClick={() => setDesignMode({ type: "cert", student: s })}>
                        <FileText className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Delete" onClick={() => handleDelete(s._id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button
                        size="icon" variant="ghost"
                        title={s.showAdmitCard ? "Hide Admit Card from students" : "Show Admit Card to students"}
                        onClick={() => handleToggle(s._id, "showAdmitCard")}
                        className={s.showAdmitCard ? "text-blue-600" : "text-muted-foreground"}
                      >
                        {s.showAdmitCard ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon" variant="ghost"
                        title={s.showCertificate ? "Hide Certificate from students" : "Show Certificate to students"}
                        onClick={() => handleToggle(s._id, "showCertificate")}
                        className={s.showCertificate ? "text-green-600" : "text-muted-foreground"}
                      >
                        {s.showCertificate ? <FileText className="h-4 w-4" /> : <FileText className="h-4 w-4 opacity-30" />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editId ? "Edit Student" : "Add New Student"}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PhotoUpload
              currentUrl={formData.photo}
              onUploaded={(url) => setFormData((prev) => ({ ...prev, photo: url }))}
            />
            {fields.map((f) => (
              <div key={f.name} className="flex flex-col gap-1">
                <Label htmlFor={f.name}>{f.label}</Label>
                <Input id={f.name} name={f.name} type={f.type}
                  value={formData[f.name] || ""} onChange={handleChange} placeholder={f.label} />
              </div>
            ))}
            <div className="sm:col-span-2 flex gap-3 mt-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {editId ? "Update Student" : "Add Student"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpenSheet(false)}>Cancel</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Print preview (triggered from design editor) */}
      {printContent && (
        <PrintFrame content={printContent} onClose={() => setPrintContent(null)} />
      )}
    </div>
  );
}

export default AdminStudents;
