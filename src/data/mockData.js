export const initialStudentData = {
  id: "ST-2025-OD-8921",
  name: "Aarav Hembram",
  hindiName: "आरव हेम्ब्रम",
  odiaName: "ଆରବ ହେମବ୍ରମ",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  gender: "Male",
  dob: "14 Oct 2004",
  age: 21,
  category: "ST",
  subTribe: "Santhal",
  pvtg: false, // Particularly Vulnerable Tribal Group
  domicileState: "Odisha",
  district: "Mayurbhanj",
  block: "Baripada",
  pincode: "757001",
  mobile: "+91 98765 43210",
  email: "aarav.hembram@nitrkl.ac.in",
  institute: "National Institute of Technology (NIT) Rourkela",
  instituteCode: "NITRKL",
  aisheCode: "U-0355",
  course: "B.Tech in Computer Science & Engineering",
  academicYear: "3rd Year (6th Semester)",
  rollNo: "123CS0482",
  cgpa: "8.64",
  bankDetails: {
    accountHolder: "Aarav Hembram",
    bankName: "State Bank of India (SBI)",
    branch: "NIT Campus Branch, Rourkela",
    accountNumber: "••••••••4821",
    ifsc: "SBIN0002109",
    aadhaarSeeded: true,
    npciMapperStatus: "Active",
    dbtEnabled: true,
  },
  family: {
    fatherName: "Biren Hembram",
    fatherOccupation: "Farmer / Agriculture",
    motherName: "Sumitra Hembram",
    motherOccupation: "Homemaker",
    annualIncome: 180000,
    incomeFormatted: "₹1,80,000",
    rationCardType: "BPL (Antyodaya Anna Yojana)",
    rationCardNo: "OD-MBJ-2021-88912",
  },
  activeSchemeId: "top-class",
  profileCompletion: 92,
  sanctionTotal: 125000,
  dbtDisbursed: 62500,
  dbtPending: 62500,
};

