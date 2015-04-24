$(document).ready(function(){

	/* My version of Java's hashCode function... */
	String.prototype.hashMe = function(){
		var h = 0;
		if (this.length == 0) return h;  //workaround

		for (i = 0; i < this.length; i++) {
			c = this.charCodeAt(i);
			h = ((h<<5)-h)+c;
			h = h & h;
		};
		return Math.abs(h);           //Get rid of negative value hashes. Another workaround.
	};
	
	phraseGenerator = function(key){
		var tone = key[0].toString();
		var firstTone = parseInt(tone[0]);
		var secondTone = parseInt(tone[1]);
		/* First section determines the tone ( which category of adjectives ) for the phrase */
		var firstWord = Adjectives[firstTone][key[1]];
		var secondWord = Adjectives[secondTone][key[2]];
		var thirdWord = Nouns[firstTone][key[2]];
		var phrase = firstWord + " " + secondWord + " " + thirdWord + " ";
		return phrase;
	}
	phraseKeyGenerator = function(h){
		result = [];				  //Result array will determine phrase key

		/* fun computations to determine key */

		for (var i = 0, sum = 0; i < h.length; sum += h[i++]);
		result.push(sum);		//sum of the digits of the array
		result.push(sum % 10);	    //push the last digit of the sum of the passed array to key array
		result.push((sum - (h[0])) % 10); //push the sum of the hash, minus the first digit of the hash. Then return the last digit.
		result.push(h[0] + h[1]); //push the first plus the second digits of the hash
		result.push((h[0]* h[1]) % 10); //multiply the first digit by the second one, push the last digit of the result

		console.log(result);
		var phrase = phraseGenerator(result);
		return phrase;
	};

	mainFunction = function(){		   //main, listener on #hasherButton

		var uInput = $('#uInput').val(), 
		uHash = uInput.hashMe(),
		hashParsed = [],			//container for parsing hash to do math on digits
    	hashNumber = uHash.toString(); 

		for (var i = 0, len = hashNumber.length; i < len; i += 1) { //pushing uHash to hashParsed
    	hashParsed.push(+hashNumber.charAt(i));
		}
		console.log(hashParsed);

		var phrase = phraseKeyGenerator(hashParsed);
 		
		/* Canvas Drawing */
		var canvas = document.getElementById("myCanvas");
		
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font = "20px Lobster";
		ctx.fillText(phrase,10,60);


		/* Identicon Drawing.... Using a third party library for this right here. */
		 var shaObj = new jsSHA(uInput, "TEXT");
    	var hash = shaObj.getHash("SHA-512", "HEX");
		var data = new Identicon(hash, 420).toString();
		// write to a data URI
		$('#show_identicon').css("display","visible");
    	$("#show_identicon")[0].src='data:image/png;base64,' + data;
	};
});