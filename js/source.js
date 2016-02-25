
$(function(){

	var base_path = $('#base_path').text();
	var api_path = base_path + 'service/'
	var page = getPage();


	function getPage() {
		var page = window.location.hash;
		page = page.substr(1).length == 0 ? 0 : 
			isNaN(page.substr(1)) ? 0 : parseInt(page.substr(1));
		return page;
	}

	function getCrud(page) {

		var search = $.trim($('#search').val()).toLowerCase();
		search = (search.length) ? '/search/' + search : '';
		

	 	if(xhr && xhr.readyState != 4){
            xhr.abort();
        }

		xhr = $.ajax({
			url : api_path + 'page/' + page + '/length/' + page_length + search,
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

	// search box key up event
	$('#search').keyup(function(){
		getCrud(0);
       
	})


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

