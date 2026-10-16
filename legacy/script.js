/* ---------- DATA DICTIONARIES & CONSTANTS ---------- */
const SIGNS = [
{id:'kumusta',fil:'Kumusta',en:'Hello, how are you',cat:'Basic',m:92,att:14},
{id:'ako',fil:'Ako',en:'I, me',cat:'Basic',m:88,att:9},
{id:'salamat',fil:'Salamat',en:'Thank you',cat:'Basic',m:95,att:12},
{id:'pakiusap',fil:'Pakiusap',en:'Please',cat:'Basic',m:71,att:8},
{id:'oo',fil:'Oo',en:'Yes',cat:'Basic',m:97,att:6},
{id:'hindi',fil:'Hindi',en:'No',cat:'Basic',m:90,att:6},
{id:'pasensya',fil:'Pasensya',en:'Sorry',cat:'Basic',m:62,att:9},
{id:'ulit',fil:'Ulit',en:'Again, repeat',cat:'School',m:55,att:7},
{id:'tulong',fil:'Tulong',en:'Help',cat:'School',m:78,att:11},
{id:'guro',fil:'Guro',en:'Teacher',cat:'School',m:84,att:5},
{id:'pagkain',fil:'Pagkain',en:'Food',cat:'Everyday',m:45,att:4},
{id:'inumin',fil:'Inumin',en:'Drink',cat:'Everyday',m:50,att:3},
{id:'dalawa',fil:'Dalawa',en:'Two',cat:'Everyday',m:80,att:5},
{id:'bayad',fil:'Bayad',en:'Pay',cat:'Everyday',m:60,att:4},
{id:'magkano',fil:'Magkano',en:'How much',cat:'Everyday',m:70,att:6},
{id:'saan',fil:'Saan',en:'Where',cat:'Everyday',m:85,att:8},
{id:'diretso',fil:'Diretso',en:'Straight',cat:'Everyday',m:90,att:7},
{id:'kaliwa',fil:'Kaliwa',en:'Left',cat:'Everyday',m:75,att:5},
{id:'bukas',fil:'Bukas',en:'Tomorrow',cat:'Everyday',m:65,att:4},
{id:'oras',fil:'Oras',en:'Time',cat:'Everyday',m:82,att:6},
{id:'sakay',fil:'Sakay',en:'Ride',cat:'Public',m:70,att:5},
{id:'sasakyan',fil:'Sasakyan',en:'Vehicle',cat:'Public',m:65,att:4},
{id:'kailangan',fil:'Kailangan',en:'Need',cat:'Public',m:88,att:9},
{id:'sakit',fil:'Sakit',en:'Sick, hurt',cat:'Emergency',m:92,att:10},
{id:'doktor',fil:'Doktor',en:'Doctor',cat:'Emergency',m:85,att:8},
{id:'aksidente',fil:'Aksidente',en:'Accident',cat:'Emergency',m:46,att:12},
{id:'pulis',fil:'Pulis',en:'Police',cat:'Emergency',m:75,att:6},
{id:'nawawala',fil:'Nawawala',en:'Lost',cat:'Emergency',m:41,att:11}
];

const CATS = ['All','Basic','School','Everyday','Public','Emergency'];

const LEVELS = [
['Basic communication','Greetings, introductions, and simple requests'],
['School communication','Classroom, group work, laboratory, school events'],
['Everyday communication','Restaurants, stores, transport, and directions'],
['Public communication','Appointments, public services, and requesting help'],
['Emergency communication','Urgent requests, accidents, and medical help']
];

