document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the delete buttons
    const deleteButtons = document.querySelectorAll("#delete-btn");

    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener("click", async (event) => {
                event.preventDefault(); // Prevent default behavior of the button click
                
                // Get the ID of the element to be deleted
                const parentElement = event.target.closest('.post'); 
                const postId = parentElement.dataset.postId; 
                console.log(postId);

                try {
                    // Send a DELETE request to the backend
                    const response = await fetch(`/dashboard/${postId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        // Force a page reload
                        document.location.replace('/dashboard');
                        console.log(response);
                    } else {
                        console.error('Failed to delete post', response);
                    }
                } catch (error) {
                    console.error('Error deleting post', error);
                }
            });
        });
    }
});