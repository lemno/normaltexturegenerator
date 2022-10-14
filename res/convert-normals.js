
Caman.Filter.register("createnormal", function () {

	// convert a to b
	this.process("createnormal", function (rgba) {

		rgba.r = 127;
		rgba.g = 127;
		rgba.b = 255 - rgba.a;
		rgba.a = 255;

		// Return the modified RGB values
		return rgba;
	});
});

$(document).ready(function () {

	// drop area handler
	$('#fileinput').on('dragover', function (e) {
		
        e.preventDefault();
        e.stopPropagation();
	});
	$('#fileinput').on('dragenter', function (e) {
		
        e.preventDefault();
        e.stopPropagation();
		$('#drop-area').addClass('hold'); 
	});
	$('#fileinput').on('dragleave', function () {

		$('#drop-area').removeClass('hold'); 
	});
	$('#fileinput').on('dragend', function () {

		$('#drop-area').removeClass('hold'); 
	});
	$('#fileinput').hover(
	  function() {
		$('#drop-area').addClass('glow'); 
	  }, function() {
		$('#drop-area').removeClass('glow'); 
	  }
	);

	// show ui
	$('.mainbox.uploader').show();

	// file on drop handler
	$('#fileinput').on('drop', function (e) {

		if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {
		e.preventDefault();
        e.stopPropagation();

		// use try block
		try {

			// get files
			var files = e.originalEvent.dataTransfer.files;

			// get first file
			var file = files[0];

			// check file ext
			var fileExtension = file.name.replace(/^.*\./, '');
			var imagesExtension = ["png"];
			if(imagesExtension.indexOf(fileExtension) == -1){

				throw new Error('scuffed file');
			}

			var preview = document.getElementById('check');
			preview.src = URL.createObjectURL(file);

			// load file data into caman
			Caman('#check', function () {

				// perform manips
				this.createnormal();

				// render file
				this.render(function () {

				var finished = this.toBase64('png');
				var placeholder = document.getElementById('output-placeholder');
				placeholder.setAttribute('href', finished);
				placeholder.setAttribute('download', 'compatible_n.png');

				placeholder.click();

				$('.mainbox').hide(); 
				$('.mainbox.done').show(); 

				});
			});
			
		} catch(err) {

			// display error
			$('.mainbox').hide(); 
			$('.mainbox.error').show(); 
		}
		}
	});

	// file on change handler
	$('#fileinput').on('change', function () {

		// use try block
		try {

			// get first file
			var file = this.files[0];

			// check file ext
			var fileExtension = file.name.replace(/^.*\./, '');
			var imagesExtension = ["png"];
			if(imagesExtension.indexOf(fileExtension) == -1){

				throw new Error('scuffed file');
			}

			var preview = document.getElementById('check');
			preview.src = URL.createObjectURL(file);

			// load file data into caman
			Caman('#check', function () {

				// perform manips
				this.createnormal();

				// render file
				this.render(function () {

				var finished = this.toBase64('png');
				var placeholder = document.getElementById('output-placeholder');
				placeholder.setAttribute('href', finished);
				placeholder.setAttribute('download', 'compatible_n.png');

				placeholder.click();

				$('.mainbox').hide(); 
				$('.mainbox.done').show(); 

				});
			});

		} catch(err) {

			// display error
			$('.mainbox').hide(); 
			$('.mainbox.error').show(); 
		}

	});
});