<?php  
// test
include("../db/db_connect.php"); // เรียกใช้ไฟล์ ตั้งค่า และฟังก์ชั่น เกี่ยวกับฐานข้อมูล  
$mysqli = connect(); // สร้าง ตัวแปร mysql instance สำหรับเรียกใช้งานฐานข้อมูล  
// ส่วนแรก คือสำหรับแสดงผลข้อมูล  
if(isset($_GET['viewSch'])){  // ส่งตัวแปร GET ชื่อ viewSch มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql=" AND sch_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM sch WHERE 1 $more_sql ";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        "sch_smis"=>$rs->sch_smis,      // "id" เป็นตัวแปรที่ส่งไป ส่วน id เป็นชื่อ คอลัมใน db
        "sch_ten"=>$rs->sch_ten,
        "sch_name"=>$rs->sch_name,  
        "sch_name_e"=>$rs->sch_name_e,
        "sch_promote"=>$rs->sch_promote,
        "sch_director"=>$rs->sch_director,
        "sch_village"=>$rs->sch_village,
        "sch_tambon"=>$rs->sch_tambon,
        "sch_amphoe"=>$rs->sch_amphoe,
        "sch_city"=>$rs->sch_city,
        "sch_postal"=>$rs->sch_postal,
        "sch_email"=>$rs->sch_email,
        "sch_web"=>$rs->sch_web,
        "sch_tel1"=>$rs->sch_tel1,
        "sch_fax"=>$rs->sch_fax,
        "sch_to_office"=>$rs->sch_to_office,   
        "sch_to_amphoe"=>$rs->sch_to_amphoe,         
        "sch_type"=>$rs->sch_type,  
        "sch_update"=>$rs->sch_update,  
      
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      
}else{  
echo $json;  
}      
    exit;  
}  

// ส่วนสำหรับการเพิ่มข้อมูล  
if(isset($_GET['addSch'])){ // ส่งตัวแปร GET ชื่อ addSch มากำหนดให้ทำงานในส่วนนี้  
    // จะเห็นว่า การส่งค่าแบบ post มา จะไม่ได้รับค่าแบบตรงอ้างอิง $_POST['xxx'] ได้เลย  
    // แต่เป็นการไปอ่านค่าจากไฟล์ ที่ถูกเขียน ไว้ด้วย php อีกทีหนึ่ง  
    $data = json_decode(file_get_contents("php://input")); // ดึงข้อมูลจากไฟล์ มาใส่ตัวแปร object ชื่อ $data  
    $smis=$mysqli->real_escape_string($data->smis); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $name=$mysqli->real_escape_string($data->name); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $tel=$mysqli->real_escape_string($data->tel);  
    $address=$mysqli->real_escape_string($data->address);  
    // ชุดข้อมูลและฟิลด์ที่จะบันทึก อันนี้เป็นฟังก์ชั่นเฉพาะที่่เราใช้งาน  
    // ใครจะเขียนแบบ mysqli ปกติก็ได้  
    $data=array(
        "sch_smis"=>$smis,
        "sch_name"=>$name,  
        "sch_tel1"=>$tel,  
        "sch_ten"=>$address,  
    );  
    insert("ap",$data); // ฟังชั่นบันทึกข้อมูล ง่ายๆ ไม่กี่บรรทัด  
    exit;  
}  
// สำหรับการลบข้อมูล  
if(isset($_GET['deleteSch'])){  
    delete("sch"," sch_smis='".$_GET['Id']."' "); // ลบข้อมูลตามตัวแปร Id ที่ส่งเข้ามา  
    exit;  
}  
// สำหรับการแก้ไขข้อมูล  
if(isset($_GET['updateFriend'])){ // ทำงานในส่วนนี้เมื่อมีค่าค่า get updateFriend และ Id เข้ามา  
    // อ่านค่าไฟล์ที่ถูกเขียนไว้ด้วย php แล้วนำค่าที่ได้มาเก็บในตัวแปร php object ชื่อ $data  
    $data = json_decode(file_get_contents("php://input"));  
    $smis=$mysqli->real_escape_string($data->smis); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $name=$mysqli->real_escape_string($data->name); // เอาค่ามาเก็บในตัวแปรอีกทีหนึ่ง  
    $tel=$mysqli->real_escape_string($data->tel);  
    $address=$mysqli->real_escape_string($data->address);  
    $data=array(  
        "sch_smis"=>$smis,
        "sch_name"=>$name,  
        "sch_tel1"=>$tel,  
        "sch_ten"=>$address,   
    );  
    update("",$data," sch_smis='".$_GET['Id']."' "); // ฟังก์ชั่นแก้ไขข้อมูล  
    exit;  
} 

///////////////////////////// AP /////////////////////////////
if(isset($_GET['viewAp'])){  // ส่งตัวแปร GET ชื่อ viewUso มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql= "LEFT OUTER JOIN sch ON ap.ap_smis=sch.sch_smis LEFT OUTER JOIN device ON ap.ap_smis = device.de_smis WHERE ap_smis='".$_GET['Id']."' ";  //$more_sql=" AND uso_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM ap $more_sql ";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        //
        "ap_smis"=>$rs->ap_smis,      // "id" เป็นตัวแปรที่ส่งไป ส่วน id เป็นชื่อ คอลัมใน db
        "ap_sch"=>$rs->ap_sch,  
        "ap_city"=>$rs->ap_city,   
        "ap_teacher"=>$rs->ap_teacher,
        "ap_tel1"=>$rs->ap_tel1,
        "ap_tea_mail"=>$rs->ap_tea_mail,
        "ap_sum"=>$rs->ap_sum,
        "ap_team"=>$rs->ap_team,
        "ap_note"=>$rs->ap_note,
        "ap_solve"=>$rs->ap_solve,
        "ap_last_pm_date"=>$rs->ap_last_pm_date,
        "ap_last_pm_time"=>$rs->ap_last_pm_time,
        "ap_dealer"=>$rs->ap_dealer,
        "ap_dealer_tel"=>$rs->ap_dealer_tel,
       
        
        // /*> Sch TB 
        "sch_name_e"=>$rs->sch_name_e,
        "sch_ten"=>$rs->sch_ten,
        "sch_director"=>$rs->sch_director,
        "sch_village"=>$rs->sch_village,
        "sch_tambon"=>$rs->sch_tambon,
        "sch_amphoe"=>$rs->sch_amphoe,
        "sch_city"=>$rs->sch_city,
        "sch_postal"=>$rs->sch_postal,
        "sch_email"=>$rs->sch_email,
        "sch_web"=>$rs->sch_web,
        "sch_tel1"=>$rs->sch_tel1,
        "sch_fax"=>$rs->sch_fax,
        "sch_to_amphoe"=>$rs->sch_to_amphoe,  
        "sch_type"=>$rs->sch_type,  
        
        // Device
        "de_id"=>$rs->de_id,
        "de_sn"=>$rs->de_sn, 
        "de_name"=>$rs->de_name, 
        "de_project"=>$rs->de_project, 
        "de_type"=>$rs->de_type,
        "de_stat"=>$rs->de_stat,
        "de_smis"=>$rs->de_smis,
        "de_warranty_end"=>$rs->de_warranty_end,
        "de_note"=>$rs->de_note,
         
        
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      

}else{  
echo $json;  
}      
    exit;  
}  

