document.getElementById('theme-toggle').onclick = () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
};

function updateThemeIcon() {
  const iconPath = document.getElementById('theme-icon-path');
  if (document.documentElement.classList.contains('dark')) {
    // Moon icon
    iconPath.setAttribute('d', 'M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z');
  } else {
    // Sun icon
    iconPath.setAttribute('d', 'M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z');
  }
}

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
updateThemeIcon();
