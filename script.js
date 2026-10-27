(() => {
  "use strict";
  const config = window.AGROMAP_SITE || {};
  const publicUrl = value => {
    try { const url = new URL(value); return url.protocol === "https:" ? url.href : null; }
    catch { return null; }
  };
  const configureLinks = (name, value) => {
    const url = publicUrl(value);
    if (!url) return;
    document.querySelectorAll(`[data-${name}]`).forEach(link => {
      link.href = url; link.target = "_blank"; link.rel = "noopener";
    });
    document.querySelectorAll(`[data-${name}-status]`).forEach(label => {
      label.textContent = "Available";
    });
  };
  configureLinks("paper", config.paperUrl || config.arxivUrl);
  configureLinks("code", config.codeUrl);
  configureLinks("dataset", config.datasetUrl);
  document.querySelectorAll("[data-paper-label]").forEach(el => {
    if (config.paperLabel) el.textContent = config.paperLabel;
    else if (publicUrl(config.paperUrl || config.arxivUrl)) el.textContent = "Read the paper ↗";
  });
  const arxiv = publicUrl(config.arxivUrl);
  if (arxiv) {
    const link = document.createElement("a");
    link.href = arxiv; link.textContent = "Read the arXiv preprint ↗";
    link.target = "_blank"; link.rel = "noopener";
    document.getElementById("arxiv-status").replaceChildren(link);
  }
  const siteUrl = publicUrl(config.siteUrl);
  if (siteUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = siteUrl;
    const ogImage = document.querySelector('meta[property="og:image"]');
    ogImage.content = new URL("assets/images/social.jpg", siteUrl.endsWith("/") ? siteUrl : siteUrl + "/").href;
  }
  document.querySelectorAll("[data-video-slot]").forEach(slot => {
    const videoConfig = config.videos?.[slot.dataset.videoSlot];
    const src = videoConfig?.src;
    if (!src) return;
    let url;
    try { url = new URL(src, location.href); } catch { return; }
    if (!["http:", "https:"].includes(url.protocol)) return;
    if (url.origin !== location.origin && url.protocol !== "https:") return;
    const youtube = ["www.youtube-nocookie.com", "www.youtube.com", "youtube.com"].includes(url.hostname) && /^\/embed\/[\w-]+$/.test(url.pathname);
    const poster = slot.querySelector("img")?.src;
    slot.replaceChildren();
    if (youtube) {
      // Load external players only after an explicit click, avoiding third-party requests on page load.
      const button = document.createElement("button");
      button.className = "video-start"; button.type = "button";
      const image = document.createElement("img"); image.src = poster; image.alt = "";
      const label = document.createElement("span"); label.textContent = "▶ Play demo";
      button.setAttribute("aria-label", `Play ${videoConfig.title}`);
      button.append(image, label); slot.append(button);
      button.addEventListener("click", () => {
        const iframe = document.createElement("iframe");
        url.hostname = "www.youtube-nocookie.com";
        iframe.src = url.href; iframe.title = videoConfig.title;
        iframe.allow = "fullscreen; picture-in-picture"; iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        slot.replaceChildren(iframe);
      });
    } else {
      const video = document.createElement("video");
      video.src = url.href; video.controls = true; video.preload = "none";
      video.playsInline = true; video.poster = poster;
      video.setAttribute("aria-label", videoConfig.title);
      if (videoConfig.captions) {
        const track = document.createElement("track");
        track.kind = "captions"; track.srclang = "en"; track.label = "English";
        track.src = videoConfig.captions; video.append(track);
      }
      slot.append(video);
    }
  });
  const copy = document.getElementById("copy-citation");
  copy.addEventListener("click", async () => {
    const code = document.getElementById("bibtex");
    try {
      await navigator.clipboard.writeText(code.textContent);
      copy.textContent = "Copied ✓";
      document.getElementById("copy-status").textContent = "Citation copied to clipboard.";
      setTimeout(() => { copy.textContent = "Copy citation ⧉"; }, 2500);
    } catch {
      const range = document.createRange(); range.selectNodeContents(code);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      document.getElementById("copy-status").textContent = "Citation selected. Press Control+C or Command+C to copy.";
    }
  });
})();
