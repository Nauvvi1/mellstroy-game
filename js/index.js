const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const rnd = arr => arr[Math.floor(Math.random() * arr.length)];
const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp01 = x => Math.max(0, Math.min(1, x));

let programmaticScroll = false;
let aptRevealOnFirstViewDone = false;

const neon = $('#neonBackdrop'); const nctx = neon.getContext('2d');
let NW = 0, NH = 0, t0 = 0, parallax = 0;
function resizeNeon() { NW = neon.width = innerWidth * (devicePixelRatio || 1); NH = neon.height = innerHeight * (devicePixelRatio || 1); }
function drawNeon(ts) {
    t0 = ts; nctx.clearRect(0, 0, NW, NH);
    const dpr = devicePixelRatio || 1;

    const baseY = NH;
    const maxH = NH * 0.60;

    {
        let x = 0, i = 0; const safetyCap = 500;
        while (x < NW && i < safetyCap) {
            const rawH = (Math.sin(i * .6 + ts * .0015) + 1.5) * 70 * dpr + (i % 7) * 10 * dpr;
            const h = rawH * (maxH / (235 * dpr));
            const w = 10 * dpr + (Math.sin(ts * 0.001 + i) * 5 + 12) * dpr;
            const y = baseY - h;

            const g = nctx.createLinearGradient(x, y, x, baseY);
            g.addColorStop(0, 'rgba(34,227,255,.16)');
            g.addColorStop(.75, 'rgba(255,47,179,.10)');
            g.addColorStop(1, 'rgba(0,0,0,0)');
            nctx.fillStyle = g; nctx.fillRect(x, y, w, baseY - y);

            nctx.strokeStyle = 'rgba(200,240,255,.12)';
            nctx.lineWidth = 1 * dpr;
            nctx.strokeRect(x + .5 * dpr, y + .5 * dpr, w - 1 * dpr, baseY - y - 1 * dpr);

            x += w; i++;
        }
    }

    const cx = NW * .5, cy = NH * .62 + parallax * 12 * dpr, s = Math.min(NW, NH) * .28;
    const edges = [[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0], [0.15, -0.6, 0.85, -0.6], [0.85, -0.6, 0.5, -1.0], [0.5, -1.0, 0.15, -0.6], [0, 0, 0.15, -0.6], [1, 0, 0.85, -0.6], [0, 1, 0.5, -1.0], [1, 1, 0.5, -1.0]];
    const phase = ((t0 / 4000) % 1); const appear = phase < .6 ? (phase / .6) : (1 - Math.min(1, (phase - .6) / .4)); const alpha = .15 + .85 * appear;
    nctx.save(); nctx.translate(cx, cy);
    nctx.strokeStyle = `rgba(130,230,255,${.6 * alpha})`; nctx.lineWidth = 2 * dpr; nctx.shadowColor = `rgba(130,230,255,${.35 * alpha})`; nctx.shadowBlur = 10 * dpr;
    edges.forEach(e => { const [x1, y1, x2, y2] = e, cut = Math.min(1, appear * 1.2); nctx.beginPath(); nctx.moveTo((x1 - .5) * s * cut, (y1 - .2) * s * cut); nctx.lineTo((x2 - .5) * s * cut, (y2 - .2) * s * cut); nctx.stroke(); });
    nctx.restore();

    const fog = nctx.createLinearGradient(0, baseY - 70 * dpr, 0, NH); fog.addColorStop(0, 'rgba(0,0,0,0)'); fog.addColorStop(1, 'rgba(10,12,18,.55)'); nctx.fillStyle = fog; nctx.fillRect(0, baseY - 70 * dpr, NW, NH);

    requestAnimationFrame(drawNeon);
}
window.addEventListener('scroll', () => { const vh = innerHeight || 1, y = scrollY || 0; parallax = clamp01(1 - Math.min(1, y / vh)) * -0.2; });

const brickWall = $('#brickWall');
const sampleNicks = [
    'legend_777', 'from_ny', 'lego_master', 'tattoo_guy', 'mama_privet', 'dubai_dreamer', 'flat_seeker',
    'stePa_fan', 'kommentator', 'random_hero', 'nohands_king', 'memlord', 'xXx_house_xXx', 'neon_kitty',
    'lofi_builder', 'hypehunter', 'zhivem_odin_raz', 'am_am_am', 'fruits_time', 'businessmen', 'come_here_bro',
    'stop_stop', 'svist_master', 'balcony_god', 'wifi_1ms', 'dubaiflat', 'kvartira4u', 'kvartira777', 'papa_v_dome',
    'remont_evro', 'ya_vip', 'penthauzzz', 'lego_dom', 'bti_memer', 'hata_maniya', 'stePa_view', 'kvartirochka',
    'xata_na_ryumke', 'zabral_bablo', 'prosto_legend', 'khrustalniy_balkon', 'ya_sosed', 'mell_vibe', 'kvartirolich',
    'dom_na_kolesah', 'kvartirnyy_ded', 'balcony_queen', 'dubai_elite', 'house_hunter', 'kvartira_fan', 'flatlord',
    'balconyking', 'bazar_zero', 'give_me_flat', 'vip_entry', 'new_home_now', 'mellstroy_army', 'brick_mason',
    'neon_door', 'flatdealer', 'mop_gang', 'vibe_keeper', 'sticker_guru', 'wifi_sosed', 'keyholder_228',
    'repair_god', 'tiktoker_from_bti', 'balcony_philosopher', 'vape_in_corridor', 'loft_addict',
    'sosed_on_8', 'dorm_boss', 'trash_talker', 'rent_king', 'soundproof_soul', 'drill_asmr', 'mirror_guy',
    'coffeewave', 'light_on_off', 'plant_parent', 'piano_in_kitchen', 'floor17_blogger', 'ghost_in_flat',
    'elevator_fighter', 'wallpaper_slayer', 'windowless_gang', 'hallway_artist', 'neon_tape', 'ceiling_thinker',
    'rent_vibes', 'toaster_lover', 'balkon_flex', 'iron_god', 'late_renter', 'wifi_sniffer', 'roomtour_fan',
    'homebar_star', 'flat_visionary', 'tape_master', 'notabot2000', 'neighbor_bro', 'balcony_veteran',
    'dust_collector', 'flatzilla', 'sosed_1337', 'kvartira_mode_on', 'life_in_rent', 'reel_master', 'lounge_dog',
    'vibe_in_progress', 'livingroom_lofi', 'rent_legend', 'balcony_vibe', 'fixit_hero', 'brokenlamp_fan',
    'slippers_god', 'cleaning_boy', 'trashqueen', 'sofa_pilot', 'doorbell_dreamer', 'microflat_owner',
    'lamp_spirit', 'curtain_gamer', 'amogus_in_kitchen', 'roomtour_daily', 'stream_from_hata', 'lightroom_boy',
    'wifi_killer', 'lego_builder_88', 'balcony_monk', 'ceiling_rider', 'mell_gangster', 'flatman_228',
    'garage_dreamer', 'tape_king', 'sleepwalker_in_rent', 'plank_influencer', 'heater_master', 'plugged_in_24_7'
];

