const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-text').value.trim();
    const content = document.querySelector('#content-text').value.trim();
    const date = new Date().toISOString();
  
    if (title && content) {
      const response = await fetch('/api/post/newPost', {
        method: 'POST',
        body: JSON.stringify({ title, content, date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.newPost-form')
    .addEventListener('submit', newPostHandler);