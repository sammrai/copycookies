(async function() {
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
	chrome.cookies.getAll({"url": tab.url}, async cookies => {
		try {
			await navigator.clipboard.writeText(JSON.stringify(cookies));
			console.log("Cookies copied to clipboard.");
		} catch (err) {
			console.error("Failed to copy cookies: ", err);
		}
	});
})();