function dropBrick(nick, delay = 0) {
    const b = document.createElement('div'); b.className = 'brick'; b.textContent = nick;
    const W = brickWall.clientWidth, H = brickWall.clientHeight;
    const bw = 110 + Math.random() * 80; b.style.minWidth = bw + 'px';
    const left = Math.random() * (W - bw - 20) + 10; const top = Math.random() * (H - 40) + 10;
    b.style.left = Math.max(6, left) + 'px'; b.style.top = Math.max(6, top) + 'px';
    b.style.setProperty('--dx', (Math.random() * 24 + 8) + 'px');
    b.style.setProperty('--dy', (Math.random() * 16 + 6) + 'px');
    b.style.setProperty('--dx2', (-Math.random() * 18 - 6) + 'px');
    b.style.setProperty('--dy2', (Math.random() * 20 + 8) + 'px');
    b.style.setProperty('--dur', (18 + Math.random() * 12) + 's');
    b.style.animationDelay = (delay / 1000) + 's';
    brickWall.appendChild(b);
    if (brickWall.children.length > 140) brickWall.removeChild(brickWall.firstChild);
}
function seedBricks() { for (let i = 0; i < 40; i++) setTimeout(() => dropBrick(rnd(sampleNicks)), i * 90); }

const aptImages = [
    'img/apt/placeholder-1.jpg',
    'img/apt/placeholder-2.jpg',
    'img/apt/placeholder-3.jpg',
    'img/apt/placeholder-4.jpg',
    'img/apt/placeholder-5.jpg',
    'img/apt/placeholder-6.jpg',
    'img/apt/placeholder-7.jpg',
    'img/apt/placeholder-8.jpg',
    'img/apt/placeholder-9.jpg',
    'img/apt/placeholder-10.jpg',
    'img/apt/placeholder-11.jpg',
    'img/apt/placeholder-12.jpg',
    'img/apt/placeholder-13.jpg'
];

const aptTypes = [
    'Однушка', 'Двушка', 'Студия', 'Пентхаус', 'Лофт', 'Смарт-квартира',
    'Таунхаус', 'Дуплекс', 'Евродвушка', 'Апартаменты',
    'Гостинка', 'Хрущёвка люкс', 'Микростудия', 'Дворец «для сторис»'
];

const aptCities = [
    'Минск', 'Москва', 'Питер', 'Дубай', 'Алматы', 'Нью-Йорк', 'Казань', 'Сочи',
    'Екатеринбург', 'Новосиб', 'Тбилиси', 'Ереван', 'Астана', 'Прага',
    'Стамбул', 'Лос-Анджелес', 'Барселона', 'Будапешт', 'Батуми', 'Кипр'
];

const aptViews = [
    'на закат', 'на реку', 'на город', 'на TikTok-дом', 'во двор',
    'на небоскрёбы', 'на стадион', 'на парк', 'на озеро',
    'на автостраду (ASMR)', 'на кофе-поинт', 'на бассейн', 'на крышу соседей'
];

const aptDescs = [
    'Евро-ремонт, Wi-Fi летает, соседи мемные.',
    'Дизайн от подписчиков, кухня по фэншуй.',
    'Лифт по расписанию, домофон по блату.',
    'Балкон с вайбом «ну всё, теперь я блогер».',
    'Утренний свет — как фильтр в рилсах.',
    'Паркет, который щёлкает, как лайки.',
    'Смарт-дом: свет по хлопку, мемы по свисту.',
    'Паркоместо на удачу — как колесо.',
    'Wi-Fi мощнее, чем у соседа сверху.',
    'Пыль тут не живёт, только вайб.',
    'Зеркала отражают не только лицо, но и успех.',
    'Диван — сцена, кухня — подкаст.',
    'Вид из окна вдохновляет на сторис без фильтров.',
    'Здесь даже чай кипит с контентом.',
    'Шторы закрываются сами, когда прилетает бывшая.',
    'Свет включается по аплодисменту твоего эго.',
    'Фен сушит не волосы, а грусть после стрима.',
    'Каждый метр квадратный — повод для лайка.',
    'Тут пахнет не краской, а хайпом и капучино.',
    'Обои с узором «держись, мы почти блогеры».',
    'Ночью слышно, как соседи спорят про тренды.'
];

const neighborNames = [
    'tatoo_on_forehead', 'lego_ninja', 'komment_top1', 'nohands_warrior', 'mell_fan999',
    'ny_billboard_guy', 'lofi_room', 'stePa_view', 'flat_lover', 'bti_memer', 'khimki_odin',
    'wifi1ms_god', 'balcony_baron', 'hallway_streamer', 'soundproof_dreamer',
    'mellstroy_watcher', 'neon_kitchen', 'piano_in_bathroom', 'gachi_in_town',
    'reel_engineer', 'window_talker', 'plank_floor_god', 'mop_king', 'mirror_selfie24_7',
    'broom_influencer', 'cringe_collector', 'elevator_dj', 'balcony_gang', 'light_mode_only',
    'dark_theme_lord', 'roomtour_addict', 'doorbell_beats', 'rent_is_a_myth', 'floor_17_vibes',
    'fancy_microwave', 'cat_streamer', 'ceiling_watcher', 'vibe_keeper', 'neighbor_from_hell',
    'hood_blogger', 'drill_sound_asmr', 'ironing_philosopher', 'tiktok_plumber', 'wallpaper_boy',
    'poster_girl', 'vape_in_corridor', 'roommate_ghost', 'shower_vocalist', 'dust_collector',
    'synth_in_basement', 'coffee_pioneer', 'serial_marathoner', 'plant_therapist', 'balcony_philosopher',
    'dorm_dreamer', 'headphones_on_always', 'mini_bar_visionary', 'wifi_hacker', 'soundproof_illusionist',
    'cheap_lambo_owner', 'not_a_bot_really', 'flex_on_floor5', 'elevator_shaman', 'lounge_goblin'
];

