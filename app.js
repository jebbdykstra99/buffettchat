(function () {
  'use strict';

  const MOBILE_NAV_MQ = 900;
  const LS_USER = 'buffettchat.user';
  const LS_LIKES = 'buffettchat.likes';
  const LS_POSTS = 'buffettchat.localPosts';

  const firebaseConfig = {
    apiKey: "AIzaSyA0AGKwIt3jWCdivlb573i19XEDm12zxIE",
    authDomain: "bakasan-art.firebaseapp.com",
    projectId: "bakasan-art",
    storageBucket: "bakasan-art.firebasestorage.app",
    messagingSenderId: "839964323046",
    appId: "1:839964323046:web:ef9ddbbef5f64acfc2df27",
    measurementId: "G-31WPTPSZQW"
  };
  firebase.initializeApp(firebaseConfig);
  const fbAuth = firebase.auth();

  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  const COLORS = ['#1a2744', '#9a7d3a', '#c4a35a', '#3d4f6f', '#6b5428', '#2c3a58'];

  const TRENDS = [
    { tag: 'Letter', headline: 'Circle of competence', snippet: 'Stay inside the businesses you can actually understand. Dummy note, not a quote feed.', meta: 'In this year’s letter' },
    { tag: 'Moat', headline: 'Wide moat, quiet castle', snippet: 'Durable advantage beats a clever ticker. Owners think in decades.', meta: 'Mental model' },
    { tag: 'Float', headline: 'Other people’s money, patiently', snippet: 'Float is a privilege if you never have to give it back in a hurry.', meta: 'In this year’s letter' },
    { tag: 'Pitch', headline: 'Wait for the fat pitch', snippet: 'No called strikes. Sit still until something obvious floats over the plate.', meta: 'Temperament' },
    { tag: 'Invert', headline: 'Tell me where I die so I never go there', snippet: 'Charlie’s move: invert the problem. Avoid stupidity first.', meta: 'Mental model' },
    { tag: 'Rule 1', headline: 'Don’t lose money', snippet: 'Rule two is don’t forget rule one. Survival is the whole strategy.', meta: 'In this year’s letter' },
    { tag: 'Compound', headline: 'Time in, not timing', snippet: 'The eighth wonder only works if you stop interrupting it.', meta: 'Mental model' },
    { tag: 'Safety', headline: 'Margin of safety', snippet: 'Price is what you pay. Value is what you get. The gap is the work.', meta: 'In this year’s letter' }
  ];

  const PLACES = [
    { tag: 'Idea', title: 'Circle of competence', snippet: 'Know the edge of what you know. Outside it, you are guessing with other people’s money.' },
    { tag: 'Idea', title: 'Owners, not traders', snippet: 'Buy pieces of businesses. Afternoon noise is not a process.' },
    { tag: 'Idea', title: 'Read the 10-Ks', snippet: 'If you will not read the filing, you do not own it. Dummy talk — no live filings.' },
    { tag: 'Idea', title: 'Cash optionality', snippet: 'Cash is a call on everyone else’s panic. Keep dry powder without apologizing.' },
    { tag: 'Idea', title: 'Avoid leverage', snippet: 'Leverage is how smart people go broke. The math works until it does not.' },
    { tag: 'Idea', title: 'Temperament', snippet: 'IQ is not the bottleneck. Sitting still when sitting still is the work.' }
  ];

  const TOPICS = [
    { tag: 'Model', title: 'Inversion', snippet: 'Avoid the ways to fail. Charlie’s habit: invert, always invert.' },
    { tag: 'Model', title: 'Opportunity cost', snippet: 'Every yes is a no to something else. The silent partner in every capital decision.' },
    { tag: 'Model', title: 'Latticework', snippet: 'One discipline is a hammer. You need models from several rooms of the house.' },
    { tag: 'Model', title: 'Mr. Market', snippet: 'A manic-depressive partner. You are not obligated to trade with him.' },
    { tag: 'Model', title: 'Margin of safety', snippet: 'Leave room to be wrong. The gap between price and value is the whole job.' },
    { tag: 'Model', title: 'Compounding', snippet: 'Do not interrupt it. Time is the multiplier if temperament holds.' }
  ];

  const SEED = [
    { id: 'p1', name: 'Oracle Omaha', handle: 'oracleomaha', text: 'Rule number one: don’t lose money. Rule number two: don’t forget rule number one. Everything else is commentary.', hours: 1, likes: 412, replies: 38, followed: true },
    { id: 'p2', name: 'Charlie Inverted', handle: 'charlieinverted', text: 'Invert, always invert. Tell me where I’m going to die so I never go there. Avoiding stupidity is a full-time job.', hours: 2, likes: 388, replies: 41, followed: true },
    { id: 'p3', name: 'Wide Moat', handle: 'widemoat', text: 'A great business is a castle. The moat is what keeps the barbarians out. Management is just the duke — the moat is the asset.', hours: 3, likes: 256, replies: 22, followed: true },
    { id: 'p4', name: 'Float and Wait', handle: 'floatandwait', text: 'Insurance float is other people’s money you get to invest while you wait. The trick is never having to give it back in a hurry.', hours: 4, likes: 191, replies: 14, followed: true },
    { id: 'p5', name: '10-K Club', handle: '10kclub', text: 'If you will not read the 10-K, you do not own the business. You are renting a ticker and hoping. Dummy feed — not a filing.', hours: 5, likes: 274, replies: 33, followed: false },
    { id: 'p6', name: 'Fat Pitch', handle: 'fatpitch', text: 'The market is a pitching machine with no called strikes. Wait for the fat one over the plate. Sitting is a position.', hours: 6, likes: 321, replies: 19, followed: true },
    { id: 'p7', name: 'Circle First', handle: 'circlefirst', text: 'Circle of competence is not a slogan. It is a fence. Outside it you are guessing, and guessing is how capital disappears.', hours: 8, likes: 167, replies: 11, followed: true },
    { id: 'p8', name: 'Mr Market', handle: 'mrktmarket', text: 'Mr. Market is a manic-depressive partner who quotes you a price every morning. You are not obligated to do business with him.', hours: 9, likes: 298, replies: 27, followed: false },
    { id: 'p9', name: 'Compound Quietly', handle: 'compoundquietly', text: 'Compounding is the eighth wonder if you stop interrupting it. Time in the seat beats timing the noise.', hours: 11, likes: 344, replies: 18, followed: true },
    { id: 'p10', name: 'Owners Desk', handle: 'ownersnottraders', text: 'Buy businesses, not stocks. Owners think in decades. Traders think in afternoons. Pick a time horizon and keep it.', hours: 13, likes: 219, replies: 16, followed: true },
    { id: 'p11', name: 'Cash Optionality', handle: 'cashoptionality', text: 'Cash is a call option on everyone else’s panic. Dry powder looks foolish until the day it is the only thing that matters.', hours: 15, likes: 183, replies: 12, followed: false },
    { id: 'p12', name: 'No Leverage', handle: 'noleverage', text: 'Leverage is how smart people go broke. The math works until one bad year, and you only need one.', hours: 17, likes: 276, replies: 29, followed: true },
    { id: 'p13', name: 'Lattice Work', handle: 'latticework', text: 'You need a latticework of mental models. One discipline is a hammer looking for nails. Charlie collected rooms, not slogans.', hours: 19, likes: 231, replies: 21, followed: true },
    { id: 'p14', name: 'Margin Club', handle: 'marginsafety', text: 'Price is what you pay. Value is what you get. The gap is your margin of safety. Do not skip the gap.', hours: 21, likes: 359, replies: 24, followed: false },
    { id: 'p15', name: 'Sit Still', handle: 'temperament', text: 'IQ is not the bottleneck. Temperament is. The work is sitting still when sitting still is the correct trade.', hours: 23, likes: 205, replies: 9, followed: true },
    { id: 'p16', name: 'Opportunity Cost', handle: 'opportunitycost', text: 'Every yes is a no to something else. Opportunity cost is the silent partner in every capital decision. Say no more often.', hours: 26, likes: 148, replies: 7, followed: false },
    { id: 'p17', name: 'Omaha Office', handle: 'omahaoffice', text: 'You do not need a ticker on the wall. You need a book, a 10-K, and a quiet room. Dummy wisdom — not advice.', hours: 30, likes: 172, replies: 13, followed: true },
    { id: 'p18', name: 'Partner First', handle: 'partnerfirst', text: 'The best investment is a partner who will tell you when you are wrong. Charlie’s ideas still do that work. Honor the latticework.', hours: 34, likes: 401, replies: 44, followed: true }
  ];

  const NOTIFS = [
    { id: 'n1', text: '@widemoat liked your take on moats.', time: '1h', unread: true },
    { id: 'n2', text: '@charlieinverted mentioned you in an inversion thread.', time: '3h', unread: true },
    { id: 'n3', text: '@oracleomaha started following you. Dummy follow.', time: 'Yesterday', unread: true }
  ];

  const THREADS = [
    { id: 't1', name: 'Charlie Inverted', handle: 'charlieinverted', preview: 'Invert the problem. Where do we die?', messages: [
      { me: false, text: 'Invert the problem. Where do we die?' },
      { me: true, text: 'Leverage, outside the circle, and interrupting compounding. Dummy chat, not advice.' }
    ]},
    { id: 't2', name: 'Wide Moat', handle: 'widemoat', preview: 'Moats aren’t slogans. What’s durable?', messages: [
      { me: false, text: 'Moats aren’t slogans. What’s durable?' },
      { me: true, text: 'Switching costs, brand, and a cost advantage you can explain on one page.' }
    ]}
  ];

  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  }
  function colorFor(handle) {
    let n = 0;
    for (let i = 0; i < handle.length; i++) n = (n + handle.charCodeAt(i) * (i + 1)) % COLORS.length;
    return COLORS[n];
  }
  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }

  let currentUser = loadJSON(LS_USER, null);
  let likes = loadJSON(LS_LIKES, {});
  let extraPosts = loadJSON(LS_POSTS, []);
  let currentTab = 'foryou';
  let activeThread = null;

  function allPosts() {
    return extraPosts.concat(SEED);
  }

  function isMobileNav() { return window.innerWidth <= MOBILE_NAV_MQ; }
  function closeMobileNav() {
    document.body.classList.remove('nav-open');
    syncHamburgerAria();
  }
  function syncHamburgerAria() {
    if (!hamburger) return;
    const open = isMobileNav()
      ? document.body.classList.contains('nav-open')
      : !document.body.classList.contains('nav-collapsed');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  function highlightSocial(name) {
    document.querySelectorAll('.nav-social-link').forEach(function (l) { l.classList.remove('active'); });
    const el = document.querySelector('[data-social="' + name + '"]');
    if (el) el.classList.add('active');
  }

  function closeSocialOverlays() {
    ['explore-overlay', 'notif-overlay', 'chat-overlay', 'profile-overlay'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active', 'thread-open');
    });
  }

  function showContentPage(id) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    const page = document.getElementById('page-' + id);
    if (page) page.classList.add('active');
    window.scrollTo(0, 0);
  }

  function normalizeRoute(route) {
    let id = String(route || '').replace(/^#/, '').trim();
    if (!id) id = 'home';
    try { id = decodeURIComponent(id); } catch (e) { /* keep */ }
    return id;
  }
  function routeFromHash() { return normalizeRoute(window.location.hash); }
  function go(route) {
    const id = normalizeRoute(route);
    const hash = '#' + id;
    if (location.hash === hash) { applyRoute(); return; }
    location.hash = hash;
  }

  function selectThoughtsTab(tab) {
    currentTab = tab;
    document.querySelectorAll('[data-thoughts-tab]').forEach(function (t) {
      t.classList.toggle('active', t.dataset.thoughtsTab === tab);
    });
    renderFeed();
  }

  function applyRoute() {
    closeMobileNav();
    const raw = routeFromHash();

    if (raw === 'following') {
      closeSocialOverlays();
      showContentPage('thoughts');
      highlightSocial('following');
      selectThoughtsTab('following');
      return;
    }
    if (raw === 'hot' || raw === 'new') {
      closeSocialOverlays();
      showContentPage('thoughts');
      highlightSocial('home');
      selectThoughtsTab(raw);
      return;
    }
    if (raw === 'home' || raw === 'feed' || raw === 'thoughts') {
      closeSocialOverlays();
      showContentPage('thoughts');
      highlightSocial('home');
      selectThoughtsTab('foryou');
      return;
    }
    if (raw === 'chat') { openChat(); return; }
    if (raw === 'notifications') { openNotif(); return; }
    if (raw === 'explore') { openExplore(); return; }
    if (raw === 'profile') { openProfile(); return; }
    if (raw === 'news') {
      closeSocialOverlays();
      showContentPage('news');
      highlightSocial('news');
      return;
    }
    closeSocialOverlays();
    showContentPage('thoughts');
    highlightSocial('home');
  }

  function renderPost(post) {
    const liked = !!likes[post.id];
    const likeCount = post.likes + (liked ? 1 : 0);
    const av = initials(post.name);
    const bg = colorFor(post.handle);
    return (
      '<article class="post" data-post-id="' + post.id + '">' +
        '<div class="post-avatar" style="background:' + bg + '">' + av + '</div>' +
        '<div class="post-body">' +
          '<div class="post-meta">' +
            '<span class="post-name">' + escapeHtml(post.name) + '</span>' +
            '<span class="post-handle">@' + escapeHtml(post.handle) + '</span>' +
            '<span class="post-time">· ' + (post.hours != null ? post.hours + 'h' : 'now') + '</span>' +
          '</div>' +
          '<p class="post-text">' + escapeHtml(post.text) + '</p>' +
          '<div class="post-actions">' +
            '<button class="post-action" data-act="reply" type="button">Reply · ' + (post.replies || 0) + '</button>' +
            '<button class="post-action' + (liked ? ' liked' : '') + '" data-act="like" type="button">Like · ' + likeCount + '</button>' +
            '<button class="post-action" data-act="share" type="button">Share</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderFeed() {
    const el = document.getElementById('thoughts-feed');
    if (!el) return;
    let posts = allPosts().slice();
    if (currentTab === 'following') posts = posts.filter(function (p) { return p.followed || (currentUser && p.handle === currentUser.handle); });
    if (currentTab === 'hot') posts.sort(function (a, b) { return (b.likes + (likes[b.id] ? 1 : 0)) - (a.likes + (likes[a.id] ? 1 : 0)); });
    if (currentTab === 'new') posts.sort(function (a, b) { return (a.hours || 0) - (b.hours || 0); });
    if (!posts.length) {
      el.innerHTML = '<div class="post-empty">No posts in this ranking yet. Following / Hot / New are UI chrome — dress rehearsal only.</div>';
      return;
    }
    el.innerHTML = posts.map(renderPost).join('');
  }

  function renderTrends() {
    const card = function (t) {
      return '<a class="news-item" href="#explore">' +
        '<div class="news-item-tag">' + escapeHtml(t.tag) + '</div>' +
        '<div class="news-item-headline">' + escapeHtml(t.headline) + '</div>' +
        '<div class="news-item-snippet">' + escapeHtml(t.snippet) + '</div>' +
        '<div class="news-item-meta">' + escapeHtml(t.meta) + '</div>' +
      '</a>';
    };
    const rail = document.getElementById('news-feed');
    const page = document.getElementById('news-page-list');
    const html = TRENDS.map(card).join('');
    if (rail) rail.innerHTML = html;
    if (page) page.innerHTML = html;
  }

  function renderExplore() {
    function cards(list) {
      return list.map(function (c) {
        return '<article class="explore-card">' +
          '<div class="explore-card-tag">' + escapeHtml(c.tag) + '</div>' +
          '<div class="explore-card-title">' + escapeHtml(c.title) + '</div>' +
          '<div class="explore-card-snippet">' + escapeHtml(c.snippet) + '</div>' +
        '</article>';
      }).join('');
    }
    document.getElementById('explore-pane-ideas').innerHTML = cards(PLACES);
    document.getElementById('explore-pane-models').innerHTML = cards(TOPICS);
  }

  function renderNotifs() {
    const el = document.getElementById('notif-list');
    if (!el) return;
    el.innerHTML = NOTIFS.map(function (n) {
      return '<div class="notif-item' + (n.unread ? ' unread' : '') + '" data-nid="' + n.id + '">' +
        '<div><p>' + escapeHtml(n.text) + '</p><time>' + n.time + '</time></div></div>';
    }).join('');
    const unread = NOTIFS.filter(function (n) { return n.unread; }).length;
    const badge = document.getElementById('notif-badge');
    if (badge) {
      badge.textContent = String(unread);
      badge.classList.toggle('visible', unread > 0);
    }
  }

  function renderThreads() {
    const el = document.getElementById('chat-thread-list');
    if (!el) return;
    el.innerHTML = THREADS.map(function (t) {
      return '<div class="chat-thread-item" data-tid="' + t.id + '">' +
        '<div class="post-avatar" style="background:' + colorFor(t.handle) + '">' + initials(t.name) + '</div>' +
        '<div><div class="thread-name">' + escapeHtml(t.name) + '</div>' +
        '<div class="thread-preview">' + escapeHtml(t.preview) + '</div></div></div>';
    }).join('');
  }

  function openThread(id) {
    const t = THREADS.find(function (x) { return x.id === id; });
    if (!t) return;
    activeThread = t;
    document.getElementById('chat-placeholder').hidden = true;
    const view = document.getElementById('chat-thread-view');
    view.hidden = false;
    document.getElementById('chat-active-name').textContent = t.name;
    document.getElementById('chat-messages').innerHTML = t.messages.map(function (m) {
      return '<div class="chat-bubble ' + (m.me ? 'me' : 'them') + '">' + escapeHtml(m.text) + '</div>';
    }).join('');
    document.getElementById('chat-overlay').classList.add('thread-open');
  }

  function openChat() {
    closeSocialOverlays();
    document.getElementById('chat-overlay').classList.add('active');
    highlightSocial('chat');
  }
  function openNotif() {
    closeSocialOverlays();
    document.getElementById('notif-overlay').classList.add('active');
    highlightSocial('notifications');
  }
  function openExplore() {
    closeSocialOverlays();
    document.getElementById('explore-overlay').classList.add('active');
    highlightSocial('explore');
  }
  function openProfile() {
    closeSocialOverlays();
    document.getElementById('profile-overlay').classList.add('active');
    highlightSocial('profile');
    syncProfile();
  }

  function syncProfile() {
    const prompt = document.getElementById('profile-signin-prompt');
    const content = document.getElementById('profile-content');
    if (!currentUser) {
      prompt.hidden = false;
      content.hidden = true;
      document.getElementById('profile-topbar-name').textContent = 'Profile';
      return;
    }
    prompt.hidden = true;
    content.hidden = false;
    document.getElementById('profile-topbar-name').textContent = currentUser.name;
    document.getElementById('profile-display-name').textContent = currentUser.name;
    document.getElementById('profile-handle').textContent = '@' + currentUser.handle;
    document.getElementById('profile-avatar').textContent = initials(currentUser.name);
    document.getElementById('profile-bio').textContent = currentUser.bio || 'Owners, not traders.';
    const mine = allPosts().filter(function (p) { return p.handle === currentUser.handle; });
    const pane = document.getElementById('profile-pane-posts');
    if (!mine.length) {
      pane.innerHTML = '<div class="empty-note" id="profile-posts-empty">No posts yet. Hit Post when you have a thought worth keeping for a decade.</div>';
    } else {
      pane.innerHTML = mine.map(renderPost).join('');
    }
  }

  function renderSidebarAuth() {
    const el = document.getElementById('sidebar-auth');
    const av = document.getElementById('thoughts-compose-avatar');
    if (currentUser) {
      el.innerHTML =
        '<div class="sidebar-auth-user">' +
          '<div class="sidebar-auth-avatar">' + initials(currentUser.name) + '</div>' +
          '<div class="sidebar-auth-name">@' + escapeHtml(currentUser.handle) + '</div>' +
        '</div>' +
        '<button class="sidebar-auth-btn" id="auth-signout" type="button">Sign out</button>';
      av.textContent = initials(currentUser.name);
      av.style.background = colorFor(currentUser.handle);
    } else {
      el.innerHTML = '<button class="sidebar-auth-btn primary" id="auth-signin" type="button">Sign in</button>';
      av.textContent = 'B';
      av.style.background = '';
    }
  }

  function openAuth(tab) {
    const ov = document.getElementById('cv-auth-overlay');
    ov.classList.add('open');
    document.querySelectorAll('.conv-modal-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    document.getElementById('cv-panel-login').style.display = tab === 'login' ? '' : 'none';
    document.getElementById('cv-panel-register').style.display = tab === 'register' ? '' : 'none';
    const closeBtn = document.getElementById('cv-modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeAuth() {
    document.getElementById('cv-auth-overlay').classList.remove('open');
  }
  function stubSignIn(name, handle) {
    currentUser = {
      name: name || 'Guest',
      handle: (handle || 'guestomaha').replace(/^@/, '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15) || 'guestomaha',
      bio: 'Just visiting Omaha. Owners, not traders.'
    };
    saveJSON(LS_USER, currentUser);
    closeAuth();
    renderSidebarAuth();
    syncProfile();
  }
  function signOut() {
    currentUser = null;
    saveJSON(LS_USER, null);
    if (fbAuth.currentUser) fbAuth.signOut();
    renderSidebarAuth();
    syncProfile();
  }

  function applyFirebaseUser(user) {
    var emailLocal = (user.email || '').split('@')[0];
    var name = user.displayName || emailLocal || 'Member';
    var handle = (emailLocal || name).replace(/^@/, '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15) || 'member';
    currentUser = {
      name: name,
      handle: handle,
      bio: 'Just visiting Omaha. Owners, not traders.'
    };
    saveJSON(LS_USER, currentUser);
    renderSidebarAuth();
    syncProfile();
    closeAuth();
  }
  fbAuth.onAuthStateChanged(function (user) {
    if (user) applyFirebaseUser(user);
  });

  function maybePost() {
    const input = document.getElementById('thoughts-compose-input');
    const text = (input.value || '').trim();
    if (!text) return;
    if (!currentUser) { openAuth('login'); return; }
    extraPosts.unshift({
      id: 'local-' + Date.now(),
      name: currentUser.name,
      handle: currentUser.handle,
      text: text.slice(0, 280),
      hours: 0,
      likes: 0,
      replies: 0,
      followed: true
    });
    saveJSON(LS_POSTS, extraPosts);
    input.value = '';
    document.getElementById('thoughts-post-btn').disabled = true;
    renderFeed();
    syncProfile();
  }

  /* ── Events ─────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const social = e.target.closest('[data-social]');
    if (social) {
      e.preventDefault();
      go(social.dataset.social);
      return;
    }
    if (e.target.closest('#auth-signin') || e.target.closest('#profile-signin-prompt-btn')) {
      openAuth('login');
      return;
    }
    if (e.target.closest('#auth-signout')) { signOut(); return; }

    const tab = e.target.closest('[data-thoughts-tab]');
    if (tab) {
      const t = tab.dataset.thoughtsTab;
      if (t === 'following') go('following');
      else if (t === 'hot') go('hot');
      else if (t === 'new') go('new');
      else go('home');
      return;
    }

    const likeBtn = e.target.closest('[data-act="like"]');
    if (likeBtn) {
      const post = likeBtn.closest('[data-post-id]');
      if (!post) return;
      const id = post.dataset.postId;
      likes[id] = !likes[id];
      if (!likes[id]) delete likes[id];
      saveJSON(LS_LIKES, likes);
      renderFeed();
      syncProfile();
      return;
    }
    if (e.target.closest('[data-act="reply"]') || e.target.closest('[data-act="share"]')) {
      if (!currentUser) openAuth('login');
      return;
    }

    const etab = e.target.closest('[data-explore-tab]');
    if (etab) {
      document.querySelectorAll('[data-explore-tab]').forEach(function (t) {
        t.classList.toggle('active', t === etab);
      });
      document.getElementById('explore-pane-ideas').classList.toggle('active', etab.dataset.exploreTab === 'ideas');
      document.getElementById('explore-pane-models').classList.toggle('active', etab.dataset.exploreTab === 'models');
      return;
    }

    const thread = e.target.closest('[data-tid]');
    if (thread) { openThread(thread.dataset.tid); return; }

    if (isMobileNav() && document.body.classList.contains('nav-open')
        && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const ov = document.getElementById('cv-auth-overlay');
    if (ov && ov.classList.contains('open')) { e.preventDefault(); closeAuth(); return; }
    if (isMobileNav() && document.body.classList.contains('nav-open')) closeMobileNav();
  });

  hamburger.addEventListener('click', function () {
    if (isMobileNav()) document.body.classList.toggle('nav-open');
    else document.body.classList.toggle('nav-collapsed');
    syncHamburgerAria();
  });
  window.addEventListener('resize', syncHamburgerAria);
  document.getElementById('nav-overlay').addEventListener('click', closeMobileNav);
  document.getElementById('right-panel-tab').addEventListener('click', function () {
    document.body.classList.toggle('right-collapsed');
  });
  document.getElementById('sidebar-search-btn').addEventListener('click', function () { go('explore'); });
  document.getElementById('sidebar-post-btn').addEventListener('click', function () {
    go('home');
    setTimeout(function () {
      const input = document.getElementById('thoughts-compose-input');
      if (input) { input.focus(); input.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }, 120);
  });

  ['profile-back', 'notif-back', 'explore-back'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function () { go('home'); });
  });
  document.getElementById('notif-mark-read').addEventListener('click', function () {
    NOTIFS.forEach(function (n) { n.unread = false; });
    renderNotifs();
  });
  document.getElementById('chat-new-btn').addEventListener('click', function () {
    if (!currentUser) { openAuth('login'); return; }
    openThread('t1');
  });
  document.getElementById('chat-placeholder-new').addEventListener('click', function () {
    if (!currentUser) { openAuth('login'); return; }
    openThread('t1');
  });
  document.getElementById('chat-send-btn').addEventListener('click', function () {
    if (!currentUser) { openAuth('login'); return; }
    const input = document.getElementById('chat-compose-input');
    const text = (input.value || '').trim();
    if (!text || !activeThread) return;
    activeThread.messages.push({ me: true, text: text });
    input.value = '';
    openThread(activeThread.id);
  });
  document.getElementById('profile-edit-btn').addEventListener('click', function () {
    openAuth('register');
  });

  const compose = document.getElementById('thoughts-compose-input');
  const postBtn = document.getElementById('thoughts-post-btn');
  compose.addEventListener('input', function () {
    postBtn.disabled = !(compose.value || '').trim();
    compose.style.height = 'auto';
    compose.style.height = Math.min(compose.scrollHeight, 200) + 'px';
  });
  postBtn.addEventListener('click', maybePost);

  document.getElementById('cv-modal-close').addEventListener('click', function (e) {
    e.preventDefault();
    closeAuth();
  });
  document.getElementById('cv-auth-overlay').addEventListener('click', function (e) {
    if (e.target.id === 'cv-auth-overlay') closeAuth();
  });
  document.querySelectorAll('.conv-modal-tab').forEach(function (t) {
    t.addEventListener('click', function () { openAuth(t.dataset.tab); });
  });
  function stubSubmit(errId) {
    const err = document.getElementById(errId);
    err.textContent = 'Dress rehearsal — no live auth. Continuing as guest.';
    err.classList.add('show');
    setTimeout(function () { stubSignIn('Guest', 'guestomaha'); }, 500);
  }
  document.getElementById('cv-login-btn').addEventListener('click', function () { stubSubmit('cv-login-err'); });
  document.getElementById('cv-reg-btn').addEventListener('click', function () {
    const name = (document.getElementById('cv-reg-name').value || '').trim() || 'Guest';
    const err = document.getElementById('cv-reg-err');
    err.textContent = 'Dress rehearsal — no live auth. Local guest only.';
    err.classList.add('show');
    setTimeout(function () { stubSignIn(name, name.replace(/\s+/g, '').slice(0, 12)); }, 500);
  });
  document.getElementById('cv-google-login').addEventListener('click', function () {
    var err = document.getElementById('cv-login-err');
    err.classList.remove('show');
    var gProvider = new firebase.auth.GoogleAuthProvider();
    fbAuth.signInWithPopup(gProvider).catch(function (e) {
      err.textContent = e.message || String(e);
      err.classList.add('show');
    });
  });
  document.getElementById('cv-guest-login').addEventListener('click', function () { stubSignIn('Guest', 'guestomaha'); });

  const search = document.getElementById('explore-search-input');
  search.addEventListener('input', function () {
    const q = search.value.trim().toLowerCase();
    function filt(list) {
      if (!q) return list;
      return list.filter(function (c) {
        return (c.title + ' ' + c.snippet + ' ' + c.tag).toLowerCase().indexOf(q) !== -1;
      });
    }
    function cards(list) {
      if (!list.length) return '<p class="empty-note">Nothing in the letter matched that.</p>';
      return list.map(function (c) {
        return '<article class="explore-card"><div class="explore-card-tag">' + escapeHtml(c.tag) +
          '</div><div class="explore-card-title">' + escapeHtml(c.title) +
          '</div><div class="explore-card-snippet">' + escapeHtml(c.snippet) + '</div></article>';
      }).join('');
    }
    document.getElementById('explore-pane-ideas').innerHTML = cards(filt(PLACES));
    document.getElementById('explore-pane-models').innerHTML = cards(filt(TOPICS));
  });

  renderTrends();
  renderExplore();
  renderNotifs();
  renderThreads();
  renderSidebarAuth();
  renderFeed();

  window.addEventListener('hashchange', applyRoute);
  if (!location.hash || location.hash === '#') history.replaceState(null, '', '#home');
  applyRoute();
  syncHamburgerAria();
})();
