const select = (selector) => document.querySelector(selector);

const form = select('.form');
const message = select('.message');

const displayMessage = (text, color) => {
  message.style.visibility = 'visible';
  message.style.backgroundColor = color;
  message.innerText = text;
  setTimeout(() => {
    message.style.visibility = 'hidden';
  }, 3000);
};



const validateForm = () => {
  const fname = select('#fname').value.trim();
  const Lname = select('#Lname').value.trim();
  const email = select('#email').value;
  const pnumber = select('#pnumber').value;

  const exceptedImageFiles = ['jpg', 'jpeg', 'png'];
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneno = /^\d{10}$/;
  if(!email.match(mailformat))
{
  return displayMessage('You have entered an invalid email address!', 'red');
}

if(!pnumber.match(phoneno))
{
  return displayMessage('You have entered an invalid phone number!', 'red');
}





  if (!fname || !Lname || !email || !pnumber ) {
    // show  some error
    return displayMessage('Field can not be empty', 'red');
  }
  

  return true;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate our form
  const valid = validateForm();

  if (valid) {
    // Submit this form
    const formData = new FormData(form);
    await postData(formData);
  }
});

const resetForm = () => {
  select('#fname').value = '';
  select('#Lname').value = '';
  select('#thumbnail').value = null;
  select('#email').value = '';
  select('#pnumber').value = '';
};

const postData = async (data) => {
  const result = await fetch('/api/create', {
    method: 'POST',
    body: data,
  });

  if (result.ok) {
    const response = await result.json();
    if (response.success) {
      displayMessage(response.message, 'green');
      resetForm();
    }
    if (!response.success) {
      displayMessage(response.message, 'red');
    }
  }

  
};
