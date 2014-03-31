$.fn.yearCalendar = function(params){

	var currentObj = this;

	var fn = {
		/*
		*	Add event
		*/
		addAgenda : function(data){

			var data = $.extend({
				dateEnd     : false,
				content     : ''
			}, data);

			var element = $('<div></div>').addClass('exCalendar-event').html(data.content);

			if(data.dateEnd){
				diffTime = fn.getTime(data.dateEnd) - fn.getTime(data.dateStart);
				nbAddDay = diffTime/86400/1000;
			
				for (var i = 1; i < nbAddDay+1; i++) {

					$currentDate = new Date(fn.getTime(data.dateStart)+(i*1000*86400));
					$matchDate = ( 
						$currentDate.getFullYear()+'-'+
						fn.pad($currentDate.getMonth()+1, 2)+'-'+
						fn.pad($currentDate.getDate(), 2)
					);
					fn.matchDate($matchDate).append(element.clone());
				}
			}

			fn.matchDate(data.dateStart).append(element);

			return element;
		},
		/*
		*	Search date
		*/
		matchDate : function(date){
			return $(currentObj).find('tbody [data-date="'+date+'"]');
		},
		/*
		*	Search date
		*/
		getTime : function(date){
			var date = date.split('-')
			var dateObj = new Date(date[0], date[1]-1, date[2]);
			return dateObj.getTime();
		},

		/*
		*	Add padding numbers
		*/
		pad : function(n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}
	};

	// Create date object
	var date = new Date();
	// Defaults parameters
	var params = $.extend({

		monthLabel  : [ "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", 
						"Juillet", "Août", "Septembre", "Octobre", "Novembre", 
						"Décembre" ] ,
		dayLabel    : [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],

		year        : date.getFullYear(),
		startMonth  : 1,
		endMonth    : 12
	}, params);

	// Set current year value
	date.setFullYear(params.year);

	// Starting create table
	var table  = $("<table></table>").css('width', '100%')
		.append(
			$("<thead></thead>").append(
				$('<tr></tr>')
			)
		)
		.append( $("<tbody></tbody>") );

	var headerTable = table.find('thead tr');
	var headerBody  =  table.find('tbody');

	// Month boucle head
	for (var iMonth = params.startMonth; iMonth <= params.endMonth; iMonth++) {
		headerTable.append( '<td width="'+(100/(params.endMonth+1-params.startMonth))+'%" class="exCalendar-mouthhead" colspan=\"3\">'+params.monthLabel[iMonth-1]+"</td>" );
	};

	for (var i = 1; i <= 31; i++) {

		var currentDay = $("<tr data-days=\""+i+"\"></tr>");
		headerBody.append( currentDay );

		// Month boucle body
		for (var iMonth = params.startMonth; iMonth <= params.endMonth; iMonth++) {

			$nbDays = new Date(params.year, iMonth, 0).getDate();

			if ($nbDays >= i){

				var currentTime = i;

				$keyDate           = new Date(params.year, iMonth-1, currentTime, 12);
				trace              = $keyDate.getDate();
				trace = '';
				var currentDayKey  = params.dayLabel[$keyDate.getDay()];
				var currentDayFor  = 
					$keyDate.getFullYear()+'-'+
					fn.pad($keyDate.getMonth()+1, 2)+'-'+
					fn.pad(currentTime, 2);

			}
			else{
				var currentTime    = '';
				var currentDayKey  = '';
				var currentDayFor  = '';
			}

			currentDay.append( '<td class="exCalendar-label">'+currentTime+'</td>' );
			currentDay.append( '<td class="exCalendar-day">'+currentDayKey.charAt(0)+'</td>' );
			currentDay.append( '<td data-date="'+currentDayFor+'" class="exCalendar-content">'+trace+'</td>' );
		};
	};

	$(this).append( table );
	return fn;
}