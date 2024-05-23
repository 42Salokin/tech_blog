document.addEventListener('DOMContentLoaded', function() {
    const postDivs = document.querySelectorAll('.post');
    
    postDivs.forEach(postDiv => {
        postDiv.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default behavior of following the link
            const parentElement = event.target.closest('.post'); 
            const postId = parentElement.dataset.postId; 
            console.log(postId);
            document.location.replace(`/post/${postId}`);
        });
    });
});