describe("Given Augmented Presentation Dom", () => {
	it("is defined", () => {
		expect(DomLib.Dom).to.not.be.undefined;
	});

	it("can get the viewport height", () => {
		const i = DomLib.Dom.getViewportHeight();
		expect(DomLib.Dom.getViewportHeight).to.not.be.undefined;
		expect(i).to.be.above(0);
	});

	it("can get the viewport width", () => {
		const i = DomLib.Dom.getViewportWidth();
		expect(i).to.be.above(0);
	});

	describe("Given and element", () => {
		const el = document.createElement("div"),
		body = document.querySelector("body");
		el.setAttribute("id", "sandbox");
		body.appendChild(el);

		afterEach(() => {
			DomLib.Dom.empty("#sandbox");
		});

		it("can set the value of a div", () => {
			DomLib.Dom.setValue("#sandbox", "augmented");
			const e = document.querySelector("#sandbox");
			expect(e.textContent).to.equal("augmented");
		});

		it("can get the value of a div", () => {
			const e = document.querySelector("#sandbox");
			e.textContent = "augmented";
			const v = DomLib.Dom.getValue("#sandbox");
			expect(v).to.equal("augmented");
		});

		it("can get an element", () => {
			const e1 = document.querySelector("#sandbox");
			const e2 = DomLib.Dom.selector("#sandbox");
			expect(e1).to.equal(e2);
		});

		it("can get an element list", () => {
			const e1 = document.querySelector("#sandbox");
			const e2 = DomLib.Dom.selectors("#sandbox")[0];
			expect(e1).to.equal(e2);
		});

		it("can get an element list", () => {
			const e1 = document.querySelector("#sandbox");
			const e2 = DomLib.Dom.selectors("#sandbox")[0];
			expect(e1).to.equal(e2);
		});

		it("can hide an element", () => {
			DomLib.Dom.hide("#sandbox");
			const e = document.querySelector("#sandbox");
			expect(e.style.display).to.equal("none");
		});

		it("can show an element", () => {
			DomLib.Dom.show("#sandbox");
			const e = document.querySelector("#sandbox");
			expect(e.style.display).to.equal("block");
		});

		it("can set the class attribute", () => {
			DomLib.Dom.setClass("#sandbox", "monkey");
			const e = document.querySelector("#sandbox");
			const c = e.getAttribute("class");
			expect(c).to.equal("monkey");
		});

		it("can add the class attribute", () => {
			DomLib.Dom.addClass("#sandbox", "bubba");
			const e = document.querySelector("#sandbox");
			const c = e.getAttribute("class");
			expect(c).to.contain("bubba");
		});

		it("can remove the class attribute", () => {
			DomLib.Dom.addClass("#sandbox", "bubba");
			DomLib.Dom.removeClass("#sandbox", "bubba");
			const e = document.querySelector("#sandbox");
			const c = e.getAttribute("class");
			expect(c).not.to.contain("bubba");
		});

		it("can replace the class attribute", () => {
			DomLib.Dom.addClass("#sandbox", "bubba");
			DomLib.Dom.replaceClass("#sandbox", "bubba", "chulo");
			const e = document.querySelector("#sandbox");
			const c = e.getAttribute("class");
			expect(c).to.contain("chulo");
		});

		it("can check if it contains the class attribute", () => {
			DomLib.Dom.addClass("#sandbox", "bubba");
			const e = document.querySelector("#sandbox");
			const c = e.getAttribute("class");
			expect(DomLib.Dom.containsClass("#sandbox", "bubba")).to.be.true;
		});

		it("can toggle the class attribute", () => {
			DomLib.Dom.addClass("#sandbox", "bubba");
			DomLib.Dom.toggleClass("#sandbox", "bubba", "chulo");
			const e = document.querySelector("#sandbox");
			const c = e.getAttribute("class");
			expect(c).to.contain("chulo");
		});

		it("can empty an element", () => {
			DomLib.Dom.empty("#sandbox");
			const e = document.querySelector("#sandbox");
			const v = DomLib.Dom.getValue("#sandbox");
			expect(v).to.equal("");
		});
	});
});
