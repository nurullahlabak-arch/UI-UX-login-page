// Basic client-side validation + UX niceties
(function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const ripple = document.querySelector('.btn-primary .ripple');
  const showPwBtn = document.querySelector('.toggle-pw');
  const rememberEl = document.getElementById('remember');

  // Ripple effect on button click
  loginBtn.addEventListener('click', function (e) {
    // Create ripple at click position
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.display = 'block';
    ripple.style.animationPlayState = 'running';

    // Clear after animation
    setTimeout(() => {
      ripple.style.display = 'none';
    }, 600);
  });

  // Password show/hide
  let pwVisible = false;
  showPwBtn.addEventListener('click', () => {
    pwVisible = !pwVisible;
    passwordInput.type = pwVisible ? 'text' : 'password';
    showPwBtn.textContent = pwVisible ? '🙈' : '👁️';
    showPwBtn.setAttribute('aria-label', pwVisible ? 'Hide password' : 'Show password');
  });

  // Simple validation
  function setError(el, message) {
    const err = el.parentElement.querySelector('.error');
    if (err) {
      err.textContent = message;
    }
    el.style.borderColor = 'rgba(255,0,0,0.8)';
  }
  function clearError(el) {
    const err = el.parentElement.querySelector('.error');
    if (err) err.textContent = '';
    el.style.borderColor = 'rgba(255,255,255,0.25)';
  }

  emailInput.addEventListener('input', () => clearError(emailInput));
  passwordInput.addEventListener('input', () => clearError(passwordInput));

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    if (!emailInput.value) {
      setError(emailInput, 'Please enter your email.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      setError(emailInput, 'Please enter a valid email address.');
      valid = false;
    }

    if (!passwordInput.value) {
      setError(passwordInput, 'Please enter your password.');
      valid = false;
    }

    if (valid) {
      // Simulated submission
      loginBtn.disabled = true;
      loginBtn.style.opacity = '0.8';
      loginBtn.textContent = 'Signing in...';

      // Fake delay to showcase UX
      setTimeout(() => {
        // Reset for demo; in real app, submit via fetch/XHR here
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign in';
        // Optional: redirect or show success
        alert('Login simulated. This is a UI/UX mock.');
      }, 900);
    }
  });
})()