export const schemesData = [
  {
    id: "top-class",
    code: "MOTA-TC",
    name: "Top Class Education for ST Students",
    subtitle: "Financial support for world-class premier institutions (IITs, NITs, IIMs, AIIMS, NLUs)",
    ministry: "Ministry of Tribal Affairs (MoTA)",
    badge: "Active Enrolled",
    status: "In Progress (Tranche 2)",
    statusColor: "blue",
    level: "Higher Technical & Professional",
    sanctionAmount: 125000,
    sanctionFormatted: "₹1,25,000",
    disbursedAmount: 62500,
    disbursedFormatted: "₹62,500",
    progress: 75,
    nextAction: "Institute AISHE Attendance Validation Pending",
    deadline: "15 Apr 2026",
    benefits: [
      "Full tuition fee reimbursement (paid directly to institute)",
      "Living expenses allowance: ₹3,000 per month (₹36,000/yr)",
      "Books and stationery grant: ₹5,000 per annum",
      "One-time computer/laptop purchase allowance: ₹45,000"
    ],
    eligibility: {
      category: "Scheduled Tribe (ST)",
      incomeCeiling: "Family income up to ₹6,00,000 per annum",
      institution: "Admitted to 260 notified Top Class Institutes through open merit",
      criteriaMatch: 100
    },
    verificationStage: "AISHE Institute Node",
    applicationId: "MOTA/2025-26/TC-09821",
    appliedDate: "10 Oct 2025"
  },
  {
    id: "post-matric",
    code: "MOTA-PM",
    name: "Post-Matric Scholarship Scheme for STs",
    subtitle: "Centrally sponsored scheme for Class XI onwards to Doctoral studies",
    ministry: "Ministry of Tribal Affairs / Odisha State",
    badge: "Eligible to Re-apply",
    status: "Eligible (Available)",
    statusColor: "emerald",
    level: "Classes XI, XII, UG, PG",
    sanctionAmount: 38000,
    sanctionFormatted: "Up to ₹38,000/yr",
    disbursedAmount: 0,
    disbursedFormatted: "₹0",
    progress: 100,
    nextAction: "Auto-covered under Top Class (Higher Benefit Applied)",
    deadline: "30 Apr 2026",
    benefits: [
      "Maintenance allowance for Hostellers (₹13,500/yr) & Day Scholars (₹7,000/yr)",
      "Compulsory non-refundable fees covered",
      "Study tour and thesis typing charges up to ₹1,600",
      "Special allowances for ST students with disabilities"
    ],
    eligibility: {
      category: "ST Students",
      incomeCeiling: "Family income does not exceed ₹2,50,000 per annum",
      institution: "Any recognized Higher Secondary / College / University",
      criteriaMatch: 95
    },
    verificationStage: "State e-District Verified",
    applicationId: "MOTA/2024-25/PMS-44102",
    appliedDate: "Previous Academic Year"
  },
  {
    id: "pre-matric",
    code: "MOTA-PRE",
    name: "Pre-Matric Scholarship for ST Students",
    subtitle: "Support for ST students studying in Classes IX and X to minimize dropout",
    ministry: "Ministry of Tribal Affairs",
    badge: "Completed in School",
    status: "Completed (Past Record)",
    statusColor: "slate",
    level: "Class IX & X",
    sanctionAmount: 7000,
    sanctionFormatted: "₹7,000/yr",
    disbursedAmount: 7000,
    disbursedFormatted: "₹7,000 (Credited 2021)",
    progress: 100,
    nextAction: "Archived Historical Record",
    deadline: "Passed",
    benefits: [
      "Day scholar allowance of ₹3,500 per year",
      "Hosteller allowance of ₹7,000 per year",
      "Book allowance and contingency charges included"
    ],
    eligibility: {
      category: "ST Students in Class IX / X",
      incomeCeiling: "Parents' income not exceeding ₹2,50,000 per annum",
      institution: "Government / Aided / Recognized School",
      criteriaMatch: 100
    },
    verificationStage: "District Welfare Office Verified",
    applicationId: "MOTA/2020-21/PRE-10294",
    appliedDate: "15 Aug 2020"
  },
  {
    id: "nfst",
    code: "MOTA-NFST",
    name: "National Fellowship for Higher Education of STs (NFST)",
    subtitle: "Fellowships for ST candidates pursuing regular M.Phil and Ph.D. degrees",
    ministry: "Ministry of Tribal Affairs",
    badge: "Upcoming / Target",
    status: "Eligible for Post-Grad",
    statusColor: "purple",
    level: "M.Phil & Ph.D. Research",
    sanctionAmount: 524000,
    sanctionFormatted: "₹37,000 - ₹42,000/mo",
    disbursedAmount: 0,
    disbursedFormatted: "₹0",
    progress: 30,
    nextAction: "Qualify GATE / UGC-NET / Direct Ph.D. Admission",
    deadline: "31 Jul 2026",
    benefits: [
      "Junior Research Fellow (JRF): ₹37,000/month for first 2 years",
      "Senior Research Fellow (SRF): ₹42,000/month for remaining 3 years",
      "Contingency grant for Humanities & Social Sciences: ₹10,000/yr",
      "Contingency grant for Science, Engg & Tech: ₹20,000/yr",
      "HRA as per Central Govt norms"
    ],
    eligibility: {
      category: "ST Students registered for regular Ph.D./M.Phil",
      incomeCeiling: "No income bar for NFST (Merit-based)",
      institution: "UGC / AICTE / INI recognized institutions",
      criteriaMatch: 85
    },
    verificationStage: "UGC / MoTA Portal Integration",
    applicationId: "Available for 2026 Session",
    appliedDate: "Not Yet Applied"
  },
  {
    id: "nos",
    code: "MOTA-NOS",
    name: "National Overseas Scholarship (NOS) for STs",
    subtitle: "Financial assistance for meritorious ST students to pursue Master's and Ph.D. abroad",
    ministry: "Ministry of Tribal Affairs (International Division)",
    badge: "Global Window Open",
    status: "Applications Open (2026-27)",
    statusColor: "amber",
    level: "Master's & Ph.D. Abroad",
    sanctionAmount: 3500000,
    sanctionFormatted: "Up to ₹35,00,000 / $15,400/yr",
    disbursedAmount: 0,
    disbursedFormatted: "₹0",
    progress: 45,
    nextAction: "Submit GRE / IELTS & University Offer Letter",
    deadline: "31 May 2026",
    benefits: [
      "100% Tuition fee paid directly to foreign University",
      "Annual maintenance allowance: £9,900 (UK) or $15,400 (USA & Other)",
      "Return economy class airfare, visa fee, and medical insurance",
      "Poll tax, incidental journey expenses, and equipment allowance"
    ],
    eligibility: {
      category: "ST candidates under 35 years of age",
      incomeCeiling: "Family income less than ₹6,00,000 per annum",
      institution: "Top 500 QS / THE Ranked World Universities",
      criteriaMatch: 90
    },
    verificationStage: "MEA & MoTA Screening Board",
    applicationId: "MOTA/NOS/2026/DRAFT-091",
    appliedDate: "Application Draft Saved"
  }
];

