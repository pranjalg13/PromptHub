function getAllPrompts() {
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;
  const endpointURL =
    "https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-xwjfPxjq/endpoint/v1/getAllPrompts";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", endpointURL, true);
  xhr.setRequestHeader("endpoint-type", "draft");
  xhr.setRequestHeader(
    "Authorization",
    `Basic ${btoa(`${publicKey}:${privateKey}`)}`
  );

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      // Process the response data here
    } else {
      console.error("Error:", xhr.status, xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send();
}

// Call the function
getAllPrompts();