let currentNeighbors = [];
function generateNeighbors() { const pick = new Set(); while (pick.size < 5) pick.add(rnd(neighborNames)); currentNeighbors = [...pick]; }

function playAptReveal() {
    const box = document.getElementById('aptVisual');

    const scan = document.createElement('div'); scan.className = 'scan'; box.appendChild(scan);
    scan.animate([
        { transform: 'translateX(-120%)', opacity: 0 },
        { transform: 'translateX(0%)', opacity: 1, offset: .5 },
        { transform: 'translateX(120%)', opacity: 0 }
    ], { duration: 800, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => scan.remove();

    let portal = box.querySelector('.portal');
    if (!portal) { portal = document.createElement('div'); portal.className = 'portal'; box.appendChild(portal); }
    const ring = document.createElement('div');
    Object.assign(ring.style, {
        position: 'absolute', left: '50%', top: '50%', width: '22vmin', height: '22vmin',
        borderRadius: '50%', boxShadow: '0 0 0 0 rgba(255,214,120,0), inset 0 0 60px rgba(255,214,120,.25)',
        transform: 'translate(-50%,-50%) scale(.2)', opacity: '0'
    });
    portal.appendChild(ring);
    ring.animate([
        { transform: 'translate(-50%,-50%) scale(.2)', opacity: 0, boxShadow: '0 0 0 0 rgba(255,214,120,0), inset 0 0 60px rgba(255,214,120,.25)' },
        { transform: 'translate(-50%,-50%) scale(1.05)', opacity: 1, boxShadow: '0 0 0 18px rgba(255,214,120,.18), inset 0 0 100px rgba(255,214,120,.35)', offset: .6 },
        { transform: 'translate(-50%,-50%) scale(1.15)', opacity: 0, boxShadow: '0 0 0 28px rgba(255,214,120,0), inset 0 0 0 rgba(255,214,120,0)' }
    ], { duration: 900, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => ring.remove();

    for (let i = 0; i < 10 + Math.floor(Math.random() * 4); i++) {
        const p = document.createElement('div');
        Object.assign(p.style, {
            position: 'absolute', width: '6px', height: '10px', borderRadius: '2px',
            left: '50%', top: '50%', background: ['#FFD35A', '#FF9BD7', '#8AD1FF'][Math.floor(Math.random() * 3)]
        });
        portal.appendChild(p);
        const ang = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 120, rot = (Math.random() * 720 - 360);
        p.animate([
            { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
            { transform: `translate(${Math.cos(ang) * dist - 50}px, ${Math.sin(ang) * dist - 50}px) rotate(${rot}deg)`, opacity: 0 }
        ], { duration: 850 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,0,1)' }).onfinish = () => p.remove();
    }

    const badge = document.getElementById('aptBadge');
    const m = /Хата №(\d+)/.exec(badge.textContent);
    const goal = m ? parseInt(m[1], 10) : randint(1, 9999);
    const start = Math.max(1, goal - randint(30, 120));
    const t0 = performance.now(), D = 680;
    function step(ts) {
        const p = Math.min(1, (ts - t0) / D);
        const val = Math.floor(start + (goal - start) * (1 - Math.pow(1 - p, 3)));
        badge.textContent = `Хата №${val}`;
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const aptVisualEl = document.getElementById('aptVisual');
const ioAptFirst = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!aptRevealOnFirstViewDone && e.isIntersecting && !programmaticScroll) {
            playAptReveal();
            aptRevealOnFirstViewDone = true;
            ioAptFirst.disconnect();
        }
    });
}, { threshold: 0.35 });

ioAptFirst.observe(aptVisualEl);


function showNeighbors() {
    const box = $('#neighborsBox');
    const list = $('#neighborsList');
    box.hidden = false;
    list.innerHTML = '';
    currentNeighbors.forEach((n, i) => {
        const chip = document.createElement('span');
        chip.className = 'neighbor-chip';
        chip.textContent = n;
        list.appendChild(chip);
        chip.animate(
            [
                { transform: 'translateY(6px) scale(.9)', opacity: 0 },
                { transform: 'translateY(0) scale(1.04)', opacity: 1, offset: .7 },
                { transform: 'translateY(0) scale(1)', opacity: 1 }
            ],
            { duration: 360, delay: i * 40, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
        );
    });
    box.animate(
        [
            { transform: 'scaleY(.96)', opacity: .8 },
            { transform: 'scaleY(1)', opacity: 1 }
        ],
        { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );
}

const IMG_DECK_KEY = 'msh_apt_img_deck_v1';
const IMG_LAST_KEY = 'msh_apt_img_last_v1';

function shuffledDeck(n) {
    const a = Array.from({ length: n }, (_, i) => i);
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function loadDeck() {
    try {
        const raw = localStorage.getItem(IMG_DECK_KEY);
        const arr = raw ? JSON.parse(raw) : null;
        if (Array.isArray(arr)) {
            return arr.filter(i => Number.isInteger(i) && i >= 0 && i < aptImages.length);
        }
    } catch (e) { }
    return [];
}

function saveDeck(deck) {
    localStorage.setItem(IMG_DECK_KEY, JSON.stringify(deck));
}

function getNextAptImage() {
    let deck = loadDeck();

    if (deck.length === 0) {
        deck = shuffledDeck(aptImages.length);

        const lastStr = localStorage.getItem(IMG_LAST_KEY);
        const lastIdx = lastStr !== null ? parseInt(lastStr, 10) : -1;
        if (deck.length > 1 && deck[0] === lastIdx) {
            const swapWith = 1 + Math.floor(Math.random() * (deck.length - 1));
            [deck[0], deck[swapWith]] = [deck[swapWith], deck[0]];
        }
        saveDeck(deck);
    }

    const idx = deck.shift();
    saveDeck(deck);
    localStorage.setItem(IMG_LAST_KEY, String(idx));
    return aptImages[idx];
}


function rerollApartment(animate = true) {
    const num = randint(1, 9999);
    const img = getNextAptImage();
    const type = rnd(aptTypes), city = rnd(aptCities), view = rnd(aptViews), desc = rnd(aptDescs);

    const v = $('#aptVisual');
    v.style.backgroundImage =
        `linear-gradient(180deg, rgba(34,227,255,.06), transparent 65%),` +
        `linear-gradient(120deg, rgba(255,47,179,.10), transparent 55%),url('${img}')`;

    $('#aptBadge').textContent = `Хата №${num}`;
    $('#aptType').textContent = `Тип: ${type}`;
    $('#aptCity').textContent = `Город: ${city}`;
    $('#aptView').textContent = `Вид: ${view}`;
    $('#aptDesc').textContent = `Описание: ${desc}`;
    generateNeighbors(); dropBrick('owner_' + num);

    if (animate) playAptReveal();
}


const windFx = document.getElementById('windFx');

function runWind(duration = 1100) {
    const lines = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.className = 'wind-line';
        line.style.left = (Math.random() * 100) + 'vw';
        line.style.top = (10 + Math.random() * 80) + 'vh';
        windFx.appendChild(line);

        const dx = 8 + Math.random() * 20;
        const dy = -6 + Math.random() * 12;
        const delay = Math.random() * 0.25 * duration;

        line.animate(
            [
                { opacity: 0, transform: 'translate(0vw, 0vh) translateZ(0)' },
                { opacity: .5, offset: .2, transform: 'translate(0vw, 0vh) translateZ(0)' },
                { opacity: 0, transform: `translate(${dx}vw, ${dy}vh) translateZ(0)` }
            ],
            { duration: duration * 0.9 + Math.random() * 200, delay, easing: 'cubic-bezier(.2,.8,.2,1)' }
        ).onfinish = () => line.remove();
    }
}

function smoothScrollTo(el, duration = 1100) {
    programmaticScroll = true;
    const start = scrollY;
    const end = el.getBoundingClientRect().top + scrollY;
    const t0 = performance.now();
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    runWind(duration);

    function step(ts) {
        const p = Math.min(1, (ts - t0) / duration);
        const y = Math.round(start + (end - start) * ease(p));
        scrollTo(0, y);
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    setTimeout(() => { programmaticScroll = false; }, duration + 80);
}


$('#btnReroll').addEventListener('click', rerollApartment);
document.getElementById('ctaGetApt').addEventListener('click', e => {
    e.preventDefault();
    smoothScrollTo(document.getElementById('apt'), 1100);
    setTimeout(() => rerollApartment(true), 350);
});

document.getElementById('ctaWheel').addEventListener('click', e => {
    e.preventDefault();
    smoothScrollTo(document.getElementById('wheel'), 1100);
});
$('#btnNeighbors').addEventListener('click', showNeighbors);

const GRID_UNITS = 6;
const LEN_HALF = 1;
const LEN_FULL = 2;
const WALL_ROWS = 8;
const ROW_H = 48;
const GAP = 3;

const STORAGE_KEY = 'msh_wall_pattern_v7';

const wallStage = $('#wallStage'); const crane = $('#crane'); const wallInfo = $('#wallInfo');
let wall = [];

function wallSize() { wallStage.style.height = (WALL_ROWS * ROW_H + GAP * 2) + 'px'; }
function stageWidth() { return wallStage.getBoundingClientRect().width || wallStage.clientWidth || 1; }
function unitGeom() {
    const W = stageWidth();
    const totalGap = (GRID_UNITS - 1) * GAP;
    const unit = (W - totalGap) / GRID_UNITS;
    return { unit };
}
function unitToX(u) { const { unit } = unitGeom(); return Math.round(u * unit + u * GAP); }
function unitsToW(n) { const { unit } = unitGeom(); return Math.round(n * unit + (n - 1) * GAP); }
function rowToY(r) { const h = wallStage.clientHeight; return Math.round(h - (r + 1) * ROW_H - GAP); }

function emptyRow() { return Array.from({ length: GRID_UNITS }, () => null); }

function rowSlots(r) {
    const rowIndex1 = r + 1;
    if (rowIndex1 % 2 === 1) {
        return [{ startU: 0, len: LEN_FULL }, { startU: 2, len: LEN_FULL }, { startU: 4, len: LEN_FULL }];
    } else {
        return [{ startU: 0, len: LEN_HALF }, { startU: 1, len: LEN_FULL }, { startU: 3, len: LEN_FULL }, { startU: 5, len: LEN_HALF }];
    }
}

function supportOk(r, u, len) {
    if (r === 0) return true;
    for (let i = 0; i < len; i++) {
        if (!wall[r - 1][u + i]) return false;
    }
    return true;
}

function isFree(r, u, len) {
    if (u < 0 || u + len > GRID_UNITS) return false;
    for (let i = 0; i < len; i++) if (wall[r][u + i]) return false;
    return true;
}

function putBrick(r, u, len, nick, gold = false) {
    wall[r][u] = { start: true, len, nick, gold };
    for (let i = 1; i < len; i++) wall[r][u + i] = { cont: true };
}

function initWall() {
    wall = Array.from({ length: WALL_ROWS }, emptyRow);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length) { wall = parsed; } } catch { }
    } else {
        const targetFill = 0.4 + Math.random() * 0.35;
        const totalSlots = Array.from({ length: WALL_ROWS }, (_, r) => rowSlots(r).length).reduce((a, b) => a + b, 0);
        let placed = 0, guard = 0;
        while (placed < totalSlots * targetFill && guard++ < 500) {
            for (let r = 0; r < WALL_ROWS; r++) {
                const slots = rowSlots(r);
                const free = slots.filter(s => isFree(r, s.startU, s.len) && supportOk(r, s.startU, s.len));
                if (free.length) {
                    const s = rnd(free);
                    putBrick(r, s.startU, s.len, rnd(sampleNicks), Math.random() < 0.02);
                    placed++;
                }
                if (placed >= totalSlots * targetFill) break;
            }
        }
    }
    renderWall(); updateFill();
}

function saveWall() { localStorage.setItem(STORAGE_KEY, JSON.stringify(wall)); }

function renderWall() {
    wallStage.innerHTML = '';
    for (let r = 0; r < WALL_ROWS; r++) {
        for (let u = 0; u < GRID_UNITS; u++) {
            const cell = wall[r][u];
            if (cell && cell.start) {
                const x = unitToX(u), y = rowToY(r), w = unitsToW(cell.len);
                const b = document.createElement('div'); b.className = 'brickunit' + (cell.gold ? ' gold' : '');
                b.style.left = x + 'px'; b.style.top = y + 'px'; b.style.width = w + 'px'; b.style.height = ROW_H + 'px';
                b.dataset.r = r;
                b.innerHTML = `<span>${cell.nick}</span><div class="cap"></div>`;
                wallStage.appendChild(b);
                u += cell.len - 1;
            }
        }
    }
}

function updateFill() {
    let slotsTotal = 0, slotsFilled = 0;
    for (let r = 0; r < WALL_ROWS; r++) {
        const slots = rowSlots(r); slotsTotal += slots.length;
        for (const s of slots) {
            if (wall[r][s.startU] && wall[r][s.startU].start) slotsFilled++;
        }
    }
    const pct = Math.round(clamp01(slotsFilled / Math.max(1, slotsTotal)) * 100);
    wallInfo.textContent = `Заполнено: ${pct}%`;
    saveWall();

    if (pct >= 100) {
        clearWallAnimated();
    }
    return { slotsFilled, slotsTotal, pct };
}

function clearWallAnimated() {
    const bricks = [...wallStage.querySelectorAll('.brickunit')];
    if (!bricks.length) { resetWall(); return; }
    wallStage.classList.add('clearing');
    bricks.forEach(el => {
        const r = Number(el.dataset.r || 0);
        const delay = r * 60;
        el.style.animationDelay = `${delay}ms`;
    });
    setTimeout(() => { resetWall(); }, (WALL_ROWS * 60 + 800));
}

function resetWall() {
    wallStage.classList.remove('clearing');
    wall = Array.from({ length: WALL_ROWS }, emptyRow);
    saveWall();
    initWall();
}

function dropBrickAnimated(nick) {
    let target = null;
    for (let r = 0; r < WALL_ROWS; r++) {
        const freeSlots = rowSlots(r).filter(s => isFree(r, s.startU, s.len) && supportOk(r, s.startU, s.len));
        if (freeSlots.length) { target = { r, ...rnd(freeSlots) }; break; }
    }
    if (!target) return;

    const { r, startU: u, len } = target;
    const x = unitToX(u), y = rowToY(r), w = unitsToW(len);

    crane.style.display = 'flex';
    crane.style.left = (x + w / 2) + 'px';

    const gold = Math.random() < 0.02;
    const fly = document.createElement('div'); fly.className = 'brickunit' + (gold ? ' gold' : '');
    Object.assign(fly.style, { left: x + 'px', top: (-ROW_H - 8) + 'px', width: w + 'px', height: ROW_H + 'px', position: 'absolute', transition: 'transform 520ms cubic-bezier(.2,.8,.2,1), opacity 1200ms' });
    fly.innerHTML = `<span>${nick}</span><div class="cap"></div>`;
    wallStage.appendChild(fly);

    requestAnimationFrame(() => { fly.style.transform = `translateY(${y + ROW_H + 8}px)`; });
    setTimeout(() => {
        const cap = fly.querySelector('.cap'); cap.style.boxShadow = 'inset 0 0 0 100px rgba(255,255,255,.18)';
        setTimeout(() => { cap.style.transition = 'box-shadow 380ms ease'; cap.style.boxShadow = 'inset 0 0 0 0 rgba(255,255,255,.18)'; }, 60);

        putBrick(r, u, len, nick, gold);
        renderWall();
        updateFill();

        wallStage.classList.add('impact');
        setTimeout(() => wallStage.classList.remove('impact'), 450);

        fly.style.opacity = '0';
        setTimeout(() => { fly.remove(); crane.style.display = 'none'; }, 400);
    }, 520);
}

const nickInput = $('#nickInput');
const btnPut = $('#btnPutBrick');

function syncNickState() {
    const has = nickInput.value.trim().length > 0;
    btnPut.disabled = !has;
}
nickInput.addEventListener('input', syncNickState);
nickInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (nickInput.value.trim()) btnPut.click();
    }
});

