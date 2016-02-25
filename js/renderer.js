
function render_view(data,page){
	var str = '';
	var start = (page * page_length) - (page_length - 1);
	if(start < 0) {
		start = 1;
	}

	if(data.length){
		$.each(data, function(k,v){
			k = start + k;
			str += '<tr>';
			str += '<td><input type="checkbox" value="'+v.id+'"/></td>';
			str += '<td>'+(k)+'</td>';
			str += '<td id="title_record">'+v.title+'</td>';
			str += '<td id="artist_record">'+v.artist+'</td>';
			str += '<td>'+v.date_created+'</td>';
			str += '<td>'+v.date_updated+'</td>';
			str += '<td><a href="#" class="delete" data-id="'+v.id+'"><i class="glyphicon glyphicon-trash"></i></a></td>';
			str += '<td><a href="#" class="update" data-id="'+v.id+'"><i class="glyphicon glyphicon-pencil"></i></a></td>';
			str += '</tr>';
		});
		
	}else{
		str += '<tr><td colspan="8">No record.</td></tr>';
	}
	$('table tbody').html(str);

}

function render_paginator(total_records,page) {

	var str = '';
	var prev = '';
	var next = '';
	var total_pages = Math.ceil(total_records / page_length);
	var page_segment = Math.ceil(page / pagination_length);

	if(total_pages < page){
		
		window.location = $('#base_path').text();

	}

	if(total_pages){

		if(total_pages > pagination_length){
			/* set start_page and end_page */
			var end_page = page_segment * pagination_length;
			if(end_page == 0) {
				end_page = pagination_length;
			}
			var start_page = end_page - (pagination_length - 1);
			// set prev button
			if(start_page != 1){
				prev = '<li><a aria-label="Next" href="#'+(start_page - 1)+'"><span aria-hidden="true">&laquo;</span></a></li>';
			}
			// set next button
			if(total_pages > end_page){
				next = '<li><a aria-label="Next" href="#'+(end_page + 1)+'"><span aria-hidden="true">&raquo;</span></a></li>';
			}
			str += prev;
			end_page = total_pages <= end_page ? total_pages : end_page;
			for(var i = start_page; i <= end_page; i++){
				var current_page = i == page ? 'class="active"' : '';	
				str += '<li '+current_page+'><a href="#'+i+'">'+i+'</a></li>';
			}
			str += next;

		}else{
			for(var i = 1; i <= total_pages; i++){
				var current_page = i === page ? 'class="active"' : '';	
				str += '<li '+current_page+'><a href="#'+i+'">'+i+'</a></li>';
			}
		}

	}

	$('.pagination').html(str);

}