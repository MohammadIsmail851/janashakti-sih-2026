import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useScholarship } from './ScholarshipContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { language, t } = useLanguage();
  const { student } = useScholarship();

  const getInitialGreeting = (lang) => {
    if (lang === 'hi') {
      return {
        id: "init-1",
        sender: "jago",
        text: "जोहार आरव! 🙏 मैं जागो (JAGO) हूँ, आपका जनजातीय कार्य मंत्रालय एआई सहायक।",
        subText: "मेरे पास आपके टॉप क्लास आवेदन, डिजिलॉकर क्रेडेंशियल्स और पीएफएमएस भुगतान कतार की वास्तविक समय जानकारी है।",
        timestamp: "अभी",
        chips: [
          "मेरा आवेदन लंबित क्यों है?",
          "भुगतान कब प्राप्त होगा?",
          "क्या मैं पात्र हूँ?",
          "कौन से दस्तावेज़ शेष हैं?",
          "एनएफएसटी समझाइए",
          "एनओएस क्या है?"
        ]
      };
    } else if (lang === 'te') {
      return {
        id: "init-1",
        sender: "jago",
        text: "జోహార్ ఆరవ్! 🙏 నేను జాగో (JAGO), గిరిజన వ్యవహారాల మంత్రిత్వ శాఖ AI సహాయకుడిని.",
        subText: "మీ టాప్ క్లాస్ దరఖాస్తు, డిజిలాకర్ ఆధారాలు మరియు PFMS చెల్లింపుల సమాచారం నా వద్ద అందుబాటులో ఉంది.",
        timestamp: "ఇప్పుడే",
        chips: [
          "నా దరఖాస్తు ఎందుకు పెండింగ్‌లో ఉంది?",
          "చెల్లింపు ఎప్పుడు అందుతుంది?",
          "నాకు అర్హత ఉందా?",
          "ఏ పత్రాలు మిగిలి ఉన్నాయి?",
          "NFST పథకాన్ని వివరించండి",
          "NOS గురించి చెప్పండి"
        ]
      };
    }

    return {
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
    };
  };

  const [chatMessages, setChatMessages] = useState([getInitialGreeting(language)]);

  // Update greeting when language changes if only initial message is present
  useEffect(() => {
    setChatMessages(prev => {
      if (prev.length <= 1) {
        return [getInitialGreeting(language)];
      }
      return prev;
    });
  }, [language]);

  const sendJagoMessage = (queryText) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, userMsg]);

    const qLower = queryText.toLowerCase();
    let reply = null;

    if (language === 'hi') {
      if (qLower.includes("लंबित") || qLower.includes("pending")) {
        reply = {
          title: "आपका आवेदन लंबित क्यों है?",
          answer: `आपका आवेदन **75% पूर्ण** है!\n\n• **यूआईडीएआई, डिजिलॉकर, अपार (APAAR) एवं ओडिशा ई-डिस्ट्रिक्ट** सत्यापन **सफल ✓** हैं।\n• **वर्तमान बिंदु**: **AISHE संस्थान नोडल सत्यापन** (${student.institute})।\n• **कारण**: सेमेस्टर VI नियमित उपस्थिति और परीक्षा रिपोर्ट संस्थान नोडल अधिकारी (प्रो. एस. के. महापात्रा) के पास समीक्षाधीन है।\n• **अनुमानित समय**: 3 से 5 कार्य दिवस।`,
          chips: ["नोडल अनुमोदन सिमुलेट करें", "सत्यापन पाइपलाइन देखें", "डीबीटी स्थिति"]
        };
      } else if (qLower.includes("भुगतान") || qLower.includes("payment") || qLower.includes("किस्त") || qLower.includes("कब")) {
        reply = {
          title: "डीबीटी छात्रवृत्ति भुगतान की स्थिति",
          answer: `भुगतान विवरण:\n\n• **किस्त 1 (₹62,500)**: **14 जनवरी 2026** को आपके भारतीय स्टेट बैंक (SBI) खाते ••••4821 में जमा की जा चुकी है (UTR: SBIN260149812901)।\n• **किस्त 2 (₹62,500)**: एनआईटी राउरकेला द्वारा AISHE सत्यापन पूर्ण होते ही 10-14 दिनों में पीएफएमएस द्वारा जारी की जाएगी।`,
          chips: ["डीबीटी समयरेखा देखें", "बैंक विवरण जांचें", "रसीद डाउनलोड करें"]
        };
      } else if (qLower.includes("पात्र") || qLower.includes("eligible")) {
        reply = {
          title: "आरव हेम्ब्रम की पात्रता विश्लेषण",
          answer: `आपके सत्यापित सरकारी रिकॉर्ड के आधार पर:\n\n• **श्रेणी**: अनुसूचित जनजाति (संथाल - Sl. 53) - **पात्र ✓**\n• **पारिवारिक आय**: ₹1,80,000/वर्ष (सीमा ₹6.0 लाख से काफी कम) - **पात्र ✓**\n• **संस्थान**: ${student.institute} (260 अधिसूचित टॉप क्लास संस्थानों में शामिल) - **पात्र ✓**\n• **सीजीपीए**: 8.64 (कोई बैकलॉग नहीं) - **पात्र ✓**\n\nआप **टॉप क्लास एजुकेशन स्कीम** में पूरी तरह पात्र और नामांकित हैं।`,
          chips: ["मेरा आवेदन लंबित क्यों है?", "दस्तावेज़ जांचें", "एनएफएसटी समझाइए"]
        };
      } else if (qLower.includes("दस्तावेज़") || qLower.includes("missing") || qLower.includes("certificate")) {
        reply = {
          title: "दस्तावेज़ स्थिति एवं कमी चेतावनी",
          answer: `आपके वॉलेट में सभी 6 अनिवार्य प्रमाण पत्र उपलब्ध हैं!\n\n⚠️ **कार्रवाई आवश्यक**:\n• **आय प्रमाण पत्र** (No: INC/2025/MBJ/44019) की वैधता **31 मार्च 2026** को समाप्त हो रही है (6 दिन शेष)।\n\n💡 **समाधान**: तहसील जाने की आवश्यकता नहीं है! जनशक्ति ओडिशा ई-डिस्ट्रिक्ट से एक क्लिक में इसे नवीनीकृत कर सकती है।`,
          chips: ["आय प्रमाण पत्र नवीनीकृत करें", "डिजिटल वॉलेट खोलें", "एआई स्कैन"]
        };
      } else {
        reply = {
          title: "जनजातीय छात्रवृत्ति मार्गदर्शन",
          answer: `मैंने आपका प्रश्न समझा: "${queryText}". आपके ${student.institute} में अध्ययनरत होने और एसटी संथाल श्रेणी के अनुसार सभी 5 योजनाओं की जानकारी उपलब्ध है। कृपया नीचे दिए गए विकल्पों में से चुनें।`,
          chips: ["मेरा आवेदन लंबित क्यों है?", "भुगतान कब प्राप्त होगा?", "क्या मैं पात्र हूँ?", "एनएफएसटी समझाइए"]
        };
      }
    } else if (language === 'te') {
      if (qLower.includes("పెండింగ్") || qLower.includes("pending")) {
        reply = {
          title: "మీ దరఖాస్తు ఎందుకు పెండింగ్‌లో ఉంది?",
          answer: `మీ దరఖాస్తు **75% పూర్తయింది**!\n\n• **UIDAI, డిజిలాకర్, APAAR మరియు రాష్ట్ర ఇ-డిస్ట్రిక్ట్** ధృవీకరణలు **విజయవంతం ✓** అయ్యాయి.\n• **ప్రస్తుత దశ**: **AISHE ఇన్స్టిట్యూట్ నోడల్ ధృవీకరణ** (${student.institute}).\n• **కారణం**: 6వ సెమిస్టర్ హాజరు నివేదిక నోడల్ అధికారి వద్ద పరిశీలనలో ఉంది.\n• **పరిష్కార సమయం**: 3 నుండి 5 పనిదినాలు.`,
          chips: ["నోడల్ ఆమోదం అనుకరించండి", "పైప్‌లైన్ చూడండి", "చెల్లింపు సమాచారం"]
        };
      } else if (qLower.includes("చెల్లింపు") || qLower.includes("payment") || qLower.includes("ఎప్పుడు")) {
        reply = {
          title: "DBT స్కాలర్‌షిప్ చెల్లింపు స్థితి",
          answer: `చెల్లింపుల వివరాలు:\n\n• **మొదటి విడత (₹62,500)**: **14 జనవరి 2026** న మీ SBI ఖాతా ••••4821 లో విజయవంతంగా జమ చేయబడింది (UTR: SBIN260149812901).\n• **రెండవ విడత (₹62,500)**: NIT రూర్కెలా AISHE ఆమోదం తర్వాత 10-14 రోజుల్లో విడుదల చేయబడుతుంది.`,
          chips: ["DBT కాలక్రమం", "బ్యాంక్ వివరాలు", "రసీదు పొందండి"]
        };
      } else if (qLower.includes("అర్హత") || qLower.includes("eligible")) {
        reply = {
          title: "ఆరవ్ హెంబ్రమ్ అర్హత విశ్లేషణ",
          answer: `మీ ధృవీకరించబడిన ఆధారాల ప్రకారం:\n\n• **వర్గం**: షెడ్యూల్డ్ తెగ (సంతాల్) - **అర్హులు ✓**\n• **కుటుంబ ఆదాయం**: ₹1,80,000/సంవత్సరం (పరిమితి ₹6.0 లక్షల లోపే) - **అర్హులు ✓**\n• **విద్యాసంస్థ**: ${student.institute} (టాప్ క్లాస్ విద్యాసంస్థ) - **అర్హులు ✓**\n• **CGPA**: 8.64 - **అర్హులు ✓**\n\nమీరు **టాప్ క్లాస్ ఎడ్యుకేషన్ స్కీమ్** కు పూర్తిగా అర్హులు.`,
          chips: ["దరఖాస్తు స్థితి", "పత్రాల తనిఖీ", "NFST వివరాలు"]
        };
      } else {
        reply = {
          title: "గిరిజన స్కాలర్‌షిప్ మార్గదర్శి",
          answer: `మీ ప్రశ్న అందింది: "${queryText}". ${student.institute} విద్యార్థిగా మీ ప్రొఫైల్ వివరాల ఆధారంగా మీకు మార్గదర్శనం చేయగలను.`,
          chips: ["నా దరఖాస్తు ఎందుకు పెండింగ్‌లో ఉంది?", "చెల్లింపు ఎప్పుడు అందుతుంది?", "నాకు అర్హత ఉందా?"]
        };
      }
    } else {
      // English
      if (qLower.includes("pending") || qLower.includes("why is my application")) {
        reply = {
          title: "Why is your application currently pending?",
          answer: `Your application is **75% completed**!\n\n• **UIDAI, DigiLocker, APAAR & State e-District** verifications are all **Completed ✓**.\n• **Current Bottleneck**: **AISHE Institute Nodal Verification** (${student.institute}).\n• **Reason**: Semester VI institutional attendance report and term exam clearance are under routine sign-off by the NITRKL Scholarship Nodal Desk (Prof. S. K. Mahapatra).\n• **Expected Resolution**: 3 to 5 working days.`,
          chips: ["Simulate Institute Approval", "View Verification Pipeline", "DBT Status"]
        };
      } else if (qLower.includes("payment") || qLower.includes("when will") || qLower.includes("tranche") || qLower.includes("money")) {
        reply = {
          title: "When will your next DBT payment arrive?",
          answer: `Payment Status Breakdown:\n\n• **Tranche 1 (₹62,500)**: Credited successfully on **14 Jan 2026** to SBI A/C ••••4821 (UTR: SBIN260149812901).\n• **Tranche 2 (₹62,500)**: Scheduled for release via PFMS within **10-14 days** immediately after NIT Rourkela completes the pending AISHE node verification.\n\nYour Aadhaar is actively linked to NPCI mapper with DBT enabled.`,
          chips: ["View DBT Timeline", "Check Bank Details", "Download Payment Receipt"]
        };
      } else if (qLower.includes("eligible") || qLower.includes("am i eligible")) {
        reply = {
          title: "Eligibility Check for Aarav Hembram",
          answer: `Based on your verified credentials:\n\n• **Category**: Scheduled Tribe (Santhal) - **Eligible ✓**\n• **Family Income**: ₹1,80,000/yr (Well under the ₹2.5L PMS & ₹6.0L Top Class limits) - **Eligible ✓**\n• **Institute**: ${student.institute} (Recognized under 260 Premier Top Class Institutes) - **Eligible ✓**\n• **Academic Record**: CGPA 8.64 (No active backlogs) - **Eligible ✓**\n\nYou are fully eligible and enrolled in the **Top Class Education Scheme**, and you will qualify for **NFST (Ph.D. Fellowship)** upon graduation.`,
          chips: ["Why is AISHE pending?", "When will payment arrive?", "Check missing documents"]
        };
      } else if (qLower.includes("missing") || qLower.includes("document") || qLower.includes("deficiency")) {
        reply = {
          title: "Which documents are missing or need attention?",
          answer: `Good news: All 6 mandatory documents are already uploaded in your **Digital Wallet**!\n\n⚠️ **Urgent Action Required**:\n• **Income Certificate** (No: INC/2025/MBJ/44019) is valid until **31 Mar 2026** (6 days remaining).\n\n💡 **Solution**: You do not need to visit the Tehsil office! JanaShakti can auto-fetch your renewed certificate directly from the Odisha e-District portal using your Ration Card & Aadhaar consent.`,
          chips: ["Renew Income Certificate", "Open Digital Wallet", "Run AI Document Health Check"]
        };
      } else if (qLower.includes("nfst") || qLower.includes("fellowship") || qLower.includes("phd")) {
        reply = {
          title: "National Fellowship for Higher Education of ST Students (NFST)",
          answer: `The **NFST Scheme** is a premier 100% Central Sector scholarship by the Ministry of Tribal Affairs for ST scholars pursuing regular M.Phil and Ph.D. degrees in India.\n\n**Key Benefits**:\n• **JRF Fellowship**: ₹37,000 per month for the first 2 years\n• **SRF Fellowship**: ₹42,000 per month for 3rd, 4th & 5th years\n• **Contingency Grant**: ₹20,000 per annum for Science & Engineering\n• **Slots**: 750 new fellowships awarded annually across India.\n\nSince you are at ${student.institute} with an 8.64 CGPA, you are an ideal candidate if you opt for direct Ph.D. or Master's research.`,
          chips: ["Check NOS (Abroad)", "Am I eligible?", "Back to Home"]
        };
      } else if (qLower.includes("nos") || qLower.includes("overseas") || qLower.includes("abroad")) {
        reply = {
          title: "National Overseas Scholarship (NOS) for ST Candidates",
          answer: `The **NOS Scheme** enables meritorious ST students to pursue Master's and Ph.D. degrees in prestigious universities abroad (US, UK, Germany, Canada, Australia, etc.).\n\n**Comprehensive Coverage**:\n• **100% Tuition Fees**: Paid directly to the foreign university by the Indian Embassy\n• **Annual Living Allowance**: $15,400 (USA and other countries) or £9,900 (UK)\n• **Air Travel**: Return economy class airfare\n• **Health Insurance, Visa Charges & Equipment Allowance** included\n• **Slots**: 20 ST scholars selected every academic year`,
          chips: ["Explain NFST", "Check Missing Documents", "Contact Support"]
        };
      } else {
        reply = {
          title: "Tribal Scholarship Guidance",
          answer: `I understood you asked about: "${queryText}". As a tribal student enrolled at ${student.institute}, your profile is currently 92% complete with active Top Class sponsorship. Let me know which specific area you would like to explore.`,
          chips: ["Why is my application pending?", "When will payment arrive?", "Explain NFST", "Check missing documents"]
        };
      }
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
    }, 500);
  };

  return (
    <ChatContext.Provider value={{ chatMessages, sendJagoMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
