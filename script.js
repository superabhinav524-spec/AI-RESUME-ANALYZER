/**
 * ResumeAI PRO — Core Engine
 * Professional ATS Analyzer, Interactive Builder & Career Testing Suite
 */

// ========================================================
// Global State & Databases
// ========================================================

const APP_STATE = {
    currentResumeText: "",
    uploadedFileName: "",
    uploadedFileSize: 0,
    targetPosition: "Full Stack Developer",
    targetCompany: "Google",
    jobDescription: "",
    activeTab: "submit",
    activeInterviewCategory: "all",
    analysisData: null,
    builder: {
        personal: {
            fullName: "",
            email: "",
            phone: "",
            collegeEmail: "",
            rollNumber: "",
            location: "",
            linkedin: "",
            github: "",
            summary: ""
        },
        education: [],
        courses: "",
        skills: {
            languages: "",
            frameworks: "",
            tools: "",
            soft: ""
        },
        projects: [],
        experience: [],
        certifications: [],
        achievements: [],
        customSections: []
    }
};

// Comprehensive Industry Skill Taxonomy
const SKILL_TAXONOMY = {
    languages: [
        "python", "java", "javascript", "typescript", "c++", "c#", "c", "go", "golang", 
        "rust", "ruby", "php", "swift", "kotlin", "sql", "r", "html", "css", "bash", "shell"
    ],
    frameworks: [
        "react", "react.js", "next.js", "angular", "vue", "vue.js", "node.js", "express", 
        "express.js", "django", "flask", "fastapi", "spring boot", "spring", "asp.net", 
        ".net", "laravel", "rails", "ruby on rails", "tailwind css", "bootstrap", "graphql", "rest api"
    ],
    databases_cloud: [
        "mongodb", "postgresql", "postgres", "mysql", "redis", "elasticsearch", "sqlite", 
        "oracle", "cassandra", "firebase", "dynamodb", "aws", "amazon web services", 
        "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s", "ci/cd", "jenkins", 
        "github actions", "terraform", "linux", "git", "kafka", "rabbitmq", "nginx"
    ],
    concepts: [
        "data structures", "algorithms", "dsa", "object-oriented programming", "oops", 
        "system design", "microservices", "unit testing", "test-driven development", "tdd", 
        "machine learning", "deep learning", "nlp", "computer vision", "cybersecurity", 
        "agile", "scrum", "distributed systems", "restful api", "ci/cd pipeline"
    ]
};

// Role-Specific Benchmark Profiles
const ROLE_PROFILES = {
    "Full Stack Developer": {
        skills: ["javascript", "typescript", "react", "node.js", "express", "sql", "mongodb", "postgresql", "git", "docker", "rest api", "html", "css"],
        description: "Seeking a Full Stack Developer proficient in React, Node.js, TypeScript, RESTful API design, database modeling (PostgreSQL/MongoDB), containerization with Docker, and CI/CD workflows."
    },
    "Frontend Engineer": {
        skills: ["javascript", "typescript", "react", "next.js", "html", "css", "tailwind css", "redux", "web performance", "responsive design", "git", "rest api"],
        description: "Looking for a Frontend Engineer with deep expertise in modern React, TypeScript, state management, CSS architecture, web performance optimization, and responsive cross-browser UI development."
    },
    "Backend Engineer": {
        skills: ["python", "java", "node.js", "go", "sql", "postgresql", "redis", "docker", "kubernetes", "system design", "microservices", "rest api", "aws", "git"],
        description: "Experienced Backend Engineer responsible for designing scalable microservices, low-latency APIs, relational database schemas, caching layers with Redis, and cloud infrastructure on AWS/GCP."
    },
    "Software Development Engineer (SDE)": {
        skills: ["data structures", "algorithms", "java", "c++", "python", "system design", "oops", "sql", "git", "multithreading", "distributed systems"],
        description: "SDE role focusing on strong computer science fundamentals, algorithm optimization, distributed systems architecture, clean object-oriented design, and high-performance computing."
    },
    "Data Scientist": {
        skills: ["python", "sql", "machine learning", "pandas", "numpy", "scikit-learn", "data visualization", "deep learning", "statistics", "r", "nlp"],
        description: "Seeking a Data Scientist capable of predictive modeling, feature engineering, hypothesis testing, machine learning pipelines, and translating large datasets into business intelligence."
    },
    "AI / Machine Learning Engineer": {
        skills: ["python", "machine learning", "deep learning", "pytorch", "tensorflow", "nlp", "computer vision", "docker", "mlops", "data structures", "git"],
        description: "ML Engineer to build, train, optimize, and deploy machine learning and LLM models to production environments with robust MLOps pipelines."
    },
    "DevOps & Cloud Engineer": {
        skills: ["docker", "kubernetes", "aws", "ci/cd", "terraform", "linux", "jenkins", "github actions", "bash", "monitoring", "ansible", "python"],
        description: "DevOps Engineer to lead cloud infrastructure automation (Terraform), Kubernetes cluster orchestration, continuous deployment pipelines, and observability monitoring."
    },
    "Cybersecurity Analyst": {
        skills: ["cybersecurity", "networking", "linux", "penetration testing", "vulnerability assessment", "security tools", "firewalls", "python", "siem", "incident response"],
        description: "Cybersecurity Analyst specializing in threat detection, vulnerability audits, network security monitoring, incident response protocols, and security compliance."
    },
    "Mobile App Developer (Flutter/React Native)": {
        skills: ["flutter", "react native", "dart", "javascript", "typescript", "ios", "android", "mobile ui", "rest api", "git", "state management"],
        description: "Mobile developer with hands-on experience building performant iOS and Android applications, native bridge integrations, offline caching, and responsive mobile interfaces."
    },
    "Product Manager": {
        skills: ["agile", "scrum", "product strategy", "user research", "roadmapping", "sql", "kpis", "a/b testing", "cross-functional collaboration", "data analytics"],
        description: "Product Manager to define product vision, conduct user research, prioritize sprint roadmaps with engineering teams, and drive metrics through A/B testing and data analytics."
    }
};

// Clichés & Weak Words to Replace
const WEAK_WORDS_MAP = [
    { weak: "hardworking", replacement: "Results-driven, executed with 99%+ deliverable reliability" },
    { weak: "quick learner", replacement: "Rapidly onboarded and delivered production features within [X] days" },
    { weak: "team player", replacement: "Cross-functionally partnered with product and engineering teams" },
    { weak: "responsible for", replacement: "Spearheaded / Architected / Directed end-to-end execution" },
    { weak: "helped with", replacement: "Engineered core modules and optimized throughput by [X]%" },
    { weak: "handled", replacement: "Managed and scaled operations supporting [X]+ active users" },
    { weak: "worked on", replacement: "Implemented and launched scalable full-stack features" },
    { weak: "good communication", replacement: "Synthesized technical designs for executive and client reviews" },
    { weak: "passionate about", replacement: "Demonstrated technical track record with [X] deployed projects" }
];

// Strong Action Verbs for Verification
const ACTION_VERBS = [
    "architected", "spearheaded", "engineered", "implemented", "developed", 
    "optimized", "streamlined", "designed", "deployed", "scaled", "automated", 
    "reduced", "accelerated", "orchestrated", "refactored", "integrated", 
    "launched", "maintained", "built", "authored", "resolved"
];

// ========================================================
// Initialization
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
    initDropzone();
    initTheme();
    initBuilderDefaults();
    
    // Set initial position presets
    const posInput = document.getElementById("targetPosition");
    if (posInput && posInput.value) {
        applyPositionPreset(posInput.value);
    }
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem("resume_ai_theme") || "theme-dark";
    document.body.className = savedTheme;
    
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            if (document.body.classList.contains("theme-light")) {
                document.body.classList.replace("theme-light", "theme-dark");
                localStorage.setItem("resume_ai_theme", "theme-dark");
            } else {
                document.body.classList.replace("theme-dark", "theme-light");
                localStorage.setItem("resume_ai_theme", "theme-light");
            }
        });
    }
}

