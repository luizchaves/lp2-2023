window.handleSubmit = handleSubmit;

const form = document.querySelector('form');

async function handleSubmit(event) {
  event.preventDefault();

  if (form.checkValidity()) {
    const user = Object.fromEntries(new FormData(form));

    const config = {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/users', config);

    if (response.ok) {
      location.href = '/signin.html';
    } else {
      console.log('Error no cadastro');
    }
  } else {
    form.classList.add('was-validated');
  }
}

form.confirmationPassword.oninput = () => {
  const password = form.password.value;

  const confirmationPassword = form.confirmationPassword.value;

  if (password !== confirmationPassword) {
    const error = 'As senhas não são iguais.';

    const confirmationPasswordError = document.querySelector(
      '#confirmationPassword + .invalid-feedback'
    );

    confirmationPasswordError.textContent = error;

    form.confirmationPassword.setCustomValidity(error);
  } else {
    form.confirmationPassword.setCustomValidity('');
  }
};