if(isset($_GET['ApviewAp'])){  // ส่งตัวแปร GET ชื่อ viewUso มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql= "AND de_smis='".$_GET['Id']."' ";  //$more_sql=" AND uso_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM ap right outer JOIN device ON ap.ap_smis=device.de_smis where de_project = 'AP' $more_sql ";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        //
        "ap_smis"=>$rs->ap_smis,      // "id" เป็นตัวแปรที่ส่งไป ส่วน id เป็นชื่อ คอลัมใน db
        "ap_sch"=>$rs->ap_sch,  
        "ap_city"=>$rs->ap_city,   
        "ap_teacher"=>$rs->ap_teacher,
        "ap_tel1"=>$rs->ap_tel1,
        "ap_tea_mail"=>$rs->ap_tea_mail,
        "ap_sum"=>$rs->ap_sum,
        "ap_team"=>$rs->ap_team,
        "ap_note"=>$rs->ap_note,
        "ap_solve"=>$rs->ap_solve,
        "ap_last_pm_date"=>$rs->ap_last_pm_date,
        "ap_last_pm_time"=>$rs->ap_last_pm_time,
        "ap_dealer"=>$rs->ap_dealer,
        "ap_dealer_tel"=>$rs->ap_dealer_tel,
       
        
        
        "de_id"=>$rs->de_id,
        "de_sn"=>$rs->de_sn, 
        "de_name"=>$rs->de_name, 
        "de_project"=>$rs->de_project, 
        "de_type"=>$rs->de_type,
        "de_stat"=>$rs->de_stat,
        "de_smis"=>$rs->de_smis,
        "de_warranty_end"=>$rs->de_warranty_end,
        "de_note"=>$rs->de_note,
        
        
        
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      

}else{  
echo $json;  
}      
    exit;  
}  

if(isset($_GET['viewApSn'])){  // ส่งตัวแปร GET ชื่อ viewUso มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql= "AND de_sn='".$_GET['Id']."' ";  //$more_sql=" AND uso_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM ap right outer JOIN device ON ap.ap_smis=device.de_smis where de_project = 'AP' $more_sql ";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        //
      
        
        "de_id"=>$rs->de_id,
        "de_sn"=>$rs->de_sn, 
        "de_name"=>$rs->de_name, 
        "de_project"=>$rs->de_project, 
        "de_type"=>$rs->de_type,
        "de_stat"=>$rs->de_stat,
        "de_smis"=>$rs->de_smis,
        "de_warranty_end"=>$rs->de_warranty_end,
        "de_note"=>$rs->de_note,
        
        
        
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      

}else{  
echo $json;  
}      
    exit;  
}  

if(isset($_GET['addAp'])){ // ส่งตัวแปร GET ชื่อ addSch มากำหนดให้ทำงานในส่วนนี้  
    // จะเห็นว่า การส่งค่าแบบ post มา จะไม่ได้รับค่าแบบตรงอ้างอิง $_POST['xxx'] ได้เลย  
    // แต่เป็นการไปอ่านค่าจากไฟล์ ที่ถูกเขียน ไว้ด้วย php อีกทีหนึ่ง  
    $data = json_decode(file_get_contents("php://input")); // ดึงข้อมูลจากไฟล์ มาใส่ตัวแปร object ชื่อ $data  
    
    
    $de_sn=$mysqli->real_escape_string($data->de_sn); 
    $de_name=$mysqli->real_escape_string($data->de_name);
    $de_project=$mysqli->real_escape_string($data->de_project);  
    $de_type=$mysqli->real_escape_string($data->de_type);  
    $de_stat=$mysqli->real_escape_string($data->de_stat);  
    $de_smis=$mysqli->real_escape_string($data->de_smis); 
    $de_warranty_end=$mysqli->real_escape_string($data->de_warranty_end); 
    $de_note=$mysqli->real_escape_string($data->de_note); 
    
    // ชุดข้อมูลและฟิลด์ที่จะบันทึก อันนี้เป็นฟังก์ชั่นเฉพาะที่่เราใช้งาน  
    // ใครจะเขียนแบบ mysqli ปกติก็ได้  
    $data=array(
    "de_sn"=>$de_sn,
    "de_name"=>$de_name,
    "de_project"=>$de_project, 
    "de_type"=>$de_type, 
    "de_stat"=>$de_stat, 
    "de_smis"=>$de_smis,
    "de_warranty_end"=>$de_warranty_end,
    "de_note"=>$de_note,
 
        
    );  
    insert("device",$data); // ฟังชั่นบันทึกข้อมูล ง่ายๆ ไม่กี่บรรทัด  
    exit;  
}  

