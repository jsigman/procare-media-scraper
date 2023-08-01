var elements = document.querySelectorAll(".gallery__item-download");
var delay = 0; // Delay counter

elements.forEach(function (element) {
  setTimeout(function () {
    var imageUrl = element.getAttribute("download");

    // Create a new download link element
    var link = document.createElement("a");
    link.href = imageUrl;
    link.download = ""; // The file will be downloaded with its original name

    // Trigger click event on the link
    link.style.display = "none"; // Hide the link
    document.body.appendChild(link); // Append to document
    link.click(); // Simulate click
    document.body.removeChild(link); // Clean up and remove the link
  }, delay);

  // Increase the delay for the next download
  delay += 1000; // 1 second delay between each download
});