export const digitalWalletDocuments = [
  {
    id: "doc-aadhaar",
    name: "Aadhaar Card",
    type: "Identity Proof",
    issuer: "Unique Identification Authority of India (UIDAI)",
    docNumber: "•••• •••• 8921",
    verified: true,
    verificationSource: "UIDAI e-KYC Server",
    issueDate: "12 Oct 2017",
    expiryDate: "Perpetual",
    isExpired: false,
    expiryAlert: null,
    ocrScore: 99.8,
    fileSize: "1.4 MB",
    fileType: "PDF (DigiLocker Signed)",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    qualityScore: {
      lighting: 98,
      clarity: 99,
      edges: 100,
      tamperCheck: "Passed (100% authentic)"
    },
    matchedFields: {
      name: "Aarav Hembram (100% Match)",
      dob: "14-10-2004 (100% Match)",
      gender: "Male"
    }
  },
  {
    id: "doc-caste",
    name: "ST Community Caste Certificate",
    type: "Category Proof",
    issuer: "Tahasildar Baripada, Dist. Mayurbhanj, Govt. of Odisha",
    docNumber: "ST/2021/MBJ/98214",
    verified: true,
    verificationSource: "Odisha e-District (Revenue Dept)",
    issueDate: "18 Jun 2021",
    expiryDate: "Lifetime / Permanent",
    isExpired: false,
    expiryAlert: null,
    ocrScore: 98.4,
    fileSize: "2.1 MB",
    fileType: "Digitally Signed PDF",
    previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    qualityScore: {
      lighting: 95,
      clarity: 98,
      edges: 97,
      tamperCheck: "Passed (Govt QR Verified)"
    },
    matchedFields: {
      tribe: "Santhal (Sl. No. 53 of ST Presidential Order)",
      state: "Odisha"
    }
  },
  {
    id: "doc-income",
    name: "Annual Family Income Certificate",
    type: "Financial Proof",
    issuer: "Revenue & Disaster Management Dept, Odisha",
    docNumber: "INC/2025/MBJ/44019",
    verified: true,
    verificationSource: "Odisha e-District Gateway",
    issueDate: "01 Apr 2025",
    expiryDate: "31 Mar 2026",
    isExpired: false,
    expiryAlert: "Expiring in 6 days! Tap to auto-renew via e-District",
    daysLeft: 6,
    ocrScore: 96.2,
    fileSize: "980 KB",
    fileType: "e-Signed PDF",
    previewUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    qualityScore: {
      lighting: 94,
      clarity: 96,
      edges: 95,
      tamperCheck: "Valid Digital Seal"
    },
    matchedFields: {
      annualIncome: "₹1,80,000",
      incomeCeilingStatus: "Below ₹2.5L and ₹6.0L Limits (Eligible)"
    }
  },
  {
    id: "doc-apaar",
    name: "APAAR / ABC Academic ID",
    type: "Academic Identity",
    issuer: "Ministry of Education / Academic Bank of Credits",
    docNumber: "9281-7712-4019",
    verified: true,
    verificationSource: "National Academic Depository (NAD)",
    issueDate: "05 Aug 2023",
    expiryDate: "Lifetime",
    isExpired: false,
    expiryAlert: null,
    ocrScore: 100.0,
    fileSize: "640 KB",
    fileType: "DigiLocker QR Card",
    previewUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    qualityScore: {
      lighting: 100,
      clarity: 100,
      edges: 100,
      tamperCheck: "Encrypted Block-Hash Matched"
    },
    matchedFields: {
      institution: "NIT Rourkela",
      creditsAccumulated: "118 Academic Credits"
    }
  },
  {
    id: "doc-domicile",
    name: "Resident / Domicile Certificate",
    type: "Residential Proof",
    issuer: "Sub-Collector Baripada, Odisha",
    docNumber: "DOM/2021/89120",
    verified: true,
    verificationSource: "State e-District DB",
    issueDate: "20 May 2021",
    expiryDate: "Permanent",
    isExpired: false,
    expiryAlert: null,
    ocrScore: 97.9,
    fileSize: "1.2 MB",
    fileType: "Government PDF",
    previewUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    qualityScore: {
      lighting: 96,
      clarity: 98,
      edges: 94,
      tamperCheck: "Passed"
    },
    matchedFields: {
      district: "Mayurbhanj",
      state: "Odisha"
    }
  },
  {
    id: "doc-marksheet",
    name: "Semester V Official Marksheet",
    type: "Academic Performance",
    issuer: "Dean (Academics), NIT Rourkela",
    docNumber: "NITRKL/GRD/2025/123CS0482",
    verified: true,
    verificationSource: "AISHE Institute Repository",
    issueDate: "10 Jan 2026",
    expiryDate: "Academic Record",
    isExpired: false,
    expiryAlert: null,
    ocrScore: 97.4,
    fileSize: "2.4 MB",
    fileType: "Institution Digitally Signed Transcript",
    previewUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    qualityScore: {
      lighting: 97,
      clarity: 98,
      edges: 96,
      tamperCheck: "Signed by Controller of Exams"
    },
    matchedFields: {
      sgpa: "8.80",
      cgpa: "8.64",
      backlogs: "0"
    }
  }
];