if(isset($_GET['updateAp'])){ // ทำงานในส่วนนี้เมื่อมีค่าค่า get updateFriend และ Id เข้ามา  
    // อ่านค่าไฟล์ที่ถูกเขียนไว้ด้วย php แล้วนำค่าที่ได้มาเก็บในตัวแปร php object ชื่อ $data  
    $data = json_decode(file_get_contents("php://input"));  
   /* $smis=$mysqli->real_escape_string($data->smis); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $name=$mysqli->real_escape_string($data->name); // เอาค่ามาเก็บในตัวแปรอีกทีหนึ่ง  
    $tel=$mysqli->real_escape_string($data->tel);  
    $address=$mysqli->real_escape_string($data->address);  
    * */
    
         
            $ap_smis=$mysqli->real_escape_string($data->ap_smis);
            $ap_sch=$mysqli->real_escape_string($data->ap_sch);  
            $ap_city=$mysqli->real_escape_string($data->ap_city);   
            $ap_teacher=$mysqli->real_escape_string($data->ap_teacher);
            $ap_tel1=$mysqli->real_escape_string($data->ap_tel1);
            $ap_tea_mail=$mysqli->real_escape_string($data->ap_tea_mail);
            $ap_sum=$mysqli->real_escape_string($data->ap_sum);
            $ap_team=$mysqli->real_escape_string($data->ap_team);
            $ap_note=$mysqli->real_escape_string($data->ap_note);
            $ap_solve=$mysqli->real_escape_string($data->ap_solve);

            // ชุดข้อมูลและฟิลด์ที่จะบันทึก อันนี้เป็นฟังก์ชั่นเฉพาะที่่เราใช้งาน  
            // ใครจะเขียนแบบ mysqli ปกติก็ได้  
            $data=array(
            "ap_smis"=>$ap_smis,
            "ap_sch"=>$ap_sch,  
            "ap_city"=>$ap_city,   
            "ap_teacher"=>$ap_teacher,
            "ap_tel1"=>$ap_tel1,
            "ap_tea_mail"=>$ap_tea_mail,
            "ap_sum"=>$ap_sum,
            "ap_team"=>$ap_team,
            "ap_note"=>$ap_note,
            "ap_solve"=>$ap_solve,     
       
    );  
    
    
    update("ap",$data,"ap_smis='".$_GET['Id']."' "); // ฟังก์ชั่นแก้ไขข้อมูล  
    exit;  
} 

if(isset($_GET['updateApSn'])){ // ทำงานในส่วนนี้เมื่อมีค่าค่า get updateFriend และ Id เข้ามา  
    // อ่านค่าไฟล์ที่ถูกเขียนไว้ด้วย php แล้วนำค่าที่ได้มาเก็บในตัวแปร php object ชื่อ $data  
    $data = json_decode(file_get_contents("php://input"));  
   /* $smis=$mysqli->real_escape_string($data->smis); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $name=$mysqli->real_escape_string($data->name); // เอาค่ามาเก็บในตัวแปรอีกทีหนึ่ง  
    $tel=$mysqli->real_escape_string($data->tel);  
    $address=$mysqli->real_escape_string($data->address);  
    * */
    
            $de_sn=$mysqli->real_escape_string($data->de_sn); 
            $de_name=$mysqli->real_escape_string($data->de_name);
            $de_project=$mysqli->real_escape_string($data->de_project);  
            $de_type=$mysqli->real_escape_string($data->de_type);  
            $de_stat=$mysqli->real_escape_string($data->de_stat);  
            $de_smis=$mysqli->real_escape_string($data->de_smis); 
            $de_warranty_end=$mysqli->real_escape_string($data->de_warranty_end); 
            $de_note=$mysqli->real_escape_string($data->de_note); 

            // ชุดข้อมูลและฟิลด์ที่จะบันทึก อันนี้เป็นฟังก์ชั่นเฉพาะที่่เราใช้งาน  
            // ใครจะเขียนแบบ mysqli ปกติก็ได้  
            $data=array(
            "de_sn"=>$de_sn,
            "de_name"=>$de_name,
            "de_project"=>$de_project, 
            "de_type"=>$de_type, 
            "de_stat"=>$de_stat, 
            "de_smis"=>$de_smis,
            "de_warranty_end"=>$de_warranty_end,
            "de_note"=>$de_note,
        
       
    );  
    
    
    update("device",$data,"de_sn='".$_GET['Id']."' "); // ฟังก์ชั่นแก้ไขข้อมูล  
    exit;  
} 

