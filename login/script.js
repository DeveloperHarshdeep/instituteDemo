document.addEventListener('DOMContentLoaded', () => {
    // Password toggle (you already have this)
    const pwInput   = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePw');
    toggleBtn.addEventListener('click', () => {
      const isPw = pwInput.type === 'password';
      pwInput.type = isPw ? 'text' : 'password';
      toggleBtn.classList.toggle('fa-eye');
      toggleBtn.classList.toggle('fa-eye-slash');
    });
  
    // Form submit → redirect
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();             // stop normal submit
      // you can validate here (e.g. check non-empty, match credentials, etc.)
      window.location.href = '/dashboard/';
    });
  });
  