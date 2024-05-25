// Takes input from post edit and sends PUT request to controller to update post in db
const editPostHandler = async (event) => {
    event.preventDefault();
  
    const postId = document.querySelector('.form-group').dataset.postId;
    const title = document.querySelector('#title-text').value.trim();
    const content = document.querySelector('#content-text').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch(`/api/post/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const result = await response.json();
          alert(result.message || 'Failed to update post');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to update the post.');
      }
    } else {
      alert('Please fill out both the title and content fields.');
    }
  };
  
  document
    .querySelector('.editPost-form')
    .addEventListener('submit', editPostHandler);
  