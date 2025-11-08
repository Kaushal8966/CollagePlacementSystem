const JobModel = require ("../models/job");

class JobController {

    static AllJobs = async (req,res) => {

        const job = await JobModel.find()
        // console.log(job)

        try{
            res.render("job/AllJobs", {
                job : job,
                success : req.flash("success"),
                error: req.flash("error"),

            })
        } catch (error) {
            console.log(error);
        }
    };

    static AddJobs = async (req,res) => {

        const jobs = await JobModel.find({ companyId: req.user.id })
        .populate("companyId", "name") // 👈 ये जरूरी है
        .sort({ createdAt: -1 });
        
        try {
            console.log(req.body)

            const {
                title,
                description,
                location,
                salary,
                department,
                jobType,
                applicationDeadline,
                status,
                companyId,
                requirements,
                min12Percent,
                minCGPA,
                maxBacklogs,
                allowedBranches,
                skillsRequired,
            } = req.body
               const job = await JobModel.findOne({ companyId });
               if (job) {
                   req.flash('error', "Email already registered")
                   res.redirect('/company/jobs')
   
               }
               const result = await JobModel.create ({
                title,
                description,
                location,
                salary,
                department,
                jobType,
                applicationDeadline,
                status,
                companyId : req.user.id,
                requirements: {
                   min12Percent,
                   minCGPA,
                   maxBacklogs,
                    allowedBranches: allowedBranches?.split(',').map(b => b.trim()),
                    skillsRequired: skillsRequired?.split(',').map(s => s.trim())
                }
                
               })

            req.flash('success', "Job Added Successfully!")
            res.redirect('/company/jobs')

        } catch (error) {
            console.log(error)
        }
    }
    static UpdateJob = async (req, res) => {
    console.log(req.body)
    try {
      const {
        title,
        description,
        salary,
        location,
        department,
        min12Percent,
        minCGPA,
        maxBacklogs,
        skillsRequired,
        allowedBranches,
      } = req.body;

      const updateData = {
        title,
        description,
        salary,
        location,
        department,
        requirements: {
          min12Percent: Number(min12Percent),
          minCGPA: Number(minCGPA),
          maxBacklogs: Number(maxBacklogs),
          skillsRequired: skillsRequired
            ? skillsRequired.split(",").map((skill) => skill.trim())
            : [],
          allowedBranches: allowedBranches
            ? allowedBranches.split(",").map((branch) => branch.trim())
            : [],
        },
      };

      await JobModel.findByIdAndUpdate(req.params.id, updateData);
      req.flash("success", "Job Update successfully");
      res.redirect("/company/jobs"); // Redirect to jobs list page
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };

  static DeleteJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      await JobModel.findByIdAndDelete(jobId);
      // Redirect back to jobs listing page after delete
      req.flash("success", "Job delete successfully");

      res.redirect("/company/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  static showJobsForStudent= async(req ,res)=>{
    try
    {// yahan simple sa filter laga sakte ho, jaise status open 
        const jobs=await JobModel.find({status:'open'}).populate('companyId','name').sort({createdAt:-1});

        res.render('students/joblist',{jobs, studentId: req.user.Id,success:req.flash('success'),error:req.flash('error')});


    }catch(error)
    {
        console.log(error);
    }
  };
}

module.exports = JobController;