import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialStudentData,
  schemesData,
  digitalWalletDocuments,
  verificationPipeline,
  dbtTimelineStages,
  notificationsList,
  jagoKnowledgeBase
} from '../data/mockData';
import { simulateAIAnalysis } from '../utils/ocrSimulator';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Session
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [hasCompletedSplash, setHasCompletedSplash] = useState(true);
  
  // Core Entities
  const [student, setStudent] = useState(initialStudentData);
  const [schemes, setSchemes] = useState(schemesData);
  const [documents, setDocuments] = useState(digitalWalletDocuments);
  const [verifications, setVerifications] = useState(verificationPipeline);
  const [dbtTimeline, setDbtTimeline] = useState(dbtTimelineStages);
  const [notifications, setNotifications] = useState(notificationsList);
  
  // App UI State
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'or'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [isScanningModalOpen, setIsScanningModalOpen] = useState(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      id: "init-1",
      sender: "jago",
      text: "Johar Aarav! 🙏 I am JAGO, your dedicated Ministry of Tribal Affairs AI Assistant.",
      subText: "I have real-time access to your Top Class application, DigiLocker credentials, and PFMS payment queue.",
      timestamp: "Just now",
      chips: [
        "Why is my application pending?",
        "When will payment arrive?",
        "Am I eligible?",
        "Which documents are missing?",
        "Explain NFST",
        "Explain NOS"
      ]
    }
  ]);

  // Unread notifications calculation
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Toast trigger
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Mark notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read", "info");
  };

  // Simulate pull-to-refresh
  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise(res => setTimeout(res, 850));
    setIsRefreshing(false);
    showToast("Synced live with MoTA Central Gateway & PFMS", "success");
  };

  // Auto-renew income certificate via e-District simulation
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

    // Remove notification deficiency
    setNotifications(prev =>
      prev.map(n => n.id === "notif-2" ? { ...n, read: true, highlight: false, title: "Income Certificate Renewed ✓" } : n)
    );

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // safe fallback
    }

    showToast("Income Certificate successfully renewed till 31 Mar 2027!", "success");
  };

  // Simulate Institute AISHE Verification
  const simulateAisheVerification = async () => {
    showToast("Simulating Institute Nodal Officer Sign-off...", "info");
    await new Promise(res => setTimeout(res, 1200));

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
            apiResponseTime: "310 ms",
            canSimulateVerify: false
          };
        }
        return v;
      })
    );

    // Update Top Class scheme status
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

    // Add celebration notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "AISHE Institute Verification Completed ✓",
      message: "NIT Rourkela Nodal Officer verified your attendance and fee claim. Tranche 2 release initiated.",
      type: "success",
      category: "Verification",
      timestamp: "Just now",
      read: false,
      highlight: true,
      actionLink: "/verification"
    };

    setNotifications(prev => [newNotif, ...prev]);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    showToast("AISHE Verification Approved by NIT Rourkela!", "success");
  };

  // Disburse Tranche 2
  const disburseTranche2 = async () => {
    showToast("Processing DBT Tranche 2 via PFMS APBS Gateway...", "info");
    await new Promise(res => setTimeout(res, 1400));

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

    const payNotif = {
      id: `notif-dbt-${Date.now()}`,
      title: "Tranche 2 Disbursed: ₹62,500 Credited!",
      message: "Total scholarship amount of ₹1,25,000 for AY 2025-26 has been 100% credited to your bank account.",
      type: "payment",
      category: "DBT",
      timestamp: "Just now",
      read: false,
      highlight: true,
      actionLink: "/dbt"
    };

    setNotifications(prev => [payNotif, ...prev]);

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) {}

    showToast("₹62,500 Tranche 2 Disbursed Successfully!", "success");
  };

  // Add Document via Upload Simulation
  const addNewDocument = async (docData) => {
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

  // Handle JAGO AI Question
  const sendJagoMessage = (queryText) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Match intent
    const qLower = queryText.toLowerCase();
    let reply = null;

    if (qLower.includes("pending") || qLower.includes("why is my application")) {
      reply = jagoKnowledgeBase.pending;
    } else if (qLower.includes("payment") || qLower.includes("when will") || qLower.includes("tranche") || qLower.includes("money")) {
      reply = jagoKnowledgeBase.paymentETA;
    } else if (qLower.includes("eligible") || qLower.includes("am i eligible")) {
      reply = jagoKnowledgeBase.eligibility;
    } else if (qLower.includes("missing") || qLower.includes("document") || qLower.includes("deficiency")) {
      reply = jagoKnowledgeBase.missingDocs;
    } else if (qLower.includes("nfst") || qLower.includes("fellowship") || qLower.includes("phd")) {
      reply = jagoKnowledgeBase.explainNFST;
    } else if (qLower.includes("nos") || qLower.includes("overseas") || qLower.includes("abroad")) {
      reply = jagoKnowledgeBase.explainNOS;
    } else {
      reply = {
        title: "Tribal Scholarship Guidance",
        answer: `I understood you asked about: "${queryText}". As a tribal student enrolled at ${student.institute}, your profile is currently 92% complete with active Top Class sponsorship. Let me know which specific area you would like to explore.`,
        chips: ["Why is my application pending?", "When will payment arrive?", "Explain NFST", "Check missing documents"]
      };
    }

    setTimeout(() => {
      const aiReplyMsg = {
        id: `jago-${Date.now()}`,
        sender: "jago",
        title: reply.title,
        text: reply.answer,
        chips: reply.chips,
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, aiReplyMsg]);
    }, 600);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        hasCompletedSplash,
        setHasCompletedSplash,
        student,
        setStudent,
        schemes,
        documents,
        verifications,
        dbtTimeline,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        language,
        setLanguage,
        isRefreshing,
        refreshData,
        renewIncomeCertificate,
        simulateAisheVerification,
        disburseTranche2,
        previewDocument,
        setPreviewDocument,
        isScanningModalOpen,
        setIsScanningModalOpen,
        addNewDocument,
        chatMessages,
        sendJagoMessage,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
