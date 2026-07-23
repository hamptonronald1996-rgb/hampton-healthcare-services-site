(() => {
  const wait = setInterval(() => {
    const forms = [...document.querySelectorAll('form.intake-form')];
    if (forms.length < 2) return;
    clearInterval(wait);

    const field = (label, name, type = 'text', options = '') => {
      if (type === 'select') return `<label>${label}<select name="${name}">${options}</select></label>`;
      if (type === 'textarea') return `<label class="form-wide">${label}<textarea name="${name}" rows="3"></textarea></label>`;
      return `<label>${label}<input name="${name}" type="${type}"></label>`;
    };

    const care = forms[0];
    const careGrid = care.querySelector('.form-grid');
    careGrid.insertAdjacentHTML('beforeend',
      field('Client name (if different)', 'client_name') +
      field('Client date of birth', 'client_dob', 'date') +
      field('Client address or community', 'client_location') +
      field('Relationship to client', 'relationship_to_client') +
      field('Emergency contact name', 'emergency_contact_name') +
      field('Emergency contact phone', 'emergency_contact_phone', 'tel') +
      field('Primary contact preference', 'contact_preference', 'select', '<option>Phone call</option><option>Text message</option><option>Email</option>') +
      field('Mobility support needed', 'mobility_needs', 'select', '<option>None</option><option>Standby assistance</option><option>Walker or cane</option><option>Wheelchair</option><option>Transfer assistance</option><option>Not sure</option>') +
      field('Transportation needed?', 'transportation_needed', 'select', '<option>No</option><option>Yes</option><option>Possibly</option>') +
      field('Hours requested per week', 'hours_per_week', 'number')
    );
    careGrid.insertAdjacentHTML('afterend',
      field('Daily routines, safety concerns, or preferences', 'care_preferences', 'textarea') +
      field('Anything our team should know before calling?', 'consultation_notes', 'textarea')
    );

    const career = forms[1];
    const careerGrid = career.querySelector('.form-grid');
    careerGrid.insertAdjacentHTML('beforeend',
      field('Home address or city', 'applicant_location') +
      field('Reliable transportation?', 'reliable_transportation', 'select', '<option>Yes</option><option>No</option>') +
      field('Valid driver’s license?', 'drivers_license', 'select', '<option>Yes</option><option>No</option>') +
      field('Preferred employment type', 'employment_type', 'select', '<option>Part-time</option><option>Full-time</option><option>PRN / On-call</option>') +
      field('Earliest start date', 'available_start_date', 'date') +
      field('Weekend availability', 'weekend_availability', 'select', '<option>Yes</option><option>No</option><option>Some weekends</option>') +
      field('Overnight availability', 'overnight_availability', 'select', '<option>Yes</option><option>No</option><option>Occasionally</option>') +
      field('Professional reference 1', 'reference_one') +
      field('Professional reference 2', 'reference_two')
    );
    careerGrid.insertAdjacentHTML('afterend',
      field('Recent work history', 'work_history', 'textarea') +
      `<label class="form-wide">Resume (PDF, DOC, or DOCX; maximum 500 KB)<input id="resumeFile" type="file" accept=".pdf,.doc,.docx"><input id="resumeName" name="resume_name" type="hidden"><input id="resumeData" name="resume_data" type="hidden"><small id="resumeStatus"></small></label>`
    );

    const resume = document.getElementById('resumeFile');
    resume.addEventListener('change', () => {
      const file = resume.files[0];
      const status = document.getElementById('resumeStatus');
      if (!file) return;
      if (file.size > 500 * 1024) {
        resume.value = '';
        status.textContent = 'File is too large. Please choose a file under 500 KB.';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById('resumeName').value = file.name;
        document.getElementById('resumeData').value = reader.result;
        status.textContent = `${file.name} is ready to submit.`;
      };
      reader.readAsDataURL(file);
    });

    [care, career].forEach(form => {
      const consent = form.querySelector('.consent');
      consent.insertAdjacentHTML('beforebegin', '<label class="consent"><input name="contact_consent" value="yes" type="checkbox" required><span>I authorize Hampton Healthcare Services to contact me about this submission.</span></label>');
    });
  }, 150);
})();
