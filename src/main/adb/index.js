import adb from 'adbkit'
const client = adb.createClient()
const debug = require('debug')('scrcpy')

const onDevices = sender => {
	client.trackDevices()
		.then(function (tracker) {
			tracker.on('add', function (device) {
				debug('Device %s was plugged in', device.id)
				client.listDevices().then(function (devices) {
					debug(devices)
					sender.send('devices', devices)
				})
			})
			tracker.on('remove', function (device) {
				debug('Device %s was unplugged', device.id)
				client.listDevices().then(function (devices) {
					debug(devices)
					sender.send('devices', devices)
				})
			})
			tracker.on('end', function () {
				debug('Tracking stopped')
			})
		})
		.catch(function (err) {
			debugor('Something went wrong:', err.stack)
		})
}
const connect = ({ sender }, args) => {
	const { id, ip } = args
	const success = 'Successfully opened wireless connection'
	const fail = 'Failed to open wireless connection'
	if (id) {
		client.tcpip(id)
			.then(function (port) {
				client.connect(ip, port).then(function (err) {
					if (err) {
						sender.send('connect', { success: false, message: fail })
						return
					}
					sender.send('connect', { success: true, message: success })
				}).catch(() => {
					sender.send('connect', { success: false, message: fail })
				})
			}).catch(() => {
				client.connect(ip).then(function (err) {
					if (err) {
						sender.send('connect', { success: false, message: fail })
						return
					}
					sender.send('connect', { success: true, message: success })
				}).catch(() => {
					sender.send('connect', { success: false, message: fail })
				})
			})
	} else {
		client.connect(ip).then(function (err) {
			if (err) {
				sender.send('connect', { success: false, message: fail })
				return
			}
			sender.send('connect', { success: true, message: success })
		}).catch(() => {
			sender.send('connect', { success: false, message: fail })
		})
	}
}

const disconnect = ({ sender }, ip) => {
	client.disconnect(ip).then(id => {
		debug(id)
		sender.send('connect', { success: false, message: 'Device shutdown succeeded' })
	}).catch(err => {
		debug(err)
		sender.send('connect', { success: false, message: 'Device shutdown failed' })
	})
}

const installApp=({ sender }, options) => {
	const args = []
	// console.log(options);
	const { appLocation, devices } = options
	for (let item in devices) {
		// 安装apk

		client.install(devices[item], appLocation).then(function() {
			sender.send('msg',{success:true,msg:devices[item]+'  app安装成功'})
		}).catch(function(err) {
			sender.send('msg',{success:false,msg:devices[item]+'  app安装失败'})
		})
		// 推送文件 并进行安装

		// client.push(item, appLocation,'/sdcard/app-release.apk').then(function(transfer){
		// 	transfer.on('end', function() {
		//
		// 		client.installRemote(item,'/sdcard/app-release.apk')
		// 	})
		// })

		// vivo无法进行pm install安装
		// let model = ''
		// client.shell(item, 'getprop ro.product.model')
		// 	.then(adb.util.readAll)
		// 	.then(function(output) {
		//
		// 		model = output.toString().trim()
		//
		// 		if (model.indexOf('vivo')!= -1){
		// 			client.install(item, appLocation)
		// 		} else{
		// 			client.push(item, appLocation,'/sdcard/app-release.apk').then(function(transfer){
		// 				transfer.on('end', function() {
		// 					client.installRemote(item,'/sdcard/app-release.apk')
		// 				})
		// 			})
		// 		}
		// 	})
		// console.log(model)


		// shell 方式安装
		// client.push(item, appLocation,'/sdcard/app-release.apk').then(function(transfer){
		// 	transfer.on('end', function() {
		// 		client.shell(item,"pm install -r /sdcard/app-release.apk")
		// 			.then(adb.util.readAll)
		// 			.then(function(output) {
		// 			console.log('[%s] %s', item, output.toString().trim())
		// 		})
		// 	})
		// })
	}

}

export default {
	connect, disconnect, onDevices,installApp
}
