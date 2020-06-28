//Edit the tags and the delimeters here, you can also edit the identifier tag
var validTags = ["<",">","L","R","AL","AR","A<","A>"];
var delim = ". ."; //If you really wanna fuck with shit, you can make this " #BLM " or something lol
var identifier = "(ftUser)";
var port = chrome.runtime.connect({name: "freetawkPort69"});

let subEncBut = document.getElementById("subenc");
let subDecBut = document.getElementById("subdec");

class txtEncoder{
	//Character encoding methods in Here
	static shiftASCIIval(charNum,dir,shnum){
		charNum -= 32;
		shnum%=95;
		if(dir == '<' || dir == "L"){
			charNum -= shnum;
		}else{
			charNum += shnum;
		}
		if(charNum < 0){
			charNum += 95;
		}
		return charNum%95+32;
	}

	static alphaShiftASCIIval(charNum,dir,shnum){
		if(charNum >= 65 && charNum <= 90){
			charNum -= 65;
			shnum%=26;
			if(dir == 'AL' || dir == "A<"){
				charNum -= shnum;
			}else{
				charNum += shnum;
			}
			if(charNum < 0){
				charNum += 26;
			}
			return charNum%26+65;
		}else if (charNum >= 97 && charNum <= 122){
			charNum -= 97;
			shnum%=26;
			if(dir == 'AL' || dir == "A<"){
				charNum -= shnum;
			}else{
				charNum += shnum;
			}
			if(charNum < 0){
				charNum += 26;
			}
			return charNum%26+97;
		}else{
			return charNum;
		}
	}

	static isNummer(chCode){
		return chCode >= 48 && chCode <= 57;
	}

	static encodeMsg(msg){
		let encSplit = msg.search(delim);
		let code = msg.substring(0,encSplit);
		let com = msg.substring(encSplit+delim.length);
		let tgSz = 0;
		let ops = [];
		
		for(let vtc = 0; vtc < code.length; vtc++){
			tgSz = 0;
			for(let tch = vtc; !txtEncoder.isNummer(code.charCodeAt(tch)) && tch < code.length; tch++){
				tgSz++;		
			}
			if(tgSz != 0 && validTags.indexOf(code.substring(vtc,vtc+tgSz)) != -1){
				ops.push(code.substring(vtc,vtc+tgSz));
				ops.push(0);
				for(let nm = vtc+tgSz; txtEncoder.isNummer(code.charCodeAt(nm)) && nm < code.length; nm++){
					ops[ops.length-1] *= 10;
					ops[ops.length-1] += parseInt(code[nm]);
				}
			}
			vtc += tgSz;
		}

		for(let cl = 0; cl < com.length; cl++){
			if(com.charCodeAt(cl) == 10){
				continue;
			}
			for(let opNm = 0; opNm < ops.length; opNm += 2){
				switch(ops[opNm]){
					//Here is where you want to add the calls for your custom methods
					case "<":
					case ">":
					case "L":
					case "R":
						com = com.substring(0,cl) + String.fromCharCode(txtEncoder.shiftASCIIval(com.charCodeAt(cl),ops[opNm],ops[opNm+1])) + com.substring(cl+1);
						break;
					case "A<":
					case "A>":
					case "AL":
					case "AR":
						com = com.substring(0,cl) + String.fromCharCode(txtEncoder.alphaShiftASCIIval(com.charCodeAt(cl),ops[opNm],ops[opNm+1])) + com.substring(cl+1);
						break;
					default:
						console.log("Invalid tag yo! ("+ops[opNm]+")");
				}
			}
		}

		return (code+delim+com);
	}
}

function subencs(){
	let encCodeStr = document.getElementById("encoderbox").value;
	let	encStr = document.getElementById("msgbox").value;
	encStr = txtEncoder.encodeMsg(encCodeStr + delim + encStr + identifier);
	document.getElementById("encmsg").innerHTML = encStr;
}

function subdecs(){
	let csTag = document.getElementById("custdectag").value;
	let decStr = document.getElementById("decbox").value;
	if(csTag.value){
		decStr = csTag + delim + decStr;
	}
	port.postMessage({ftquery: decStr});
}

subEncBut.onclick = function(element){
	subencs();
}

subDecBut.onclick = function(element){
	subdecs();
}

//This is to communicate with the background decoder
port.onMessage.addListener(function(resp){
	if(resp.decoded.includes(identifier)){
		console.log("user found");
		console.log(resp.decoded);
		let msg = resp.decoded;
		msg = msg.substring(msg.search(delim)+delim.length);
		console.log(msg);
		msg = msg.substring(0,msg.search(identifier)-1) + msg.substring(msg.search(identifier)+identifier.length-1);
		document.getElementById("decmsg").innerHTML = msg;
	}
});