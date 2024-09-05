// - // -  // -  // - // -  // -  // - // -  // REFERENZEN
const body = document.body;
const dialog = document.querySelector("dialog");
const container = document.getElementById("container");

// variable containing a function which checks the validity of certain given values
const stringValidated = (str) => typeof str === "string" && str.length > 0;

// wo meine jsonDatei zu finden ist
const url = "../dummyPosts.json";

// - // -  // -  // - // -  // -  // - // -  // FETCH FUNCTION

fetch(url)
	.then((res) => res.json())
	.then(renderPosts)
	.catch((error) => console.log(error));

// - // -  // -  // - // -  // -  // - // -  // CREATE FUNCTION

// define a create function
function create(tag, parent, options = {}) {
	const e = document.createElement(tag);
	const { innerText, className, src } = options;

	if (stringValidated(innerText)) {
		e.innerText = innerText;
	}

	if (stringValidated(className)) {
		const classes = className.split(" ");
		e.classList.add(...classes);
	}

	if (stringValidated(src)) {
		const img = document.createElement("img");
		img.src = src;
		e.appendChild(img);
	}

	parent.appendChild(e);
	return e;
}

// - // -  // -  // - // -  // -  // - // -  // RENDER FUNCTION

// prepare the forEach loop
function renderPosts(posts) {
	posts.forEach((post) => {
		// create button to display some of the cards infos
		const btn = create("button", container, {
			innerText: `Post ${post.id}
        `,
			className:
				"main-btn focus:outline-primary rounded-lg text-secondary p-4 font-bold",
		});

		// create paragraph intro
		const postBody = create("p", btn, {
			innerText:
				post.body.length > 150
					? post.body.slice(0, 150) +
					  `... 
      READ THE WHOLE POST`
					: post.body,
			className: "rounded-lg text-primary p-6 leading-8 font-light",
		});

		// create tags element
		const bodyTags = create("div", btn, {
			innerText: post.tags.join(` | `), // `${post.tags}` this will give me all of the tags from all the posts,
			className: "body-tags pt-8 font-semibold",
		});

		// direct each button to the modal
		btn.addEventListener("click", () => {
			dialog.showModal();
			showModalDetails(post);
			console.log(`${post.id} button clicked`);
		});
	});

	// - // -  // -  // - // -  // -  // - // -  // MODAL FUNCTION

	// create the function for the modal
	function showModalDetails(post) {
		// reset content
		dialog.innerHTML = "";

		// create and display new elements (picture, title, full paragraph, close button)
		const picFrame = create("div", dialog, {
			className:
				"pic-frame flex flex-row-reverse text-center sm:p-4 md:p-8 m-4 font-bold text-xl",
			src: post.picture,
		});

		const postTitle = create("h1", picFrame, {
			innerText: `${post.title}`,
			className: "post-title text-center p-8 m-4 font-bold text-xl",
		});

		const postBody = create("p", dialog, {
			innerText: post.body,
			className: "px-8 m-4 text-lg text-justify self-center",
		});

		let closeModalBtn = create("button", dialog, {
			innerText: "Close",
			className:
				"modal-btn m-8 py-4 px-8 font-semibold hover:underline hover:bg-orange-600 hover:text-white rounded-lg",
		});

		// - // -  // -  // - // -  // -  // - // -  // EVENT LISTENER

		// close modal with the close button, clicking on the overlay or pressing the escape key
		dialog.addEventListener("click", (e) => {
			let target = e.target;
			if (target === dialog || target === closeModalBtn || e.key === "Escape") {
				dialog.close();
			}
		});
	}
}
