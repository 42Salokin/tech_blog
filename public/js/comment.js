document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.querySelector(".comment-form");
  const leaveComment = document.getElementById("comment");

  if (leaveComment) {
    commentForm.style.display = "none";

    leaveComment.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      leaveComment.style.display = "none";
      commentForm.style.display = "block";
    });
  }

  if (commentForm) {
    commentForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent form submission
      // You can handle the form data here, for example:
      const commentText = document.getElementById("comment-text").value;
      // const username = req.session.username;
      const date = new Date().toISOString();
      const parentElement = event.target.closest('.post');
      const postId = parentElement.dataset.postId;

      console.log(commentText);
      // console.log(username);
      console.log(date);
      console.log(postId);

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
          // Optionally handle success, e.g., clear the form, hide the form, show a success message, etc.
          // commentForm.style.display = "none";
          // leaveComment.style.display = "block";
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