///////////////////////////// E-Classroom /////////////////////////////
if(isset($_GET['viewEcr'])){  // ส่งตัวแปร GET ชื่อ viewUso มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql= "INNER JOIN sch ON ecr.ecr_smis=sch.sch_smis WHERE ecr_smis='".$_GET['Id']."' ";  //$more_sql=" AND uso_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM ecr $more_sql ";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        //
        "ecr_smis"=>$rs->ecr_smis,      // "id" เป็นตัวแปรที่ส่งไป ส่วน id เป็นชื่อ คอลัมใน db
        "ecr_sch"=>$rs->ecr_sch,   
        "ecr_city"=>$rs->ecr_city,   
        "ecr_teacher"=>$rs->ecr_teacher,
        "ecr_tea_mobile"=>$rs->ecr_tea_mobile,
        "ecr_tea_mail"=>$rs->ecr_tea_mobile,
        "ecr_isp"=>$rs->ecr_isp,
        "ecr_dealer"=>$rs->ecr_dealer,
        "ecr_dealer_tel"=>$rs->ecr_dealer_tel,
        "ecr_conference"=>$rs->ecr_conference,
        "ecr_iptv"=>$rs->ecr_iptv,
        "ecr_iptv_multicast"=>$rs->ecr_iptv_multicast,
        "ecr_dmp_regis"=>$rs->ecr_dmp_regis,
        "ecr_note1"=>$rs->ecr_note1,
        "ecr_note2"=>$rs->ecr_note2,
        "ecr_note3"=>$rs->ecr_note3,
        "ecr_room"=>$rs->ecr_room,
        "ecr_codec_stat"=>$rs->ecr_codec_stat,
        "ecr_codec_note"=>$rs->ecr_codec_note,
        "ecr_codec_solve"=>$rs->ecr_codec_solve,
        "ecr_dmp_stat"=>$rs->ecr_dmp_stat,
        "ecr_dmp_note"=>$rs->ecr_dmp_note,
        "ecr_dmp_solve"=>$rs->ecr_dmp_solve,
        "ecr_edge_stat"=>$rs->ecr_edge_stat,
        "ecr_edge_note"=>$rs->ecr_edge_note,
        "ecr_edge_solve"=>$rs->ecr_edge_solve,
        "ecr_sw_stat"=>$rs->ecr_sw_stat,
        "ecr_sw_note"=>$rs->ecr_sw_note,
        "ecr_sw_solve"=>$rs->ecr_sw_solve,
        "ecr_board_stat"=>$rs->ecr_board_stat,
        "ecr_board_note"=>$rs->ecr_board_note,
        "ecr_board_solve"=>$rs->ecr_board_solve,
        "ecr_vis_stat"=>$rs->ecr_vis_stat,
        "ecr_vis_note"=>$rs->ecr_vis_note,
        "ecr_vis_solve"=>$rs->ecr_vis_solve,
        "ecr_tv1_stat"=>$rs->ecr_tv1_stat,
        "ecr_tv1_note"=>$rs->ecr_tv1_note,
        "ecr_tv1_solve"=>$rs->ecr_tv1_solve,
        "ecr_tv2_stat"=>$rs->ecr_tv2_stat,
        "ecr_tv2_note"=>$rs->ecr_tv2_note,
        "ecr_tv2_solve"=>$rs->ecr_tv2_solve,
        "ecr_printer_stat"=>$rs->ecr_printer_stat,
        "ecr_printer_note"=>$rs->ecr_printer_note,
        "ecr_printer_solve"=>$rs->ecr_printer_solve,
        "ecr_table_stat"=>$rs->ecr_table_stat,
        "ecr_table_note"=>$rs->ecr_table_note,
        "ecr_table_solve"=>$rs->ecr_table_solve,
        "ecr_compo_stat"=>$rs->ecr_compo_stat,
        "ecr_compo_note"=>$rs->ecr_compo_stat,
        "ecr_compo_solve"=>$rs->ecr_compo_stat,

       
        
        // /*> Sch TB 
        "sch_name_e"=>$rs->sch_name_e,
        "sch_ten"=>$rs->sch_ten,
        "sch_director"=>$rs->sch_director,
        "sch_village"=>$rs->sch_village,
        "sch_tambon"=>$rs->sch_tambon,
        "sch_amphoe"=>$rs->sch_amphoe,
        "sch_city"=>$rs->sch_city,
        "sch_postal"=>$rs->sch_postal,
        "sch_email"=>$rs->sch_email,
        "sch_web"=>$rs->sch_web,
        "sch_tel1"=>$rs->sch_tel1,
        "sch_fax"=>$rs->sch_fax,
        "sch_to_amphoe"=>$rs->sch_to_amphoe,  
        "sch_type"=>$rs->sch_type,  
         
        
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      

}else{  
echo $json;  
}      
    exit;  
}  

