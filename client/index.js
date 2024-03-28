const form = document.querySelector("#userinfo");
const buttonText = document.querySelector("#register-text");
const loader = document.createElement("div");
loader.classList.add("loader");

async function registerUser() {
	const formData = new FormData(form);
	let serialized = Object.fromEntries(formData);
	let stringifiedData = JSON.stringify(serialized);
	let theDiv;
	let newContent;
	let newElem;

	try {
		buttonText.replaceWith(loader);
		const response = await fetch("http://localhost:5000/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: stringifiedData,
		});

		const data = await response.json();
		loader.replaceWith(buttonText);

		if (data.errors) {
			console.log(data.errors);
			const err = data.errors.details[0];
			console.log(err);
			theDiv = document.querySelector("#error-msg");
			newElem = document.createElement("p");
			newElem.setAttribute("id", "alert");
			newContent = document.createTextNode(err.message);
			newElem.appendChild(newContent);
			theDiv.appendChild(newElem);
			theDiv.classList.remove("hide");
		} else {
			theDiv = document.querySelector("#success-msg");
			newElem = document.createElement("p");
			newElem.setAttribute("id", "alert");
			newContent = document.createTextNode(data.message);
			newElem.appendChild(newContent);
			theDiv.appendChild(newElem);
			theDiv.classList.remove("hide");
		}

		setTimeout(() => {
			const alert = document.querySelector("#alert");
			theDiv.classList.add("hide");
			alert.remove();
		}, 3500);
	} catch (e) {
		console.error(e);
	}
}

// Take over form submission
form.addEventListener("submit", (ev) => {
	ev.preventDefault();
	registerUser();
});
