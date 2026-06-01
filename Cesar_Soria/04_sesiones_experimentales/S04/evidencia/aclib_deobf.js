Need to install the following packages:
webcrack@2.16.0
Ok to proceed? (y) (function () {
  'use strict';

  class _0x4525bc {
    constructor(_0xd4b2d6 = "adcsh", _0x3dc8b0 = false) {
      this.tagName = _0xd4b2d6;
      this.isDebugEnabled = _0x3dc8b0;
      if (_0x3dc8b0 = localStorage.getItem("adcsh_dbg")) {
        this.isDebugEnabled = JSON.parse(_0x3dc8b0);
      }
    }
    #e(_0x4c8221, _0x40733c) {
      if (this.isDebugEnabled) {
        console.log("[" + this.tagName + "][" + _0x4c8221 + "]:", ..._0x40733c);
      }
    }
    debug(..._0x5498eb) {
      this.#e("debug", _0x5498eb);
    }
    error(..._0xc33918) {
      this.#e("error", _0xc33918);
    }
  }
  const _0x113069 = (_0x58173d, _0x295df8, _0x25ee68) => _0x58173d.addEventListener ? _0x58173d.addEventListener(_0x295df8, _0x25ee68) : _0x58173d.attachEvent("on" + _0x295df8, _0x25ee68);
  const _0x55789e = (_0x2228a3, _0xf74301, _0x2575cb) => {
    if (_0x2228a3.removeEventListener) {
      return _0x2228a3.removeEventListener(_0xf74301, _0x2575cb);
    }
    _0x2228a3.detachEvent("on" + _0xf74301, _0x2575cb);
  };
  const _0x5c8388 = async (_0xeee246, _0x5e55fa = false) => typeof navigator != "undefined" && "userAgentData" in navigator ? navigator.userAgentData.getHighEntropyValues(["model", "platform", "platformVersion", "uaFullVersion"]).then(_0x2c1ccd => {
    const _0x30873b = {};
    if (_0x2c1ccd.hasOwnProperty("brands") && _0x2c1ccd.brands.length > 0) {
      const _0x490f37 = [];
      for (let _0x360f9e = 0; _0x360f9e < _0x2c1ccd.brands.length; _0x360f9e += 1) {
        const _0x361c36 = _0x2c1ccd.brands[_0x360f9e];
        _0x490f37.push("\"" + _0x361c36.brand + "\";v=" + _0x361c36.version);
      }
      _0x30873b.chu = encodeURIComponent(_0x490f37.join(", "));
    }
    if (_0x2c1ccd.hasOwnProperty("mobile")) {
      _0x30873b.chmob = encodeURIComponent(_0x2c1ccd.mobile ? "?1" : "?0");
    }
    const _0x258687 = {
      model: "chmod",
      platform: "chp",
      platformVersion: "chpv",
      uaFullVersion: "chuafv"
    };
    for (const _0x20e64b in _0x258687) {
      if (_0x2c1ccd.hasOwnProperty(_0x20e64b) && _0x2c1ccd[_0x20e64b]) {
        _0x30873b[_0x258687[_0x20e64b]] = encodeURIComponent(_0x2c1ccd[_0x20e64b]);
      }
    }
    if (_0x5e55fa) {
      return _0x30873b;
    }
    let _0x323f11 = "";
    for (let _0x119e64 in _0x30873b) {
      _0x323f11 += "&" + _0x119e64 + "=" + _0x30873b[_0x119e64];
    }
    return _0x323f11;
  }).catch(_0x4588cb => {
    _0xeee246.error("error getting client hints:", _0x4588cb);
    return "";
  }) : _0x5e55fa ? {} : "";
  const _0x270a15 = () => {
    let _0x1280f3 = window.location.href;
    if (_0x201aa6()) {
      _0x1280f3 = document.referrer;
    }
    return _0x30c1ab(_0x1280f3);
  };
  const _0x201aa6 = () => {
    try {
      if (window.self !== window.top) {
        return 1;
      } else {
        return 0;
      }
    } catch (_0x362e66) {
      return 1;
    }
  };
  const _0x30c1ab = _0x5122de => {
    let _0x51b319 = Math.max(_0x5122de.indexOf(" ", 256), _0x5122de.indexOf(",", 256));
    if (_0x51b319 > 384 || _0x51b319 < 20) {
      _0x51b319 = 256;
    }
    return _0x5122de.substring(0, _0x51b319);
  };
  const _0x32032e = () => {
    if (window.rgxngibqxq === undefined || window.rgxngibqxq === "") {
      let _0x46e09a = [];
      let _0x19cd67 = "0123456789abcdefghijklmnopqrstuvwxyz";
      for (let _0x4da2d8 = 0; _0x4da2d8 < 32; _0x4da2d8++) {
        _0x46e09a[_0x4da2d8] = _0x19cd67.substr(Math.floor(Math.random() * 16), 1);
      }
      _0x46e09a[14] = "4";
      _0x46e09a[19] = _0x19cd67.substr(_0x46e09a[19] & 3 | 8, 1);
      window.rgxngibqxq = _0x46e09a.join("");
    }
    return window.rgxngibqxq;
  };
  const _0x3e1bb9 = () => {
    let _0x5dee29 = document.title;
    if (_0x201aa6()) {
      try {
        _0x5dee29 = window.top.document.title;
      } catch (_0x264b18) {
        _0x5dee29 = "";
      }
    }
    return _0x30c1ab(_0x5dee29);
  };
  const _0x5e83b7 = () => {
    var _0x2338f9 = document.referrer;
    if (_0x201aa6()) {
      try {
        _0x2338f9 = window.top.document.referrer;
      } catch (_0x410096) {
        _0x2338f9 = "";
      }
    }
    return _0x30c1ab(_0x2338f9);
  };
  const _0x126357 = (_0x4f83dd, _0x3144c5 = null) => {
    try {
      const _0x59bc8e = window.top.document.getElementsByTagName("meta");
      for (let _0x4da276 = 0; _0x4da276 < _0x59bc8e.length; _0x4da276++) {
        if (_0x59bc8e[_0x4da276].hasAttribute("name") && _0x59bc8e[_0x4da276].getAttribute("name").toLowerCase() === _0x4f83dd) {
          const _0x1653ee = _0x59bc8e[_0x4da276].getAttribute("content");
          return _0x30c1ab(_0x1653ee);
        }
      }
    } catch (_0x33b27a) {
      if (_0x3144c5) {
        _0x3144c5.error(_0x33b27a);
      }
    }
    return "";
  };
  const _0x4fdb63 = /opera/i.test(navigator.userAgent);
  const _0x1b2f28 = /chrome|crios/i.test(navigator.userAgent);
  const _0x4cfe89 = /firefox/i.test(navigator.userAgent);
  const _0xaab97c = (navigator.userAgent.match(/.+(?:ox|me|ra|ie|Edge)[\/: ]([\d.]+)/) || [])[1];
  const _0x4a1a7d = parseInt(_0xaab97c);
  const _0x671a81 = /android/i.test(navigator.userAgent);
  const _0x473bb6 = /ipad|ipod|iphone/i.test(navigator.userAgent);
  const _0x2b3614 = /blackberry/i.test(navigator.userAgent) || /BB10/i.test(navigator.userAgent);
  const _0x303760 = /iemobile/i.test(navigator.userAgent) || /(?=.*\bWindows\b)(?=.*\bARM\b)/i.test(navigator.userAgent) || /Windows Phone/i.test(navigator.userAgent);
  const _0x3eb239 = /opera mini/i.test(navigator.userAgent) || /opios/i.test(navigator.userAgent);
  const _0x3bb6cd = /^((?!UCWEB).)*UCBrowser.*Mobile.+/i.test(navigator.userAgent);
  const _0x237d97 = /(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)/i.test(navigator.userAgent);
  const _0x4243f5 = /(KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA|JSS15J|Silk|Kindle)/i.test(navigator.userAgent);
  const _0x5f29c0 = /fban\/fbios|fbav|fbios|fb_iab\/fb4a/i.test(navigator.userAgent);
  const _0xa0b21 = _0x671a81 || _0x473bb6 || _0x2b3614 || _0x303760 || _0x3eb239 || _0x3bb6cd || _0x237d97 || _0x4243f5 || _0x5f29c0;
  const _0x412cae = /pinterest\/(ios|android)/i.test(navigator.userAgent);
  const _0xfe7189 = /YaBrowser/i.test(navigator.userAgent);
  const _0x25671f = /Vivaldi/i.test(navigator.userAgent);
  const _0x327da3 = /Ddg/i.test(navigator.userAgent);
  const _0x2c1aba = /UCPC/i.test(navigator.userAgent);
  const _0x4de4a8 = /Whale/i.test(navigator.userAgent);
  const _0x1e4e6d = (_0x2d8dae, _0x6fba22 = 1, _0x5a47ed = 15) => ((_0x1ec980, _0x58c7df) => {
    let _0x2f1242 = "";
    for (let _0x4327c6 = 0; _0x4327c6 < _0x58c7df; _0x4327c6++) {
      _0x2f1242 += _0x1ec980[Math.floor(Math.random() * _0x1ec980.length)];
    }
    return _0x2f1242;
  })(_0x2d8dae, Math.floor(Math.random() * (_0x5a47ed - _0x6fba22 + 1)) + _0x6fba22);
  const _0xac05ea = _0x5cc1db => {
    if ((_0x5cc1db = new URL(_0x5cc1db)).search) {
      const _0x506d64 = _0x1e4e6d("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 24, 24);
      const _0x393178 = _0x5cc1db.searchParams.entries();
      const _0xb63c03 = Array.from(_0x393178);
      (_0x1d8a5b => {
        for (let _0x1af353 = _0x1d8a5b.length - 1; _0x1af353 > 0; _0x1af353--) {
          const _0x160ab8 = Math.floor(Math.random() * (_0x1af353 + 1));
          [_0x1d8a5b[_0x1af353], _0x1d8a5b[_0x160ab8]] = [_0x1d8a5b[_0x160ab8], _0x1d8a5b[_0x1af353]];
        }
      })(_0xb63c03);
      const _0x9eb857 = _0xb63c03.map(_0x548496 => _0x548496[0] + "=" + encodeURIComponent(_0x548496[1])).join("&");
      const _0x49a2f0 = encodeURIComponent(btoa(_0x9eb857));
      _0x5cc1db.search = _0x506d64 + "=" + _0x49a2f0;
    }
    return _0x5cc1db.toString();
  };
  const _0x426012 = () => navigator.platform + "/" + navigator.appCodeName + "/" + navigator.appName + "/" + navigator.cookieEnabled + "/" + navigator.javaEnabled() + "/" + navigator.vendor + Math.max(window.screen.width, window.screen.height) + "x" + Math.min(window.screen.width, window.screen.height) + new Date().getTimezoneOffset() + navigator.language + (navigator.deviceMemory || "unknown") + navigator.hardwareConcurrency + screen.pixelDepth + " bits";
  const _0x1ca326 = (() => {
    try {
      return new Request("", {
        keepalive: true
      }).keepalive === true;
    } catch (_0x4b7b12) {
      return false;
    }
  })();
  const _0x5b7bf3 = _0x5dd2a0 => JSON.parse(atob(_0x5dd2a0));
  const _0x7b55ed = _0x13e29c => {
    if (_0x13e29c.s) {
      const _0x5492d1 = _0x5b7bf3(_0x13e29c.s);
      delete _0x13e29c.s;
      return {
        ..._0x13e29c,
        ..._0x5492d1
      };
    }
    ["hp", "hIpp", "hInt"].forEach(_0x133d75 => {
      _0x13e29c[_0x133d75] &&= _0x5b7bf3(_0x13e29c[_0x133d75]);
    });
    return _0x13e29c;
  };
  const _0x448813 = _0x32384e => typeof _0x32384e == "boolean";
  const _0x558e97 = _0x512835 => Number.isInteger(_0x512835);
  const _0x4ac850 = _0x2bac93 => Object.prototype.toString.call(_0x2bac93) === "[object String]";
  const _0x2ed09c = _0x2ec082 => ["top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"].includes(_0x2ec082);
  class _0x5cb83d {
    isCapped = false;
    hasNoInventory = false;
    async show() {
      throw new Error("not implemented");
    }
  }
  const _0x9fd3b = "interstitial";
  const _0x2cdd89 = "pop";
  const _0x1b2f54 = "tabswap";
  const _0x1e03c5 = (_0x58e292, _0x7c067c, _0x1fd80c, _0x8ecc0c, _0x3e236b) => {
    const _0x4faa9b = document.createElement("div");
    _0x4faa9b.id = "modal";
    _0x4faa9b.style.position = "fixed";
    _0x4faa9b.style.top = "5vh";
    _0x4faa9b.style.left = "50%";
    _0x4faa9b.style.transform = "translate(-50%)";
    _0x4faa9b.style.maxWidth = "95%";
    _0x4faa9b.style.display = "flex";
    _0x4faa9b.style.flexDirection = "column";
    _0x4faa9b.style.alignItems = "center";
    _0x4faa9b.style.overflow = "hidden";
    _0x4faa9b.style.padding = "10px";
    _0x4faa9b.style.borderRadius = "6px";
    _0x4faa9b.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    _0x4faa9b.style.zIndex = "2147483644";
    _0x4faa9b.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    _0x4faa9b.setAttribute("doskip", "1");
    _0x4faa9b.setAttribute("prclck", "1");
    const _0xa9c21 = document.createElement("div");
    _0xa9c21.id = "buttonContainer";
    _0xa9c21.style.display = "block";
    _0xa9c21.style.margin = "0";
    _0xa9c21.style.width = "100%";
    _0xa9c21.style.textAlign = "center";
    _0xa9c21.style.padding = "0";
    _0xa9c21.style.height = "36px";
    _0xa9c21.style.fontSize = "16px";
    _0xa9c21.style.fontFamily = "OpenSans-Semibold, Arial, \"Helvetica Neue\", Helvetica, sans-serif";
    const _0x344545 = document.createElement("a");
    _0x344545.id = "goToButton";
    _0x344545.style.float = "left";
    _0x344545.style.borderRadius = "4px";
    _0x344545.style.fontSize = "12px";
    _0x344545.style.background = "rgb(0, 0, 0)";
    _0x344545.style.opacity = "1";
    _0x344545.style.textDecoration = "none";
    _0x344545.style.color = "rgb(255, 255, 255)";
    _0x344545.style.padding = "10px 20px";
    _0x344545.style.cursor = "pointer";
    _0x344545.style.display = "inline-block";
    _0x344545.textContent = _0x58e292;
    _0x344545.href = _0x7c067c;
    _0x344545.target = "_blank";
    _0x344545.rel = "noopener noreferrer";
    const _0x1a9b79 = document.createElement("div");
    _0x1a9b79.id = "closeButton";
    _0x1a9b79.style.float = "right";
    _0x1a9b79.style.borderRadius = "4px";
    _0x1a9b79.style.fontSize = "12px";
    _0x1a9b79.style.background = "rgb(0, 0, 0)";
    _0x1a9b79.style.opacity = "1";
    _0x1a9b79.style.textDecoration = "none";
    _0x1a9b79.style.color = "rgb(255, 255, 255)";
    _0x1a9b79.style.padding = "10px 20px";
    _0x1a9b79.style.cursor = "pointer";
    _0x1a9b79.style.display = "inline-block";
    _0x1a9b79.textContent = _0x1fd80c;
    const _0x452f20 = document.createElement("div");
    _0x452f20.id = "content";
    _0x452f20.style.marginTop = "10px";
    _0x452f20.style.maxWidth = "100%";
    const _0x57c288 = document.createElement("img");
    _0x57c288.id = "impImg";
    _0x57c288.style.display = "none";
    _0x57c288.width = "0";
    _0x57c288.height = "0";
    _0x57c288.src = _0x3e236b;
    _0xa9c21.appendChild(_0x344545);
    _0xa9c21.appendChild(_0x1a9b79);
    _0x4faa9b.appendChild(_0xa9c21);
    _0x452f20.appendChild(_0x8ecc0c);
    _0x4faa9b.appendChild(_0x452f20);
    _0x4faa9b.appendChild(_0x57c288);
    return _0x4faa9b;
  };
  const _0x17d6a2 = (_0x199b71, _0x150baf, _0x292132, _0xb14c7f, _0x3dde0d) => {
    const _0x283a5a = document.createElement("div");
    _0x283a5a.id = "modal";
    _0x283a5a.style.textAlign = "left";
    _0x283a5a.style.width = "100%";
    _0x283a5a.style.height = "100%";
    _0x283a5a.style.position = "fixed";
    _0x283a5a.style.inset = "0";
    _0x283a5a.style.zIndex = "2147483646";
    _0x283a5a.style.backgroundColor = "rgba(0,0,0,0.8)";
    _0x283a5a.setAttribute("doskip", "1");
    _0x283a5a.setAttribute("prclck", "1");
    const _0x2b4371 = document.createElement("div");
    _0x2b4371.id = "buttonContainer";
    _0x2b4371.style.display = "block";
    _0x2b4371.style.textAlign = "center";
    _0x2b4371.style.padding = "0";
    _0x2b4371.style.height = "36px";
    _0x2b4371.style.fontSize = "16px";
    _0x2b4371.style.fontFamily = "OpenSans-Semibold, Arial, \"Helvetica Neue\", Helvetica, sans-serif";
    _0x2b4371.style.margin = "6px 15px";
    const _0x439887 = document.createElement("a");
    _0x439887.id = "goToButton";
    _0x439887.style.float = "left";
    _0x439887.style.borderRadius = "4px";
    _0x439887.style.fontSize = "16px";
    _0x439887.style.background = "rgb(0, 0, 0)";
    _0x439887.style.textDecoration = "none";
    _0x439887.style.color = "rgb(255, 255, 255)";
    _0x439887.style.padding = "10px 20px";
    _0x439887.style.cursor = "pointer";
    _0x439887.style.display = "inline-block";
    _0x439887.textContent = _0x199b71;
    _0x439887.href = _0x150baf;
    _0x439887.target = "_blank";
    _0x439887.rel = "noopener noreferrer";
    const _0x43078d = document.createElement("div");
    _0x43078d.id = "closeButton";
    _0x43078d.style.float = "right";
    _0x43078d.style.borderRadius = "4px";
    _0x43078d.style.fontSize = "16px";
    _0x43078d.style.background = "rgb(0, 0, 0)";
    _0x43078d.style.textDecoration = "none";
    _0x43078d.style.color = "rgb(255, 255, 255)";
    _0x43078d.style.padding = "10px 20px";
    _0x43078d.style.cursor = "pointer";
    _0x43078d.style.display = "inline-block";
    _0x43078d.textContent = _0x292132;
    const _0xdf087e = document.createElement("div");
    _0xdf087e.id = "content";
    _0xdf087e.style.marginTop = "10px";
    _0xdf087e.style.display = "flex";
    _0xdf087e.style.justifyContent = "center";
    _0xdf087e.style.width = "100%";
    _0xdf087e.style.height = "100%";
    const _0x5a465e = document.createElement("img");
    _0x5a465e.id = "impImg";
    _0x5a465e.style.display = "none";
    _0x5a465e.width = "0";
    _0x5a465e.height = "0";
    _0x5a465e.src = _0x3dde0d;
    _0x2b4371.appendChild(_0x439887);
    _0x2b4371.appendChild(_0x43078d);
    _0x283a5a.appendChild(_0x2b4371);
    _0xdf087e.appendChild(_0xb14c7f);
    _0x283a5a.appendChild(_0xdf087e);
    _0x283a5a.appendChild(_0x5a465e);
    return _0x283a5a;
  };
  const _0x4b25b5 = "utsid-send";
  const _0x307fe2 = "prclck";
  class _0x1e8f12 {
    #t = {};
    #i = null;
    #n = 0;
    #r;
    #o;
    #s;
    constructor(_0x1641b2, _0x5a2d3f, _0x1d3bc0, _0x442319, _0x4a2081) {
      this.#t = _0x1641b2;
      this.#i = _0x1d3bc0;
      this.#n = 0;
      this.#r = _0x5a2d3f;
      this.#o = _0x442319;
      this.#s = _0x4a2081;
    }
    render(_0x49fa2a) {
      let _0x339798 = null;
      switch (_0x49fa2a.type) {
        case 1:
          this.#i.debug("rendering INTERSTITIAL IFRAME (type 1) in " + (this.#t.isOverlay ? "OVERLAY" : "FULLSCREEN") + " mode");
          _0x339798 = this.#t.isOverlay ? (_0x52dde1 => {
            const _0x2fa638 = document.createElement("iframe");
            function _0x29763e() {
              const _0x3f014b = window.innerWidth;
              if (_0x3f014b <= 600) {
                _0x2fa638.style.width = "90vw";
                _0x2fa638.style.height = "70vh";
              } else if (_0x3f014b > 600 && _0x3f014b <= 1024) {
                _0x2fa638.style.width = "80vw";
                _0x2fa638.style.height = "70vh";
              } else {
                _0x2fa638.style.width = "60vw";
                _0x2fa638.style.height = "70vh";
              }
            }
            _0x2fa638.id = "creative_iframe";
            _0x2fa638.setAttribute("allowfullscreen", "");
            _0x2fa638.setAttribute("frameborder", "0");
            _0x2fa638.setAttribute("doskip", "1");
            _0x2fa638.setAttribute("prclck", "1");
            _0x2fa638.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
            _0x2fa638.setAttribute("referrerpolicy", "no-referrer");
            _0x2fa638.src = _0x52dde1;
            _0x2fa638.style.margin = "0";
            _0x2fa638.style.padding = "0";
            _0x2fa638.style.border = "0";
            _0x29763e();
            window.addEventListener("resize", _0x29763e);
            return {
              content: _0x2fa638,
              resizeFunc: _0x29763e
            };
          })(_0x49fa2a.url) : (_0x5a8bdb => {
            const _0x13139e = document.createElement("iframe");
            _0x13139e.id = "creative_iframe";
            _0x13139e.setAttribute("allowfullscreen", "");
            _0x13139e.setAttribute("frameborder", "0");
            _0x13139e.setAttribute("doskip", "1");
            _0x13139e.setAttribute("prclck", "1");
            _0x13139e.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
            _0x13139e.setAttribute("referrerpolicy", "no-referrer");
            _0x13139e.src = _0x5a8bdb;
            _0x13139e.style.margin = "0";
            _0x13139e.style.padding = "0";
            _0x13139e.style.border = "0";
            _0x13139e.style.width = "100%";
            _0x13139e.style.height = "100%";
            return {
              content: _0x13139e,
              resizeFunc: null
            };
          })(_0x49fa2a.url);
          break;
        case 3:
          this.#i.debug("rendering INTERSTITIAL IMAGE (type 3) in " + (this.#t.isOverlay ? "OVERLAY" : "FULLSCREEN") + " mode");
          _0x339798 = this.#t.isOverlay ? ((_0x3b2d26, _0x56b216, _0x4ba700, _0x24b482) => {
            const _0x5a2480 = document.createElement("a");
            _0x5a2480.id = "a_click_link";
            _0x5a2480.href = _0x3b2d26;
            _0x5a2480.rel = "noopener noreferrer";
            _0x5a2480.target = "_blank";
            _0x5a2480.style.display = "block";
            const _0x4a8bec = document.createElement("img");
            function _0x9c653b() {
              if (window.innerWidth / window.innerHeight >= 1) {
                _0x4a8bec.style.height = "75vh";
                _0x4a8bec.style.width = "auto";
              } else {
                _0x4a8bec.style.height = "auto";
                _0x4a8bec.style.width = "90vw";
              }
            }
            _0x4a8bec.id = "creative_image";
            _0x4a8bec.src = _0x56b216;
            _0x4a8bec.alt = "";
            _0x4a8bec.setAttribute("referrerpolicy", "no-referrer");
            _0x4a8bec.style.maxWidth = _0x4ba700 + "px";
            _0x4a8bec.style.maxHeight = _0x24b482 + "px";
            _0x4a8bec.style.width = "90vw";
            _0x5a2480.appendChild(_0x4a8bec);
            _0x9c653b();
            window.addEventListener("resize", _0x9c653b);
            return {
              content: _0x5a2480,
              resizeFunc: _0x9c653b
            };
          })(_0x49fa2a.url, _0x49fa2a.ad.url, _0x49fa2a.ad.width, _0x49fa2a.ad.height) : ((_0x4611a4, _0x292db6, _0x41ea87, _0x33d544) => {
            const _0x536dec = document.createElement("a");
            _0x536dec.id = "a_click_link";
            _0x536dec.href = _0x4611a4;
            _0x536dec.rel = "noopener noreferrer";
            _0x536dec.target = "_blank";
            _0x536dec.style.display = "block";
            const _0x474b7a = document.createElement("img");
            function _0x399c82() {
              if (window.innerWidth > window.innerHeight) {
                _0x474b7a.style.width = "auto";
                _0x474b7a.style.height = "75vh";
              } else {
                _0x474b7a.style.width = "95vw";
                _0x474b7a.style.height = "auto";
              }
            }
            _0x474b7a.id = "creative_image";
            _0x474b7a.src = _0x292db6;
            _0x474b7a.alt = "";
            _0x474b7a.setAttribute("referrerpolicy", "no-referrer");
            _0x474b7a.style.maxWidth = _0x41ea87 + "px";
            _0x474b7a.style.maxHeight = _0x33d544 + "px";
            _0x474b7a.style.width = "95vw";
            _0x536dec.appendChild(_0x474b7a);
            _0x399c82();
            window.addEventListener("resize", _0x399c82);
            return {
              content: _0x536dec,
              resizeFunc: _0x399c82
            };
          })(_0x49fa2a.url, _0x49fa2a.ad.url, _0x49fa2a.ad.width, _0x49fa2a.ad.height);
          break;
        case 4:
          if (_0x49fa2a.isHtmlTemplate) {
            this.#i.debug("rendering INTERSTITIAL HTML CUSTOM (type 4)");
            this.#a(_0x49fa2a);
            return;
          }
          this.#i.debug("rendering INTERSTITIAL HTML (type 4) in " + (this.#t.isOverlay ? "OVERLAY" : "FULLSCREEN") + " mode");
          _0x339798 = this.#t.isOverlay ? (_0x514b34 => {
            const _0x43bfbd = document.createElement("iframe");
            function _0x162651() {
              const _0x4ec408 = window.innerWidth;
              if (_0x4ec408 <= 600) {
                _0x43bfbd.style.maxWidth = "90vw";
                _0x43bfbd.style.height = "70vh";
              } else if (_0x4ec408 > 600 && _0x4ec408 <= 1024) {
                _0x43bfbd.style.maxWidth = "80vw";
                _0x43bfbd.style.height = "70vh";
              } else {
                _0x43bfbd.style.maxWidth = "60vw";
                _0x43bfbd.style.minHeight = "40vh";
              }
            }
            _0x43bfbd.id = "creative_iframe";
            _0x43bfbd.setAttribute("allowfullscreen", "");
            _0x43bfbd.setAttribute("frameborder", "0");
            _0x43bfbd.setAttribute("doskip", "1");
            _0x43bfbd.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
            _0x43bfbd.setAttribute("referrerpolicy", "no-referrer");
            _0x43bfbd.setAttribute("rel", "noopener noreferrer");
            _0x43bfbd.setAttribute(_0x514b34, "1");
            _0x43bfbd.style.margin = "0";
            _0x43bfbd.style.padding = "0";
            _0x43bfbd.style.border = "0";
            _0x162651();
            window.addEventListener("resize", _0x162651);
            return {
              content: _0x43bfbd,
              resizeFunc: _0x162651
            };
          })(_0x307fe2) : (_0x271dcb => {
            const _0x5ee3b4 = document.createElement("iframe");
            _0x5ee3b4.id = "creative_iframe";
            _0x5ee3b4.setAttribute("allowfullscreen", "");
            _0x5ee3b4.setAttribute("frameborder", "0");
            _0x5ee3b4.setAttribute("doskip", "1");
            _0x5ee3b4.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
            _0x5ee3b4.setAttribute("referrerpolicy", "no-referrer");
            _0x5ee3b4.setAttribute("rel", "noopener noreferrer");
            _0x5ee3b4.setAttribute(_0x271dcb, "1");
            _0x5ee3b4.style.margin = "0";
            _0x5ee3b4.style.padding = "0";
            _0x5ee3b4.style.border = "0";
            _0x5ee3b4.style.width = "100%";
            _0x5ee3b4.style.height = "100%";
            return {
              content: _0x5ee3b4,
              resizeFunc: null
            };
          })(_0x307fe2);
          break;
        default:
          this.#i.error("no such type of interstitial: " + _0x49fa2a.type);
          return;
      }
      const _0x2cedbc = document.createElement("div");
      document.body.appendChild(_0x2cedbc);
      const _0x39302b = _0x2cedbc.attachShadow({
        mode: "open"
      });
      const _0x41cacb = this.#t.isOverlay ? _0x1e03c5 : _0x17d6a2;
      _0x39302b.appendChild(_0x41cacb(this.#t.texts.goToButton, _0x49fa2a.url, this.#d(), _0x339798.content, _0x49fa2a.iurl));
      if (_0x49fa2a.type === 4) {
        const _0x53f892 = _0x39302b.getElementById("creative_iframe");
        _0x53f892.contentWindow.contents = _0x49fa2a.html;
        _0x53f892.src = "javascript:window[\"contents\"]";
      }
      if (!this.#t.disableCountdown && this.#t.moveTimerInsideButtonAfter > 0) {
        this.#n = this.#t.moveTimerInsideButtonAfter;
        _0x39302b.getElementById("closeButton").innerHTML = this.#d();
        const _0x322f35 = setInterval(() => {
          this.#n--;
          _0x39302b.getElementById("closeButton").innerHTML = this.#d();
          if (this.#n === 0) {
            clearInterval(_0x322f35);
          }
        }, 1000);
      }
      _0x39302b.getElementById("closeButton").addEventListener("click", () => {
        if (!(this.#n > 0)) {
          this.#i.debug("close button click. remove modal host, resize listener if present and do callback");
          _0x2cedbc.remove();
          if (_0x339798.resizeFunc) {
            window.removeEventListener("resize", _0x339798.resizeFunc);
          }
          this.#r(_0x9fd3b);
        }
      });
    }
    #d() {
      let _0xb6598e = this.#t.texts.pleaseWait + ": " + this.#n + " " + this.#t.texts.timePlural;
      if (this.#n === 1) {
        _0xb6598e = this.#t.texts.pleaseWait + ": " + this.#n + " " + this.#t.texts.timeSingle;
      }
      if (this.#n === 0) {
        _0xb6598e = this.#t.disableCountdown ? this.#t.texts.xLabel : this.#t.texts.skipAd;
      }
      return _0xb6598e;
    }
    #a(_0x1ea571) {
      const _0x3062a8 = new DOMParser().parseFromString(_0x1ea571.html, "text/html").querySelector("script");
      const _0x314eb8 = document.createElement("script");
      _0x314eb8.style.zIndex = "2147483646";
      if (_0x3062a8.src) {
        _0x314eb8.setAttribute("src", _0x3062a8.src);
      } else {
        _0x314eb8.innerText = _0x3062a8.innerText;
      }
      const _0x998be7 = () => {
        this.#i.debug("CT-CLICK");
        fetch(_0x1ea571.link, {
          mode: "no-cors"
        });
        _0x55789e(document, "ct-click", _0x998be7);
      };
      const _0x49c18e = () => {
        this.#i.debug("CT-CLOSE");
        _0x55789e(document, "ct-click", _0x998be7);
        _0x55789e(document, "ct-close", _0x49c18e);
        document.body.removeChild(_0x314eb8);
        this.#r(_0x9fd3b);
      };
      _0x113069(document, "ct-click", _0x998be7);
      _0x113069(document, "ct-close", _0x49c18e);
      let _0x134943 = _0x1ea571.iurl;
      if (window[_0x4b25b5]) {
        _0x134943 += "&utsid=" + window[_0x4b25b5];
      }
      _0x134943 += "&cbpage=" + encodeURIComponent(_0x270a15());
      _0x134943 += "&cbref=" + encodeURIComponent(_0x5e83b7());
      _0x314eb8.onload = async () => {
        try {
          await fetch(_0x134943.toString());
        } catch (_0x4527ac) {
          this.#i.debug(_0x4527ac);
          if (this.#s && !this.#o.isAdbMode()) {
            this.#i.debug("imp failed: try alt domain and path");
            this.#o.enableAdbMode();
          }
          return;
        }
        document.dispatchEvent(new CustomEvent("impression-event"));
      };
      _0x314eb8.onerror = () => {
        this.#i.debug("custom html script failed to load");
        this.#r(_0x9fd3b);
      };
      document.body.appendChild(_0x314eb8);
    }
  }
  let _0x46f49d = class extends _0x5cb83d {
    #l;
    #c;
    #g;
    #h;
    #u;
    #p;
    #r;
    #b;
    #m;
    #o;
    #i;
    #w = false;
    #t = {};
    isCapped = false;
    hasNoInventory = false;
    #f = null;
    #s;
    #v = 12;
    #y = "81.5";
    #S = null;
    #A = false;
    #k = false;
    #x;
    constructor(_0x4ae937) {
      super();
      this.#i = new _0x4525bc("atag_" + _0x4ae937.collectiveZoneId + "_interstitial_" + _0x4ae937.zoneId);
      this.#i.debug("init atag interstitial with config:", _0x4ae937);
      this.#l = _0x4ae937.zoneId;
      this.#s = _0x4ae937.adblockSettings;
      this.#c = _0x4ae937.collectiveZoneId;
      this.#g = _0x4ae937.aggressivity;
      this.#h = _0x4ae937.recordPageView;
      this.#u = _0x4ae937.adsCapping;
      this.#p = _0x4ae937.abTest;
      this.#h = _0x4ae937.recordPageView;
      this.#r = _0x4ae937.actionCallback;
      this.#b = _0x4ae937.adserverDomain;
      this.#o = window.aclib;
      this.#m = _0x4ae937.clientHintsQueryStr;
      this.#k = _0x4ae937.isLoadedAsPartOfLibrary;
      this.#x = _0x4ae937.uniqueFingerprint;
      if (_0x4ae937.tagVersionSuffix) {
        this.#y += _0x4ae937.tagVersionSuffix;
      }
    }
    async show(_0x4c2741) {
      const _0x48f98b = await this.#C(_0x4c2741);
      fetch(_0x48f98b).then(_0xe474e6 => _0xe474e6.status === 200 || _0xe474e6.status === 202 ? _0xe474e6.json() : (_0xe474e6.status === 204 && (this.hasNoInventory = true, this.#i.debug("no inventory! reset after " + this.#v + " sec"), setTimeout(() => {
        this.hasNoInventory = false;
      }, this.#v * 1000), this.#v < 7200 && (this.#v *= 5)), Promise.reject())).then(_0x7b55ed).then(_0x3b239f => {
        this.#i.debug("response:", _0x3b239f);
        if (_0x3b239f.capped_ttl) {
          this.isCapped = true;
          this.#i.debug("capped! reset after " + _0x3b239f.capped_ttl + " sec");
          setTimeout(() => {
            this.isCapped = false;
          }, _0x3b239f.capped_ttl * 1000);
          this.#r(_0x9fd3b);
          return;
        }
        if (this.#v > 12) {
          this.#v = 12;
        }
        if (this.#w) {
          this.#f = _0x3b239f;
        } else {
          this.#i.debug("initial request. configure");
          this.#w = true;
          this.#t = {
            moveTimerInsideButtonAfter: _0x3b239f.moveTimerInsideButtonAfter,
            delay: _0x3b239f.delay,
            refreshRate: _0x3b239f.refreshRate,
            isOverlay: _0x3b239f.isOverlay,
            disableCountdown: _0x3b239f.disableCountdown,
            texts: _0x3b239f.texts,
            showOnInnerLinkClick: _0x3b239f.showOnInnerLinkClick
          };
          this.#f = _0x3b239f.adPayload;
          this.#S = new _0x1e8f12(this.#t, this.#r, this.#i, this.#o, this.#s);
        }
        if (this.#m) {
          this.#f.url += this.#m;
          this.#f.iurl += this.#m;
          if (this.#f.clickPixelUrl) {
            this.#f.clickPixelUrl += this.#m;
          }
        }
        if (this.#f.type === 4 && this.#f.html) {
          this.#f.html = "<!DOCTYPE html><html><head><meta name=\"referrer\" content=\"no-referrer\"></head><body>" + this.#f.html + "</body></html>";
        }
        this.#I();
      }).catch(_0x363b49 => {
        if (_0x363b49) {
          this.#i.error(_0x363b49);
        }
        if (_0x363b49 && this.#s && !this.#A) {
          this.#i.debug("fetch call failed. Switch to adblck domain and path");
          this.#A = true;
          this.#o.enableAdbMode();
          this.show();
          return;
        }
        this.#r(_0x9fd3b);
      });
    }
    #I() {
      this.#i.debug("render");
      this.#S.render(this.#f);
    }
    async #C(_0x40eef3) {
      let _0x48e8a5 = window.location.protocol + "//" + this.#b + "/script/interstitial.php";
      if (this.#s && this.#o.isAdbMode()) {
        const {
          adserverDomain: _0x111335
        } = this.#s;
        const _0x509428 = "/" + _0x1e4e6d("abcdefgh0123456789");
        _0x48e8a5 = window.location.protocol + "//" + _0x111335 + _0x509428;
      }
      _0x48e8a5 += "?r=" + this.#l;
      if (this.#w) {
        _0x48e8a5 += "&rbd=1";
      }
      if (this.#m) {
        _0x48e8a5 += this.#m;
      }
      _0x48e8a5 = _0x48e8a5 + "&atag=1" + ("&czid=" + this.#c) + ("&aggr=" + this.#g) + ("&seqid=" + _0x40eef3) + ("&ufp=" + encodeURIComponent(this.#x)) + ("&srs=" + this.#o.getSesionRandomString()) + ("&cbpage=" + encodeURIComponent(_0x270a15())) + ("&atv=" + this.#y) + ("&cbref=" + encodeURIComponent(_0x5e83b7()));
      const _0x5dedbe = await this.#o.gbtp();
      if (_0x5dedbe !== null) {
        _0x48e8a5 += "&btp=" + _0x5dedbe;
      }
      if (this.#s) {
        _0x48e8a5 += "&abtg=1";
      }
      if (this.#h) {
        _0x48e8a5 += "&ppv=1";
      }
      if (this.#p) {
        _0x48e8a5 += "&ab_test=" + this.#p;
      }
      if (this.#u === false) {
        _0x48e8a5 += "&cap=0";
      }
      if (this.#s && this.#s.adbVersion) {
        _0x48e8a5 += "&adbv=" + this.#s.adbVersion;
      }
      if (this.#o.isSandboxed()) {
        _0x48e8a5 += "&sbx=1";
      }
      if (this.#s && this.#o.isAdbMode()) {
        _0x48e8a5 += "&sadbl=2";
        _0x48e8a5 += "&fmt=intrn";
        this.#i.debug("bid url: " + _0x48e8a5);
        return _0xac05ea(_0x48e8a5);
      } else {
        this.#i.debug("bid url: " + _0x48e8a5);
        return _0x48e8a5;
      }
    }
  };
  const _0x3eb3e1 = "znid";
  class _0x3a15d7 {
    targetElementsCssSelector = null;
    shouldTriggerPopOnTargetClick = false;
    constructor(_0x357fb8, _0x2bf1b4, _0x2fc10b) {
      this.targetElementsCssSelector = _0x357fb8;
      this.shouldTriggerPopOnTargetClick = _0x2bf1b4;
      this.zoneId = _0x2fc10b;
    }
    isPresent() {
      return !!this.targetElementsCssSelector;
    }
    isActionAllowedOnElement(_0x4fcccf) {
      if (!this.isPresent()) {
        return true;
      }
      if (_0x4fcccf.hasAttribute(_0x3eb3e1)) {
        return _0x4fcccf.getAttribute(_0x3eb3e1) === this.zoneId;
      }
      if (_0x4fcccf.hasAttribute("doskip")) {
        return false;
      }
      const _0x4eab59 = Array.from(document.querySelectorAll("[doskip*=\"1\"]"));
      for (const _0x205442 of _0x4eab59) {
        if (_0x205442.contains(_0x4fcccf)) {
          return false;
        }
      }
      if (this.#E(_0x4fcccf)) {
        return this.shouldTriggerPopOnTargetClick;
      } else {
        return !this.shouldTriggerPopOnTargetClick;
      }
    }
    #E(_0x5f024d) {
      const _0x1934a8 = document.querySelectorAll(this.targetElementsCssSelector);
      do {
        for (let _0x52e0ca = 0; _0x52e0ca < _0x1934a8.length; _0x52e0ca++) {
          if (_0x5f024d === _0x1934a8[_0x52e0ca]) {
            return true;
          }
        }
      } while (_0x5f024d = _0x5f024d.parentNode);
      return false;
    }
  }
  class _0x469d3a {
    observer = null;
    iframesToOverlays = [];
    videosToOverlays = [];
    anchorsToOverlays = [];
    fullOverlay = null;
    overlaysResizeIntervalChecker = null;
    adUrl = "";
    isTabSwap = false;
    modifyBodyObserver = true;
    #i;
    #l;
    #T = false;
    constructor(_0x21f7e2, _0x36e715, _0x51bb0b, _0x212e14, _0x12ee2f) {
      this.elementTargeting = _0x21f7e2;
      this.desktopClickListener = _0x36e715;
      this.#i = _0x51bb0b;
      this.#l = _0x212e14;
      this.#T = _0x12ee2f;
    }
    setOverlaysResizeIntervalChecker() {
      this.overlaysResizeIntervalChecker = setInterval(() => {
        const _0x389338 = (_0x16d403, _0x1f9ccb) => {
          try {
            const _0x501a3b = _0x1f9ccb.getBoundingClientRect();
            _0x16d403.style.top = _0x501a3b.top + window.scrollY + "px";
            _0x16d403.style.left = _0x501a3b.left + window.scrollX + "px";
            _0x16d403.style.width = _0x501a3b.width + "px";
            _0x16d403.style.height = _0x501a3b.height + "px";
          } catch (_0x36edfa) {}
        };
        this.iframesToOverlays.forEach(({
          overlay: _0x3945ce,
          iframe: _0xb0166b
        }) => _0x389338(_0x3945ce, _0xb0166b));
        this.videosToOverlays.forEach(({
          overlay: _0xc53da3,
          video: _0x2d8f01
        }) => _0x389338(_0xc53da3, _0x2d8f01));
        this.anchorsToOverlays.forEach(({
          overlay: _0x1a75c3,
          anchor: _0x4f253c
        }) => _0x389338(_0x1a75c3, _0x4f253c));
      }, 500);
    }
    clearOverlaysResizeIntervalChecker() {
      try {
        clearInterval(this.overlaysResizeIntervalChecker);
      } catch (_0x4de219) {}
    }
    #L(_0x2db6d3) {
      const _0x1669c8 = document.createElement("div");
      _0x1669c8.addEventListener("mousedown", _0x545c88 => {
        this.#i.debug("mousedown on overlay");
        _0x545c88.stopPropagation();
        _0x545c88.preventDefault();
        this.desktopClickListener(_0x545c88);
      }, this.#T);
      if (_0x2db6d3 === document.body) {
        _0x1669c8.id = "dontfoid";
        _0x1669c8.style.top = "0px";
        _0x1669c8.style.left = "0px";
        _0x1669c8.style.width = (window.innerWidth || document.body.clientWidth) + "px";
        _0x1669c8.style.height = (window.innerHeight || document.body.clientHeight) + "px";
        _0x1669c8.style.position = "fixed";
      } else {
        const _0x196715 = _0x2db6d3.getBoundingClientRect();
        _0x1669c8.style.top = _0x196715.top + window.scrollY + "px";
        _0x1669c8.style.left = _0x196715.left + window.scrollX + "px";
        _0x1669c8.style.width = _0x196715.width + "px";
        _0x1669c8.style.height = _0x196715.height + "px";
        _0x1669c8.style.position = "absolute";
        _0x1669c8.setAttribute("donto", "");
      }
      _0x1669c8.setAttribute(_0x3eb3e1, this.#l);
      _0x1669c8.style.zIndex = 2147483647;
      _0x1669c8.style.backgroundColor = "transparent";
      if (_0x2db6d3 === document.body) {
        document.body.appendChild(_0x1669c8);
      } else {
        _0x2db6d3.parentNode.appendChild(_0x1669c8);
      }
      return _0x1669c8;
    }
    attachVideoOverlays() {
      const _0x2cd2f6 = document.querySelectorAll("video");
      for (let _0x781e1 = 0; _0x781e1 < _0x2cd2f6.length; _0x781e1++) {
        if (this.elementTargeting.isActionAllowedOnElement(_0x2cd2f6[_0x781e1])) {
          this.videosToOverlays.push({
            video: _0x2cd2f6[_0x781e1],
            overlay: this.#L(_0x2cd2f6[_0x781e1])
          });
        }
      }
    }
    attachIframeOverlays() {
      const _0x53b2e9 = document.querySelectorAll("iframe");
      for (let _0xc991c4 = 0; _0xc991c4 < _0x53b2e9.length; _0xc991c4++) {
        if (this.elementTargeting.isActionAllowedOnElement(_0x53b2e9[_0xc991c4])) {
          this.iframesToOverlays.push({
            iframe: _0x53b2e9[_0xc991c4],
            overlay: this.#L(_0x53b2e9[_0xc991c4])
          });
        }
      }
    }
    attachAnchorOverlays() {
      const _0x31452a = document.querySelectorAll("a");
      for (let _0x1219cf = 0; _0x1219cf < _0x31452a.length; _0x1219cf++) {
        if (this.elementTargeting.isActionAllowedOnElement(_0x31452a[_0x1219cf])) {
          this.anchorsToOverlays.push({
            anchor: _0x31452a[_0x1219cf],
            overlay: this.#L(_0x31452a[_0x1219cf])
          });
        }
      }
    }
    clearVideoOverlays() {
      for (let _0x549d21 = 0; _0x549d21 < this.videosToOverlays.length; _0x549d21++) {
        this.videosToOverlays[_0x549d21].overlay.parentNode.removeChild(this.videosToOverlays[_0x549d21].overlay);
        this.videosToOverlays[_0x549d21].overlay = null;
      }
      this.videosToOverlays.length = 0;
    }
    clearAnchorOverlays() {
      for (let _0x5e8577 = 0; _0x5e8577 < this.anchorsToOverlays.length; _0x5e8577++) {
        this.anchorsToOverlays[_0x5e8577].overlay.parentNode.removeChild(this.anchorsToOverlays[_0x5e8577].overlay);
        this.anchorsToOverlays[_0x5e8577].overlay = null;
      }
      this.anchorsToOverlays.length = 0;
    }
    clearIframeOverlays() {
      for (let _0x567ff7 = 0; _0x567ff7 < this.iframesToOverlays.length; _0x567ff7++) {
        this.iframesToOverlays[_0x567ff7].overlay.parentNode.removeChild(this.iframesToOverlays[_0x567ff7].overlay);
        this.iframesToOverlays[_0x567ff7].overlay = null;
      }
      this.iframesToOverlays.length = 0;
    }
  }
  class _0xe55226 extends _0x5cb83d {
    #o;
    #f = null;
    #t = {};
    #O = false;
    #P;
    #w = false;
    #T = true;
    #i;
    #y = "81.5";
    #A = false;
    #z = null;
    #v = 12;
    constructor(_0x540bc0) {
      super();
      this.#i = new _0x4525bc("atag_" + _0x540bc0.collectiveZoneId + "_suv5_" + _0x540bc0.zoneId);
      this.#o = window.aclib;
      this.#i.debug("init atag pop with config:", _0x540bc0);
      this.#t = _0x540bc0;
      this.elementTargeting = new _0x3a15d7(this.#t.targetElementsCssSelector, this.#t.triggerOnTargetElementsClick, this.#t.zoneId);
      if (_0xa0b21) {
        this.#i.debug("use capture -> false");
        this.#T = false;
      }
      this.overlays = new _0x469d3a(this.elementTargeting, this.#$.bind(this), this.#i, this.#t.zoneId, this.#T);
      if (_0x540bc0.tagVersionSuffix) {
        this.#y += _0x540bc0.tagVersionSuffix;
      }
      this.#i.debug("tag version:", this.#y);
    }
    async show() {
      this.#f = null;
      this.#P = null;
      this.#O = false;
      const _0x11ac85 = await this.#C();
      fetch(_0x11ac85).then(_0x108da1 => _0x108da1.status === 200 || _0x108da1.status === 202 ? _0x108da1.json() : (_0x108da1.status === 204 && (this.hasNoInventory = true, this.#i.debug("no inventory! reset after " + this.#v + " sec"), setTimeout(() => {
        this.hasNoInventory = false;
      }, this.#v * 1000), this.#v < 7200 && (this.#v *= 5)), Promise.reject())).then(_0x7b55ed).then(_0x42d540 => {
        this.#i.debug("response:", _0x42d540);
        if (_0x42d540.capped_ttl) {
          this.isCapped = true;
          this.#i.debug("capped! reset after " + _0x42d540.capped_ttl + " sec");
          setTimeout(() => {
            this.isCapped = false;
          }, _0x42d540.capped_ttl * 1000);
          this.#t.actionCallback(_0x2cdd89);
          return;
        }
        if (this.#v > 12) {
          this.#v = 12;
        }
        if (!this.#w) {
          this.#w = true;
          const _0x81bef9 = _0x42d540.delay ?? 0;
          this.#i.debug("delay is", _0x81bef9);
          setTimeout(() => {
            this.#R(_0x42d540);
          }, _0x81bef9 * 1000);
          return;
        }
        this.#R(_0x42d540);
      }).catch(_0x1272a9 => {
        if (_0x1272a9) {
          this.#i.error(_0x1272a9);
        }
        if (_0x1272a9 && this.#t.adblockSettings && !this.#A) {
          this.#i.debug("fetch call failed. Switch to adblck domain and path");
          this.#o.enableAdbMode();
          this.#A = true;
          this.show();
          return;
        }
        this.#t.actionCallback(_0x2cdd89);
      });
    }
    async #C() {
      let _0x1ed701 = window.location.protocol + "//" + this.#t.adserverDomain + "/script/suurl5.php";
      if (this.#t.adblockSettings && this.#o.isAdbMode()) {
        const {
          adserverDomain: _0x3e6c79
        } = this.#t.adblockSettings;
        const _0x41bb03 = "/" + _0x1e4e6d("abcdefgh0123456789");
        _0x1ed701 = window.location.protocol + "//" + _0x3e6c79 + _0x41bb03;
      }
      _0x1ed701 += "?r=" + this.#t.zoneId;
      if (this.#w) {
        _0x1ed701 += "&rbd=1";
      }
      _0x1ed701 = _0x1ed701 + this.#t.clientHintsQueryStr + "&atag=1&cbur=" + Math.random() + "&cbiframe=" + _0x201aa6() + "&cbWidth=" + (window.innerWidth || document.body.clientWidth) + "&cbHeight=" + (window.innerHeight || document.body.clientHeight) + "&cbtitle=" + encodeURIComponent(_0x3e1bb9()) + "&cbpage=" + encodeURIComponent(_0x270a15()) + "&cbref=" + encodeURIComponent(_0x5e83b7()) + "&cbdescription=" + encodeURIComponent(_0x126357("description")) + "&cbkeywords=" + encodeURIComponent(_0x126357("keywords")) + "&cbcdn=" + encodeURIComponent(this.#o.getCdnDomain()) + "&ts=" + Date.now() + "&atv=" + this.#y + "&ufp=" + encodeURIComponent(this.#t.uniqueFingerprint) + "&srs=" + this.#o.getSesionRandomString();
      const _0x40e1e3 = await this.#o.gbtp();
      if (_0x40e1e3 !== null) {
        _0x1ed701 += "&btp=" + _0x40e1e3;
      }
      if (this.#t.adblockSettings) {
        _0x1ed701 += "&abtg=1";
      }
      if (this.#t.aggressivity) {
        _0x1ed701 += "&aggr=" + this.#t.aggressivity;
      }
      if (this.#t.collectiveZoneId) {
        _0x1ed701 += "&czid=" + this.#t.collectiveZoneId;
      }
      if (this.#t.recordPageView) {
        _0x1ed701 += "&ppv=1";
      }
      if (this.#t.abTest) {
        _0x1ed701 += "&ab_test=" + this.#t.abTest;
      }
      if (this.#t.adsCapping === false) {
        _0x1ed701 += "&cap=0";
      }
      if (this.#t.adblockSettings && this.#t.adblockSettings.adbVersion) {
        _0x1ed701 += "&adbv=" + this.#t.adblockSettings.adbVersion;
      }
      if (this.#o.isSandboxed()) {
        _0x1ed701 += "&sbx=1";
      }
      if (this.#t.adblockSettings && this.#o.isAdbMode()) {
        _0x1ed701 += "&sadbl=2";
        _0x1ed701 += "&fmt=suv5";
        this.#i.debug("bid url: " + _0x1ed701);
        return _0xac05ea(_0x1ed701);
      } else {
        this.#i.debug("bid url: " + _0x1ed701);
        return _0x1ed701;
      }
    }
    #M(_0x1369fb) {
      try {
        let _0x11fb20 = this.#z ? this.#z("") : window.open("");
        _0x11fb20.document.open();
        _0x11fb20.document.writeln("<meta name=\"referrer\" content=\"no-referrer\"><script type=\"text/javascript\">window.location = \"" + _0x1369fb + "\";</script>");
        _0x11fb20.document.close();
        return _0x11fb20;
      } catch (_0x1051b2) {
        this.#i.error("window open failed:", _0x1051b2);
        return null;
      }
    }
    #D() {
      if (document.readyState === "complete" && document.body !== undefined) {
        const _0xb8f409 = document.createElement("iframe");
        _0xb8f409.width = "0";
        _0xb8f409.height = "0";
        _0xb8f409.tabindex = "-1";
        _0xb8f409.style = "position:absolute;top:-1000px;left:-1000px;visibility:hidden;border:medium none;background-color:transparent;";
        document.body.appendChild(_0xb8f409);
        this.#z = _0xb8f409.contentWindow.open.bind(_0xb8f409.contentWindow);
        return;
      }
      setTimeout(this.#D.bind(this), 50);
    }
    #R(_0x52b6d0) {
      this.#f = {
        url: this.#B(_0x52b6d0.url),
        impressionUrl: _0x52b6d0.iurl,
        refreshRate: _0x52b6d0.refreshRate,
        delay: _0x52b6d0.delay,
        type: _0x52b6d0.type
      };
      if (_0x52b6d0.targetElementsCssSelector && !this.elementTargeting.targetElementsCssSelector) {
        this.elementTargeting.targetElementsCssSelector = _0x52b6d0.targetElementsCssSelector;
        this.elementTargeting.shouldTriggerPopOnTargetClick = _0x52b6d0.triggerOnTargetElementsClick;
      }
      this.overlays.attachAnchorOverlays();
      this.overlays.attachIframeOverlays();
      this.overlays.attachVideoOverlays();
      this.overlays.setOverlaysResizeIntervalChecker();
      this.#V();
      this.#i.debug("ready to show ad");
    }
    #N() {
      return "type" in this.#f && this.#f.type === "tabswap";
    }
    #F() {
      this.#i.debug("do tabswap");
      this.#t.actionCallback(_0x1b2f54);
      const _0x387aed = this.#f.url;
      if (this.#z) {
        this.#P = this.#z(window.location.href, "_blank", "noreferrer");
      } else {
        this.#P = window.open(window.location.href, "_blank", "noreferrer");
      }
      this.#H().finally(() => {
        setTimeout(() => {
          const _0x3613eb = document.createElement("a");
          _0x3613eb.href = _0x387aed;
          _0x3613eb.rel = "noopener noreferrer";
          document.body.appendChild(_0x3613eb);
          _0x3613eb.click();
          document.body.removeChild(_0x3613eb);
        }, 50);
      });
    }
    async #H(_0x436e99 = 0) {
      const _0x3c5e7c = this.#P ? "1" : "0";
      this.#i.debug("window opened:", _0x3c5e7c);
      let _0x509e00 = this.#f.impressionUrl + ("&wo=" + _0x3c5e7c);
      if (window["utsid-send"]) {
        _0x509e00 += "&utsid=" + window["utsid-send"];
      }
      if (_0x436e99 > 0) {
        this.#i.debug("retry impression. Attempt " + _0x436e99);
        _0x509e00 += "&rtry=" + _0x436e99;
      }
      _0x509e00 = _0x509e00 + this.#t.clientHintsQueryStr + "&cbpage=" + encodeURIComponent(_0x270a15()) + "&cbref=" + encodeURIComponent(_0x5e83b7());
      this.#i.debug("send impression. url:", _0x509e00);
      if (_0x1ca326) {
        this.#i.debug("keepalive supported!");
        let _0x481dff = null;
        let _0x21eed2 = false;
        try {
          _0x481dff = await fetch(_0x509e00, {
            keepalive: true
          });
        } catch (_0x59e11e) {
          this.#i.error(_0x59e11e);
          if (this.#t.adblockSettings && !this.#o.isAdbMode()) {
            this.#i.debug("imp failed: try alt domain and path");
            this.#o.enableAdbMode();
            return;
          }
          _0x21eed2 = true;
        }
        if (_0x481dff && !_0x481dff.ok || _0x21eed2) {
          if (_0x436e99 < 2) {
            await this.#H(_0x436e99 + 1);
            document.dispatchEvent(new CustomEvent("impression-retry-event"));
          }
          return;
        }
      } else if (navigator.sendBeacon) {
        this.#i.debug("keepalive NOT supported! use sendBeacon");
        navigator.sendBeacon(_0x509e00);
      } else {
        this.#i.debug("keepalive NOT supported! use image.src");
        new Image().src = _0x509e00;
      }
      document.dispatchEvent(new CustomEvent("impression-event"));
    }
    #U() {
      this.overlays.clearOverlaysResizeIntervalChecker();
      this.overlays.clearAnchorOverlays();
      this.overlays.clearIframeOverlays();
      this.overlays.clearVideoOverlays();
      this.#f = null;
      this.#_();
      this.#o.isShowingPop = false;
      this.#t.actionCallback(_0x2cdd89);
    }
    #$(_0x185367) {
      this.#i.debug("showAdClickListener triggered by event type " + _0x185367.type + " on " + _0x185367.target.tagName);
      if (_0x185367.isTrusted) {
        if (this.#f) {
          if (this.#O) {
            this.#i.debug(_0x185367.type + " on " + _0x185367.target.tagName + ":pop rejected: current pop is locked");
          } else if (this.#o.isShowingPop) {
            this.#i.debug(_0x185367.type + " on " + _0x185367.target.tagName + ": pop rejected: another pop is being currently shown");
          } else if (this.elementTargeting.isActionAllowedOnElement(_0x185367.target)) {
            this.#o.isShowingPop = true;
            this.#O = true;
            this.#i.debug("triggering pop");
            if (this.#N()) {
              this.#F();
            } else {
              if (this.#z) {
                this.#P = this.#z(this.#f.url, "_blank", "noopener,noreferrer");
              } else {
                this.#P = window.open(this.#f.url, "_blank", "noopener,noreferrer");
              }
              this.#H().finally(() => {
                this.#U();
              });
            }
          } else {
            this.#i.debug(_0x185367.type + " on " + _0x185367.target.tagName + ": pop rejected: action not allowed on element", _0x185367.target);
          }
        } else {
          this.#i.debug(_0x185367.type + " on " + _0x185367.target.tagName + ": pop rejected: current pop has no ad loaded");
        }
      } else {
        this.#i.debug(_0x185367.type + " on " + _0x185367.target.tagName + ": pop rejected: event is not trusted");
      }
    }
    #B(_0x5d1e68) {
      let _0x41b31f = _0x5d1e68;
      if (_0x1b2f28 && _0x4a1a7d < 59 || _0x4cfe89 && _0x4a1a7d < 56) {
        _0x41b31f = "data:text/html;charset=utf-8, <html><meta http-equiv=\"refresh\" content=\"0;URL=" + _0x5d1e68 + "\"></html>";
      } else if (_0x473bb6 && _0x1b2f28 && !_0x4fdb63 && _0x4a1a7d > 63) {
        _0x5d1e68 = "googlechrome://" + _0x5d1e68.replace(/(^\w+:|^)\/\//, "");
      }
      return _0x41b31f;
    }
    #V() {
      const _0x18dcf1 = {
        zoneId: this.#t.zoneId,
        callback: this.#$.bind(this)
      };
      if (_0xa0b21 && _0x412cae) {
        this.#i.debug("subscribe to scroll");
        this.#o.subscribe("scroll", _0x18dcf1);
      }
      if (!_0xa0b21) {
        this.#i.debug("subscribe to mousedown");
        this.#o.subscribe("mousedown", _0x18dcf1, this.#T);
      }
      this.#i.debug("subscribe to click");
      this.#o.subscribe("click", _0x18dcf1, this.#T);
    }
    #_() {
      if (_0xa0b21 && _0x412cae) {
        this.#i.debug("unsubscribe from scroll");
        this.#o.unsubscribe("scroll", this.#t.zoneId);
      }
      if (!_0xa0b21) {
        this.#i.debug("unsubscribe from mousedown");
        this.#o.unsubscribe("mousedown", this.#t.zoneId, this.#T);
      }
      this.#i.debug("unsubscribe from click");
      this.#o.unsubscribe("click", this.#t.zoneId, this.#T);
    }
  }
  class _0x2d32ee {
    constructor(_0x337de4) {
      this.key = _0x337de4;
    }
    isStatePresent() {
      return window.localStorage.getItem(this.key) !== null;
    }
    getState() {
      return JSON.parse(window.localStorage.getItem(this.key));
    }
    setState(_0x831dd5) {
      window.localStorage.setItem(this.key, JSON.stringify(_0x831dd5));
    }
    removeState() {
      window.localStorage.removeItem(this.key);
    }
  }
  class _0x23ccaf {
    #i;
    #o;
    #W = null;
    #j = null;
    #q = [];
    #Z = 0;
    #K = null;
    #Q = 1;
    #G = 0;
    #J = false;
    constructor(_0x3a94c5) {
      const {
        collectiveZoneConfig: _0x4e9cc9,
        adserverDomain: _0x59d788,
        adblockSettings: _0x436938,
        clientHintsQueryStr: _0x2950ae,
        tagVersionSuffix: _0xeec50b,
        isLoadedAsPartOfLibrary: _0x43e109,
        uniqueFingerprint: _0x4ece4a
      } = _0x3a94c5;
      const {
        collectiveZoneId: _0x516ac5
      } = _0x4e9cc9;
      this.#i = new _0x4525bc("atag_" + _0x516ac5);
      this.#o = window.aclib;
      this.#q = _0x4e9cc9.rotationList;
      this.#i.debug("init autotag with config:", _0x3a94c5);
      const _0x36a8a3 = _0x4e9cc9.indexedFormats;
      let _0x10ba11 = true;
      for (const _0x4dcd41 in _0x36a8a3) {
        const _0x420e00 = _0x36a8a3[_0x4dcd41];
        switch (_0x4dcd41) {
          case "ippg":
            this.#o.runInPagePush({
              zoneId: _0x420e00.zoneId.toString(),
              delay: _0x420e00.delay,
              maxAds: _0x420e00.mads,
              renderPosDesktop: _0x420e00["render-pos-desktop"],
              renderPosMobile: _0x420e00["render-pos-mobile"],
              isAutoTag: true,
              collectiveZoneId: _0x516ac5,
              aggressivity: _0x4e9cc9.aggressivity,
              abTest: _0x4e9cc9.ab_test,
              recordPageView: _0x10ba11,
              tagVersionSuffix: _0xeec50b
            });
            break;
          case "suv4":
          case "pop":
            this.#j = new _0xe55226({
              zoneId: _0x420e00.zoneId.toString(),
              adblockSettings: _0x436938,
              adserverDomain: _0x59d788,
              clientHintsQueryStr: _0x2950ae,
              collectiveZoneId: _0x516ac5,
              aggressivity: _0x4e9cc9.aggressivity,
              adsCapping: _0x4e9cc9.adsCapping,
              abTest: _0x4e9cc9.ab_test,
              recordPageView: _0x10ba11,
              actionCallback: this.actionCallback.bind(this),
              tagVersionSuffix: _0xeec50b,
              isLoadedAsPartOfLibrary: _0x43e109,
              uniqueFingerprint: _0x4ece4a
            });
            break;
          case "interstitial":
            this.#W = new _0x46f49d({
              zoneId: _0x420e00.zoneId,
              adblockSettings: _0x436938,
              adserverDomain: _0x59d788,
              clientHintsQueryStr: _0x2950ae,
              collectiveZoneId: _0x516ac5,
              aggressivity: _0x4e9cc9.aggressivity,
              adsCapping: _0x4e9cc9.adsCapping,
              abTest: _0x4e9cc9.ab_test,
              recordPageView: _0x10ba11,
              actionCallback: this.actionCallback.bind(this),
              tagVersionSuffix: _0xeec50b,
              isLoadedAsPartOfLibrary: _0x43e109,
              uniqueFingerprint: _0x4ece4a
            });
            break;
          case "videoSlider":
            this.#o.runVideoSlider({
              zoneId: _0x420e00.zoneId.toString(),
              delay: _0x420e00.delay,
              refreshRate: _0x420e00.refreshRate,
              isNewBehavior: _0x420e00.isNewBehavior,
              renderPosition: _0x420e00.renderPosition,
              closeButtonDelay: _0x420e00.closeButtonDelay,
              isAutoTag: true,
              collectiveZoneId: _0x516ac5,
              aggressivity: _0x4e9cc9.aggressivity,
              abTest: _0x4e9cc9.ab_test,
              recordPageView: _0x10ba11,
              tagVersionSuffix: _0xeec50b
            });
            break;
          default:
            this.#i.error("ad format type not recognised from collective zone config. adformat.type: " + _0x4dcd41 + "; czid: " + czid);
        }
      }
      this.localStorageService = new _0x2d32ee("atg_" + _0x516ac5);
      const _0x33533c = this.localStorageService.getState();
      if (_0x33533c && _0x33533c.adbExpiresAt > Date.now()) {
        this.#o.enableAdbMode();
      }
      if (_0x33533c && _0x33533c.expiresAt > Date.now()) {
        this.#i.debug("previous session present:", _0x33533c);
        this.#Q = _0x33533c.shownAdsCounter;
        this.#G = _0x33533c.iterationCounter;
        this.#Z = _0x33533c.currentAdIndex;
        if (_0x33533c.isInterstitialBeingShown) {
          this.#Y();
        } else {
          this.#K = this.#q[this.#Z];
          this.#X();
        }
      } else {
        this.#K = this.#q[this.#Z];
        this.#X();
      }
    }
    actionCallback(_0xf397d8) {
      this.#i.debug("ACTION CALLBACK type:", _0xf397d8);
      if (_0xf397d8 === _0x9fd3b) {
        this.#J = false;
      } else {
        this.#Q++;
      }
      const _0x59aebb = this.#K.rotationInterval;
      this.#ee();
      this.#te();
      if (_0xf397d8 === _0x1b2f54) {
        this.#i.debug("tabswap, move to next and store session");
      } else {
        this.#i.debug("show next ad after " + _0x59aebb + " sec");
        setTimeout(this.#X.bind(this), _0x59aebb * 1000);
      }
    }
    #te() {
      const _0x271ec5 = {
        shownAdsCounter: this.#Q,
        iterationCounter: this.#G,
        currentAdIndex: this.#Z,
        isInterstitialBeingShown: this.#J,
        expiresAt: Date.now() + 600000,
        adbExpiresAt: this.#o.isAdbMode() ? Date.now() + 600000 : 0
      };
      this.#i.debug("store session state", _0x271ec5);
      this.localStorageService.setState(_0x271ec5);
    }
    #ie() {
      if (!this.#K.apply) {
        return false;
      }
      switch (this.#K.apply) {
        case "1st":
          return this.#G !== 0;
        case "odd":
          return this.#G % 2 != 1;
        case "even":
          return this.#G % 2 != 0;
        default:
          return false;
      }
    }
    #ee() {
      if (this.#Z === this.#q.length - 1) {
        this.#Z = 0;
        this.#G++;
      } else {
        this.#Z++;
      }
      this.#K = this.#q[this.#Z];
      this.#i.debug("set current ad to next on list. current ad is set to:", this.#K);
    }
    #Y() {
      this.#i.debug("show next ad");
      this.#ee();
      this.#te();
      this.#X();
    }
    #X() {
      if (this.#ie()) {
        this.#i.debug("skipping ad at index: " + this.#Z + " due to apply rule");
        this.#Y();
        return;
      }
      switch (this.#K.type) {
        case "interstitial":
          if (this.#W.isCapped || this.#W.hasNoInventory) {
            setTimeout(this.#Y.bind(this), 1000);
            return;
          }
          this.#i.debug("showing interstitial");
          this.#W.show(this.#Q);
          this.#J = true;
          this.#Q++;
          this.#te();
          break;
        case "pop":
          if (this.#j.isCapped || this.#j.hasNoInventory) {
            setTimeout(this.#Y.bind(this), 1000);
            return;
          }
          this.#i.debug("showing pop");
          this.#j.show(this.#Q);
          break;
        default:
          throw Error("rotation list element type '" + this.#K.type + "' not recognised");
      }
    }
  }
  const _0x3be74b = () => Math.round(new Date().getTime() / 1000);
  const _0x6cdc00 = _0x16195a => {
    const _0x189f4 = new _0x4525bc("user_engagement");
    const _0x4921df = "utsid-send";
    let _0x5dbddf;
    let _0x3ce4bd;
    let _0x46c55c = 0;
    let _0x161705 = false;
    let _0x439043 = {
      clientHints: {},
      isScrollable: 0,
      totalClicks: 0,
      sessionLength: 0,
      ippMissclicks: 0,
      visible: 0,
      caught: 0,
      lastevent: 0,
      isFullscreen: 0,
      isTabFocused: 0,
      eventImps: 0,
      retryCounts: 0,
      isScrolled: 0,
      isMouseMoved: 0,
      pagePercentageSeen: 0,
      belowTheFoldSeen: 0,
      touchEnd: 0,
      touchMove: 0,
      clicksByType: {
        idle: 0,
        input: 0,
        video: 0,
        button: 0,
        link: 0,
        img: 0
      },
      ufp: _0x426012()
    };
    let _0x84d7cc = _0x32032e();
    let _0x2cbf3c = _0x3be74b();
    function _0x1e191e() {
      var _0x469493;
      var _0xbc533e;
      if (_0x439043.isFullscreen === 0) {
        _0x439043.isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement ? 1 : 0;
      }
      _0x439043.isTabFocused = document.hidden || document.mozHidden || document.webkitHidden ? 0 : 1;
      _0x439043.sessionStartTime = _0x2cbf3c;
      _0x439043.sessionId = _0x84d7cc;
      _0x439043.sessionLength = _0x3be74b() - _0x2cbf3c;
      _0x439043.timeZoneOffset = new Date().getTimezoneOffset();
      _0x439043.zones = [];
      if (_0x16195a) {
        _0x439043.zones = _0x16195a.getZoneIds();
      }
      _0x439043.pUrl = encodeURIComponent(_0x270a15());
      _0x439043.pReferrer = encodeURIComponent((() => {
        const _0x155152 = document.referrer;
        if (_0x155152) {
          return _0x30c1ab(_0x155152);
        } else {
          return "";
        }
      })());
      _0x439043.pTitle = encodeURI(_0x3e1bb9());
      _0x439043.pDescription = encodeURIComponent(_0x126357("description", _0x189f4));
      _0x439043.pKeywords = encodeURIComponent(_0x126357("keywords", _0x189f4));
      _0x439043.pHasIframes = (() => {
        const _0x95e295 = document.getElementsByTagName("iframe");
        if (_0x95e295.length) {
          return _0x95e295.length;
        } else {
          return 0;
        }
      })();
      _0x439043.pWidth = Math.ceil(window.scrollWidth || document.body.scrollWidth);
      _0x439043.pHeight = Math.ceil(window.scrollHeight || document.body.scrollHeight);
      _0x439043.vWidth = Math.ceil(window.innerWidth || document.body.clientWidth);
      _0x439043.vHeight = Math.ceil(window.innerHeight || document.body.clientHeight);
      _0x439043.inIframe = _0x201aa6();
      if (sessionStorage.getItem("template")) {
        _0x439043.ippTemplate = sessionStorage.getItem("template");
      }
      _0x469493 = _0x439043.vWidth;
      _0xbc533e = _0x439043.vHeight;
      _0x439043.visible = _0x201aa6() && (_0x469493 < 10 || _0xbc533e < 10) ? 0 : 1;
      _0x439043.caught = (() => {
        let _0x5410b6 = 0;
        if (_0x201aa6()) {
          try {
            window.top.location.href;
          } catch (_0xa5a29a) {
            _0x5410b6 = 1;
          }
        }
        return _0x5410b6;
      })();
      _0x439043.isScrollable = ((_0x300612, _0x47d432) => {
        if (_0x300612 > _0x47d432) {
          const _0x4b11cc = 0.05;
          if (_0x300612 - _0x47d432 > Math.ceil(_0x47d432 * _0x4b11cc)) {
            return 1;
          } else {
            return 0;
          }
        }
        return 0;
      })(_0x439043.pHeight, _0x439043.vHeight);
      if (_0x3ce4bd) {
        _0x439043.bsd = _0x3ce4bd;
      }
    }
    async function _0x5ee5a0() {
      if (_0x16195a.gbts) {
        try {
          const _0x3c78fe = await _0x16195a.gbts();
          if (_0x3c78fe) {
            _0x3ce4bd = btoa(JSON.stringify(_0x3c78fe));
          }
        } catch (_0x4c77c7) {
          _0x189f4.debug(_0x4c77c7);
        }
      }
      _0x1e191e();
    }
    const _0x22c05b = () => {
      if (!_0x161705) {
        _0x1e191e();
        _0x439043.lastevent = 1;
        _0x439043.sentTimestamp = Date.now();
        if (_0x189f4.isDebugEnabled) {
          _0x189f4.debug("send payload (beforeunload):", JSON.stringify(_0x439043));
        }
        _0x12fca0(_0x47bd72(), JSON.stringify(_0x439043));
      }
    };
    function _0x1e8b49() {
      _0x189f4.debug("Touch move detected.");
      _0x439043.touchMove++;
    }
    function _0x394e21() {
      if (_0x439043.isMouseMoved !== 1) {
        _0x189f4.debug("Mouse move tracked");
        _0x439043.isMouseMoved = 1;
      }
    }
    function _0xaf6565() {
      _0x189f4.debug("Touch end detected.");
      _0x439043.touchEnd++;
      _0x259d94();
    }
    function _0x259d94() {
      _0x189f4.debug("checkScrolling()");
      if (_0x439043.pHeight <= _0x439043.vHeight) {
        _0x439043.pagePercentageSeen = 100;
        _0x439043.belowTheFoldSeen = 100;
        return;
      }
      var _0x4a9bbf = Math.ceil(window.scrollTop || document.body.scrollTop);
      var _0x2deec6 = Math.ceil((_0x4a9bbf + _0x439043.vHeight) / _0x439043.pHeight * 100);
      if (_0x2deec6 > 100) {
        _0x2deec6 = 100;
      }
      if (_0x2deec6 != _0x439043.pagePercentageSeen) {
        _0x189f4.debug("Scroll event detected.");
        _0x439043.isScrolled = 1;
      }
      if (_0x2deec6 > _0x439043.pagePercentageSeen) {
        _0x189f4.debug("Page percentage seen updated.");
        _0x439043.pagePercentageSeen = _0x2deec6;
      }
      var _0x1d9eeb = Math.ceil(_0x4a9bbf / (_0x439043.pHeight - _0x439043.vHeight) * 100);
      if (_0x1d9eeb > 100) {
        _0x1d9eeb = 100;
      }
      if (_0x1d9eeb > _0x439043.belowTheFoldSeen) {
        _0x189f4.debug("Bellow the fold percentage seen updated.");
        _0x439043.belowTheFoldSeen = _0x1d9eeb;
      }
    }
    function _0x2c3e38() {
      _0x439043.ippMissclicks++;
    }
    function _0x1f8647(_0x34c4b9) {
      _0x189f4.debug("Click tracked");
      _0x439043.totalClicks++;
      var _0x4dd1ef = _0x34c4b9.target;
      var _0x3c8310 = null;
      do {
        if (_0x3c8310 === null || _0x3c8310 === "") {
          _0x3c8310 = _0x1fd50e(_0x4dd1ef);
        }
        _0x4dd1ef = _0x4dd1ef.parentElement;
      } while (_0x4dd1ef && _0x4dd1ef.nodeName.toLowerCase() !== "body" && _0x4dd1ef.nodeName.toLowerCase() !== "document");
      if (_0x3c8310 === null) {
        _0x3c8310 = "idle";
      }
      _0x439043.clicksByType[_0x3c8310]++;
    }
    function _0x1fd50e(_0x1e161e) {
      var _0x459c35 = null;
      if (["a", "video", "button", "input", "textarea", "img", "select"].indexOf(_0x1e161e.nodeName.toLowerCase()) !== -1) {
        if ((_0x459c35 = _0x1e161e.nodeName.toLowerCase()) === "a") {
          _0x459c35 = "link";
        } else if (_0x459c35 === "textarea" || _0x459c35 === "select") {
          _0x459c35 = "input";
        }
      }
      return _0x459c35;
    }
    function _0x35d3f8() {
      _0x189f4.debug("Impression tracked");
      _0x439043.eventImps++;
    }
    function _0x4290e5() {
      _0x189f4.debug("Retry tracked!");
      _0x439043.retryCounts++;
    }
    function _0x47bd72() {
      var _0xbd6a65 = "https://usrpubtrk.com/ut/hb.php?cb=" + Math.random();
      _0xbd6a65 += "&v=1";
      _0x189f4.debug("Target Url: " + _0xbd6a65.toString());
      return _0xbd6a65;
    }
    function _0x12fca0(_0x19ac61, _0x448486) {
      let _0x1af5f6 = new Blob([_0x448486], {
        type: "text/plain; charset=UTF-8"
      });
      navigator.sendBeacon(_0x19ac61, _0x1af5f6);
    }
    async function _0x3d17b0() {
      if (!_0x161705) {
        _0x161705 = true;
        await _0x5ee5a0();
        if (_0x189f4.isDebugEnabled) {
          _0x189f4.debug("send payload:", JSON.parse(JSON.stringify(_0x439043)));
        }
        _0x439043.sentTimestamp = Date.now();
        _0x12fca0(_0x47bd72(), JSON.stringify(_0x439043));
        _0x439043.lastevent = 0;
        _0x161705 = false;
      }
    }
    function _0xdec2e8() {
      const _0xff9fb1 = {
        utsid: _0x84d7cc
      };
      const _0x9cbb92 = {
        issued: "UT",
        data: _0xff9fb1
      };
      const _0x16c69b = {
        detail: _0x9cbb92
      };
      var _0x104ca6 = new CustomEvent(_0x4921df, _0x16c69b);
      document.dispatchEvent(_0x104ca6);
    }
    async function _0x15257f() {
      _0x439043.sessionLength = _0x3be74b() - _0x2cbf3c;
      if (_0x439043.sessionLength >= 7200) {
        _0x189f4.debug("Session limit reached! Send last payload and tear down");
        await _0x3d17b0();
        clearInterval(_0x5dbddf);
        _0x189f4.debug("detaching behavior listeners");
        document.removeEventListener("click", _0x1f8647, false);
        document.removeEventListener("mousemove", _0x394e21, false);
        document.removeEventListener("scroll", _0x259d94, false);
        document.removeEventListener("in-page-missclick", _0x2c3e38, false);
        document.removeEventListener("impression-event", _0x35d3f8, false);
        document.removeEventListener("impression-retry-event", _0x4290e5, false);
        document.removeEventListener("touchend", _0xaf6565, false);
        document.removeEventListener("touchmove", _0x1e8b49, false);
        document.removeEventListener("touchcancel", _0x259d94, false);
        window.removeEventListener("beforeunload", _0x22c05b);
        return;
      }
      if (_0x46c55c === 0 || _0x46c55c === 1 || _0x46c55c === 5 || _0x46c55c === 10 || _0x46c55c % 30 == 0) {
        await _0x3d17b0();
      }
      _0x46c55c++;
    }
    (async function _0x5a280a() {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        _0x439043.clientHints = await _0x5c8388(_0x189f4, true);
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
          document.addEventListener("touchend", _0xaf6565, false);
          document.addEventListener("touchmove", _0x1e8b49, false);
          document.addEventListener("touchcancel", _0x259d94, false);
        } else {
          document.addEventListener("mousemove", _0x394e21, false);
          document.addEventListener("scroll", _0x259d94, false);
        }
        document.addEventListener("click", _0x1f8647, false);
        document.addEventListener("impression-event", _0x35d3f8, false);
        document.addEventListener("impression-retry-event", _0x4290e5, false);
        document.addEventListener("in-page-missclick", _0x2c3e38, false);
        await _0x5ee5a0();
        _0x259d94();
        if (_0x46c55c === 0) {
          await _0x15257f();
        }
        _0x5dbddf = setInterval(_0x15257f, 60000);
        window[_0x4921df] = _0x84d7cc;
        _0xdec2e8();
        setTimeout(_0xdec2e8, 20000);
        window.addEventListener("beforeunload", _0x22c05b);
        return;
      }
      setTimeout(_0x5a280a, 100);
    })();
  };
  const _0x42ee86 = "sandboxedDetector";
  class _0x3327af {
    #i;
    #ne;
    #re;
    #oe = false;
    #se = false;
    #ae = false;
    constructor(_0x268435, _0x346937, _0x58f0b1) {
      this.#i = _0x268435;
      this.#ne = _0x346937;
      this.#re = _0x58f0b1;
    }
    isSandboxed() {
      return this.#se;
    }
    load() {
      if (this.#oe) {
        this.#i.debug("already checked");
        return;
      }
      this.#oe = true;
      this.#i.debug("load sandbox detector");
      if (!_0x201aa6()) {
        this.#i.debug("not in iframe. exit");
        return;
      }
      this.#i.debug("iframe detected");
      const _0x3f66f5 = this.#re.getState();
      if (_0x3f66f5 && _0x3f66f5.expiresAt > Date.now()) {
        this.#i.debug("previous state present. Expires at:", new Date(_0x3f66f5.expiresAt));
        if (_0x3f66f5.isSandboxed) {
          this.#i.debug("sandboxed recently! show overlay");
          this.#se = true;
          return;
        } else {
          this.#i.debug("not sandboxed recently. dont check further");
          return;
        }
      }
      this.#i.debug("attach detector listener to events");
      const _0x40980b = {
        zoneId: _0x42ee86,
        callback: this.#de.bind(this)
      };
      if (!_0xa0b21) {
        this.#ne.subscribe("mousedown", _0x40980b, true);
      }
      this.#ne.subscribe("click", _0x40980b, true);
    }
    #de(_0x3f04cb) {
      if (!_0x3f04cb.isTrusted) {
        this.#i.debug(_0x3f04cb.type + " on " + _0x3f04cb.target.tagName + ". Detector skipped: event is not trusted", _0x3f04cb);
        return;
      }
      if (this.#ne.isShowingPop) {
        this.#i.debug("detector skipped: pop being currently shown");
        return;
      }
      this.#ne.isShowingPop = true;
      this.#i.debug("detector taking action. prevent other pops from showing");
      let _0xa17d06 = null;
      try {
        _0xa17d06 = window.open("about:blank", "_blank");
      } catch (_0x1377b2) {
        this.#i.error("detector error", _0x1377b2);
      }
      if (_0xa17d06) {
        _0xa17d06.close();
      }
      if (_0xa17d06 === null) {
        this.#i.debug("sandbox detected");
        this.#se = true;
      }
      this.#re.setState({
        expiresAt: Date.now() + 3600000,
        isSandboxed: this.#se
      });
      if (!_0xa0b21) {
        this.#ne.unsubscribe("mousedown", _0x42ee86, true);
      }
      this.#ne.unsubscribe("click", _0x42ee86, true);
      setTimeout(() => {
        this.#ne.isShowingPop = false;
      }, 300);
    }
    showSandboxWarningOverlay() {
      if (!this.#ae) {
        this.#ae = true;
        this.#i.debug("show sandbox warning overlay");
        this.#le();
      }
    }
    #ce() {
      const _0x5b673b = document.createElement("div");
      _0x5b673b.id = "sbxwo";
      Object.assign(_0x5b673b.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        textAlign: "center"
      });
      const _0x133c39 = document.createElement("div");
      _0x133c39.innerHTML = "\n    <h2>Ad Functionality Blocked</h2>\n    <p>\n      It looks like your page is running in a sandbox that blocks certain functionality.\n      This setting is preventing our ads from working properly.\n      Please disable the sandbox restrictions or adjust your settings.\n    </p>\n  ";
      _0x133c39.style.maxWidth = "600px";
      const _0x577553 = document.createElement("button");
      _0x577553.textContent = "Dismiss";
      Object.assign(_0x577553.style, {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer"
      });
      _0x577553.addEventListener("click", () => {
        _0x5b673b.remove();
      });
      _0x133c39.appendChild(_0x577553);
      _0x5b673b.appendChild(_0x133c39);
      document.body.appendChild(_0x5b673b);
    }
    #le() {
      const _0x1c80f3 = document.createElement("div");
      _0x1c80f3.id = "sbxwo";
      Object.assign(_0x1c80f3.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        color: "black",
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "sans-serif"
      });
      const _0x2c6b03 = document.createElement("div");
      Object.assign(_0x2c6b03.style, {
        backgroundColor: "white",
        padding: "30px 40px",
        borderRadius: "16px",
        maxWidth: "90%",
        boxSizing: "border-box"
      });
      _0x2c6b03.innerHTML = "\n    <h2 style=\"margin: 0 0 20px; font-size: 24px;\">Notice for webmaster</h2>\n    <p style=\"font-size: 18px; margin: 0;\">\n      To continue playing please remove Sandbox from iframe tab or add \"allow-popups\" to Sandbox\n    </p>\n  ";
      _0x1c80f3.appendChild(_0x2c6b03);
      document.body.appendChild(_0x1c80f3);
    }
  }
  const _0x385d07 = (_0x5c524c, _0x4e5467) => {
    const _0x5a8d58 = _0x4e5467.x - _0x5c524c.x;
    const _0x198d9f = _0x4e5467.y - _0x5c524c.y;
    return Math.sqrt(_0x5a8d58 * _0x5a8d58 + _0x198d9f * _0x198d9f);
  };
  const _0x49d09d = _0x1f87a7 => {
    if (_0x1f87a7.length < 3) {
      return null;
    }
    let _0x65f561 = 0;
    const _0x210d9d = _0x1f87a7.length - 3;
    for (let _0x45e24a = 0; _0x45e24a < _0x210d9d; _0x45e24a++) {
      const _0x3b983e = _0x1f87a7[_0x45e24a];
      const _0x4ec5bb = _0x1f87a7[_0x45e24a + 1];
      const _0x194b15 = _0x1f87a7[_0x45e24a + 2];
      if (Math.abs((_0x4ec5bb.x - _0x3b983e.x) * (_0x194b15.y - _0x3b983e.y) - (_0x4ec5bb.y - _0x3b983e.y) * (_0x194b15.x - _0x3b983e.x)) <= 1) {
        _0x65f561++;
      }
    }
    return _0x65f561 / _0x210d9d >= 0.7;
  };
  const _0x59c08c = _0x4d3e92 => {
    if (_0x4d3e92.length < 2) {
      return null;
    }
    let _0x4bc1a9 = 0;
    let _0x55e3ef = 0;
    for (let _0x4a16d0 = 1; _0x4a16d0 < _0x4d3e92.length; _0x4a16d0++) {
      const _0x152355 = _0x4d3e92[_0x4a16d0 - 1];
      const _0x324b67 = _0x4d3e92[_0x4a16d0];
      _0x55e3ef++;
      const _0x453da3 = Math.max(1, _0x324b67.timeStamp - _0x152355.timeStamp);
      const _0x31686d = _0x385d07(_0x152355, _0x324b67);
      if (_0x31686d >= 250 && _0x453da3 <= 25 || _0x31686d / _0x453da3 >= 8) {
        _0x4bc1a9++;
      }
    }
    return (_0x55e3ef > 0 ? _0x4bc1a9 / _0x55e3ef : 0) >= 0.25;
  };
  function _0x319a60(_0xc5edc6, _0x1b4097 = function (_0x18d6e0) {
    return _0x18d6e0.reduce((_0x2036de, _0x524dda) => _0x2036de + _0x524dda, 0) / _0x18d6e0.length;
  }(_0xc5edc6)) {
    if (_0x1b4097 === 0) {
      return Infinity;
    } else {
      return function (_0x1794aa, _0x11b7b0) {
        if (_0x1794aa.length < 2) {
          return 0;
        }
        const _0x4961e3 = _0x1794aa.reduce((_0x13bdf9, _0x35905f) => _0x13bdf9 + (_0x35905f - _0x11b7b0) ** 2, 0) / _0x1794aa.length;
        return Math.sqrt(_0x4961e3);
      }(_0xc5edc6, _0x1b4097) / Math.abs(_0x1b4097);
    }
  }
  const _0x2cec43 = _0xf78c6b => {
    const _0x5a26ce = [];
    const _0x41e64c = [];
    const _0x19e4be = [];
    for (let _0x41a627 = 1; _0x41a627 < _0xf78c6b.length; _0x41a627++) {
      const _0x290a82 = _0xf78c6b[_0x41a627 - 1];
      const _0x5197cd = _0xf78c6b[_0x41a627];
      const _0x42f99b = _0x5197cd.timeStamp - _0x290a82.timeStamp;
      const _0x22ce6e = Math.abs(_0x5197cd.scrollY - _0x290a82.scrollY);
      _0x5a26ce.push(_0x42f99b);
      _0x41e64c.push(_0x22ce6e);
      _0x19e4be.push(_0x22ce6e / _0x42f99b);
    }
    const _0x4424d4 = _0x319a60(_0x5a26ce);
    const _0x30e5f4 = _0x319a60(_0x41e64c);
    const _0x3a52fe = _0x319a60(_0x19e4be);
    const _0xebe1e = {
      timeCV: _0x4424d4,
      distanceCV: _0x30e5f4,
      speedCV: _0x3a52fe,
      isBot: _0x4424d4 <= 0.12 || _0x30e5f4 <= 0.18 || _0x3a52fe <= 0.2
    };
    return _0xebe1e;
  };
  let _0x67f8ba;
  const _0x59c0d0 = {
    heartBeatInterval: null,
    currMouseMoveBatch: [],
    mouseMoveBatchIndex: 0,
    lastMouseMoveTime: null,
    mouseMovesAnalysisResults: [],
    numOfCenteredClicks: 0,
    totalClicks: 0,
    lastClickTime: null,
    currScrollBatch: [],
    lastScrollTime: null,
    totalScrolls: 0,
    scrollAnalysisResults: [],
    scrollBatchIndex: 0,
    isScrolling: false
  };
  const _0x48fe78 = _0x5ba03b => {
    if (_0x59c0d0.currMouseMoveBatch.length === 0) {
      return;
    }
    const _0x5527f8 = _0x59c0d0.lastMouseMoveTime && _0x5ba03b - _0x59c0d0.lastMouseMoveTime >= 1000;
    const _0x1e06de = _0x59c0d0.currMouseMoveBatch.length >= 10000;
    if (_0x5527f8 || _0x1e06de) {
      _0x241b90();
    }
  };
  const _0x241b90 = () => {
    if (_0x59c0d0.currMouseMoveBatch.length !== 0) {
      _0x59c0d0.mouseMovesAnalysisResults[_0x59c0d0.mouseMoveBatchIndex] = (_0x4f5c48 => {
        const _0x5e6d66 = _0x4f5c48.length;
        return {
          areMouseMovesMostlyStraightLined: _0x49d09d(_0x4f5c48),
          areMouseMovesQuickAndJumpy: _0x59c08c(_0x4f5c48),
          numOfMouseMoves: _0x5e6d66
        };
      })(_0x59c0d0.currMouseMoveBatch);
      _0x59c0d0.mouseMoveBatchIndex++;
      _0x59c0d0.currMouseMoveBatch = [];
    }
  };
  let _0x53a91f;
  const _0x331e81 = _0x2d66f4 => {
    const _0x41e589 = _0x2d66f4.timeStamp;
    _0x59c0d0.lastScrollTime = _0x41e589;
    if (!_0x59c0d0.isScrolling) {
      _0x59c0d0.isScrolling = true;
      _0x241b90();
    }
    _0x59c0d0.currScrollBatch.push({
      timeStamp: _0x41e589,
      scrollY: window.scrollY
    });
    clearTimeout(_0x53a91f);
    _0x53a91f = setTimeout(() => {
      _0x59c0d0.scrollAnalysisResults[_0x59c0d0.scrollBatchIndex] = (_0x42b208 => {
        const _0x1e1dd3 = _0x42b208.length;
        if (_0x1e1dd3 <= 2) {
          return {
            areShowingConsistentScrollPattern: null,
            numOfScrolls: _0x1e1dd3
          };
        } else {
          return {
            areShowingConsistentScrollPattern: _0x2cec43(_0x42b208),
            numOfScrolls: _0x1e1dd3
          };
        }
      })(_0x59c0d0.currScrollBatch);
      _0x59c0d0.scrollBatchIndex++;
      _0x59c0d0.currScrollBatch = [];
      _0x59c0d0.isScrolling = false;
    }, 150);
  };
  const _0x3928e3 = _0x62824e => {};
  const _0x52ed0d = _0x3b951d => {
    const _0xe1ee51 = _0x3b951d.timeStamp;
    if (!_0x59c0d0.isScrolling && (!_0x3b951d.target || _0x3b951d.target.tagName !== "IFRAME")) {
      _0x48fe78(_0xe1ee51);
      _0x59c0d0.lastMouseMoveTime = _0x3b951d.timeStamp;
      _0x59c0d0.currMouseMoveBatch.push((_0x4de443 => ({
        x: _0x4de443.x,
        y: _0x4de443.y,
        timeStamp: _0x4de443.timeStamp
      }))(_0x3b951d));
    }
  };
  const _0x368c3e = _0x5727bd => {
    _0x241b90();
  };
  const _0x51a0eb = _0x2d9e1f => {};
  const _0x27a2a6 = _0x575237 => {};
  const _0x2abba7 = (_0x1173b0, _0x1cd87e, _0xbc5d12, _0x26d71b, {
    arrayStrict: _0x1ea7b5 = false
  } = {}) => {
    if (_0x3a159f(_0xbc5d12, _0x26d71b)) {
      _0x1173b0.push({
        key: _0x1cd87e,
        main: _0xbc5d12,
        worker: _0x26d71b
      });
    }
  };
  const _0x3a159f = (_0x2d6e13, _0x40894c, _0x81c463) => {
    if (_0x2d6e13 === _0x40894c) {
      return false;
    }
    if (Number.isNaN(_0x2d6e13) && Number.isNaN(_0x40894c)) {
      return false;
    }
    const _0x5f270e = Array.isArray(_0x2d6e13);
    const _0x51a55d = Array.isArray(_0x40894c);
    if (_0x5f270e || _0x51a55d) {
      if (!_0x5f270e || !_0x51a55d) {
        return true;
      }
      if (_0x2d6e13.length !== _0x40894c.length) {
        return true;
      }
      for (let _0x4e1f5f = 0; _0x4e1f5f < _0x2d6e13.length; _0x4e1f5f++) {
        if (_0x2d6e13[_0x4e1f5f] !== _0x40894c[_0x4e1f5f]) {
          return true;
        }
      }
      return false;
    }
    return true;
  };
  async function _0x2d3f4a({
    workerTimeoutMs: _0xe01fdd = 2500
  } = {}) {
    const _0x48ec31 = await (async () => {
      const {
        vendor: _0x168b4e,
        renderer: _0x54d8ae
      } = (() => {
        try {
          const _0x8d7ac3 = document.createElement("canvas");
          const _0x1f1adb = _0x8d7ac3.getContext("webgl") || _0x8d7ac3.getContext("experimental-webgl");
          if (!_0x1f1adb) {
            return {
              vendor: null,
              renderer: null
            };
          }
          const _0x4b94b5 = _0x1f1adb.getExtension("WEBGL_debug_renderer_info");
          return {
            vendor: _0x4b94b5 ? _0x1f1adb.getParameter(_0x4b94b5.UNMASKED_VENDOR_WEBGL) : _0x1f1adb.getParameter(_0x1f1adb.VENDOR),
            renderer: _0x4b94b5 ? _0x1f1adb.getParameter(_0x4b94b5.UNMASKED_RENDERER_WEBGL) : _0x1f1adb.getParameter(_0x1f1adb.RENDERER)
          };
        } catch {
          return {
            vendor: null,
            renderer: null
          };
        }
      })();
      return {
        userAgent: navigator.userAgent,
        languages: (navigator.languages || []).slice(),
        platform: navigator.platform || navigator.userAgentData?.platform || "",
        hardwareConcurrency: navigator.hardwareConcurrency ?? null,
        webGLVendor: _0x168b4e,
        webGLRenderer: _0x54d8ae
      };
    })();
    const _0x345302 = await (async _0x42ce3a => {
      if (typeof Worker == "undefined") {
        return null;
      }
      try {
        const _0x75616 = URL.createObjectURL(new Blob(["\n    self.onmessage = () => {\n      const out = {\n        userAgent: self.navigator.userAgent,\n        languages: Array.isArray(self.navigator.languages) ? Array.from(self.navigator.languages) : [],\n        platform: self.navigator.platform || (self.navigator.userAgentData && self.navigator.userAgentData.platform) || \"\",\n        hardwareConcurrency: (self.navigator.hardwareConcurrency !== undefined) ? self.navigator.hardwareConcurrency : null,\n        webGLVendor: null,\n        webGLRenderer: null\n      };\n      try {\n        if (typeof OffscreenCanvas !== \"undefined\") {\n          const canvas = new OffscreenCanvas(16,16);\n          const gl = canvas.getContext(\"webgl\") || canvas.getContext(\"experimental-webgl\");\n          if (gl) {\n            const dbg = gl.getExtension(\"WEBGL_debug_renderer_info\");\n            out.webGLVendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);\n            out.webGLRenderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);\n          }\n        }\n      } catch (e) {}\n      self.postMessage(out);\n    };\n  "], {
          type: "application/javascript"
        }));
        const _0xfc2869 = new Worker(_0x75616);
        URL.revokeObjectURL(_0x75616);
        return await new Promise(_0x57387e => {
          const _0x1480a4 = setTimeout(() => {
            try {
              _0xfc2869.terminate();
            } catch {}
            _0x57387e(null);
          }, _0x42ce3a);
          _0xfc2869.onmessage = _0x2015e5 => {
            clearTimeout(_0x1480a4);
            try {
              _0xfc2869.terminate();
            } catch {}
            _0x57387e(_0x2015e5.data || null);
          };
          _0xfc2869.onerror = () => {
            clearTimeout(_0x1480a4);
            try {
              _0xfc2869.terminate();
            } catch {}
            _0x57387e(null);
          };
          _0xfc2869.postMessage("go");
        });
      } catch {
        return null;
      }
    })(_0xe01fdd);
    const _0x274eff = [];
    _0x2abba7(_0x274eff, "userAgent", _0x48ec31.userAgent, _0x345302?.userAgent);
    _0x2abba7(_0x274eff, "languages", _0x48ec31.languages, _0x345302?.languages, {
      arrayStrict: true
    });
    _0x2abba7(_0x274eff, "platform", _0x48ec31.platform, _0x345302?.platform);
    _0x2abba7(_0x274eff, "hardwareConcurrency", _0x48ec31.hardwareConcurrency, _0x345302?.hardwareConcurrency);
    _0x2abba7(_0x274eff, "webGLVendor", _0x48ec31.webGLVendor, _0x345302?.webGLVendor);
    _0x2abba7(_0x274eff, "webGLRenderer", _0x48ec31.webGLRenderer, _0x345302?.webGLRenderer);
    return {
      hasInconsistentWorkerValues: Boolean(_0x345302) && _0x274eff.length > 0,
      details: {
        main: _0x48ec31,
        worker: _0x345302,
        diffs: _0x274eff
      }
    };
  }
  let _0x3c25fb = null;
  const _0x5e1f2f = {
    name: "notifications"
  };
  const _0x261994 = [{
    key: "susUserInput",
    description: "Behavior appears bot-like",
    certainty: 0.3,
    collect: () => {
      const {
        mouseMoveScore: _0x4a06cf,
        scrollSuspiciousScore: _0x16d72
      } = (() => {
        const _0x1a4bff = function () {
          let _0x46bf34 = 0;
          let _0x53546a = 0;
          for (let _0x44b677 = 0; _0x44b677 < _0x59c0d0.mouseMovesAnalysisResults.length; _0x44b677++) {
            const _0x2c8ed4 = _0x59c0d0.mouseMovesAnalysisResults[_0x44b677];
            if (!_0x2c8ed4) {
              continue;
            }
            const _0x5d2946 = (_0x2c8ed4.areMouseMovesMostlyStraightLined ? 1 : 0) * 0.5 + (_0x2c8ed4.areMouseMovesQuickAndJumpy ? 1 : 0) * 0.5;
            const _0x52ed1c = _0x2c8ed4.numOfMouseMoves;
            _0x46bf34 += _0x5d2946 * _0x52ed1c;
            _0x53546a += _0x52ed1c;
          }
          if (_0x53546a > 0) {
            return _0x46bf34 / _0x53546a;
          } else {
            return 0;
          }
        }();
        const _0x1bd24d = function () {
          let _0x5295e8 = 0;
          let _0x443396 = 0;
          let _0x530623 = 0;
          let _0x50ca6d = 0;
          let _0x1c6a71 = 0;
          let _0x40d36a = 0;
          for (let _0x308310 = 0; _0x308310 < _0x59c0d0.scrollAnalysisResults.length; _0x308310++) {
            const _0x111997 = _0x59c0d0.scrollAnalysisResults[_0x308310];
            if (!_0x111997) {
              continue;
            }
            const {
              areShowingConsistentScrollPattern: _0x107fcb,
              numOfScrolls: _0x2c666b
            } = _0x111997;
            if (!_0x107fcb || !_0x2c666b) {
              continue;
            }
            const {
              timeCV: _0x563c23,
              distanceCV: _0x4f768f,
              speedCV: _0x5a029d,
              isBot: _0x59238d
            } = _0x107fcb;
            _0x5295e8 += _0x2c666b;
            if (_0x59238d) {
              _0x443396 += _0x2c666b;
            }
            if (Number.isFinite(_0x563c23)) {
              _0x530623 += _0x563c23;
              _0x40d36a++;
            }
            if (Number.isFinite(_0x4f768f)) {
              _0x50ca6d += _0x4f768f;
            }
            if (Number.isFinite(_0x5a029d)) {
              _0x1c6a71 += _0x5a029d;
            }
          }
          const _0x2bbcec = {
            numOfScrolls: _0x5295e8,
            avgTimeCV: _0x40d36a > 0 ? _0x530623 / _0x40d36a : null,
            avgDistanceCV: _0x40d36a > 0 ? _0x50ca6d / _0x40d36a : null,
            avgSpeedCV: _0x40d36a > 0 ? _0x1c6a71 / _0x40d36a : null,
            scrollSuspiciousScore: _0x5295e8 > 0 ? _0x443396 / _0x5295e8 : 0
          };
          return _0x2bbcec;
        }();
        return {
          mouseMoveScore: Number(_0x1a4bff.toFixed(2)),
          scrollSuspiciousScore: Number(_0x1bd24d.scrollSuspiciousScore.toFixed(2))
        };
      })();
      return _0x4a06cf > 0.5 && _0x16d72 > 0.5;
    }
  }];
  const _0xafaf3b = [...[{
    key: "doesUAContainHeadlessKeyword",
    description: "UA contains 'Headless'",
    certainty: 0.99,
    collect: () => /headless/i.test(navigator.userAgent)
  }, {
    key: "isWebDriverPresent",
    description: "WebDriver environment detected",
    certainty: 0.9,
    collect: () => !!navigator.webdriver
  }, {
    key: "isCDPDetected",
    description: "Chrome DevTools Protocol hook detected",
    certainty: 0.9,
    collect: () => (() => {
      if (_0x3c25fb !== null) {
        return _0x3c25fb;
      }
      let _0x125a5f = false;
      _0x3c25fb = _0x125a5f;
      let _0x4c0452 = new Error();
      const _0x6671fd = {
        get: function () {
          _0x125a5f = true;
        }
      };
      Object.defineProperty(_0x4c0452, "stack", _0x6671fd);
      console.log(_0x4c0452);
      _0x3c25fb = _0x125a5f;
      return _0x125a5f;
    })()
  }, {
    key: "automatedBrowserGlobals",
    description: "Known automation globals found",
    certainty: 0.8,
    collect: () => {
      const _0x70841 = (() => {
        const _0x552582 = ["puppeteer___ariaQuerySelector", "puppeteer___ariaQuerySelectorAll"];
        const _0xdf1df7 = [];
        for (const _0x1889f5 of _0x552582) {
          if (Object.prototype.hasOwnProperty.call(window, _0x1889f5) || _0x1889f5 in window) {
            _0xdf1df7.push(_0x1889f5);
          }
        }
        if (_0xdf1df7.length) {
          const _0x36ccf5 = Object.fromEntries(_0xdf1df7.map(_0x4915e9 => [_0x4915e9, Object.getOwnPropertyDescriptor(window, _0x4915e9)]));
          const _0x22246c = {
            detected: true,
            found: _0xdf1df7,
            descriptors: _0x36ccf5
          };
          return _0x22246c;
        }
        return {
          detected: false
        };
      })();
      return !!_0x70841?.detected;
    }
  }, {
    key: "isWindowCDC",
    description: "window.cdc_* globals present",
    certainty: 0.9,
    collect: () => !!(() => {
      try {
        const _0x114723 = [];
        for (const _0x2c05d4 in window) {
          if (Object.prototype.hasOwnProperty.call(window, _0x2c05d4) && typeof _0x2c05d4 == "string" && /cdc_[a-z0-9]/i.test(_0x2c05d4)) {
            _0x114723.push(_0x2c05d4);
          }
        }
        if (_0x114723.length) {
          return _0x114723;
        }
      } catch (_0xe96599) {}
      return false;
    })()
  }, {
    key: "isFirefoxMismatch",
    description: "Firefox UA but platform/features mismatch",
    certainty: 0.6,
    collect: () => (() => {
      const _0x41a847 = !!navigator.oscpu;
      const _0x93b770 = /firefox/i.test(navigator.userAgent);
      const _0x476a5e = navigator.vendor === "";
      return _0x41a847 !== _0x93b770 || _0x41a847 !== _0x476a5e;
    })()
  }, {
    key: "inconsistencies",
    description: "Main vs worker environment inconsistencies",
    certainty: 0.5,
    collect: async () => (await _0x2d3f4a()).hasInconsistentWorkerValues
  }, {
    key: "isChromeForTesting",
    description: "Chrome for Testing build detected",
    certainty: 0.5,
    collect: async () => !!(await (async () => {
      const _0x3d0703 = new Set(["Microsoft Edge", "Opera", "Vivaldi", "Samsung Internet", "CocCoc", "Whale"]);
      if (_0xfe7189 || _0x25671f || _0x327da3 || _0x2c1aba || _0x4de4a8) {
        return false;
      }
      try {
        const _0xe6a9fe = navigator.userAgentData;
        if (!_0xe6a9fe) {
          return false;
        }
        const {
          fullVersionList: _0xa4d9a5 = []
        } = await _0xe6a9fe.getHighEntropyValues(["fullVersionList"]);
        const _0x59b849 = _0xa4d9a5.map(_0x375ef6 => _0x375ef6.brand);
        if (_0x59b849.length === 0) {
          return false;
        }
        if (_0x59b849.some(_0x534ef5 => _0x3d0703.has(_0x534ef5))) {
          return false;
        }
        if (_0x59b849.includes("Chromium") && !_0x59b849.includes("Google Chrome")) {
          return true;
        }
      } catch (_0x5f3847) {}
      return false;
    })())
  }, {
    key: "missingWebRTC",
    description: "Missing WebRTC support",
    certainty: 0.6,
    collect: () => !window.RTCPeerConnection
  }, {
    key: "detectCSSAnomalies",
    description: "CSS-based anomalies",
    certainty: 0.6,
    collect: () => (() => {
      try {
        const _0x3e6931 = document.createElement("div");
        _0x3e6931.style.cssText = "display: grid; aspect-ratio: 1/1;";
        document.body.appendChild(_0x3e6931);
        const _0x4b469f = getComputedStyle(_0x3e6931);
        const _0x5d2c51 = _0x4b469f.display === "grid";
        const _0x339192 = _0x4b469f.aspectRatio;
        document.body.removeChild(_0x3e6931);
        if (!_0x5d2c51 || !_0x339192) {
          return {
            detected: true,
            detection: "css.anomaly",
            score: 0.5,
            data: {
              display: _0x4b469f.display,
              aspectRatio: _0x339192
            }
          };
        }
      } catch (_0x421907) {
        const _0x11a728 = {
          message: _0x421907.message
        };
        const _0x46f96f = {
          detected: true,
          detection: "css.error",
          score: 0.5,
          data: _0x11a728
        };
        return _0x46f96f;
      }
      return false;
    })()
  }, {
    key: "isHeadlessPermissionMatched",
    description: "Permission state inconsistent with real browser",
    certainty: 0.6,
    collect: async () => !!(await (async () => navigator.permissions.query(_0x5e1f2f).then(_0x3d139c => Notification.permission === "denied" && _0x3d139c.state === "prompt").catch(() => false))())
  }].map(_0x467442 => {
    _0x467442.collectOnce = true;
    return _0x467442;
  }), ..._0x261994];
  _0xafaf3b.reduce((_0x295706, _0x2e699d) => {
    _0x295706[_0x2e699d.key] = _0x2e699d;
    return _0x295706;
  }, {});
  const _0x169851 = {};
  const _0x511680 = {
    passive: true
  };
  const _0x4c7fba = {
    passive: true
  };
  const _0x166491 = {
    passive: true
  };
  const _0x48b7c0 = {
    passive: true
  };
  const _0x1a75ea = {
    passive: true
  };
  const _0x3c410c = {
    passive: true
  };
  var _0xdddd03 = () => {
    document.addEventListener("keydown", _0x3928e3, _0x511680);
    document.addEventListener("scroll", _0x331e81, _0x4c7fba);
    if (_0xa0b21) {
      window.addEventListener("touchstart", _0x27a2a6, _0x166491);
    } else {
      document.addEventListener("mousemove", _0x52ed0d, _0x48b7c0);
      document.addEventListener("mouseleave", _0x368c3e, _0x1a75ea);
      window.addEventListener("wheel", _0x51a0eb, _0x3c410c);
      _0x67f8ba = setInterval(() => {
        const _0x3a86a1 = performance.now();
        _0x48fe78(_0x3a86a1);
      }, 1000);
    }
    return;
  };
  var _0xc694c2 = async () => {
    const _0x47b3ea = {};
    const _0x504081 = {};
    const _0x5870ae = [];
    for (const _0x9b5e27 of _0xafaf3b) {
      const {
        key: _0x2a9349,
        collect: _0x150930,
        certainty: _0x3935f3
      } = _0x9b5e27;
      let _0x3815bb;
      if (_0x9b5e27.collectOnce) {
        if (_0x2a9349 in _0x169851) {
          _0x3815bb = _0x169851[_0x2a9349];
        } else {
          _0x3815bb = await _0x150930();
          _0x169851[_0x2a9349] = _0x3815bb;
        }
      } else {
        _0x3815bb = await _0x150930();
      }
      _0x47b3ea[_0x2a9349] = _0x3815bb;
      let _0x363228 = 0;
      if (typeof _0x3815bb == "boolean") {
        _0x363228 = _0x3815bb ? _0x3935f3 : 0;
      } else if (typeof _0x3815bb == "number") {
        _0x363228 = _0x3815bb * _0x3935f3;
      }
      _0x504081[_0x2a9349] = _0x363228;
      if (_0x363228 > 0) {
        _0x5870ae.push(_0x363228);
      }
    }
    let _0x25fa9b = _0x5870ae.length > 0 ? (_0x435379 => 1 - _0x435379.reduce((_0x5eab8f, _0x32446e) => _0x5eab8f * (1 - _0x32446e), 1))(_0x5870ae) : 0;
    _0x25fa9b = Number(_0x25fa9b.toFixed(2));
    if (_0x25fa9b === 0) {
      _0x25fa9b = 0.01;
    }
    return {
      probability: _0x25fa9b,
      raw: _0x47b3ea,
      perSignal: _0x504081
    };
  };
  const _0x58a04e = "x4G9Tq2Kw6R7v1Dy3P0B5N8Lc9M2zF";
  const _0x29f503 = "ZpQw9XkLmN8c3vR3";
  const _0x74c8c2 = "adblock-settings";
  const _0x5d9652 = (() => {
    let _0x23b7b8 = document.currentScript;
    _0x23b7b8 ||= document.getElementById("aclib");
    _0x23b7b8 ||= document.getElementById("adcash-lib");
    return _0x23b7b8;
  })();
  let _0x728d93 = null;
  const _0x589e3f = {
    pop: false,
    autoTag: false,
    inPagePush: false,
    interstitial: false,
    videoSlider: false
  };
  class _0x24398c {
    #ge;
    #he = _0x589e3f;
    #ue;
    #m;
    #pe = new Set();
    #be = new Set();
    #i;
    #me = false;
    #we = false;
    #fe;
    #b = "adexchangerapid.com";
    #y = "81.5";
    #s = null;
    #ve;
    #ye = false;
    isShowingPop = false;
    #x;
    #Se = false;
    #Ae = {};
    #ke;
    #xe = null;
    constructor(_0x91765e = {}) {
      if (_0x728d93) {
        return _0x728d93;
      }
      _0x728d93 = this;
      let _0x2b550f = "aclib";
      if (_0x91765e.classes) {
        this.#Ae = _0x91765e.classes;
        _0x2b550f = "aclib_adbl";
      }
      this.#i = new _0x4525bc(_0x2b550f);
      this.#fe = (_0x25c231 => {
        const _0x190d63 = {
          mousedown: [],
          click: [],
          touchstart: []
        };
        const _0x5bd055 = {
          mousedown: [],
          scroll: [],
          click: [],
          touchstart: []
        };
        const _0x4457d6 = _0x3400b5 => {
          const _0x5961df = _0x3400b5.currentTarget === window ? "win" : "doc";
          _0x25c231.debug(_0x5961df + " mousedown with capture: in");
          _0x190d63.mousedown.forEach(_0x4a35ea => {
            _0x25c231.debug(_0x5961df + " mousedown with capture: calling observer");
            _0x4a35ea.callback(_0x3400b5);
          });
        };
        const _0x1df550 = _0x5f1a98 => {
          const _0x530a36 = _0x5f1a98.currentTarget === window ? "win" : "doc";
          _0x25c231.debug(_0x530a36 + " mousedown: in");
          _0x5bd055.mousedown.forEach(_0x11b5c8 => {
            _0x25c231.debug(_0x530a36 + " mousedown: calling observer");
            _0x11b5c8.callback(_0x5f1a98);
          });
        };
        const _0x1170cf = _0x444a65 => {
          const _0x55a92f = _0x444a65.currentTarget === window ? "win" : "doc";
          _0x25c231.debug(_0x55a92f + " click with capture: in");
          _0x190d63.click.forEach(_0x35c4bb => {
            _0x25c231.debug(_0x55a92f + " click with capture: calling observer");
            _0x35c4bb.callback(_0x444a65);
          });
        };
        const _0x32dbe3 = _0x3a15fe => {
          const _0x1d0638 = _0x3a15fe.currentTarget === window ? "win" : "doc";
          _0x25c231.debug(_0x1d0638 + " click: in");
          _0x5bd055.click.forEach(_0x28b1ec => {
            _0x25c231.debug(_0x1d0638 + " click: calling observer");
            _0x28b1ec.callback(_0x3a15fe);
          });
        };
        const _0x395617 = _0xfbc4c3 => {
          _0x5bd055.scroll.forEach(_0x181e97 => {
            _0x181e97.callback(_0xfbc4c3);
          });
        };
        return {
          subscribe: (_0x45632e, _0x3aaf5e, _0x2a9c58) => {
            if (!_0x190d63[_0x45632e] || !_0x5bd055[_0x45632e]) {
              throw new Error(_0x45632e + " is not observable!");
            }
            if (_0x2a9c58) {
              _0x190d63[_0x45632e].push(_0x3aaf5e);
            } else {
              _0x5bd055[_0x45632e].push(_0x3aaf5e);
            }
          },
          unsubscribe: (_0x21ed6c, _0x1cff1e, _0x2d16a1) => {
            if (!_0x190d63[_0x21ed6c] || !_0x5bd055[_0x21ed6c]) {
              throw new Error(_0x21ed6c + " is not observable!");
            }
            if (_0x2d16a1) {
              for (let _0xb179b5 = 0; _0xb179b5 < _0x190d63[_0x21ed6c].length; _0xb179b5++) {
                if (_0x190d63[_0x21ed6c][_0xb179b5].zoneId === _0x1cff1e) {
                  _0x190d63[_0x21ed6c].splice(_0xb179b5, 1);
                }
              }
            } else {
              for (let _0x36fe9e = 0; _0x36fe9e < _0x5bd055[_0x21ed6c].length; _0x36fe9e++) {
                if (_0x5bd055[_0x21ed6c][_0x36fe9e].zoneId === _0x1cff1e) {
                  _0x5bd055[_0x21ed6c].splice(_0x36fe9e, 1);
                }
              }
            }
          },
          attachListeners: () => {
            window.addEventListener("mousedown", _0x4457d6, true);
            window.addEventListener("mousedown", _0x1df550, false);
            window.addEventListener("click", _0x1170cf, true);
            window.addEventListener("click", _0x32dbe3, false);
            document.addEventListener("mousedown", _0x4457d6, true);
            document.addEventListener("mousedown", _0x1df550);
            document.addEventListener("click", _0x1170cf, true);
            document.addEventListener("click", _0x32dbe3);
            window.addEventListener("scroll", _0x395617);
          },
          detachListeners: () => {
            window.removeEventListener("mousedown", _0x4457d6, true);
            window.removeEventListener("mousedown", _0x1df550, false);
            window.removeEventListener("click", _0x1170cf, true);
            window.removeEventListener("click", _0x32dbe3, false);
            document.removeEventListener("mousedown", _0x4457d6, true);
            document.removeEventListener("mousedown", _0x1df550);
            document.removeEventListener("click", _0x1170cf, true);
            document.removeEventListener("click", _0x32dbe3);
            window.removeEventListener("scroll", _0x395617);
          }
        };
      })(this.#i);
      this.#fe.attachListeners();
      this.getClientHints();
      this.#ve = _0x32032e();
      this.#x = _0x426012();
      this.#ke = new _0x3327af(new _0x4525bc("sd"), _0x728d93, new _0x2d32ee("sndbxchckiborjforqp2"));
      this.#i.debug("init adcash lib. listeners attached. ready to publish");
      this.#i.debug("is mobile device:", _0xa0b21);
      if (window[_0x58a04e]) {
        this.#s = JSON.parse(JSON.stringify(window[_0x58a04e]));
        this.#ge = this.#s.cdnDomain;
        delete window[_0x58a04e];
      }
      if (window[_0x29f503]) {
        this.#s = JSON.parse(((_0x266cf2, _0x5553b8 = "xR9tB2pL6q7MwVe") => [...atob(_0x266cf2)].map((_0xe3c88d, _0x3b1c2f) => String.fromCharCode(_0xe3c88d.charCodeAt(0) ^ _0x5553b8.charCodeAt(_0x3b1c2f % _0x5553b8.length))).join(""))(window[_0x29f503]));
        this.#ge = this.#s.cdnDomain;
        delete window[_0x29f503];
      }
      if (!this.#s) {
        this.#ge = new URL(_0x5d9652.src).host;
        if (_0x5d9652.hasAttribute(_0x74c8c2)) {
          this.#s = JSON.parse(_0x5d9652.getAttribute(_0x74c8c2));
          _0x5d9652.removeAttribute(_0x74c8c2);
        }
      }
      if (this.#s) {
        this.#i.debug("adblock settings:", this.#s);
      }
      if (_0x5d9652.getAttribute("data-preview")) {
        this.#i.debug("preview mode");
        this.#Se = true;
        return;
      }
      _0xdddd03();
      this.#Ce();
      this.#Ie();
      this.#Ee();
      if (!_0xa0b21) {
        this.#ke.load();
      }
    }
    isSandboxed() {
      return this.#ke.isSandboxed();
    }
    showSandboxWarningOverlay() {
      this.#ke.showSandboxWarningOverlay();
    }
    async getClientHints(_0x176510) {
      if (this.#ue === undefined) {
        this.#ue = await _0x5c8388(this.#i, true);
        let _0xbacdcb = "";
        for (const _0x30c380 in this.#ue) {
          _0xbacdcb += "&" + _0x30c380 + "=" + this.#ue[_0x30c380];
        }
        this.#m = _0xbacdcb;
      }
      if (_0x176510) {
        return this.#ue;
      } else {
        return this.#m;
      }
    }
    getCdnDomain() {
      return this.#ge;
    }
    getPushOrSliderBeingShown() {
      return this.#xe;
    }
    setPushOrSliderBeingShown(_0x2048a5) {
      if (this.#xe !== _0x2048a5) {
        this.#i.debug("Set current format to", _0x2048a5);
        this.#xe = _0x2048a5;
      }
    }
    async gbtp() {
      try {
        const {
          probability: _0x45f635
        } = await _0xc694c2();
        return _0x45f635;
      } catch (_0x19d745) {
        this.#i.error(_0x19d745);
        return null;
      }
    }
    async gbts() {
      try {
        const {
          probability: _0x56b438,
          raw: _0xf39c5f
        } = await _0xc694c2();
        const _0x4d08c9 = {
          probability: _0x56b438,
          perSignal: _0xf39c5f
        };
        return _0x4d08c9;
      } catch (_0x16f1bf) {
        this.#i.error(_0x16f1bf);
        return null;
      }
    }
    getSesionRandomString() {
      return this.#ve;
    }
    enableAdbMode() {
      this.#i.debug("enable adb mode");
      this.#ye = true;
    }
    isAdbMode() {
      return this.#ye;
    }
    subscribe(_0x421818, _0x3d1ff1, _0x130448) {
      this.#fe.subscribe(_0x421818, _0x3d1ff1, _0x130448);
    }
    unsubscribe(_0x415713, _0x12805e, _0x376fcc) {
      this.#fe.unsubscribe(_0x415713, _0x12805e, _0x376fcc);
    }
    #Ee() {
      if (document.body) {
        const _0x3cc452 = document.createElement("a");
        _0x3cc452.style.display = "none";
        _0x3cc452.style.visibility = "hidden";
        _0x3cc452.style.position = "relative";
        _0x3cc452.style.left = "-1000px";
        _0x3cc452.style.top = "-1000px";
        let _0x29fe86 = this.#b;
        if (this.#s) {
          _0x29fe86 = this.#s.adserverDomain;
        }
        _0x3cc452.href = location.protocol + "//" + _0x29fe86 + "/ad/visit.php?al=1";
        document.body.appendChild(_0x3cc452);
        return;
      }
      setTimeout(this.#Ee.bind(this), 100);
    }
    #Ie() {
      _0x6cdc00(_0x728d93);
    }
    #Ce() {
      if (document.head) {
        let _0x26c45c = new Set([this.#ge, this.#b]);
        if (this.#s) {
          _0x26c45c.add(this.#s.adserverDomain);
        }
        _0x26c45c = Array.from(_0x26c45c);
        this.#i.debug("prefetch domains:", _0x26c45c);
        _0x26c45c.forEach(_0x50a7eb => {
          const _0x5d9381 = document.createElement("link");
          _0x5d9381.rel = "dns-prefetch";
          _0x5d9381.href = "//" + _0x50a7eb;
          document.head.appendChild(_0x5d9381);
        });
        return;
      }
      setTimeout(this.#Ce.bind(this), 100);
    }
    getZoneIds() {
      return Array.from(this.#pe);
    }
    runPop(_0x113699) {
      let {
        zoneId: _0x1b1a93,
        delay: _0x1dc6ab,
        targetElementsCssSelector: _0x59419e,
        triggerOnTargetElementsClick: _0xb8af7f,
        targetCountries: _0x31bd62,
        triggerOnTargetCountries: _0x2cdaf4,
        sub1: _0x3519ff,
        sub2: _0x29d4bb,
        publisherUrl: _0x14e0d0,
        storeUrl: _0x574dc4,
        c1: _0x2108e8,
        c2: _0x257fe7,
        c3: _0x5a12f9,
        pubHash: _0x463bff,
        pubClickId: _0x50c207,
        pubValue: _0x2daa34,
        fallbackOn: _0x4b1762,
        isAutoTag: _0x5d934c,
        collectiveZoneId: _0x4e41c5,
        aggressivity: _0x584977,
        recordPageView: _0xf3d304,
        linkedZoneId: _0x52d9ec,
        abTest: _0x1fbf6f,
        tagVersionSuffix: _0x3087e8
      } = _0x113699;
      if (!_0x1b1a93) {
        throw new Error("mandatory zoneId is not provided!");
      }
      if (!_0x4ac850(_0x1b1a93)) {
        throw new Error("zoneId is not a string!");
      }
      if (_0x1dc6ab !== undefined && (!_0x558e97(_0x1dc6ab) || _0x1dc6ab < 0)) {
        throw new Error("delay is not an integer or is less than zero");
      }
      if (_0x59419e !== undefined) {
        if (!_0x4ac850(_0x59419e)) {
          throw new Error("targetElementsCssSelector is not a string");
        }
        if (!(_0x28d79c => {
          try {
            document.createDocumentFragment().querySelector(_0x28d79c);
          } catch {
            return false;
          }
          return true;
        })(_0x59419e)) {
          throw new Error("targetElementsCssSelector is not a valid css selector");
        }
        if (!_0x448813(_0xb8af7f)) {
          throw new Error("triggerOnTargetElementsClick is not a boolean");
        }
      }
      if (_0x31bd62 !== undefined) {
        if (!(_0x500865 => {
          if (!Array.isArray(_0x500865)) {
            return false;
          }
          if (_0x500865.length === 0) {
            return false;
          }
          for (let _0x22faba = 0; _0x22faba < _0x500865.length; _0x22faba++) {
            if (typeof _0x500865[_0x22faba] != "string" || !/^[A-Z]{2}$/.test(_0x500865[_0x22faba])) {
              return false;
            }
          }
          return true;
        })(_0x31bd62)) {
          throw new Error("targetCountries is not valid");
        }
        if (!_0x448813(_0x2cdaf4)) {
          throw new Error("triggerOnTargetCountries is not a boolean");
        }
      }
      if (this.#be.has(_0x1b1a93)) {
        this.#i.error("zoneId " + _0x1b1a93 + " already loaded");
        return;
      }
      this.#be.add(_0x1b1a93);
      const _0x233ff7 = {
        zoneId: _0x1b1a93,
        windowOpenTimeout: 100,
        delay: _0x1dc6ab,
        targetElementsCssSelector: _0x59419e,
        triggerOnTargetElementsClick: _0xb8af7f,
        targetCountries: _0x31bd62,
        triggerOnTargetCountries: _0x2cdaf4,
        adserverDomain: this.#b,
        adblockSettings: this.#s,
        uniqueFingerprint: this.#x,
        sub1: _0x3519ff,
        sub2: _0x29d4bb,
        publisherUrl: _0x14e0d0,
        storeUrl: _0x574dc4,
        c1: _0x2108e8,
        c2: _0x257fe7,
        c3: _0x5a12f9,
        pubHash: _0x463bff,
        pubClickId: _0x50c207,
        pubValue: _0x2daa34,
        fallbackOn: _0x4b1762,
        isAutoTag: _0x5d934c,
        collectiveZoneId: _0x4e41c5,
        aggressivity: _0x584977,
        recordPageView: _0xf3d304,
        linkedZoneId: _0x52d9ec,
        abTest: _0x1fbf6f,
        tagVersionSuffix: _0x3087e8
      };
      let _0x1ee0f2 = _0x233ff7;
      if (this.#Ae.PopUnder) {
        _0x1ee0f2.isLoadedAsPartOfLibrary = true;
        new this.#Ae.PopUnder(_0x1ee0f2);
        return;
      }
      if (this.#he.pop || this.#me) {
        if (window.PopUnder) {
          this.#pe.add(_0x1ee0f2.zoneId);
          new PopUnder(_0x1ee0f2);
          return;
        }
        const _0x496553 = setInterval(() => {
          if (window.PopUnder) {
            this.#pe.add(_0x1ee0f2.zoneId);
            new PopUnder(_0x1ee0f2);
            clearInterval(_0x496553);
          }
        }, 100);
      } else {
        this.#i.debug("loading suv5 script on page");
        this.#me = true;
        const _0x51b373 = document.createElement("script");
        _0x51b373.type = "text/javascript";
        _0x51b373.src = location.protocol + "//" + this.#ge + "/script/suv5.js";
        _0x51b373.onload = () => {
          this.#he.pop = true;
          this.#me = false;
          if (_0x5d934c) {
            this.#pe.add(_0x4e41c5);
          } else {
            this.#pe.add(_0x1ee0f2.zoneId);
          }
          new PopUnder(_0x1ee0f2);
        };
        _0x51b373.onerror = () => {
          this.#he.pop = false;
          this.#me = false;
          this.#i.error("failed loading " + _0x51b373.src);
        };
        document.head.appendChild(_0x51b373);
      }
    }
    runInPagePush(_0x5011b5) {
      if (this.#he.inPagePush) {
        this.#i.error("in-page push zone already loaded on page");
        return;
      }
      this.#he.inPagePush = true;
      let {
        zoneId: _0x59b90d,
        delay: _0x428523,
        maxAds: _0x259d5f,
        renderPosDesktop: _0x53b31e,
        renderPosMobile: _0x42d3f9,
        offsetTop: _0x148b01,
        sub1: _0x5c88c2,
        isAutoTag: _0x509340,
        collectiveZoneId: _0x3a0388,
        linkedZoneId: _0x9f4818,
        aggressivity: _0x393978,
        recordPageView: _0x5ee2bc,
        abTest: _0x3a81a7,
        tagVersionSuffix: _0x3d1135
      } = _0x5011b5;
      let {
        refreshRate: _0x522eb6
      } = _0x5011b5;
      if (!_0x59b90d) {
        throw new Error("mandatory zoneId is not provided!");
      }
      if (!_0x4ac850(_0x59b90d)) {
        throw new Error("zoneId is not a string!");
      }
      if (_0x522eb6 !== undefined && (!_0x558e97(_0x522eb6) || _0x522eb6 < 0)) {
        throw new Error("refreshRate is not an integer or is less than zero");
      }
      if (_0x428523 !== undefined && (!_0x558e97(_0x428523) || _0x428523 < 0)) {
        throw new Error("delay is not an integer or is less than zero");
      }
      if (_0x259d5f !== undefined && (!_0x558e97(_0x259d5f) || _0x259d5f < 1)) {
        throw new Error("maxAds is not an integer or is less than one");
      }
      if (_0x53b31e !== undefined && !_0x2ed09c(_0x53b31e)) {
        throw new Error("renderPosDesktop is not valid");
      }
      if (_0x42d3f9 !== undefined && !_0x2ed09c(_0x42d3f9)) {
        throw new Error("renderPosMobile is not valid");
      }
      if (_0x148b01 !== undefined && (!_0x558e97(_0x148b01) || _0x148b01 < 0)) {
        throw new Error("offsetTop is not an integer or is less than zero");
      }
      this.#i.debug("loading in-page push on page");
      if (_0x509340) {
        this.#pe.add(_0x3a0388);
      } else {
        this.#pe.add(_0x59b90d);
      }
      if (_0x522eb6 !== undefined && _0x522eb6 > 0 && _0x522eb6 < 10) {
        if (_0x522eb6 < 5) {
          _0x522eb6 *= 60;
        } else {
          _0x522eb6 = 30;
        }
      }
      this.#i.debug("ipp rr set to", _0x522eb6);
      const _0x313e08 = {
        zoneId: _0x59b90d,
        refreshRate: _0x522eb6 ?? 60,
        delay: _0x428523 ?? 0,
        maxAds: _0x259d5f ?? 1,
        renderPosDesktop: _0x53b31e ?? "top",
        renderPosMobile: _0x42d3f9 ?? "top",
        offsetTop: _0x148b01 ?? 0,
        sub1: _0x5c88c2,
        isAutoTag: _0x509340,
        collectiveZoneId: _0x3a0388,
        linkedZoneId: _0x9f4818,
        aggressivity: _0x393978,
        recordPageView: _0x5ee2bc,
        abTest: _0x3a81a7,
        tagVersionSuffix: _0x3d1135,
        adserverDomain: this.#b,
        adblockSettings: this.#s,
        isLoadedAsPartOfLibrary: false,
        uniqueFingerprint: this.#x
      };
      const _0x5755a0 = _0x313e08;
      if (this.#Ae.InPagePush) {
        _0x5755a0.isLoadedAsPartOfLibrary = true;
        new this.#Ae.InPagePush(_0x5755a0);
        return;
      }
      if (window.InPagePush) {
        new window.InPagePush(_0x5755a0);
      } else {
        const _0x492172 = document.createElement("script");
        _0x492172.type = "text/javascript";
        _0x492172.src = window.location.protocol + "//" + this.#ge + "/script/inpagepush.js";
        _0x492172.setAttribute("nipp", "1");
        _0x492172.onload = () => {
          new window.InPagePush(_0x5755a0);
        };
        _0x492172.onerror = () => {
          this.#i.error("failed loading " + _0x492172.src);
        };
        document.head.appendChild(_0x492172);
      }
    }
    runBanner(_0x40f556) {
      let _0x2a2581;
      let {
        zoneId: _0x37418e,
        width: _0x417287,
        height: _0x1f44aa,
        renderIn: _0x3c1298,
        sub1: _0x3a7ee2,
        currentScript: _0x155969,
        tagVersionSuffix: _0x382a79
      } = _0x40f556;
      if (!_0x37418e) {
        throw new Error("mandatory zoneId is not provided!");
      }
      if (!_0x4ac850(_0x37418e)) {
        throw new Error("zoneId is not a string!");
      }
      if (_0x417287 !== undefined && !_0x558e97(_0x417287)) {
        throw new Error("Banner width is not an integer");
      }
      if (_0x1f44aa !== undefined && !_0x558e97(_0x1f44aa)) {
        throw new Error("Banner height is not an integer");
      }
      this.#i.debug("loading banner on page", _0x37418e);
      if (!_0x3c1298) {
        if (document.currentScript && document.currentScript.parentElement) {
          _0x2a2581 = document.currentScript.parentElement;
        }
        if (_0x155969) {
          _0x2a2581 = _0x155969.parentElement;
        }
      }
      const _0x483377 = {
        zoneId: _0x37418e,
        width: _0x417287,
        height: _0x1f44aa,
        renderIn: _0x3c1298,
        currentElement: _0x2a2581,
        sub1: _0x3a7ee2,
        uniqueFingerprint: this.#x,
        adblockSettings: this.#s,
        tagVersionSuffix: _0x382a79
      };
      const _0x5a2865 = _0x483377;
      if (this.#Ae.Banner) {
        new this.#Ae.Banner(_0x5a2865);
      } else if (this.#he.banner || this.#we) {
        if (window.Banner) {
          this.#pe.add(_0x5a2865.zoneId);
          new Banner(_0x5a2865);
          return;
        }
        const _0x1c05e8 = setInterval(() => {
          if (window.Banner) {
            this.#pe.add(_0x5a2865.zoneId);
            new Banner(_0x5a2865);
            clearInterval(_0x1c05e8);
          }
        }, 100);
      } else {
        this.#we = true;
        const _0x173f14 = document.createElement("script");
        _0x173f14.type = "text/javascript";
        _0x173f14.src = location.protocol + "//" + this.#ge + "/script/banner.js";
        _0x173f14.onload = () => {
          this.#he.banner = true;
          this.#we = false;
          this.#pe.add(_0x5a2865.zoneId);
          new Banner(_0x5a2865);
        };
        _0x173f14.onerror = () => {
          this.#he.banner = false;
          this.#we = false;
          this.#i.error("failed loading " + _0x173f14.src);
        };
        _0x173f14.setAttribute("data-adel", "ban");
        _0x173f14.setAttribute("a-lib", "1");
        document.head.appendChild(_0x173f14);
      }
    }
    runInterstitial(_0x1c754a) {
      if (this.#he.interstitial) {
        this.#i.error("interstitial zone already loaded on page");
        return;
      }
      this.#he.interstitial = true;
      let {
        zoneId: _0x3ae63d,
        sub1: _0x4a5dce,
        isAutoTag: _0x4ec414,
        collectiveZoneId: _0x227cbd,
        linkedZoneId: _0x372fa9,
        aggressivity: _0x2039f0,
        recordPageView: _0x207b6b,
        abTest: _0x51c69a,
        tagVersionSuffix: _0x3fed18
      } = _0x1c754a;
      if (!_0x3ae63d) {
        throw new Error("mandatory zoneId is not provided!");
      }
      if (!_0x4ac850(_0x3ae63d)) {
        throw new Error("zoneId is not a string!");
      }
      this.#i.debug("loading interstitial on page");
      const _0x5460d0 = {
        zoneId: _0x3ae63d,
        sub1: _0x4a5dce,
        isAutoTag: _0x4ec414,
        collectiveZoneId: _0x227cbd,
        linkedZoneId: _0x372fa9,
        aggressivity: _0x2039f0,
        recordPageView: _0x207b6b,
        abTest: _0x51c69a,
        tagVersionSuffix: _0x3fed18,
        adserverDomain: this.#b,
        adblockSettings: this.#s,
        uniqueFingerprint: this.#x,
        isLoadedAsPartOfLibrary: false
      };
      const _0x1853a4 = _0x5460d0;
      this.#pe.add(_0x3ae63d);
      if (this.#Ae.Interstitial) {
        _0x1853a4.isLoadedAsPartOfLibrary = true;
        new this.#Ae.Interstitial(_0x1853a4);
        return;
      }
      if (window.Interstitial) {
        new Interstitial(_0x1853a4);
      } else {
        const _0x7181d2 = document.createElement("script");
        _0x7181d2.type = "text/javascript";
        _0x7181d2.src = location.protocol + "//" + this.#ge + "/script/interstitial.js";
        _0x7181d2.setAttribute("a-lib", "1");
        _0x7181d2.onload = () => {
          new Interstitial(_0x1853a4);
        };
        _0x7181d2.onerror = () => {
          this.#i.error("failed loading " + _0x7181d2.src);
        };
        document.head.appendChild(_0x7181d2);
      }
    }
    async #Te(_0x2df104, _0x4e26dc = true) {
      this.#i.debug("fetch collective zone config");
      let _0x5576fb = window.location.protocol + "//" + this.#b + "/ad/czcf.php";
      if (this.isAdbMode()) {
        const _0x3b6bb2 = "/" + _0x1e4e6d("abcdefgh0123456789");
        _0x5576fb = window.location.protocol + "//" + this.#s.adserverDomain + _0x3b6bb2;
      }
      _0x5576fb += "?cz=" + _0x2df104;
      _0x5576fb += "&atv=" + this.#y;
      const _0x288302 = await this.getClientHints();
      let _0x284f46;
      if (_0x288302) {
        _0x5576fb += _0x288302;
      }
      if (this.isAdbMode()) {
        _0x5576fb += "&sadbl=2";
        _0x5576fb += "&fmt=atg";
        _0x5576fb = _0xac05ea(_0x5576fb);
      }
      this.#i.debug("collective zone config url: ", _0x5576fb);
      try {
        _0x284f46 = await fetch(_0x5576fb);
      } catch (_0x186a7f) {
        this.#i.error(_0x186a7f);
        if (this.#s && _0x4e26dc) {
          this.#i.debug("collective zone config fetch failed: try alt domain and path");
          this.enableAdbMode();
          return this.#Te(_0x2df104, false);
        } else {
          return null;
        }
      }
      if (_0x284f46.status !== 200) {
        return null;
      } else {
        _0x284f46 = await _0x284f46.json();
        return _0x7b55ed(_0x284f46);
      }
    }
    async runAutoTag(_0x40fdb3) {
      if (this.#he.autoTag) {
        this.#i.error("autotag zone already loaded on page");
        return;
      }
      this.#he.autoTag = true;
      const _0x83e619 = _0x40fdb3.zoneId;
      if (!_0x83e619) {
        throw new Error("mandatory zoneId is not provided!");
      }
      if (!_0x4ac850(_0x83e619)) {
        throw new Error("zoneId is not a string!");
      }
      const _0x344014 = await this.#Te(_0x83e619);
      if (!_0x344014) {
        this.#i.error("failed to fetch collective zone config! czid: " + _0x83e619);
        return;
      }
      this.#i.debug("collective zone config:", _0x344014);
      if (!_0x344014.rotationList) {
        this.#i.debug("running in NORMAL MODE (no rotation)");
        const _0x14f8ec = _0x344014.indexedFormats;
        let _0x46d484 = true;
        for (const _0x5aa988 in _0x14f8ec) {
          switch (_0x5aa988) {
            case "suv4":
            case "pop":
              this.runPop({
                zoneId: _0x14f8ec[_0x5aa988].zoneId.toString(),
                isAutoTag: true,
                collectiveZoneId: _0x83e619,
                aggressivity: _0x344014.aggressivity,
                abTest: _0x344014.ab_test,
                recordPageView: _0x46d484,
                tagVersionSuffix: _0x40fdb3.tagVersionSuffix
              });
              break;
            case "interstitial":
              this.runInterstitial({
                zoneId: _0x14f8ec[_0x5aa988].zoneId.toString(),
                isAutoTag: true,
                collectiveZoneId: _0x83e619,
                aggressivity: _0x344014.aggressivity,
                abTest: _0x344014.ab_test,
                recordPageView: _0x46d484,
                tagVersionSuffix: _0x40fdb3.tagVersionSuffix
              });
              break;
            case "ippg":
              this.runInPagePush({
                zoneId: _0x14f8ec[_0x5aa988].zoneId.toString(),
                delay: _0x14f8ec[_0x5aa988].delay,
                maxAds: _0x14f8ec[_0x5aa988].mads,
                renderPosDesktop: _0x14f8ec[_0x5aa988]["render-pos-desktop"],
                renderPosMobile: _0x14f8ec[_0x5aa988]["render-pos-mobile"],
                isAutoTag: true,
                collectiveZoneId: _0x83e619,
                aggressivity: _0x344014.aggressivity,
                abTest: _0x344014.ab_test,
                recordPageView: _0x46d484,
                tagVersionSuffix: _0x40fdb3.tagVersionSuffix
              });
              break;
            case "videoSlider":
              this.runVideoSlider({
                zoneId: _0x14f8ec[_0x5aa988].zoneId.toString(),
                delay: _0x14f8ec[_0x5aa988].delay,
                refreshRate: _0x14f8ec[_0x5aa988].refreshRate,
                isNewBehavior: _0x14f8ec[_0x5aa988].isNewBehavior,
                renderPosition: _0x14f8ec[_0x5aa988].renderPosition,
                closeButtonDelay: _0x14f8ec[_0x5aa988].closeButtonDelay,
                isAutoTag: true,
                collectiveZoneId: _0x83e619,
                abTest: _0x344014.ab_test,
                aggressivity: _0x344014.aggressivity,
                recordPageView: _0x46d484,
                tagVersionSuffix: _0x40fdb3.tagVersionSuffix
              });
              break;
            default:
              this.#i.error("ad format type not recognised from collective zone config. adformat.type: " + _0x5aa988 + "; czid: " + _0x83e619);
          }
          _0x46d484 = false;
        }
        return;
      }
      this.#i.debug("running in ROTATION MODE (rotation present)");
      const _0x5edfef = {
        collectiveZoneConfig: _0x344014,
        adserverDomain: this.#b,
        adblockSettings: this.#s,
        clientHintsQueryStr: this.#m,
        tagVersionSuffix: _0x40fdb3.tagVersionSuffix,
        isLoadedAsPartOfLibrary: false,
        uniqueFingerprint: this.#x
      };
      const _0x50edd1 = _0x5edfef;
      if (this.#Ae.AutoTagRotation) {
        this.#pe.add(_0x83e619);
        _0x50edd1.isLoadedAsPartOfLibrary = true;
        new this.#Ae.AutoTagRotation(_0x50edd1);
        return;
      }
      this.#i.debug("loading autotag rotation script on page");
      const _0x45c637 = document.createElement("script");
      _0x45c637.type = "text/javascript";
      _0x45c637.src = location.protocol + "//" + this.#ge + "/script/atagv2.js";
      _0x45c637.onload = () => {
        this.#pe.add(_0x83e619);
        new _0x23ccaf(_0x50edd1);
      };
      _0x45c637.onerror = () => {
        this.#i.error("failed loading " + _0x45c637.src);
      };
      document.head.appendChild(_0x45c637);
    }
    runVideoSlider(_0x1180ac) {
      if (this.#he.videoSlider) {
        this.#i.error("videoslider zone already loaded on page");
        return;
      }
      this.#he.videoSlider = true;
      let {
        zoneId: _0x3cb56b,
        sub1: _0x1b1627,
        vastXml: _0x30f18b,
        linkedZoneId: _0x3bc800,
        delay: _0x505c4b,
        refreshRate: _0x466d4e,
        isNewBehavior: _0x2edccb,
        renderPosition: _0xf3963d,
        closeButtonDelay: _0x56f555,
        isAutoTag: _0x552859,
        collectiveZoneId: _0x495c53,
        tagVersionSuffix: _0x218b08,
        abTest: _0x4c18c3,
        aggressivity: _0x2ae3c8,
        recordPageView: _0x1cd169
      } = _0x1180ac;
      if (!_0x3cb56b) {
        throw new Error("mandatory zoneId is not provided!");
      }
      if (!_0x4ac850(_0x3cb56b)) {
        throw new Error("zoneId is not a string!");
      }
      const _0x14a8db = {
        zoneId: _0x3cb56b,
        sub1: _0x1b1627,
        adserverDomain: this.#b,
        uniqueFingerprint: this.#x,
        isPreviewMode: this.#Se,
        vastXml: _0x30f18b,
        linkedZoneId: _0x3bc800,
        adblockSettings: this.#s,
        delay: _0x505c4b,
        refreshRate: _0x466d4e,
        isNewBehavior: _0x2edccb,
        renderPosition: _0xf3963d,
        closeButtonDelay: _0x56f555,
        isAutoTag: _0x552859,
        collectiveZoneId: _0x495c53,
        tagVersionSuffix: _0x218b08,
        abTest: _0x4c18c3,
        aggressivity: _0x2ae3c8,
        recordPageView: _0x1cd169
      };
      const _0x35f1c6 = _0x14a8db;
      if (this.#Ae.VideoSlider) {
        _0x35f1c6.isLoadedAsPartOfLibrary = true;
        new this.#Ae.VideoSlider(_0x35f1c6);
        return;
      }
      if (window.VideoSlider) {
        new VideoSlider(_0x35f1c6);
      } else {
        const _0xd955f0 = document.createElement("script");
        _0xd955f0.type = "text/javascript";
        _0xd955f0.src = window.location.protocol + "//" + this.#ge + "/script/videoSliderAlt.js";
        _0xd955f0.onload = () => {
          this.#pe.add(_0x3cb56b);
          new VideoSlider(_0x35f1c6);
        };
        _0xd955f0.onerror = () => {
          this.#i.error("failed loading " + _0xd955f0.src);
        };
        document.head.appendChild(_0xd955f0);
      }
    }
  }
  const _0x24f947 = new _0x4525bc("aclib_index");
  if (window.AtcshAltNm) {
    _0x24f947.debug("lib already on page. exit");
  } else {
    _0x24f947.debug("load lib on page");
    (() => {
      const _0x59b8ce = {
        aclib: new _0x24398c(undefined),
        AtcshAltNm: _0x24398c
      };
      Object.keys(_0x59b8ce).forEach(_0x5c9209 => {
        Object.defineProperty(window, _0x5c9209, {
          value: _0x59b8ce[_0x5c9209]
        });
      });
    })();
  }
})();
