$(document).ready(function(){
	String.prototype.hashCode = function(){
		var hash = 0;
		if (this.length == 0) return hash;
		for (i = 0; i < this.length; i++) {
			char = this.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash); //get rid of negative value hashes. Weird.
	};

	mainFunction = function(){		//main, listener on #hasherButton
		var uInput = $('#uInput').val(), 
		uHash = uInput.hashCode();
	}

});