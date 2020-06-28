var port = chrome.runtime.connect({name: "freetawkPort69"});
var delim = ". .";
var identifier = "(ftUser)";

class ftUserFinder{
	static elems2rep = [];
	static lstEleIndex = 0;

	static searchElements(){
		let all  = document.querySelectorAll("#content-text");
		console.log(all.length);
		if(all.length != ftUserFinder.lstEleIndex){
			console.log("checking all new elements!")
			for(let ele = ftUserFinder.lstEleIndex; ele < all.length; ele++){
				if(all[ele].innerHTML && (all[ele].innerHTML.search(delim) != -1)){
					console.log("found potential user!");
					ftUserFinder.elems2rep.unshift(all[ele]);
					port.postMessage({ftquery: all[ele].innerHTML});
				}
			}
			ftUserFinder.lstEleIndex = all.length;
		}
		console.log("done!");
	}

	static replaceDecElem(decTxt){
		let msg = decTxt;
		msg = msg.substring(msg.search(delim)+delim.length);
		console.log(msg);
		msg = msg.substring(0,msg.search(identifier)) + msg.substring(msg.search(identifier)+8);
		ftUserFinder.elems2rep[0].innerHTML = msg;
		ftUserFinder.elems2rep.shift();
	}
}

//port.postMessage({ftquery: "nerd"});
//console.log("sent msg");
port.onMessage.addListener(function(resp){
	if(resp.decoded.includes(identifier)){
		console.log("user found");
		console.log(resp.decoded);
		ftUserFinder.replaceDecElem(resp.decoded);
	}else{
		ftUserFinder.elems2rep.shift();
	}
});

window.setInterval(ftUserFinder.searchElements, 2000);