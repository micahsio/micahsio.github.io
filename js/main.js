$(document).ready(function(){
	String.prototype.hashCode = function(){
		var hash = 0;
		if (this.length == 0) return hash;
		for (i = 0; i < this.length; i++) {
			char = this.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash;            // Convert to 32bit integer
		}
		return Math.abs(hash);           //get rid of negative value hashes. Weird.
	};
	phraseKeyGenerator = function(h){
		result = [];				  //Result array will determine phrase key
		for (var i = 0, sum = 0; i < h.length; sum += h[i++]);		
		result.push(sum % 10);	    
		result.push(sum - (h[0])); 
		result.push(h[0] + h[1]); 
		result.push(h.length);

		phraseGenerator = function(key){
			var phrase = Touch_Adjectives[4];
			if(key[0] % 2 == 0){  }
				console.log(phrase);
		}
	}
	mainFunction = function(){		   //main, listener on #hasherButton
		var uInput = $('#uInput').val(), 
		uHash = uInput.hashCode(),
		hashParsed = [],			//container for parsing hash to do math on digits
    	hashNumber = uHash.toString(); 

		for (var i = 0, len = hashNumber.length; i < len; i += 1) { //pushing uHash to hashParsed
    	hashParsed.push(+hashNumber.charAt(i));
		}
		console.log(hashParsed);

		phraseKeyGenerator(hashParsed);
 		
		/* Canvas Drawing */
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");

		ctx.font = '20px Lobster';
		ctx.fillText("Hello World!",10,50);

		ctx.font = "30px Shadows-Into-Light";
		   // Create gradient
		var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		ctx.fillStyle=gradient;
		ctx.fillText("Big smile!",10,90);

	}

});