$('#btnPutBrick').addEventListener('click', () => {
    const v = nickInput.value.trim();
    if (!v) return;
    dropBrickAnimated(v);
    nickInput.value = '';
    syncNickState();
});

const botNicks = ['online_mason', 'wall_guy_228', 'kirpichnaya', 'brickaholic', 'b0t_builder', 'random_sosed', 'ghost_layer', 'pro_mur', 'lay_it_slow', 'real_time_guy'];
function scheduleBotDrop() {
    const { slotsFilled, slotsTotal } = updateFill();
    if (slotsFilled >= slotsTotal) return;
    const delay = randint(6000, 14000);
    setTimeout(() => { dropBrickAnimated(rnd(botNicks)); scheduleBotDrop(); }, delay);
}

const wheelBox = document.getElementById('wheelBox');
const wheelDrop = document.getElementById('wheelDrop');
const wheelLabels = document.getElementById('wheelLabels');
const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas.getContext('2d');

const prizes = [
    { label: 'Элитка 💎', weight: 1 }, { label: 'Пентхаус ⚡', weight: 2 }, { label: 'Балкон 🌆', weight: 3 }, { label: 'Wi-Fi 1мс 🛜', weight: 4 },
    { label: 'Ремонт ✨', weight: 3 }, { label: 'Лофт 🧱', weight: 2 }, { label: 'Вид море 🌊', weight: 3 }, { label: 'Соседи 🤝', weight: 4 }
];
wheelLabels.innerHTML = '';
prizes.forEach(p => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = p.label;
    wheelLabels.appendChild(chip);
});
setInterval(() => {
    const chips = [...wheelLabels.querySelectorAll('.chip')];
    if (!chips.length) return;
    const c = chips[Math.floor(Math.random() * chips.length)];
    c.classList.add('shimmer', 'pop');
    setTimeout(() => c.classList.remove('shimmer', 'pop'), 900);
}, 1400);