// Tab Switching
function switchMainTab(tabName) {
    APP_STATE.activeTab = tabName;
    
    // Update nav tab active classes
    document.querySelectorAll(".nav-tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-view").forEach(view => {
        view.style.display = "none";
        view.classList.remove("active");
    });
    
    if (tabName === "submit") {
        document.getElementById("tabSubmitResume").classList.add("active");
        const view = document.getElementById("viewSubmitResume");
        view.style.display = "block";
        view.classList.add("active");
    } else if (tabName === "builder") {
        document.getElementById("tabMakeResume").classList.add("active");
        const view = document.getElementById("viewMakeResume");
        view.style.display = "block";
        view.classList.add("active");
    } else if (tabName === "analysis") {
        document.getElementById("tabAnalysis").classList.add("active");
        const view = document.getElementById("viewAnalysis");
        view.style.display = "block";
        view.classList.add("active");
    } else if (tabName === "preview") {
        document.getElementById("tabPreview").classList.add("active");
        const view = document.getElementById("viewPreview");
        view.style.display = "block";
        view.classList.add("active");
        renderResumeDocFromState();
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Input Method Toggle (Upload vs Paste)
function toggleInputMethod(method) {
    const uploadBtn = document.getElementById("segUploadBtn");
    const pasteBtn = document.getElementById("segPasteBtn");
    const uploadSection = document.getElementById("uploadInputSection");
    const pasteSection = document.getElementById("pasteInputSection");
    
    if (method === "upload") {
        uploadBtn.classList.add("active");
        pasteBtn.classList.remove("active");
        uploadSection.style.display = "block";
        pasteSection.style.display = "none";
    } else {
        pasteBtn.classList.add("active");
        uploadBtn.classList.remove("active");
        pasteSection.style.display = "block";
        uploadSection.style.display = "none";
    }
}

// Character counter for paste area
function updateResumeTextCount() {
    const text = document.getElementById("resumeText").value;
    const countSpan = document.getElementById("resumeTextCount");
    if (countSpan) {
        countSpan.textContent = `${text.length.toLocaleString()} characters`;
    }
}

// Preset Loader
function applyPositionPreset(roleName) {
    if (!roleName || !ROLE_PROFILES[roleName]) return;
    
    document.getElementById("targetPosition").value = roleName;
    const profile = ROLE_PROFILES[roleName];
    
    const jdEl = document.getElementById("jobDescription");
    if (jdEl && !jdEl.value.trim()) {
        jdEl.value = profile.description;
    }
}

function loadSampleJobDescription() {
    const targetRole = document.getElementById("targetPosition").value.trim() || "Full Stack Developer";
    const profile = ROLE_PROFILES[targetRole] || ROLE_PROFILES["Full Stack Developer"];
    document.getElementById("jobDescription").value = profile.description;
    showToast("Sample job description loaded!", "info");
}

// ========================================================
// File Upload & Client-Side Extraction (PDF, DOCX, TXT)
// ========================================================

function initDropzone() {
    const dropzone = document.getElementById("dropzone");
    if (!dropzone) return;
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        }, false);
    });
    
    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    });
}

function handleFileSelected(event) {
    const files = event.target.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

async function processFile(file) {
    const fileCard = document.getElementById("fileStatusCard");
    const nameEl = document.getElementById("selectedFileName");
    const metaEl = document.getElementById("selectedFileMeta");
    const statusEl = document.getElementById("fileParseStatus");
    
    nameEl.textContent = file.name;
    const sizeKB = Math.round(file.size / 1024);
    metaEl.textContent = `${file.type || 'Document'} • ${sizeKB} KB`;
    statusEl.textContent = "Extracting text contents...";
    statusEl.style.color = "var(--primary)";
    fileCard.style.display = "flex";
    
    APP_STATE.uploadedFileName = file.name;
    APP_STATE.uploadedFileSize = file.size;
    
    const ext = file.name.split('.').pop().toLowerCase();
    
    try {
        let extractedText = "";
        
        if (ext === "pdf") {
            extractedText = await extractTextFromPDF(file);
        } else if (ext === "docx") {
            extractedText = await extractTextFromDOCX(file);
        } else {
            // txt, md, json, etc.
            extractedText = await readAsTextFile(file);
        }
        
        if (extractedText && extractedText.trim().length > 30) {
            APP_STATE.currentResumeText = extractedText;
            document.getElementById("resumeText").value = extractedText;
            updateResumeTextCount();
            statusEl.textContent = `✓ Text extracted (${extractedText.length} chars). Ready to submit!`;
            statusEl.style.color = "var(--success)";
            showToast("Resume document parsed successfully!", "success");
        } else {
            throw new Error("Unable to extract readable text. File may be empty or an image-based scanned PDF.");
        }
    } catch (err) {
        console.error("File extraction error:", err);
        statusEl.textContent = "Extraction warning: Text may be partial. You can also paste text below.";
        statusEl.style.color = "var(--warning)";
        showToast("Could not parse all text automatically. Please verify or paste text.", "error");
    }
}

function readAsTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

async function extractTextFromPDF(file) {
    if (typeof pdfjsLib === "undefined") {
        return await readAsTextFile(file);
    }
    
    const arrayBuffer = await file.arrayBuffer();
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n\n";
    }
    
    return fullText;
}

async function extractTextFromDOCX(file) {
    if (typeof mammoth === "undefined") {
        return await readAsTextFile(file);
    }
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value;
}

function clearSelectedFile() {
    document.getElementById("resumeFile").value = "";
    document.getElementById("fileStatusCard").style.display = "none";
    APP_STATE.uploadedFileName = "";
    APP_STATE.uploadedFileSize = 0;
}

// ========================================================
// Primary Submit Action
// ========================================================

function submitAndAnalyzeResume() {
    let text = APP_STATE.currentResumeText;
    const pastedText = document.getElementById("resumeText").value.trim();
    
    if (pastedText.length > 0) {
        text = pastedText;
        APP_STATE.currentResumeText = text;
    }
    
    if (!text || text.length < 50) {
        showToast("Please upload a resume file or paste your resume text first!", "error");
        document.getElementById("resumeText").focus();
        return;
    }
    
    const pos = document.getElementById("targetPosition").value.trim() || "Full Stack Developer";
    const comp = document.getElementById("targetCompany").value.trim() || "Google";
    const jd = document.getElementById("jobDescription").value.trim();
    
    APP_STATE.targetPosition = pos;
    APP_STATE.targetCompany = comp;
    APP_STATE.jobDescription = jd;
    
    const submitBtn = document.getElementById("submitResumeBtn");
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>⏳ Analyzing ATS Metrics...</span>`;
    submitBtn.disabled = true;
    
    setTimeout(() => {
        try {
            const results = runComprehensiveATSAnalysis(text, pos, comp, jd);
            APP_STATE.analysisData = results;
            
            renderAnalysisDashboard(results);
            switchMainTab("analysis");
            showToast("Resume submitted and analyzed successfully!", "success");
        } catch (err) {
            console.error(err);
            showToast("Analysis encountered an issue: " + err.message, "error");
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }, 450);
}

// Load Sample Resume Text
function loadSampleResumeText() {
    const sample = `ALEX SHARMA
alex.sharma@gmail.com | +91 98765 43210 | Bengaluru, India | linkedin.com/in/alexsharma | github.com/alexsharma
College: Indian Institute of Technology | Roll No: 21BCSE104 | College Email: alex.s@college.edu.in

PROFESSIONAL SUMMARY
Results-driven Software Development Engineer with 2+ years of hands-on experience designing and deploying high-throughput full-stack web applications and scalable microservices. Proficient in TypeScript, React, Node.js, Python, PostgreSQL, and AWS cloud architectures.

EDUCATION
Bachelor of Technology in Computer Science and Engineering
Indian Institute of Technology (IIT) | 2021 - 2025
CGPA: 8.9 / 10.0
Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems (DBMS), Computer Networks, System Design.

TECHNICAL SKILLS
• Programming Languages: Python, JavaScript, TypeScript, C++, SQL, HTML5, CSS3
• Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS, Django
• Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, EC2, Lambda), Git, Linux
• Core CS: Object-Oriented Programming (OOP), RESTful APIs, CI/CD, Microservices

WORK EXPERIENCE & INTERNSHIPS
Software Engineer Intern — CloudScale Technologies (Bengaluru, India)
May 2024 - July 2024
• Architected and deployed 4 RESTful microservices using Node.js and PostgreSQL, reducing API latency by 32% for 45,000 daily active users.
• Engineered asynchronous caching layer with Redis, reducing database query load by 48% during peak traffic spikes.
• Automated CI/CD deployment pipelines using GitHub Actions and Docker, accelerating release cycle from 3 days to 4 hours.

Full Stack Web Intern — TechVentures Inc. (Remote)
Dec 2023 - Jan 2024
• Developed responsive client dashboard in React and Tailwind CSS, increasing user session engagement by 27%.
• Integrated Stripe payment gateway and webhook verification protocols handling over $50,000 in monthly simulated transactions.

PROJECTS
E-Commerce Microservices Platform | React, Node.js, MongoDB, Docker, AWS
• Designed scalable e-commerce infrastructure supporting real-time inventory synchronization with Redis and RabbitMQ.
• Implemented JWT authentication, role-based access control (RBAC), and automated unit tests with Jest achieving 88% code coverage.
• Deployed containers using Docker and AWS ECS, maintaining 99.9% uptime across stress testing benchmarks.

AI Resume & Job Matcher | Python, FastAPI, Scikit-learn, React
• Built natural language processing pipeline to score resumes against tech job descriptions with 94% parsing accuracy.
• Engineered cosine similarity matching algorithms and automated keyword extraction for 100+ technical skills.

CERTIFICATIONS
• AWS Certified Cloud Practitioner — Amazon Web Services (2024)
• Meta Front-End Developer Professional Certificate — Coursera (2023)

