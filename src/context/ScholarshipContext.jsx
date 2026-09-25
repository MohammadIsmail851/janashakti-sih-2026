import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  initialStudentData, 
  schemesData, 
  digitalWalletDocuments, 
  verificationPipeline, 
  dbtTimelineStages 
} from '../data/mockData';
import { simulateAIAnalysis } from '../utils/ocrSimulator';
import { useNotifications } from './NotificationContext';

const ScholarshipContext = createContext();

export const ScholarshipProvider = ({ children }) => {
  const { addNotification, showToast } = useNotifications();

  // Student State
  const [student, setStudent] = useState(initialStudentData);
  const [schemes, setSchemes] = useState(schemesData);
  const [documents, setDocuments] = useState(digitalWalletDocuments);
  const [verifications, setVerifications] = useState(verificationPipeline);
  const [dbtTimeline, setDbtTimeline] = useState(dbtTimelineStages);
  
  // UI Interactive Modals
  const [previewDocument, setPreviewDocument] = useState(null);
  const [isScanningModalOpen, setIsScanningModalOpen] = useState(false);
  const [manualReviewModal, setManualReviewModal] = useState({
    isOpen: false,
    stage: null,
    reason: "",
    discrepancy: ""
  });

  // Admin Verification Queue & Analytics
  const [adminQueue, setAdminQueue] = useState([
    {
      id: "ST-2025-OD-8921",
      name: "Aarav Hembram",
      tribe: "Santhal (ST)",
      state: "Odisha",
      institute: "NIT Rourkela",
      scheme: "Top Class Education",
      pendingNode: "AISHE Institute Node",
      attendance: "89.2%",
      income: "₹1,80,000",
      status: "Pending Action",
      submittedOn: "10 Oct 2025"
    },
    {
      id: "ST-2025-JH-3190",
      name: "Sunita Munda",
      tribe: "Munda (ST)",
      state: "Jharkhand",
      institute: "IIT Kharagpur",
      scheme: "Top Class Education",
      pendingNode: "State e-District Node",
      attendance: "94.5%",
      income: "₹1,20,000",
      status: "Pending Action",
      submittedOn: "14 Oct 2025"
    },
    {
      id: "ST-2025-AP-4412",
      name: "Kalyan Naik",
      tribe: "Lambada / Sugali (ST)",
      state: "Andhra Pradesh",
      institute: "Andhra University",
      scheme: "NFST (Ph.D. Research)",
      pendingNode: "UGC / MoTA Portal Integration",
      attendance: "Research Scholar",
      income: "₹2,10,000",
      status: "Verified",
      submittedOn: "20 Sep 2025"
    },
    {
      id: "ST-2025-MP-7729",
      name: "Pooja Gond",
      tribe: "Gond (ST)",
      state: "Madhya Pradesh",
      institute: "MANIT Bhopal",
      scheme: "Post-Matric Scholarship",
      pendingNode: "AISHE Institute Node",
      attendance: "78.4%",
      income: "₹1,50,000",
      status: "Manual Review",
      discrepancy: "Name spelling in 10th marksheet (Pooja) differs from Aadhaar (Puja Gond).",
      submittedOn: "02 Nov 2025"
    }
  ]);

  const [adminMetrics, setAdminMetrics] = useState({
    totalApplications: "48,210",
    dbtDisbursedTotal: "₹142.8 Cr",
    pendingVerifications: 342,
    activeSchemesCount: 5,
    topInstitutesNotified: 260
  });

  // Reusable Document Operations
  const addDocument = async (docData) => {
    const analysis = await simulateAIAnalysis(docData.name, docData.type, student);
    
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: docData.name,
      type: docData.type,
      issuer: docData.issuer || "Authorized Educational / State Authority",
      docNumber: docData.docNumber || `DOC-${Math.floor(100000 + Math.random() * 900000)}`,
      verified: true,
      verificationSource: "AI OCR & QR Authenticated",
      issueDate: "Sep 2026",
      expiryDate: "Valid for AY 2026-27",
      isExpired: false,
      expiryAlert: null,
      ocrScore: analysis.ocrScore,
      fileSize: "1.8 MB",
      fileType: "PDF (e-Signed)",
      previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      qualityScore: analysis.qualityMeter,
      matchedFields: analysis.extractedFields
    };

    setDocuments(prev => [newDoc, ...prev]);
    showToast(`Uploaded & Verified: ${docData.name} (OCR: ${analysis.ocrScore}%)`, "success");
    return analysis;
  };

  const deleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast("Document removed from wallet", "info");
  };

  const replaceDocument = async (docId, newDocData) => {
    const analysis = await simulateAIAnalysis(newDocData.name, newDocData.type, student);
    setDocuments(prev =>
      prev.map(d => {
        if (d.id === docId) {
          return {
            ...d,
            name: newDocData.name,
            docNumber: `DOC-${Math.floor(100000 + Math.random() * 900000)}`,
            issueDate: "Today",
            ocrScore: analysis.ocrScore,
            qualityScore: analysis.qualityMeter
          };
        }
        return d;
      })
    );
    showToast("Document replaced and re-verified successfully", "success");
  };

  const renewIncomeCertificate = async () => {
    showToast("Connecting to Odisha e-District Gateway...", "info");
    await new Promise(res => setTimeout(res, 1200));

    setDocuments(prev =>
      prev.map(doc => {
        if (doc.id === "doc-income") {
          return {
            ...doc,
            issueDate: "25 Sep 2026",
            expiryDate: "31 Mar 2027",
            expiryAlert: null,
            daysLeft: 365,
            ocrScore: 99.4,
            docNumber: "INC/2026/MBJ/90118",
            verificationSource: "Odisha e-District (Auto-Renewed)"
          };
        }
        return doc;
      })
    );

    addNotification({
      title: "Income Certificate Renewed ✓",
      message: "Valid till 31 Mar 2027. Re-synchronized with MoTA Central PMU.",
      type: "success",
      category: "Wallet",
      actionLink: "/wallet"
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}

    showToast("Income Certificate renewed till 31 Mar 2027!", "success");
  };

  const reuseDocumentInApplication = (docId, schemeName) => {
    showToast(`Linked ${docId} to ${schemeName} application. No re-upload required!`, "success");
  };

  // AISHE Node Simulation
  const simulateAisheVerification = async () => {
    showToast("Simulating Institute Nodal Officer Sign-off...", "info");
    await new Promise(res => setTimeout(res, 1000));

    setVerifications(prev =>
      prev.map(v => {
        if (v.id === "aishe") {
          return {
            ...v,
            status: "Verified",
            badge: "Institute Authenticated",
            timestamp: "Today, Just now",
            details: "Attendance certified (89.2%). Semester VI institutional bonafide signed by Dean Academics, NIT Rourkela.",
            confidence: "100%",
            canSimulateVerify: false
          };
        }
        return v;
      })
    );

    // Update Admin Queue as well
    setAdminQueue(prev =>
      prev.map(q => q.id === "ST-2025-OD-8921" ? { ...q, status: "Verified", pendingNode: "All Nodes Cleared ✓" } : q)
    );

    setSchemes(prev =>
      prev.map(s => {
        if (s.id === "top-class") {
          return {
            ...s,
            status: "Approved for Full Disbursal",
            progress: 90,
            nextAction: "PFMS Release for Tranche 2 (₹62,500) In-flight",
            verificationStage: "All Stages Verified ✓"
          };
        }
        return s;
      })
    );

    addNotification({
      title: "AISHE Institute Verification Completed ✓",
      message: "NIT Rourkela Nodal Officer verified your attendance and fee claim. Tranche 2 release initiated.",
      type: "success",
      category: "Verification",
      actionLink: "/verification"
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    showToast("AISHE Verification Approved by NIT Rourkela!", "success");
  };

  // DBT Disbursal Simulation
  const disburseTranche2 = async () => {
    showToast("Processing DBT Tranche 2 via PFMS APBS Gateway...", "info");
    await new Promise(res => setTimeout(res, 1200));

    setStudent(prev => ({
      ...prev,
      dbtDisbursed: 125000,
      dbtPending: 0
    }));

    setSchemes(prev =>
      prev.map(s => {
        if (s.id === "top-class") {
          return {
            ...s,
            status: "Disbursed (100% Completed)",
            progress: 100,
            disbursedAmount: 125000,
            disbursedFormatted: "₹1,25,000",
            nextAction: "Annual Cycle Complete • Renewal for AY 2026-27"
          };
        }
        return s;
      })
    );

    setDbtTimeline(prev => [
      ...prev,
      {
        stage: 7,
        name: "Tranche 2 DBT Credited",
        desc: "Final Tranche of ₹62,500 credited to SBI A/C ••••4821 via PFMS APBS Gateway.",
        timestamp: "Today, Just now",
        status: "completed",
        amount: "₹62,500",
        utr: `SBIN${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        bank: "State Bank of India (A/C ••••4821)",
        refNumber: "APBS-TR2-FINAL-2026",
        isFinal: true
      }
    ]);

    addNotification({
      title: "Tranche 2 Disbursed: ₹62,500 Credited!",
      message: "Total scholarship amount of ₹1,25,000 for AY 2025-26 has been 100% credited to your bank account.",
      type: "payment",
      category: "DBT",
      actionLink: "/dbt"
    });

    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } catch (e) {}

    showToast("₹62,500 Tranche 2 Disbursed Successfully!", "success");
  };

  // Admin Actions
  const adminApprove = (studentId) => {
    setAdminQueue(prev =>
      prev.map(item => item.id === studentId ? { ...item, status: "Verified", pendingNode: "Approved by Nodal Officer ✓" } : item)
    );

    if (studentId === "ST-2025-OD-8921") {
      simulateAisheVerification();
    } else {
      showToast(`Student ${studentId} approved successfully by Admin.`, "success");
    }
  };

  const adminReject = (studentId, reason) => {
    setAdminQueue(prev =>
      prev.map(item => item.id === studentId ? { ...item, status: "Rejected", discrepancy: reason } : item)
    );
    showToast(`Student ${studentId} marked as Rejected.`, "error");
  };

  const adminManualReview = (studentId, reason) => {
    setAdminQueue(prev =>
      prev.map(item => item.id === studentId ? { ...item, status: "Manual Review", discrepancy: reason } : item)
    );
    showToast(`Flagged ${studentId} for Manual Nodal Review.`, "warning");
  };

  return (
    <ScholarshipContext.Provider
      value={{
        student,
        schemes,
        documents,
        verifications,
        dbtTimeline,
        addDocument,
        deleteDocument,
        replaceDocument,
        renewIncomeCertificate,
        reuseDocumentInApplication,
        simulateAisheVerification,
        disburseTranche2,
        previewDocument,
        setPreviewDocument,
        isScanningModalOpen,
        setIsScanningModalOpen,
        manualReviewModal,
        setManualReviewModal,
        adminQueue,
        adminMetrics,
        adminApprove,
        adminReject,
        adminManualReview,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarship = () => useContext(ScholarshipContext);
