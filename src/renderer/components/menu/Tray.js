import { remote } from 'electron'
const { Tray, getCurrentWindow } = remote
const window = getCurrentWindow()
const tray = new Tray(`${__static}/icons/256x256.png`)

export default Menu => {
	const menu = Menu(tray,
			{ label: 'tray.show', click() { window.show() } },
			{ label: 'tray.hide', click() { window.hide() } },
			{ label: 'tray.exit', click() { window.destroy() } }
		)

	tray.setContextMenu(menu)
	tray.setTitle('ScrcpyGui')
	tray.setToolTip('ScrcpyGui')
	tray.on('right-click', () => {
		tray.popUpContextMenu(menu)
	})
	tray.on('click', () => {
		window.isVisible() ? window.hide() : window.show()
		window.isVisible() ? window.setSkipTaskbar(false) : window.setSkipTaskbar(true);
		// window.show()
	})
	return tray
}
