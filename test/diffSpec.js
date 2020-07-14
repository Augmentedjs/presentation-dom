const TEMPLATE = /*html*/`<article id="app"><section id="header"><header><h1>Augmented.js Next Presentation - Mocha Tests</h1><h2 id="augmented" data-testView="version"></h2></header></section><section id="sandbox"><h1>Fun with dogs and cats</h1><h2>The epic story</h2><p>There once was a dog named Rex...</p><input type="text" name="dog" value="Rex"/></section></article>`;
const ORG =      /*html*/`<article id="app"><section id="header"><header><h1>Augmented.js Next Presentation - Mocha Tests</h1><h2 id="augmented" data-testView="version"></h2></header></section><section id="sandbox"><input type="text" name="dog" /></section></article>`;

describe("Given a DOM", () => {
  let dom;
  beforeEach(() => {
    dom = DomLib.Diff.stringToHTML(TEMPLATE);
  });

  afterEach(() => {
    dom = null;
  });

  it("Can transform string to DOM", async () => {
    expect(dom).to.not.be.undefined;
    expect(dom).to.be.instanceOf(window.HTMLElement);
  });

  describe("Can map a DOM", () => {
    let templateMap, app, domMap;
    beforeEach(() => {
      // Get DOM maps
      templateMap = DomLib.Diff.createDOMMap(dom);
      app = document.querySelector("#app");
      app.innerHTML = ORG;
      domMap = DomLib.Diff.createDOMMap(app);
    });

    afterEach(() => {
      templateMap = null;
      app = null;
      domMap = null;
    });

    it("Can map a top level DOM", async () => {
      // Get the existing UI node
      expect(templateMap).to.not.be.undefined;
      expect(domMap).to.not.be.undefined;
    });

    it("Can diff a simple DOM", async () => {
      // Diff the DOM
      const changes = DomLib.Diff.diff(templateMap, domMap, app);

      console.debug("stuff", app.innerHTML);
      console.debug("changes", changes);
      expect(app).to.not.be.undefined;
      expect(changes).to.not.equal(0);
    });
  });

  describe("Can diff different types of DOMs", () => {
    it("Can diff a DOM with input", async () => {
      const app = document.querySelector("#app");
      app.innerHTML = `<div><h1 data-header="1">Test</h1><input type="text" id="t" value="rex" class="material"/><button>click me</button></div>`;
      const change = document.createElement("div");
      change.id = "app";
      change.innerHTML = `<div><input type="text" id="s" value="rover" /><button>click me!</button><button class="x" type="reset">Reset</button></div>`;
      const domMap = DomLib.Diff.createDOMMap(app);
      const changeMap = DomLib.Diff.createDOMMap(change);
      // Diff the DOM
      const changes = DomLib.Diff.diff(changeMap, domMap, app);

      console.debug("dom", app.innerHTML);
      console.debug("changes", changes);
      expect(app).to.not.be.undefined;
      expect(changes).to.not.equal(0);
    });

    it("Can diff a DOM with input changeing value", async () => {
      const app = document.querySelector("#app");
      app.innerHTML = `<div><h1 data-header="1">Test</h1><input type="text" id="t" value="rex" class="material"/><button>click me</button></div>`;
      const change = document.createElement("div");
      change.id = "app";
      change.innerHTML = `<div><input type="text" id="s" value="rover" /><button>click me!</button><button class="x" type="reset">Reset</button></div>`;

      const i = document.createElement("input");
      i.id = "bonobo";
      i.setAttribute("value", "monkey");
      i.classList = "x";
      change.appendChild(i);

      const domMap = DomLib.Diff.createDOMMap(app);
      const changeMap = DomLib.Diff.createDOMMap(change);
      // Diff the DOM
      const changes = DomLib.Diff.diff(changeMap, domMap, app);

      console.debug("dom", app.innerHTML);
      console.debug("changes", changes);
      expect(app).to.not.be.undefined;
      expect(changes).to.not.equal(0);
    });


  });
});
