var page_length = 5; // page length
var pagination_length = 5;

$(function(){

	var base_path = $('#base_path').text();
	var api_path = base_path + 'service/'
	var total_records = 0;
	var ids = []; // used for delete multiple records
	var page = getPage();

	function getPage() {
		var page = window.location.hash;
		page = page.substr(1).length == 0 ? 0 : 
			isNaN(page.substr(1)) ? 0 : parseInt(page.substr(1));
		return page;
	}

	function getCrud(page) {
		$.ajax({
			url : api_path + 'page/' + page + '/length/' + page_length,
			type : 'get',
			dataType : 'json',
			async : false,
			success : function(data){
				render_view(data.result_set,page);
				render_paginator(data.count[0],page);
				total_records = data.count[0];
				enabled_disable_delete_button();
			}
		})
	}

	function enabled_disable_delete_button() {
		if($('table tbody tr').find('input:checkbox:checked').length){
			if($('#delete_selected').hasClass('disabled')){
				$('#delete_selected').removeClass('disabled')
			}
		}else{
			if(!$('#delete_selected').hasClass('disabled')){
				$('#delete_selected').addClass('disabled')
			}
			$('table thead input:checkbox').attr('checked', false);
		}
	}

	// listen for url hashchange
	$(window).on('hashchange', function(e){
		page = getPage();
		getCrud(page);
	});
	

	// open delete modal dialog
	$('table').delegate('.delete', 'click', function(){
		var obj = $(this);
	
		$('#deleteModal').find('#title_con').text(obj.parents('tr').find('#title_record').text());
		$('#deleteModal').find('#artist_con').text(obj.parents('tr').find('#artist_record').text());
		$('#deleteModal').find('#id').val(obj.data('id'));
		$('#deleteModal').modal('show');
		return false;
	})

	// open update modal dialog
	$('table').delegate('.update', 'click', function(){
		var obj = $(this);
		$('#updateModal').find('#title_update').val(obj.parents('tr').find('#title_record').text());
		$('#updateModal').find('#artist_update').val(obj.parents('tr').find('#artist_record').text());
		$('#updateModal').find('#id').val(obj.data('id'));
		$('#updateModal').modal('show');
		return false;
	});

	// enable or disable delete button for 
	$('table tbody').delegate('input:checkbox', 'click', function(){
		enabled_disable_delete_button();
	});

	$('#add_btn').click(function(){
		var title = $.trim($('#title').val());
		var artist = $.trim($('#artist').val());

		if(title && artist) {
			$.ajax({
				url : api_path,
				data : {title:title,artist:artist},
				type : 'post',
				dataType : 'json',
				success : function(data){
					if(data.response == 200){
						getCrud(page);
						$('#title').val("");
						$('#artist').val("");
					}else{
						alert(data.message);
					}
				}

			})
		}
	})

	// delete record
	$('#delete_btn').click(function(){
		var id = $('#deleteModal').find('#id').val();
		$.ajax({
			url : api_path,
			data : {id:id},
			type : 'delete',
			dataType : 'json',
			success : function(data){
				if(data.response  == 200){
					getCrud(page);
					$('#deleteModal').modal('hide');
				}else{
					alert(data.message);
				}
			}
		})
	});

	// update record
	$('#update_btn').click(function(){
		var id = $('#updateModal').find('#id').val();
		var title = $('#updateModal').find('#title_update').val();
		var artist = $('#updateModal').find('#artist_update').val();
		if(title && artist){
			$.ajax({
			url : api_path + 'id/' + id,
			data : {title:title,artist:artist},
			type : 'put',
			dataType : 'json',
			success : function(data){
				if(data.response == 200){
					getCrud(page);
					$('#updateModal').modal('hide');
				}else{
					alert(data.message);
				}
			}
		})
		}
		
	});


	// open modal dialog
	$('#delete_selected').click(function(){
		ids = [];
		$('table tbody tr').find('input:checkbox').each(function(k,v){
			var obj = $(v);
			if(obj.attr('checked')){
				ids.push(obj.val());
			}
		});

		if(ids.length){
			$('#deleteSelectedModal').find('.modal-body').html('<p>Are you sure you want to delete those selected record(s)?<p>');
			$('#deleteSelectedModal').modal('show');
		}
	});

	// delete selected records
	$('#delete_selected_btn').click(function(){
		var i = 0;
		if(ids.length){
			$.each(ids, function(k,id){
				$.ajax({
					url : api_path,
					data : {id:id},
					type : 'delete',
					dataType : 'json',
					async : false,
					success : function(data){
						if(data.response  == 200){
							i++;
						}
					}
				})
			});
		}
		// if all selected records successfully deleted
		if(ids.length == i){
			getCrud(page);
			$('#deleteSelectedModal').modal('hide');
		}else{
			alert('Internal error.')
		}
	})

	// checked unchecked select all checkbox
	$('#check_all').click(function(){
		var obj = $(this);
		if(obj.attr('checked')){
			$('table tr').find('input:checkbox').attr('checked',true);
		}else{
			$('table tr').find('input:checkbox').attr('checked',false);
		}
		enabled_disable_delete_button();
	});



	/* initialize view */
	getCrud(page);

});

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