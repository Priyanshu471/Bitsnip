export const getDeviceInfo = (req) => {
  const userAgent = req.headers["user-agent"];
  const mobile =
    req.headers["Sec-CH-UA-Mobile"] ||
    req.headers["Sec-Ch-Ua-Mobile"] ||
    req.headers["sec-ch-ua-mobile"] ||
    "connot get mobile info";
  let Os =
    req.headers["Sec-CH-UA-Platform"] ||
    req.headers["Sec-Ch-Ua-Platform"] ||
    req.headers["sec-ch-ua-platform"];
  let browserName = "Unknown";
  if (typeof Os === "undefined") {
    Os = "Unknown";
  }
  const browserRegex = {
    Chrome: /Chrome\/([\d.]+)/,
    Firefox: /Firefox\/([\d.]+)/,
    Safari: /Safari\/([\d.]+)/,
    Edge: /Edge\/([\d.]+)/,
    IE: /Trident.*rv:([\d.]+)/,
  };
  const osRegex = {
    Windows: /Windows NT ([\d.]+)/,
    Mac: /Mac OS X ([\d._]+)/,
    iOS: /(?:iPhone|iPad|iPod).*? OS ([\d_]+)/,
    Android: /Android ([\d.]+)/,
  };
  for (const browser in browserRegex) {
    const match = userAgent.match(browserRegex[browser]);
    if (match) {
      browserName = browser;
      break;
    }
  }
  for (const os in osRegex) {
    const match = userAgent.match(osRegex[os]);
    if (match) {
      Os = os;
      break;
    }
  }

  const isMobile = mobile === "?1" ? true : false;
  return {
    isMobile,
    Os,
    browserName,
  };
};
