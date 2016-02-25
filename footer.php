</div>
<!-- base path -->
<span id="base_path" class="hide"><?php echo BASE_PATH; ?></span>

<!-- modals -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 id="modal_title">Delete Record</h5>
			</div>
			<div class="modal-body">
				<p>Are you sure you want to delete is record?</p>
				<p><b>Title : </b><span id="title_con"></span><p>
				<p><b>Artist : </b><span id="artist_con"></span><p>
			</div>
			<input type="hidden" id="id" value="" />
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" id="delete_btn">Delete</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="deleteSelectedModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 id="modal_title">Delete Records</h5>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" id="delete_selected_btn">Delete</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 id="modal_title">Update Record</h5>
			</div>
			<div class="modal-body">
				<form class="form form-horizontal" role="form">
		<div class="form-group">
			<label class="col-md-1 col-sm-2 control-label">Title</label>
			<div class="col-md-10 col-sm-10">
				<input type="text" class="form-control" id="title_update">
			</div>
		</div>
		<div class="form-group">
			<label class="col-md-1 col-sm-2 control-label">Artist</label>
			<div class="col-md-10 col-sm-10">
				<input type="text" class="form-control" id="artist_update">
			</div>
		</div>
		<input type="hidden" id="id" value="" />
	</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" id="update_btn">Update</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
</div>

</body>
</html>