<?php require_once "header.php"; ?>

<h1>Home <small>REST Crud Application</small></h1>

<div class="container">
	<form class="form form-horizontal" role="form">
		<div class="form-group">
			<label class="col-md-1 col-sm-2 control-label">Title</label>
			<div class="col-md-3 col-sm-3">
				<input type="text" class="form-control" id="title">
			</div>
		</div>
		<div class="form-group">
			<label class="col-md-1 col-sm-2 control-label">Artist</label>
			<div class="col-md-3 col-sm-3">
				<input type="text" class="form-control" id="artist">
			</div>
		</div>
		<div class="form-group">
			<label class="col-md-1 col-sm-2 control-label sr-only"></label>
			<div class="col-md-3 col-sm-3">
			<button type="button" class="btn btn-default" id="add_btn"><i class="glyphicon glyphicon-plus"></i> Add</button>
			</div>
		</div>
	</form>
</div>

<div class="col-md-10">
	<form role="form" class="form-inline">
		<button type="button" class="btn btn-danger" id="delete_selected">Delete</button>
	</form>
<table class="table table-condensed">
	<colgroup>
		<col width="5px">
		<col width="5px">
		<col width="100px">
		<col width="200px">
		<col width="150px">
		<col width="150px">
		<col width="10px">
		<col width="10px">
</colgroup>
	<thead>
	<tr>
		<th><input type="checkbox" id="check_all" /></th>
		<th>#</th>
		<th>Title</th>
		<th>Artist</th>
		<th>Date created</th>
		<th>Date updated</th>
		<th colspan="2" style="text-align:center">Action</th>
	</tr>
	</thead>
	<tbody>
		
	</tbody>
</table>
</div>
<div class="col-md-10" id="paginator_view">
    <ul class="pagination">  
	<li>
        <a aria-label="Next" href="#5">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    <li><a href="#6">6</a></li>
    <li><a href="#7">7</a></li>
    <li><a href="#8">8</a></li>
    <li><a href="#9">9</a></li>
    <li><a href="#10">10</a></li>
    <li>
        <a aria-label="Next" href="#11">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
</ul>
</div>
<?php require_once "footer.php"; ?>