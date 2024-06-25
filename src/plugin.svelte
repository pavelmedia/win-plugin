<div class="plugin__mobile-header">
	{config.title}
</div>
<section class="plugin__content">
	<div
		class="plugin__title plugin__title--chevron-back"
		on:click={() => bcast.emit('rqstOpen', 'menu')}
	>
		{config.title}
	</div>
	{#if locName}
		<h1>Location</h1>
		{locName}
		<h1>Temp Range</h1>
		{tempStr}
	{:else}
		Select location
	{/if}
	<div class="centered m-15">
		<button
			class="button button--variant-orange"
			class:button--loading={loader}
			on:click={getMyLoc}
		>
			Show my location
		</button>
	</div>
</section>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import bcast from '@windy/broadcast'
	import metrics from '@windy/metrics'
	import { getGPSlocation } from '@windy/geolocation'
	import { map, markers } from '@windy/map'
	import { isValidLatLonObj } from '@windy/utils'
	import { LatLon } from '@windy/interfaces'
	import * as reverse from '@windy/reverseName'
	import { singleclick } from '@windy/singleclick'
	import { getPointForecastData } from '@windy/fetch'
	import config from './pluginConfig'

	let marker: L.Marker | null = null
	let loader = false

	let locName = ''
	let tempStr = ''

	const getMyLoc = async () => {
		loader = true
		const loc = await getGPSlocation()
		loader = false
		if (loc) {
			const { lat, lon } = loc
			map.setView({ lat, lng: lon }, 8)
			initMarker({ lat, lon })
		}
	}

	const initMarker = ({ lat, lon }: LatLon) => {
		marker?.remove()

		marker = L.marker([lat, lon], {
			draggable: true,
			icon: markers.myLocationIcon,
		}).addTo(map)

		marker.on('dragend', event => {
			const { lat, lng } = event.target.getLatLng()
			initMarker({ lat, lon: lng })
		})

		reverse.get({ lat, lon }).then(obj => {
			locName = `${obj.name}, ${obj.country}`
		})

		getPointForecastData('ecmwf', { lat, lon }, config.name).then(({ data }) => {
			const obj = Object.values(data.summary)[0]
			tempStr =
				metrics.temp.convertValue(obj.tempMin) +
				' - ' +
				metrics.temp.convertValue(obj.tempMax)
		})
	}

	export const onopen = (location?: LatLon) => {
		if (isValidLatLonObj(location)) {
			initMarker(location)
		}
	}

	onMount(() => {
		singleclick.on(config.name, initMarker)
		// Your plugin was mounted
	})

	onDestroy(() => {
		singleclick.off(config.name, initMarker)
		marker?.remove()
	})
</script>

<style lang="less">
	// Put any LESS of CSS styles here
</style>
