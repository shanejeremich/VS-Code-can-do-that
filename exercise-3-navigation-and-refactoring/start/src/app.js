const API_BASE = "https://lifx-lamp-api.azurewebsites.net/api"

// define variables
let app = document.getElementById("app")
let goButton = document.getElementById("goButton")
let lampInput = document.getElementById("colorInput")
let currentColor = document.getElementById("currentColor")
let bulb = document.getElementById("bulb")
let online = window.navigator.onLine

class App {
	/**
	 * Initalize the page and websocket connection
	 */

	constructor() {
		const online = window.navigator.onLine

		goButton.addEventListener("click", async () => {
			console.blog()
			const color = lampInput.value
			this.setColor(color)
		})

		if (online) {
			this.init()
		} else {
			console.log("App is offline. Lamp API will not be used.")
		}
	}

	//#region Class stuff
	async init() {
		// initialize signalR hub (websockets connection)
		let connection = new signalR.HubConnectionBuilder()
			.withUrl(API_BASE)
			.build()

		// receives the "colorChanged" web socket event
		connection.on("colorChanged", hex => {
			// update the bulb color
			this.upDateColor(hex)
		})

		// start the websocket connection
		await connection.start()
	}
	upDateColor(hex) {
		bulb.style = `fill: #${hex};`
		currentColor.textContent = `#${hex}`
	}

	//#endregion

	/**
	 * Calls the API to update the lamp color
	 * @param {string} color
	 */
	async setColor(color) {
		const hexNoHash = color.substring(1, color.length)
		// if we're online, update the lamp
		if (online) {
			await fetch(`${API_BASE}/setColor?color=${hexNoHash}`)
		} else {
			// if we're offline, update the color
			bulb.style = `fill: #${hexNoHash};`
			currentColor.textContent = `#${hexNoHash}`
		}
	}
}

export default App
