import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { getStudentByEnrollment } from "@/store/admin/student-slice";
import { Search, CreditCard, FileText, Download } from "lucide-react";
import mlogo from "@/assets/mlogo.png";

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

function buildAdmitCardHTML(s, logo) {
  const logoImg = logo ? `<img src="${logo}" alt="logo" style="height:48px;object-fit:contain;"/>` : "";
  return `<!DOCTYPE html><html><head><title>Admit Card - ${s.name}</title>
  <style>
    *{box-sizing:border-box;}
    body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5;}
    .card{max-width:620px;margin:auto;background:#fff;border:2px solid #1a237e;border-radius:8px;overflow:hidden;}
    .header{background:#1a237e;color:#fff;padding:14px 20px;display:flex;align-items:center;gap:14px;}
    .header-text{flex:1;}
    .header-text h1{margin:0;font-size:20px;}
    .header-text p{margin:4px 0 0;font-size:13px;opacity:.85;}
    .body{padding:20px;display:grid;grid-template-columns:1fr auto;gap:12px;}
    .fields{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .photo img{width:100px;height:120px;object-fit:cover;border:2px solid #1a237e;border-radius:4px;}
    .photo .placeholder{width:100px;height:120px;background:#e8eaf6;border:2px solid #1a237e;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#666;}
    .row{display:flex;flex-direction:column;gap:2px;}
    .lbl{font-size:10px;color:#888;text-transform:uppercase;letter-spacing:.5px;}
    .val{font-size:13px;font-weight:600;color:#1a237e;}
    .exam-box{grid-column:1/-1;background:#e8eaf6;border-radius:6px;padding:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:4px;}
    .sigs{grid-column:1/-1;display:flex;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid #ddd;}
    .sig{text-align:center;flex:1;}
    .sig-line{border-top:1px solid #333;width:100px;margin:0 auto 4px;}
    .sig-label{font-size:11px;color:#666;}
    .footer{background:#1a237e;color:#fff;padding:10px 20px;font-size:11px;text-align:center;}
    .badge{display:inline-block;background:#fff;color:#1a237e;font-weight:700;padding:2px 10px;border-radius:20px;font-size:13px;}
    @media print{body{background:#fff;padding:0;}}
  </style></head><body>
  <div class="card">
    <div class="header">
      ${logoImg}
      <div class="header-text">
        <h1>ADMIT CARD</h1>
        <p>${s.course || ""} &mdash; ${s.batch || ""}</p>
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
          <div class="sig"><div class="sig-line"></div><div class="sig-label">Examiner</div></div>
          <div class="sig"><div class="sig-line"></div><div class="sig-label">Principal / Director</div></div>
          <div class="sig"><div class="sig-line"></div><div class="sig-label">Controller of Examinations</div></div>
        </div>
      </div>
      <div class="photo">${s.photo ? `<img src="${s.photo}" alt="photo"/>` : `<div class="placeholder">Photo</div>`}</div>
    </div>
    <div class="footer">This admit card must be presented at the examination center along with a valid photo ID.</div>
  </div></body></html>`;
}

function buildCertificateHTML(s, logo) {
  const logoImg = logo ? `<img src="${logo}" alt="logo" style="height:64px;object-fit:contain;margin-bottom:6px;"/>` : "";
  return `<!DOCTYPE html><html><head><title>Certificate - ${s.name}</title>
  <style>
    *{box-sizing:border-box;}
    body{font-family:Georgia,serif;margin:0;padding:30px;background:#f9f6ee;}
    .cert{max-width:720px;margin:auto;background:#fff;border:8px double #b8860b;padding:40px;text-align:center;position:relative;}
    .cert::before{content:'';position:absolute;inset:12px;border:2px solid #b8860b;pointer-events:none;}
    h1{color:#b8860b;font-size:34px;margin:4px 0;letter-spacing:2px;}
    .subtitle{color:#555;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin:12px 0 4px;}
    .presented{font-size:15px;color:#444;margin-bottom:6px;}
    .student-name{font-size:30px;color:#1a237e;font-weight:700;border-bottom:2px solid #b8860b;display:inline-block;padding:0 20px 4px;margin:8px 0 14px;}
    .details{font-size:14px;color:#444;line-height:2.2;}
    .grade-box{display:inline-block;background:#1a237e;color:#fff;padding:8px 28px;border-radius:4px;font-size:18px;font-weight:700;margin:14px 0;}
    .footer{display:flex;justify-content:space-between;margin-top:36px;padding-top:14px;border-top:1px solid #ddd;}
    .sig{text-align:center;flex:1;}
    .sig-line{border-top:1px solid #333;width:120px;margin:0 auto 4px;}
    .sig-label{font-size:12px;color:#666;}
    @media print{body{background:#fff;padding:0;}}
  </style></head><body>
  <div class="cert">
    ${logoImg}
    <h1>Certificate of Achievement</h1>
    <div class="subtitle">This is to certify that</div>
    <div class="presented">The following student has successfully completed</div>
    <div class="student-name">${s.name || ""}</div>
    <div class="details">
      <strong>Course:</strong> ${s.course || ""} &nbsp;|&nbsp; <strong>Batch:</strong> ${s.batch || ""}<br/>
      <strong>Enrollment No.:</strong> ${s.enrollmentNumber || ""} &nbsp;|&nbsp; <strong>Roll No.:</strong> ${s.rollNumber || ""}<br/>
      <strong>Father's Name:</strong> ${s.fatherName || ""}<br/>
      <strong>Passing Year:</strong> ${s.passingYear || ""}
    </div>
    <div class="grade-box">Grade: ${s.grade || "N/A"} &nbsp;&nbsp; ${s.percentage ? s.percentage + "%" : ""}</div>
    <div class="footer">
      <div class="sig"><div class="sig-line"></div><div class="sig-label">Examiner</div></div>
      <div class="sig"><div class="sig-line"></div><div class="sig-label">Principal / Director</div></div>
      <div class="sig"><div class="sig-line"></div><div class="sig-label">Controller of Examinations</div></div>
    </div>
  </div></body></html>`;
}

