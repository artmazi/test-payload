import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Divider, IconButton, Skeleton, Tooltip } from '@mui/material';
import { View, Map as olmap } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import TileWMS from 'ol/source/TileWMS.js';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { defaults as defaultControls } from 'ol/control';
import { Add, Delete, Remove, Undo } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface props {
	darkTheme: boolean;
	activeStep: number;
	polygonCordinates: any[];
	setPolygonCordinates: React.Dispatch<React.SetStateAction<any[]>>;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	setUserActivity: React.Dispatch<React.SetStateAction<boolean>>;
	userActivity: boolean;
	deletePolygon: boolean;
	setDeletePolygon: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DataMap({
	darkTheme,
	setZoom,
	activeStep,
	polygonCordinates,
	setPolygonCordinates,
	setUserActivity,
	userActivity,
	deletePolygon,
	setDeletePolygon,
}: props) {
	const loading = false;
	const [draw, setDraw] = useState<any>();
	const [modify, setModify] = useState<any>();
	const [createPolygon, setCreatePolygon] = useState<boolean>(false);
	const [exploreMap, setExploreMap] = useState<any>();
	const [source, setSource] = useState<any>();
	const [drawing, setDrawing] = useState<boolean>(false);
	const [rasters, setRaster] = useState<any>();

	//All about Language (i18n)
	const { t } = useTranslation();

	const drowing = new Draw({
		source: source,
		type: 'Polygon',
	});

	const addInteraction = () => {
		if (exploreMap !== undefined) {
			exploreMap.addInteraction(drowing);

			if (drowing.on !== undefined) {
				drowing.on('drawstart', function () {
					setDrawing(true);
					if (!userActivity) {
						setUserActivity(true);
					}
				});

				drowing.on('drawend', function (event: any) {
					const polygon = event.feature.getGeometry();
					const coordinates = polygon.getCoordinates();
					event.feature.setStyle(
						new Style({
							fill: new Fill({
								color: 'rgba(255,255,255,0.4)',
							}),
							stroke: new Stroke({
								color: 'rgba(255,103,0,0.8)',
								width: 3,
							}),
						})
					);
					const layer = exploreMap.getLayers().getArray()[1];
					layer.setZIndex(1);
					setPolygonCordinates(coordinates);
					setCreatePolygon(!createPolygon);
					addInteractionModify();
					exploreMap.removeInteraction(drowing);
				});
				setDraw(drowing);
			}
		}
	};

	const addInteractionModify = () => {
		const modifies = new Modify({ source: source });

		modifies.on('modifystart', function (event) {
			event.features.forEach(function (feature) {
				const geometry = feature.getGeometry();
				if (geometry !== undefined) {
					if (geometry.getType() === 'GeometryCollection') {
						feature.set('modifyGeometry', geometry.clone(), true);
					}
				}
			});
		});

		modifies.on('modifyend', function (event) {
			event.features.forEach(function (feature) {
				const modifyGeometry = feature.get('modifyGeometry');
				if (modifyGeometry) {
					feature.setGeometry(modifyGeometry);
					feature.unset('modifyGeometry', true);
				}
				const polygon: any = feature.getGeometry();
				const coordinates = polygon.getCoordinates();
				setPolygonCordinates(coordinates);
			});
		});

		setModify(modifies);
	};

	const deleteThePolygon = () => {
		setDeletePolygon(true);
	};

	const addPolygon = () => {
		if (exploreMap !== undefined && (activeStep === 1 || drawing)) {
			if (!createPolygon) {
				if (!drawing) {
					addInteraction();
				}
			} else {
				exploreMap.removeInteraction(draw);
			}
		}
	};

	const removeLastPolygonPoint = () => {
		if (draw !== undefined) {
			draw.removeLastPoint();
			if (draw.finishCoordinate_ === null) {
				setDrawing(false);
				if (activeStep !== 1) {
					exploreMap.removeInteraction(draw);
				}
			}
		}
	};
	const zoomIn = () => {
		const view = exploreMap.getView();
		if (view) {
			const zoom = view.getZoom();
			view.animate({ zoom: zoom + 0.5, duration: 300 });
		}
	};
	const zoomOut = () => {
		const view = exploreMap.getView();
		if (view) {
			const zoom = view.getZoom();
			view.animate({ zoom: zoom - 0.5, duration: 300 });
		}
	};
	// const drawPolygon = () => {
	//   setDrawFromCoordinates(!drawFromCoordinates);
	// };

	useLayoutEffect(() => {
		setSource(new VectorSource({ wrapX: false }));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (source !== undefined) {
			const link = darkTheme
				? 'https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png'
				: 'https://api.maptiler.com/maps/89d6187b-7faf-406c-9c6a-f37fece31967/{z}/{x}/{y}.png';
			// Create a TileLayer from maptiler as the source
			let raster;
			if (rasters === undefined) {
				raster = new TileLayer({
					source: new XYZ({
						url: link + '?key=iPiB8rGCXsCOFdu5VMu0', // API-Key with referer to *.infra3d.com
					}),
				});
				setRaster(raster);
			} else {
				exploreMap.getLayers().array_[0].setSource(
					new XYZ({
						url: link + '?key=iPiB8rGCXsCOFdu5VMu0', // API-Key with referer to *.infra3d.com
					})
				);
				return;
			}

			// Create a VectorLayer with the VectorSource as the source
			const vector = new VectorLayer({
				source: source,
			});

			// Create a View with a specific projection, center, and zoom level
			const view = new View({
				projection: 'EPSG:3857',
				center: fromLonLat([8.3, 46.8]),
				zoom: 8,
			});

			const exp = new olmap({
				layers: [raster, vector],
				target: 'olmap',
				view: view,
				controls: defaultControls({
					zoom: false,
				}),
			});

			// Create the map
			setExploreMap(exp);
		}
		// eslint-disable-next-line
	}, [source, darkTheme]);

	useEffect(() => {
		if (exploreMap !== undefined) {
			// Add layers from iNovitas geoserver to the map
			const vhexagon_lod0 = new TileLayer({
				source: new TileWMS({
					url: 'https://geoserver.infra3d.ch/geoserver/dataMap-prod/wms',
					params: {
						LAYERS: 'dataMap-prod:vhexagon_lod0',
						TILED: true,
					},
					serverType: 'geoserver',
				}),
			});
			const vhexagon_lod1 = new TileLayer({
				source: new TileWMS({
					url: 'https://geoserver.infra3d.ch/geoserver/dataMap-prod/wms',
					params: {
						LAYERS: 'dataMap-prod:vhexagon_lod1',
						TILED: true,
					},
					serverType: 'geoserver',
				}),
			});
			const vroute = new TileLayer({
				source: new TileWMS({
					url: 'https://geoserver.infra3d.ch/geoserver/dataMap-prod/wms',
					params: { LAYERS: 'dataMap-prod:vroute', TILED: true },
					serverType: 'geoserver',
				}),
			});

			// Add the hexagon vector data layer to the map
			vhexagon_lod0.setZIndex(0);
			vhexagon_lod1.setZIndex(0);
			vroute.setZIndex(0);
			exploreMap.addLayer(vhexagon_lod0);
			exploreMap.addLayer(vhexagon_lod1);
			exploreMap.addLayer(vroute);
		}

		// eslint-disable-next-line
	}, [exploreMap]);

	// delete drawed polygon
	useEffect(() => {
		if (deletePolygon) {
			if (exploreMap?.getLayers()?.getArray()) exploreMap.getLayers().getArray()[1].getSource().clear();
			if (activeStep === 1) {
				addInteraction();
			}
			setDeletePolygon(false);
			setPolygonCordinates([]);
			setCreatePolygon(false);
			setDrawing(false);
		}
		// eslint-disable-next-line
	}, [exploreMap, deletePolygon]);

	useEffect(() => {
		if (exploreMap !== undefined) {
			if (activeStep === 1 || drawing) {
				addPolygon();
			} else {
				exploreMap.removeInteraction(draw);
			}
		}
		// eslint-disable-next-line
	}, [exploreMap, activeStep]);

	useEffect(() => {
		if (modify !== undefined) {
			exploreMap.addInteraction(modify);
		}
		// eslint-disable-next-line
	}, [modify]);

	useEffect(() => {
		if (
			exploreMap !== undefined &&
			// hexagon_5000 !== undefined &&
			source !== undefined
		) {
			if (exploreMap.getView() !== undefined) {
				// Set up a listener to track changes in the map's zoom level
				exploreMap.getView().on('change:resolution', (evt: any) => {
					// Get the new zoom level
					setZoom(evt.target.values_.resolution);
				});
			}
		}
		// eslint-disable-next-line
	}, [exploreMap, source]);

	return (
		// added width so we can manage the skeleton map size from the base page we use this component
		<Box width={'100%'} height={'100%'}>
			{loading && (
				<Skeleton className="olmap" width={'100%'} height={'100%'} style={{ transform: 'none' }}></Skeleton>
			)}
			<div id="olmap" className="olmap"></div>
			<Box
				position={'absolute'}
				top={'16px'}
				left={'12px'}
				display="flex"
				flexDirection={'column'}
				padding={'4px'}
				sx={{
					borderRadius: '5px',
					backgroundColor: darkTheme ? 'black' : 'white',
					boxShadow: 1,
				}}>
				<Tooltip
					title={t('tooltip.zoom_in')}
					placement="right"
					enterDelay={400}
					classes={{
						tooltip: darkTheme ? 'buttonDescriptionDark' : 'buttonDescription',
						popper: 'buttonDescriptionPopperLeft',
					}}>
					<IconButton
						onClick={zoomIn}
						sx={{
							borderRadius: '2px',
						}}>
						<Add
							fontSize="small"
							sx={{
								color: 'darkblue.main',
							}}
						/>
					</IconButton>
				</Tooltip>

				<Divider />
				<Tooltip
					title={t('tooltip.zoom_out')}
					placement="right"
					enterDelay={400}
					classes={{
						tooltip: darkTheme ? 'buttonDescriptionDark' : 'buttonDescription',
						popper: 'buttonDescriptionPopperLeft',
					}}>
					<IconButton
						onClick={zoomOut}
						sx={{
							borderRadius: '2px',
						}}>
						<Remove
							fontSize="small"
							sx={{
								color: 'darkblue.main',
							}}
						/>
					</IconButton>
				</Tooltip>
				{(activeStep === 1 || drawing) && polygonCordinates.length === 0 && <Divider />}
				{(activeStep === 1 || drawing) && polygonCordinates.length === 0 && (
					<Tooltip
						title={t('tooltip.undo')}
						placement="right"
						enterDelay={400}
						classes={{
							tooltip: darkTheme ? 'buttonDescriptionDark' : 'buttonDescription',
							popper: 'buttonDescriptionPopperLeft',
						}}>
						<IconButton
							onClick={removeLastPolygonPoint}
							sx={{
								borderRadius: '2px',
							}}>
							<Undo
								fontSize="small"
								sx={{
									color: 'darkblue.main',
								}}
							/>
						</IconButton>
					</Tooltip>
				)}
				{activeStep === 1 && polygonCordinates.length > 0 && <Divider />}
				{activeStep === 1 && polygonCordinates.length > 0 && (
					<Tooltip
						title={t('tooltip.delete')}
						placement="right"
						enterDelay={400}
						classes={{
							tooltip: darkTheme ? 'buttonDescriptionDark' : 'buttonDescription',
							popper: 'buttonDescriptionPopperLeft',
						}}>
						<IconButton
							onClick={deleteThePolygon}
							sx={{
								borderRadius: '2px',
							}}>
							<Delete
								fontSize="small"
								sx={{
									color: 'darkblue.main',
								}}
							/>
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</Box>
	);
}
