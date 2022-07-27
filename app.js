const header = document.querySelector("#header");
const banner = document.querySelector("#banner");
const backdrop = document.querySelector("#backdrop");
const navMobile = document.querySelector("#nav-mobile");
const body = document.body;

header.addEventListener("click", (e) => {
	if (!e.target.closest("#nav-menu-btn")) return;
	e.preventDefault();
	e.stopPropagation();
	backdrop.classList.add("show");
	navMobile.classList.add("open");
	body.classList.add("disabled-scrolling");
});

const observerOption = {
	threshold: 0,
	rootMargin: "-80px",
};

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		const { isIntersecting } = entry;
		if (!isIntersecting) {
			header.classList.add("sticky");
			return;
		}
		header.classList.remove("sticky");
	});
}, observerOption);

banner ? observer.observe(banner) : "";

const closeEvent = (e) => {
	if (e.target.closest("#nav-mobile")) return;
	backdrop.classList.remove("show");
	navMobile.classList.remove("open");
	body.classList.remove("disabled-scrolling");
	body.removeEventListener("click", closeEvent);
};

// mutation observer for observing DOM changes
const config = { attributes: true, childList: false, subtree: false };
const callback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		const { target } = mutation;
		if (target.classList.contains("disabled-scrolling")) {
			target.addEventListener("click", closeEvent);
			return;
		}
		target.removeEventListener("click", closeEvent);
	}
};
const obs = new MutationObserver(callback);
obs.observe(document.body, config);
