document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const ISBN = document.getElementById('bookISBN').value;

    fetch('/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, ISBN }),
    })
    .then(response => response.json())
    .then(data => {
        alert(`Book "${data.title}" added to the library.`);
        document.getElementById('addBookForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const id = document.getElementById('userId').value;

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, id }),
    })
    .then(response => response.json())
    .then(data => {
        alert(`User "${data.name}" registered.`);
        document.getElementById('addUserForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('borrowBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('borrowUserId').value;
    const ISBN = document.getElementById('borrowISBN').value;

    fetch('/borrow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ISBN }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById('borrowBookForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('returnBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = document.getElementById('returnUserId').value;
    const ISBN = document.getElementById('returnISBN').value;

    fetch('/return', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ISBN }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById('returnBookForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
