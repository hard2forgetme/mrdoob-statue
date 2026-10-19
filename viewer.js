const viewer = document.querySelector('#statue');
const status = document.querySelector('#viewer-status');
const whole = document.querySelector('#whole');
const plaque = document.querySelector('#plaque');
const spin = document.querySelector('#spin');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const models = {
  mrdoob: {
    name: 'MrDoob', file: 'mrdoob.glb', download: 'MrDoob-Tribute.glb', size: '6.6 MB',
    subtitle: 'CREATOR OF THREE.JS', number: '001 / MRDOOB',
    dedication: 'For the person who helped put a world inside the browser.',
    description: 'A little bronze appreciation for the creator of Three.js—and everything it lets the rest of us imagine.',
    plaqueTarget: '0m .105m .17m',
  },
  robot: {
    name: 'Robot 2.0', file: 'robot.glb', download: 'Robot-2.0-Tribute.glb', size: '7.0 MB',
    subtitle: 'THREE.JS CHAMPION', number: '002 / ROBOT 2.0',
    dedication: 'A bronze salute to a Three.js champion.',
    description: 'Robot 2.0 joins the collection, complete with its pedestal and clean raised lettering. Take a closer look, or bring the model into a world of your own.',
    plaqueTarget: '0m .1m .193m',
  },
};
let activeModel = 'mrdoob';
function selected(button, enabled) {
  button.classList.toggle('selected', enabled);
  button.setAttribute('aria-pressed', String(enabled));
}
function stopSpin() {
  viewer.autoRotate = false;
  selected(spin, false);
  spin.textContent = 'Rotate ↻';
}
function wholeView() {
  stopSpin();
  viewer.cameraTarget = '0m .49m 0m';
  viewer.cameraOrbit = '15deg 78deg 2.35m';
  viewer.fieldOfView = '30deg';
  selected(whole, true); selected(plaque, false);
  if (reducedMotion.matches) viewer.jumpCameraToGoal();
}
whole.addEventListener('click', wholeView);
function chooseModel(key, updateHash = true) {
  if (!models[key]) key = 'mrdoob';
  const model = models[key];
  const changed = activeModel !== key;
  activeModel = key;
  document.querySelector('#model-name').textContent = model.name + '.';
  document.querySelector('#dedication').textContent = model.dedication;
  document.querySelector('#description').textContent = model.description;
  document.querySelector('#plaque-name').textContent = model.name;
  document.querySelector('#plaque-subtitle').textContent = model.subtitle;
  document.querySelector('#model-number').textContent = model.number;
  document.querySelector('#download-size').textContent = 'GLB · ' + model.size;
  const download = document.querySelector('#download');
  download.href = 'assets/' + model.file;
  download.download = model.download;
  viewer.alt = `Bronze statue of ${model.name} on a pedestal, with the inscription ${model.name}, ${model.subtitle}. Drag to rotate and pinch or scroll to zoom.`;
  document.querySelectorAll('[data-model]').forEach(button => selected(button, button.dataset.model === key));
  document.title = `For ${model.name} — A Three.js Tribute`;
  if (changed) {
    document.querySelector('#loading').hidden = false;
    status.textContent = 'Loading ' + model.name + '…';
    viewer.src = 'assets/' + model.file;
  }
  wholeView();
  if (updateHash) history.replaceState(null, '', '#' + key);
}
document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click', () => chooseModel(button.dataset.model)));
window.addEventListener('hashchange', () => chooseModel(location.hash.slice(1), false));
chooseModel(location.hash.slice(1), false);
plaque.addEventListener('click', () => {
  stopSpin();
  viewer.cameraTarget = models[activeModel].plaqueTarget;
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
