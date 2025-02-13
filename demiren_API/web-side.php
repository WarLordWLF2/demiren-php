<?php

include 'header.php';

// ------------------------------------------- For Website ------------------------------------------- //

class Web_Tools_Functions
{
    // ---------------- Create Data ---------------- //
    // Login
    function customer_login($data)
    {
        include "connection.php";

        $sql = "SELECT * FROM tbl_customers WHERE customers_email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":email", $data["userMail"]);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if user exists and verify password
        if ($user && password_verify($data["userPass"], $user["customers_password"])) {
            return json_encode(["response" => true, "user" => $user]);
        } else {
            return json_encode(["response" => false]);
        }
    }

    // Create New Account
    function new_account($data)
    {
        include "connection.php";
        $hashedPassword = password_hash($data["password"], PASSWORD_DEFAULT);

        $sql = "INSERT INTO tbl_customers(customer_user_level_id, customers_fname, customers_lname, customers_country, customers_email,
                                             customers_password ,customers_phone, customers_age) 
                VALUES(1, :fname, :lname, :country, :email, :code, :phone, :age)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":fname", $data["fname"]);
        $stmt->bindParam(":lname", $data["lname"]);
        $stmt->bindParam(":country", $data["country"]);
        $stmt->bindParam(":code", $hashedPassword);
        $stmt->bindParam(":email", $data["email"]);
        $stmt->bindParam(":phone", $data["phone"]);
        $stmt->bindParam(":age", $data["age"]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();
        unset($stmt, $pdo);

        return $rowCount > 0 ? json_encode($result) : 0;
    }

    function addReservation_Request($data)
    {
        include "connection.php";
        $time_n_date = $data["timeAndDate_json"];
        $rooms = $data["rooms_json"];
        
        $returnValue = $this->new_timeAndDate($time_n_date);
        if ($returnValue) {
            $this
        }
    }
    // Adds new reservation
    function new_reservation($data)
    {
        include "connection.php";

        $sql = "INSERT INTO tbl_reservation_online(reservation_online_customers_id, reservation_online_roomtype_id, 
                                    reservation_online_timeanddate_id, reservation_online_num_of_customers, reservation_online_adult,
                                    reservation_online_children ,reservation_online_total, reservation_online_downpayment, 
                                    reservation_online_balance) 
                VALUES(:cust_id, :roomtype_id, :timeanddate_id, :num_of_customers, :adult, :children, :total, :downpayment, :balance)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":cust_id", $data["customer_id"]);
        $stmt->bindParam(":roomtype_id", $data["lname"]);
        $stmt->bindParam(":timeanddate_id", $data["country"]);
        $stmt->bindParam(":num_of_customers", $data["email"]);
        $stmt->bindParam(":adult", $data["phone"]);
        $stmt->bindParam(":children", $data["age"]);
        $stmt->bindParam(":total", $data["phone"]);
        $stmt->bindParam(":downpayment", $data["age"]);
        $stmt->bindParam(":balance", $data["age"]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();
        unset($stmt, $pdo);

        return $rowCount > 0 ? json_encode($result) : 0;
    }

    // Adds New Time and Date
    function new_timeAndDate($data)
    {
        include "connection.php";

        $sql = "INSERT INTO tbl_timeanddate(timeanddate_customers_id, timeanddate_child_age_id, timeanddate_time_arrival, 
                    timeanddate_date_arrival, timeanddate_created_at, timeanddate_updated_at) 
                VALUES(:cust_id, :childAge_id, :time_arrived, :date_arrived, :created, :updated)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":cust_id", $data["customer_id"]);
        $stmt->bindParam(":childAge_id", $data["child_age"]);
        $stmt->bindParam(":time_arrived", $data["arrived_time"]);
        $stmt->bindParam(":date_arrived", $data["arrived_date"]);
        $stmt->bindParam(":created", $data["created_at"]);
        $stmt->bindParam(":updated", $data["updated_at"]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();
        unset($stmt, $pdo);

        return $rowCount > 0 ? json_encode($result) : 0;
    }

    // ---------------- Read Data ---------------- //
    // Display only the Current User's Check Ins and Outs
    function display_signins($data)
    {
        include "connection.php";

        $sql = "SELECT checkin_checkout_id, checkin_date, checkin_time, checkout_date, checkout_time, checkin_checkout_status, 
                    reservation_online_downpayment FROM tbl_checkin_checkout 
                WHERE checkin_checkout_customers_id = :cust_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":cust_id", $data[""]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();

        return $rowCount > 0 ? json_encode($result) : 0;
    }

    // Displays Current Customer Information
    function display_myInfo($data)
    {
        include "connection.php";

        $sql = "SELECT customers_fname, customers_lname, customers_country, customers_email, customers_phone, customers_age FROM tbl_customers
                WHERE customers_id = :cust_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":cust_id", $data[""]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();

        return $rowCount > 0 ? json_encode($result) : 0;
    }

    // Shows All Available Room
    function display_rooms()
    {
        include "connection.php";

        $sql = "SELECT * FROM tbl_rooms";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();

        return $rowCount > 0 ? json_encode($result) : 0;
    }

    // ---------------- Update Data ---------------- //
    // Customer Updates Account
    function update_account($data)
    {
        include "connection.php";

        $sql = "UPDATE tbl_customers SET customers_fname = :fname, customers_lname = :lname, customers_country = :country, customers_email = :email, 
                    customers_phone = :phone, customers_age = :age
                WHERE customers_id = :cust_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":cust_id", $data[""]);
        $stmt->bindParam(":fname", $data[""]);
        $stmt->bindParam(":lname", $data[""]);
        $stmt->bindParam(":country", $data[""]);
        $stmt->bindParam(":email", $data[""]);
        $stmt->bindParam(":phone", $data[""]);
        $stmt->bindParam(":age", $data[""]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rowCount = $stmt->rowCount();
        unset($stmt, $pdo);

        return $rowCount > 0 ? json_encode($result) : 0;
    }
}

$web_tools = new Web_Tools_Functions();
$methodType = isset($_POST["method"]) ? $_POST["method"] : 0;
$jsonData = isset($_POST["json"]) ? json_decode($_POST["json"], true) : 0;

switch ($methodType) {
        // Login
    case "submit-login":
        echo $web_tools->customer_login($jsonData);
        break;

        // Create Methods
    case "addUser":
        echo $web_tools->new_account($jsonData);
        break;

    case "addReservation":
        echo $web_tools->addReservation_Request($jsonData);
        break;

        // Read Methods
    case "display-all-rooms":
        echo $web_tools->display_rooms();
        break;

        // Update Methods
    default:
        return json_encode(["response" => false, "message" => "Request Denied"]);
}
