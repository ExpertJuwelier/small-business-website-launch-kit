'use strict';
const groups = [
  ['Clear message', [
    'The first screen says what you offer and who it is for.',
    'Each main page has one clear next step.',
    'Prices or the next step to get a quote are easy to find.',
    'The words sound like your business and claims are accurate.'
  ]],
  ['Trust and contact', [
    'Contact details work and are easy to find.',
    'Business location or service area is clear.',
    'Reviews, examples or credentials are genuine and approved for use.',
    'A privacy notice explains how enquiry data is handled.'
  ]],
  ['Mobile and usability', [
    'Pages are readable and usable on a small phone.',
    'All menu links, buttons and forms work.',
    'Images have useful alternative text when they convey information.',
    'Text is legible, keyboard navigation works and focus is visible.'
  ]],
  ['Search basics', [
    'Each important page has a descriptive title.',
    'Headings describe the page in plain language.',
    'The website has relevant local or service information.',
    'The site can be accessed securely over HTTPS.'
  ]],
  ['Before you publish', [
    'All dates, prices, hours and contact details are current.',
    'Images and logos are yours to use or properly licensed.',
    'A real enquiry or purchase has been tested end to end.',
    'Someone outside the business has tried the site and given feedback.'
  ]]
];
const key = 'website-launch-kit-v1';
const form = document.querySelector('#brief-form');
const items = document.querySelector('#items');
const status = document.querySelector('#status');
const fields = ['business','offer','audience','goal','location','proof','pages','contact'];
function readSaved(){try{return JSON.parse(localStorage.getItem(key)) || {}}catch{return {}}}
let saved = readSaved();
groups.forEach(([title, tasks], groupIndex) => {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'check-group';
  const legend = document.createElement('legend');
  legend.textContent = title;
  fieldset.append(legend);
  tasks.forEach((task, taskIndex) => {
    const id = `check-${groupIndex}-${taskIndex}`;
    const label = document.createElement('label');
    label.className = 'check-row';
    const input = document.createElement('input');
    input.type = 'checkbox'; input.id = id; input.checked = Boolean(saved.checks?.[id]);
    input.addEventListener('change', persist);
    const text = document.createElement('span'); text.textContent = task;
    label.append(input, text); fieldset.append(label);
  });
  items.append(fieldset);
});
fields.forEach(name => {if(typeof saved.fields?.[name] === 'string') form.elements[name].value = saved.fields[name]});
function updateProgress(){
  const checks = [...items.querySelectorAll('input[type="checkbox"]')];
  const done = checks.filter(input => input.checked).length;
  document.querySelector('#count').textContent = `${done} of ${checks.length} complete`;
  document.querySelector('#percent').textContent = `${Math.round(done/checks.length*100)}%`;
  document.querySelector('#fill').style.width = `${done/checks.length*100}%`;
  document.querySelector('#progress').setAttribute('aria-valuenow', String(done));
}
function persist(){
  const values = Object.fromEntries(fields.map(name => [name, form.elements[name].value]));
  const checks = Object.fromEntries([...items.querySelectorAll('input')].map(input => [input.id,input.checked]));
  try{localStorage.setItem(key, JSON.stringify({fields:values,checks}))}catch{status.textContent='Your browser could not save progress. You can still download the brief.'}
  updateProgress();
}
form.addEventListener('input', persist);
form.addEventListener('change', persist);
updateProgress();
function brief(){
  const labels = {business:'Business',offer:'Offer',audience:'Audience',goal:'Main website goal',location:'Location or service area',proof:'Trust signals',pages:'Pages needed',contact:'Contact options'};
  const answerLines = fields.map(name => `${labels[name]}: ${form.elements[name].value.trim() || '[To complete]'}`);
  const taskLines = groups.flatMap(([group,tasks], gi) => [`\n${group}`, ...tasks.map((task,ti)=>`${document.querySelector(`#check-${gi}-${ti}`).checked ? '[x]':'[ ]'} ${task}`)]);
  return ['SMALL BUSINESS WEBSITE BRIEF','',...answerLines,'','LAUNCH CHECKLIST',...taskLines,'','Resource: Small Business Website Launch Kit'].join('\n');
}
document.querySelector('#download').addEventListener('click', () => {
  const blob = new Blob([brief()], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='website-launch-brief.txt'; document.body.append(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  status.textContent='Brief downloaded.';
});
document.querySelector('#copy').addEventListener('click', async () => {
  try{await navigator.clipboard.writeText(brief());status.textContent='Brief copied to clipboard.'}
  catch{status.textContent='Copy was blocked by this browser. Use Download my brief instead.'}
});
document.querySelector('#reset').addEventListener('click', () => {
  if(!window.confirm('Clear all answers and checklist progress saved in this browser?')) return;
  form.reset();items.querySelectorAll('input').forEach(input => {input.checked=false});
  try{localStorage.removeItem(key)}catch{}
  updateProgress();status.textContent='Saved answers and progress cleared.';
});
