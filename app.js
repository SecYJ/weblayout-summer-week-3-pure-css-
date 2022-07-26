const header = document.querySelector("#header");
const banner = document.querySelector("#banner");

header.addEventListener("click", (e) => {
	if (e.target.closest("#nav-menu-btn")) {
		document.querySelector("#backdrop").classList.toggle("show");
		document.querySelector("#nav-mobile").classList.toggle("open");
		document.body.classList.add("disabled-scrolling");
	}
});

// intersection observer for navbar

const observerOption = {
	threshold: 0,
	rootMargin: "-80px",
};

let observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		const { isIntersecting } = entry;
		if (!isIntersecting) {
			header.classList.add("sticky");
			return;
		}
		header.classList.remove("sticky");
	});
}, observerOption);

observer.observe(banner);

const closeEvent = (e) => {
	// console.log(e.target);
	// console.log(!e.target.closest("#nav-mobile"));
	// console.log("hi");
	if (!e.target.closest("#nav-mobile")) {
		document.querySelector("#backdrop").classList.remove("show");
		document.body.classList.remove("disabled-scrolling");
		document.querySelector("#nav-mobile").classList.remove("open");
	}
};

// mutation observer for observing DOM changes
const targetNode = document.body;
const config = { attributes: true, childList: false, subtree: false };

const callback = (mutationList, observer) => {
	const navMobile = document.querySelector("#nav-mobile");
	for (const mutation of mutationList) {
		const { target } = mutation;
		// if (target.classList.contains("disabled-scrolling")) {
		// 	document.body.addEventListener("click", closeEvent, {
		// 		capture: true,
		// 	});
		// } else {
		// 	document.body.removeEventListener("click", closeEvent);
		// }
		// if (!target.classList.contains("disabled-scrolling")) return;
		if (target.classList.contains("disabled-scrolling")) {
			document.body.addEventListener("click", closeEvent);
			// console.log(target);
			document.body.addEventListener("click", closeEvent);
		} else {
			document.body.removeEventListener("click", closeEvent);
		}
	}
};

const obs = new MutationObserver(callback);
obs.observe(targetNode, config);
