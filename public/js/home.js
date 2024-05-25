// Listens for a click on a specific post, sends post's ID and request for post page to controller
document.addEventListener('DOMContentLoaded', function() {
    const postDivs = document.querySelectorAll('.post');
    
    postDivs.forEach(postDiv => {
        postDiv.addEventListener("click", (event) => {
            event.preventDefault(); 
            const parentElement = event.target.closest('.post'); 
            const postId = parentElement.dataset.postId; 
            console.log(postId);
            document.location.replace(`/post/${postId}`);
        });
    });
});