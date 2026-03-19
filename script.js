const state = {
  step: 1,
  selectedLayout: "story",
  selectedTemplate: "blue",
  recipientName: "",
  statusMessage: "",
};

const brandLogo = "./logo.png";

const layouts = [
  { id: "story", name: "طولي", ratio: "9:16", visualClass: "story" },
  { id: "square", name: "مربع", ratio: "1:1", visualClass: "square" },
  { id: "post", name: "بوست", ratio: "4:5", visualClass: "post" },
];

const templates = [
  {
    id: "blue",
    name: "أزرق احترافي",
    tag: "الأقرب للهوية",
    previewClass: "template-preview--blue",
    cardClass: "card--blue",
  },
  {
    id: "gray",
    name: "رمادي أزرق",
    tag: "هادئ ومؤسسي",
    previewClass: "template-preview--gray",
    cardClass: "card--gray",
  },
  {
    id: "gold",
    name: "تباين فاخر",
    tag: "بروز أعلى للنص",
    previewClass: "template-preview--gold",
    cardClass: "card--gold",
  },
  {
    id: "green",
    name: "أخضر تقني",
    tag: "لمسة حديثة",
    previewClass: "template-preview--green",
    cardClass: "card--green",
  },
];

const app = document.getElementById("app");

function canContinue() {
  return state.step !== 3 || state.recipientName.trim().length > 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stepDots() {
  return [1, 2, 3, 4, 5]
    .map((n) => `<span class="step-dot ${state.step === n ? "is-active" : ""}"></span>`)
    .join("");
}

function currentTemplate() {
  return templates.find((item) => item.id === state.selectedTemplate) || templates[0];
}

function cardMarkup(includeId = false) {
  const template = currentTemplate();
  const name = escapeHtml(state.recipientName.trim() || "-----");
  const cardId = includeId ? 'id="final-card"' : "";

  return `
    <div ${cardId} class="card ${template.cardClass} card--${state.selectedLayout}">
      <div class="card__overlay"></div>
      <div class="card__glow"></div>
      <span class="card__star card__star--a card__star--white">✦</span>
      <span class="card__star card__star--b card__star--lime">✦</span>
      <span class="card__star card__star--c card__star--white">✦</span>
      <span class="card__star card__star--d card__star--lime">✦</span>

      <div class="card__body">
        <div class="card__logo-wrap">
          <div class="card__logo">
            <img src="${brandLogo}" alt="جمعية الذكاء الاصطناعي" width="140" height="46" crossorigin="anonymous" />
          </div>
        </div>

        <div class="card__center">
          <img class="card__title-image" src="./eid-title.png" alt="عادت أعيادكم" width="300" height="120" />
          <p class="card__subtitle">بكل الخير والمسرات</p>
          <div class="card__name">${name}</div>
        </div>

        <div class="card__footer">
          <div class="card__line"></div>
          <div class="card__brand-en">ARTIFICIAL INTELLIGENCE ASSOCIATION</div>
        </div>
      </div>
    </div>
  `;
}

function landingMarkup() {
  return `
    <section class="landing page">
      <div class="shape shape--blob-left"></div>
      <div class="shape shape--pill-right"></div>
      <span class="shape shape--star shape--navy" style="left:13%; top:12%;">✦</span>
      <span class="shape shape--star shape--navy" style="right:12%; top:14%;">✦</span>
      <span class="shape shape--star shape--lime" style="right:24%; top:2%;">✦</span>
      <span class="shape shape--star shape--lime" style="right:25%; top:35%;">✦</span>
      <span class="shape shape--star shape--white" style="right:40%; top:22%;">✦</span>
      <span class="shape shape--star shape--white" style="right:39%; top:31%;">✦</span>

      <div class="landing__content">
        <div></div>
        <div class="landing__center">
          <h1 class="landing__title">عادت أعياكم</h1>
          <div class="landing__brand">
            <div class="landing__brand-ar">جمعية الذكاء الاصطناعي</div>
            <div class="landing__brand-en">Artificial Intelligence Association</div>
          </div>
          <button class="landing__start" data-action="start">ابدأ</button>
        </div>
        <div class="landing__footer">جميع الحقوق محفوظة لجمعية الذكاء الاصطناعي © 2026</div>
      </div>
    </section>
  `;
}

function layoutOptionsMarkup() {
  return layouts
    .map(
      (layout) => `
        <button class="option-card ${state.selectedLayout === layout.id ? "is-selected" : ""}" data-layout="${layout.id}">
          <div class="option-visual">
            <div class="option-visual__ratio ${layout.visualClass}"></div>
          </div>
          <div class="option-title">${layout.name}</div>
          <div class="option-meta">Ratio: ${layout.ratio}</div>
        </button>
      `
    )
    .join("");
}

function templateOptionsMarkup() {
  return templates
    .map(
      (template) => `
        <button class="option-card ${state.selectedTemplate === template.id ? "is-selected" : ""}" data-template="${template.id}">
          <div class="template-preview ${template.previewClass}">
            <div class="template-preview__tag">${template.tag}</div>
            <div class="template-preview__logo"><img src="${brandLogo}" alt="logo" width="118" height="38" crossorigin="anonymous" /></div>
            <div class="template-preview__bottom">
              <img class="template-preview__title-image" src="./eid-title.png" alt="عادت أعيادكم" width="180" height="72" />
              <div class="template-preview__subtitle">بكل الخير والمسرات</div>
            </div>
          </div>
          <div class="option-title option-title--template">${template.name}</div>
        </button>
      `
    )
    .join("");
}

function primaryPanelMarkup() {
  if (state.step === 2) {
    return `
      <div class="step-content">
        <h2 class="section-title">اختيار المقاس</h2>
        <div class="section-subtitle">اختاري شكل البطاقة حسب الاستخدام.</div>
        <div class="option-grid option-grid--3">${layoutOptionsMarkup()}</div>
      </div>
    `;
  }

  if (state.step === 3) {
    return `
      <div class="step-content">
        <h2 class="section-title">كتابة الاسم</h2>
        <div class="section-subtitle">الاسم سيظهر في منتصف البطاقة تحت التهنئة.</div>
        <div class="input-panel">
          <label class="input-label" for="recipientName">الاسم</label>
          <input id="recipientName" class="text-input" type="text" placeholder="اكتب الاسم هنا..." value="${escapeHtml(state.recipientName)}" />
        </div>
      </div>
    `;
  }

  if (state.step === 4) {
    return `
      <div class="step-content">
        <h2 class="section-title">اختيار التصميم</h2>
        <div class="section-subtitle">ألوان مناسبة لظهور الشعار بوضوح عند الحفظ.</div>
        <div class="option-grid option-grid--2">${templateOptionsMarkup()}</div>
      </div>
    `;
  }

  if (state.step === 5) {
    return `
      <div class="step-content">
        <div class="final-header">
          <div>
            <h2 class="section-title">المعاينة النهائية</h2>
            <div class="section-subtitle">البطاقة جاهزة للحفظ والرفع.</div>
          </div>
          <button class="btn btn--solid" data-action="download">حفظ الصورة</button>
        </div>
        ${state.statusMessage ? `<div class="status">${state.statusMessage}</div>` : ""}
        <div class="final-card-wrap">${cardMarkup(true)}</div>
      </div>
    `;
  }

  return "";
}

function wizardMarkup() {
  return `
    <section class="panel-page page">
      <div class="container">
        <div class="topbar">
          <div class="brand">
            <div class="logo-box"><img src="${brandLogo}" alt="الشعار" width="118" height="38" crossorigin="anonymous" /></div>
            <div>
              <div class="brand__title">منشئ بطاقة المعايدة</div>
              <div class="brand__subtitle">جمعية الذكاء الاصطناعي</div>
            </div>
          </div>
          <div class="steps-inline">${stepDots()}</div>
        </div>

        <div class="layout">
          <div class="panel">
            ${primaryPanelMarkup()}
            <div class="controls">
              <button class="btn btn--ghost" data-action="back" ${state.step === 1 ? "disabled" : ""}>رجوع</button>
              <div class="steps-mobile">${stepDots()}</div>
              <button class="btn btn--solid" data-action="next" ${state.step === 5 || !canContinue() ? "disabled" : ""}>التالي</button>
            </div>
          </div>

          <div class="panel">
            <div class="preview-header">
              <div>
                <div class="preview-title">معاينة سريعة</div>
                <div class="preview-subtitle">تتحدث تلقائيًا حسب الاختيارات.</div>
              </div>
              <div class="badge">RTL UI</div>
            </div>
            <div class="preview-wrap">
              <div class="preview-card-holder">${cardMarkup(false)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function render() {
  app.innerHTML = state.step === 1 ? landingMarkup() : wizardMarkup();

  if (state.step === 3) {
    const input = document.getElementById("recipientName");
    if (input) {
      input.addEventListener("input", (event) => {
        state.recipientName = event.target.value;
        state.statusMessage = "";
        render();
      });
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", async (event) => {
      const action = event.currentTarget.getAttribute("data-action");

      if (action === "start") {
        state.step = 2;
        state.statusMessage = "";
        render();
        return;
      }

      if (action === "next") {
        if (state.step < 5 && canContinue()) {
          state.step += 1;
          state.statusMessage = "";
          render();
        }
        return;
      }

      if (action === "back") {
        if (state.step > 1) {
          state.step -= 1;
          state.statusMessage = "";
          render();
        }
        return;
      }

      if (action === "download") {
        await downloadCardAsImage();
      }
    });
  });

  document.querySelectorAll("[data-layout]").forEach((element) => {
    element.addEventListener("click", (event) => {
      state.selectedLayout = event.currentTarget.getAttribute("data-layout");
      render();
    });
  });

  document.querySelectorAll("[data-template]").forEach((element) => {
    element.addEventListener("click", (event) => {
      state.selectedTemplate = event.currentTarget.getAttribute("data-template");
      render();
    });
  });
}

async function waitForAssets(card) {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const images = Array.from(card.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  await new Promise((resolve) => setTimeout(resolve, 120));
}

async function downloadCardAsImage() {
  const card = document.getElementById("final-card");

  if (!card || !window.html2canvas) {
    state.statusMessage = "تعذر تجهيز الصورة حاليًا.";
    render();
    return;
  }

  try {
    state.statusMessage = "جارٍ تجهيز الصورة...";
    render();

    const freshCard = document.getElementById("final-card");
    await waitForAssets(freshCard);

    document.body.classList.add("is-exporting");

    const canvas = await window.html2canvas(freshCard, {
      backgroundColor: "#4f8fe8",
      scale: 3,
      useCORS: false,
      allowTaint: false,
      imageTimeout: 15000,
      logging: false,
    });

    const link = document.createElement("a");
    const safeName = (state.recipientName.trim() || "aia-card").replace(/[\\/:*?"<>|]/g, "-");
    link.href = canvas.toDataURL("image/png", 1);
    link.download = `${safeName}.png`;
    link.click();

    state.statusMessage = "تم حفظ البطاقة بنجاح.";
  } catch (error) {
    console.error(error);
    state.statusMessage = "فشل حفظ الصورة. تأكدي أن جميع الملفات مرفوعة مع الشعار داخل الريبو.";
  } finally {
    document.body.classList.remove("is-exporting");
    render();
  }
}

render();
