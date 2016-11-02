<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

require_once "../library/PHPMailer-5.2.5/class.phpmailer.php";
date_default_timezone_set('Asia/Bangkok');

	require_once 'include/DB_Functions.php';
	$db = new DB_Functions();

	 $size_text = array('l','s');
	 $size_num =array(320,800);
	 $url_main = "http://phyathaidev.demosite.ibusiness.co.th";
	 $entityBody = file_get_contents('php://input');
	 $obj = json_decode($entityBody,true);
	 $sql = '';

	 if ($obj['api_id'] == 1) {

	   $searchs = $obj['mSearchs'];
	   $hospital_id = $obj['hospital_id'];
	   $cat_id = $obj['cat_id'];
	   $brand_id = $obj['brand_id'];
	   $building_id = $obj['building_id'];
	   $floor_id = $obj['floor_id'];
	   $department_id = $obj['department_id'];
     $costcenter_id = $obj['costcenter_id'];

	   if(isset($obj['cat_id']) && $obj['cat_id'] != ''){
		   $filter1 = sqlOR($cat_id,"cat_id");
	   }
	   if(isset($obj['brand_id']) && $obj['brand_id'] != ''){
		   $filter2 = sqlOR($brand_id,"brand_id");
	   }
	   if(isset($obj['building_id']) && $obj['building_id'] != ''){
		   $filter3 = sqlOR($building_id,"f.building_id");
	   }
	   if(isset($obj['floor_id']) && $obj['floor_id'] != ''){
		   $filter4 = sqlOR($floor_id,"e.floor_id");
	   }
	   if(isset($obj['department_id']) && $obj['department_id'] != ''){
		   $filter5 = sqlOR($department_id,"a.department_id");
	   }
	   if(isset($obj['mSearchs']) && $obj['mSearchs'] != '')
	   {
		   $sql = " AND ( invent_comp_name LIKE '%$searchs%' OR invent_serial_no LIKE '%$searchs%' OR invent_tag_no LIKE '%$searchs%' ) ";
	   }
	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		   $sql2 = sqlOR_q($hospital_id,"a.hospital_id");
	   }
     if($obj['emp_status_allview'] == 0){
		  $sql_cost = " AND costcenter_id = '$costcenter_id' ";
	   }

	   $q=mysql_query("SELECT * FROM phya_inventory
	   a LEFT JOIN phya_department d ON a.department_id=d.department_id
	   LEFT JOIN phya_floor e ON d.floor_id=e.floor_id
	   LEFT JOIN phya_building f ON e.building_id=f.building_id
	   WHERE invent_mark_status != '0' ".$sql.$sql_cost.$sql2.$filter1.$filter2.$filter3.$filter4.$filter5." GROUP BY invent_id ORDER BY invent_create_date DESC limit ".($obj['mCount']*20).", 20");
	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
		  $row2=mysql_fetch_assoc(mysql_query("SELECT * FROM phya_inventory_image WHERE invent_id = '$row[invent_id]' and invent_img_status ='1' "));

			$response = array(
				"invent_id" => $row['invent_id'],
				"invent_comp_name" => $row['invent_comp_name'],
				"invent_serial_no" => $row['invent_serial_no'],
				"invent_asset_no" => $row['invent_tag_no'],
				"invent_img_url" => $url_main."/data/inventory_image/".$row2['invent_img_id']."/l/".$row2['invent_img_url']
			);
			$output[]=$response;
		  }
		  $json = array('res_code' => '01','res_text' =>"",'status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => "",'status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 2) {

	   $invent_id = $obj['invent_id'];

	   $q=mysql_query("SELECT * FROM phya_inventory a LEFT JOIN phya_brand b ON a.brand_id=b.brand_id
	    LEFT JOIN phya_category c ON a.cat_id=c.cat_id
		LEFT JOIN phya_department d ON a.department_id=d.department_id
		LEFT JOIN phya_floor e ON d.floor_id=e.floor_id
		LEFT JOIN phya_building f ON e.building_id=f.building_id
		INNER JOIN phya_hospital g ON a.hospital_id=g.hospital_id
    LEFT JOIN phya_inventory_status h ON a.invent_status_id=h.invent_status_id
    LEFT JOIN phya_costcenter j ON a.costcenter_id=j.costcenter_id
		 WHERE invent_id = '$invent_id' AND invent_mark_status != '0' ");
	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){

        if($row['cat_img_icon'] != ""){
          $urlmarker = $url_main."/data/category_icon/".$row['cat_id']."/".$row['cat_img_icon'];
        }else{
          $urlmarker = $url_main."/data/category_icon/default/icon_default.png";
        }

		    $response = array(
				"invent_id" => $row['invent_id'],
				"cat_id" => $row['cat_id'],
        "cat_name" => $row['cat_name'],
				"brand_id" => $row['brand_id'],
        "band_name" => $row['brand_name'],
        "invent_asset_account" => $row['invent_asset_account'],
        "invent_asset_cat" => $row['invent_asset_cat'],
        "invent_asset_cat_description" => $row['invent_asset_cat_description'],
        "costcenter_id" => $row['costcenter_id'],
        "costcenter_description" => $row['costcenter_description'],
        "invent_model" => $row['invent_model'],
        "invent_specification" => $row['invent_specification'],
        "invent_comp_name" => $row['invent_comp_name'],
        "invent_wifi_mac_address" => $row['invent_wifi_mac_address'],
				"invent_mac_ethernet" => $row['invent_mac_ethernet'],
        "invent_asset_location" => $row['invent_asset_location'],
        "invent_tag_no" => $row['invent_tag_no'],
				"invent_asset_no" => $row['invent_asset_no'],
        "invent_major_cat" => $row['invent_major_cat'],
        "invent_minor_cat" => $row['invent_minor_cat'],
				"invent_cat_name" => $row['invent_cat_name'],
        "invent_asset_description" => $row['invent_asset_description'],
        "invent_unit" => $row['invent_unit'],
        "invent_cost" => $row['invent_cost'],
				"invent_depreciation" => $row['invent_depreciation'],
        "invent_depreciation_reserve" => $row['invent_depreciation_reserve'],
        "invent_nbv" => $row['invent_nbv'],
				"invent_life_year" => $row['invent_life_year'],
        "invent_dateofacquistion" => $row['invent_dateofacquistion'],
        "invent_asset_cost_acct" => $row['invent_asset_cost_acct'],
        "invent_accum" => $row['invent_accum'],
				"invent_accout_description" => $row['invent_accout_description'],
        "invent_employee_number" => $row['invent_employee_number'],
        "invent_employee_name" => $row['invent_employee_name'],
        "invent_asset_serial_no" => $row['invent_asset_serial_no'],
        "invent_serial_no" => $row['invent_serial_no'],
        "invent_cat" => $row['invent_cat'],
        "invent_status_id" => $row['invent_status_id'],
        "invent_status_name" => $row['invent_status_name'],
        "hospital_id" => $row['hospital_id'],
        "hospital_name" => $row['hospital_name'],
				"invent_department_id" => $row['department_id'],
        "invent_department" => $row['department_name'],
        "invent_build_id" => $row['building_id'],
        "invent_build" => $row['building_name'],
				"invent_floor_id" => $row['floor_id'],
				"invent_floor" => $row['floor_name'],
				"invent_waranty_date" => changetypeData($row['invent_waranty_date']),
				"invent_buy_date" => changetypeData($row['invent_buy_date']),
        "invent_remark" => $row['invent_remark'],
        "invent_capex" => $url_main."/data/inventory_image/".$row['invent_id']."/pdf/".$row['invent_capex'],
        "invent_create_date" => $row['invent_create_date'],
				"invent_create_by" => $row['invent_create_by'],
        "invent_recivedate" => changetypeData($row['invent_recivedate']),
        "invent_installdate" => changetypeData($row['invent_installdate']),
        "invent_warranty_expire" => changetypeData($row['invent_warranty_expire']),
        "invent_vender" => $row['invent_vender'],
				"invent_contactvender" => $row['invent_contactvender'],
        "invent_invoice_number" => $row['invent_invoice_number'],
        "invent_rent" => $row['invent_rent'],
        "invent_site" => $row['invent_site'],
        "invent_location" => $row['invent_location'],
        "invent_type" => $row['invent_type'],
				"invent_map_image" => $url_main."/data/inventory_image/maps/".$row['department_id']."/".$row['map_image'],
        "cat_img_icon" => $urlmarker

			);
      $detail_info[]=$row['brand_name'];
      $detail_info[]=$row['cat_name'];
      $detail_info[]=$row['department_name'];

			$output[]=$response;
			$id[]= $row['invent_id'];
		  }


      foreach ($output as $key => $product) {
      $q2=mysql_query("SELECT * FROM phya_inventory_image where invent_id = '$id[$key]' ORDER BY invent_img_id DESC ");
        while($row2=mysql_fetch_assoc($q2))
        {
            $response = array(
          "invent_img_id" => $row2['invent_img_id'],
          "invent_img_url" => $url_main."/data/inventory_image/".$row2['invent_img_id']."/l/".$row2['invent_img_url']
          );
          $output3[]=$response;
          $output[$key]['img_url'] = $output3 ;
        }
          $output3 = array();
    }

			foreach ($output as $key => $product) {
				$q2=mysql_query("SELECT * FROM phya_repair_history a INNER JOIN phya_employee b ON a.repair_request_by=b.emp_id where invent_id = '$id[$key]' ORDER BY repair_id DESC");
					while($row2=mysql_fetch_assoc($q2))
					{
						list($mdate, $mtime) = split('[ ]', $row2['repair_datetime']);
						$response = array(
						"repair_id" => $row2['repair_id'],
						"repair_ploblem" => $row2['repair_ploblem'],
						"repair_sentto" => "ส่งเข้าศูนย์ซ่อม",
						"repair_date" => changetypeData($mdate),
						"repair_time" => $mtime,
						"emp_name" => $row2['emp_name'],
						"emp_lastname" => $row2['emp_lastname']
						);
						$output3[]=$response;
						$output[$key]['repair_history'] = $output3 ;
					}
						$output3 = array();
			}

			foreach ($output as $key => $product) {
				$q2=mysql_query("SELECT * FROM phya_inventory_owner a INNER JOIN phya_employee b ON a.emp_id=b.emp_id LEFT JOIN phya_costcenter c ON b.costcenter_id=c.costcenter_id LEFT JOIN phya_position d ON b.position_id=d.position_id where invent_id = '$id[$key]' ORDER BY invent_owner_id DESC");
					while($row2=mysql_fetch_assoc($q2))
					{
						if($row2['emp_picture'] == ""){
							$image_emp =$url_main."/data/employee_image/".$row2['emp_id']."/l/".$row2['emp_picture_idcard'];
						}else{
							$image_emp = $url_main."/data/employee_image/".$row2['emp_id']."/l/".$row2['emp_picture'];
						}
						$q3=mysql_query("SELECT * FROM phya_employee WHERE  emp_id = $row2[invent_own_addby] ");
						$row3=mysql_fetch_assoc($q3);
						$response = array(
						"invent_owner_id" => $row2['invent_owner_id'],
						"emp_id" => $row2['emp_id'],
						"emp_id_real" => $row2['emp_id_real'],
						"invent_own_start" => changetypeData($row2['invent_own_start']),
						"invent_own_stop" => changetypeData($row2['invent_own_stop']),
						"emp_name" => $row2['emp_name'],
						"emp_lastname" => $row2['emp_lastname'],
						"emp_picture_idcard" => $url_main."/data/employee_image/".$row2['emp_id']."/l/".$row2['emp_picture_idcard'],
						"emp_picture" => $image_emp,
						"position_id" => $row2['position_id'],
						"position_name" => $row2['position_name'],
						"emp_department" => $row2['costcenter_id'],
						"department_name" => $row2['costcenter_description'],
						"addby" => $row3['emp_name']." ".$row3['emp_lastname']
						);
						$output3[]=$response;
						$output[$key]['inventory_owner'] = $output3 ;
					}
						$output3 = array();
			}

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 3) {

	   $invent_id = $obj['invent_id'];
	   $building_id = $obj['building_id'];
	   $floor_id = $obj['floor_id'];
	   $department_id = $obj['department_id'];

	   $result = mysql_query("UPDATE phya_inventory SET
							department_id = '".$department_id."' ,
							invent_location = '0,0'
							WHERE invent_id = '$invent_id'
							");
	   if($result){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 4) {

	   $invent_id = $obj['invent_id'];
	   $emp_id = $obj['emp_id'];
	   $invent_own_start = $obj['invent_own_start'];
	   $invent_own_stop = $obj['invent_own_stop'];
	   $invent_own_status = $obj['invent_own_status'];

	   $result = mysql_query("UPDATE phya_inventory_owner SET
							invent_build = '".$invent_build."',
							invent_floor = '".$invent_floor."',
							invent_department = '".$invent_department."'
							WHERE invent_id = '$invent_id'
							");
	   if($result){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 5) {

    $cat_id = $obj['cat_id'];
    $brand_id = $obj['brand_id'];
    $invent_asset_account = htmlspecialchars($obj['invent_asset_account'], ENT_QUOTES);
    $invent_asset_cat = htmlspecialchars($obj['invent_asset_cat'], ENT_QUOTES);
    $invent_asset_cat_description = htmlspecialchars($obj['invent_asset_cat_description'], ENT_QUOTES);
    $costcenter_description = $obj['costcenter_description'];
    $invent_model = htmlspecialchars($obj['invent_model'], ENT_QUOTES);
    $invent_specification = htmlspecialchars($obj['invent_specification'], ENT_QUOTES);
    $invent_comp_name = htmlspecialchars($obj['invent_comp_name'], ENT_QUOTES);
    $invent_wifi_mac_address = $obj['invent_wifi_mac_address'];
    $invent_mac_ethernet = $obj['invent_mac_ethernet'];
    $invent_asset_location = htmlspecialchars($obj['invent_asset_location'], ENT_QUOTES);
    $invent_tag_no = htmlspecialchars($obj['invent_tag_no'], ENT_QUOTES);
    $invent_asset_no = htmlspecialchars($obj['invent_asset_no'], ENT_QUOTES);
    $invent_serial_no = htmlspecialchars($obj['invent_serial_no'], ENT_QUOTES);
    $invent_major_cat = htmlspecialchars($obj['invent_major_cat'], ENT_QUOTES);
    $invent_minor_cat = htmlspecialchars($obj['invent_minor_cat'], ENT_QUOTES);
    $invent_cat_name = htmlspecialchars($obj['invent_cat_name'], ENT_QUOTES);
    $invent_asset_description = htmlspecialchars($obj['invent_asset_description'], ENT_QUOTES);
    $invent_unit = htmlspecialchars($obj['invent_unit'], ENT_QUOTES);
    $invent_cost = htmlspecialchars($obj['invent_cost'], ENT_QUOTES);
    $invent_depreciation = htmlspecialchars($obj['invent_depreciation'], ENT_QUOTES);
    $invent_depreciation_reserve = htmlspecialchars($obj['invent_depreciation_reserve'], ENT_QUOTES);
    $invent_nbv = htmlspecialchars($obj['invent_nbv'], ENT_QUOTES);
    $invent_life_year = htmlspecialchars($obj['invent_life_year'], ENT_QUOTES);
    $invent_dateofacquistion = htmlspecialchars($obj['invent_dateofacquistion'], ENT_QUOTES);
    $invent_asset_cost_acct = htmlspecialchars($obj['invent_asset_cost_acct'], ENT_QUOTES);
    $invent_accum = htmlspecialchars($obj['invent_accum'], ENT_QUOTES);
    $invent_accout_description = htmlspecialchars($obj['invent_accout_description'], ENT_QUOTES);
    $invent_employee_name = htmlspecialchars($obj['invent_employee_name'], ENT_QUOTES);
    $invent_employee_number = htmlspecialchars($obj['invent_employee_number'], ENT_QUOTES);
    $invent_serial_no = htmlspecialchars($obj['invent_serial_no'], ENT_QUOTES);
    $invent_asset_serial_no = htmlspecialchars($obj['invent_asset_serial_no'], ENT_QUOTES);
    $invent_cat = htmlspecialchars($obj['invent_cat'], ENT_QUOTES);
    $invent_status_id = $obj['invent_status_id'];
    $hospital_id = $obj['hospital_id'];
    $department_id = $obj['department_id'];
    $invent_waranty_date = $obj['invent_waranty_date'];
    $invent_buy_date = $obj['invent_buy_date'];
    $invent_remark = htmlspecialchars($obj['invent_remark'], ENT_QUOTES);
    $invent_create_by = $obj['invent_create_by'];
    $invent_recivedate = $obj['invent_recivedate'];
    $invent_installdate = $obj['invent_installdate'];
    $invent_warranty_expire = $obj['invent_warranty_expire'];
    $invent_vender = htmlspecialchars($obj['invent_vender'], ENT_QUOTES);
    $invent_contactvender = htmlspecialchars($obj['invent_contactvender'], ENT_QUOTES);
    $invent_invoice_number = htmlspecialchars($obj['invent_invoice_number'], ENT_QUOTES);
    $invent_rent = htmlspecialchars($obj['invent_rent'], ENT_QUOTES);
    $invent_site = htmlspecialchars($obj['invent_site'], ENT_QUOTES);

	  if($invent_wifi_mac_address == ":::::"){
			$invent_wifi_mac_address = "";
		}
		if($invent_mac_ethernet == ":::::"){
			$invent_mac_ethernet = "";
		}

    $q9=mysql_query("SELECT * FROM phya_costcenter WHERE costcenter_description = '$obj[costcenter_description]' ");
    $row9 = $row9=mysql_fetch_assoc($q9);
    $costcenter_id = $row9['costcenter_id'];

    $count=mysql_query("SELECT * FROM phya_inventory WHERE invent_tag_no = '$invent_asset_no' ");
    if(mysql_num_rows($count) > 0){
      $json = array('res_code' => '02','res_text' => "ไม่สามารถบันทึกได้ Tag Number นี้มีในระบบแล้ว",'status' => 'no');
    }else{

	   /*** Insert ***/
		$strSQL = "INSERT INTO phya_inventory (cat_id,brand_id,invent_asset_account,invent_asset_cat,invent_asset_cat_description,
  	costcenter_id,invent_model,invent_specification,invent_comp_name,invent_wifi_mac_address,invent_mac_ethernet,invent_asset_location,
  	invent_tag_no,invent_asset_no,invent_major_cat,invent_minor_cat,invent_cat_name,invent_asset_description,invent_unit,
  	invent_cost,invent_depreciation,invent_depreciation_reserve,invent_nbv,invent_life_year,invent_dateofacquistion,
  	invent_asset_cost_acct,invent_accum,invent_accout_description,invent_employee_name,invent_employee_number,
  	invent_serial_no,invent_asset_serial_no,invent_cat,invent_status_id,hospital_id,department_id,invent_waranty_date,
  	invent_buy_date,invent_remark,invent_create_date,invent_create_by,invent_recivedate,invent_installdate,
  	invent_warranty_expire,invent_vender,invent_contactvender,invent_invoice_number,invent_rent,invent_site,
    invent_location,invent_type,invent_mark_status)
			VALUES (
        '".$cat_id."',
				'".$brand_id."',
        '".$invent_asset_account."',
				'".$invent_asset_cat."',
				'".$invent_asset_cat_description."',
				'".$costcenter_id."',
				'".$invent_model."',
				'".$invent_specification."',
				'".$invent_comp_name."',
				'".$invent_wifi_mac_address."',
				'".$invent_mac_ethernet."',
				'".$invent_asset_location."',
				'".$invent_tag_no."',
				'".$invent_asset_no."',
				'".$invent_major_cat."',
				'".$invent_minor_cat."',
				'".$invent_cat_name."',
        '".$invent_asset_description."',
				'".$invent_unit."',
        '".$invent_cost."',
				'".$invent_depreciation."',
        '".$invent_depreciation_reserve."',
        '".$invent_nbv."',
        '".$invent_life_year."',
        '".$invent_dateofacquistion."',
        '".$invent_asset_cost_acct."',
        '".$invent_accum."',
        '".$invent_accout_description."',
        '".$invent_employee_name."',
        '".$invent_employee_number."',
        '".$invent_serial_no."',
        '".$invent_asset_serial_no."',
        '".$invent_cat."',
        '".$invent_status_id."',
        '".$hospital_id."',
        '".$department_id."',
        '".$invent_waranty_date."',
        '".$invent_buy_date."',
        '".$invent_remark."',
        NOW(),
        '".$invent_create_by."',
        '".$invent_recivedate."',
        '".$invent_installdate."',
        '".$invent_warranty_expire."',
        '".$invent_vender."',
        '".$invent_contactvender."',
        '".$invent_invoice_number."',
        '".$invent_rent."',
        '".$invent_site."',
        '0,0',
        '0',
        '1'
				)
			";
		$result = mysql_query($strSQL);
		$last_id = mysql_insert_id();
	   if($result){
		  $json = array('res_code' => '01','res_text' => $invent_model,'status' => $strSQL,'result' => $last_id);
	   }else{
		  $json = array('res_code' => '00','res_text' => $invent_model,'status' => 'no');
	   }
   }
       echo json_encode($json);

	}else if ($obj['api_id'] == 6) {

	   $hospital_idAll = $obj['hospital_idAll'];
	   $hospital_id = $obj['hospital_id'];
	   $building_id = $obj['building_id'];
	   $floor_id = $obj['floor_id'];

	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		  $sql2 = sqlOR_q($hospital_id,"hospital_id");
		  $q=mysql_query("SELECT * FROM phya_building WHERE hospital_id != '' ".$sql2);
	   }else if(isset($obj['building_id']) && $obj['building_id'] != ''){
		  $sql2 = sqlOR($building_id,"building_id");
		  $q=mysql_query("SELECT * FROM phya_floor WHERE building_id != '' ".$sql2);
	   }else if(isset($obj['floor_id']) && $obj['floor_id'] != ''){
		   $sql2 = sqlOR($floor_id,"floor_id");
		  $q=mysql_query("SELECT * FROM phya_department WHERE floor_id != '' ".$sql2);
	   }else if(isset($obj['hospital_idAll']) && $obj['hospital_idAll'] != ''){
		   $sql2 = sqlOR_q($hospital_idAll,"hospital_id");
		  $q=mysql_query("SELECT * FROM phya_hospital WHERE hospital_id != '' ".$sql2);
	   }else{
		  $q=mysql_query("SELECT * FROM phya_building");
	   }

	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
			$output[]=$row;
		  }

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => "ไม่มีข้อมูล",'status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 7) {

	   $invent_id = $obj['invent_id'];
	   $invent_location = $obj['invent_location'];

	   $result = mysql_query("UPDATE phya_inventory SET
							invent_location = '".$invent_location."'
							WHERE invent_id = '$invent_id'
							");
	   if($result){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 8) {

	   $searchs = $obj['mSearchs'];
	   $sorts = $obj['sorts'];
	   $position_id	 = $obj['position_id'];
	   $department_id = $obj['department_id'];
     $costcenter_id = $obj['costcenter_id'];

	   if(isset($obj['sorts']) && $obj['sorts'] != ''){
       if($obj['sorts'] == 1){
         $sql0 = " ORDER BY emp_name ASC ";
       }else if($obj['sorts'] == 2){
         $sql0 = " ORDER BY emp_name DESC ";
       }else if($obj['sorts'] == 3){
         $sql0 = " ORDER BY emp_id_real ASC ";
       }else if($obj['sorts'] == 4){
         $sql0 = " ORDER BY emp_id_real DESC ";
       }

	   }
	   if(isset($obj['position_id']) && $obj['position_id'] != ''){
		  $sql1 = sqlOR($position_id,"a.position_id");
	   }
	   if(isset($obj['department_id']) && $obj['department_id'] != ''){
		  $sql2 = sqlOR($department_id,"a.costcenter_id");
	   }
	   if(isset($obj['mSearchs']) && $obj['mSearchs'] != ''){
		  $sql .= " AND emp_name LIKE '%$searchs%' OR emp_lastname LIKE '%$searchs%' OR emp_id LIKE '%$searchs%'";
	   }

     if($obj['emp_status_allview'] == 0){
		  $sql_cost = " AND costcenter_id = '$costcenter_id' ";
	   }


	   $q=mysql_query("SELECT * FROM phya_employee a INNER JOIN phya_costcenter b ON a.costcenter_id=b.costcenter_id INNER JOIN phya_position c ON c.position_id=a.position_id WHERE emp_status != 0 ".$sql.$sql_cost.$sql1.$sql2.$sql0." limit ".($obj['mCount']*20).", 20");
	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
			$response = array(
				"emp_id" => $row['emp_id'],
				"emp_id_real" => $row['emp_id_real'],
				"emp_name" => $row['emp_name'],
				"emp_lastname" => $row['emp_lastname'],
				"position_id" => $row2['position_id'],
				"position_name" => $row['position_name'],
				"department_name" => $row['costcenter_description'],
				"emp_picture" => $url_main."/data/employee_image/".$row['emp_id']."/s/".$row['emp_picture'],
			);
			$output[]=$response;
		  }
		  $json = array('res_code' => '01','res_text' => "success",'status' => "ok",'result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'no','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 9) {

	   $invent_id = $obj['invent_id'];
	   $emp_id = $obj['emp_id'];
	   $emps_id = $obj['emps_id'];

		$q=mysql_query("SELECT * FROM phya_inventory_owner WHERE invent_id ='$invent_id' ORDER BY invent_owner_id DESC limit 1 ");
	    $row=mysql_fetch_assoc($q);
		if($row['invent_own_stop'] == "0000-00-00"){
			mysql_query("UPDATE phya_inventory_owner SET
						    invent_own_stop = NOW()
							WHERE invent_owner_id = '$row[invent_owner_id]'
							");
		}
		$strSQL = "INSERT INTO phya_inventory_owner (invent_id,emp_id,invent_own_start,invent_own_status,invent_own_addby,invent_own_adddate)
			VALUES (
				'".$invent_id."',
				'".$emp_id."',
				NOW(),
				'1',
				'".$emps_id."',
        NOW()
				)
			";

		$result = mysql_query($strSQL);
	   if($q){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}/*else if ($obj['api_id'] == 10) {

	   $cat_id = $obj['cat_id'];
	   $brand_id = $obj['brand_id'];

	   if(isset($obj['cat_id']) && $obj['cat_id'] != ''){
		  $q1=mysql_query("SELECT * FROM phya_category WHERE cat_id = '$cat_id' ");
		  $row1=mysql_fetch_assoc($q1);
	   }if(isset($obj['brand_id']) && $obj['brand_id'] != ''){
		  $q2=mysql_query("SELECT * FROM phya_brand WHERE brand_id = '$brand_id' ");
		  $row2=mysql_fetch_assoc($q2);
	   }

	   if(mysql_num_rows($q1) > 0 || mysql_num_rows($q2) > 0 ){
		    $response = array(
				"cat_id" => $row1['cat_id'],
				"cat_name" => $row1['cat_name'],
				"brand_id" => $row2['brand_id'],
				"brand_name" => $row2['brand_name']
			);
			$output[]=$response;

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}*/else if ($obj['api_id'] == 11) {

			$invent_id = $obj['invent_id'];
			$invent_imgurl = $obj['invent_imgurl'];
			$texttime = time();
			$textreturn = check_baseimg_ext($invent_imgurl);
			$checkstatus = 1;
			$count=mysql_query("SELECT * FROM phya_inventory_image WHERE invent_id = '$invent_id' ");
			if(mysql_num_rows($count) > 0){
				$checkstatus = 0;
			}
			$sqlStr = "INSERT INTO phya_inventory_image(invent_id, invent_img_url, invent_img_status) VALUES ('$invent_id','".$texttime.".".$textreturn['ext']."','".$checkstatus."')";
			$qr_insertFile = mysql_query($sqlStr);
			$last_id = mysql_insert_id();

			for($i = 0 ; $i < count($size_text) ; $i++)
			{
				$uploadFileNew = create_folder('inventory_image',$last_id,$size_text[$i],$texttime.".".$textreturn['ext']);
				if($size_text[$i] == "l"){
					$success = file_put_contents($uploadFileNew, $textreturn['url']);
					$file_fullsize = $uploadFileNew;
				}else{
					$wid=320;
					resize($wid, $uploadFileNew, $file_fullsize);
				}
			}

			if($success){
				$json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $last_id,'image' => $url_main."/data/inventory_image/".$last_id."/l/".$texttime.".".$textreturn['ext']);
			}else{
				$json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
				mysql_query("DELETE FROM phya_inventory_image WHERE invent_img_id = '$last_id' ");
				mysql_query("DELETE FROM phya_inventory WHERE invent_id = '$invent_id' ");
			}

		echo json_encode($json);

	}else if ($obj['api_id'] == 12) {


    $invent_id = $obj['invent_id'];
    $invent_asset_account = htmlspecialchars($obj['invent_asset_account'], ENT_QUOTES);
    $invent_asset_cat = htmlspecialchars($obj['invent_asset_cat'], ENT_QUOTES);
    $invent_asset_cat_description = htmlspecialchars($obj['invent_asset_cat_description'], ENT_QUOTES);
    $costcenter_description = $obj['costcenter_description'];
    $invent_specification = htmlspecialchars($obj['invent_specification'], ENT_QUOTES);
    $invent_comp_name = htmlspecialchars($obj['invent_comp_name'], ENT_QUOTES);
    $invent_wifi_mac_address = $obj['invent_wifi_mac_address'];
    $invent_mac_ethernet = $obj['invent_mac_ethernet'];
    $invent_asset_location = htmlspecialchars($obj['invent_asset_location'], ENT_QUOTES);
    $invent_asset_no = htmlspecialchars($obj['invent_asset_no'], ENT_QUOTES);
    $invent_serial_no = htmlspecialchars($obj['invent_serial_no'], ENT_QUOTES);
    $invent_major_cat = htmlspecialchars($obj['invent_major_cat'], ENT_QUOTES);
    $invent_minor_cat = htmlspecialchars($obj['invent_minor_cat'], ENT_QUOTES);
    $invent_cat_name = htmlspecialchars($obj['invent_cat_name'], ENT_QUOTES);
    $invent_asset_description = htmlspecialchars($obj['invent_asset_description'], ENT_QUOTES);
    $invent_unit = htmlspecialchars($obj['invent_unit'], ENT_QUOTES);
    $invent_cost = htmlspecialchars($obj['invent_cost'], ENT_QUOTES);
    $invent_depreciation = htmlspecialchars($obj['invent_depreciation'], ENT_QUOTES);
    $invent_depreciation_reserve = htmlspecialchars($obj['invent_depreciation_reserve'], ENT_QUOTES);
    $invent_nbv = htmlspecialchars($obj['invent_nbv'], ENT_QUOTES);
    $invent_life_year = htmlspecialchars($obj['invent_life_year'], ENT_QUOTES);
    $invent_dateofacquistion = htmlspecialchars($obj['invent_dateofacquistion'], ENT_QUOTES);
    $invent_asset_cost_acct = htmlspecialchars($obj['invent_asset_cost_acct'], ENT_QUOTES);
    $invent_accum = htmlspecialchars($obj['invent_accum'], ENT_QUOTES);
    $invent_accout_description = htmlspecialchars($obj['invent_accout_description'], ENT_QUOTES);
    $invent_employee_name = htmlspecialchars($obj['invent_employee_name'], ENT_QUOTES);
    $invent_employee_number = htmlspecialchars($obj['invent_employee_number'], ENT_QUOTES);
    $invent_asset_serial_no = htmlspecialchars($obj['invent_asset_serial_no'], ENT_QUOTES);
    $invent_cat = htmlspecialchars($obj['invent_cat'], ENT_QUOTES);
    $invent_status_id = $obj['invent_status_id'];
    $hospital_id = $obj['hospital_id'];
    $department_id = $obj['department_id'];
    $invent_remark = htmlspecialchars($obj['invent_remark'], ENT_QUOTES);
    $invent_recivedate = $obj['invent_recivedate'];
    $invent_installdate = $obj['invent_installdate'];
    $invent_warranty_expire = $obj['invent_warranty_expire'];
    $invent_vender = htmlspecialchars($obj['invent_vender'], ENT_QUOTES);
    $invent_contactvender = htmlspecialchars($obj['invent_contactvender'], ENT_QUOTES);
    $invent_invoice_number = htmlspecialchars($obj['invent_invoice_number'], ENT_QUOTES);
    $invent_rent = htmlspecialchars($obj['invent_rent'], ENT_QUOTES);
    $invent_site = htmlspecialchars($obj['invent_site'], ENT_QUOTES);
    $invent_update_by = $obj['invent_update_by'];

	  $q=mysql_query("SELECT * FROM phya_inventory WHERE invent_id = '$invent_id' AND department_id = '$department_id' AND invent_mark_status != '0' ");
	  if(mysql_num_rows($q) < 1 ){
		  $result = mysql_query("UPDATE phya_inventory SET
			invent_location = '0,0'
			WHERE invent_id = '$invent_id'
			");
	  }

	  if($invent_wifi_mac_address == ":::::"){
			$invent_wifi_mac_address = "";
		}
		if($invent_mac_ethernet == ":::::"){
			$invent_mac_ethernet = "";
		}

    $result = mysql_query("UPDATE phya_inventory SET
             invent_asset_account = '".$invent_asset_account."',
             invent_asset_cat = '".$invent_asset_cat."',
             invent_asset_cat_description = '".$invent_asset_cat_description."',
             invent_specification = '".$invent_specification."',
             invent_comp_name = '".$invent_comp_name."',
             invent_wifi_mac_address = '".$invent_wifi_mac_address."',
             invent_mac_ethernet = '".$invent_mac_ethernet."',
             invent_asset_location = '".$invent_asset_location."',
             invent_asset_no = '".$invent_asset_no."',
             invent_major_cat = '".$invent_major_cat."',
             invent_minor_cat = '".$invent_minor_cat."',
             invent_cat_name = '".$invent_cat_name."',
             invent_asset_description = '".$invent_asset_description."',
             invent_unit = '".$invent_unit."',
             invent_cost = '".$invent_cost."',
             invent_depreciation = '".$invent_depreciation."',
             invent_depreciation_reserve = '".$invent_depreciation_reserve."',
             invent_nbv = '".$invent_nbv."',
             invent_life_year = '".$invent_life_year."',
             invent_dateofacquistion = '".$invent_dateofacquistion."',
             invent_asset_cost_acct = '".$invent_asset_cost_acct."',
             invent_accum = '".$invent_accum."',
             invent_accout_description = '".$invent_accout_description."',
             invent_employee_name = '".$invent_employee_name."',
             invent_employee_number = '".$invent_employee_number."',
             invent_asset_serial_no = '".$invent_asset_serial_no."',
             invent_cat = '".$invent_cat."',
             invent_status_id = '".$invent_status_id."',
             hospital_id = '".$hospital_id."',
             department_id = '".$department_id."',
             invent_remark = '".$invent_remark."',
             invent_recivedate = '".$invent_recivedate."',
             invent_installdate = '".$invent_installdate."',
             invent_warranty_expire = '".$invent_warranty_expire."',
             invent_vender = '".$invent_vender."',
             invent_contactvender = '".$invent_contactvender."',
             invent_invoice_number = '".$invent_invoice_number."',
             invent_rent = '".$invent_rent."',
             invent_site = '".$invent_site."',
             invent_update_date = NOW(),
             invent_update_by = '".$invent_update_by."'
             WHERE invent_id = '$invent_id'
             ");

	   if($result){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 13) {

			$emp_id = $obj['emp_id'];
			$emp_imgurl = $obj['emp_imgurl'];
			$texttime = time();
			$textreturn = check_baseimg_ext($emp_imgurl);

			$result = mysql_query("UPDATE phya_employee SET
							emp_picture = '".$texttime.".".$textreturn['ext']."'
							WHERE emp_id = '$emp_id'
							");

			for($i = 0 ; $i < count($size_text) ; $i++)
			{
				$uploadFileNew = create_folder('employee_image',$emp_id,$size_text[$i],$texttime.".".$textreturn['ext']);
				if($size_text[$i] == "l"){
					$success = file_put_contents($uploadFileNew, $textreturn['url']);
					$file_fullsize = $uploadFileNew;
				}else{
					$wid=320;
					resize($wid, $uploadFileNew, $file_fullsize);
				}
			}

			if($success){
				$json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
			}else{
				$json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
			}

		echo json_encode($json);

	}else if ($obj['api_id'] == 14) {

	   $emp_id  = $obj['emp_id'];
	   $emp_password = $obj['emp_password'];
	   $hospital_id = $obj['hospital_id'];

	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		  $sql = " and hospital_id = '$hospital_id' ";
	   }

	   $emp_password2 = md5($emp_password);
	   $q=mysql_query("SELECT * FROM phya_employee a LEFT JOIN phya_costcenter b ON a.costcenter_id=b.costcenter_id LEFT JOIN phya_position c ON a.position_id=c.position_id WHERE emp_email = '$emp_id' and emp_password = '$emp_password2' and emp_status != 0 ");
	   if(mysql_num_rows($q) > 0){
	   		while($row=mysql_fetch_assoc($q)){
				$response = array(
					"emp_id" => $row['emp_id'],
          "emp_id_real" => $row['emp_id_real'],
					"group_id" => $row['group_id'],
					"emp_name" => $row['emp_name'],
					"emp_lastname" => $row['emp_lastname'],
					"position_id" => $row2['position_id'],
					"position_name" => $row['position_name'],
					"department_id" => $row['costcenter_id'],
					"department_name" => $row['costcenter_description'],
					"emp_permission" => $row['emp_permission'],
          "emp_status_allview" => $row['emp_status_allview'],
          "costcenter_id" => $row['costcenter_id'],
					"emp_picture_idcard" => $url_main."/data/employee_image/".$row['emp_id']."/l/".$row['emp_picture_idcard'],
					"emp_picture" => $url_main."/data/employee_image/".$row['emp_id']."/l/".$row['emp_picture']
				);
				$output[]=$response;
				$id[]= $row['emp_id'];
		    }
		  	foreach ($output as $key => $role) {
				$q2=mysql_query("SELECT * FROM phya_role where emp_id = '$id[$key]' ".$sql);
					while($row2=mysql_fetch_assoc($q2))
					{
						$output3[]=$row2;
						$output[$key]['role'] = $output3 ;
					}
					$output3 = array();
					if(mysql_num_rows($q2) > 0){
					    $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
				    }else{
					    $json = array('res_code' => '00','res_text' => 'ท่านไม่มีสิทธิเข้าใช้โรงพยาบาลที่เลือก','status' => 'no');
				    }
			}
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ชื่อผู้ใช้ หรือ รหัสผ่านผิดพลาด','status' => 'no','test' => "");
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 15) {

	   $q=mysql_query("SELECT * FROM phya_hospital");
	   $q2=mysql_query("SELECT * FROM phya_mail");

	   $response = array(
		  "fake" => "fake"
	   );
	   $output[]=$response;

	   if(mysql_num_rows($q) > 0 || mysql_num_rows($q2) > 0){

			foreach ($output as $key => $hos) {

				$response = array(
					"hospital_id" => "",
					"hospital_name" => "ทั้งหมดตามสิทธิ์"
				);
				$output1[]=$response;
				$output[$key]['hosp'] = $output1;

				while($row1=mysql_fetch_assoc($q))
				{
					$output1[]=$row1;
					$output[$key]['hosp'] = $output1;
				}
				$output1 = array();
			}

			foreach ($output as $key => $mail) {
				while($row2=mysql_fetch_assoc($q2))
				{
					$output2[]=$row2;
					$output[$key]['mail'] = $output2;
				}
				$output2 = array();
			}


		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);
	   /*else if ($obj['api_id'] == 23) {

	   $cat_id = $obj['cat_id'];
	   $brand_id = $obj['brand_id'];

	   if(isset($obj['cat_id']) && $obj['cat_id'] != ''){
		  $q1=mysql_query("SELECT * FROM phya_category");
	   }if(isset($obj['brand_id']) && $obj['brand_id'] != ''){
		  $q2=mysql_query("SELECT * FROM phya_brand");
	   }

	   if(mysql_num_rows($q1) > 0 || mysql_num_rows($q2) > 0){

				$response = array(
					"fake" => "fake"
				);
				$output[]=$response;

		  	foreach ($output as $key => $cat) {
					while($row1=mysql_fetch_assoc($q1))
					{
						$output1[]=$row1;
						$output[$key]['cat'] = $output1 ;
					}
					$output1 = array();
			}
			foreach ($output as $key => $brand) {
					while($row2=mysql_fetch_assoc($q2))
					{
						$output2[]=$row2;
						$output[$key]['brand'] = $output2 ;
					}
					$output2 = array();
			}

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }*/

	}else if ($obj['api_id'] == 16) {
	   $q=mysql_query("SELECT * FROM phya_help WHERE help_type = 2 ");
	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
        $response = array(
          "help_id" => $row['help_id'],
          "help_pdf" => $url_main."/data/help/".$row['help_pdf'],
          "help_type" => $row['help_type'],
          "help_create_date" => $row['help_create_date']
        );
        $output[]=$response;
		  }
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 17) {

			$invent_id = $obj['invent_id'];
			$invent_capex = $obj['invent_capex'];
			$texttime = time();
			$textreturn = check_baseimg_ext($invent_capex);

			mysql_query("UPDATE phya_inventory SET
							invent_capex = '".$texttime.".pdf'
							WHERE invent_id = '$invent_id'
							");

			$uploadFileNew = create_folder('inventory_image',$invent_id,'pdf',$texttime.".pdf");
			$success = file_put_contents($uploadFileNew, $textreturn['url']);

			if($success){
				$json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
			}else{
				$json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
			}

		echo json_encode($json);

	}else if ($obj['api_id'] == 18) {

	   $floor_id = $obj['floor_id'];
	   $q=mysql_query("SELECT * FROM phya_floor a INNER JOIN phya_building b ON a.building_id=b.building_id
	   INNER JOIN phya_department c ON a.floor_id=c.floor_id WHERE a.floor_id = '$floor_id' ");

	   if(mysql_num_rows($q) > 0){
		   while($row=mysql_fetch_assoc($q)){
			$output[]=$row;
		  }
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 19) {

	   $hospital_id = $obj['hospital_id'];
	   $building_id = $obj['building_id'];
	   $floor_id = $obj['floor_id'];

		    $texta1 = "";
			$texta2 = "";
			$hosp = split(",", $hospital_id);
			$max2 = sizeof($hosp);
			for($i = 0; $i < $max2;$i++)
			{
				if($max2 > 1){
					$texta1 = "(";
					if(($max2-1) == $i){
						$texta2 = ")";
					}
				}
				if($i == 0){
					$sql2 .= " WHERE ".$texta1." hospital_id = '$hosp[$i]' ";
				}else{
					$sql2 .= " OR hospital_id = '$hosp[$i]' ".$texta2." ";
				}
			}

	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		  $q1=mysql_query("SELECT * FROM phya_building ".$sql2);
	   }if(isset($obj['building_id']) && $obj['building_id'] != ''){
		  $q2=mysql_query("SELECT * FROM phya_floor WHERE building_id = '$building_id' ");
	   }if(isset($obj['floor_id']) && $obj['floor_id'] != ''){
		  $q3=mysql_query("SELECT * FROM phya_department WHERE floor_id = '$floor_id' ");
	   }

	   if(mysql_num_rows($q1) > 0){

				$response = array(
					"fake" => "fake"
				);
				$output[]=$response;

		  	foreach ($output as $key => $build) {
					while($row1=mysql_fetch_assoc($q1))
					{
						$output1[]=$row1;
						$output[$key]['build'] = $output1 ;
					}
					$output1 = array();
			}
			foreach ($output as $key => $floor) {
					while($row2=mysql_fetch_assoc($q2))
					{
						$output2[]=$row2;
						$output[$key]['floors'] = $output2 ;
					}
					$output2 = array();
			}
			foreach ($output as $key => $department) {
					while($row3=mysql_fetch_assoc($q3))
					{
						$output3[]=$row3;
						$output[$key]['department'] = $output3 ;
					}
					$output3 = array();
			}

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == '20') {

			$invent_img_id = $obj['invent_img_id'];
			$invent_id = $obj['invent_id'];

			$sqlStr = "DELETE FROM phya_inventory_image WHERE invent_img_id = '$invent_img_id' ";
			$success = mysql_query($sqlStr);

			if($success){
				$json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
				mysql_query("UPDATE phya_inventory_image SET
						    invent_img_status = '1'
							WHERE invent_id = '$invent_id' limit 1
							");
			}else{
				$json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
			}

		echo json_encode($json);

	}else if ($obj['api_id'] == 21) {

	   $emp_id = $obj['emp_id'];
	   $emp_password = $obj['emp_password'];
	   $emp_Newpassword = $obj['emp_Newpassword'];

	   $emp_password2 = md5($emp_password);
	   $emp_Newpassword2 = md5($emp_Newpassword);
	   $q=mysql_query("SELECT * FROM phya_employee WHERE emp_id = '$emp_id' AND emp_password = '$emp_password2' ");

	   if(mysql_num_rows($q) > 0){

		  $result = mysql_query("UPDATE phya_employee SET
						    emp_password = '".$emp_Newpassword2."'
							WHERE emp_id = '$emp_id'
							");
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'รหัสผ่านผิดพลาด','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 22) {

	 	$hospital_id = $obj['hospital_id'];
		$cat_id = $obj['cat_id'];
		$brand_id = $obj['brand_id'];
		$building_id = $obj['building_id'];
		$floor_id = $obj['floor_id'];
	 	$department_id = $obj['department_id'];
		$mSearchs = $obj['mSearchs'];
    $costcenter_id = $obj['costcenter_id'];

	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		   $sql = sqlOR_q($hospital_id,"a.hospital_id");
	   }
	   if(isset($obj['cat_id']) && $obj['cat_id'] != ''){
		   $filter1 = sqlOR($cat_id,"a.cat_id");
	   }
	   if(isset($obj['brand_id']) && $obj['brand_id'] != ''){
		   $filter2 = sqlOR($brand_id,"brand_id");
	   }
	   if(isset($obj['building_id']) && $obj['building_id'] != ''){
		   $filter3 = sqlOR($building_id,"f.building_id");
	   }
	   if(isset($obj['floor_id']) && $obj['floor_id'] != ''){
		   $filter4 = sqlOR($floor_id,"e.floor_id");
	   }
	   if(isset($obj['department_id']) && $obj['department_id'] != ''){
		   $filter5 = sqlOR($department_id,"a.department_id");
		   $filter55 = sqlOR($department_id,"department_id");
	   }
	   if($obj['mCount'] != 999){
		   $mCount = " limit ".($obj['mCount']*20).", 20 ";
	   }
	   if(isset($obj['mSearchs']) && $obj['mSearchs'] != '')
	   {
		  $sql2 = "  AND ( invent_comp_name LIKE '%$mSearchs%' OR invent_serial_no LIKE '%$mSearchs%' OR invent_tag_no LIKE '%$mSearchs%' ) ";
	   }
     if($obj['emp_status_allview'] == 0){
		  $sql_cost = " AND costcenter_id = '$costcenter_id' ";
	   }

	   $q = mysql_query("SELECT * FROM phya_department WHERE department_id != '' ".$filter55);

	   if(mysql_num_rows($q) > 0){
	   		while($row=mysql_fetch_assoc($q)){
				$response = array(
					//"map_image" => $row['map_image']
					"map_image" => $url_main."/data/inventory_image/maps/".$row['department_id']."/".$row['map_image']
				);
				$output[]=$response;
		    }
		  	foreach ($output as $key => $inventory) {
				  $q2=mysql_query("SELECT * FROM phya_inventory a
				  LEFT JOIN phya_department d ON a.department_id=d.department_id
				  LEFT JOIN phya_floor e ON d.floor_id=e.floor_id
				  LEFT JOIN phya_building f ON e.building_id=f.building_id
          LEFT JOIN phya_category g ON a.cat_id=g.cat_id
				  WHERE invent_mark_status != '0' ".$sql.$sql_cost.$sql2.$filter1.$filter2.$filter3.$filter4.$filter5.$mCount);
				  if(mysql_num_rows($q2) > 0){
					  while($row2=mysql_fetch_assoc($q2))
					  {
              if($row2['cat_img_icon'] != ""){
                $urlmarker = $url_main."/data/category_icon/".$row2['cat_id']."/".$row2['cat_img_icon'];
              }else{
                $urlmarker = $url_main."/data/category_icon/default/icon_default.png";
              }

						  $row1=mysql_fetch_assoc(mysql_query("SELECT * FROM phya_inventory_image WHERE invent_id = '$row2[invent_id]' ORDER BY invent_img_id DESC "));
						  $response = array(
							  "invent_id" => $row2['invent_id'],
							  "invent_comp_name" => $row2['invent_comp_name'],
							  "invent_asset_no" => $row2['invent_tag_no'],
							  "invent_serial_no" => $row2['invent_serial_no'],
							  "invent_location" => $row2['invent_location'],
							  "invent_img_url" => $url_main."/data/inventory_image/".$row1['invent_img_id']."/l/".$row1['invent_img_url'],
                "cat_img_icon" => $urlmarker
						  );
						  $output3[]=$response;
						  $output[$key]['inventory'] = $output3 ;
					  }
					  $output3 = array();
					  $json = array('res_code' => '01','res_text' => "SELECT * FROM phya_inventory a
  				  LEFT JOIN phya_department d ON a.department_id=d.department_id
  				  LEFT JOIN phya_floor e ON d.floor_id=e.floor_id
  				  LEFT JOIN phya_building f ON e.building_id=f.building_id
            LEFT JOIN phya_category g ON a.cat_id=g.cat_id
  				  WHERE invent_mark_status != '0' ".$sql.$sql_cost.$sql2.$filter1.$filter2.$filter3.$filter4.$filter5.$mCount,'status' => 'ok','result' => $output);
				  }else{
					  $json = array('res_code' => '00','res_text' => "SELECT * FROM phya_inventory a
  				  LEFT JOIN phya_department d ON a.department_id=d.department_id
  				  LEFT JOIN phya_floor e ON d.floor_id=e.floor_id
  				  LEFT JOIN phya_building f ON e.building_id=f.building_id
            LEFT JOIN phya_category g ON a.cat_id=g.cat_id
  				  WHERE invent_mark_status != '0' ".$sql.$sql_cost.$sql2.$filter1.$filter2.$filter3.$filter4.$filter5.$mCount,'status' => 'no');
				  }
			}
	   }else{
		    $json = array('res_code' => '00','res_text' => "no",'status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 23) {

	   $cat_id = $obj['cat_id'];
	   $brand_id = $obj['brand_id'];

	   if(isset($obj['cat_id']) && $obj['cat_id'] != ''){
		  $q1=mysql_query("SELECT * FROM phya_category ORDER BY cat_name ASC ");
	   }if(isset($obj['brand_id']) && $obj['brand_id'] != ''){
		  $q2=mysql_query("SELECT * FROM phya_brand ORDER BY brand_name ASC ");
	   }

	   if(mysql_num_rows($q1) > 0 || mysql_num_rows($q2) > 0){

				$response = array(
					"fake" => "fake"
				);
				$output[]=$response;

		  	foreach ($output as $key => $cat) {
					while($row1=mysql_fetch_assoc($q1))
					{
						$output1[]=$row1;
						$output[$key]['cat'] = $output1 ;
					}
					$output1 = array();
			}
			foreach ($output as $key => $brand) {
					while($row2=mysql_fetch_assoc($q2))
					{
						$output2[]=$row2;
						$output[$key]['brand'] = $output2 ;
					}
					$output2 = array();
			}

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 24) {

	   $invent_id = $obj['invent_id'];
     $cat_id = $obj['cat_id'];
     $brand_id = $obj['brand_id'];
     $invent_asset_account = htmlspecialchars($obj['invent_asset_account'], ENT_QUOTES);
     $invent_asset_cat = htmlspecialchars($obj['invent_asset_cat'], ENT_QUOTES);
     $invent_asset_cat_description = htmlspecialchars($obj['invent_asset_cat_description'], ENT_QUOTES);
     $costcenter_description = $obj['costcenter_description'];
     $invent_model = htmlspecialchars($obj['invent_model'], ENT_QUOTES);
     $invent_specification = htmlspecialchars($obj['invent_specification'], ENT_QUOTES);
     $invent_comp_name = htmlspecialchars($obj['invent_comp_name'], ENT_QUOTES);
     $invent_wifi_mac_address = $obj['invent_wifi_mac_address'];
     $invent_mac_ethernet = $obj['invent_mac_ethernet'];
     $invent_asset_location = htmlspecialchars($obj['invent_asset_location'], ENT_QUOTES);
     $invent_tag_no = htmlspecialchars($obj['invent_tag_no'], ENT_QUOTES);
     $invent_asset_no = htmlspecialchars($obj['invent_asset_no'], ENT_QUOTES);
     $invent_serial_no = htmlspecialchars($obj['invent_serial_no'], ENT_QUOTES);
     $invent_major_cat = htmlspecialchars($obj['invent_major_cat'], ENT_QUOTES);
     $invent_minor_cat = htmlspecialchars($obj['invent_minor_cat'], ENT_QUOTES);
     $invent_cat_name = htmlspecialchars($obj['invent_cat_name'], ENT_QUOTES);
     $invent_asset_description = htmlspecialchars($obj['invent_asset_description'], ENT_QUOTES);
     $invent_unit = htmlspecialchars($obj['invent_unit'], ENT_QUOTES);
     $invent_cost = htmlspecialchars($obj['invent_cost'], ENT_QUOTES);
     $invent_depreciation = htmlspecialchars($obj['invent_depreciation'], ENT_QUOTES);
     $invent_depreciation_reserve = htmlspecialchars($obj['invent_depreciation_reserve'], ENT_QUOTES);
     $invent_nbv = htmlspecialchars($obj['invent_nbv'], ENT_QUOTES);
     $invent_life_year = htmlspecialchars($obj['invent_life_year'], ENT_QUOTES);
     $invent_dateofacquistion = htmlspecialchars($obj['invent_dateofacquistion'], ENT_QUOTES);
     $invent_asset_cost_acct = htmlspecialchars($obj['invent_asset_cost_acct'], ENT_QUOTES);
     $invent_accum = htmlspecialchars($obj['invent_accum'], ENT_QUOTES);
     $invent_accout_description = htmlspecialchars($obj['invent_accout_description'], ENT_QUOTES);
     $invent_employee_name = htmlspecialchars($obj['invent_employee_name'], ENT_QUOTES);
     $invent_employee_number = htmlspecialchars($obj['invent_employee_number'], ENT_QUOTES);
     $invent_serial_no = htmlspecialchars($obj['invent_serial_no'], ENT_QUOTES);
     $invent_asset_serial_no = htmlspecialchars($obj['invent_asset_serial_no'], ENT_QUOTES);
     $invent_cat = htmlspecialchars($obj['invent_cat'], ENT_QUOTES);
     $invent_status_id = $obj['invent_status_id'];
     $hospital_id = $obj['hospital_id'];
     $department_id = $obj['department_id'];
     $invent_waranty_date = $obj['invent_waranty_date'];
     $invent_buy_date = $obj['invent_buy_date'];
     $invent_remark = htmlspecialchars($obj['invent_remark'], ENT_QUOTES);
     $invent_recivedate = $obj['invent_recivedate'];
     $invent_installdate = $obj['invent_installdate'];
     $invent_warranty_expire = $obj['invent_warranty_expire'];
     $invent_vender = htmlspecialchars($obj['invent_vender'], ENT_QUOTES);
     $invent_contactvender = htmlspecialchars($obj['invent_contactvender'], ENT_QUOTES);
     $invent_invoice_number = htmlspecialchars($obj['invent_invoice_number'], ENT_QUOTES);
     $invent_rent = htmlspecialchars($obj['invent_rent'], ENT_QUOTES);
     $invent_site = htmlspecialchars($obj['invent_site'], ENT_QUOTES);
     $invent_update_by = $obj['invent_update_by'];


     $q9=mysql_query("SELECT * FROM phya_costcenter WHERE costcenter_description = '$obj[costcenter_description]' ");
     $row9 = $row9=mysql_fetch_assoc($q9);
     $costcenter_id = $row9['costcenter_id'];

	  $q=mysql_query("SELECT * FROM phya_inventory WHERE invent_id = '$invent_id' AND department_id = '$department_id'  AND invent_mark_status != '0'  ");
	  if(mysql_num_rows($q) < 1 ){
		  $result = mysql_query("UPDATE phya_inventory SET
			invent_location = '0,0'
			WHERE invent_id = '$invent_id'
			");
	  }

	    if($invent_wifi_mac_address == ":::::"){
			$invent_wifi_mac_address = "";
		}
		if($invent_mac_ethernet == ":::::"){
			$invent_mac_ethernet = "";
		}

    $count=mysql_query("SELECT * FROM phya_inventory WHERE invent_tag_no = '$invent_asset_no' AND invent_id != '$invent_id' ");
    if(mysql_num_rows($count) > 0){
      $json = array('res_code' => '02','res_text' => "ไม่สามารถบันทึกได้ Tag Number นี้มีในระบบแล้ว",'status' => 'no');
    }else{

	   $result = mysql_query("UPDATE phya_inventory SET
	   					cat_id = '".$cat_id."',
							brand_id = '".$brand_id."',
              invent_asset_account = '".$invent_asset_account."',
							invent_asset_cat = '".$invent_asset_cat."',
							invent_asset_cat_description = '".$invent_asset_cat_description."',
							costcenter_id = '".$costcenter_id."',
							invent_model = '".$invent_model."',
							invent_specification = '".$invent_specification."',
							invent_comp_name = '".$invent_comp_name."',
							invent_wifi_mac_address = '".$invent_wifi_mac_address."',
							invent_mac_ethernet = '".$invent_mac_ethernet."',
							invent_asset_location = '".$invent_asset_location."',
							invent_tag_no = '".$invent_tag_no."',
							invent_asset_no = '".$invent_asset_no."',
              invent_major_cat = '".$invent_major_cat."',
              invent_minor_cat = '".$invent_minor_cat."',
              invent_cat_name = '".$invent_cat_name."',
              invent_asset_description = '".$invent_asset_description."',
              invent_unit = '".$invent_unit."',
              invent_cost = '".$invent_cost."',
              invent_depreciation = '".$invent_depreciation."',
              invent_depreciation_reserve = '".$invent_depreciation_reserve."',
              invent_nbv = '".$invent_nbv."',
              invent_life_year = '".$invent_life_year."',
              invent_dateofacquistion = '".$invent_dateofacquistion."',
              invent_asset_cost_acct = '".$invent_asset_cost_acct."',
              invent_accum = '".$invent_accum."',
              invent_accout_description = '".$invent_accout_description."',
              invent_employee_name = '".$invent_employee_name."',
              invent_employee_number = '".$invent_employee_number."',
              invent_serial_no = '".$invent_serial_no."',
              invent_asset_serial_no = '".$invent_asset_serial_no."',
              invent_cat = '".$invent_cat."',
              invent_status_id = '".$invent_status_id."',
              hospital_id = '".$hospital_id."',
              department_id = '".$department_id."',
              invent_waranty_date = '".$invent_waranty_date."',
              invent_buy_date = '".$invent_buy_date."',
              invent_remark = '".$invent_remark."',
              invent_recivedate = '".$invent_recivedate."',
              invent_installdate = '".$invent_installdate."',
              invent_warranty_expire = '".$invent_warranty_expire."',
              invent_vender = '".$invent_vender."',
              invent_contactvender = '".$invent_contactvender."',
              invent_invoice_number = '".$invent_invoice_number."',
              invent_rent = '".$invent_rent."',
              invent_site = '".$invent_site."',
              invent_update_date = NOW(),
              invent_update_by = '".$invent_update_by."'
							WHERE invent_id = '$invent_id'
							");


	   if($result){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }
   }
       echo json_encode($json);

	}else if ($obj['api_id'] == 25) {

	   $hospital_id = $obj['hospital_id'];
	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		   $sql2 = sqlOR_q($hospital_id,"hospital_id");
	   }

	   $q=mysql_query("SELECT * FROM phya_department a INNER JOIN phya_floor b ON a.floor_id=b.floor_id
	   INNER JOIN phya_building c ON b.building_id=c.building_id WHERE hospital_id !='' ".$sql2);

	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
			$output[]=$row;
		  }

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => $hospital_id,'status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 26) {


	   $q=mysql_query("SELECT * FROM phya_position");

	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
			$output[]=$row;
		  }

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => $hospital_id,'status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 27) {

	   $invent_id = $obj['invent_id'];
	   $hospital_id = $obj['hospital_id'];
     $costcenter_id = $obj['costcenter_id'];
	   if(isset($obj['hospital_id']) && $obj['hospital_id'] != ''){
		   $sql2 = sqlOR_q($hospital_id,"hospital_id");
	   }
     if($obj['emp_status_allview'] == 0){
		  $sql_cost = " AND costcenter_id = '$costcenter_id' ";
	   }
	   $q=mysql_query("SELECT * FROM phya_inventory WHERE invent_mark_status != 0 ".$sql_cost." AND invent_id ='$invent_id' ".$sql2);

	   if(mysql_num_rows($q) > 0){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 28) {

	   $invent_owner_id = $obj['invent_owner_id'];
	   $invent_own_start = $obj['invent_own_start'];
	   $invent_own_stop = $obj['invent_own_stop'];
     $invent_own_updateby = $obj['invent_own_updateby'];

	   if(isset($obj['invent_own_start']) && $obj['invent_own_start'] != ''){
		   $sql = " invent_own_start = '".$invent_own_start."' ";
	   }
	   if(isset($obj['invent_own_stop']) && $obj['invent_own_stop'] != ''){
		   $sql = " invent_own_stop = '".$invent_own_stop."' ";
	   }


	   $result = mysql_query("UPDATE phya_inventory_owner SET
							".$sql.",
              invent_own_updateby = '".$invent_own_updateby."',
              invent_own_updatedate = NOW()
							WHERE invent_owner_id = '$invent_owner_id'
							");
	   if($result){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}/*else if ($obj['api_id'] == 29) {


	   $q=mysql_query("SELECT * FROM phya_employee_department");

	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
			$output[]=$row;
		  }

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => $hospital_id,'status' => 'no');
	   }

       echo json_encode($json);

	}*/else if ($obj['api_id'] == 30) {

	   $group_id  = $obj['group_id'];
	   $page_name = $obj['page_name'];
	   $hospital_id = $obj['hospital_id'];

	   if(isset($obj['page_name']) && $obj['page_name'] != ''){
		  $sql = " and page_name = '$page_name' ";
	   }

		if (strpos($hospital_id, ',') !== false) {
			$sql2 = " and page_flag = '0' ";
		}

	   $emp_password2 = md5($emp_password);
	   $q=mysql_query("SELECT * FROM phya_page WHERE page_device = 0 GROUP BY page_name ORDER BY page_id ASC  ");
	   if(mysql_num_rows($q) > 0){
	   		while($row=mysql_fetch_assoc($q)){
				$response = array(
					"page_name" => $row['page_name']
				);
				$output[]=$response;
				$id[]= $row['page_name'];
		    }

			foreach ($output as $key => $phya_page) {
				$q2=mysql_query("SELECT * FROM phya_page a LEFT JOIN phya_group_permission b ON a.page_id=b.page_id   where page_name = '$id[$key]' AND page_device = 0 AND group_id = '$group_id' ".$sql2);
					while($row2=mysql_fetch_assoc($q2))
					{
						$response = array(
							"page_permission" => $row2['page_permission'],
							"page_name" => $row2['page_name']
						);
						$output3[]=$response;
						$output[$key]['phya_page'] = $output3 ;
					}
					$output3 = array();

			}
			$json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 31) {

	   $emp_email = $obj["emp_email"];

	  	 $q=mysql_query("SELECT * FROM phya_employee WHERE emp_email = '$emp_email' AND emp_status = '1' ");

		   if( mysql_num_rows($q) > 0 ){
			$row=mysql_fetch_assoc($q);
			$mailsent = $row['emp_email'];
			$namesent = $row['emp_name']." ".$row['emp_lastname'];
			$newpassword = random_password();

			 $message = "<table cellpadding=\"5\" cellspacing=\"0\">
			  <tr >
				  <td>
				  </td>
			  </tr>
			   <td style=\" color:#000;font-size:16px; \">
				สวัสดี ".$row['emp_name']." ".$row['emp_lastname']."
			   </td>
			  </tr>
			  <tr>
			   <td style=\" color:#707070;font-size:15px; \">
				เราได้รับคำขอให้รีเซ็ตรหัสผ่าน App Phyathai ของคุณ
			   </td>
			  </tr>
			  <tr ><td></td></tr>
			  <tr>
			   <td style=\" color:#707070;font-size:15px; \">
				Email : ".$row['emp_email']."
			   </td>
			  </tr>
			  <tr>
			   <td style=\" color:#707070;font-size:15px; \">
				Password : ".$newpassword."
			   </td>
			  </tr>
			  <tr ><td></td></tr><tr ><td></td></tr>
			  <tr>
			   <td style=\" color:#707070;font-size:15px; \">
				คุณสามารถใช้ Email และ Password นี้เข้าใช้งานได้ที่ App Phyathai

			   </td>
			  </tr>
			  <tr>
			   <td style=\" font-size:15px; \">
				Team www.phyathai.com
			   </td>
			  </tr>
			 </table>";

			sendEmail("noreply.pyt@gmail.com","Noreply Phyathai",array($mailsent),array($namesent),"รีเซ็ตรหัสผ่านของคุณ",$message,$newpassword,$emp_email);
		   }
		   else
		   {
				$json = array('res_code' => '02','res_text' => 'ไม่มีข้อมูล','status' => 'no');
			    echo json_encode($json);
		   }
	}else if ($obj['api_id'] == 32){
    $q1=mysql_query("SELECT * FROM phya_inventory_status");
    $q2=mysql_query("SELECT * FROM phya_costcenter");
    if(mysql_num_rows($q1) > 0 || mysql_num_rows($q2) > 0){

       $response = array(
         "fake" => "fake"
       );
       $output[]=$response;

       foreach ($output as $key => $status) {
         while($row1=mysql_fetch_assoc($q1))
         {
           $output1[]=$row1;
           $output[$key]['status_in'] = $output1 ;
         }
         $output1 = array();
       }
       foreach ($output as $key => $cost) {
         while($row2=mysql_fetch_assoc($q2))
         {
           $output1[]=$row2;
           $output[$key]['Cost'] = $output1 ;
         }
         $output1 = array();
       }

     $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
    }else{
     $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
    }
    echo json_encode($json);

  }else if ($obj['api_id'] == 33) {

	   $log_empid = $obj['log_empid'];
	   $log_page = $obj['log_page'];
	   $log_method = $obj['log_method'];
     $log_ref = $obj['log_ref'];
     $log_type = $obj['log_type'];

		$strSQL = "INSERT INTO phya_log (log_empid,log_page,log_method,log_ref,log_type,log_date)
			VALUES (
				'".$log_empid."',
				'".$log_page."',
				'".$log_method."',
				'".$log_ref."',
        '".$log_type."',
        NOW()
				)
			";

     $result = mysql_query($strSQL);
	   if($result ){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok');
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 34) {

    $version_number = $obj['version_number'];
    $version_type = $obj['version_type'];

     $q1=mysql_query("SELECT * FROM phya_version WHERE version_type = '$version_type' ");
	   $q2=mysql_query("SELECT * FROM phya_version WHERE version_number = '$version_number' and version_type = '$version_type' ");
     while($row=mysql_fetch_assoc($q1)){
          $output[]=$row;
     }
	   if(mysql_num_rows($q2) > 0){
		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no','result' => $output);
	   }

       echo json_encode($json);

	}else if ($obj['api_id'] == 35) {

	   $group_id = $obj['group_id'];

     $q=mysql_query("SELECT * FROM phya_info_permission a INNER JOIN phya_info b
       ON a.info_id=b.info_id where info_device = 0 AND  group_id = '$group_id' ORDER BY b.info_id ASC ");


	   if(mysql_num_rows($q) > 0){
		  while($row=mysql_fetch_assoc($q)){
        $response = array(
          "info_name" => $row['info_name']
        );
			  $output[]=$response;
		  }

		  $json = array('res_code' => '01','res_text' => 'success','status' => 'ok','result' => $output);
	   }else{
		  $json = array('res_code' => '00','res_text' => 'ไม่มีข้อมูล','status' => 'no');
	   }
       echo json_encode($json);
	}





?>