const SCEN = [
{id:'gate',name:'First Day Hello',short:'Gate hello',lvl:1,scene:'gate',ic:'fa-hand',reveal:true,desc:'Greet the school guard, introduce yourself, and ask politely to come in.',
steps:[{npc:'Guard Ramon',text:'Good morning!',tr:'The school guard waves as you arrive.',obj:'Greet the guard.',t:'kumusta'},
{npc:'Guard Ramon',text:'Who are you?',tr:'He asks you to introduce yourself.',obj:'Introduce yourself.',t:'ako'},
{npc:'Guard Ramon',text:'Do you need something?',tr:'You would like to go in.',obj:'Ask politely to come in.',t:'pakiusap'}]},
{id:'classroom',name:'Ask the Teacher to Repeat',short:'Ask to repeat',lvl:2,scene:'classroom',ic:'fa-chalkboard-user',desc:'You missed the instruction. Ask your teacher to repeat it.',
steps:[{npc:'Ms. Reyes',text:'Open your books, then answer number 3.',tr:'Your teacher gives a quick instruction.',obj:'Ask your teacher to repeat it.',t:'ulit'},
{npc:'Ms. Reyes',text:'Open your books to page 10.',tr:'She repeats it slowly.',obj:'Show that you understand.',t:'oo'},
{npc:'Ms. Reyes',text:'Any other questions?',tr:'She waits for your reply.',obj:'Thank your teacher.',t:'salamat'}]},
{id:'group',name:'Group Activity',short:'Group work',lvl:2,scene:'group',ic:'fa-users',desc:'Work with a groupmate and ask for support.',
steps:[{npc:'Jo',text:'Ready for our activity?',tr:'Your groupmate sits down beside you.',obj:'Greet your groupmate.',t:'kumusta'},
{npc:'Jo',text:'Hmm, I am stuck on this part.',tr:'Your groupmate needs assistance with the activity.',obj:'Ask for help.',t:'tulong'}]},
{id:'lab',name:'Laboratory Help',short:'Laboratory',lvl:2,scene:'lab',ic:'fa-flask',desc:'Follow lab rules and ask for assistance.',
steps:[{npc:'Mr. Cruz',text:'Are you wearing your goggles?',tr:'Your lab teacher checks your gear.',obj:'Answer yes.',t:'oo'},
{npc:'Mr. Cruz',text:'How is your experiment?',tr:'Your beaker is stuck on the stand.',obj:'Ask for assistance.',t:'tulong'},
{npc:'Mr. Cruz',text:'There. It is loose now.',tr:'He frees it for you.',obj:'Thank him.',t:'salamat'}]},
{id:'event',name:'School Science Fair',short:'Science fair',lvl:2,scene:'event',ic:'fa-flag',desc:'Welcome a visitor and find the right booth.',
steps:[{npc:'Visitor',text:'Hello! Is this the science fair?',tr:'A visiting parent arrives.',obj:'Greet the visitor.',t:'kumusta'},
{npc:'Visitor',text:'Where is the robotics booth?',tr:'She is looking for a booth.',obj:'Ask where it is.',t:'saan'},
{npc:'Visitor',text:'Found it. Enjoy the fair!',tr:'She thanks you for your time.',obj:'Say thank you.',t:'salamat'}]},
{id:'restaurant',name:'Order at a Fast Food Restaurant',short:'Fast food',lvl:3,scene:'restaurant',ic:'fa-utensils',desc:'Order a meal with a sequence of signs: food, quantity, drink, confirm.',
steps:[{npc:'Cashier',text:'Hi! What would you like?',tr:'The cashier is ready for your order.',obj:'Say you want food.',t:'pagkain'},
{npc:'Cashier',text:'How many?',tr:'She points at the menu.',obj:'Show the quantity: two.',t:'dalawa'},
{npc:'Cashier',text:'Anything to drink?',tr:'She holds up a cup.',obj:'Choose a drink.',t:'inumin'},
{npc:'Cashier',text:'Is that everything?',tr:'She reads the total back to you.',obj:'Confirm your order.',t:'oo'}]},
{id:'store',name:'Buy an Item at a Store',short:'Store',lvl:3,scene:'store',ic:'fa-cart-shopping',desc:'Ask the price, decide, and pay.',
steps:[{npc:'Shopkeeper',text:'Looking for something?',tr:'You are holding a notebook.',obj:'Ask how much it costs.',t:'magkano'},
{npc:'Shopkeeper',text:'That one is 250 pesos.',tr:'He shows the price tag.',obj:'Say yes, you will buy it.',t:'oo'},
{npc:'Shopkeeper',text:'Cash or card?',tr:'He opens the register.',obj:'Say you will pay.',t:'bayad'},
{npc:'Shopkeeper',text:'Here is your receipt.',tr:'He hands over the bag.',obj:'Thank the shopkeeper.',t:'salamat'}]},
{id:'street',name:'Ask for Directions',short:'Directions',lvl:3,scene:'street',ic:'fa-route',desc:'Ask where a place is and follow the directions.',
steps:[{npc:'Passerby',text:'Hi, can I help you?',tr:'You are looking for the terminal.',obj:'Ask where the terminal is.',t:'saan'},
{npc:'Passerby',text:'Go straight first.',tr:'She points down the road.',obj:'Show the first direction.',t:'diretso'},
{npc:'Passerby',text:'Then turn at the corner.',tr:'She points to the other side.',obj:'Show the second direction.',t:'kaliwa'},
{npc:'Passerby',text:'You are welcome!',tr:'She smiles and waves.',obj:'Say thank you.',t:'salamat'}]},
{id:'busstop',name:'Ask About Transportation',short:'Transport',lvl:3,scene:'busstop',ic:'fa-bus',desc:'Find out which vehicle to take.',
steps:[{npc:'Conductor',text:'Can I help you?',tr:'A bus is waiting at the stop.',obj:'Say you want to ride.',t:'sakay'},
{npc:'Conductor',text:'Which one do you need?',tr:'Two vehicles are parked nearby.',obj:'Ask about the vehicle.',t:'sasakyan'},
{npc:'Conductor',text:'This one leaves in 5 minutes.',tr:'He points to the bus.',obj:'Thank the conductor.',t:'salamat'}]},
{id:'clinic',name:'Make an Appointment',short:'Appointment',lvl:4,scene:'clinic',ic:'fa-calendar-days',desc:'Book a check-up at a clinic desk.',
steps:[{npc:'Receptionist',text:'Good day! How can I help?',tr:'You are at the front desk.',obj:'Greet the receptionist.',t:'kumusta'},
{npc:'Receptionist',text:'Which day works for you?',tr:'She opens the calendar.',obj:'Choose tomorrow.',t:'bukas'},
{npc:'Receptionist',text:'And what time?',tr:'She shows the open slots.',obj:'Ask about the time.',t:'oras'}]},
{id:'info',name:'Get Help in a Public Place',short:'Public place',lvl:4,scene:'info',label:'INFO',ic:'fa-circle-info',desc:'Ask staff at an information desk for assistance.',
steps:[{npc:'Mall Staff',text:'Welcome to the mall!',tr:'You approach the information desk.',obj:'Greet the staff.',t:'kumusta'},
{npc:'Mall Staff',text:'How can I help you?',tr:'She leans in to listen.',obj:'Say you need help.',t:'tulong'},
{npc:'Mall Staff',text:'I will call someone for you.',tr:'She picks up the phone.',obj:'Say thank you.',t:'salamat'}]},
{id:'service',name:'Public Service Counter',short:'Service desk',lvl:4,scene:'service',ic:'fa-building-columns',desc:'Communicate with staff at a government service window.',
steps:[{npc:'Clerk',text:'Next, please!',tr:'It is your turn at the window.',obj:'Greet the clerk.',t:'kumusta'},
{npc:'Clerk',text:'What do you need today?',tr:'She slides a form forward.',obj:'Say what you need.',t:'kailangan'},
{npc:'Clerk',text:'One moment, please.',tr:'She looks for the right form.',obj:'Ask politely.',t:'pakiusap'}]},
{id:'medical',name:'Ask for Medical Help',short:'Medical help',lvl:5,scene:'medical',ic:'fa-kit-medical',desc:'Tell a nurse you are hurt and ask for a doctor.',
steps:[{npc:'Nurse',text:'What is wrong?',tr:'You arrive at the clinic in pain.',obj:'Say you are sick or hurt.',t:'sakit'},
{npc:'Nurse',text:'Do you need a doctor?',tr:'She checks on you.',obj:'Ask for a doctor.',t:'doktor'},
{npc:'Nurse',text:'Is it urgent?',tr:'She reaches for the phone.',obj:'Confirm it is urgent.',t:'oo'}]},
{id:'accident',name:'Report an Accident',short:'Accident',lvl:5,scene:'accident',ic:'fa-triangle-exclamation',desc:'Report a crash and ask for the right help.',
steps:[{npc:'Officer',text:'What happened here?',tr:'Two cars have collided.',obj:'Report the accident.',t:'aksidente'},
{npc:'Officer',text:'Should I call the police?',tr:'He takes out his radio.',obj:'Ask for the police.',t:'pulis'},
{npc:'Officer',text:'Is anyone hurt?',tr:'A driver sits by the road.',obj:'Ask for a doctor.',t:'doktor'}]},
{id:'lost',name:'Ask for Help When Lost',short:'Lost',lvl:5,scene:'lost',ic:'fa-compass',desc:'Tell a guard you are lost and find the exit.',
steps:[{npc:'Guard',text:'You look worried.',tr:'You are alone in a big mall.',obj:'Say you are lost.',t:'nawawala'},
{npc:'Guard',text:'Where do you need to go?',tr:'He points to the map.',obj:'Ask where the exit is.',t:'saan'},
{npc:'Guard',text:'It is down this hall.',tr:'He walks you to the corner.',obj:'Say thank you.',t:'salamat'}]}
];

