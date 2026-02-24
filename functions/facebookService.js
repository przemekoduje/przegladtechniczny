/**
 * facebookService.js
 * Handles communication with the Meta Graph API to post content to a Facebook Page.
 */

/**
 * Posts a message and a link to a Facebook Page feed.
 * @param {string} pageId - The ID of the Facebook Page.
 * @param {string} pageAccessToken - A long-lived Page Access Token.
 * @param {string} message - The caption for the post.
 * @param {string} link - The URL to share.
 * @returns {Promise<Object>} - The JSON response from Meta Graph API.
 */
async function postToPage(pageId, pageAccessToken, message, link) {
  const url = `https://graph.facebook.com/v21.0/${pageId}/feed`;
  
  console.log(`Posting to Facebook Page: ${pageId}...`);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      link: link,
      access_token: pageAccessToken,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error("Facebook API error:", data);
    throw new Error(`Facebook API error: ${data.error?.message || "Unknown error"}`);
  }

  console.log("Successfully posted to Facebook:", data.id);
  return data;
}

module.exports = {
  postToPage,
};
