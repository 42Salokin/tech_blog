document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.querySelector(".comment-form");
    const leaveComment = document.getElementById("comment");

    if (leaveComment) {
      commentForm.style.display = "none";

      leaveComment.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        leaveComment.style.display = "none";
        commentForm.style.display = "block";
      });
    }

    if (commentForm) {
      commentForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        // You can handle the form data here, for example:
        const commentText = document.getElementById("comment-text").value;
        // const username = req.session.username;
        const date = new Date().toISOString();

        console.log(commentText); 
        // console.log(username);
        console.log(date);

        commentForm.style.display = "none";
        leaveComment.style.display = "block";
      });
    }
  });