if(isset($_GET['updateEcr'])){ // ทำงานในส่วนนี้เมื่อมีค่าค่า get updateFriend และ Id เข้ามา  
    // อ่านค่าไฟล์ที่ถูกเขียนไว้ด้วย php แล้วนำค่าที่ได้มาเก็บในตัวแปร php object ชื่อ $data  
    $data = json_decode(file_get_contents("php://input"));  
   /* $smis=$mysqli->real_escape_string($data->smis); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $name=$mysqli->real_escape_string($data->name); // เอาค่ามาเก็บในตัวแปรอีกทีหนึ่ง  
    $tel=$mysqli->real_escape_string($data->tel);  
    $address=$mysqli->real_escape_string($data->address);  
    * */
        $ecr_smis=$mysqli->real_escape_string($data->ecr_smis);      
        $ecr_sch=$mysqli->real_escape_string($data->ecr_sch);   
        $ecr_city=$mysqli->real_escape_string($data->ecr_city);   
        $ecr_teacher=$mysqli->real_escape_string($data->ecr_teacher);
        $ecr_tea_mobile=$mysqli->real_escape_string($data->ecr_tea_mobile);
        $ecr_isp=$mysqli->real_escape_string($data->ecr_isp);
        $ecr_dealer=$mysqli->real_escape_string($data->ecr_dealer);
        $ecr_dealer_tel=$mysqli->real_escape_string($data->ecr_dealer_tel);
        $ecr_conference=$mysqli->real_escape_string($data->ecr_conference);
        $ecr_iptv=$mysqli->real_escape_string($data->ecr_iptv);
        $ecr_iptv_multicast=$mysqli->real_escape_string($data->ecr_iptv_multicast);
        $ecr_dmp_regis=$mysqli->real_escape_string($data->ecr_dmp_regis);
        $ecr_note1=$mysqli->real_escape_string($data->ecr_note1);
        $ecr_note2=$mysqli->real_escape_string($data->ecr_note2);
        $ecr_note3=$mysqli->real_escape_string($data->ecr_note3);
        $ecr_room=$mysqli->real_escape_string($data->ecr_room);
        $ecr_codec_stat=$mysqli->real_escape_string($data->ecr_codec_stat);
        $ecr_codec_note=$mysqli->real_escape_string($data->ecr_codec_note);
        $ecr_codec_solve=$mysqli->real_escape_string($data->ecr_codec_solve);
        $ecr_dmp_stat=$mysqli->real_escape_string($data->ecr_dmp_stat);
        $ecr_dmp_note=$mysqli->real_escape_string($data->ecr_dmp_note);
        $ecr_dmp_solve=$mysqli->real_escape_string($data->ecr_dmp_solve);
        $ecr_edge_stat=$mysqli->real_escape_string($data->ecr_edge_stat);
        $ecr_edge_note=$mysqli->real_escape_string($data->ecr_edge_note);
        $ecr_edge_solve=$mysqli->real_escape_string($data->ecr_edge_solve);
        $ecr_sw_stat=$mysqli->real_escape_string($data->ecr_sw_stat);
        $ecr_sw_note=$mysqli->real_escape_string($data->ecr_sw_note);
        $ecr_sw_solve=$mysqli->real_escape_string($data->ecr_sw_solve);
        $ecr_board_stat=$mysqli->real_escape_string($data->ecr_board_stat);
        $ecr_board_note=$mysqli->real_escape_string($data->ecr_board_note);
        $ecr_board_solve=$mysqli->real_escape_string($data->ecr_board_solve);
        $ecr_vis_stat=$mysqli->real_escape_string($data->ecr_vis_stat);
        $ecr_vis_note=$mysqli->real_escape_string($data->ecr_vis_note);
        $ecr_vis_solve=$mysqli->real_escape_string($data->ecr_vis_solve);
        $ecr_tv1_stat=$mysqli->real_escape_string($data->ecr_tv1_stat);
        $ecr_tv1_note=$mysqli->real_escape_string($data->ecr_tv1_note);
        $ecr_tv1_solve=$mysqli->real_escape_string($data->ecr_tv1_solve);
        $ecr_tv2_stat=$mysqli->real_escape_string($data->ecr_tv2_stat);
        $ecr_tv2_note=$mysqli->real_escape_string($data->ecr_tv2_note);
        $ecr_tv2_solve=$mysqli->real_escape_string($data->ecr_tv2_solve);
        $ecr_printer_stat=$mysqli->real_escape_string($data->ecr_printer_stat);
        $ecr_printer_note=$mysqli->real_escape_string($data->ecr_printer_note);
        $ecr_printer_solve=$mysqli->real_escape_string($data->ecr_printer_solve);
        $ecr_table_stat=$mysqli->real_escape_string($data->ecr_table_stat);
        $ecr_table_note=$mysqli->real_escape_string($data->ecr_table_note);
        $ecr_table_solve=$mysqli->real_escape_string($data->ecr_table_solve);
        $ecr_compo_stat=$mysqli->real_escape_string($data->ecr_compo_stat);
        $ecr_compo_note=$mysqli->real_escape_string($data->ecr_compo_stat);
        $ecr_compo_solve=$mysqli->real_escape_string($data->ecr_compo_stat);
     
       

    
    $data=array(  
        "ecr_smis"=>$ecr_smis,      
        "ecr_sch"=>$ecr_sch,   
        "ecr_city"=>$ecr_city,   
        "ecr_teacher"=>$ecr_teacher,
        "ecr_tea_mobile"=>$ecr_tea_mobile,
        "ecr_isp"=>$ecr_isp,
        "ecr_dealer"=>$ecr_dealer,
        "ecr_dealer_tel"=>$ecr_dealer_tel,
        "ecr_conference"=>$ecr_conference,
        "ecr_iptv"=>$ecr_iptv,
        "ecr_iptv_multicast"=>$ecr_iptv_multicast,
        "ecr_dmp_regis"=>$ecr_dmp_regis,
        "ecr_note1"=>$ecr_note1,
        "ecr_note2"=>$ecr_note2,
        "ecr_note3"=>$ecr_note3,
        "ecr_room"=>$ecr_room,
        "ecr_codec_stat"=>$ecr_codec_stat,
        "ecr_codec_note"=>$ecr_codec_note,
        "ecr_codec_solve"=>$ecr_codec_solve,
        "ecr_dmp_stat"=>$ecr_dmp_stat,
        "ecr_dmp_note"=>$ecr_dmp_note,
        "ecr_dmp_solve"=>$ecr_dmp_solve,
        "ecr_edge_stat"=>$ecr_edge_stat,
        "ecr_edge_note"=>$ecr_edge_note,
        "ecr_edge_solve"=>$ecr_edge_solve,
        "ecr_sw_stat"=>$ecr_sw_stat,
        "ecr_sw_note"=>$ecr_sw_note,
        "ecr_sw_solve"=>$ecr_sw_solve,
        "ecr_board_stat"=>$ecr_board_stat,
        "ecr_board_note"=>$ecr_board_note,
        "ecr_board_solve"=>$ecr_board_solve,
        "ecr_vis_stat"=>$ecr_vis_stat,
        "ecr_vis_note"=>$ecr_vis_note,
        "ecr_vis_solve"=>$ecr_vis_solve,
        "ecr_tv1_stat"=>$ecr_tv1_stat,
        "ecr_tv1_note"=>$ecr_tv1_note,
        "ecr_tv1_solve"=>$ecr_tv1_solve,
        "ecr_tv2_stat"=>$ecr_tv2_stat,
        "ecr_tv2_note"=>$ecr_tv2_note,
        "ecr_tv2_solve"=>$ecr_tv2_solve,
        "ecr_printer_stat"=>$ecr_printer_stat,
        "ecr_printer_note"=>$ecr_printer_note,
        "ecr_printer_solve"=>$ecr_printer_solve,
        "ecr_table_stat"=>$ecr_table_stat,
        "ecr_table_note"=>$ecr_table_note,
        "ecr_table_solve"=>$ecr_table_solve,
        "ecr_compo_stat"=>$ecr_compo_stat,
        "ecr_compo_note"=>$ecr_compo_stat,
        "ecr_compo_solve"=>$ecr_compo_stat,


    );  
    
    
    update("ecr",$data," ecr_smis='".$_GET['Id']."' "); // ฟังก์ชั่นแก้ไขข้อมูล  
    exit;  
} 


