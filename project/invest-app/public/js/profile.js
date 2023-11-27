import API from './lib/auth.js';

const form = document.querySelector('form');

let formMethod;

async function loadProfile() {
  const response = await fetch('/users/me', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${API.getToken()}`,
    },
  });

  const user = await response.json();

  let image;

  if (user.image) {
    image = user.image.path;

    formMethod = 'put';
  } else {
    image = '/imgs/profile/avatar.png';

    formMethod = 'post';
  }

  document.querySelector('#profile-name').innerText = user.name;

  document.querySelector('#profile-email').innerText = user.email;

  document.querySelector('#profile-image').src = image;
}

form.onsubmit = async (event) => {
  event.preventDefault();

  const image = new FormData(form);

  let newImage;

  if (formMethod === 'post') {
    const response = await fetch('/users/image', {
      method: 'post',
      body: image,
      headers: {
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    newImage = await response.json();
  } else if (formMethod === 'put') {
    const response = await fetch('/users/image', {
      method: 'put',
      body: image,
      headers: {
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    newImage = await response.json();
  }

  document.querySelector('#profile-image').src = newImage.path;

  form.reset();
};

if (API.isAuthenticated()) {
  loadProfile();
}
