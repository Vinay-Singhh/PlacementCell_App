const Student = require('../models/student');
const { Parser } = require('json2csv');
const Interview = require('../models/interview');

module.exports.createStudent = function(req, res){
    console.log(req.body);
    Student.create(req.body);
    return res.redirect('back');
}

module.exports.createInterview = function(req, res){
    console.log(req.body);
    Interview.create(req.body);
    return res.redirect('back');
}

module.exports.placementPage = async function(req, res){
    let students = await Student.find({});
    Interview.find({},function(err, interviews){
        if(err){
            console.log(err);
            return;
        }
        return res.render('interview_page',{
            interviews : interviews,
            students : students,
            isAuthenticate:true,
            email: req.cookies.user_Id
        });
    });
}

module.exports.download=async function(req,res){
    Interview.find({}, async function(err, docs){
        if(err){
            console.log("error while downloading", err);
            return;
        }
        const allInterview=[];
        for(let i of docs){
            let temp={};
            temp["Company Name"]=i.company_name;
            temp["Student Name"]=i.student_name;
            temp["Status"]=i.status;
            temp["Date"]=i.date;
            
            //find the student
            let st = await Student.findOne({student_name : i.student_name});
            temp["College Name"] = st.college;
            temp["Dsa Score"] = st.dsa_score;
            temp["Web Score"] = st.webD_score;
            temp["React Score"] = st.react_score;
            temp["Batch"] = st.batch;
            allInterview.push(temp);
        }
        const csvheader = ["Company Name","Student Name","Status","Date","College Name","Dsa Score","Web Score","React Score","Batch"];
        const parser = new Parser({csvheader});
        const csv = parser.parse(allInterview);

        res.attachment("placementCellData.csv");
        res.status(200).send(csv);
    });
}