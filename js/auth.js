/* ═══════════════════════════════════════════
   NMAGANDA — auth.js
   Demo Auth Sistemi (localStorage tabanlı)
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  var USERS_KEY   = 'maganda_users';
  var SESSION_KEY = 'maganda_session';

  /* ─── YARDIMCI ───────────────────────────── */
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  /* ─── KAYIT ──────────────────────────────── */
  function register(name, email, password) {
    var users = getUsers();
    if (users.find(function (u) { return u.email.toLowerCase() === email.toLowerCase(); })) {
      return { ok: false, error: 'Bu e-posta adresi zaten kayıtlı.' };
    }
    var user = {
      id:             Date.now(),
      name:           name.trim(),
      email:          email.trim().toLowerCase(),
      password:       password,
      savedAddresses: [],
      savedCard:      null,
      orders:         [],
      createdAt:      new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    createSession(user);
    return { ok: true, user: user };
  }

  /* ─── GİRİŞ ──────────────────────────────── */
  function login(email, password) {
    var users = getUsers();
    var user  = users.find(function (u) {
      return u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password;
    });
    if (!user) return { ok: false, error: 'E-posta veya şifre hatalı.' };
    createSession(user);
    return { ok: true, user: user };
  }

  /* ─── ÇIKIŞ ──────────────────────────────── */
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  }

  /* ─── SESSION ────────────────────────────── */
  function createSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      userId:     user.id,
      email:      user.email,
      name:       user.name,
      loggedInAt: new Date().toISOString()
    }));
  }

  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch (e) { return null; }
  }

  function isLoggedIn() { return !!getSession(); }

  /* ─── KULLANICI VERİSİ ───────────────────── */
  function getCurrentUser() {
    var session = getSession();
    if (!session) return null;
    var users = getUsers();
    var idx   = users.findIndex(function (u) { return u.id === session.userId; });
    if (idx === -1) return null;
    var user  = users[idx];

    // Eski format uyumluluğu: savedAddress (tekil) → savedAddresses (array)
    // Dönüşüm yapıldıysa localStorage'a kaydet (ID tutarlılığı için)
    var migrated = false;
    if (user.savedAddress && !user.savedAddresses) {
      user.savedAddresses = [Object.assign({ id: Date.now(), isDefault: true }, user.savedAddress)];
      delete user.savedAddress;
      migrated = true;
    }
    if (!user.savedAddresses) {
      user.savedAddresses = [];
      migrated = true;
    }

    // Kart migration
    if (user.savedCard && !user.savedCards) {
      user.savedCards = [Object.assign({ id: Date.now() + 1, isDefault: true }, user.savedCard)];
      delete user.savedCard;
      migrated = true;
    }
    if (!user.savedCards) {
      user.savedCards = [];
      migrated = true;
    }

    if (migrated) {
      users[idx] = user;
      saveUsers(users);
    }

    return user;
  }

  function updateCurrentUser(fields) {
    var session = getSession();
    if (!session) return false;
    var users = getUsers();
    var idx   = users.findIndex(function (u) { return u.id === session.userId; });
    if (idx === -1) return false;
    Object.assign(users[idx], fields);
    saveUsers(users);
    return true;
  }

  /* ─── ADRES CRUD ─────────────────────────── */
  function getAddresses() {
    var user = getCurrentUser();
    return user ? (user.savedAddresses || []) : [];
  }

  function addAddress(addr) {
    var user = getCurrentUser();
    if (!user) return false;
    var addresses = user.savedAddresses || [];
    var newAddr   = Object.assign({}, addr, { id: Date.now() });
    if (addresses.length === 0) newAddr.isDefault = true;
    addresses.push(newAddr);
    return updateCurrentUser({ savedAddresses: addresses }) ? newAddr : false;
  }

  function updateAddress(id, fields) {
    var user = getCurrentUser();
    if (!user) return false;
    var addresses = user.savedAddresses || [];
    var idx = addresses.findIndex(function (a) { return a.id === id; });
    if (idx === -1) return false;
    Object.assign(addresses[idx], fields);
    return updateCurrentUser({ savedAddresses: addresses });
  }

  function deleteAddress(id) {
    var user = getCurrentUser();
    if (!user) return false;
    var addresses = (user.savedAddresses || []).filter(function (a) { return a.id !== id; });
    if (addresses.length > 0 && !addresses.find(function (a) { return a.isDefault; })) {
      addresses[0].isDefault = true;
    }
    return updateCurrentUser({ savedAddresses: addresses });
  }

  function setDefaultAddress(id) {
    var user = getCurrentUser();
    if (!user) return false;
    var addresses = user.savedAddresses || [];
    addresses.forEach(function (a) { a.isDefault = (a.id === id); });
    return updateCurrentUser({ savedAddresses: addresses });
  }

  /* ─── KART CRUD ──────────────────────────── */
  function getCards() {
    var user = getCurrentUser();
    return user ? (user.savedCards || []) : [];
  }

  function addCard(card) {
    var user = getCurrentUser();
    if (!user) return false;
    var cards  = user.savedCards || [];
    var newCard = Object.assign({}, card, { id: Date.now() });
    if (cards.length === 0) newCard.isDefault = true;
    cards.push(newCard);
    return updateCurrentUser({ savedCards: cards }) ? newCard : false;
  }

  function updateCard(id, fields) {
    var user = getCurrentUser();
    if (!user) return false;
    var cards = user.savedCards || [];
    var idx   = cards.findIndex(function (c) { return c.id === id; });
    if (idx === -1) return false;
    Object.assign(cards[idx], fields);
    return updateCurrentUser({ savedCards: cards });
  }

  function deleteCard(id) {
    var user = getCurrentUser();
    if (!user) return false;
    var cards = (user.savedCards || []).filter(function (c) { return c.id !== id; });
    if (cards.length > 0 && !cards.find(function (c) { return c.isDefault; })) {
      cards[0].isDefault = true;
    }
    return updateCurrentUser({ savedCards: cards });
  }

  function setDefaultCard(id) {
    var user = getCurrentUser();
    if (!user) return false;
    var cards = user.savedCards || [];
    cards.forEach(function (c) { c.isDefault = (c.id === id); });
    return updateCurrentUser({ savedCards: cards });
  }

  /* ─── SİPARİŞ EKLE ───────────────────────── */

  function addOrder(orderData) {
    var user = getCurrentUser();
    if (!user) return false;
    var order = Object.assign({}, orderData, {
      id:        'ORD-' + Date.now(),
      createdAt: new Date().toISOString()
    });
    user.orders = user.orders || [];
    user.orders.unshift(order);
    updateCurrentUser({ orders: user.orders });
    return order.id;
  }

  /* ─── NAVBAR AUTH DURUMU ─────────────────── */
  function initNavbarAuth() {
    var authLink = document.getElementById('navAuthLink');
    var authName = document.getElementById('navAuthName');
    if (!authLink) return;
    var session = getSession();
    if (session) {
      authLink.href = 'hesabim.html';
      authLink.setAttribute('aria-label', 'Hesabım');
      if (authName) authName.textContent = session.name.split(' ')[0].toUpperCase();
      authLink.classList.add('nav__auth--logged');
    } else {
      authLink.href = 'login.html';
      if (authName) authName.textContent = 'GİRİŞ YAP';
      authLink.classList.remove('nav__auth--logged');
    }
  }

  /* ─── GLOBAL API ─────────────────────────── */
  window.MagandaAuth = {
    register:          register,
    login:             login,
    logout:            logout,
    getSession:        getSession,
    isLoggedIn:        isLoggedIn,
    getCurrentUser:    getCurrentUser,
    updateCurrentUser: updateCurrentUser,
    addOrder:          addOrder,
    initNavbarAuth:    initNavbarAuth,
    getAddresses:      getAddresses,
    addAddress:        addAddress,
    updateAddress:     updateAddress,
    deleteAddress:     deleteAddress,
    setDefaultAddress: setDefaultAddress,
    getCards:          getCards,
    addCard:           addCard,
    updateCard:        updateCard,
    deleteCard:        deleteCard,
    setDefaultCard:    setDefaultCard
  };

  document.addEventListener('DOMContentLoaded', initNavbarAuth);

})();
