async function editFormHandler(event) {
    event.preventDefault();
  
    document.location.replace('edit-post');
  }
  
  document.querySelector('.edit-post').addEventListener('click', editFormHandler);