ACHIEVEMENTS
• Winner (1st Place / 120 teams): Smart India Hackathon 2024 for automated health analytics portal.
• Solved 500+ algorithmic problems on LeetCode (Knight Badge, Top 5% globally).`;

    document.getElementById("resumeText").value = sample;
    APP_STATE.currentResumeText = sample;
    updateResumeTextCount();
    toggleInputMethod("paste");
    showToast("Realistic sample resume loaded into text area!", "info");
}

// ========================================================
// ATS Analysis Engine
// ========================================================

function runComprehensiveATSAnalysis(resumeText, targetPosition, targetCompany, jobDescription) {
    const textLower = resumeText.toLowerCase();
    
    // 1. Contact & Identification (Max 15 pts)
    let contactScore = 0;
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
    const hasLinkedIn = textLower.includes("linkedin.com") || textLower.includes("linkedin");
    const hasGitHub = textLower.includes("github.com") || textLower.includes("github") || textLower.includes("portfolio");
    
    if (hasEmail) contactScore += 5;
    if (hasPhone) contactScore += 4;
    if (hasLinkedIn) contactScore += 3;
    if (hasGitHub) contactScore += 3;
    contactScore = Math.min(contactScore, 15);
    
    // 2. Section Architecture Completeness (Max 20 pts)
    let sectionsScore = 0;
    const sectionsFound = {
        summary: textLower.includes("summary") || textLower.includes("objective") || textLower.includes("profile"),
        education: textLower.includes("education") || textLower.includes("degree") || textLower.includes("university") || textLower.includes("college"),
        experience: textLower.includes("experience") || textLower.includes("internship") || textLower.includes("work history"),
        projects: textLower.includes("project") || textLower.includes("technical projects"),
        skills: textLower.includes("skill") || textLower.includes("technologies") || textLower.includes("competencies"),
        certifications: textLower.includes("certificate") || textLower.includes("certification") || textLower.includes("achievements") || textLower.includes("awards")
    };
    
    if (sectionsFound.summary) sectionsScore += 2;
    if (sectionsFound.education) sectionsScore += 4;
    if (sectionsFound.experience) sectionsScore += 5;
    if (sectionsFound.projects) sectionsScore += 4;
    if (sectionsFound.skills) sectionsScore += 3;
    if (sectionsFound.certifications) sectionsScore += 2;
    sectionsScore = Math.min(sectionsScore, 20);
    
    const totalSectionsCount = Object.values(sectionsFound).filter(Boolean).length;
    
    // 3. Role Keywords & Relevancy (Max 30 pts)
    const benchmarkProfile = ROLE_PROFILES[targetPosition] || ROLE_PROFILES["Full Stack Developer"];
    const requiredSkills = benchmarkProfile.skills;
    
    const jdWords = extractKeywordsFromJD(jobDescription);
    const combinedTargetKeywords = Array.from(new Set([...requiredSkills, ...jdWords]));
    
    const matchedSkills = [];
    const missingSkills = [];
    
    combinedTargetKeywords.forEach(kw => {
        if (textLower.includes(kw.toLowerCase())) {
            matchedSkills.push(kw);
        } else {
            missingSkills.push(kw);
        }
    });
    
    const matchPercentage = combinedTargetKeywords.length > 0 
        ? Math.round((matchedSkills.length / combinedTargetKeywords.length) * 100) 
        : 65;
        
    const keywordsScore = Math.round((matchPercentage / 100) * 30);
    
    // 4. Action Verbs & Quantified Impact (Max 20 pts)
    let impactScore = 0;
    const metricMatches = resumeText.match(/\b\d+(\.\d+)?%|\$\d+(,\d+)?|\b\d+\s*(users|active|teams|projects|days|hours|ms|latency|reduction|increase|improvement|growth|stars)\b/gi) || [];
    const impactCount = metricMatches.length;
    
    let actionVerbsFound = 0;
    ACTION_VERBS.forEach(verb => {
        if (textLower.includes(verb)) actionVerbsFound++;
    });
    
    if (impactCount >= 4) impactScore += 10;
    else if (impactCount >= 2) impactScore += 6;
    else if (impactCount >= 1) impactScore += 3;
    
    if (actionVerbsFound >= 5) impactScore += 10;
    else if (actionVerbsFound >= 3) impactScore += 6;
    else if (actionVerbsFound >= 1) impactScore += 3;
    impactScore = Math.min(impactScore, 20);
    
    // 5. Readability & Formatting (Max 15 pts)
    let formatScore = 0;
    const wordCount = resumeText.trim().split(/\s+/).length;
    if (wordCount >= 300 && wordCount <= 1100) {
        formatScore += 8;
    } else if (wordCount > 150) {
        formatScore += 4;
    }
    
    const bulletCount = (resumeText.match(/•|\*|- |\d+\./g) || []).length;
    if (bulletCount >= 6) formatScore += 7;
    else if (bulletCount >= 2) formatScore += 4;
    formatScore = Math.min(formatScore, 15);
    
    const overallScore = Math.min(100, contactScore + sectionsScore + keywordsScore + impactScore + formatScore);
    
    const detectedWeakPhrases = [];
    WEAK_WORDS_MAP.forEach(item => {
        if (textLower.includes(item.weak)) {
            detectedWeakPhrases.push(item);
        }
    });
    
    const suggestions = generateActionableSuggestions({
        overallScore,
        contactScore,
        sectionsScore,
        sectionsFound,
        impactCount,
        actionVerbsFound,
        missingSkills,
        detectedWeakPhrases,
        targetCompany,
        targetPosition,
        wordCount
    });
    
    const interviewQuestions = generateTailoredInterviewQuestions(resumeText, targetPosition, targetCompany, matchedSkills);
    const roadmap = generateCareerRoadmap(targetPosition, missingSkills);
    
    return {
        overallScore,
        matchPercentage,
        targetPosition,
        targetCompany,
        contactScore,
        sectionsScore,
        keywordsScore,
        impactScore,
        formatScore,
        impactCount,
        actionVerbsFound,
        totalSectionsCount,
        wordCount,
        matchedSkills,
        missingSkills,
        detectedWeakPhrases,
        suggestions,
        interviewQuestions,
        roadmap
    };
}

function extractKeywordsFromJD(jdText) {
    if (!jdText || jdText.length < 20) return [];
    const lower = jdText.toLowerCase();
    const found = [];
    
    Object.values(SKILL_TAXONOMY).forEach(skillList => {
        skillList.forEach(skill => {
            if (lower.includes(skill.toLowerCase())) {
                found.push(skill);
            }
        });
    });
    return Array.from(new Set(found));
}

function generateActionableSuggestions(ctx) {
    const list = [];
    
    if (ctx.missingSkills.length > 0) {
        const topMissing = ctx.missingSkills.slice(0, 4).join(", ");
        list.push({
            priority: "high",
            title: `Integrate High-Priority Missing Keywords (${topMissing})`,
            desc: `Your resume is currently missing key technical terms expected for ${ctx.targetPosition}. Incorporate these tools/frameworks naturally into your project descriptions or skills list.`
        });
    }
    
    if (ctx.impactCount < 3) {
        list.push({
            priority: "high",
            title: "Quantify Impact With Concrete Numbers & Metrics",
            desc: "Add measurable data to your work and projects (e.g. 'reduced latency by 35%', 'handled 10,000+ daily requests', 'improved conversion by 20%'). High-performing resumes use metrics in at least 50% of bullet points."
        });
    }
    
    if (ctx.detectedWeakPhrases.length > 0) {
        list.push({
            priority: "medium",
            title: "Replace Vague Clichés With High-Impact Verbs",
            desc: `Detected phrases like "${ctx.detectedWeakPhrases[0].weak}". Replace generic self-descriptions with active evidence of your accomplishments.`
        });
    }
    
    if (!ctx.sectionsFound.experience && !ctx.sectionsFound.projects) {
        list.push({
            priority: "high",
            title: "Add Dedicated Projects or Internship Section",
            desc: "Technical hiring filters heavily weigh hands-on projects and professional internships. Add at least two in-depth projects with GitHub links."
        });
    }
    
    if (ctx.actionVerbsFound < 4) {
        list.push({
            priority: "medium",
            title: "Start Every Bullet With a Strong Action Verb",
            desc: "Begin bullet points with words like 'Architected', 'Spearheaded', 'Optimized', or 'Streamlined' instead of passive phrases like 'Helped with' or 'Was responsible for'."
        });
    }
    
    if (ctx.targetCompany.toLowerCase().includes("google")) {
        list.push({
            priority: "medium",
            title: "Google Alignment: Highlight Large Scale & Algorithm Efficiency",
            desc: "Google ATS and hiring committees look for deep data structures proficiency, time/space complexity tradeoffs, and distributed system scalability."
        });
    } else if (ctx.targetCompany.toLowerCase().includes("amazon")) {
        list.push({
            priority: "medium",
            title: "Amazon Alignment: Emphasize Leadership Principles & Ownership",
            desc: "Frame project descriptions around Customer Obsession, Ownership, and Bias for Action with clear business impact."
        });
    } else if (ctx.targetCompany.toLowerCase().includes("tcs") || ctx.targetCompany.toLowerCase().includes("infosys")) {
        list.push({
            priority: "medium",
            title: "Enterprise Delivery Alignment: Detail SDLC & Testing Methodologies",
            desc: "Highlight production support, agile ceremonies, automated unit testing, and robust documentation."
        });
    }
    
    if (list.length === 0) {
        list.push({
            priority: "good",
            title: "Excellent Profile Structure & ATS Compatibility",
            desc: "Your resume meets top-tier executive ATS standards with strong section balance, quantifiable achievements, and modern technical keywords."
        });
    }
    
    return list;
}

function generateTailoredInterviewQuestions(resumeText, position, company, matchedSkills) {
    const questions = [];
    
    if (matchedSkills.includes("react") || matchedSkills.includes("next.js")) {
        questions.push({
            category: "technical",
            badge: "Technical • Frontend",
            company: company,
            text: "How do you optimize render cycles and manage state in large-scale React applications to prevent unnecessary re-renders?",
            hint: "Discuss React.memo, useMemo/useCallback, virtualized lists for heavy datasets, and SSR vs CSR hydration tradeoffs."
        });
    }
    
    if (matchedSkills.includes("node.js") || matchedSkills.includes("express")) {
        questions.push({
            category: "technical",
            badge: "Technical • Backend",
            company: company,
            text: "Explain how Node.js handles asynchronous I/O with the event loop. How do you prevent CPU-intensive tasks from blocking the server?",
            hint: "Mention libuv, worker threads, microtask queues, and delegating heavy workloads to background job workers."
        });
    }
    
    if (matchedSkills.includes("python") || matchedSkills.includes("machine learning")) {
        questions.push({
            category: "technical",
            badge: "Technical • AI / Data",
            company: company,
            text: "How do you handle model overfitting in production, and how do you evaluate model drift over time?",
            hint: "Discuss cross-validation, regularization (L1/L2), feature pruning, and monitoring data distribution changes."
        });
    }
    
    if (matchedSkills.includes("docker") || matchedSkills.includes("aws") || matchedSkills.includes("kubernetes")) {
        questions.push({
            category: "technical",
            badge: "Technical • Cloud & DevOps",
            company: company,
            text: `How would you architect a zero-downtime deployment pipeline for ${company}'s microservices using Docker and CI/CD?`,
            hint: "Discuss Blue/Green deployments, Canary rollouts, health check endpoints, and rollback automation."
        });
    }
    
    if (questions.length < 2) {
        questions.push({
            category: "technical",
            badge: "Technical • System Design",
            company: company,
            text: "How would you design a scalable distributed rate-limiter for high-traffic API gateways?",
            hint: "Explore Token Bucket vs Leaky Bucket algorithms, distributed Redis storage, and latency constraints."
        });
    }
    
    const compLower = company.toLowerCase();
    if (compLower.includes("amazon")) {
        questions.push({
            category: "company",
            badge: "Behavioral • Amazon LP",
            company: "Amazon",
            text: "Tell me about a time you had a strong disagreement with a teammate or lead regarding technical design. How did you handle Disagree and Commit?",
            hint: "Use the STAR method (Situation, Task, Action, Result) focusing on objective data over personal ego."
        });
    } else if (compLower.includes("google")) {
        questions.push({
            category: "company",
            badge: "Behavioral • Googleyness",
            company: "Google",
            text: "Describe an ambiguous project where requirements were undefined. How did you navigate uncertainty and prioritize deliverables?",
            hint: "Show collaborative initiative, iterative prototyping, and intellectual humility."
        });
    } else {
        questions.push({
            category: "company",
            badge: `Behavioral • ${company}`,
            company: company,
            text: `Why are you interested in joining ${company} specifically for the ${position} role, and how does your background align with our engineering culture?`,
            hint: "Connect your hands-on project experiences and curiosity directly with the company's core products and engineering scale."
        });
    }
    
    let projectTitle = "your most complex technical project";
    const projMatch = resumeText.match(/Project[s]?[:\s]+([^\n\r,•]+)/i);
    if (projMatch && projMatch[1] && projMatch[1].trim().length > 3) {
        projectTitle = `"${projMatch[1].trim()}"`;
    }
    
    questions.push({
        category: "project",
        badge: "Project Deep-Dive",
        company: company,
        text: `In ${projectTitle}, what was the most difficult architectural bottleneck you encountered, and how did you diagnose and resolve it?`,
        hint: "Walk through your debugging workflow: telemetry/profiling data, root-cause analysis, alternative approaches, and the final measured performance improvement."
    });
    
    questions.push({
        category: "project",
        badge: "Project Scale & Reliability",
        company: company,
        text: `If the traffic or user load on ${projectTitle} increased by 50x overnight, what components would break first, and how would you redesign them?`,
        hint: "Address database read/write bottlenecks (sharding/replication), asynchronous queues, CDN edge caching, and horizontal auto-scaling."
    });
    
    return questions;
}

