<template>
	<el-card>
		<el-form ref="form" :model="config" label-width="110px">


			<el-form-item :label="$t('configuration.record.label')">
				<el-switch
					@change="tip($t('configuration.record.tip'), config.record.open === true)"
					v-model="config.record.open"
				></el-switch
				>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
				<el-checkbox v-model="config.record.openMirror" :disabled="!config.record.open">{{
					$t('configuration.record.mirror')
				}}</el-checkbox>
			</el-form-item>
			<el-form-item :label="$t('configuration.record.filepath')">
				<el-tooltip
					class="item"
					effect="dark"
					:content="$t('configuration.record.tooltip')"
					placement="top"
					:disabled="!config.record.open"
				>
					<el-input
						v-model="config.record.filepath"
						prefix-icon="el-icon-location-information"
						:disabled="!config.record.open"
						clearable
					></el-input>
				</el-tooltip>
			</el-form-item>
			<el-form-item :label="$t('configuration.colNum.label')">
				<el-popover placement="top-start" :content="$t('configuration.colNum.popover')" width="250" trigger="focus">
					<el-slider slot="reference" v-model.number="config.colNum" :max="10" :min="3" show-input></el-slider>
				</el-popover>
			</el-form-item>
			<el-form-item :label="$t('configuration.bitRate.label')">
				<el-popover placement="top-start" :content="$t('configuration.bitRate.popover')" width="250" trigger="focus">
					<el-slider slot="reference" v-model.number="config.bitRate" :max="1024" :min="1" show-input></el-slider>
				</el-popover>
			</el-form-item>

			<el-form-item :label="$t('configuration.maxSize.label')">
				<el-popover placement="top-start" :content="$t('configuration.maxSize.popover')" width="250" trigger="focus">
					<el-slider slot="reference" v-model.number="config.maxSize" :max="1920" :min="0" show-input></el-slider>
				</el-popover>
			</el-form-item>

			<el-form-item :label="$t('configuration.crop.label')">
				<el-popover placement="top-start" :content="$t('configuration.crop.x')" width="200" trigger="hover">
					<el-input-number slot="reference" size="mini" v-model="config.crop.x"></el-input-number>
				</el-popover>
				<el-popover placement="top-start" :content="$t('configuration.crop.y')" width="200" trigger="hover">
					<el-input-number slot="reference" size="mini" v-model="config.crop.y"></el-input-number>
				</el-popover>
				<el-popover
					placement="top-start"
					:title="$t('configuration.crop.height.title')"
					:content="$t('configuration.crop.height.content')"
					width="200"
					trigger="hover"
				>
					<el-input-number slot="reference" size="mini" v-model="config.crop.height"></el-input-number>
				</el-popover>
				<el-popover
					placement="top-start"
					:title="$t('configuration.crop.width.title')"
					:content="$t('configuration.crop.width.content')"
					width="200"
					trigger="hover"
				>
					<el-input-number slot="reference" size="mini" v-model="config.crop.width"></el-input-number>
				</el-popover>
			</el-form-item>

			<el-form-item :label="$t('configuration.other.label')">
				<el-checkbox v-model="config.fixed"  size="medium">{{ $t('configuration.other.fixed') }}</el-checkbox>
				<el-checkbox v-model="config.control"  size="medium">{{ $t('configuration.other.control') }}</el-checkbox>
				<el-checkbox v-model="config.touch"  size="medium">{{ $t('configuration.other.touch') }}</el-checkbox>
				<el-checkbox v-model="config.render"  size="medium">{{ $t('configuration.other.render') }}</el-checkbox>
				<el-checkbox v-model="config.screen"  size="medium">{{ $t('configuration.other.screen') }}</el-checkbox>
			</el-form-item>
			<el-divider content-position="right">
				<el-button type="text" @click="changeLocale">中/English</el-button>
			</el-divider>
			<div style="margin:10px auto;text-align:center">
				<el-button type="primary" @click.native.prevent="save" plain v-waves>{{
					$t('configuration.button.save')
				}}</el-button>
				<el-button type="success" @click.native.prevent="setDefault" plain v-waves>{{
					$t('configuration.button.default')
				}}</el-button>
			</div>
		</el-form>
	</el-card>
</template>

<script>
export default {
	name: 'Config',
	data() {
		return {
			config: {


				record: {
					open: false,
					openMirror: true,
					filepath: 'C:/users/user/Desktop/file.mkv'
				},
				windowWidth:window.screen.width,
				windowHeight:window.screen.height,
				screen: false,
				fixed: false,
				control: true,
				touch: true,
				render: false,
				colNum:6,
				bitRate: 8,
				maxSize: 0,
				crop: {
					x: 0,
					y: 0,
					height: 0,
					width: 0
				}
			}
		}
	},
	created() {
		// if (this.$store.has('config')) {
		// 	this.config = this.$store.get('config')
		// } else {
		//
		// }
		this.$store.put('config', this.config)
	},
	methods: {
		tip(message, condition) {
			if (condition) {
				this.$notify.info(message)
			}
		},
		save() {
			this.$store.put('config', this.config)
			this.$notify.success(this.$t('configuration.notify.saveSuccess'))
		},
		setDefault() {
			this.config = {
				record: {
					open: false,
					openMirror: true,
					filepath: 'C:/users/user/Desktop/file.mkv'
				},
				windowWidth:window.screen.width,
				windowHeight:window.screen.height,
				screen: false,
				fixed: false,
				control: true,
				touch: true,
				render: false,
				colNum:6,
				bitRate: 8,
				maxSize: 0,
				crop: {
					x: 0,
					y: 0,
					height: 0,
					width: 0
				}
			}
			this.$store.put('config', this.config)
		},
		changeLocale() {
			localStorage.setItem('lang', this.$i18n.locale === 'zh' ? 'en' : 'zh')
			window.tray.destroy()
			window.location.reload()
		}
	}
}
</script>

<style>
.el-form-item {
	margin-bottom: 10px !important;
}
</style>