const BADGES = [
{n:'First sign',d:'Complete your first practice.',ic:'fa-hand',on:true},
{n:'Warm hello',d:'Greet in 3 scenarios.',ic:'fa-users',on:true},
{n:'Steady hands',d:'5 correct signs without a retry.',ic:'fa-bullseye',on:true},
{n:'Seven-day streak',d:'Practice 7 days in a row.',ic:'fa-fire',p:[6,7]},
{n:'Quick signer',d:'Answer 3 steps in under 3 seconds.',ic:'fa-bolt',p:[1,3]},
{n:'Order up',d:'Finish the fast food order.',ic:'fa-utensils',p:[0,1]},
{n:'Never lost',d:'Finish Ask for Help When Lost.',ic:'fa-compass',p:[0,1]},
{n:'First responder',d:'Finish all Level 5 scenarios.',ic:'fa-shield-halved',p:[0,3]}
];

// [name, level, accuracy, avg time (s), scenarios done, last active]
const CLASS_STUDENTS = [
['Maria Santos',2,87,4.2,1,'Today'],['Paolo Reyes',3,92,3.6,6,'Today'],['Ana Lim',2,64,7.9,2,'Yesterday'],
['Jomar Dela Cruz',2,81,5.0,3,'Today'],['Bea Villanueva',5,95,3.1,13,'Today'],['Carlo Ramos',1,58,9.1,0,'5 days ago'],
['Ivy Tan',3,78,5.8,5,'2 days ago'],['Nico Aquino',2,71,6.4,2,'Yesterday']
];

const PROG_HISTORY = [72,75,70,81,84,79,88,86,91,89];

const REPLY = {
kumusta:'Kumusta! Good to see you.',ako:'Nice to meet you!',salamat:"You're welcome!",pakiusap:'Of course. Come in.',
oo:'Great, got it.',hindi:'Okay, no problem.',pasensya:"It's okay.",ulit:'Sure, let me say it again.',
tulong:"Of course, I'll help.",guro:"Thanks, I'll ask her.",pagkain:'One order coming up.',inumin:'A drink, got it.',
dalawa:'Two. Noted!',bayad:'Great, here is the total.',magkano:"It's 250 pesos.",saan:'Right this way.',
diretso:'Yes, straight ahead.',kaliwa:'Yes, then turn there.',bukas:'Tomorrow works.',oras:'How about 10 AM?',
sakay:'Sure, hop on.',sasakyan:'The next one leaves soon.',kailangan:'I see. Let me help.',sakit:"I'm sorry. I'll get help.",
doktor:'Calling the doctor now.',aksidente:'Thank you for telling me.',pulis:'Calling the police.',nawawala:"Don't worry, I'll help you."
};

/* ---------- GLOBAL STATE ---------- */
let currentView = 'mobile'; // 'mobile' | 'desktop'
let ageMode = 'kids';       // 'kids' | 'adult'
let onboardingStep = 1;

let S = {
  role: 'learner', // 'learner' | 'instructor'
  tab: 'learn',    // 'learn' | 'dictionary' | 'scenarios' | 'progress' | 'badges' | 'class'
  filter: 'All',
  viewingStudent: null,
  points: 1240,
  streak: 6,
  done: { gate: true },
  stars: { gate: 3 },
  resume: { classroom: 1 },
  unlockAll: false
};

let userPreferences = { ageGroup: 'kids', goal: '', level: 'beginner', pace: '10' };

let P = null;   // Active scenario play state
let CAM = null; // Camera stream

/* ---------- INITIALIZATION ---------- */
window.onload = function () {
  setViewMode(currentView);
  setAgeMode(ageMode);
};

/* ---------- SMALL HELPERS ---------- */
function isScenarioUnlocked(idx) {
  return S.unlockAll || idx === 0 || !!S.done[SCEN[idx - 1]?.id];
}

function statCard(value, label, colorClass) {
  return `
    <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
      <div class="text-2xl font-black ${colorClass} font-display">${value}</div>
      <div class="text-[11px] text-slate-400">${label}</div>
    </div>`;
}

/* ---------- VIEWPORT & AGE MODE CONTROLS ---------- */
function setViewMode(mode) {
  currentView = mode;
  const frameWrapper = document.getElementById('frameWrapper');
  const btnMobile = document.getElementById('btnViewMobile');
  const btnDesktop = document.getElementById('btnViewDesktop');
  const desktopSidebar = document.getElementById('desktopSidebar');
  const mobileBottomNav = document.getElementById('mobileBottomNav');

  if (mode === 'desktop') {
    frameWrapper.classList.remove('max-w-sm', 'sm:h-[840px]', 'sm:rounded-3xl', 'sm:border-[8px]');
    frameWrapper.classList.add('max-w-6xl', 'w-full', 'h-full', 'sm:rounded-2xl', 'sm:border-2');
    btnDesktop.classList.add('bg-rose-500', 'text-white');
    btnDesktop.classList.remove('text-slate-400');
    btnMobile.classList.remove('bg-rose-500', 'text-white');
    btnMobile.classList.add('text-slate-400');

    desktopSidebar.classList.remove('hidden');
    desktopSidebar.classList.add('flex');
    mobileBottomNav.classList.add('hidden');
  } else {
    frameWrapper.classList.add('max-w-sm', 'sm:h-[840px]', 'sm:rounded-3xl', 'sm:border-[8px]');
    frameWrapper.classList.remove('max-w-6xl', 'sm:rounded-2xl', 'sm:border-2');
    btnMobile.classList.add('bg-rose-500', 'text-white');
    btnMobile.classList.remove('text-slate-400');
    btnDesktop.classList.remove('bg-rose-500', 'text-white');
    btnDesktop.classList.add('text-slate-400');

    desktopSidebar.classList.add('hidden');
    desktopSidebar.classList.remove('flex');
    mobileBottomNav.classList.remove('hidden');
  }
}

function setAgeMode(mode) {
  ageMode = mode;
  userPreferences.ageGroup = mode;
  const btnKids = document.getElementById('btnModeKids');
  const btnAdult = document.getElementById('btnModeAdult');

  if (mode === 'kids') {
    btnKids.classList.add('bg-amber-400', 'text-slate-950', 'font-bold');
    btnKids.classList.remove('text-slate-400');
    btnAdult.classList.remove('bg-indigo-600', 'text-white', 'font-bold');
    btnAdult.classList.add('text-slate-400');
  } else {
    btnAdult.classList.add('bg-indigo-600', 'text-white', 'font-bold');
    btnAdult.classList.remove('text-slate-400');
    btnKids.classList.remove('bg-amber-400', 'text-slate-950', 'font-bold');
    btnKids.classList.add('text-slate-400');
  }
  renderDashboardView();
}

