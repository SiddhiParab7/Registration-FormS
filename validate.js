document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Clear previous error messages
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('aadharError').innerHTML = '';
    document.getElementById('panError').innerHTML = '';
    document.getElementById('mobileError').innerHTML = '';
    document.getElementById('dobError').innerHTML = '';
    document.getElementById('marksError').innerHTML = '';
  
    // Get input values
    const fullname = document.getElementById('fullname').value.trim();
    const aadhar = document.getElementById('aadhar').value.trim();
    const pan = document.getElementById('pan').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const marks1 = parseInt(document.getElementById('marks1').value.trim());
    const marks2 = parseInt(document.getElementById('marks2').value.trim());
    const marks3 = parseInt(document.getElementById('marks3').value.trim());
    const marks4 = parseInt(document.getElementById('marks4').value.trim());
    const marks5 = parseInt(document.getElementById('marks5').value.trim());
    const marks6 = parseInt(document.getElementById('marks6').value.trim());
  
    // Validate full name
    if (fullname === '' || fullname.split(' ').length < 2) {
      document.getElementById('nameError').innerHTML = 'Please enter a valid full name.';
      return;
    }
    const nameParts = fullname.split(' ');
    const firstName = nameParts[0];
    const middleName = nameParts.length > 2 ? nameParts[1] : '';
    const lastName = nameParts[nameParts.length - 1];
  
    // Validate Aadhar number (12 digits)
    if (!/^\d{12}$/.test(aadhar)) {
      document.getElementById('aadharError').innerHTML = 'Aadhar number must be 12 digits.';
      return;
    }
  
    // Validate PAN number (standard pattern)
    const panPattern = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    if (!panPattern.test(pan)) {
      document.getElementById('panError').innerHTML = 'Invalid PAN number format.';
      return;
    }
  
    // Validate Mobile number (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      document.getElementById('mobileError').innerHTML = 'Mobile number must be 10 digits.';
      return;
    }
  
    // Validate Date of Birth (must be in the past)
    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate >= today) {
      document.getElementById('dobError').innerHTML = 'Date of birth must be in the past.';
      return;
    }
  
    // Validate Marks (should be between 0 and 100)
    const marksArray = [marks1, marks2, marks3, marks4, marks5, marks6];
    for (let i = 0; i < marksArray.length; i++) {
      if (marksArray[i] < 0 || marksArray[i] > 100) {
        document.getElementById('marksError').innerHTML = 'Marks should be between 0 and 100.';
        return;
      }
    }
  
    // Calculate percentage for best of five subjects
    marksArray.sort((a, b) => b - a); // Sort in descending order
    const bestOfFiveMarks = marksArray.slice(0, 5); // Best 5 subjects
    const totalMarks = bestOfFiveMarks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (totalMarks / 500) * 100;
  
    document.getElementById('result').innerHTML = `<p>Registration Successful!</p>
      <p>Full Name: ${firstName} ${middleName} ${lastName}</p>
      <p>Best Five Marks: ${bestOfFiveMarks.join(', ')}</p>
      <p>Percentage: ${percentage.toFixed(2)}%</p>`;
  });
  