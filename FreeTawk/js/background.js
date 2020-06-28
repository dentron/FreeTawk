//Edit the tags and the delimeters here
var validTags = ["<",">","L","R","AL","AR","A<","A>"];
var delim = ". .";

class txtDecoder{
	//Character decoding methods in Here
	static rev_shiftASCIIval(charNum,dir,shnum){
		charNum -= 32;
		shnum%=95;
		if(dir == '>' || dir == "R"){
			charNum -= shnum;
		}else{
			charNum += shnum;
		}
		if(charNum < 0){
			charNum += 95;
		}
		return charNum%95+32;
	}

	static rev_alphaShiftASCIIval(charNum,dir,shnum){
		if(charNum >= 65 && charNum <= 90){
			charNum -= 65;
			shnum%=26;
			if(dir == 'AR' || dir == "A>"){
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
			if(dir == 'AR' || dir == "A>"){
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

	static decodeMsg(msg){
		let encSplit = msg.search(delim);
		let code = msg.substring(0,encSplit);
		let com = msg.substring(encSplit+delim.length);
		let tgSz = 0;
		let ops = [];
		
		for(let vtc = 0; vtc < code.length; vtc++){
			tgSz = 0;
			for(let tch = vtc; !txtDecoder.isNummer(code.charCodeAt(tch)) && tch < code.length; tch++){
				tgSz++;		
			}
			if(tgSz != 0 && validTags.indexOf(code.substring(vtc,vtc+tgSz)) != -1){
				ops.push(code.substring(vtc,vtc+tgSz));
				ops.push(0);
				for(let nm = vtc+tgSz; txtDecoder.isNummer(code.charCodeAt(nm)) && nm < code.length; nm++){
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
						com = com.substring(0,cl) + String.fromCharCode(txtDecoder.rev_shiftASCIIval(com.charCodeAt(cl),ops[opNm],ops[opNm+1])) + com.substring(cl+1);
						break;
					case "A<":
					case "A>":
					case "AL":
					case "AR":
						com = com.substring(0,cl) + String.fromCharCode(txtDecoder.rev_alphaShiftASCIIval(com.charCodeAt(cl),ops[opNm],ops[opNm+1])) + com.substring(cl+1);
						break;
					default:
						console.log("Invalid tag yo! ("+ops[opNm]+")");
				}
			}
		}

		return (code+delim+com);
	}
}

//This is to communicate with the popup
chrome.runtime.onConnect.addListener(function(port){
	console.assert(port.name == "freetawkPort69");
	console.log("connected to port");
	port.onMessage.addListener(function(contact){
		console.log("got msg");
		console.log(contact.ftquery);
		port.postMessage({decoded:txtDecoder.decodeMsg(contact.ftquery)});
	});
});
