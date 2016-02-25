<?php

class Album {

	protected $conn;
	
	public function __construct() {
		$this->conn = mysqli_connect('localhost', 'root', '','test') or die('Db error');
	}

	public function countAlbum() {
		$sql = "select count(*) from album";
		return $this->conn->query($sql)->fetch_row();
	}

	public function getAlbum($id = null, $page = null, $length = null){
		if($id){
			$sql = "select * from album where id = " . $id;
			return $this->conn->query($sql)->fetch_assoc();
		}else{
			$sql = "select * from album order by id desc limit {$page}, {$length}";
			 // echo $sql;

			$result_set = $this->conn->query($sql);
			$rows = array();
			while($row = $result_set->fetch_assoc()){
			
				$row['title'] = htmlspecialchars($row['title']);
				$row['artist'] = htmlspecialchars($row['artist']);
				//var_dump($row);
				array_push($rows, $row);
				// var_dump($row);
			}
			return array('result_set' => $rows, 'count' => $this->countAlbum());
		
		}
	}

	public function addAlbum($data){
		$sql = "insert into album (`title`,`artist`) values('{$data['title']}','{$data['artist']}')";
		$this->conn->query($sql);
		return $this->conn->affected_rows;
	}

	public function updateAlbum($id, $data){
		$sql = "update album set title = '{$data['title']}', artist = '{$data['artist']}', date_updated = now() where id = " . $id;
		$this->conn->query($sql);
		return $this->conn->affected_rows;
	}

	public function deleteAlbum($id) {
		$sql = "delete from album where id = " . $id;
		$this->conn->query($sql);
		return $this->conn->affected_rows;
	}
}