function setRole(role) {
  S.role = role;
  S.viewingStudent = null;
  const on = 'px-2 py-1 rounded-md transition text-xs font-medium bg-amber-500 text-slate-950 font-bold';
  const off = 'px-2 py-1 rounded-md transition text-xs font-medium text-slate-400 hover:text-white';
  document.getElementById('btnRoleLearner').className = role === 'learner' ? on : off;
  document.getElementById('btnRoleInstructor').className = role === 'instructor' ? on : off;
  S.tab = role === 'learner' ? 'learn' : 'class';
  switchTab(S.tab);
}

/* ---------- ONBOARDING LOGIC ---------- */
const goalsByAge = {
  kids: [
    { id: 'play', icon: '🎮', title: 'Play Games & Sign with Friends', desc: 'Fun mini-games, visual puzzles, and badges.' },
    { id: 'school', icon: '🏫', title: 'Learn for School & Class', desc: 'Simple daily exercises for classroom communication.' },
    { id: 'family', icon: '❤️', title: 'Talk with Deaf Family Members', desc: 'Essential household signs and warm expressions.' }
  ],
  adult: [
    { id: 'work', icon: '💼', title: 'Professional & Workplace Inclusion', desc: 'Medical, office, and customer service dialogue.' },
    { id: 'family_adult', icon: '🏠', title: 'Deaf Family or Partner Support', desc: 'Deep conversational fluency and daily life signs.' },
    { id: 'academic', icon: '📚', title: 'Academic / Advocacy Requirement', desc: 'Structured FSL syntax, Deaf culture, and grammar.' }
  ]
};

function selectAgeGroup(group) {
  setAgeMode(group);
  renderGoalOptions(group);
  nextOnboardingStep();
}

function renderGoalOptions(group) {
  const container = document.getElementById('goalOptionsContainer');
  const options = goalsByAge[group];
  container.innerHTML = options.map(opt => `
    <button onclick="selectGoal('${opt.title.replace(/'/g, "\\'")}')" class="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-amber-500 text-left transition flex items-center gap-3">
      <span class="text-2xl">${opt.icon}</span>
      <div>
        <div class="font-bold text-slate-900 dark:text-white text-sm">${opt.title}</div>
        <div class="text-xs text-slate-500 dark:text-slate-400">${opt.desc}</div>
      </div>
    </button>`).join('');
}

function selectGoal(goal) { userPreferences.goal = goal; nextOnboardingStep(); }
function selectLevel(lvl) { userPreferences.level = lvl; nextOnboardingStep(); }
function selectPace(pace) { userPreferences.pace = pace; nextOnboardingStep(); }

function nextOnboardingStep() {
  if (onboardingStep < 5) {
    document.getElementById(`step${onboardingStep}`).classList.add('hidden');
    onboardingStep++;
    document.getElementById(`step${onboardingStep}`).classList.remove('hidden');
    document.getElementById('btnOnboardBack').classList.remove('hidden');
    document.getElementById('onboardingProgressBar').style.width = `${(onboardingStep / 5) * 100}%`;
    document.getElementById('onboardingStepNum').innerText = `${onboardingStep}/5`;

    if (onboardingStep === 5) {
      document.getElementById('sumMode').innerText = ageMode === 'kids' ? 'Kids Mode (Play-based)' : 'Adult Mode (Contextual)';
      document.getElementById('sumGoal').innerText = userPreferences.goal || 'General Communication';
      document.getElementById('sumLevel').innerText = userPreferences.level.toUpperCase();
      document.getElementById('sumPace').innerText = `${userPreferences.pace} mins / day`;
      document.getElementById('btnOnboardNext').innerText = 'Start Learning FSL!';
    }
  } else {
    document.getElementById('onboardingSection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
    renderDashboardView();
    showFeedbackPopup('🎉 Learning path activated! Welcome to Talinturo!');
  }
}

function prevOnboardingStep() {
  if (onboardingStep > 1) {
    document.getElementById(`step${onboardingStep}`).classList.add('hidden');
    onboardingStep--;
    document.getElementById(`step${onboardingStep}`).classList.remove('hidden');
    document.getElementById('onboardingProgressBar').style.width = `${(onboardingStep / 5) * 100}%`;
    document.getElementById('onboardingStepNum').innerText = `${onboardingStep}/5`;
    if (onboardingStep === 1) document.getElementById('btnOnboardBack').classList.add('hidden');
    document.getElementById('btnOnboardNext').innerText = 'Continue';
  }
}

function resetToOnboarding() {
  onboardingStep = 1;
  stopPractice();
  document.getElementById('dashboardSection').classList.add('hidden');
  document.getElementById('practiceSection').classList.add('hidden');
  document.getElementById('onboardingSection').classList.remove('hidden');
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`step${i}`);
    if (stepEl) stepEl.classList.add('hidden');
  }
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('btnOnboardBack').classList.add('hidden');
  document.getElementById('onboardingProgressBar').style.width = '20%';
  document.getElementById('onboardingStepNum').innerText = '1/5';
  document.getElementById('btnOnboardNext').innerText = 'Continue';
}

/* ---------- TAB NAVIGATION & DASHBOARD RENDERING ---------- */
function switchTab(tab) {
  S.tab = tab;
  if (tab !== 'progress') S.viewingStudent = null;
  stopPractice();
  document.getElementById('practiceSection').classList.add('hidden');
  document.getElementById('dashboardSection').classList.remove('hidden');
  renderDashboardView();
}

function renderDashboardView() {
  renderNavMenus();
  const area = document.getElementById('viewContentArea');
  if (!area) return;

  if (S.role === 'learner') {
    if (S.tab === 'learn') area.innerHTML = renderLearnTab();
    else if (S.tab === 'dictionary') area.innerHTML = renderDictionaryTab();
    else if (S.tab === 'scenarios') area.innerHTML = renderScenariosTab();
    else if (S.tab === 'progress') area.innerHTML = renderProgressTab();
    else if (S.tab === 'badges') area.innerHTML = renderBadgesTab();
  } else {
    if (S.tab === 'class') area.innerHTML = renderClassTab();
    else if (S.tab === 'progress') area.innerHTML = renderProgressTab();
  }
}

