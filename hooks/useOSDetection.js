import { useState, useEffect } from "react";

export function useOSDetection() {
  const [osInfo, setOSInfo] = useState({
    os: "unknown",
    isWindows: false,
    isMac: false,
    isLinux: false,
    isMobile: false,
    platform: "",
    userAgent: "",
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const userAgentLower = userAgent.toLowerCase();

    let os = "unknown";
    let isWindows = false;
    let isMac = false;
    let isLinux = false;
    let isMobile = false;

    // Check for mobile first
    if (
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgentLower
      )
    ) {
      isMobile = true;
      if (/android/i.test(userAgentLower)) {
        os = "android";
      } else if (/iphone|ipad|ipod/i.test(userAgentLower)) {
        os = "ios";
      } else {
        os = "mobile";
      }
    } else {
      // Desktop OS detection
      if (
        userAgentLower.indexOf("win") > -1 ||
        platform === "Win32" ||
        platform === "Windows"
      ) {
        os = "windows";
        isWindows = true;
      } else if (
        userAgentLower.indexOf("mac") > -1 ||
        platform === "MacIntel" ||
        platform === "Macintosh"
      ) {
        os = "mac";
        isMac = true;
      } else if (userAgentLower.indexOf("linux") > -1 || platform === "Linux") {
        os = "linux";
        isLinux = true;
      }
    }

    setOSInfo({
      os,
      isWindows,
      isMac,
      isLinux,
      isMobile,
      platform,
      userAgent,
    });
  }, []);

  return osInfo;
}
