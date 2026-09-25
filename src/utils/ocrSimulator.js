/**
 * Simulated AI Engine for JanaShakti:
 * - OCR Confidence & Metadata Extraction
 * - Document Quality Meter (Lighting, Clarity, Edge Bounds, Glare)
 * - Anti-Tamper & Duplicate Detection
 * - Automated Deficiency Predictor
 */

export const simulateAIAnalysis = async (fileName, docType, studentData) => {
  // Simulate realistic AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1400));

  const isIncome = docType.toLowerCase().includes('income') || fileName.toLowerCase().includes('income');
  const isCaste = docType.toLowerCase().includes('caste') || fileName.toLowerCase().includes('caste') || docType.toLowerCase().includes('st');
  const isAadhaar = docType.toLowerCase().includes('aadhaar') || fileName.toLowerCase().includes('aadhaar');

  const ocrScore = (95.5 + Math.random() * 4.2).toFixed(1);
  const lighting = Math.floor(92 + Math.random() * 7);
  const clarity = Math.floor(94 + Math.random() * 6);
  const edges = Math.floor(93 + Math.random() * 7);
  const compositeQuality = Math.round((lighting + clarity + edges) / 3);

  let extractedFields = {};
  let deficiencyDetected = null;

  if (isIncome) {
    extractedFields = {
      applicantName: studentData?.name || "Aarav Hembram",
      fatherName: studentData?.family?.fatherName || "Biren Hembram",
      annualIncomeReported: "₹1,80,000",
      issuingAuthority: "Tahasildar, Baripada (Govt of Odisha)",
      validTill: "31-03-2027",
      qrCodeAuthenticity: "VERIFIED_STATE_PORTAL"
    };
  } else if (isCaste) {
    extractedFields = {
      applicantName: studentData?.name || "Aarav Hembram",
      community: "Scheduled Tribe (ST)",
      subCaste: "Santhal",
      presidentialOrderSlNo: "53 (Odisha)",
      gazetteSync: "MATCHED_PERFECT"
    };
  } else {
    extractedFields = {
      documentTitle: docType,
      studentName: studentData?.name || "Aarav Hembram",
      institution: studentData?.institute || "NIT Rourkela",
      serialNumber: `DOC-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }

  return {
    success: true,
    ocrScore: parseFloat(ocrScore),
    qualityMeter: {
      composite: compositeQuality,
      lighting,
      clarity,
      edges,
      glareDetected: false,
      tamperCheckPassed: true,
      duplicateFound: false
    },
    extractedFields,
    deficiencyDetected,
    aiRecommendation: compositeQuality > 85 
      ? "Document quality is optimal for instant DigiLocker/e-District auto-approval."
      : "Acceptable quality, clear government emblem detected."
  };
};

export const evaluateScholarshipEligibility = (student, scheme) => {
  const annualIncome = student.family.annualIncome;
  const isST = student.category === "ST";
  const cgpa = parseFloat(student.cgpa || 8.0);

  if (!isST) {
    return {
      eligible: false,
      score: 0,
      reason: "Applicable only for Scheduled Tribe candidates as per MoTA guidelines."
    };
  }

  if (scheme.id === "pre-matric") {
    return {
      eligible: false,
      score: 100,
      reason: "Completed (Past Record). Applicable for school level Classes IX & X."
    };
  }

  if (scheme.id === "top-class") {
    const incomePass = annualIncome <= 600000;
    const institutePass = student.institute.includes("NIT") || student.institute.includes("IIT");
    return {
      eligible: incomePass && institutePass,
      score: 98,
      reason: "Enrolled in designated premier Top Class institute (NIT Rourkela) and family income is below ₹6.0L ceiling."
    };
  }

  if (scheme.id === "post-matric") {
    const incomePass = annualIncome <= 250000;
    return {
      eligible: incomePass,
      score: 95,
      reason: "Income ₹1,80,000 is well below the ₹2.5L PMS ceiling."
    };
  }

  if (scheme.id === "nfst") {
    return {
      eligible: true,
      score: 92,
      reason: "Eligible for Ph.D. fellowship in Science & Engineering upon completion of current B.Tech/Master's degree."
    };
  }

  if (scheme.id === "nos") {
    return {
      eligible: annualIncome <= 600000 && cgpa >= 6.0,
      score: 88,
      reason: "Eligible for overseas Master's/Ph.D. funding. Family income < ₹6L and CGPA > 60% criteria fulfilled."
    };
  }

  return { eligible: true, score: 90, reason: "Criteria satisfied." };
};
