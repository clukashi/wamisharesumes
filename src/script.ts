import jsPDF from 'jspdf';

// Function to add another work experience section
function addWorkExperience(): void {
  const container = document.getElementById('work-experience-container') as HTMLElement;
  const newSection = document.createElement('div');
  newSection.className = 'work-experience';
  newSection.innerHTML = `
    <label for="job-title">Job Title:</label>
    <input type="text" name="jobTitle[]" required />
    <label for="company">Company:</label>
    <input type="text" name="company[]" required />
    <label for="dates-employed">Dates Employed:</label>
    <input type="text" name="datesEmployed[]" required />
    <label for="description">Description:</label>
    <textarea name="description[]" rows="3"></textarea>
  `;
  container.appendChild(newSection);
}

// Function to add another education section
function addEducation(): void {
  const container = document.getElementById('education-container') as HTMLElement;
  const newSection = document.createElement('div');
  newSection.className = 'education';
  newSection.innerHTML = `
    <label for="degree">Degree:</label>
    <input type="text" name="degree[]" required />
    <label for="institution">Institution:</label>
    <input type="text" name="institution[]" required />
    <label for="dates-attended">Dates Attended:</label>
    <input type="text" name="datesAttended[]" required />
  `;
  container.appendChild(newSection);
}

// Function to generate resume preview
document.getElementById('resume-builder')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  const jobTitles = Array.from(formData.getAll('jobTitle[]')) as string[];
  const companies = Array.from(formData.getAll('company[]')) as string[];
  const datesEmployed = Array.from(formData.getAll('datesEmployed[]')) as string[];
  const descriptions = Array.from(formData.getAll('description[]')) as string[];

  const degrees = Array.from(formData.getAll('degree[]')) as string[];
  const institutions = Array.from(formData.getAll('institution[]')) as string[];
  const datesAttended = Array.from(formData.getAll('datesAttended[]')) as string[];

  const skills = formData.get('skills') as string;

  const previewDiv = document.getElementById('resume-preview')!;
  previewDiv.innerHTML = `
    <h3>${name}</h3>
    <p>${email} | ${phone}</p>
    <hr />
    <h4>Work Experience</h4>
    <ul>
      ${jobTitles.map((title, i) => `
        <li><strong>${title}</strong> at ${companies[i]} (${datesEmployed[i]})<br />${descriptions[i]}</li>
      `).join('')}
    </ul>
    <hr />
    <h4>Education</h4>
    <ul>
      ${degrees.map((degree, i) => `
        <li><strong>${degree}</strong> from ${institutions[i]} (${datesAttended[i]})</li>
      `).join('')}
    </ul>
    <hr />
    <h4>Skills</h4>
    <p>${skills}</p>
  `;

  document.getElementById('preview')!.style.display = 'block';
});

// Function to download resume as PDF
function downloadResume(): void {
  const resumeContent = document.getElementById('resume-preview')!.innerHTML;
  const pdf = new jsPDF();
  pdf.html(resumeContent, {
    callback: (pdfDoc: jsPDF) => {
      pdfDoc.save('resume.pdf');
    },
  });
}
