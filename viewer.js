const viewer = document.querySelector('#statue');
const status = document.querySelector('#viewer-status');
const whole = document.querySelector('#whole');
const plaque = document.querySelector('#plaque');
const spin = document.querySelector('#spin');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function selected(button, enabled) {
  button.classList.toggle('selected', enabled);
  button.setAttribute('aria-pressed', String(enabled));
}
function stopSpin() {
  viewer.autoRotate = false;
  selected(spin, false);
  spin.textContent = 'Rotate ↻';
}
whole.addEventListener('click', () => {
  stopSpin();
  viewer.cameraTarget = '0m .49m 0m';
  viewer.cameraOrbit = '15deg 78deg 2.35m';
  viewer.fieldOfView = '30deg';
  selected(whole, true); selected(plaque, false);
  if (reducedMotion.matches) viewer.jumpCameraToGoal();
});
plaque.addEventListener('click', () => {
  stopSpin();
  viewer.cameraTarget = '0m .105m .17m';
  viewer.cameraOrbit = '0deg 88deg .64m';
  viewer.fieldOfView = '22deg';
  selected(whole, false); selected(plaque, true);
  if (reducedMotion.matches) viewer.jumpCameraToGoal();
});
spin.addEventListener('click', () => {
  viewer.autoRotate = !viewer.autoRotate;
  selected(spin, viewer.autoRotate);
  spin.textContent = viewer.autoRotate ? 'Pause rotation Ⅱ' : 'Rotate ↻';
});
viewer.addEventListener('load', () => {
  document.querySelector('#loading').hidden = true;
  status.textContent = 'Ready to explore';
});
viewer.addEventListener('error', () => {
  document.querySelector('#loading').hidden = true;
  status.textContent = 'The 3D preview could not load. The GLB download is still available.';
});
customElements.whenDefined('model-viewer').then(() => {
  if (viewer.loaded) {
    document.querySelector('#loading').hidden = true;
    status.textContent = 'Ready to explore';
  }
});
