document.addEventListener('DOMContentLoaded', function() {
    const postDivs = document.querySelectorAll('.post');
    
    postDivs.forEach(postDiv => {
        postDiv.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default behavior of following the link
            const parentElement = event.target.closest('.post'); 
            const postId = parentElement.dataset.postId; 
            console.log(postId);
            document.location.replace(`/post/${postId}`);

            // try {
            //     const response = await fetch(`/api/post/${postId}`, {
            //         method: 'GET',
            //         headers: { 'Content-Type': 'application/json' },
            //     });
            //     // if (response.ok) {
            //     //     console.log(response);
            //     //     // document.location.replace('/post');
            //     // } else {
            //     //     console.error('Failed to load post:', response.statusText);
            //     // }
            // } catch (error) {
            //     console.error('Error loading post:', error);
            // }
        });
    });
});

