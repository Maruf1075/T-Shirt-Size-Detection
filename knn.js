function resetall() {
    const sizeImage = document.getElementById('sizeImage');
    sizeImage.innerText = "";
    document.getElementById("ts-form").reset();
}
function calculateSize() {

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const k = parseInt(document.getElementById('k').value);

    
    if (k <= 0) {
        const sizeImage = document.getElementById('sizeImage');
        sizeImage.innerText = "K value should be greater than zero ( 0 )";
        return;
    }

    if (k > 11) {
        const sizeImage = document.getElementById('sizeImage');
        sizeImage.innerText = "K value should be less than 11";
        return;
    }

    if (k % 2 == 0) {
        const sizeImage = document.getElementById('sizeImage');
        sizeImage.innerText = "K value should be ODD";
        return;
    }

    if (height < 60) {
        const sizeImage = document.getElementById('sizeImage');
        sizeImage.innerText = "Height should be greater than 60cm !!";
        return;
    }

    if (weight < 20) {
        const sizeImage = document.getElementById('sizeImage');
        sizeImage.innerText = "Weight should be greater than 20kg !!";
        return;
    }
    
    // Implement KNN algorithm here using the tshirtData
    // For simplicity, let's assume a simple Euclidean distance metric.

    // Calculate distances between input and all data points
    const distances = tshirtData.map(data => ({
        data,
        distance: Math.sqrt((data.height - height) ** 2 + (data.weight - weight) ** 2)
    }));
    
    // Sort distances in ascending order
    distances.sort((a, b) => a.distance - b.distance);

    // Get the top K closest data points
    const nearestNeighbors = distances.slice(0, k);

    // Count the occurrences of each size in nearestNeighbors
    const sizeCounts = {};

    nearestNeighbors.forEach(neighbor => {
        if (sizeCounts[neighbor.data.size]) {
            sizeCounts[neighbor.data.size]++;
        } else {
            sizeCounts[neighbor.data.size] = 1;
        }
    });

    // Find the size with the highest count
    let recommendedSize = Object.keys(sizeCounts)[0];
    let maxCount = sizeCounts[recommendedSize];
    for (const size in sizeCounts) {
        if (sizeCounts[size] > maxCount) {
            recommendedSize = size;
            maxCount = sizeCounts[size];
        }
    }

    // Display the recommended size
    const sizeImage = document.getElementById('sizeImage');
    sizeImage.innerText = `Recommended T-shirt Size:  ${recommendedSize}`;
    // sizeImage.alt = `T-shirt Size: ${recommendedSize}`;
}