function generateCareerRoadmap(position, missingSkills) {
    const missingStr = missingSkills.length > 0 ? missingSkills.slice(0, 3).join(", ") : "Advanced System Design";
    
    return [
        {
            phase: "Phase 1: Foundations & Core Mastery (0 - 3 Months)",
            title: `Solidify ${position} Core Stack & Engineering Best Practices`,
            desc: `Master core programming paradigms, Clean Code principles, and deep language internals. Focus on closing initial keyword gaps like ${missingStr}. Build 2 focused, standalone utilities.`
        },
        {
            phase: "Phase 2: Production Scale & System Architecture (3 - 6 Months)",
            title: "Build & Deploy Distributed End-to-End Applications",
            desc: "Architect a full-stack, containerized application with Docker, relational & NoSQL databases, caching layers (Redis), and automated test suites achieving >80% coverage."
        },
        {
            phase: "Phase 3: Cloud Infrastructure & DevOps Excellence (6 - 9 Months)",
            title: "Cloud Deployment, CI/CD Pipelines & Observability",
            desc: "Deploy services to AWS/GCP with automated GitHub Actions CI/CD workflows, Terraform infrastructure-as-code, and Prometheus/Grafana monitoring for production readiness."
        },
        {
            phase: "Phase 4: Industry Leadership & High-Caliber Hiring (9 - 12 Months)",
            title: "System Design Audits, Open Source Contributions & Mock Interviews",
            desc: "Conduct high-level distributed systems design prep (Microservices, Kafka, Caching, Sharding). Actively contribute to open-source codebases and complete targeted company interview simulations."
        }
    ];
}

// ========================================================
// Render Analysis Dashboard
// ========================================================

