function addDestination(destination) {
  fetch("/add-to-wanttogo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination: destination }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(
          `Successfully added ${data.destination} to your Want-to-Go list!`
        );
      } else {
        alert(`Failed to add destination: ${data.error || "Unknown error"}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while adding the destination.");
    });
}