function renderNavMenus() {
  const deskNav = document.getElementById('desktopNav');
  const mobNav = document.getElementById('mobileBottomNav');

  const deskBtn = (tab, icon, label) => `
    <button onclick="switchTab('${tab}')" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl font-bold ${S.tab === tab ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}">
      <i class="fa-solid ${icon}"></i><span>${label}</span>
    </button>`;
  const mobBtn = (tab, icon, label) => `
    <button onclick="switchTab('${tab}')" class="flex flex-col items-center text-[10px] font-bold ${S.tab === tab ? 'text-amber-500' : 'text-slate-400'}"><i class="fa-solid ${icon} text-base"></i>${label}</button>`;

  if (S.role === 'learner') {
    deskNav.innerHTML =
      deskBtn('learn', 'fa-map', 'Learning Path') +
      deskBtn('dictionary', 'fa-book', 'Sign Dictionary') +
      deskBtn('scenarios', 'fa-location-dot', 'Scenario Map') +
      deskBtn('progress', 'fa-chart-line', 'Analytics') +
      deskBtn('badges', 'fa-trophy', 'Badges');
    mobNav.innerHTML =
      mobBtn('learn', 'fa-map', 'Path') +
      mobBtn('dictionary', 'fa-book', 'Signs') +
      mobBtn('scenarios', 'fa-location-dot', 'Map') +
      mobBtn('progress', 'fa-chart-line', 'Stats') +
      mobBtn('badges', 'fa-trophy', 'Badges');
  } else {
    deskNav.innerHTML =
      deskBtn('class', 'fa-users', 'Class Overview') +
      deskBtn('progress', 'fa-chart-pie', 'Student Analytics');
    mobNav.innerHTML =
      mobBtn('class', 'fa-users', 'Class') +
      mobBtn('progress', 'fa-chart-pie', 'Analytics');
  }
}

