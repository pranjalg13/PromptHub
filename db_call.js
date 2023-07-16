function getAllPrompts() {
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;
  const endpointURL =
    "https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-xwjfPxjq/endpoint/v1/getAllPrompts";

  const authHeader = `Basic ${btoa(`${publicKey}:${privateKey}`)}`;

  fetch(endpointURL, {
    method: "GET",
    headers: {
      "endpoint-type": "draft",
      Authorization: authHeader,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      console.log(data);
      // Process the response data here
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

function addPrompt(prompt, tags, title) {
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;
  const endpointURL =
    "https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-xwjfPxjq/endpoint/v1/addPrompt";

  const authHeader = `Digest ${btoa(`${publicKey}:${privateKey}`)}`;

  const postData = JSON.stringify({
    prompt,
    tags,
    title,
  });

  fetch(endpointURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "endpoint-type": "draft",
      Authorization: authHeader,
    },
    body: postData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Process the response data here
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Call the function
getAllPrompts();

// Example usage
const prompt = "Enter your prompt here!";
const tags = "chatgpt,prompts";
const title = "Best Prompts for ChatGPT";

addPrompt(prompt, tags, title);
