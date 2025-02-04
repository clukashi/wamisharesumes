// Function to add another work experience section
function addWorkExperience(): void {
  const container = document.getElementById('work-experience-container')!;
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
  const container = document.getElementById('education-container')!;
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

  // Collect form data
  const formData = new FormData(event.target as HTMLFormElement);

  // Build resume preview
  const previewDiv = document.getElementById('resume-preview')!;
  previewDiv.innerHTML = `
    <h3>${formData.get('name')}</h3>
    <p>${formData.get('email')} | ${formData.get('phone')}</p>
    <hr />
    <h4>Work Experience</h4>
    <ul>
      ${[...formData.getAll('jobTitle[]')].map((title: string, i: number) => `
        <li><strong>${title}</strong> at ${formData.getAll('company[]')[i]} (${formData.getAll('datesEmployed[]')[i]})<br />${formData.getAll('description[]')[i]}</li>
      `).join('')}
    </ul>
    <hr />
    <h4>Education</h4>
    <ul>
      ${[...formData.getAll('degree[]')].map((degree: string, i: number) => `
        <li><strong>${degree}</strong> from ${formData.getAll('institution[]')[i]} (${formData.getAll('datesAttended[]')[i]})</li>
      `).join('')}
    </ul>
    <hr />
    <h4>Skills</h4>
    <p>${formData.get('skills')}</p>
  `;

  // Show preview section
  document.getElementById('preview')!.style.display = 'block';
});

// Function to download resume as PDF
function downloadResume(): void {
  const resumeContent = document.getElementById('resume-preview')!.innerHTML;
  const pdf = new jsPDF();
  pdf.html(resumeContent, {
    callback: (pdf) => {
      pdf.save('resume.pdf');
    },
  });
}