export const verificationPipeline = [
  {
    id: "uidai",
    step: 1,
    name: "UIDAI e-KYC",
    subtitle: "Aadhaar Demographics & Biometric Liveness",
    agency: "Unique Identification Authority of India",
    status: "Verified",
    timestamp: "12 Aug 2025, 11:24 AM",
    badge: "Real-time Verified",
    details: "Aadhaar authentication successful. Name, DOB, and Gender matched 100% with demographic registry.",
    mismatch: false,
    confidence: "99.8%",
    apiResponseTime: "420 ms"
  },
  {
    id: "digilocker",
    step: 2,
    name: "DigiLocker Ecosystem",
    subtitle: "Ministry of Electronics & IT Digital Vault",
    agency: "National e-Governance Division (NeGD)",
    status: "Verified",
    timestamp: "15 Aug 2025, 02:40 PM",
    badge: "Consent-linked Token",
    details: "6 mandatory certificates fetched directly from issuing repositories with tamper-proof cryptographic signatures.",
    mismatch: false,
    confidence: "100%",
    apiResponseTime: "680 ms"
  },
  {
    id: "apaar",
    step: 3,
    name: "APAAR / ABC Registry",
    subtitle: "One Nation One Student ID (Edu Ecosystem)",
    agency: "Ministry of Education & NAD",
    status: "Verified",
    timestamp: "22 Aug 2025, 09:15 AM",
    badge: "Credit Bank Synced",
    details: "Student identity linked to APAAR ID 9281-7712-4019. 118 academic credits logged under NIT Rourkela enrollment.",
    mismatch: false,
    confidence: "99.5%",
    apiResponseTime: "510 ms"
  },
  {
    id: "aishe",
    step: 4,
    name: "AISHE Institute Portal",
    subtitle: "NIT Rourkela Institutional Verification (Code: U-0355)",
    agency: "All India Survey on Higher Education / Nodal Desk",
    status: "Pending",
    timestamp: "Under Review by Nodal Desk",
    badge: "Action Required by Institute",
    details: "Awaiting Dean Academics & Institute Scholarship Nodal Officer confirmation for 6th Semester attendance & fee breakdown.",
    mismatch: false,
    confidence: "Pending Verification",
    apiResponseTime: "--",
    canSimulateVerify: true,
    nodalContact: "Prof. S. K. Mahapatra (Scholarship Nodal Officer, NITRKL)"
  },
  {
    id: "edistrict",
    step: 5,
    name: "State e-District Portal",
    subtitle: "Revenue & ST/SC Development Dept, Odisha",
    agency: "Govt of Odisha e-District Portal",
    status: "Verified",
    timestamp: "04 Sep 2025, 04:12 PM",
    badge: "Land & Caste Record Matched",
    details: "ST Santhal sub-tribe status and family income below ₹2.5L limit cross-verified against Mayurbhanj district land & revenue ledger.",
    mismatch: false,
    confidence: "98.9%",
    apiResponseTime: "890 ms"
  }
];