///////////////////////////// USO  //////////////////////////
if(isset($_GET['viewUso'])){  // ส่งตัวแปร GET ชื่อ viewUso มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql= "INNER JOIN sch ON uso.uso_smis=sch.sch_smis WHERE uso_smis='".$_GET['Id']."' ";  //$more_sql=" AND uso_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM uso $more_sql ";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        //
        "uso_smis"=>$rs->uso_smis,      // "id" เป็นตัวแปรที่ส่งไป ส่วน id เป็นชื่อ คอลัมใน db
        "uso_sch"=>$rs->uso_sch,  
        "uso_phase"=>$rs->uso_phase,  
        "uso_city"=>$rs->uso_city,   
        "uso_teacher"=>$rs->uso_teacher,
        "uso_tea_mobile"=>$rs->uso_tea_mobile,
        
        // /*> Sch TB 
        "sch_name_e"=>$rs->sch_name_e,
        "sch_ten"=>$rs->sch_ten,
        "sch_director"=>$rs->sch_director,
        "sch_village"=>$rs->sch_village,
        "sch_tambon"=>$rs->sch_tambon,
        "sch_amphoe"=>$rs->sch_amphoe,
        "sch_city"=>$rs->sch_city,
        "sch_postal"=>$rs->sch_postal,
        "sch_email"=>$rs->sch_email,
        "sch_web"=>$rs->sch_web,
        "sch_tel1"=>$rs->sch_tel1,
        "sch_fax"=>$rs->sch_fax,
        "sch_to_amphoe"=>$rs->sch_to_amphoe,  
        "sch_type"=>$rs->sch_type,  
         

        // อุปกรณ์
        "uso_server"=>$rs->uso_server,
        "uso_server_mo"=>$rs->uso_server_mo,
        "uso_server_stat"=>$rs->uso_server_stat,
            
        "uso_pc0"=>$rs->uso_pc0,
        "uso_pc0_mo"=>$rs->uso_pc0_mo,
        "uso_pc0_stat"=>$rs->uso_pc0_stat,
        
        "uso_pc1"=>$rs->uso_pc1,
        "uso_pc1_mo"=>$rs->uso_pc1_mo,
        "uso_pc1_stat"=>$rs->uso_pc1_stat,
        
        "uso_pc2"=>$rs->uso_pc2,
        "uso_pc2_mo"=>$rs->uso_pc2_mo,
        "uso_pc2_stat"=>$rs->uso_pc2_stat,
        
        "uso_pc3"=>$rs->uso_pc3,
        "uso_pc3_mo"=>$rs->uso_pc3_mo,
        "uso_pc3_stat"=>$rs->uso_pc3_stat,
        
        "uso_pc4"=>$rs->uso_pc4,
        "uso_pc4_mo"=>$rs->uso_pc4_mo,
        "uso_pc4_stat"=>$rs->uso_pc4_stat,
        
        "uso_pc5"=>$rs->uso_pc5,
        "uso_pc5_mo"=>$rs->uso_pc5_mo,
        "uso_pc5_stat"=>$rs->uso_pc5_stat,
        
        "uso_pc6"=>$rs->uso_pc6,
        "uso_pc6_mo"=>$rs->uso_pc6_mo,
        "uso_pc6_stat"=>$rs->uso_pc6_stat,
        
        "uso_pc7"=>$rs->uso_pc7,
        "uso_pc7_mo"=>$rs->uso_pc7_mo,
        "uso_pc7_stat"=>$rs->uso_pc7_stat,
        
        "uso_pc8"=>$rs->uso_pc8,
        "uso_pc8_mo"=>$rs->uso_pc8_mo,
        "uso_pc8_stat"=>$rs->uso_pc8_stat,
        
        "uso_pc9"=>$rs->uso_pc9,
        "uso_pc9_mo"=>$rs->uso_pc9_mo,
        "uso_pc9_stat"=>$rs->uso_pc9_stat,
        
        "uso_pc10"=>$rs->uso_pc10,
        "uso_pc10_mo"=>$rs->uso_pc10_mo,
        "uso_pc10_stat"=>$rs->uso_pc10_stat,
        
        "uso_ups1"=>$rs->uso_ups1,
        "uso_ups1_stat"=>$rs->uso_ups1_stat,
        
        "uso_ups6"=>$rs->uso_ups6,
        "uso_ups6_stat"=>$rs->uso_ups6_stat,
        
        "uso_printer"=>$rs->uso_printer,
        "uso_printer_stat"=>$rs->uso_printer_stat,
        
        "uso_projector"=>$rs->uso_projector,
        "uso_projector_stat"=>$rs->uso_projector_stat,
        
        "uso_dvd"=>$rs->uso_dvd,
        "uso_dvd_stat"=>$rs->uso_dvd_stat,
        
        "uso_lcd"=>$rs->uso_lcd,
        "uso_lcd_stat"=>$rs->uso_lcd_stat,
        
        "uso_rev"=>$rs->uso_rev,
        "uso_rev_stat"=>$rs->uso_rev_stat,
        
        "uso_air1"=>$rs->uso_air1,
        "uso_air1_stat"=>$rs->uso_air1_stat,
        
        "uso_air2"=>$rs->uso_air2,
        "uso_air2_stat"=>$rs->uso_air2_stat,
        
        "uso_update"=>$rs->uso_update,
        
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      

}else{  
echo $json;  
}      
    exit;  
}  

