// Get the output table body element
const output = document.getElementById("output");

// 1. Add the default "Loading..." row
output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

// 2. Helper function to create a promise with a random delay
function createPromise(promiseName) {
  return new Promise((resolve) => {
    // Generate a random time between 1 and 3 seconds
    const timeInSeconds = (Math.random() * 2 + 1).toFixed(3);
    
    // setTimeout expects milliseconds, so we multiply by 1000
    setTimeout(() => {
      resolve({ name: promiseName, time: timeInSeconds });
    }, timeInSeconds * 1000);
  });
}

// Track the start time so we can calculate the true total time later
const startTime = performance.now();

// 3. Execute all 3 promises in parallel
Promise.all([
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3")
]).then((results) => {
  
  // Calculate the total execution time in seconds
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  // 4. Remove the "Loading..." text by clearing the innerHTML
  output.innerHTML = "";

  // 5. Loop through the resolved results and add a row for each
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
    output.appendChild(row);
  });

  // 6. Add the final row displaying the total time
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
  output.appendChild(totalRow);
  
});