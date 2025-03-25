# CopyCookies Chrome Extension

Copy all cookies used in the current tab to the clipboard.

You can invoke this extension using the shortcut key `Ctrl+Shift+K`. It functions similarly to the export feature of [EditThisCookie](http://editthiscookie.com/). The copied cookie objects, formatted in JSON, can be used with tools like [puppeteer](https://github.com/puppeteer/puppeteer).

For example, the cookies will be copied in a JSON format like this:

```json
[[
  {
    "domain": ".example.com",
    "expirationDate": 1777466749.229935,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_sess_id",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "abcd1234-5678-90ef-ghij-klmnopqrstuv"
  },
  {
    "domain": ".example.com",
    "expirationDate": 1750682748,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_tracking_id",
    "path": "/",
    "sameSite": "lax",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "trk.1.1700000000000.123456789012345678"
  },
  ...
]
```

## Code Reference

The following code snippet (from `popup.js`) demonstrates the updated implementation. It uses `currentWindow: true` for reliably obtaining the active tab and leverages the modern Clipboard API with async/await to copy the cookies:

```js
(async function() {
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
	if (tab.url) {
		chrome.cookies.getAll({ "url": tab.url }, async cookies => {
			try {
				await navigator.clipboard.writeText(JSON.stringify(cookies));
				console.log("Cookies copied to clipboard.");
			} catch (err) {
				console.error("Failed to copy cookies: ", err);
			}
		});
	} else {
		console.error("Unable to retrieve the tab URL.");
	}
})();
```

## Privacy Policy

This extension requires the following permissions:

- **cookies**: To access and retrieve cookies from the current tab.
- **clipboardWrite**: To copy the cookies to the clipboard.
- **host_permissions**: To allow the extension to retrieve cookies from any site (`*://*/*`).  
  **Note:** This permission does not allow the extension to view your currently open websites in real time. It only enables cookie retrieval from any site when the extension is activated by the user.

### Data Collection

This extension does **not** collect, store, or transmit any user data. All operations are performed locally within your browser. The extension accesses cookies from the current tab only when explicitly triggered by the user, immediately copying them to the clipboard without storing any data.

## Security

This extension is open source. You can review the code in the [CopyCookies GitHub Repository](https://github.com/sammrai/copycookies.git) to ensure its safety. All operations are performed entirely within your local browser environment, and no data is transmitted to external servers.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](./LICENSE) file for details.