export const dbtTimelineStages = [
  {
    stage: 1,
    name: "Application Submitted",
    desc: "Application #MOTA/2025-26/TC-09821 successfully submitted with authenticated e-KYC documents.",
    timestamp: "10 Oct 2025, 10:45 AM",
    status: "completed",
    officer: "Aarav Hembram (Self-Submission)",
    refNumber: "APP-MOTA-982104"
  },
  {
    stage: 2,
    name: "Institute Verified",
    desc: "NIT Rourkela Scholarship Committee authenticated admission bonafide, fee structure, and regular enrollment.",
    timestamp: "28 Oct 2025, 03:15 PM",
    status: "completed",
    officer: "Prof. S. K. Mahapatra (Nodal Officer, NITRKL)",
    refNumber: "NITR/SCH/2025/VER-482"
  },
  {
    stage: 3,
    name: "State Welfare Approved",
    desc: "ST & SC Development Department, Govt of Odisha recommended the application for central Top Class quota.",
    timestamp: "15 Nov 2025, 11:20 AM",
    status: "completed",
    officer: "District Welfare Officer, Mayurbhanj",
    refNumber: "DWO/MBJ/2025/ST-771"
  },
  {
    stage: 4,
    name: "MoTA Sanction Order Issued",
    desc: "Ministry of Tribal Affairs Central Project Monitoring Unit sanctioned ₹1,25,000 for Academic Year 2025-26.",
    timestamp: "18 Dec 2025, 04:30 PM",
    status: "completed",
    officer: "Under Secretary to Govt of India (MoTA)",
    refNumber: "F.No.11014/19/2025-Scholarship"
  },
  {
    stage: 5,
    name: "PFMS Central Gateway Processed",
    desc: "Public Financial Management System validated Aadhaar NPCI mapper link with State Bank of India A/C ••••4821.",
    timestamp: "10 Jan 2026, 02:10 PM",
    status: "completed",
    officer: "PFMS Central Clearing Cell",
    refNumber: "PFMS-2026-MOTA-0912-B1"
  },
  {
    stage: 6,
    name: "Amount Credited via DBT",
    desc: "Tranche 1 (₹62,500) credited directly to bank account via APBS (Aadhaar Payment Bridge System). Tranche 2 scheduled upon semester attendance report.",
    timestamp: "14 Jan 2026, 05:42 PM",
    status: "completed",
    amount: "₹62,500",
    utr: "SBIN260149812901",
    bank: "State Bank of India (A/C ••••4821)",
    refNumber: "APBS-TXN-2026-78912",
    isFinal: true
  }
];

