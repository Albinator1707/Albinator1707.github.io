const main = document.querySelector(".wrapper"),
	percent = document.querySelectorAll(".skills__percent"),
	listOfCircles = [...document.querySelectorAll(".circle")],
	pageUpButton = document.querySelector(".pageup");
let timer = [],
	counter = 0;

const setPerc = (value, i) => {
	const arr = [...percent];
	counter++;
	arr[i].textContent = `${counter}%`;
	if (counter == value) clearInterval(timer[i]);
};

const pageUpButtonOpacity = () => {
	let currScrollPos =
		window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	pageUpButton.style.opacity = -currScrollPos / 1600 + 2;
};

const addLeftToRightAnimation = (items, min, max) => {
	let cur = 0,
		delay = 0.5;
	if (main.scrollTop > min && main.scrollTop < max) {
		items.forEach((el, i) => {
			if (i === 0) {
				el.style.setProperty("animation-delay", 0 + "s");
				el.style.setProperty("display", "block");
				el.classList.add("active");
			} else {
				el.style.setProperty("animation-delay", cur + delay + "s");
				cur += delay;
				el.style.setProperty("display", "block");
				el.classList.add("active");
			}
		});
	} else {
		items.forEach((el) => {
			el.style.setProperty("display", "none");
			el.classList.remove("active");
		});
	}
};

const scrollEvent = () => {
	const dash = listOfCircles.map((el) => {
		const style = getComputedStyle(el);
		return style.strokeDashoffset;
	});

	let currScrollPos = main.scrollTop || 0;

	if (main.scrollTop > 1600) {
		listOfCircles.forEach((el, i) => {
			el.style.setProperty("--stroke-dashoffset", dash[i]);
			el.classList.add("active");
			if (!timer[i]) {
				timer[i] = setInterval(
					() =>
						setPerc(
							document
								.querySelectorAll(".skills__percent")
								[i].getAttribute("data-value"),
							i
						),
					100
				);
			}
		});
		pageUpButton.style.opacity = -2200 / currScrollPos + 2;
		console.log(-2200 / (currScrollPos - 300) + 2);
	} else {
		listOfCircles.forEach((el) => {
			el.classList.remove("active");
			pageUpButton.style.opacity = 0;
		});
	}

	const diplomasElements = [...document.querySelectorAll(".diplomas-item")];
	addLeftToRightAnimation(diplomasElements, 900, 1500);

	const languageElements = [...document.querySelectorAll(".languages-item")];
	addLeftToRightAnimation(languageElements, 1700, 3000);
};

main.addEventListener("scroll", scrollEvent);

$(".slider").slick({
	infinite: true,
	slidesToShow: 7,
	slidesToScroll: 7,
	prevArrow:
		'<div class="slider__arrow_left"><img src="icons/arrow_left.png" alt="arrow_left"></div>',
	nextArrow:
		'<div class="slider__arrow_right"> <img src="icons/arrow_right.png" alt="arrow_right"></div>',
});

const buttonProjects = document.querySelector(".projects__button");
const projectsList = [...document.querySelectorAll(".projects-item")];

const expandBlockEvent = () => {
	projectsList.forEach((el) => {
		if (el.className.includes("expand")) {
			if (el.style.display === "inline-block") {
				el.style.opacity = "0";
				el.style.animation = "expandBlocksClose 0.5s";
				buttonProjects.lastElementChild.innerHTML = "VIEW&nbsp;ALL&nbsp;PROJECTS";
				window.setTimeout(() => {
					el.style.display = "none";
				}, 200);
			} else {
				el.style.display = "inline-block";
				el.style.animation = "expandBlocks 0.5s";
				el.style.opacity = "1";
				buttonProjects.lastElementChild.innerHTML = "HIDE&nbsp;ALL&nbsp;PROJECTS";
			}
		}
	});
};

buttonProjects.addEventListener("click", expandBlockEvent);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});
