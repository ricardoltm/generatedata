const context: Worker = self as any;

let workerResources: any;
let loadedExportTypeWorkers: any = {};
let exportTypeWorkerMap: any = {};

context.onmessage = (e: any) => {
	const { dataPacket, exportType, numResults, exportTypeSettings } = e.data;

	workerResources = e.data.workerResources;
	exportTypeWorkerMap = workerResources.exportTypes;

	// load the appropriate Export Type generator web worker files. Pretty sure this caches them so we can safely
	// import them every time
	loadedExportTypeWorkers[exportType] = new Worker(exportTypeWorkerMap[exportType]);

	const worker = loadedExportTypeWorkers[exportType];
	worker.postMessage({
		settings: exportTypeSettings[exportType],
		numResults,
		dataPacket
	});
};

export {};