export const notificationsList = [
  {
    id: "notif-1",
    title: "DBT Payment Credited (Tranche 1)",
    message: "₹62,500 has been credited to your Aadhaar-linked SBI A/C ending in 4821 (UTR: SBIN260149812901).",
    type: "payment",
    category: "DBT",
    timestamp: "14 Jan 2026, 05:45 PM",
    read: false,
    highlight: true,
    actionLink: "/dbt"
  },
  {
    id: "notif-2",
    title: "Document Deficiency Alert: Income Certificate",
    message: "Your Family Income Certificate expires in 6 days (31 Mar 2026). Tap to trigger instant auto-renewal via Odisha e-District.",
    type: "warning",
    category: "Wallet",
    timestamp: "25 Sep 2026, 09:30 AM",
    read: false,
    highlight: true,
    actionLink: "/wallet"
  },
  {
    id: "notif-3",
    title: "AISHE Institute Verification Pending",
    message: "NIT Rourkela nodal officer has received your 6th semester fee requisition. Verification is scheduled this week.",
    type: "verification",
    category: "Verification",
    timestamp: "22 Sep 2026, 02:15 PM",
    read: false,
    highlight: false,
    actionLink: "/verification"
  },
  {
    id: "notif-4",
    title: "Top Class Scholarship Sanctioned",
    message: "Ministry of Tribal Affairs has officially sanctioned your Top Class Scholarship for ₹1,25,000 for AY 2025-26.",
    type: "success",
    category: "Sanction",
    timestamp: "18 Dec 2025, 04:35 PM",
    read: true,
    highlight: false,
    actionLink: "/scholarships/top-class"
  },
  {
    id: "notif-5",
    title: "Reminder: National Overseas Scholarship (NOS) Open",
    message: "Applications for 2026-27 cohort for Master's/Ph.D. abroad close on 31 May 2026. Review eligibility and draft your application.",
    type: "info",
    category: "Opportunity",
    timestamp: "10 Sep 2026, 11:00 AM",
    read: true,
    highlight: false,
    actionLink: "/scholarships/nos"
  },
  {
    id: "notif-6",
    title: "Aadhaar e-KYC Re-authenticated",
    message: "Your biometric e-KYC record with UIDAI is healthy and synced with the National Scholarship Portal database.",
    type: "success",
    category: "Security",
    timestamp: "12 Aug 2025, 11:30 AM",
    read: true,
    highlight: false,
    actionLink: "/verification"
  }
];