function renderAnalysisDashboard(data) {
    document.getElementById("emptyAnalysisState").style.display = "none";
    document.getElementById("analysisDashboard").style.display = "block";
    
    document.getElementById("analysisMetaLabel").textContent = 
        `Comprehensive Audit for ${data.targetPosition} at ${data.targetCompany}`;
    
    const badge = document.getElementById("reportScoreBadge");
    badge.textContent = `${data.overallScore}/100`;
    badge.style.display = "inline-block";
    
    document.getElementById("overallScoreVal").textContent = data.overallScore;
    
    const ring = document.getElementById("scoreRingProgress");
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (data.overallScore / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    
    const scoreBadge = document.getElementById("atsScoreBadge");
    scoreBadge.className = "badge-status";
    
    let ringColor = "#2563eb";
    if (data.overallScore >= 85) {
        scoreBadge.classList.add("badge-excellent");
        scoreBadge.textContent = "ATS Optimized";
        document.getElementById("scoreHeadline").textContent = "High Interview Probability";
        document.getElementById("scoreSubline").textContent = "Strong keyword density, formatting, and metrics.";
        ringColor = "#10b981";
    } else if (data.overallScore >= 70) {
        scoreBadge.classList.add("badge-good");
        scoreBadge.textContent = "Competitive";
        document.getElementById("scoreHeadline").textContent = "Solid Foundation, Minor Polish Needed";
        document.getElementById("scoreSubline").textContent = "Passes basic filters; add more impact metrics.";
        ringColor = "#38bdf8";
    } else if (data.overallScore >= 50) {
        scoreBadge.classList.add("badge-fair");
        scoreBadge.textContent = "Moderate Risk";
        document.getElementById("scoreHeadline").textContent = "Missing Essential Target Keywords";
        document.getElementById("scoreSubline").textContent = "May get flagged by aggressive ATS filters.";
        ringColor = "#f59e0b";
    } else {
        scoreBadge.classList.add("badge-poor");
        scoreBadge.textContent = "Needs Rework";
        document.getElementById("scoreHeadline").textContent = "Critical ATS Gaps Detected";
        document.getElementById("scoreSubline").textContent = "Missing major sections, action verbs, or keywords.";
        ringColor = "#ef4444";
    }
    ring.style.stroke = ringColor;
    
    document.getElementById("matchPercentVal").textContent = `${data.matchPercentage}%`;
    document.getElementById("targetRoleBadge").textContent = data.targetPosition;
    document.getElementById("matchBarFill").style.width = `${data.matchPercentage}%`;
    document.getElementById("companyContextName").textContent = data.targetCompany;
    
    document.getElementById("metricImpactVal").textContent = `${data.impactCount} metrics`;
    document.getElementById("metricActionVal").textContent = `${data.actionVerbsFound} verbs`;
    document.getElementById("metricWeakVal").textContent = `${data.detectedWeakPhrases.length} found`;
    document.getElementById("metricSectionsVal").textContent = `${data.totalSectionsCount} / 6`;
    
    document.getElementById("pillarContactScore").textContent = `${data.contactScore} / 15`;
    document.getElementById("pillarContactBar").style.width = `${(data.contactScore / 15) * 100}%`;
    
    document.getElementById("pillarSectionsScore").textContent = `${data.sectionsScore} / 20`;
    document.getElementById("pillarSectionsBar").style.width = `${(data.sectionsScore / 20) * 100}%`;
    
    document.getElementById("pillarKeywordsScore").textContent = `${data.keywordsScore} / 30`;
    document.getElementById("pillarKeywordsBar").style.width = `${(data.keywordsScore / 30) * 100}%`;
    
    document.getElementById("pillarImpactScore").textContent = `${data.impactScore} / 20`;
    document.getElementById("pillarImpactBar").style.width = `${(data.impactScore / 20) * 100}%`;
    
    document.getElementById("pillarFormatScore").textContent = `${data.formatScore} / 15`;
    document.getElementById("pillarFormatBar").style.width = `${(data.formatScore / 15) * 100}%`;
    
    const missingCont = document.getElementById("missingKeywordsContainer");
    missingCont.innerHTML = "";
    if (data.missingSkills.length === 0) {
        missingCont.innerHTML = `<span class="no-items">All core keywords identified! Great job.</span>`;
    } else {
        data.missingSkills.forEach(skill => {
            const chip = document.createElement("span");
            chip.className = "chip-missing";
            chip.textContent = `+ ${skill}`;
            missingCont.appendChild(chip);
        });
    }
    
    const matchedCont = document.getElementById("matchedKeywordsContainer");
    matchedCont.innerHTML = "";
    document.getElementById("matchedCountBadge").textContent = `${data.matchedSkills.length} Matched`;
    if (data.matchedSkills.length === 0) {
        matchedCont.innerHTML = `<span class="no-items">No role keywords matched yet.</span>`;
    } else {
        data.matchedSkills.forEach(skill => {
            const chip = document.createElement("span");
            chip.className = "chip-matched";
            chip.textContent = `✓ ${skill}`;
            matchedCont.appendChild(chip);
        });
    }
    
    const suggCont = document.getElementById("suggestionsListContainer");
    suggCont.innerHTML = "";
    data.suggestions.forEach(item => {
        const div = document.createElement("div");
        div.className = `suggestion-item priority-${item.priority}`;
        
        let icon = "💡";
        if (item.priority === "high") icon = "⚠️";
        else if (item.priority === "good") icon = "✅";
        
        div.innerHTML = `
            <div class="suggestion-icon">${icon}</div>
            <div class="suggestion-content">
                <div class="suggestion-title">${item.title}</div>
                <div class="suggestion-desc">${item.desc}</div>
            </div>
        `;
        suggCont.appendChild(div);
    });
    
    const weakBody = document.getElementById("weakPhrasesTableBody");
    weakBody.innerHTML = "";
    if (data.detectedWeakPhrases.length === 0) {
        weakBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center; color: var(--success); padding: 16px;">
                    ✓ Clean language! No clichés or passive filler words found.
                </td>
            </tr>
        `;
    } else {
        data.detectedWeakPhrases.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><span class="weak-pill">Detected</span></td>
                <td><strong>"${item.weak}"</strong></td>
                <td><span class="replacement-pill">Recommended</span> ${item.replacement}</td>
            `;
            weakBody.appendChild(tr);
        });
    }
    
    document.getElementById("interviewQuestionsSub").textContent = 
        `Customized for ${data.targetCompany} • ${data.targetPosition}`;
    renderInterviewQuestionsList(data.interviewQuestions, "all");
    
    document.getElementById("roadmapSub").textContent = 
        `Strategic progression path for ${data.targetPosition}`;
    const roadmapCont = document.getElementById("careerRoadmapContainer");
    roadmapCont.innerHTML = "";
    data.roadmap.forEach(step => {
        const item = document.createElement("div");
        item.className = "timeline-step";
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-phase">${step.phase}</div>
                <div class="timeline-title">${step.title}</div>
                <div class="timeline-desc">${step.desc}</div>
            </div>
        `;
        roadmapCont.appendChild(item);
    });
}

function switchInterviewCategory(cat) {
    APP_STATE.activeInterviewCategory = cat;
    document.querySelectorAll(".cat-pill").forEach(pill => pill.classList.remove("active"));
    event.target.classList.add("active");
    
    if (APP_STATE.analysisData) {
        renderInterviewQuestionsList(APP_STATE.analysisData.interviewQuestions, cat);
    }
}

function renderInterviewQuestionsList(questions, category) {
    const cont = document.getElementById("interviewQuestionsContainer");
    cont.innerHTML = "";
    
    const filtered = category === "all" ? questions : questions.filter(q => q.category === category);
    
    if (filtered.length === 0) {
        cont.innerHTML = `<div class="no-items" style="padding: 16px;">No questions in this category.</div>`;
        return;
    }
    
    filtered.forEach(q => {
        const card = document.createElement("div");
        card.className = "interview-q-card";
        card.innerHTML = `
            <div class="q-header">
                <span class="q-badge">${q.badge}</span>
                <span class="q-company-tag">${q.company}</span>
            </div>
            <div class="q-text">"${q.text}"</div>
            <div class="q-hint">💡 <strong>Strategy:</strong> ${q.hint}</div>
        `;
        cont.appendChild(card);
    });
}

function copyMissingKeywords() {
    if (!APP_STATE.analysisData || APP_STATE.analysisData.missingSkills.length === 0) {
        showToast("No missing keywords to copy!", "info");
        return;
    }
    const text = APP_STATE.analysisData.missingSkills.join(", ");
    navigator.clipboard.writeText(text).then(() => {
        showToast("Missing keywords copied to clipboard!", "success");
    }).catch(() => {
        showToast("Copied: " + text, "info");
    });
}

// ========================================================
// Interactive Resume Builder ("Make a Resume" option)
// ========================================================

function initBuilderDefaults() {
    addEducationItem();
    addProjectItem();
    addExperienceItem();
    addCertificationItem();
    addAchievementItem();
}

function appendCourse(courseName) {
    const input = document.getElementById("b_courses");
    if (!input) return;
    const current = input.value.trim();
    if (current.includes(courseName)) return;
    input.value = current ? `${current}, ${courseName}` : courseName;
    showToast(`Added ${courseName}`, "info");
}

let eduCount = 0;
function addEducationItem(data = {}) {
    eduCount++;
    const container = document.getElementById("educationListContainer");
    const div = document.createElement("div");
    div.className = "dynamic-item-card";
    div.id = `edu_card_${eduCount}`;
    
    div.innerHTML = `
        <div class="dynamic-item-top">
            <span class="item-index-label">Degree #${eduCount}</span>
            <button type="button" class="btn-icon-danger" onclick="removeDynamicItem('edu_card_${eduCount}')">✕ Remove</button>
        </div>
        <div class="grid-2-col">
            <div class="form-group">
                <label>Degree & Major <span class="required">*</span></label>
                <input type="text" class="b-edu-degree" placeholder="e.g. B.Tech in Computer Science and Engineering" value="${data.degree || ''}" required>
            </div>
            <div class="form-group">
                <label>University / College Name <span class="required">*</span></label>
                <input type="text" class="b-edu-school" placeholder="e.g. Indian Institute of Technology" value="${data.school || ''}" required>
            </div>
        </div>
        <div class="grid-2-col" style="margin-top: 12px;">
            <div class="form-group">
                <label>Graduation Year / Dates</label>
                <input type="text" class="b-edu-dates" placeholder="e.g. 2021 - 2025" value="${data.dates || ''}">
            </div>
            <div class="form-group">
                <label>CGPA / Percentage</label>
                <input type="text" class="b-edu-gpa" placeholder="e.g. 8.9 / 10.0 or 85%" value="${data.gpa || ''}">
            </div>
        </div>
    `;
    container.appendChild(div);
}

let projCount = 0;
function addProjectItem(data = {}) {
    projCount++;
    const container = document.getElementById("projectsListContainer");
    const div = document.createElement("div");
    div.className = "dynamic-item-card";
    div.id = `proj_card_${projCount}`;
    
    div.innerHTML = `
        <div class="dynamic-item-top">
            <span class="item-index-label">Project #${projCount}</span>
            <button type="button" class="btn-icon-danger" onclick="removeDynamicItem('proj_card_${projCount}')">✕ Remove</button>
        </div>
        <div class="grid-2-col">
            <div class="form-group">
                <label>Project Title <span class="required">*</span></label>
                <input type="text" class="b-proj-title" placeholder="e.g. Scalable Microservices E-Commerce" value="${data.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Technologies Used <span class="required">*</span></label>
                <input type="text" class="b-proj-tech" placeholder="e.g. React, Node.js, MongoDB, Docker, AWS" value="${data.tech || ''}" required>
            </div>
        </div>
        <div class="form-group" style="margin-top: 12px;">
            <label>Live Demo or GitHub Link</label>
            <input type="url" class="b-proj-link" placeholder="e.g. https://github.com/alex/ecommerce" value="${data.link || ''}">
        </div>
        <div class="form-group" style="margin-top: 12px;">
            <label>Key Accomplishments & Impact (1 bullet per line)</label>
            <textarea class="b-proj-bullets" rows="3" placeholder="• Architected asynchronous message queue handling 10k messages/sec with 99.9% uptime.&#10;• Reduced latency by 40% via Redis caching.">${data.bullets || ''}</textarea>
        </div>
    `;
    container.appendChild(div);
}

let expCount = 0;
function addExperienceItem(data = {}) {
    expCount++;
    const container = document.getElementById("experienceListContainer");
    const div = document.createElement("div");
    div.className = "dynamic-item-card";
    div.id = `exp_card_${expCount}`;
    
    div.innerHTML = `
        <div class="dynamic-item-top">
            <span class="item-index-label">Experience / Internship #${expCount}</span>
            <button type="button" class="btn-icon-danger" onclick="removeDynamicItem('exp_card_${expCount}')">✕ Remove</button>
        </div>
        <div class="grid-2-col">
            <div class="form-group">
                <label>Job / Internship Title <span class="required">*</span></label>
                <input type="text" class="b-exp-title" placeholder="e.g. Software Engineer Intern" value="${data.title || ''}">
            </div>
            <div class="form-group">
                <label>Company / Organization Name <span class="required">*</span></label>
                <input type="text" class="b-exp-company" placeholder="e.g. CloudScale Technologies" value="${data.company || ''}">
            </div>
        </div>
        <div class="grid-2-col" style="margin-top: 12px;">
            <div class="form-group">
                <label>Location / Mode</label>
                <input type="text" class="b-exp-location" placeholder="e.g. Bengaluru, India (or Remote)" value="${data.location || ''}">
            </div>
            <div class="form-group">
                <label>Dates / Duration</label>
                <input type="text" class="b-exp-dates" placeholder="e.g. May 2024 - July 2024" value="${data.dates || ''}">
            </div>
        </div>
        <div class="form-group" style="margin-top: 12px;">
            <label>Responsibilities & Quantified Impact (1 bullet per line)</label>
            <textarea class="b-exp-bullets" rows="3" placeholder="• Built 4 RESTful microservices reducing API latency by 32% for 45k users.&#10;• Automated CI/CD pipelines reducing deployment time from 3 days to 4 hours.">${data.bullets || ''}</textarea>
        </div>
    `;
    container.appendChild(div);
}

let certCount = 0;
function addCertificationItem(data = {}) {
    certCount++;
    const container = document.getElementById("certificationsListContainer");
    const div = document.createElement("div");
    div.className = "dynamic-item-card";
    div.id = `cert_card_${certCount}`;
    
    div.innerHTML = `
        <div class="dynamic-item-top">
            <span class="item-index-label">Certificate #${certCount}</span>
            <button type="button" class="btn-icon-danger" onclick="removeDynamicItem('cert_card_${certCount}')">✕ Remove</button>
        </div>
        <div class="grid-2-col">
            <div class="form-group">
                <label>Certificate Name</label>
                <input type="text" class="b-cert-name" placeholder="e.g. AWS Certified Cloud Practitioner" value="${data.name || ''}">
            </div>
            <div class="form-group">
                <label>Issuing Organization / Date</label>
                <input type="text" class="b-cert-org" placeholder="e.g. Amazon Web Services (2024)" value="${data.org || ''}">
            </div>
        </div>
    `;
    container.appendChild(div);
}

let achCount = 0;
function addAchievementItem(data = {}) {
    achCount++;
    const container = document.getElementById("achievementsListContainer");
    const div = document.createElement("div");
    div.className = "dynamic-item-card";
    div.id = `ach_card_${achCount}`;
    
    div.innerHTML = `
        <div class="dynamic-item-top">
            <span class="item-index-label">Achievement #${achCount}</span>
            <button type="button" class="btn-icon-danger" onclick="removeDynamicItem('ach_card_${achCount}')">✕ Remove</button>
        </div>
        <div class="form-group">
            <label>Achievement Description</label>
            <input type="text" class="b-ach-text" placeholder="e.g. Winner (1st Place / 120 teams): Smart India Hackathon 2024" value="${data.text || ''}">
        </div>
    `;
    container.appendChild(div);
}

let customCount = 0;
function addCustomSection(data = {}) {
    customCount++;
    const container = document.getElementById("customSectionsContainer");
    const div = document.createElement("div");
    div.className = "dynamic-item-card";
    div.id = `custom_card_${customCount}`;
    
    div.innerHTML = `
        <div class="dynamic-item-top">
            <span class="item-index-label">Custom Section #${customCount}</span>
            <button type="button" class="btn-icon-danger" onclick="removeDynamicItem('custom_card_${customCount}')">✕ Remove Section</button>
        </div>
        <div class="form-group">
            <label>Section Title <span class="required">*</span></label>
            <input type="text" class="b-custom-title" placeholder="e.g. Extracurricular Leadership, Publications, Languages, Patents" value="${data.title || ''}">
        </div>
        <div class="form-group" style="margin-top: 12px;">
            <label>Section Content / Bullets (1 item per line)</label>
            <textarea class="b-custom-bullets" rows="3" placeholder="• Lead organizer for annual College Technical Symposium (1,500+ attendees).&#10;• Authored research paper on Distributed Consensus algorithms.">${data.bullets || ''}</textarea>
        </div>
    `;
    container.appendChild(div);
}

function removeDynamicItem(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.remove();
}

function extractBuilderFormData() {
    const b = APP_STATE.builder;
    
    b.personal.fullName = document.getElementById("b_fullName").value.trim();
    b.personal.email = document.getElementById("b_email").value.trim();
    b.personal.phone = document.getElementById("b_phone").value.trim();
    b.personal.collegeEmail = document.getElementById("b_collegeEmail").value.trim();
    b.personal.rollNumber = document.getElementById("b_rollNumber").value.trim();
    b.personal.location = document.getElementById("b_location").value.trim();
    b.personal.linkedin = document.getElementById("b_linkedin").value.trim();
    b.personal.github = document.getElementById("b_github").value.trim();
    b.personal.summary = document.getElementById("b_summary").value.trim();
    
    b.education = [];
    document.querySelectorAll("#educationListContainer .dynamic-item-card").forEach(card => {
        const degree = card.querySelector(".b-edu-degree")?.value.trim();
        const school = card.querySelector(".b-edu-school")?.value.trim();
        const dates = card.querySelector(".b-edu-dates")?.value.trim();
        const gpa = card.querySelector(".b-edu-gpa")?.value.trim();
        if (degree || school) {
            b.education.push({ degree, school, dates, gpa });
        }
    });
    
    b.courses = document.getElementById("b_courses").value.trim();
    
    b.skills.languages = document.getElementById("b_skillsLanguages").value.trim();
    b.skills.frameworks = document.getElementById("b_skillsFrameworks").value.trim();
    b.skills.tools = document.getElementById("b_skillsTools").value.trim();
    b.skills.soft = document.getElementById("b_skillsSoft").value.trim();
    
    b.projects = [];
    document.querySelectorAll("#projectsListContainer .dynamic-item-card").forEach(card => {
        const title = card.querySelector(".b-proj-title")?.value.trim();
        const tech = card.querySelector(".b-proj-tech")?.value.trim();
        const link = card.querySelector(".b-proj-link")?.value.trim();
        const bullets = card.querySelector(".b-proj-bullets")?.value.trim();
        if (title || tech) {
            b.projects.push({ title, tech, link, bullets });
        }
    });
    
    b.experience = [];
    document.querySelectorAll("#experienceListContainer .dynamic-item-card").forEach(card => {
        const title = card.querySelector(".b-exp-title")?.value.trim();
        const company = card.querySelector(".b-exp-company")?.value.trim();
        const location = card.querySelector(".b-exp-location")?.value.trim();
        const dates = card.querySelector(".b-exp-dates")?.value.trim();
        const bullets = card.querySelector(".b-exp-bullets")?.value.trim();
        if (title || company) {
            b.experience.push({ title, company, location, dates, bullets });
        }
    });
    
    b.certifications = [];
    document.querySelectorAll("#certificationsListContainer .dynamic-item-card").forEach(card => {
        const name = card.querySelector(".b-cert-name")?.value.trim();
        const org = card.querySelector(".b-cert-org")?.value.trim();
        if (name || org) {
            b.certifications.push({ name, org });
        }
    });
    
    b.achievements = [];
    document.querySelectorAll("#achievementsListContainer .dynamic-item-card").forEach(card => {
        const text = card.querySelector(".b-ach-text")?.value.trim();
        if (text) {
            b.achievements.push({ text });
        }
    });
    
    b.customSections = [];
    document.querySelectorAll("#customSectionsContainer .dynamic-item-card").forEach(card => {
        const title = card.querySelector(".b-custom-title")?.value.trim();
        const bullets = card.querySelector(".b-custom-bullets")?.value.trim();
        if (title && bullets) {
            b.customSections.push({ title, bullets });
        }
    });
    
    return b;
}

function convertBuilderDataToText(data) {
    let t = "";
    const p = data.personal;
    
    t += `${p.fullName || 'RESUME CANDIDATE'}\n`;
    const contactParts = [p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean);
    t += `${contactParts.join(" • ")}\n`;
    
    if (p.rollNumber || p.collegeEmail) {
        t += `Student ID: ${p.rollNumber || 'N/A'} | College Email: ${p.collegeEmail || 'N/A'}\n`;
    }
    t += "\n";
    
    if (p.summary) {
        t += `PROFESSIONAL SUMMARY\n${p.summary}\n\n`;
    }
    
    if (data.education.length > 0) {
        t += `EDUCATION\n`;
        data.education.forEach(e => {
            t += `${e.degree} — ${e.school} (${e.dates || ''}) | CGPA: ${e.gpa || 'N/A'}\n`;
        });
        t += "\n";
    }
    
    if (data.courses) {
        t += `RELEVANT COURSEWORK\n${data.courses}\n\n`;
    }
    
    const s = data.skills;
    if (s.languages || s.frameworks || s.tools || s.soft) {
        t += `TECHNICAL SKILLS\n`;
        if (s.languages) t += `Languages: ${s.languages}\n`;
        if (s.frameworks) t += `Frameworks: ${s.frameworks}\n`;
        if (s.tools) t += `Tools & Databases: ${s.tools}\n`;
        if (s.soft) t += `Core Methodologies: ${s.soft}\n`;
        t += "\n";
    }
    
    if (data.experience.length > 0) {
        t += `EXPERIENCE & INTERNSHIPS\n`;
        data.experience.forEach(e => {
            t += `${e.title} at ${e.company} (${e.dates || ''}, ${e.location || ''})\n`;
            if (e.bullets) t += `${e.bullets}\n`;
        });
        t += "\n";
    }
    
    if (data.projects.length > 0) {
        t += `TECHNICAL PROJECTS\n`;
        data.projects.forEach(pr => {
            t += `${pr.title} (${pr.tech}) ${pr.link ? '— ' + pr.link : ''}\n`;
            if (pr.bullets) t += `${pr.bullets}\n`;
        });
        t += "\n";
    }
    
    if (data.certifications.length > 0) {
        t += `CERTIFICATIONS\n`;
        data.certifications.forEach(c => {
            t += `${c.name} — ${c.org}\n`;
        });
        t += "\n";
    }
    
    if (data.achievements.length > 0) {
        t += `ACHIEVEMENTS\n`;
        data.achievements.forEach(a => {
            t += `• ${a.text}\n`;
        });
        t += "\n";
    }
    
    if (data.customSections.length > 0) {
        data.customSections.forEach(cs => {
            t += `${cs.title.toUpperCase()}\n${cs.bullets}\n\n`;
        });
    }
    
    return t;
}

function submitBuiltResume() {
    const data = extractBuilderFormData();
    
    if (!data.personal.fullName || !data.personal.email) {
        showToast("Please provide at least your Full Name and Email Address!", "error");
        document.getElementById("b_fullName").focus();
        return;
    }
    
    const formattedText = convertBuilderDataToText(data);
    APP_STATE.currentResumeText = formattedText;
    document.getElementById("resumeText").value = formattedText;
    updateResumeTextCount();
    
    const pos = document.getElementById("targetPosition").value.trim() || "Full Stack Developer";
    const comp = document.getElementById("targetCompany").value.trim() || "Google";
    const jd = document.getElementById("jobDescription").value.trim();
    
    APP_STATE.targetPosition = pos;
    APP_STATE.targetCompany = comp;
    APP_STATE.jobDescription = jd;
    
    const results = runComprehensiveATSAnalysis(formattedText, pos, comp, jd);
    APP_STATE.analysisData = results;
    renderAnalysisDashboard(results);
    
    switchMainTab("analysis");
    showToast("Built resume submitted and evaluated in ATS Engine!", "success");
}

function previewBuiltResume() {
    extractBuilderFormData();
    switchMainTab("preview");
}

function loadBuilderSampleData() {
    document.getElementById("b_fullName").value = "Alex Sharma";
    document.getElementById("b_email").value = "alex.sharma@gmail.com";
    document.getElementById("b_phone").value = "+91 98765 43210";
    document.getElementById("b_collegeEmail").value = "alex.s@college.edu.in";
    document.getElementById("b_rollNumber").value = "21BCSE104";
    document.getElementById("b_location").value = "Bengaluru, India";
    document.getElementById("b_linkedin").value = "https://linkedin.com/in/alexsharma";
    document.getElementById("b_github").value = "https://github.com/alexsharma";
    document.getElementById("b_summary").value = "Results-driven Software Engineer with proven hands-on experience designing and deploying high-throughput full-stack web applications and scalable microservices. Proficient in TypeScript, React, Node.js, and AWS.";
    
    document.getElementById("b_courses").value = "Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, System Design";
    document.getElementById("b_skillsLanguages").value = "Python, JavaScript, TypeScript, C++, SQL, HTML5, CSS3";
    document.getElementById("b_skillsFrameworks").value = "React, Node.js, Express, Next.js, Django, Tailwind CSS";
    document.getElementById("b_skillsTools").value = "Docker, AWS (S3, EC2), PostgreSQL, MongoDB, Redis, Git, Linux";
    document.getElementById("b_skillsSoft").value = "Agile/Scrum, Problem Solving, Cross-Functional Collaboration";
    
    document.getElementById("educationListContainer").innerHTML = "";
    addEducationItem({
        degree: "B.Tech in Computer Science and Engineering",
        school: "Indian Institute of Technology (IIT)",
        dates: "2021 - 2025",
        gpa: "8.9 / 10.0"
    });
    
    document.getElementById("projectsListContainer").innerHTML = "";
    addProjectItem({
        title: "Microservices E-Commerce Infrastructure",
        tech: "React, Node.js, MongoDB, Redis, Docker, AWS",
        link: "https://github.com/alexsharma/ecommerce-platform",
        bullets: "• Architected 4 RESTful microservices with Node.js and Redis caching, cutting latency by 32% for 45k users.\n• Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle from 3 days to 4 hours."
    });
    addProjectItem({
        title: "AI Resume & ATS Job Matcher",
        tech: "Python, FastAPI, Scikit-learn, React",
        link: "https://github.com/alexsharma/resume-ai",
        bullets: "• Built NLP keyword extraction pipeline parsing tech resumes against job descriptions with 94% accuracy.\n• Engineered cosine similarity matching algorithms and automated weak-cliché detection."
    });
    
    document.getElementById("experienceListContainer").innerHTML = "";
    addExperienceItem({
        title: "Software Engineering Intern",
        company: "CloudScale Technologies",
        location: "Bengaluru, India",
        dates: "May 2024 - July 2024",
        bullets: "• Engineered real-time telemetry dashboard in React, increasing user engagement by 27%.\n• Designed PostgreSQL indexing optimizations, lowering database query load by 48%."
    });
    
    document.getElementById("certificationsListContainer").innerHTML = "";
    addCertificationItem({
        name: "AWS Certified Cloud Practitioner",
        org: "Amazon Web Services (2024)"
    });
    
    document.getElementById("achievementsListContainer").innerHTML = "";
    addAchievementItem({
        text: "Winner (1st Place / 120 teams): Smart India Hackathon 2024 for automated health telemetry portal."
    });
    addAchievementItem({
        text: "Solved 500+ algorithmic problems on LeetCode (Knight Badge, Top 5% globally)."
    });
    
    document.getElementById("customSectionsContainer").innerHTML = "";
    addCustomSection({
        title: "Extracurricular & Leadership",
        bullets: "• President, College Open Source Development Club (Organized 12 workshops for 600+ students).\n• Volunteer coding mentor at local STEM non-profit academy."
    });
    
    showToast("Complete professional tech sample loaded into builder!", "success");
}

function exportResumeJSON() {
    const data = extractBuilderFormData();
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", str);
    dlAnchor.setAttribute("download", `Resume_${data.personal.fullName || 'Data'}.json`);
    dlAnchor.click();
    showToast("Resume JSON exported!", "success");
}

function triggerImportResumeJSON() {
    document.getElementById("jsonFileInput").click();
}

function importResumeJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            populateBuilderFromJSON(data);
            showToast("Resume data imported successfully!", "success");
        } catch (err) {
            showToast("Invalid JSON file!", "error");
        }
    };
    reader.readAsText(file);
}

function populateBuilderFromJSON(d) {
    if (!d) return;
    const p = d.personal || {};
    document.getElementById("b_fullName").value = p.fullName || "";
    document.getElementById("b_email").value = p.email || "";
    document.getElementById("b_phone").value = p.phone || "";
    document.getElementById("b_collegeEmail").value = p.collegeEmail || "";
    document.getElementById("b_rollNumber").value = p.rollNumber || "";
    document.getElementById("b_location").value = p.location || "";
    document.getElementById("b_linkedin").value = p.linkedin || "";
    document.getElementById("b_github").value = p.github || "";
    document.getElementById("b_summary").value = p.summary || "";
    
    document.getElementById("b_courses").value = d.courses || "";
    
    const s = d.skills || {};
    document.getElementById("b_skillsLanguages").value = s.languages || "";
    document.getElementById("b_skillsFrameworks").value = s.frameworks || "";
    document.getElementById("b_skillsTools").value = s.tools || "";
    document.getElementById("b_skillsSoft").value = s.soft || "";
    
    if (Array.isArray(d.education) && d.education.length > 0) {
        document.getElementById("educationListContainer").innerHTML = "";
        d.education.forEach(e => addEducationItem(e));
    }
    
    if (Array.isArray(d.projects) && d.projects.length > 0) {
        document.getElementById("projectsListContainer").innerHTML = "";
        d.projects.forEach(pr => addProjectItem(pr));
    }
    
    if (Array.isArray(d.experience) && d.experience.length > 0) {
        document.getElementById("experienceListContainer").innerHTML = "";
        d.experience.forEach(exp => addExperienceItem(exp));
    }
    
    if (Array.isArray(d.certifications) && d.certifications.length > 0) {
        document.getElementById("certificationsListContainer").innerHTML = "";
        d.certifications.forEach(c => addCertificationItem(c));
    }
    
    if (Array.isArray(d.achievements) && d.achievements.length > 0) {
        document.getElementById("achievementsListContainer").innerHTML = "";
        d.achievements.forEach(a => addAchievementItem(a));
    }
    
    if (Array.isArray(d.customSections) && d.customSections.length > 0) {
        document.getElementById("customSectionsContainer").innerHTML = "";
        d.customSections.forEach(cs => addCustomSection(cs));
    }
}

// ========================================================
// Resume Sheet Standard Preview
// ========================================================

function renderResumeDocFromState() {
    const b = extractBuilderFormData();
    const p = b.personal;
    
    document.getElementById("docName").textContent = (p.fullName || "ALEX SHARMA").toUpperCase();
    
    const contactParts = [
        p.email || "alex.sharma@gmail.com",
        p.phone || "+91 98765 43210",
        p.location || "Bengaluru, India",
        p.linkedin ? p.linkedin.replace(/^https?:\/\//, '') : null,
        p.github ? p.github.replace(/^https?:\/\//, '') : null
    ].filter(Boolean);
    document.getElementById("docContactLine").textContent = contactParts.join(" • ");
    
    const studentMeta = document.getElementById("docStudentMeta");
    if (p.rollNumber || p.collegeEmail) {
        studentMeta.style.display = "block";
        document.getElementById("docRoll").textContent = p.rollNumber || "N/A";
        document.getElementById("docCollegeEmail").textContent = p.collegeEmail || "N/A";
    } else {
        studentMeta.style.display = "none";
    }
    
    const summarySec = document.getElementById("docSectionSummary");
    if (p.summary) {
        summarySec.style.display = "block";
        document.getElementById("docSummary").textContent = p.summary;
    } else {
        summarySec.style.display = "none";
    }
    
    const eduContainer = document.getElementById("docEducationEntries");
    eduContainer.innerHTML = "";
    if (b.education.length > 0) {
        b.education.forEach(e => {
            const entry = document.createElement("div");
            entry.className = "doc-entry";
            entry.innerHTML = `
                <div class="doc-entry-header">
                    <span class="doc-entry-title">${e.school || 'University'}</span>
                    <span class="doc-entry-date">${e.dates || ''}</span>
                </div>
                <div class="doc-entry-sub">
                    <span>${e.degree || 'Degree'}</span>
                    ${e.gpa ? `<span>CGPA: ${e.gpa}</span>` : ''}
                </div>
            `;
            eduContainer.appendChild(entry);
        });
    }
    
    const courseSec = document.getElementById("docSectionCourses");
    if (b.courses) {
        courseSec.style.display = "block";
        document.getElementById("docCourses").textContent = b.courses;
    } else {
        courseSec.style.display = "none";
    }
    
    const skillsRows = document.getElementById("docSkillsRows");
    skillsRows.innerHTML = "";
    const s = b.skills;
    const addSkillRow = (label, items) => {
        if (!items) return;
        const row = document.createElement("div");
        row.className = "skills-cat-row";
        row.innerHTML = `<span class="skills-cat-label">${label}: </span><span class="skills-cat-items">${items}</span>`;
        skillsRows.appendChild(row);
    };
    addSkillRow("Languages", s.languages);
    addSkillRow("Frameworks & Libraries", s.frameworks);
    addSkillRow("Tools, Cloud & Databases", s.tools);
    addSkillRow("Core Methodologies", s.soft);
    
    const expSec = document.getElementById("docSectionExperience");
    const expContainer = document.getElementById("docExperienceEntries");
    expContainer.innerHTML = "";
    if (b.experience.length > 0) {
        expSec.style.display = "block";
        b.experience.forEach(exp => {
            const entry = document.createElement("div");
            entry.className = "doc-entry";
            const bulletsArr = exp.bullets ? exp.bullets.split("\n").filter(Boolean) : [];
            const bulletsHTML = bulletsArr.map(line => `<li>${line.replace(/^[•*-]\s*/, '')}</li>`).join("");
            
            entry.innerHTML = `
                <div class="doc-entry-header">
                    <span class="doc-entry-title">${exp.title || 'Role'} — ${exp.company || 'Company'}</span>
                    <span class="doc-entry-date">${exp.dates || ''}</span>
                </div>
                ${exp.location ? `<div class="doc-entry-sub"><span>${exp.location}</span></div>` : ''}
                ${bulletsHTML ? `<ul class="doc-bullets">${bulletsHTML}</ul>` : ''}
            `;
            expContainer.appendChild(entry);
        });
    } else {
        expSec.style.display = "none";
    }
    
    const projContainer = document.getElementById("docProjectsEntries");
    projContainer.innerHTML = "";
    if (b.projects.length > 0) {
        b.projects.forEach(pr => {
            const entry = document.createElement("div");
            entry.className = "doc-entry";
            const bulletsArr = pr.bullets ? pr.bullets.split("\n").filter(Boolean) : [];
            const bulletsHTML = bulletsArr.map(line => `<li>${line.replace(/^[•*-]\s*/, '')}</li>`).join("");
            
            entry.innerHTML = `
                <div class="doc-entry-header">
                    <span class="doc-entry-title">${pr.title || 'Project'} | <span style="font-weight:400; font-size:0.82rem;">${pr.tech || ''}</span></span>
                    ${pr.link ? `<span class="doc-entry-date">${pr.link.replace(/^https?:\/\//, '')}</span>` : ''}
                </div>
                ${bulletsHTML ? `<ul class="doc-bullets">${bulletsHTML}</ul>` : ''}
            `;
            projContainer.appendChild(entry);
        });
    }
    
    const certSec = document.getElementById("docSectionCertifications");
    const certContainer = document.getElementById("docCertificationsEntries");
    certContainer.innerHTML = "";
    if (b.certifications.length > 0) {
        certSec.style.display = "block";
        const ul = document.createElement("ul");
        ul.className = "doc-bullets";
        b.certifications.forEach(c => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${c.name}</strong> — ${c.org}`;
            ul.appendChild(li);
        });
        certContainer.appendChild(ul);
    } else {
        certSec.style.display = "none";
    }
    
    const achSec = document.getElementById("docSectionAchievements");
    const achContainer = document.getElementById("docAchievementsEntries");
    achContainer.innerHTML = "";
    if (b.achievements.length > 0) {
        achSec.style.display = "block";
        const ul = document.createElement("ul");
        ul.className = "doc-bullets";
        b.achievements.forEach(a => {
            const li = document.createElement("li");
            li.textContent = a.text;
            ul.appendChild(li);
        });
        achContainer.appendChild(ul);
    } else {
        achSec.style.display = "none";
    }
    
    const customContainer = document.getElementById("docCustomSectionsEntries");
    customContainer.innerHTML = "";
    if (b.customSections.length > 0) {
        b.customSections.forEach(cs => {
            const sec = document.createElement("div");
            sec.className = "resume-doc-section";
            const bulletsArr = cs.bullets ? cs.bullets.split("\n").filter(Boolean) : [];
            const bulletsHTML = bulletsArr.map(line => `<li>${line.replace(/^[•*-]\s*/, '')}</li>`).join("");
            
            sec.innerHTML = `
                <h2 class="doc-section-title">${cs.title.toUpperCase()}</h2>
                ${bulletsHTML ? `<ul class="doc-bullets">${bulletsHTML}</ul>` : ''}
            `;
            customContainer.appendChild(sec);
        });
    }
}

