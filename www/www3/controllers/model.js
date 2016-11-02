angular.module('Phyathai')

    .run(function($ionicPlatform,$rootScope,$http,$ionicLoading) {

        $rootScope.Model_login = function (username, fname, lname, emp_id, emp_img1, emp_img2, hospital_id , group_id, emp_real_id,SeeAll,costcenter_id) {
            var self = this;
            self.username = username;
            self.fname = fname;
            self.lname = lname;
            self.emp_id = emp_id;
            self.emp_img1 = emp_img1;
            self.emp_img2 = emp_img2;
            self.hospital_id = hospital_id;
			      self.group_id = group_id;
            self.emp_real_id = emp_real_id;
            self.SeeAll = SeeAll;
            self.costcenter_id = costcenter_id;

            $rootScope.db.transaction(function (tx) {
                tx.executeSql('INSERT INTO login (username,fname,lname,emp_id,emp_img1,emp_img2,hospital_id,group_id,emp_real_id,SeeAll,costcenter_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [username, fname, lname, emp_id, emp_img1, emp_img2, hospital_id, group_id,emp_real_id,SeeAll,costcenter_id]);
            })
        }
    });
