// On load, connects to leave comment button and new comment form
document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.querySelector(".comment-form");
  const leaveComment = document.getElementById("comment");
// If leave comment button is displayed, hides new comment form
  if (leaveComment) {
    commentForm.style.display = "none";
// When button is clicked, hides button and displays new comment form
    leaveComment.addEventListener("click", function (event) {
      event.preventDefault(); 

      leaveComment.style.display = "none";
      commentForm.style.display = "block";
    });
  }
// When new comment form is submitted, sends data to controller to store in db, 
// reloads page with new comment displayed on post
  if (commentForm) {
    commentForm.addEventListener("submit", async function (event) {
      event.preventDefault(); 

      const commentText = document.getElementById("comment-text").value;
      const date = new Date().toISOString();
      const parentElement = event.target.closest('.post');
      const postId = parentElement.dataset.postId;

      try {
        const response = await fetch('/post/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            commentText,
            postId,
            date
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Comment added:', result);
          document.location.replace(`/post/${result.postId}`);
        } else {
          console.error('Failed to add comment');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    });
  }
});

