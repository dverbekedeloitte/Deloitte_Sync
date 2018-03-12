define( [ "qlik" ],
function ( qlik) {

	return {
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element) {
			var global = qlik.getGlobal();
			var applocal = qlik.currApp(this);

			qlik.setOnError(function(error) {
				alert(error.message);
			},
			function(warning){
				windows.console.log(warning);
			});

	
			global.getAppList(function(list){
			var str = "";
			list.forEach(function(value) {
				str += '<button class="syncdoc lui-button" id="'+value.qDocId +'">'+ value.qDocName + "</button>";
			});
		
			$element.css("overflow","scroll");
			$element.html( str);
			
			$(".syncdoc").click(function(event) {
			
					var H = new Array();
			
			        var appexternal = $( this ).attr('id');
			       
					var selStatelocal = applocal.selectionState( );
					var listenerlocal = function() {


					
      					console.log('local',selStatelocal.selections);
						H.push(selStatelocal.selections);
			
							//console.log(event,$( this ).attr('id'));
						
						var app = qlik.openApp(appexternal);
						var arrayLength = H[0].length;
						console.log('opened app',app);
						for (var i = 0; i < arrayLength; i++) {
    						console.log(H[0][i].fieldName,H[0][i].selectedValues);
	
							var lastNameField = app.field(H[0][i].fieldName);
							console.log('FIELD=',lastNameField)
							var X = new Array();
						var aL = H[0][i].selectedValues.length;
						
						for (var j = 0; j < aL; j++) {
								X.push(H[0][i].selectedValues[j].qName)
								console.log(H[0][i].selectedValues[j].qName);
							};
						    console.log(X);
							lastNameField.selectValues(X, false, false);
						}

					}
					
					selStatelocal.OnData.bind( listenerlocal );
					
			
				});

			});
			
			return qlik.Promise.resolve();
		}
	};

} );