if(isset($_GET['updateUso'])){ // ทำงานในส่วนนี้เมื่อมีค่าค่า get updateFriend และ Id เข้ามา  
    // อ่านค่าไฟล์ที่ถูกเขียนไว้ด้วย php แล้วนำค่าที่ได้มาเก็บในตัวแปร php object ชื่อ $data  
    $data = json_decode(file_get_contents("php://input"));  
   /* $smis=$mysqli->real_escape_string($data->smis); // เอาค่าจาก DB มาเก็บในตัวแปรอีกทีหนึ่ง  
    $name=$mysqli->real_escape_string($data->name); // เอาค่ามาเก็บในตัวแปรอีกทีหนึ่ง  
    $tel=$mysqli->real_escape_string($data->tel);  
    $address=$mysqli->real_escape_string($data->address);  
    * */
        $uso_smis=$mysqli->real_escape_string($data->uso_smis);
        
        $uso_teacher=$mysqli->real_escape_string($data->uso_teacher);
        $uso_tea_mobile=$mysqli->real_escape_string($data->uso_tea_mobile);
        
        $uso_server=$mysqli->real_escape_string($data->uso_server);
        $uso_server_mo=$mysqli->real_escape_string($data->uso_server_mo);
        $uso_server_stat=$mysqli->real_escape_string($data->uso_server_stat);
            
        $uso_pc0=$mysqli->real_escape_string($data->uso_pc0);
        $uso_pc0_mo=$mysqli->real_escape_string($data->uso_pc0_mo);
        $uso_pc0_stat=$mysqli->real_escape_string($data->uso_pc0_stat);
        
        $uso_pc1=$mysqli->real_escape_string($data->uso_pc1);
        $uso_pc1_mo=$mysqli->real_escape_string($data->uso_pc1_mo);
        $uso_pc1_stat=$mysqli->real_escape_string($data->uso_pc1_stat);
        
        $uso_pc2=$mysqli->real_escape_string($data->uso_pc2);
        $uso_pc2_mo=$mysqli->real_escape_string($data->uso_pc2_mo);
        $uso_pc2_stat=$mysqli->real_escape_string($data->uso_pc2_stat);
        
        $uso_pc3=$mysqli->real_escape_string($data->uso_pc3);
        $uso_pc3_mo=$mysqli->real_escape_string($data->uso_pc3_mo);
        $uso_pc3_stat=$mysqli->real_escape_string($data->uso_pc3_stat);
        
        $uso_pc4=$mysqli->real_escape_string($data->uso_pc4);
        $uso_pc4_mo=$mysqli->real_escape_string($data->uso_pc4_mo);
        $uso_pc4_stat=$mysqli->real_escape_string($data->uso_pc4_stat);
        
        $uso_pc5=$mysqli->real_escape_string($data->uso_pc5);
        $uso_pc5_mo=$mysqli->real_escape_string($data->uso_pc5_mo);
        $uso_pc5_stat=$mysqli->real_escape_string($data->uso_pc5_stat);
        
        $uso_pc6=$mysqli->real_escape_string($data->uso_pc6);
        $uso_pc6_mo=$mysqli->real_escape_string($data->uso_pc6_mo);
        $uso_pc6_stat=$mysqli->real_escape_string($data->uso_pc6_stat);
        
        $uso_pc7=$mysqli->real_escape_string($data->uso_pc7);
        $uso_pc7_mo=$mysqli->real_escape_string($data->uso_pc7_mo);
        $uso_pc7_stat=$mysqli->real_escape_string($data->uso_pc7_stat);
        
        $uso_pc8=$mysqli->real_escape_string($data->uso_pc8);
        $uso_pc8_mo=$mysqli->real_escape_string($data->uso_pc8_mo);
        $uso_pc8_stat=$mysqli->real_escape_string($data->uso_pc8_stat);
        
        $uso_pc9=$mysqli->real_escape_string($data->uso_pc9);
        $uso_pc9_mo=$mysqli->real_escape_string($data->uso_pc9_mo);
        $uso_pc9_stat=$mysqli->real_escape_string($data->uso_pc9_stat);
        
        $uso_pc10=$mysqli->real_escape_string($data->uso_pc10);
        $uso_pc10_mo=$mysqli->real_escape_string($data->uso_pc10_mo);
        $uso_pc10_stat=$mysqli->real_escape_string($data->uso_pc10_stat);
        
        $uso_ups1=$mysqli->real_escape_string($data->uso_ups1);
        $uso_ups1_stat=$mysqli->real_escape_string($data->uso_ups1_stat);
        
        $uso_ups6=$mysqli->real_escape_string($data->uso_ups6);
        $uso_ups6_stat=$mysqli->real_escape_string($data->uso_ups6_stat);
        
        $uso_printer=$mysqli->real_escape_string($data->uso_printer);
        $uso_printer_stat=$mysqli->real_escape_string($data->uso_printer_stat);
        
        $uso_projector=$mysqli->real_escape_string($data->uso_projector);
        $uso_projector_stat=$mysqli->real_escape_string($data->uso_projector_stat);
        
        $uso_dvd=$mysqli->real_escape_string($data->uso_dvd);
        $uso_dvd_stat=$mysqli->real_escape_string($data->uso_dvd_stat);
        
        $uso_lcd=$mysqli->real_escape_string($data->uso_lcd);
        $uso_lcd_stat=$mysqli->real_escape_string($data->uso_lcd_stat);
        
        $uso_rev=$mysqli->real_escape_string($data->uso_rev);
        $uso_rev_stat=$mysqli->real_escape_string($data->uso_rev_stat);
        
        $uso_air1=$mysqli->real_escape_string($data->uso_air1);
        $uso_air1_stat=$mysqli->real_escape_string($data->uso_air1_stat);
        
        $uso_air2=$mysqli->real_escape_string($data->uso_air2);
        $uso_air2_stat=$mysqli->real_escape_string($data->uso_air2_stat);
        
        $uso_update=$mysqli->real_escape_string($data->uso_update);

    
    $data=array(  
        "uso_smis"=>$uso_smis,
        
        "uso_teacher"=>$uso_teacher,
        "uso_tea_mobile"=>$uso_tea_mobile,
        
        
        "uso_server"=>$uso_server,
        "uso_server_mo"=>$uso_server_mo,
        "uso_server_stat"=>$uso_server_stat,
            
        "uso_pc0"=>$uso_pc0,
        "uso_pc0_mo"=>$uso_pc0_mo,
        "uso_pc0_stat"=>$uso_pc0_stat,
        
        "uso_pc1"=>$uso_pc1,
        "uso_pc1_mo"=>$uso_pc1_mo,
        "uso_pc1_stat"=>$uso_pc1_stat,
        
        "uso_pc2"=>$uso_pc2,
        "uso_pc2_mo"=>$uso_pc2_mo,
        "uso_pc2_stat"=>$uso_pc2_stat,
        
        "uso_pc3"=>$uso_pc3,
        "uso_pc3_mo"=>$uso_pc3_mo,
        "uso_pc3_stat"=>$uso_pc3_stat,
        
        "uso_pc4"=>$uso_pc4,
        "uso_pc4_mo"=>$uso_pc4_mo,
        "uso_pc4_stat"=>$uso_pc4_stat,
        
        "uso_pc5"=>$uso_pc5,
        "uso_pc5_mo"=>$uso_pc5_mo,
        "uso_pc5_stat"=>$uso_pc5_stat,
        
        "uso_pc6"=>$uso_pc6,
        "uso_pc6_mo"=>$uso_pc6_mo,
        "uso_pc6_stat"=>$uso_pc6_stat,
        
        "uso_pc7"=>$uso_pc7,
        "uso_pc7_mo"=>$uso_pc7_mo,
        "uso_pc7_stat"=>$uso_pc7_stat,
        
        "uso_pc8"=>$uso_pc8,
        "uso_pc8_mo"=>$uso_pc8_mo,
        "uso_pc8_stat"=>$uso_pc8_stat,
        
        "uso_pc9"=>$uso_pc9,
        "uso_pc9_mo"=>$uso_pc9_mo,
        "uso_pc9_stat"=>$uso_pc9_stat,
        
        "uso_pc10"=>$uso_pc10,
        "uso_pc10_mo"=>$uso_pc10_mo,
        "uso_pc10_stat"=>$uso_pc10_stat,
        
        "uso_ups1"=>$uso_ups1,
        "uso_ups1_stat"=>$uso_ups1_stat,
        
        "uso_ups6"=>$uso_ups6,
        "uso_ups6_stat"=>$uso_ups6_stat,
        
        "uso_printer"=>$uso_printer,
        "uso_printer_stat"=>$uso_printer_stat,
        
        "uso_projector"=>$uso_projector,
        "uso_projector_stat"=>$uso_projector_stat,
        
        "uso_dvd"=>$uso_dvd,
        "uso_dvd_stat"=>$uso_dvd_stat,
        
        "uso_lcd"=>$uso_lcd,
        "uso_lcd_stat"=>$uso_lcd_stat,
        
        "uso_rev"=>$uso_rev,
        "uso_rev_stat"=>$uso_rev_stat,
        
        "uso_air1"=>$uso_air1,
        "uso_air1_stat"=>$uso_air1_stat,
        
        "uso_air2"=>$uso_air2,
        "uso_air2_stat"=>$uso_air2_stat,
        
        "uso_update"=>$uso_update,

    );  
    
    
    update("uso",$data," uso_smis='".$_GET['Id']."' "); // ฟังก์ชั่นแก้ไขข้อมูล  
    exit;  
} 