function PrintModal({ html, onClose }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    doc.open(); doc.write(html); doc.close();
  }, [html]);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold">Preview</span>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => iframeRef.current?.contentWindow?.print()}>
              <Download className="w-4 h-4 mr-1" /> Print / Save PDF
            </Button>
            <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
        <iframe ref={iframeRef} className="flex-1 w-full rounded-b-xl" title="doc-preview" style={{ minHeight: 480 }} />
      </div>
    </div>
  );
}

function StudentDownload() {
  const dispatch = useDispatch();
  const [enrollment, setEnrollment] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoBase64, setLogoBase64] = useState("");
  const [printHtml, setPrintHtml] = useState(null);

  useEffect(() => { getLogoBase64(mlogo).then(setLogoBase64); }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!enrollment.trim()) return;
    setLoading(true);
    setError("");
    setStudent(null);
    const result = await dispatch(getStudentByEnrollment(enrollment.trim()));
    setLoading(false);
    if (result?.payload?.success) {
      setStudent(result.payload.data);
    } else {
      setError("No student found with this enrollment number.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4f8] to-[#f0f9ff] py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <img src={mlogo} alt="logo" className="h-16 mx-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold text-[#1a237e]">Student Document Portal</h1>
          <p className="text-gray-500 mt-2">Enter your enrollment number to download your admit card or certificate</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <Label className="text-sm font-medium mb-2 block">Enrollment Number</Label>
          <div className="flex gap-2">
            <Input
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              placeholder="e.g. ENR2024001"
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : <><Search className="w-4 h-4 mr-1" />Search</>}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>

        {/* Result */}
        {student && (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
              {student.photo
                ? <img src={student.photo} alt={student.name} className="w-16 h-20 object-cover rounded-lg border-2 border-[#1a237e]" />
                : <div className="w-16 h-20 bg-[#e8eaf6] rounded-lg border-2 border-[#1a237e] flex items-center justify-center text-xs text-gray-500">Photo</div>
              }
              <div>
                <h2 className="text-xl font-bold text-[#1a237e]">{student.name}</h2>
                <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
                <p className="text-sm text-gray-500">Course: {student.course} — {student.batch}</p>
                <p className="text-sm text-gray-500">Enrollment: {student.enrollmentNumber}</p>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-600 mb-4">Available Documents:</p>

            <div className="flex flex-col sm:flex-row gap-3">
              {student.showAdmitCard ? (
                <Button
                  className="flex-1 bg-[#1a237e] hover:bg-[#283593]"
                  onClick={() => setPrintHtml(buildAdmitCardHTML(student, logoBase64))}
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Download Admit Card
                </Button>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-3 text-sm text-gray-400">
                  <CreditCard className="w-4 h-4" /> Admit Card not available yet
                </div>
              )}

              {student.showCertificate ? (
                <Button
                  className="flex-1 bg-[#b8860b] hover:bg-[#9a7209] text-white"
                  onClick={() => setPrintHtml(buildCertificateHTML(student, logoBase64))}
                >
                  <FileText className="w-4 h-4 mr-2" /> Download Certificate
                </Button>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-3 text-sm text-gray-400">
                  <FileText className="w-4 h-4" /> Certificate not available yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {printHtml && <PrintModal html={printHtml} onClose={() => setPrintHtml(null)} />}
    </div>
  );
}

export default StudentDownload;
