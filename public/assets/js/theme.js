"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const docReady = (fn) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    setTimeout(fn, 1);
  }
};

const resize = (fn) => window.addEventListener("resize", fn);
const isIterableArray = (array) => Array.isArray(array) && !!array.length;
const camelize = (str) => {
  const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
};

const getData = (el, data) => {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

const hexToRgb = (hexValue) => {
  let hex = hexValue.indexOf("#") === 0 ? hexValue.substring(1) : hexValue;
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  );
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

const rgbaColor = (color = "#fff", alpha = 0.5) => `rgba(${hexToRgb(color)}, ${alpha})`;

const colors = {
  primary: "#0057FF",
  secondary: "#748194",
  success: "#00d27a",
  info: "#27bcfd",
  warning: "#f5803e",
  danger: "#e63757",
  light: "#F9FAFD",
  dark: "#000",
};

const grays = {
  white: "#fff",
  100: "#f9fafd",
  200: "#edf2f9",
  300: "#d8e2ef",
  400: "#b6c1d2",
  500: "#9da9bb",
  600: "#748194",
  700: "#5e6e82",
  800: "#4d5969",
  900: "#344050",
  1000: "#232e3c",
  1100: "#0b1727",
  black: "#000",
};

const hasClass = (el, className) => el?.classList?.value.includes(className);
const addClass = (el, className) => el?.classList?.add(className);

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540,
};

const getBreakpoint = (el) => {
  const classes = el?.classList?.value;
  let breakpoint;
  if (classes) {
    breakpoint = breakpoints[
      classes
        .split(" ")
        .filter((cls) => cls.includes("navbar-expand-"))
        .pop()
        .split("-")
        .pop()
    ];
  }
  return breakpoint;
};

const navbarInit = () => {
  const Selector = {
    NAVBAR: "[data-navbar-on-scroll]",
    NAVBAR_COLLAPSE: ".navbar-collapse",
    NAVBAR_TOGGLER: ".navbar-toggler",
  };
  const ClassNames = {
    COLLAPSED: "collapsed",
  };
  const Events = {
    SCROLL: "scroll",
    SHOW_BS_COLLAPSE: "show.bs.collapse",
    HIDE_BS_COLLAPSE: "hide.bs.collapse",
    HIDDEN_BS_COLLAPSE: "hidden.bs.collapse",
  };
  const DataKey = {
    NAVBAR_ON_SCROLL: "navbar-light-on-scroll",
  };
  const navbar = document.querySelector(Selector.NAVBAR);
  if (!navbar) return;

  navbar.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link") && window.innerWidth < getBreakpoint(navbar)) {
      navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
    }
  });

  const windowHeight = window.innerHeight;
  const html = document.documentElement;
  const navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
  const allColors = { ...colors, ...grays };
  const name = getData(navbar, DataKey.NAVBAR_ON_SCROLL);
  const colorName = Object.keys(allColors).includes(name) ? name : "white";
  const color = allColors[colorName];
  const bgClassName = `bg-${colorName}`;
  const shadowName = "shadow-transition";
  const colorRgb = hexToRgb(color);
  const { backgroundImage } = window.getComputedStyle(navbar);
  const transition = "background-color 0.35s ease";
  navbar.style.backgroundImage = "none";

  window.addEventListener(Events.SCROLL, () => {
    const scrollTop = html.scrollTop;
    let alpha = (scrollTop / windowHeight) * 0.15;
    navbar.classList.add("backdrop");
    if (alpha === 0) navbar.classList.remove("backdrop");
    if (alpha >= 1) alpha = 1;
    navbar.style.backgroundColor = `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${alpha})`;
    navbar.style.backgroundImage = alpha > 0 || hasClass(navbarCollapse, "show") ? backgroundImage : "none";
    alpha > 0 || hasClass(navbarCollapse, "show")
      ? navbar.classList.add(shadowName)
      : navbar.classList.remove(shadowName);
  });

  resize(() => {
    const breakPoint = getBreakpoint(navbar);
    if (window.innerWidth > breakPoint) {
      navbar.style.backgroundImage = html.scrollTop ? backgroundImage : "none";
      navbar.style.transition = "none";
    } else if (!hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
      navbar.classList.add(bgClassName);
      navbar.classList.add(shadowName);
      navbar.style.backgroundImage = backgroundImage;
    }
    if (window.innerWidth <= breakPoint) {
      navbar.style.transition = hasClass(navbarCollapse, "show") ? transition : "none";
    }
  });

  navbarCollapse?.addEventListener(Events.SHOW_BS_COLLAPSE, () => {
    navbar.classList.add(bgClassName);
    navbar.classList.add(shadowName);
    navbar.style.backgroundImage = backgroundImage;
    navbar.style.transition = transition;
  });

  navbarCollapse?.addEventListener(Events.HIDE_BS_COLLAPSE, () => {
    navbar.classList.remove(bgClassName);
    navbar.classList.remove(shadowName);
    if (!html.scrollTop) navbar.style.backgroundImage = "none";
  });

  navbarCollapse?.addEventListener(Events.HIDDEN_BS_COLLAPSE, () => {
    navbar.style.transition = "none";
  });
};

const scrollToTop = () => {
  document.querySelectorAll("[data-anchor] > a, [data-scroll-to]").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const el = e.target;
      const id = getData(el, "scroll-to") || el.getAttribute("href");
      const offset = getData(el, "offset-top") ?? getOffset(document.querySelector(id)).top - 100;
      window.scroll({ top: offset, left: 0, behavior: "smooth" });
      window.location.hash = id;
    });
  });
};

docReady(navbarInit);
docReady(scrollToTop);
// detectorInit removed for compatibility with React