export const jagoKnowledgeBase = {
  eligibility: {
    title: "Eligibility Check for Aarav Hembram",
    answer: "Based on your verified credentials:\n\n• **Category**: Scheduled Tribe (Santhal) - **Eligible ✓**\n• **Family Income**: ₹1,80,000/yr (Well under the ₹2.5L PMS & ₹6.0L Top Class limits) - **Eligible ✓**\n• **Institute**: NIT Rourkela (Recognized under 260 Premier Top Class Institutes) - **Eligible ✓**\n• **Academic Record**: CGPA 8.64 (No active backlogs) - **Eligible ✓**\n\nYou are fully eligible and enrolled in the **Top Class Education Scheme**, and you will qualify for **NFST (Ph.D. Fellowship)** upon graduation.",
    chips: ["Why is AISHE pending?", "When will payment arrive?", "Check missing documents"]
  },
  pending: {
    title: "Why is your application currently pending?",
    answer: "Your application is **75% completed**! Here is the exact status:\n\n• **UIDAI, DigiLocker, APAAR & State e-District** verifications are all **Completed ✓**.\n• **Current Bottleneck**: **AISHE Institute Nodal Verification** (NIT Rourkela).\n• **Reason**: Semester VI institutional attendance report and term exam clearance are under routine sign-off by the NITRKL Scholarship Nodal Desk (Prof. S. K. Mahapatra).\n• **Expected Resolution**: 3 to 5 working days.",
    chips: ["Simulate Institute Approval", "View Verification Pipeline", "Contact Nodal Officer"]
  },
  missingDocs: {
    title: "Which documents are missing or need attention?",
    answer: "Good news: All 6 mandatory documents are already uploaded in your **Digital Wallet**!\n\n⚠️ **Urgent Action Required**:\n• **Income Certificate** (No: INC/2025/MBJ/44019) is valid until **31 Mar 2026** (6 days remaining).\n\n💡 **Solution**: You do not need to visit the Tehsil office! JanaShakti can auto-fetch your renewed certificate directly from the Odisha e-District portal using your Ration Card & Aadhaar consent.",
    chips: ["Renew Income Certificate", "Open Digital Wallet", "Run AI Document Health Check"]
  },
  paymentETA: {
    title: "When will your next DBT payment arrive?",
    answer: "Payment Status Breakdown:\n\n• **Tranche 1 (₹62,500)**: Credited successfully on **14 Jan 2026** to SBI A/C ••••4821 (UTR: SBIN260149812901).\n• **Tranche 2 (₹62,500)**: Scheduled for release via PFMS within **10-14 days** immediately after NIT Rourkela completes the pending AISHE node verification.\n\nYour Aadhaar is actively linked to NPCI mapper with DBT enabled.",
    chips: ["View DBT Timeline", "Check Bank Details", "Download Payment Receipt"]
  },
  explainNFST: {
    title: "National Fellowship for Higher Education of ST Students (NFST)",
    answer: "The **NFST Scheme** is a premier 100% Central Sector scholarship by the Ministry of Tribal Affairs for ST scholars pursuing regular M.Phil and Ph.D. degrees in India.\n\n**Key Benefits**:\n• **JRF Fellowship**: ₹37,000 per month for the first 2 years\n• **SRF Fellowship**: ₹42,000 per month for 3rd, 4th & 5th years\n• **Contingency Grant**: ₹20,000 per annum for Science & Engineering, ₹10,000 for Humanities\n• **House Rent Allowance (HRA)**: As per Central Government / University slabs\n• **Slots**: 750 new fellowships awarded annually across India.\n\nSince you are at NIT Rourkela with an 8.64 CGPA, you are an ideal candidate if you opt for direct Ph.D. or Master's research.",
    chips: ["Check NOS (Abroad)", "Am I eligible?", "Back to Home"]
  },
  explainNOS: {
    title: "National Overseas Scholarship (NOS) for ST Candidates",
    answer: "The **NOS Scheme** enables meritorious ST students to pursue Master's and Ph.D. degrees in prestigious universities abroad (US, UK, Germany, Canada, Australia, etc.).\n\n**Comprehensive Coverage**:\n• **100% Tuition Fees**: Paid directly to the foreign university by the Indian Embassy\n• **Annual Living Allowance**: $15,400 (USA and other countries) or £9,900 (UK)\n• **Air Travel**: Return economy class airfare\n• **Health Insurance, Visa Charges & Equipment Allowance** included\n• **Slots**: 20 ST scholars selected every academic year\n\n**Eligibility**: Age under 35 years, family income < ₹6,00,000/yr, minimum 60% in UG.",
    chips: ["Explain NFST", "Check Missing Documents", "Contact Support"]
  }
};
