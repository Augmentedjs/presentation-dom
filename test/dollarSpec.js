describe('Given Augmented Presentation $', () => {
	it('is defined', () => {
		expect(Dom.$).to.not.be.undefined;
	});

	it('can select an element', () => {
		const body = Dom.$("body");
		expect(body).to.not.be.undefined;
		expect(body.tagName.toLowerCase()).to.equal("body");
	});

	xit('can select multiple elements', () => {
		const divs = Dom.$("div");
		expect(divs).to.not.be.undefined;
		expect(divs instanceof NodeList).to.be.true;
	});

	xit('can select a specific header element', () => {
		const h1 = Dom.$("html body article section#header header h1");
		expect(h1).to.not.be.undefined;
		expect(h1 instanceof Node).to.be.true;
		expect(h1.innerText).to.equal("Augmented.js Next Presentation - Mocha Tests");
	});
});
