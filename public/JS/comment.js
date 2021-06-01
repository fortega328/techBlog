const commentBtn = document.getElementById('commentBtn');
const deleteCommentBtns = document.querySelectorAll('.deleteCommentBtns');

const submitComment = async (e) => {
    e.preventDefault();

    const commentText = document.getElementById("commentText").value;
    const postID = parseInt(commentBtn.getAttribute("data-id"));

    const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({ commentText, postID }),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        console.log("You suck.")
    }
}

const deleteComment = async function (e) {
    e.preventDefault();

    const ID = parseInt(this.getAttribute("data-id"));

    const response = await fetch(`/api/comment/${ID}`, {
        method: "DELETE"
    })

    if (response.ok) {
        document.location.reload();
    } else {
        console.log("You suck.")
    }
}

if (commentBtn) commentBtn.addEventListener("click", submitComment)
if (deleteCommentBtns) {
    for (const btn of deleteCommentBtns) btn.addEventListener("click", deleteComment);
}