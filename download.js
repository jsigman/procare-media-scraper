var elements = document.querySelectorAll(".gallery__item-download");
var delay = 0; // Delay counter

elements.forEach(function (element) {
    setTimeout(async function () {
        // Extract the image URL
        var imageUrl = element.getAttribute("href");

        // Extract the timestamp from the URL query string
        var timestampMatch = imageUrl.match(/(\d+)$/);
        var unixSeconds = timestampMatch
            ? parseInt(timestampMatch[1], 10)
            : Math.floor(Date.now() / 1000); // Fallback to current time if no timestamp

        // Extract the original filename (UUID or other identifier) from the URL path
        var originalFilenameMatch = imageUrl.match(/\/([^\/?]+)\.jpg/); // Matches the last part before .jpg
        var originalFilename = originalFilenameMatch
            ? originalFilenameMatch[1]
            : "unknown"; // Fallback if no match

        // Format the filename to include both original name and timestamp
        var formattedDate = new Date(unixSeconds * 1000)
            .toISOString()
            .replace(/[-:T]/g, "")
            .slice(0, 15); // Format: YYYYMMDDHHMMSS
        var filename = `${originalFilename}_img_${unixSeconds}_photo.jpg`;

        try {
            // Fetch the image data manually to bypass content-disposition headers
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // Create and trigger the download using a Blob
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename; // Enforce unique filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(blobUrl);
            console.log(`Downloaded: ${filename}`);
        } catch (error) {
            console.error(`Failed to download ${filename}:`, error);
        }
    }, delay);

    // Increase the delay for the next download
    delay += 1000; // 1-second delay between downloads
});