/* ---------- TAB VIEW GENERATORS ---------- */
function renderLearnTab() {
  const isKids = ageMode === 'kids';
  const resumeId = SCEN.find((s, i) => isScenarioUnlocked(i) && !S.done[s.id])?.id || 'gate';
  const nodeState = id => {
    const idx = SCEN.findIndex(s => s.id === id);
    return S.done[id] ? 'done' : isScenarioUnlocked(idx) ? 'active' : 'locked';
  };
  const nodeBtn = (id, label, size, offset) => {
    const st = nodeState(id);
    const cls = st === 'done' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
      : st === 'active' ? 'bg-amber-400 text-amber-950 shadow-xl shadow-amber-400/40 animate-pulse'
      : 'bg-slate-300 dark:bg-slate-700 text-slate-500';
    const icon = st === 'done' ? '<i class="fa-solid fa-check"></i>' : st === 'active' ? '👋' : '<i class="fa-solid fa-lock"></i>';
    return `
      <div class="relative group ${offset} ${st === 'locked' ? 'opacity-60' : ''}">
        <button onclick="openScenario('${id}')" class="${size} rounded-full font-bold text-xl flex items-center justify-center transform transition group-hover:scale-110 border-4 border-white dark:border-slate-800 ${cls}">${icon}</button>
        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">${label}</div>
      </div>`;
  };

  return `
<div class="space-y-5">
  <div class="bg-gradient-to-br from-amber-400 to-rose-500 rounded-3xl p-5 text-white flex items-center justify-between gap-3">
    <div class="space-y-1">
      <div class="text-[11px] font-bold uppercase tracking-wide text-white/80">Unit 1: Foundations</div>
      <h2 class="text-lg font-black font-display">${isKids ? 'FSL Finger Alphabet & Fun Signs!' : 'Workplace & Professional FSL Communication'}</h2>
      <p class="text-xs text-white/90 mt-1">${isKids ? "Earn stars and unlock Piki's special hats as you practice hand shapes!" : 'Structured dialogue modules, emergency signs, and high-precision vocabulary.'}</p>
      <button onclick="openScenario('${resumeId}')" class="mt-2 px-4 py-2 bg-white text-rose-600 font-bold text-xs rounded-xl shadow">Continue Current Lesson</button>
    </div>
    <div class="text-5xl shrink-0">${isKids ? '🐦' : '🤝'}</div>
  </div>

  <div class="flex flex-col items-center py-4 space-y-6 relative">
    <div class="text-center mb-1">
      <h3 class="font-bold text-slate-800 dark:text-slate-200 text-sm">Unit 1 Progression Trail</h3>
      <p class="text-xs text-slate-400">Click any node to attempt an interactive FSL gesture challenge</p>
    </div>
    ${nodeBtn('gate', 'Gate Hello', 'w-16 h-16', '')}
    <div class="w-12 h-8 border-r-4 border-dashed border-emerald-400 rounded-tr-full self-center translate-x-4"></div>
    ${nodeBtn('classroom', 'Ask Teacher', 'w-20 h-20', 'translate-x-8')}
    <div class="w-12 h-8 border-l-4 border-dashed border-slate-300 dark:border-slate-700 rounded-tl-full self-center -translate-x-4"></div>
    ${nodeBtn('restaurant', 'Fast Food', 'w-16 h-16', '-translate-x-6')}
  </div>

  <div class="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
    <h3 class="font-bold text-sm text-slate-800 dark:text-slate-100">Adaptive Difficulty Ladder</h3>
    <div class="space-y-2">
      ${LEVELS.map((lvl, idx) => `
        <div class="p-3 rounded-2xl border ${idx === 1 ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20' : 'border-slate-100 dark:border-slate-700/60'} flex items-center gap-3 text-xs">
          <span class="w-7 h-7 rounded-full ${idx === 0 ? 'bg-emerald-500 text-white' : idx === 1 ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'} flex items-center justify-center">
            ${idx === 0 ? '✓' : idx + 1}
          </span>
          <div class="flex-1">
            <div class="font-bold text-slate-800 dark:text-slate-200">${lvl[0]}</div>
            <div class="text-[11px] text-slate-400">${lvl[1]}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`;
}

function renderDictionaryTab() {
  const list = SIGNS.filter(s => S.filter === 'All' || s.cat === S.filter);
  return `
<div class="space-y-4">
  <div>
    <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">Sign Dictionary</h2>
    <p class="text-xs text-slate-400">Tap a sign to preview it and practice.</p>
  </div>

  <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
    ${CATS.map(c => `
      <button onclick="setFilterCategory('${c}')" class="px-3 py-1.5 rounded-full border transition whitespace-nowrap ${S.filter === c ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-bold border-transparent' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}">${c}</button>
    `).join('')}
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    ${list.map(s => `
      <div onclick="openSignModal('${s.id}')" class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 cursor-pointer transition flex flex-col justify-between space-y-2 group">
        <div class="h-20 bg-slate-100 dark:bg-slate-700/50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-105 transition">✋</div>
        <div>
          <div class="font-bold text-sm text-slate-900 dark:text-white">${s.fil}</div>
          <div class="text-[11px] text-slate-400 truncate">${s.en}</div>
        </div>
        ${s.m ? `
          <div class="space-y-1">
            <div class="flex justify-between text-[10px] font-bold text-slate-400"><span>Mastery</span><span>${s.m}%</span></div>
            <div class="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full ${s.m >= 80 ? 'bg-emerald-500' : 'bg-amber-400'}" style="width: ${s.m}%;"></div>
            </div>
          </div>
        ` : `<span class="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full inline-block">Not started</span>`}
      </div>
    `).join('')}
  </div>
</div>`;
}

function setFilterCategory(cat) {
  S.filter = cat;
  renderDashboardView();
}

function renderScenariosTab() {
  return `
<div class="space-y-4">
  <div>
    <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">Interactive Town Map</h2>
    <p class="text-xs text-slate-400">Choose a location to launch an AR spatial camera simulation.</p>
  </div>

  <div class="bg-slate-200 dark:bg-slate-800 p-2 sm:p-4 rounded-3xl overflow-x-auto border border-slate-300 dark:border-slate-700">
    ${renderTownMapSVG()}
  </div>

  <div class="space-y-3 pt-2">
    <h3 class="font-bold text-sm text-slate-800 dark:text-slate-200">Scenario List</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${SCEN.map((s, idx) => {
        const isUnlocked = isScenarioUnlocked(idx);
        const isDone = !!S.done[s.id];
        return `
          <div class="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border ${isDone ? 'border-emerald-300 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-700'} flex items-center justify-between gap-3">
            <div class="space-y-1 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold ${isDone ? 'text-emerald-500' : 'text-amber-500'} bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">Level ${s.lvl}</span>
                <h4 class="font-bold text-xs text-slate-900 dark:text-white">${s.name}</h4>
              </div>
              <p class="text-[11px] text-slate-400 line-clamp-1">${s.desc}</p>
            </div>
            ${isUnlocked ? `
              <button onclick="openScenario('${s.id}')" class="px-3 py-1.5 ${isDone ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200' : 'bg-amber-500 text-slate-950 font-bold'} rounded-xl text-xs hover:opacity-90 transition">
                ${isDone ? 'Replay' : 'Start'}
              </button>
            ` : `
              <span class="text-slate-400 text-xs"><i class="fa-solid fa-lock"></i></span>
            `}
          </div>`;
      }).join('')}
    </div>
  </div>
</div>`;
}

function renderTownMapSVG() {
  const ZONES = [
    {lvl:1,x:20,y:20,w:230,h:150},{lvl:2,x:270,y:20,w:430,h:150},
    {lvl:3,x:20,y:190,w:360,h:150},{lvl:4,x:400,y:190,w:300,h:150},
    {lvl:5,x:20,y:360,w:680,h:150}
  ];
  const zs = ZONES.map(z => {
    const list = SCEN.map((s, i) => ({ s, i })).filter(o => o.s.lvl === z.lvl);
    const pins = list.map((o, k) => {
      const { s, i } = o;
      const open = isScenarioUnlocked(i), done = !!S.done[s.id];
      const cx = z.x + z.w * (k + 0.5) / list.length, cy = z.y + 84;
      return `<g class="bld ${done ? 'done' : open ? 'cur' : 'lock'}" ${open ? `onclick="openScenario('${s.id}')" style="cursor:pointer"` : ''}>
        ${open && !done ? `<circle class="pulse" cx="${cx}" cy="${cy}" r="28" fill="none" stroke="currentColor" stroke-opacity="0.35"/>` : ''}
        <circle class="b" cx="${cx}" cy="${cy}" r="22"/>
        <text class="ico" x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="14" fill="currentColor">${done ? '✅' : open ? '📍' : '🔒'}</text>
        <text class="nm" x="${cx}" y="${cy + 40}" text-anchor="middle" font-size="11" font-weight="700">${s.short}</text>
      </g>`;
    }).join('');
    return `<rect class="zn" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="20"/><text class="zt" x="${z.x + 16}" y="${z.y + 24}" font-size="11" font-weight="700">Level ${z.lvl}</text>${pins}`;
  }).join('');
  return `<svg class="w-full min-w-[640px] h-auto" viewBox="0 0 720 530">${zs}</svg>`;
}

function renderProgressTab() {
  const isInst = S.role === 'instructor';
  const studentName = S.viewingStudent || 'Maria Santos';
  const st = isInst ? CLASS_STUDENTS.find(s => s[0] === studentName) : null;
  const acc = st ? `${st[2]}%` : '87%';
  const speed = st ? `${st[3]}s` : '4.2s';
  const doneCount = st ? st[4] : Object.keys(S.done).length;

  return `
<div class="space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">${isInst ? studentName + "'s Performance" : 'Your Progress'}</h2>
      <p class="text-xs text-slate-400">Accuracy, speed, and scenario completions over time.</p>
    </div>
    ${isInst ? `<button onclick="switchTab('class')" class="px-3 py-1.5 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold">← Back to Class</button>` : ''}
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    ${statCard(acc, 'Average Accuracy', 'text-amber-500')}
    ${statCard(speed, 'Response Speed', 'text-indigo-500')}
    ${statCard('1.6', 'Attempts / Step', 'text-emerald-500')}
    ${statCard(`${doneCount} / ${SCEN.length}`, 'Scenarios Completed', 'text-rose-500')}
  </div>

  <div class="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-2">
    <h3 class="font-bold text-sm text-slate-800 dark:text-slate-200">10-Session Accuracy History</h3>
    <div class="h-32 flex items-end justify-between gap-1 pt-4">
      ${PROG_HISTORY.map((val, idx) => `
        <div class="flex-1 h-full flex flex-col justify-end items-center gap-1 group">
          <div class="w-full bg-amber-400/80 hover:bg-amber-500 rounded-t-md transition-all relative" style="height: ${val}%;">
            <span class="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100">${val}%</span>
          </div>
          <span class="text-[9px] text-slate-400">${idx + 1}</span>
        </div>
      `).join('')}
    </div>
  </div>
</div>`;
}

function renderBadgesTab() {
  const earned = BADGES.filter(b => b.on).length;
  return `
<div class="space-y-4">
  <div>
    <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">Badges & Achievements</h2>
    <p class="text-xs text-slate-400">${earned} of ${BADGES.length} earned. Badges reward steady practice and accuracy.</p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    ${BADGES.map(b => `
      <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border ${b.on ? 'border-amber-300 dark:border-amber-800' : 'border-slate-200 dark:border-slate-700 opacity-60'} flex items-start gap-3">
        <div class="w-12 h-12 rounded-2xl ${b.on ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'} flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid ${b.ic}"></i>
        </div>
        <div class="space-y-1">
          <div class="font-bold text-sm text-slate-900 dark:text-white">${b.n}</div>
          <div class="text-[11px] text-slate-400">${b.d}</div>
          ${b.on
            ? `<span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">Earned</span>`
            : `<span class="text-[10px] text-slate-400">${b.p ? `${b.p[0]} / ${b.p[1]} · ` : ''}Locked</span>`}
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
}

function renderClassTab() {
  const avgAcc = Math.round(CLASS_STUDENTS.reduce((a, s) => a + s[2], 0) / CLASS_STUDENTS.length);
  const needHelp = CLASS_STUDENTS.filter(s => s[2] < 65).length;
  return `
<div class="space-y-4">
  <div>
    <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">FSL 101 — Class Overview</h2>
    <p class="text-xs text-slate-400">Section A real-time student analytics overview.</p>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    ${statCard(CLASS_STUDENTS.length, 'Enrolled Students', 'text-amber-500')}
    ${statCard(avgAcc + '%', 'Class Accuracy', 'text-emerald-500')}
    ${statCard('5 / 8', 'Active This Week', 'text-indigo-500')}
    ${statCard(needHelp, 'Need Assistance', 'text-rose-500')}
  </div>

  <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
    <table class="w-full text-left text-xs">
      <thead class="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold">
        <tr>
          <th class="p-3">Learner</th>
          <th class="p-3">Level</th>
          <th class="p-3">Accuracy</th>
          <th class="p-3">Avg Time</th>
          <th class="p-3">Scenarios</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60">
        ${CLASS_STUDENTS.map(s => `
          <tr onclick="inspectStudent('${s[0]}')" class="hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer transition">
            <td class="p-3 font-bold text-slate-800 dark:text-slate-100">
              ${s[0]}${s[2] < 65 ? `<span class="ml-1 text-[9px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-semibold">Needs Help</span>` : ''}
            </td>
            <td class="p-3 text-slate-500">${s[1]}</td>
            <td class="p-3 font-bold ${s[2] >= 80 ? 'text-emerald-500' : s[2] >= 65 ? 'text-amber-500' : 'text-rose-500'}">${s[2]}%</td>
            <td class="p-3 text-slate-500">${s[3]}s</td>
            <td class="p-3 text-slate-500">${s[4]} / ${SCEN.length}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

function inspectStudent(name) {
  S.viewingStudent = name;
  S.tab = 'progress';
  renderDashboardView();
}

/* ---------- MODAL DIALOG ENGINE ---------- */
function openSignModal(id) {
  const s = SIGNS.find(x => x.id === id);
  if (!s) return;
  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div onclick="closeModal()" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center">
      <div onclick="event.stopPropagation()" class="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div class="h-36 bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden">
          <span class="text-5xl animate-pulse">✋</span>
          <span class="text-[10px] text-slate-400 mt-2">Sign Demonstration Video</span>
        </div>
        <div>
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white">${s.fil}</h3>
            <span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">${s.cat}</span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">${s.en}</p>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button onclick="closeModal()" class="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl">Close</button>
          <button onclick="closeModal(); openScenario(null, '${s.id}')" class="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow">Practice Sign</button>
        </div>
      </div>
    </div>`;
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

/* ---------- AR CANVAS & SCENARIO ENGINE ---------- */
function openScenario(id, practiceSign) {
  let sc, i = 0;
  if (practiceSign) {
    const s = SIGNS.find(x => x.id === practiceSign);
    if (!s) return;
    sc = {
      id: 'practice', name: 'Practice: ' + s.fil, lvl: 1, scene: 'practice', reveal: true,
      steps: [{ npc: 'Coach Piki', text: 'Perform the sign in front of the camera.', tr: s.en, obj: 'Perform "' + s.fil + '" (' + s.en + ').', t: s.id }]
    };
  } else {
    const idx = SCEN.findIndex(x => x.id === id);
    if (idx < 0) return;
    if (!isScenarioUnlocked(idx)) {
      showFeedbackPopup('🔒 Finish the previous scenario to unlock this one.');
      return;
    }
    sc = SCEN[idx];
    i = Math.min(S.resume[id] || 0, sc.steps.length - 1);
  }

  P = { sc, i, phase: 'idle', att: 0, stepAtt: 0, hint: false, t0: Date.now(), demo: 'ok', pts: 0, times: [], last: null, run: 0 };

  document.getElementById('dashboardSection').classList.add('hidden');
  document.getElementById('practiceSection').classList.remove('hidden');

  renderScenarioStep();
  initARCanvas();
  paintARStage();
}

// Updates the practice UI for the current step WITHOUT resetting scenario state.
function renderScenarioStep() {
  const sc = P.sc, step = sc.steps[P.i];
  document.getElementById('arSceneNameTag').innerText = sc.name;
  document.getElementById('arStepCounterTag').innerText = `Step ${P.i + 1}/${sc.steps.length}`;
  document.getElementById('arObjectiveText').innerText = step.obj;
  document.getElementById('scenarioPanelTitle').innerText = sc.name;
  document.getElementById('scenarioPanelLevel').innerText = `Level ${sc.lvl}`;
  document.getElementById('scenarioPanelTrans').innerText = step.tr;
  document.getElementById('scenarioPromptBody').innerText = step.obj;
  document.getElementById('hintContainer').innerHTML = '';
  document.getElementById('fb').innerHTML = '';
  setSimDemo(P.demo);
}

function setSimDemo(demo) {
  if (!P) return;
  P.demo = demo;
  const base = 'py-1.5 rounded-xl font-bold text-[11px] ';
  const offCls = base + 'bg-slate-800 text-slate-400 border border-slate-700';
  document.getElementById('btnDemoOk').className = demo === 'ok' ? base + 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : offCls;
  document.getElementById('btnDemoWrong').className = demo === 'wrong' ? base + 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : offCls;
  document.getElementById('btnDemoLow').className = demo === 'low' ? base + 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : offCls;
}

function showHint() {
  if (!P) return;
  P.hint = true;
  const s = SIGNS.find(x => x.id === P.sc.steps[P.i].t);
  document.getElementById('hintContainer').innerHTML = `<span class="text-xs font-bold text-amber-400">Hint: Sign "${s.fil}" (${s.en})</span>`;
}

function doSign() {
  if (!P || P.phase !== 'idle') return;
  const run = ++P.run;
  P.think = (Date.now() - P.t0) / 1000;
  P.phase = 'count';
  P.n = 3;
  paintARStage();

  const tick = () => {
    if (!P || P.run !== run) return;
    P.n--;
    if (P.n > 0) {
      paintARStage();
      setTimeout(tick, 650);
    } else {
      P.phase = 'record';
      paintARStage();
      setTimeout(() => {
        if (!P || P.run !== run) return;
        P.phase = 'recognize';
        paintARStage();
        setTimeout(() => {
          if (P && P.run === run) finishSignAttempt();
        }, 800);
      }, 1300);
    }
  };
  setTimeout(tick, 650);
}

function finishSignAttempt() {
  const step = P.sc.steps[P.i];
  const targetSign = SIGNS.find(x => x.id === step.t);

  if (P.demo === 'ok') {
    P.att++; P.stepAtt++;
    const pts = Math.max(0, (P.stepAtt === 1 ? 50 : 30) - (P.hint ? 5 : 0));
    P.pts += pts; S.points += pts;
    P.times.push(P.think);
    P.last = { kind: 'ok', rec: targetSign, conf: 88 + Math.floor(Math.random() * 10), time: P.think, pts };
  } else if (P.demo === 'wrong') {
    P.att++; P.stepAtt++;
    const other = SIGNS.filter(s => s.id !== targetSign.id);
    P.last = { kind: 'wrong', rec: other[Math.floor(Math.random() * other.length)], conf: 60 };
  } else {
    P.last = { kind: 'low', conf: 30 };
  }
  P.phase = 'result';
  paintARStage();
}

function paintARStage() {
  if (!P) return;
  const ph = P.phase;
  const L = P.last;
  const step = P.sc.steps[P.i];
  const fb = document.getElementById('fb');
  const bub = document.getElementById('bubble');
  const status = document.getElementById('status');

  let say = step.text;

  if (ph === 'result') {
    if (L.kind === 'ok') {
      say = REPLY[step.t] || 'Nice! I understood you.';
      status.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>Recognized: ${L.rec.fil} (${L.conf}%)</span>`;
      const isLast = P.i >= P.sc.steps.length - 1;
      fb.innerHTML = `
        <div class="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-3xl text-xs space-y-2">
          <b class="text-emerald-300 text-sm block font-bold">Objective met! +${L.pts} XP</b>
          <p class="text-emerald-200/80">Recognized <b>${L.rec.fil}</b> in ${L.time.toFixed(1)}s.</p>
          <button onclick="nextScenarioStep()" class="w-full py-2 bg-emerald-500 text-white font-bold rounded-xl shadow mt-2">${isLast ? 'Finish ✓' : 'Next Step →'}</button>
        </div>`;
    } else if (L.kind === 'wrong') {
      say = "Hmm, I didn't recognize that sign.";
      status.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-400"></span><span>Saw: ${L.rec.fil} (${L.conf}%)</span>`;
      fb.innerHTML = `
        <div class="bg-rose-950/60 border border-rose-500/40 p-4 rounded-3xl text-xs space-y-2">
          <b class="text-rose-300 text-sm block font-bold">Not quite. Try again!</b>
          <p class="text-rose-200/80">Recognized <b>${L.rec.fil}</b> instead of the target sign.</p>
          <button onclick="retrySign()" class="w-full py-2 bg-rose-600 text-white font-bold rounded-xl shadow mt-2">Retry Sign</button>
        </div>`;
    } else {
      say = "I can't see your hands clearly.";
      status.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span><span>Hand unclear</span>`;
      fb.innerHTML = `
        <div class="bg-amber-950/60 border border-amber-500/40 p-4 rounded-3xl text-xs space-y-2">
          <b class="text-amber-300 text-sm block font-bold">Hand unclear</b>
          <p class="text-amber-200/80">Keep your full hand inside the sign zone frame.</p>
          <button onclick="retrySign()" class="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-xl shadow mt-2">Retry Sign</button>
        </div>`;
    }
  } else {
    fb.innerHTML = '';
    const label = ph === 'count' ? `Get ready… ${P.n}`
      : ph === 'record' ? 'Recording…'
      : ph === 'recognize' ? 'Recognizing…'
      : 'Waiting for sign';
    const dot = ph === 'idle' ? 'bg-slate-400' : 'bg-sky-400';
    status.innerHTML = `<span class="w-2 h-2 rounded-full ${dot}"></span><span>${label}</span>`;
  }

  bub.innerHTML = `<small class="text-[10px] text-slate-500 font-bold uppercase block">${step.npc}</small><b class="text-xs font-bold">${say}</b>`;
  bub.classList.add('on');
}

function retrySign() {
  if (!P) return;
  P.phase = 'idle';
  P.t0 = Date.now();
  paintARStage();
}

function nextScenarioStep() {
  if (!P) return;
  if (P.i < P.sc.steps.length - 1) {
    P.i++; P.stepAtt = 0; P.hint = false; P.phase = 'idle'; P.t0 = Date.now(); P.last = null;
    if (P.sc.id !== 'practice') S.resume[P.sc.id] = P.i;
    renderScenarioStep();
    paintARStage();
  } else if (P.sc.id === 'practice') {
    showFeedbackPopup('🎉 Nice practice!');
    switchTab('dictionary');
  } else {
    S.done[P.sc.id] = true;
    delete S.resume[P.sc.id];
    showFeedbackPopup('🎉 Mission Complete! Level Stars Unlocked!');
    switchTab('scenarios');
  }
}

// Cancels pending timers, stops the camera, and clears the active scenario.
function stopPractice() {
  if (P) P.run++;
  P = null;
  if (CAM) {
    CAM.getTracks().forEach(t => t.stop());
    CAM = null;
    const v = document.getElementById('vid');
    if (v) { v.hidden = true; v.srcObject = null; }
    const b = document.getElementById('camBtn');
    if (b) b.innerText = 'Use Camera';
  }
}

async function toggleCam() {
  if (CAM) {
    CAM.getTracks().forEach(t => t.stop());
    CAM = null;
    const v = document.getElementById('vid');
    v.hidden = true; v.srcObject = null;
    document.getElementById('camBtn').innerText = 'Use Camera';
    return;
  }
  try {
    CAM = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    const v = document.getElementById('vid');
    v.srcObject = CAM; v.hidden = false;
    document.getElementById('camBtn').innerText = 'Turn Off';
    showFeedbackPopup('Camera connected! Simulated landmark tracker active.');
  } catch (err) {
    CAM = null;
    showFeedbackPopup('Camera not accessible. Staying in canvas sim mode.');
  }
}

/* ---------- MINI CANVAS AR ENGINE ---------- */
let arLoopId = 0;
function initARCanvas() {
  const cvs = document.getElementById('arc');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  const myLoop = ++arLoopId; // cancels any previous render loop

  const render = () => {
    if (myLoop !== arLoopId || !cvs.isConnected) return;
    const w = cvs.parentElement.clientWidth, h = cvs.parentElement.clientHeight;
    if (cvs.width !== w) cvs.width = w;
    if (cvs.height !== h) cvs.height = h;

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = 'rgba(127,227,255,0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < cvs.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, cvs.height * 0.6); ctx.lineTo(x, cvs.height); ctx.stroke();
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

/* ---------- FEEDBACK POPUP SYSTEM ---------- */
let popupTimer = null, popupTimer2 = null;
function showFeedbackPopup(msg) {
  const banner = document.getElementById('feedbackBanner');
  clearTimeout(popupTimer); clearTimeout(popupTimer2);
  banner.innerText = msg;
  banner.className = 'absolute top-16 left-4 right-4 z-50 p-3 rounded-2xl shadow-2xl border text-center font-bold text-xs bg-emerald-500 text-white border-emerald-400 transition-all transform translate-y-0 opacity-100';
  popupTimer = setTimeout(() => {
    banner.classList.add('-translate-y-4', 'opacity-0');
    popupTimer2 = setTimeout(() => banner.classList.add('hidden'), 300);
  }, 2500);
}