////////////////////////////  JOB    ///////////////////////////
if(isset($_GET['viewJob'])){  // ส่งตัวแปร GET ชื่อ viewUso มากำหนดให้ทำงานในส่วนนี้  
header("Content-type:application/json; charset=UTF-8");          
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);     
$more_sql="";  
if(isset($_GET['Id']) && $_GET['Id']!=""){ // รับค่า กรณี แสดงรายการเดียวที่เลือก ตาม Id  
    $more_sql= " WHERE job_smis='".$_GET['Id']."' ";  //$more_sql=" AND uso_smis='".$_GET['Id']."' ";  
}  
// เนื้อหาส่วนล่างถัดจากนี้ เป็นการเรียกใช้งาน คำสั่ง php ดึงข้อมูล  
// มาเก็บในตัวแปร array แล้วนำไปสร้างเป็นรูปแบบ json object   
// เนื้อหาก่อนหน้ามีรายละเอียด ในที่นี้ไม่ขออธิบายเพิ่ม  
$sql="SELECT * FROM job INNER JOIN sch ON job.job_smis=sch.sch_smis $more_sql";  
$result = $mysqli->query($sql);  
while($rs=$result->fetch_object()){  
    $json_data[]=array(  
        //
        "job_id"=>$rs->job_id,      
        "job_project"=>$rs->job_project,  
        "job_type"=>$rs->job_type,  
        "job_date"=>$rs->job_date,   
        "job_smis"=>$rs->job_smis,
        "job_tea"=>$rs->job_tea,
        "job_tea_tel"=>$rs->job_tea_tel,
        "job_dea"=>$rs->job_dea,
        "job_dea_tel"=>$rs->job_dea_tel,
        "job_stat"=>$rs->job_stat,
        "job_note"=>$rs->job_note,  
        
        "sch_name"=>$rs->sch_name,
       
        
    );    
}      
$json= json_encode($json_data);  
if(isset($_GET['callback']) && $_GET['callback']!=""){  
echo $_GET['callback']."(".$json.");";      

}else{  
echo $json;  
}      
    exit;  
}

if(isset($_GET['addJob'])){ // ส่งตัวแปร GET ชื่อ addSch มากำหนดให้ทำงานในส่วนนี้  
    // จะเห็นว่า การส่งค่าแบบ post มา จะไม่ได้รับค่าแบบตรงอ้างอิง $_POST['xxx'] ได้เลย  
    // แต่เป็นการไปอ่านค่าจากไฟล์ ที่ถูกเขียน ไว้ด้วย php อีกทีหนึ่ง  
    $data = json_decode(file_get_contents("php://input")); // ดึงข้อมูลจากไฟล์ มาใส่ตัวแปร object ชื่อ $data  
    
    
        $job_id=$mysqli->real_escape_string($data->job_id);
        $job_project=$mysqli->real_escape_string($data->job_project);  
        $job_type=$mysqli->real_escape_string($data->job_type);  
       // $job_date=$mysqli->real_escape_string($data->job_date);   
        $job_smis=$mysqli->real_escape_string($data->job_smis);
        $job_tea=$mysqli->real_escape_string($data->job_tea);
        $job_tea_tel=$mysqli->real_escape_string($data->job_tea_tel);
        $job_dea=$mysqli->real_escape_string($data->job_dea);
        $job_dea_tel=$mysqli->real_escape_string($data->job_dea_tel);
        $job_stat=$mysqli->real_escape_string($data->job_stat);
        $job_note=$mysqli->real_escape_string($data->job_note);
 
    
    // ชุดข้อมูลและฟิลด์ที่จะบันทึก อันนี้เป็นฟังก์ชั่นเฉพาะที่่เราใช้งาน  
    // ใครจะเขียนแบบ mysqli ปกติก็ได้  
    $data=array(
        
        "job_id"=>$job_id,
        "job_project"=>$job_project,  
        "job_type"=>$job_type,  
       // "job_date"=>$job_date,   
        "job_smis"=>$job_smis,
        "job_tea"=>$job_tea,
        "job_tea_tel"=>$job_tea_tel,
        "job_dea"=>$job_dea,
        "job_dea_tel"=>$job_dea_tel,
        "job_stat"=>$job_stat,
        "job_note"=>$job_note,

 
        
    );  
    insert("job",$data); // ฟังชั่นบันทึกข้อมูล ง่ายๆ ไม่กี่บรรทัด  
    exit;  
}  

?>  