// app.js

async function getSolution() {
  const message = document.getElementById('message').value;
  console.log('User input:', message);

  try {
    const response = await fetch('/getSolution', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    console.log('Solution:', data);
    // You can display the solution in the DOM if needed
    document.querySelector('.chat-area').innerHTML = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('There was an error!', error);
  }
}
