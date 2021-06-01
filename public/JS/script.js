const savePost = document.getElementById('postSave');
const updateBtn = document.getElementById('updateSave');
const deleteBtns = document.querySelectorAll(".deleteBtn");

const createAndEditPost = async (e) => {
    e.preventDefault();

    let methodToUse;
    let queryString;

    if (savePost) {
        methodToUse = "POST";
        queryString = "api/posts"
    } else if (updateBtn) {
        methodToUse = "PUT";
        const ID = parseInt(updateBtn.getAttribute("data-post"));
        queryString = `/api/posts/${ID}`;
    }

    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postDescription').value;

    if (title && description) {
        const response = await fetch(queryString, {
            method: methodToUse,
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace("/dashboard")

        } else {
            const p = document.createElement("p");
            p.textContent = "Fill out title and description."
            p.setAttribute("class", "red has-text-centered ml-5");

            document.getElementById("form").appendChild(p);
        }
    }
}

const deletePost = async function (e) {
    e.preventDefault();

    const ID = parseInt(this.getAttribute("data-post"));

    const deleteFetch = await fetch(`api/posts/${ID}`, {
        method: "DELETE"
    })

    if (deleteFetch.ok) {
        document.location.replace("/dashboard");
    } else {
        console.log("You suck.");
    }
}


if (savePost) savePost.addEventListener("click", createAndEditPost);
if (updateBtn) updateBtn.addEventListener("click", createAndEditPost);
if (deleteBtns) {
    for (const btn of deleteBtns) btn.addEventListener("click", deletePost);
}