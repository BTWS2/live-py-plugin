var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="space-tracer.data";var REMOTE_PACKAGE_BASE="space-tracer.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","bin",true,true);Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","space_tracer-4.1.0-py3.7.egg-info",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","space_tracer",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:63699,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,928,2125,3323,4418,5115,6002,7028,8163,9112,10196,11187,11957,13025,13967,14996,16216,17320,18272,19117,19974,20797,21682,22315,23385,24313,25235,26273,27308,28372,29747,30793,31782,32851,33925,34964,35956,36875,37722,38937,39900,40900,41947,43159,44128,44958,45888,46815,47738,48651,49566,50467,51418,52376,53600,54845,55878,56797,57728,58845,59980,60944,61942,63169],sizes:[928,1197,1198,1095,697,887,1026,1135,949,1084,991,770,1068,942,1029,1220,1104,952,845,857,823,885,633,1070,928,922,1038,1035,1064,1375,1046,989,1069,1074,1039,992,919,847,1215,963,1e3,1047,1212,969,830,930,927,923,913,915,901,951,958,1224,1245,1033,919,931,1117,1135,964,998,1227,530],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_space-tracer.data")}Module["addRunDependency"]("datafile_space-tracer.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/bin/space_tracer",start:0,end:432,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer-4.1.0-py3.7.egg-info/entry_points.txt",start:432,end:484,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer-4.1.0-py3.7.egg-info/dependency_links.txt",start:484,end:485,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer-4.1.0-py3.7.egg-info/SOURCES.txt",start:485,end:2378,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer-4.1.0-py3.7.egg-info/PKG-INFO",start:2378,end:5890,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer-4.1.0-py3.7.egg-info/top_level.txt",start:5890,end:5903,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/main.py",start:5903,end:30499,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/code_tracer.py",start:30499,end:60287,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/about.py",start:60287,end:60679,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/__init__.py",start:60679,end:60929,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/report_builder.py",start:60929,end:77206,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/canvas.py",start:77206,end:78304,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/mock_turtle.py",start:78304,end:110250,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/__main__.py",start:110250,end:110343,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/module_importers.py",start:110343,end:128454,audio:0},{filename:"/lib/python3.7/site-packages/space_tracer/traced_finder.py",start:128454,end:129944,audio:0}],remote_package_size:67795,package_uuid:"c146ed59-ff2b-460a-83b2-6dbceab9802c"})})();