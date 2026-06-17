// Skills Database
const skills = [
    "python",
    "java",
    "javascript",
    "html",
    "css",
    "react",
    "node.js",
    "sql",
    "mysql",
    "mongodb",
    "docker",
    "aws",
    "git",
    "machine learning",
    "data structures",
    "cybersecurity",
    "c++",
    "php",
    "linux",
    "cloud computing"
];

// Get Resume Text
function getResumeText() {
    return document.getElementById("resumeText")
        .value
        .toLowerCase();
}

// Get Job Description
function getJobDescription() {
    return document.getElementById("jobDescription")
        .value
        .toLowerCase();
}

// ATS Score Calculator
function calculateATS() {

    let resume = getResumeText();

    let score = 0;

    if (resume.includes("@")) score += 15;
    if (resume.includes("project")) score += 20;
    if (resume.includes("education")) score += 15;
    if (resume.includes("experience")) score += 20;
    if (resume.includes("certificate")) score += 10;

    let skillCount = 0;

    skills.forEach(skill => {
        if (resume.includes(skill)) {
            skillCount++;
        }
    });

    score += Math.min(skillCount * 2, 20);

    document.getElementById("atsResult")
        .innerHTML =
        `ATS Score: ${score}/100`;
}

// Resume vs Job Description Match
function matchJob() {

    let resume = getResumeText();
    let job = getJobDescription();

    let total = 0;
    let matched = 0;

    skills.forEach(skill => {

        if (job.includes(skill)) {

            total++;

            if (resume.includes(skill)) {
                matched++;
            }
        }
    });

    let percentage = 0;

    if (total > 0) {
        percentage =
            Math.round(
                (matched / total) * 100
            );
    }

    document.getElementById(
        "matchResult"
    ).innerHTML =
        `Job Match Score: ${percentage}%`;
}

// Missing Skills
function findMissingSkills() {

    let resume = getResumeText();
    let job = getJobDescription();

    let list =
        document.getElementById(
            "missingSkills"
        );

    list.innerHTML = "";

    skills.forEach(skill => {

        if (
            job.includes(skill) &&
            !resume.includes(skill)
        ) {

            let li =
                document.createElement("li");

            li.textContent = skill;

            list.appendChild(li);
        }
    });
}

// Suggestions
function generateSuggestions() {

    let resume = getResumeText();

    let list =
        document.getElementById(
            "suggestions"
        );

    list.innerHTML = "";

    const suggestions = [];

    if (!resume.includes("project")) {
        suggestions.push(
            "Add more technical projects."
        );
    }

    if (!resume.includes("certificate")) {
        suggestions.push(
            "Include certifications."
        );
    }

    if (!resume.includes("intern")) {
        suggestions.push(
            "Mention internship experience."
        );
    }

    if (
        !resume.includes("developed") &&
        !resume.includes("designed")
    ) {
        suggestions.push(
            "Use action verbs like Developed, Designed and Implemented."
        );
    }

    if (suggestions.length === 0) {
        suggestions.push(
            "Your resume looks strong."
        );
    }

    suggestions.forEach(text => {

        let li =
            document.createElement("li");

        li.textContent = text;

        list.appendChild(li);
    });

    detectWeakContent();
}

// Weak Content Detector
function detectWeakContent() {

    let resume = getResumeText();

    const weak = [
        "hardworking",
        "quick learner",
        "good communication"
    ];

    let list =
        document.getElementById(
            "suggestions"
        );

    weak.forEach(word => {

        if (
            resume.includes(word)
        ) {

            let li =
                document.createElement("li");

            li.textContent =
                `Avoid weak phrase "${word}". Replace it with achievements and measurable results.`;

            list.appendChild(li);
        }
    });
}

// Interview Questions
function generateQuestions() {

    let resume = getResumeText();

    let list =
        document.getElementById(
            "questions"
        );

    list.innerHTML = "";

    const questions = [];

    if (
        resume.includes(
            "machine learning"
        )
    ) {
        questions.push(
            "Explain your Machine Learning projects."
        );
    }

    if (
        resume.includes(
            "cybersecurity"
        )
    ) {
        questions.push(
            "Why are you interested in Cybersecurity?"
        );
    }

    if (
        resume.includes(
            "javascript"
        )
    ) {
        questions.push(
            "What challenges did you face in JavaScript?"
        );
    }

    if (
        resume.includes(
            "project"
        )
    ) {
        questions.push(
            "Explain your most important project."
        );
    }

    if (
        questions.length === 0
    ) {
        questions.push(
            "Tell me about yourself."
        );
    }

    questions.forEach(q => {

        let li =
            document.createElement("li");

        li.textContent = q;

        list.appendChild(li);
    });
}

// Career Roadmap
function careerRoadmap() {

    let resume =
        getResumeText();

    let roadmap = "";

    if (
        resume.includes(
            "python"
        )
    ) {

        roadmap =
            "Python → SQL → Machine Learning → Deep Learning → AI Engineer";
    }
    else if (
        resume.includes(
            "html"
        )
    ) {

        roadmap =
            "HTML → CSS → JavaScript → React → Node.js → Full Stack Developer";
    }
    else if (
        resume.includes(
            "cybersecurity"
        )
    ) {

        roadmap =
            "Networking → Linux → Security Tools → Ethical Hacking → Security Analyst";
    }
    else {

        roadmap =
            "Programming → Projects → Internships → Specialization";
    }

    document.getElementById(
        "roadmap"
    ).innerHTML =
        roadmap;
}

// Download Report
function downloadReport() {

    const report = `
AI RESUME ANALYZER REPORT

${document.getElementById("atsResult").innerText}

${document.getElementById("matchResult").innerText}

Career Roadmap:
${document.getElementById("roadmap").innerText}
`;

    const blob =
        new Blob(
            [report],
            {
                type:
                    "text/plain"
            }
        );

    const a =
        document.createElement(
            "a"
        );

    a.href =
        URL.createObjectURL(
            blob
        );

    a.download =
        "Resume_Report.txt";

    a.click();
}