<?php
require_once "album.php";

class Service {

	protected $album;
	
	public function __construct() {
		$this->album = new album();
	}

	public function get($id = null, $page = null, $length = null, $search = null){
		return json_encode($this->album->getAlbum($id, $page, $length, $search));
	}

	public function add($data) {
		$result = array('response' => 500, 'message' => 'Internal server error.');
		if($this->album->addAlbum($data)){
			$result = array('response' => 200, 'message' => 'Ok');
		}
		return json_encode($result);
	}

	public function update($id, $data){
		$result = array('response' => 500, 'message' => 'Internal server error.');
		if($this->album->updateAlbum($id, $data)){
			$result = array('response' => 200, 'message' => 'Ok');
		}
		return json_encode($result);
	}

	public function delete($id){
		$result = array('response' => 500, 'message' => 'Internal server error.');
		if($this->album->deleteAlbum($id)){
			$result = array('response' => 200, 'message' => 'Ok');
		}
		return json_encode($result);
	}

}

$service = new Service();
$id = isset($_GET['id']) ? $_GET['id'] : null;
$page = isset($_GET['page']) ? ($_GET['page'] <= 1) ? 0 : (($_GET['page'] -1) * 5) : 0;
$search = isset($_GET['search']) ? strtolower($_GET['search']) : null;


$length = isset($_GET['length']) ? $_GET['length'] : 5;

$method = $_SERVER['REQUEST_METHOD'];
parse_str(file_get_contents('php://input'), $data);

switch($method){
	case 'GET' :
		echo $service->get($id, $page, $length, $search);
	break;

	case 'POST' :
		echo $service->add($data);
	break;

	case 'PUT' :
		echo $service->update($id, $data);
	break;

	case 'DELETE' :
		echo $service->delete($data['id']);
}
