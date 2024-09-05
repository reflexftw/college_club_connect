document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const postData = {
      content: formData.get('post-content')
};
try {
    const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
      
if (response.ok) {
        alert('Post submitted successfully');
        document.getElementById('post-content').value = ''; // Clear the textarea after submission
      } else {
        throw new Error('Failed to submit post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post');
    }
  });