// ========================================================
// Reports, Downloads & Print Actions
// ========================================================

function downloadReportText() {
    if (!APP_STATE.analysisData) {
        showToast("Run or submit a resume analysis first!", "error");
        return;
    }
    
    const d = APP_STATE.analysisData;
    let report = `===================================================================
RESUME AI PRO — EXECUTIVE ATS & CAREER AUDIT REPORT
Target Position: ${d.targetPosition}
Target Company:  ${d.targetCompany}
Generated At:    ${new Date().toLocaleString()}
===================================================================

[1] EXECUTIVE SCORE SUMMARY
-------------------------------------------------------------------
Overall ATS Composite Score: ${d.overallScore} / 100
Position Match Rate:         ${d.matchPercentage}%
Contact & Header Integrity:  ${d.contactScore} / 15
Section Completeness:        ${d.sectionsScore} / 20
Role Keyword Relevance:      ${d.keywordsScore} / 30
Quantified Metrics & Impact: ${d.impactScore} / 20
Readability & ATS Structure: ${d.formatScore} / 15

[2] KEYWORD MATCH ANALYSIS
-------------------------------------------------------------------
Matched Skills (${d.matchedSkills.length}):
${d.matchedSkills.map(s => `  ✓ ${s}`).join("\n")}

Missing Critical Keywords (${d.missingSkills.length}):
${d.missingSkills.map(s => `  ✗ ${s}`).join("\n")}

[3] ACTIONABLE SUGGESTIONS & RECOMMENDATIONS
-------------------------------------------------------------------
${d.suggestions.map((s, idx) => `${idx + 1}. [${s.priority.toUpperCase()}] ${s.title}\n   ${s.desc}`).join("\n\n")}

[4] DETECTED WEAK PHRASES & REPLACEMENTS
-------------------------------------------------------------------
${d.detectedWeakPhrases.length > 0 ? d.detectedWeakPhrases.map(w => `• Weak: "${w.weak}"\n  Replace With: ${w.replacement}`).join("\n\n") : "None detected. Strong action-oriented language used."}

[5] TAILORED INTERVIEW QUESTIONS (${d.targetCompany} - ${d.targetPosition})
-------------------------------------------------------------------
${d.interviewQuestions.map((q, idx) => `Q${idx + 1} (${q.badge}): ${q.text}\nStrategy Hint: ${q.hint}`).join("\n\n")}

[6] TARGETED CAREER ROADMAP
-------------------------------------------------------------------
${d.roadmap.map(r => `• ${r.phase}: ${r.title}\n  ${r.desc}`).join("\n\n")}

===================================================================
End of Report — ResumeAI Pro
===================================================================`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Resume_Audit_${d.targetCompany}_${d.targetPosition.replace(/\s+/g, '_')}.txt`;
    a.click();
    showToast("Audit report downloaded successfully!", "success");
}

function printReport() {
    window.print();
}

function printResumeDocument() {
    renderResumeDocFromState();
    window.print();
}

function openPhoneModal() {
    document.getElementById("phoneModal").style.display = "flex";
}

function closePhoneModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains("modal-close-btn") && !event.target.classList.contains("btn-primary")) {
        return;
    }
    document.getElementById("phoneModal").style.display = "none";
}

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    else if (type === "error") icon = "⚠️";
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