function sizeCanvas() {
    const rect = wheelBox.getBoundingClientRect();
    const s = Math.min(rect.width, rect.height);
    const dpr = window.devicePixelRatio || 1;
    wheelCanvas.width = Math.floor(s * dpr);
    wheelCanvas.height = Math.floor(s * dpr);
    drawWheel();
}
let ledPhase = 0;
function drawArcText(text, radius, start, end, color) {
    const dpr = window.devicePixelRatio || 1;
    const delta = end - start; const arcLen = radius * delta;
    const fs = Math.min(Math.max(arcLen / (text.length * 0.60), 18 * dpr), 44 * dpr);
    ctx.font = `700 ${fs}px Inter, system-ui, -apple-system, Segoe UI`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = color; ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = Math.max(2, fs * 0.18);
    const chars = [...text]; const step = delta / Math.max(1, chars.length); let a = start + step / 2;
    for (const ch of chars) { const x = Math.cos(a) * radius, y = Math.sin(a) * radius; ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI / 2); ctx.strokeText(ch, 0, 0); ctx.fillText(ch, 0, 0); ctx.restore(); a += step; }
}
function drawWheel() {
    const dpr = window.devicePixelRatio || 1;
    const w = wheelCanvas.width, h = wheelCanvas.height; const r = Math.min(w, h) / 2 - 14 * dpr;
    ctx.clearRect(0, 0, w, h); ctx.save(); ctx.translate(w / 2, h / 2);
    const n = prizes.length, step = 2 * Math.PI / n;
    for (let i = 0; i < n; i++) {
        const start = i * step, end = start + step;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, start, end); ctx.closePath();
        ctx.fillStyle = (i % 2 === 0) ? 'rgba(255,47,179,0.28)' : 'rgba(34,227,255,0.28)'; ctx.fill();
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(end) * r, Math.sin(end) * r);
        ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 2 * dpr; ctx.stroke();
        const color = (i % 2 === 0) ? 'rgba(255,240,255,0.96)' : 'rgba(230,255,255,0.96)'; drawArcText(prizes[i].label, r * 0.78, start + 0.06, end - 0.06, color);
    }
    ctx.beginPath(); ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 6 * dpr; ctx.stroke();
    const leds = 48, rr = r * 0.96;
    for (let i = 0; i < leds; i++) {
        const a = (i / leds) * Math.PI * 2 + ledPhase; const x = Math.cos(a) * rr, y = Math.sin(a) * rr; const pulse = (Math.sin(a * 2) + 1) / 2;
        const alpha = (i % 4 === 0) ? 0.9 : 0.25 + 0.35 * pulse; ctx.beginPath(); ctx.arc(x, y, 3.2 * dpr, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,220,120,${alpha.toFixed(2)})`; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = 8 * dpr; ctx.stroke();
    ctx.restore();
}
function weightedIndex() { const total = prizes.reduce((a, p) => a + p.weight, 0); let r = Math.random() * total; for (let i = 0; i < prizes.length; i++) { r -= prizes[i].weight; if (r <= 0) return i; } return prizes.length - 1; }
let spinning = false, lastAngle = 0;
const pointerEl = wheelBox.querySelector('.marker');
function getMarkerTip() { const mr = pointerEl.getBoundingClientRect(); const wr = wheelBox.getBoundingClientRect(); return { x: (mr.left + mr.right) / 2 - wr.left, y: mr.top - wr.top }; }
function emitWheelSparks(power = 1, burst = false) {
    power = clamp01(power); if (power < 0.12 && !burst) return;
    const tip = getMarkerTip(); const base = burst ? 8 : 2; const spread = burst ? 6 : 3;
    const count = Math.max(0, Math.round((base + spread * power)));
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div'); s.className = 'wspark' + (Math.random() < 0.1 ? ' star' : '');
        s.style.left = `${tip.x - 3 + (Math.random() - 0.5) * 4}px`; s.style.top = `${tip.y}px`; wheelBox.appendChild(s);
        const baseA = Math.PI, ang = baseA + (Math.random() - 0.5) * 0.32 - 0.06, dist = 24 + Math.random() * 30 * power;
        const dx = Math.cos(ang) * dist; const dy = Math.sin(ang) * dist - 3; const spin = (Math.random() * 180 - 90); const gx = dx * 1.05, gy = dy + 8;
        s.animate([{ transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(${1 + Math.random() * 0.2}) rotate(${spin}deg)`, opacity: .85 }, { transform: `translate(${gx}px,${gy}px) scale(${1 + Math.random() * 0.3}) rotate(${spin * 1.3}deg)`, opacity: 0 }], { duration: 360 + Math.random() * 320, easing: 'cubic-bezier(.2,.7,.1,1)' }).onfinish = () => s.remove();
    }
}
function highlightWin(idx) {
    const dpr = window.devicePixelRatio || 1; const w = wheelCanvas.width, h = wheelCanvas.height; const r = Math.min(w, h) / 2 - 14 * dpr; const n = prizes.length, step = 2 * Math.PI / n;
    const start = idx * step, end = start + step; ctx.save(); ctx.translate(w / 2, h / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.48)'; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, start, end); ctx.closePath(); ctx.fill();
    ctx.globalCompositeOperation = 'lighter'; ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, start, end); ctx.closePath(); ctx.clip();
    const grd = ctx.createRadialGradient(0, 0, r * 0.15, 0, 0, r); grd.addColorStop(0, 'rgba(255,235,190,0.35)'); grd.addColorStop(0.55, 'rgba(255,220,150,0.22)'); grd.addColorStop(1, 'rgba(255,210,120,0.12)');
    ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    const text = prizes[idx].label, radius = r * 0.78, delta = end - start, arcLen = radius * delta, fs = Math.min(Math.max(arcLen / (text.length * 0.60), 18 * dpr), 46 * dpr);
    ctx.font = `800 ${fs}px Inter, system-ui, -apple-system, Segoe UI`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255,240,190,.4)'; ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = Math.max(2, fs * 0.18);
    const chars = [...text]; const stepA = delta / Math.max(1, chars.length); let a = start + stepA / 2;
    for (const ch of chars) { const x = Math.cos(a) * radius, y = Math.sin(a) * radius; ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI / 2); ctx.strokeText(ch, 0, 0); ctx.fillText(ch, 0, 0); ctx.restore(); a += stepA; }
    ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,240,180,.7)'; ctx.lineWidth = 6 * dpr; ctx.beginPath(); ctx.arc(0, 0, r, start, end); ctx.stroke();
    ctx.restore(); ctx.restore(); setTimeout(drawWheel, 950);
}
function wheelRingSalute() {
    const rays = 14;
    for (let i = 0; i < rays; i++) {
        const ray = document.createElement('div'); ray.className = 'w-ray'; wheelBox.appendChild(ray);
        const ang = (i / rays) * 360 + (Math.random() * 10 - 5);
        ray.style.transform = `translate(-50%,-50%) rotate(${ang}deg) scaleY(0.6)`;
        ray.animate([{ opacity: 0, transform: `translate(-50%,-50%) rotate(${ang}deg) scaleY(0.4)` }, { opacity: 1, transform: `translate(-50%,-50%) rotate(${ang}deg) scaleY(1.05)` }, { opacity: 0, transform: `translate(-50%,-50%) rotate(${ang}deg) scaleY(1.2)` }], { duration: 800, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => ray.remove();
    }
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
}
function spinTo(deltaDeg, durationMs) {
    const pointerEl = wheelBox.querySelector('.marker');
    const start = lastAngle; const end = lastAngle + deltaDeg; const startTs = performance.now(); let prevAngle = start;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    function frame(ts) {
        const p = Math.min(1, (ts - startTs) / durationMs); const eased = easeOut(p); const angle = start + deltaDeg * eased;
        wheelCanvas.style.transform = `rotate(${angle}deg)`; const v = angle - prevAngle; prevAngle = angle; const speedPow = clamp01(Math.abs(v) / 10);
        ledPhase += Math.abs(v) * (Math.PI / 180) * 0.15; drawWheel();
        const wobble = Math.max(-18, Math.min(18, -v * 0.6)); pointerEl.style.transform = `translateX(-50%) rotate(${wobble}deg)`;
        const n = prizes.length; const sector = 360 / n; const pointerDeg = 270; const rel = ((pointerDeg - (angle % 360)) + 360) % 360; const distToBorder = Math.min(rel % sector, sector - (rel % sector));
        if (distToBorder < 1.2 && speedPow > 0.35) { pointerEl.style.transform = `translateX(-50%) rotate(${wobble - 8}deg)`; emitWheelSparks(speedPow, false); }
        if (Math.random() < speedPow * 0.10) emitWheelSparks(speedPow, false);
        if (p < 1) requestAnimationFrame(frame); else {
            lastAngle = ((end % 360) + 360) % 360; pointerEl.style.transform = 'translateX(-50%) rotate(0deg)';
            const val = ((pointerDeg - lastAngle) + 360) % 360; const idx = Math.floor(val / (360 / n));
            highlightWin(idx); wheelRingSalute(); wheelDrop.textContent = `Тебе выпало: ${prizes[idx].label}`; dropBrick('wheel_' + randint(10, 99)); spinning = false;
        }
    }
    requestAnimationFrame(frame);
}
document.getElementById('spinBtn').addEventListener('click', () => {
    if (spinning) return; spinning = true; wheelDrop.textContent = '—'; emitWheelSparks(1.0, true);
    const n = prizes.length; const sector = 360 / n; const pointerDeg = 270;
    let idx = weightedIndex(); let offset = 0; do { offset = (Math.random() - 0.5) * sector * 0.6; } while (Math.abs(offset) > sector * 0.3);
    const center = idx * sector + sector / 2 + offset; const turns = 6; const delta = 360 * turns + (pointerDeg - center);
    spinTo(delta, 4000);
});

const caseDrop = document.getElementById('caseDrop');
const loot = {
    basic: [
        'Кирпич 🧱',
        'Стикер «Хата» 🏠',
        'Пакет «Комментатор» 💬',
        'Почтовый ящик 🔒',
        'Тапки в общий душ 🩴',
        'Пульт без батареек 📺',
        'Кружка из Икеи ☕',
        'Коврик «Добро пожаловать» 🚪',
        'Пакет с Ашана 🛍️',
        'Плитка шоколада «за ремонт» 🍫',
        'Пыльный роутер 📡',
        'Ключ от непонятной двери 🗝️',
        'Задержанный лифт 🚪',
        'Носок из прачечной 🧦',
        'Пылесос без мешка 🌀',
        'Пластиковая ложка из кофейни 🥄',
        'Календарь с котиком 📅',
        'Наклейка «Сниму жильё» 🧾'
    ],

    pro: [
        'Wi-Fi 1 мс 🛜',
        'Балкон 🌆',
        'Ключница 🔑',
        'Ремонт «Евро» ✨',
        'Неоновая лампа 💡',
        'Диван-трансформер 🛋️',
        'Зеркало для селфи 🪞',
        'Гирлянда «для вайба» 💫',
        'Настенный светильник 🕯️',
        'Аромасвеча «Лофт» 🕯️',
        'Полка для призов 🧰',
        'Подставка под кофе ☕',
        'Фильтр-свет для рилс 🌈',
        'Вайфай-репитер 📶'
    ],

    legend: [
        'Элитка в Дубае 💎',
        'Пентхаус ⚡',
        'Смарт-дом с голосовым управлением 🏡',
        'Квартира у моря 🌊',
        'Золотой пропуск в лифт 🚪',
        'Домофон без лагов 🔔',
        'Балкон с видом на хайп 🌃',
        'Гараж с кондиционером 🚗',
        'Квартира Меллстроя 🏙️',
        'Ключи от крыши 🗝️',
        'Карта доступа в элиту 🪪',
        'Сейф с донатами 💰',
        'VIP-подъезд 🪞',
        'Кофемашина с автопостом ☕📱',
        'Диван-легенда из эфира 📺',
        'Лофт с неоном и вайбом 💫'
    ]
};
function burst(box, tier) {
    const rect = box.getBoundingClientRect();
    const max = tier === 'legend' ? 28 : tier === 'pro' ? 20 : 14;
    for (let i = 0; i < max; i++) {
        const s = document.createElement('div');
        s.className = 'spark' + (Math.random() < 0.25 ? ' star' : '');
        const x = rect.width / 2 + (Math.random() - 0.5) * 30; const y = rect.height * 0.45 + (Math.random() - 0.5) * 10;
        s.style.left = x + 'px'; s.style.top = y + 'px'; box.appendChild(s);
        const ang = Math.random() * Math.PI * 2; const dist = 80 + Math.random() * 120;
        const dx = Math.cos(ang) * dist; const dy = Math.sin(ang) * dist - 40; const dur = 700 + Math.random() * 500;
        s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(${1 + Math.random() * 0.6})`, opacity: 0 }], { duration: dur, easing: 'cubic-bezier(.15,.7,.1,1)' }).onfinish = () => s.remove();
    }
}
const overlay = document.getElementById('winOverlay'); const inventory = document.getElementById('inventory');
function rarityColor(tier) { if (tier === 'legend') return ['#FFD35A', '#FFC94A', '#FFB43A']; if (tier === 'pro') return ['#CDA8FF', '#B789FF', '#A06EFF']; return ['#8AD1FF', '#6BBEFF', '#4CAAF0']; }
function showWinOverCase(cardEl, text, tier = 'basic') {
    const r = cardEl.getBoundingClientRect(); const cx = r.left + r.width / 2; const cy = r.top + r.height * 0.25;
    const coupon = document.createElement('div'); coupon.className = 'win-coupon'; coupon.style.left = `${cx}px`; coupon.style.top = `${cy}px`; coupon.innerHTML = `<span>${text}</span><div class="shine"></div>`; overlay.appendChild(coupon);
    const [c1, c2, c3] = rarityColor(tier);
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div'); p.className = 'confetti'; p.style.position = 'absolute'; p.style.width = '8px'; p.style.height = '12px'; p.style.borderRadius = '2px'; p.style.opacity = '.9'; p.style.mixBlendMode = 'screen';
        p.style.left = `${cx}px`; p.style.top = `${cy}px`; p.style.background = [c1, c2, c3][Math.floor(Math.random() * 3)];
        const dx = (Math.random() * 2 - 1) * 220; const dy = (Math.random() * -1) * (180 + Math.random() * 120); const rot = (Math.random() * 720 - 360);
        p.animate([{ transform: 'translate(0,0) rotate(0deg)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) rotate(${rot}deg)`, opacity: 0 }], { duration: 1000 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,0,1)' }).onfinish = () => p.remove(); overlay.appendChild(p);
    }
    setTimeout(() => {
        const invItem = document.createElement('div'); invItem.className = 'inv-item'; invItem.textContent = text; inventory.hidden = false; inventory.appendChild(invItem);
        const invR = invItem.getBoundingClientRect(); const vx = invR.left + invR.width / 2 - cx; const vy = invR.top + invR.height / 2 - cy;
        coupon.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(.6)`, opacity: .0 }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => coupon.remove();
    }, 900);
}
$$('.case').forEach(card => {
    card.addEventListener('click', () => {
        const tier = card.dataset.tier; const items = loot[tier] || ['Ничего 🤡'];
        card.classList.add('glow');
        setTimeout(() => card.classList.remove('glow'), 260);
        card.classList.add('open'); burst(card, tier);
        setTimeout(() => { const drop = rnd(items); caseDrop.textContent = `Из кейса ${tier.toUpperCase()} выпало: ${drop}`; showWinOverCase(card, drop, tier); }, 520);
        card.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 360, easing: 'ease-out' }); setTimeout(() => card.classList.remove('open'), 1200);
        dropBrick('case_' + tier + '_' + randint(10, 99)); if (navigator.vibrate) navigator.vibrate(40);
    });
});

const quotesWall = document.getElementById('quotesWall');
const quotesArr = ['Ам-ам-ам', 'Что за бизнес?', 'Пока я на балконе С Джоли', 'Бэм Бэм', 'Come here, brother!', 'Ам-ам', 'Я дарю хаты, брат', 'Сегодня кому-то повезёт', 'Каждый день — квартира', 'Забрали мои деньги!', 'Ну что, поехали?'];

function spawnQuote() {
    const q = document.createElement('div');
    q.className = 'quote';
    q.textContent = rnd(quotesArr);
    const left = 20 + Math.random() * 60; q.style.left = left + '%';
    quotesWall.appendChild(q);
    setTimeout(() => q.remove(), 6000);
}
setInterval(spawnQuote, 1400);

const bubbles = $('#bubbles');
const bctx = bubbles.getContext('2d');
let BW = 0, BH = 0;
let particles = [];
function resizeBubbles() {
    const dpr = devicePixelRatio || 1;
    BW = bubbles.width = quotesWall.clientWidth * dpr;
    BH = bubbles.height = Math.max(200, quotesWall.clientHeight) * dpr;
}
function addBubble() {
    const dpr = devicePixelRatio || 1;
    particles.push({
        x: Math.random() * BW,
        y: BH + 10 * dpr,
        r: (4 + Math.random() * 8) * dpr,
        vy: (0.4 + Math.random() * 0.9) * dpr,
        swayA: Math.random() * Math.PI * 2,
        swayV: 0.01 + Math.random() * 0.02,
        swayAmp: (4 + Math.random() * 10) * dpr,
        alpha: 0.2 + Math.random() * 0.5
    });
    if (particles.length > 140) particles.shift();
}
function drawBubbles() {
    bctx.clearRect(0, 0, BW, BH);
    const dpr = devicePixelRatio || 1;
    bctx.fillStyle = 'rgba(255,255,255,0.02)';
    bctx.fillRect(0, 0, BW, BH);
    for (const p of particles) {
        p.y -= p.vy;
        p.swayA += p.swayV;
        const x = p.x + Math.sin(p.swayA) * p.swayAmp;
        const y = p.y;

        const grd = bctx.createRadialGradient(x - p.r * 0.3, y - p.r * 0.3, p.r * 0.2, x, y, p.r);
        grd.addColorStop(0, `rgba(220,245,255,${p.alpha})`);
        grd.addColorStop(1, `rgba(180,220,255,0)`);
        bctx.fillStyle = grd;
        bctx.beginPath();
        bctx.arc(x, y, p.r, 0, Math.PI * 2);
        bctx.fill();
    }
    particles = particles.filter(p => p.y + p.r > -10 * dpr);
    if (Math.random() < 0.6) addBubble();
    requestAnimationFrame(drawBubbles);
}

const galleryGrid = document.getElementById('galleryGrid');
let kbTimer = null, kbLock = false;

function runKenBurnsOnce() {
    if (kbLock) return;
    const tiles = [...galleryGrid.querySelectorAll('.tile')];
    if (!tiles.length) return;
    const tile = tiles[Math.floor(Math.random() * tiles.length)];
    kbLock = true;
    tile.classList.add('kb');
    setTimeout(() => { tile.classList.remove('kb'); kbLock = false; }, 1800);
}

function startGalleryKB() {
    if (kbTimer) return;
    kbTimer = setInterval(runKenBurnsOnce, 2600);
}
function stopGalleryKB() {
    clearInterval(kbTimer);
    kbTimer = null;
}

const galleryCard = document.querySelector('#gallery .card');
const ioGallery = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) startGalleryKB();
        else stopGalleryKB();
    });
}, { threshold: 0.3 });
ioGallery.observe(galleryCard);

const wheelCard = $('#wheelCard'); const casesCard = $('#casesCard');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.target === wheelCard && e.isIntersecting) { wheelCard.classList.add('on'); setTimeout(() => wheelCard.classList.remove('on'), 1200); }
        if (e.target === casesCard && e.isIntersecting) { casesCard.classList.add('on'); setTimeout(() => casesCard.classList.remove('on'), 1200); }
    });
}, { threshold: 0.4 });
io.observe(wheelCard); io.observe(casesCard);

function sizeEverything() {
    $$('img[data-src]').forEach(img => { if (!img.src || img.src.startsWith('data:')) img.src = img.getAttribute('data-src'); });
    resizeNeon(); requestAnimationFrame(drawNeon);
    resizeBubbles(); requestAnimationFrame(drawBubbles);
    sizeCanvas();
    wallSize(); renderWall();
}

window.addEventListener('load', () => {
    seedBricks();
    rerollApartment(false);

    wallSize(); initWall();
    scheduleBotDrop();

    sizeEverything();
});


window.addEventListener('resize', () => { resizeNeon(); sizeCanvas(); resizeBubbles(); wallSize(); renderWall(); });